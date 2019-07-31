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
        <mt-cell>
          <v-circle :percent="fixPer(detail.rd_upsinvol)" dashboard>
            <p>输入电压</p>
            <p>{{ detail.rd_upsinvol }}</p>
          </v-circle>
        </mt-cell>

        <mt-cell>
          <v-circle :percent="fixPer(detail.rd_upsoutvol)" dashboard>
            <p>输出电压</p>
            <p>{{ detail.rd_upsoutvol }}</p>
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
              <span
                class="text-green"
                v-if="!item.isBool"
              >{{ detail[item.field] }} {{ item.unit }}</span>
              <span
                :class="{'text-green': detail[item.field]==0 ,'text-red': detail[item.field]==1}"
                v-if="item.isBool"
              >{{ detail[item.field]==0?item.tLabel:item.fLabel }}</span>
            </p>
          </div>
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { fetchDevice } from "@/api/monitor";
import { getDataValue } from "@/tools";
import VCircle from "@/components/vcircle";
import ReleaseBattery from "@/tools/release.js";

export default {
  components: { VCircle },
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
          field: "rd_upspoweroff",
          tLabel: "开",
          fLabel: "关"
        },
        { label: "UPS喇叭", field: "rd_upssound", tLabel: "开", fLabel: "关" }
      ],
      alarm: [
        {
          label: "故障状态",
          field: "rd_upsfailstat",
          tLabel: "取消",
          fLabel: "故障"
        },
        {
          label: "旁路状态",
          field: "rd_upsbypassstat",
          tLabel: "正常",
          fLabel: "旁路"
        },
        {
          label: "电池电压",
          field: "rd_upsbatvollow",
          tLabel: "正常",
          fLabel: "过低"
        },
        {
          label: "市电状态",
          field: "rd_upsacfail",
          tLabel: "正常",
          fLabel: "中断"
        },
        {
          label: "负载状态",
          field: "rd_LoadAlarm",
          tLabel: "正常",
          fLabel: "过载"
        },
        {
          label: "网络状态",
          field: "rd_NetCom",
          tLabel: "正常",
          fLabel: "断线"
        },
        {
          label: "通讯状态",
          field: "rd_upsdisconn",
          tLabel: "正常",
          fLabel: "断线"
        }
      ],
      boolFields: ["rd_upspoweroff", "rd_upssound"],
      chartData: {},
      chartSettings: {},
      pdi: null,
      moreFields: {
        basic: {
          icon: "basic",
          name: "基本信息",
          fields: [
            {
              label: "工作模式",
              field: "rd_upsbypassstat",
              isBool: true,
              tLabel: "正常",
              fLabel: "旁路",
              unit: ""
            },
            { label: "电池容量", field: "rd_BattCap", unit: "%" },
            { label: "输出负载", field: "rd_upscurload", unit: "%" },
            { label: "UPS温度", field: "rd_upstemp", unit: "℃" }
            // { label: "厂商型号", field: "rd_upsmanuinfo", unit: "" },
            // { label: "机型", field: "rd_upsmactype", unit: "" }
          ]
        },
        in: {
          icon: "in",
          name: "UPS输入",
          fields: [
            { label: "输入电压", field: "rd_upsinvol", unit: "V" },
            { label: "输入频率", field: "rd_upsinfreq", unit: "HZ" }
          ]
        },
        out: {
          icon: "out",
          name: "UPS输出",
          fields: [
            { label: "输出电压", field: "rd_upsoutvol", unit: "V" }
            // { label: "最大电压", field: "rd_OutMaxVol", unit: "V" },
            // { label: "最小电压", field: "rd_OutMinVol", unit: "V" }
          ]
        },
        battery: {
          icon: "battery",
          name: "电池",
          fields: [
            { label: "电池容量", field: "rd_BattCap", unit: "%" },
            { label: "电池电压", field: "rd_BatAllVol", unit: "V" }
          ]
        }
      }
    };
  },
  computed: {},
  methods: {
    fetchDevice,
    fixPer(val) {
      return Number(((val * 100) / 240).toFixed(1));
    },
    selectButton(tab) {
      this.active = tab;
    },
    more() {
      this.active = "tab-temp";
    },
    getBool(item, trueValue = 0) {
      return item == trueValue;
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
  .mint-cell-value {
    position: relative;
    justify-content: center;
    margin: 5px 0;
    width: 100%;
  }
  .air-range {
    width: 100%;
  }
}
</style>

