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
      <mt-tab-container-item id="tab-real" name="参数" class="real-air">
        <mt-cell title="当前温度" :label="'当前: '+ convertInt(detail.rd_temp_value)">
          <mt-range
            class="air-range"
            v-model="detail.rd_temp_value"
            :min="1"
            :max="100"
            :step="1"
            disabled
            :bar-height="5"
          ></mt-range>
        </mt-cell>

        <mt-cell title="当前湿度" :label="'当前: '+ convertInt(detail.rd_humi_value)">
          <mt-range
            class="air-range"
            v-model="detail.rd_humi_value"
            :min="1"
            :max="100"
            :step="1"
            disabled
            :bar-height="5"
          ></mt-range>
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-running" name="运行状态">
        <mt-cell
          :title="item.label"
          :label="detail[item.field]?item.tLabel:item.fLabel"
          v-for="(item, index) in running"
          :key="index"
        >
          <mt-switch v-model="detail[item.field]" disabled></mt-switch>
        </mt-cell>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-alarm" name="告警状态">
        <mt-cell :title="item.label" v-for="(item, index) in alarm" :key="index">
          <mt-badge
            :type="detail[item.field]==0?'success':'error'"
          >{{ detail[item.field]==0?item.tLabel:item.fLabel }}</mt-badge>
        </mt-cell>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-temp" name="温湿度" :style="{height: '300px'}">
        <ve-histogram
          ref="tabTemp"
          :data="chartData"
          :settings="chartSettings"
          :extend="extend"
          height="100%"
        ></ve-histogram>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { fetchDevice } from "@/api/monitor";
import { getDataValue } from "@/tools";

export default {
  components: {},
  data() {
    return {
      rangeValue: 10,
      rangeValue1: 5,
      active: "tab-real",
      buttons: [
        { value: "tab-real", label: "实时数据" },
        { value: "tab-running", label: "运行状态" },
        { value: "tab-alarm", label: "告警状态" },
        { value: "tab-temp", label: "温湿度" }
      ],
      switch1: true,
      detail: null,
      running: [
        {
          label: "开/关机",
          field: "rd_GenAirRunStat",
          tLabel: "开",
          fLabel: "关"
        }
      ],
      alarm: [
        {
          label: "温度上限状态",
          field: "rd_temp_high",
          tLabel: "正常",
          fLabel: "过高"
        },
        {
          label: "温度下限状态",
          field: "rd_temp_low",
          tLabel: "正常",
          fLabel: "过低"
        },
        {
          label: "湿度上限状态",
          field: "rd_humi_high",
          tLabel: "正常",
          fLabel: "过高"
        },
        {
          label: "湿度下限状态",
          field: "rd_humi_low",
          tLabel: "正常",
          fLabel: "过低"
        },
        {
          label: "通讯状态",
          field: "rd_DevConnection",
          tLabel: "正常",
          fLabel: "断线"
        }
      ],
      boolFields: ["rd_GenAirRunStat"],
      chartData: {},
      chartSettings: {},
      pdi: null
    };
  },
  computed: {},
  methods: {
    fetchDevice,
    selectButton(tab) {
      this.active = tab;
      if (tab === "tab-temp") {
        this.$nextTick(_ => {
          this.$refs.tabTemp && this.$refs.tabTemp.echarts.resize();
        });
      }
    },
    formatChartData() {
      if (!this.detail) {
        return;
      }
      const { rd_temp_value, rd_humi_value } = this.detail;
      const rows = [
        { name: "温湿度", temp: rd_temp_value, wet: rd_humi_value }
        // { name: "送风", temp: rd_air_sendwindtemp, wet: rd_air_sendwindhum },
        // { name: "室内", temp: rd_air_innertemp, wet: rd_air_innerhum }
      ];
      const columns = ["name", "temp", "wet"];
      let yAxisName = ["温度: °C", "湿度: %"],
        yAxisType = ["normal", "normal"],
        axisSite = { right: ["wet"] };
      let min = [0, 0],
        max = [100, 100],
        labelMap = { temp: "温度", wet: "湿度" };

      this.chartSettings = {
        axisSite,
        yAxisType,
        yAxisName,
        // max,
        labelMap
      };

      this.chartData = {
        columns,
        rows
      };
    },
    convertInt(val) {
      return val ? val : 0;
    },
    getData(loading = true) {
      const { pdi, pditype: type = undefined } = this;
      if (typeof this.fetchDevice !== "function") return;
      this.fetchDevice({ pdi, type }, loading)
        .then(res => {
          console.log(res.data.devices);
          const device = res.data.devices;
          if (device) {
            Object.keys(device).forEach(item => {
              if (this.boolFields.indexOf(item) > -1) {
                device[item] = device[item] == 1;
              }
            });
          }
          this.detail = device;
          if (typeof this.formatChartData === "function") {
            this.formatChartData();
          }
        })
        .catch(() => {
          this.clearTimerId();
        });
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

<style lang='scss' >
.sheet .mu-item-action {
  justify-content: center;
  color: inherit;
}
.real-air {
  .mint-cell-value {
    position: relative;
    flex: 2.5;
  }
  .air-range {
    width: 100%;
  }
}
</style>
