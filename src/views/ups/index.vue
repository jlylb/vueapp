<template>
  <div class="layout-container air">
    <top-component></top-component>

    <mt-button
      class="params-btn"
      size="small"
      :type="active===item.value?'primary':'default'"
      @click.native.prevent="selectButton(item.value)"
      v-for="item in buttons"
      :key="item.value"
    >{{ item.label }}</mt-button>

    <mt-tab-container v-model="active" v-if="detail">
      <mt-tab-container-item id="tab-real" class="real">
        <mt-cell v-for="(item, index) in realFields" :key="index">
          <v-circle
            :percent="fixPer(detail[itemFields])"
            dashboard
            v-for="(itemFields, findex) in item"
            :key="findex"
          >
            <p>{{ index }}相{{ findex==0?"输入":"输出" }}</p>
            <p>{{ detail[itemFields] }} V</p>
          </v-circle>
        </mt-cell>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-running">
        <mt-cell
          :title="item.label"
          :label="detail[item.field]?item.tLabel:item.fLabel"
          v-for="(item, index) in running"
          :key="index"
        >
          <mt-switch v-model="detail[item.field]" disabled></mt-switch>
        </mt-cell>
        <mt-cell title="放电控制" label="点击开关开始放电">
          <mt-switch v-model="isRelease" @change="release"></mt-switch>
        </mt-cell>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-alarm">
        <mt-cell :title="item.label" v-for="(item, index) in alarm" :key="index">
          <mt-badge
            :type="detail[item.field]==0?'success':'error'"
          >{{ detail[item.field]==0?item.tLabel:item.fLabel }}</mt-badge>
        </mt-cell>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-temp" class="basic-info">
        <mt-cell class="info-title">{{ toptitle }}-{{ topname }}</mt-cell>
        <mt-cell v-for="(items, index) in moreFields" :key="index">
          <div class="info-tips">
            <div>{{ items.name }}</div>
            <icon-bg :icon="items.icon" small></icon-bg>
          </div>
          <div class="info-params">
            <p v-for="(item, findex) in items.fields" :key="findex">
              {{ item.label }}:
              <span class="text-green" v-if="!item.isBool">
                <template
                  v-if="parseFloat(detail[item.field])"
                >{{ detail[item.field] }} {{ item.unit }}</template>
                <template v-else>
                  <b class="text-gray">N/A</b>
                </template>
              </span>
              <span
                :class="{'text-green': detail[item.field]==0 ,'text-red': detail[item.field]==1}"
                v-if="item.isBool"
              >{{ detail[item.field]==0?item.tLabel:item.fLabel }}</span>
            </p>
          </div>
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <popup-bottom
      :open.sync="openPop"
      :data="popData"
      :pop-prop="{ position: 'bottom' }"
      :show-label="true"
    ></popup-bottom>
  </div>
</template>

<script>
import { fetchDevice } from "@/api/monitor";
import { getDataValue } from "@/tools";
import VCircle from "@/components/vcircle";
import PopupBottom from "@/components/dropdown";
import ReleaseBattery from "@/tools/release.js";

