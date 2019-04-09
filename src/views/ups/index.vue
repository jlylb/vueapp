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
        <mt-cell is-link @click.native="openDetail('in')">
          <v-circle :percent="fixPer(avgin)" dashboard>
            <p>输入电压</p>
            <p>{{ avgin }}</p>
          </v-circle>
        </mt-cell>

        <mt-cell is-link @click.native="openDetail('out')">
          <v-circle :percent="fixPer(avgout)" dashboard>
            <p>输出电压</p>
            <p>{{ avgout }}</p>
          </v-circle>
        </mt-cell>

        <mt-cell is-link @click.native="openDetail('other')">
          <v-circle :percent="fixPer(avgother)" dashboard>
            <p>旁路电压</p>
            <p>{{ avgother }}</p>
          </v-circle>
        </mt-cell>

        <mt-cell>
          <mt-button type="primary" size="small" @click.native.prevent="more">更多参数</mt-button>
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
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-alarm">
        <mt-cell :title="item.label" v-for="(item, index) in alarm" :key="index">
          <mt-badge
            :type="detail[item.field]==0?'success':'error'"
          >{{ detail[item.field]==0?item.tLabel:item.fLabel }}</mt-badge>
        </mt-cell>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-temp">
        <mt-cell :title="item.label" v-for="(item, index) in moreParams" :key="index">
          <span style="color: green">{{ detail[item.field] }}</span>
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

export default {
  components: { VCircle, PopupBottom },
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
        }
      ],
      boolFields: ["rd_UPSShutWarn", "rd_SystemShutWarn"],
      moreParams: [
        { label: "厂商信息", field: "rd_upsmanuinfo" },
        { label: "UPS机型", field: "rd_upsmactype" },
        { label: "UPS版本", field: "rd_upsver" },
        { label: "UPS额定电压", field: "rd_upsvolr" },
        { label: "UPS额定电流", field: "rd_upscurr" },
        { label: "UPS额定电池电压", field: "rd_upsbatvolr" },
        { label: "UPS额定输入频率", field: "rd_upsfreqr" },
        { label: "电池可维持的时间", field: "rd_BatLastTime" },

        { label: "电池电压", field: "rd_BatVol" },
        { label: "电池电流", field: "rd_BatCur" },
        { label: "电池温度", field: "rd_BatTemp" }
      ],
      chartData: {},
      chartSettings: {},
      openPop: false,
      popData: [],
      mapFields: {
        in: [
          { field: "rd_InVol", label: "输入电压", unit: "V" },
          { field: "rd_InFreq", label: "输入频率", unit: "HZ" },
          { field: "rd_InCur", label: "输入电流", unit: "A" },
          { field: "rd_InPower", label: "输入功率", unit: "W" }
        ],
        out: [
          { field: "rd_OutVol", label: "输出电压", unit: "V" },
          { field: "rd_OutCur", label: "输出电流", unit: "A" },
          { field: "rd_OutPower", label: "输出功率", unit: "W" },
          { field: "rd_OutLoad", label: "输出负载", unit: "%" }
        ],
        other: [
          { field: "rd_PassVol", label: "旁路电压", unit: "V" },
          { field: "rd_PassCur", label: "旁路电流", unit: "A" },
          { field: "rd_PassPower", label: "旁路功率", unit: "HZ" }
        ]
      }
    };
  },
  computed: {
    avgin() {
      const { rd_InVol1, rd_InVol2, rd_InVol3 } = this.detail;
      console.log(
        rd_InVol1,
        rd_InVol2,
        rd_InVol3,
        this.round((rd_InVol1 + rd_InVol2 + rd_InVol3) / 3),
        "avg....."
      );
      return this.round((rd_InVol1 + rd_InVol2 + rd_InVol3) / 3);
    },
    avgout() {
      const { rd_OutVol1, rd_OutVol2, rd_OutVol3 } = this.detail;
      return this.round((rd_OutVol1 + rd_OutVol2 + rd_OutVol3) / 3);
    },
    avgother() {
      const { rd_PassVol1, rd_PassVol2, rd_PassVol3 } = this.detail;
      return this.round((rd_PassVol1 + rd_PassVol2 + rd_PassVol3) / 3);
    }
  },
  methods: {
    fetchDevice,
    fixPer(val) {
      return Number(((val * 100) / 240).toFixed(1));
    },
    round(val, surfix = 1) {
      return (val && val.toFixed(surfix)) || 0;
    },
    selectButton(tab) {
      this.active = tab;
    },
    more() {
      this.active = "tab-temp";
    },
    openDetail(pName) {
      this.popData = [];
      this.openPop = true;
      let params = this.mapFields[pName];
      const prefix = ["A相", "B相", "C相"];
      [1, 2, 3].map(item => {
        params.map(v => {
          let { field, label, unit } = v;
          let fieldDesc = prefix[item - 1] + label;
          this.popData.push({
            label: fieldDesc,
            value: this.detail[field + item] + " " + unit
          });
        });
      });
      console.log(this.popData, "after open detail");
    }
  },

  created() {
    this.extend = {
      grid: {
        left: "5%",
        right: "5%",
        bottom: "1%"
      },
      xAxis: {
        axisLabel: {
          interval: 0
        }
      }
    };
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