export default {
  components: { VCircle, PopupBottom },
  mixins: [ReleaseBattery],
  data() {
    return {
      rangeValue: 10,
      rangeValue1: 5,
      active: "tab-real",
      buttons: [
        { value: "tab-real", label: "实时数据" },
        { value: "tab-running", label: "运行状态" },
        { value: "tab-alarm", label: "告警状态" },
        { value: "tab-temp", label: "参数" }
      ],
      switch1: true,
      detail: null,
      running: [
        {
          label: "开/关机",
          field: "rd_UPSShutWarn",
          tLabel: "开",
          fLabel: "关"
        },
        {
          label: "系统状态",
          field: "rd_SystemShutWarn",
          tLabel: "开",
          fLabel: "关"
        }
      ],
      alarm: [
        {
          label: "温度状态",
          field: "rd_TempOverWarn",
          tLabel: "正常",
          fLabel: "过高"
        },
        {
          label: "输入状态",
          field: "rd_InFailWarn",
          tLabel: "正常",
          fLabel: "故障"
        },
        {
          label: "输出状态",
          field: "rd_OutFailWarn",
          tLabel: "正常",
          fLabel: "故障"
        },
        {
          label: "负载状态",
          field: "rd_OverLoadWarn",
          tLabel: "正常",
          fLabel: "过载"
        },
        {
          label: "旁路状态",
          field: "rd_PassFailWarn",
          tLabel: "正常",
          fLabel: "故障"
        },
        {
          label: "充电状态",
          field: "rd_ChargeFailWarn",
          tLabel: "正常",
          fLabel: "故障"
        },
        {
          label: "风扇状态",
          field: "rd_FanFailWarn",
          tLabel: "正常",
          fLabel: "故障"
        },
        {
          label: "熔丝状态",
          field: "rd_FusiWarn",
          tLabel: "正常",
          fLabel: "告警"
        },

        {
          label: "市电恢复状态",
          field: "rd_AwaitingPowerWarn",
          tLabel: "开机取消",
          fLabel: "自动开机"
        },
        {
          label: "关机延时状态",
          field: "rd_ShutLastWarn",
          tLabel: "取消",
          fLabel: "告警"
        },
        {
          label: "立即关机状态",
          field: "rd_FanFailWarn",
          tLabel: "取消",
          fLabel: "告警"
        },
        {
          label: "设备连线状态",
          field: "rd_DevDisWarn",
          tLabel: "连线",
          fLabel: "离线"
        },
        {
          label: "电池状态",
          field: "rd_BatFalutWarn",
          tLabel: "正常",
          fLabel: "故障"
        },

        {
          label: "电池电压状态",
          field: "rd_BatVolLowWarn",
          tLabel: "正常",
          fLabel: "低"
        },
        {
          label: "旁路指示状态",
          field: "rd_BypassWarn",
          tLabel: "正常",
          fLabel: "指示"
        },
        {
          label: "电池状态",
          field: "rd_BatFalutWarn",
          tLabel: "正常",
          fLabel: "故障"
        },

        {
          label: "网络状态",
          field: "rd_NetCom",
          tLabel: "正常",
          fLabel: "断线"
        },
        {
          label: "测试状态",
          field: "rd_TestWarn",
          tLabel: "自检完成",
          fLabel: "自检中"
        }
      ],
      boolFields: ["rd_UPSShutWarn", "rd_SystemShutWarn"],
      chartData: {},
      chartSettings: {},
      openPop: false,
      popData: [],
      realFields: {
        A: ["rd_InVol1", "rd_OutVol1"],
        B: ["rd_InVol2", "rd_OutVol2"],
        C: ["rd_InVol3", "rd_OutVol3"]
      },
      moreFields: {
        basic: {
          icon: "basic",
          name: "基本信息",
          fields: [
            {
              label: "工作模式",
              field: "rd_PassFailWarn",
              isBool: true,
              tLabel: "正常",
              fLabel: "旁路",
              unit: ""
            },

            { label: "输出负载", field: "rd_OutAllLoad", unit: "%" },
            { label: "UPS温度", field: "rd_MachTemp", unit: "℃" }
            // { label: "厂商型号", field: "rd_upsmanuinfo", unit: "" }
            // { label: "机型", field: "rd_upsmactype", unit: "" }
          ]
        },
        in1: {
          icon: "in",
          name: "A相输入",
          fields: [
            { label: "输入电压", field: "rd_InVol1", unit: "V" },
            { label: "输入频率", field: "rd_InFreq1", unit: "HZ" }
            // { label: "输入电流", field: "rd_InCur1", unit: "A" }
            // { label: "输入功率", field: "rd_InPower1", unit: "KW" }
          ]
        },
        out1: {
          icon: "out",
          name: "A相输出",
          fields: [
            { label: "输出负载", field: "rd_OutLoad1", unit: "%" },
            { label: "输出电压", field: "rd_OutVol1", unit: "V" },
            { label: "输出频率", field: "rd_OutFreq", unit: "HZ" }
            // { label: "输出功率", field: "rd_OutPower1", unit: "KW" },
            // { label: "旁路电压", field: "rd_PassVol1", unit: "V" }
            // { label: "旁路功率", field: "rd_PassPower1", unit: "KW" }
          ]
        },
        in2: {
          icon: "in",
          name: "B相输入",
          fields: [
            { label: "输入电压", field: "rd_InVol2", unit: "V" },
            { label: "输入频率", field: "rd_InFreq2", unit: "HZ" }
            // { label: "输入电流", field: "rd_InCur2", unit: "A" }
            // { label: "输入功率", field: "rd_InPower2", unit: "KW" }
          ]
        },
        out2: {
          icon: "out",
          name: "B相输出",
          fields: [
            { label: "输出负载", field: "rd_OutLoad2", unit: "%" },
            { label: "输出电压", field: "rd_OutVol2", unit: "V" },
            { label: "输出频率", field: "rd_OutFreq", unit: "HZ" }
            // { label: "输出功率", field: "rd_OutPower2", unit: "KW" },
            // { label: "旁路电压", field: "rd_PassVol2", unit: "V" }
            // { label: "旁路功率", field: "rd_PassPower2", unit: "KW" }
          ]
        },
        in3: {
          icon: "in",
          name: "C相输入",
          fields: [
            { label: "输入电压", field: "rd_InVol3", unit: "V" },
            { label: "输入频率", field: "rd_InFreq3", unit: "HZ" }
            // { label: "输入电流", field: "rd_InCur3", unit: "A" }
            // { label: "输入功率", field: "rd_InPower3", unit: "KW" }
          ]
        },
        out3: {
          icon: "out",
          name: "C相输出",
          fields: [
            { label: "输出负载", field: "rd_OutLoad3", unit: "%" },
            { label: "输出电压", field: "rd_OutVol3", unit: "V" },
            { label: "输出频率", field: "rd_OutFreq", unit: "HZ" }
            // { label: "输出功率", field: "rd_OutPower3", unit: "KW" },
            // { label: "旁路电压", field: "rd_PassVol3", unit: "V" }
            // { label: "旁路功率", field: "rd_PassPower3", unit: "KW" }
          ]
        },
        battery: {
          icon: "battery",
          name: "电池",
          fields: [
            { label: "电池电压", field: "rd_BatVol", unit: "V" },
            { label: "电池容量", field: "rd_BatCapacity", unit: "%" }
            // { label: "电池电流", field: "rd_BatCur", unit: "mA" },
            // { label: "电池温度", field: "rd_BatTemp", unit: "℃" }
          ]
        }
      }
    };
  },
  computed: {},
  methods: {
    fetchDevice,
    fixPer(val) {
      return Number(((val * 100) / 380).toFixed(1));
    },
    round(val, surfix = 1) {
      return (val && val.toFixed(surfix)) || 0;
    },
    selectButton(tab) {
      this.active = tab;
    },
    more() {
      this.active = "tab-temp";
    }
  },

  created() {
    const { pdi } = this.$route.params;
    this.pdi = pdi;
    this.getData();
    this.startTimer();
  }
};
</script>

<style lang='scss'>
.sheet .mu-item-action {
  justify-content: center;
  color: inherit;
}
.real {
  p {
    padding: 2px 0;
  }
  .mint-cell-value {
    position: relative;
    justify-content: space-around;
    margin: 5px 0;
    width: 100%;
  }
  .air-range {
    width: 100%;
  }
}
</style>

