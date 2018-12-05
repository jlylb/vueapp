<template>
  <div class="layout-container air">
    <top-component></top-component>

    <mt-button
      size="small"
      :type="active===item.value?'primary':'default'"
      @click.native.prevent="selectButton(item.value)"
      v-for="item in buttons"
      :key="item.value"
    >{{ item.label }}</mt-button>

    <mt-tab-container v-model="active" v-if="detail">
      <mt-tab-container-item id="tab-real" name="参数" class="real">
        <mt-cell title="回风温度" :label="'当前: '+ convertInt(detail.rd_air_backwindtemp)">
          <mt-range
            class="air-range"
            v-model="detail.rd_air_backwindtemp"
            :min="1"
            :max="100"
            :step="1"
            disabled
            :bar-height="5"
          ></mt-range>
        </mt-cell>

        <mt-cell title="回风湿度" :label="'当前: '+ convertInt(detail.rd_air_backwindhum)">
          <mt-range
            class="air-range"
            v-model="detail.rd_air_backwindhum"
            :min="1"
            :max="100"
            :step="1"
            disabled
            :bar-height="5"
          ></mt-range>
        </mt-cell>

        <mt-cell title="送风温度" :label="'当前: ' + convertInt(detail.rd_air_sendwindtemp)">
          <mt-range
            class="air-range"
            v-model="detail.rd_air_sendwindtemp"
            :min="1"
            :max="100"
            :step="1"
            disabled
            :bar-height="5"
          ></mt-range>
        </mt-cell>

        <mt-cell title="送风湿度" :label="'当前: ' + convertInt(detail.rd_air_sendwindhum)">
          <mt-range
            class="air-range"
            v-model="detail.rd_air_sendwindhum"
            :min="1"
            :max="100"
            :step="1"
            disabled
            :bar-height="5"
          ></mt-range>
        </mt-cell>

        <mt-cell title="室内温度" :label="'当前: ' + convertInt(detail.rd_air_innertemp)">
          <mt-range
            class="air-range"
            v-model="detail.rd_air_innertemp"
            :min="1"
            :max="100"
            :step="1"
            disabled
            :bar-height="5"
          ></mt-range>
        </mt-cell>

        <mt-cell title="室内湿度" :label="'当前: ' + convertInt(detail.rd_air_innerhum)">
          <mt-range
            class="air-range"
            v-model="detail.rd_air_innerhum"
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
import { mapGetters } from "vuex";

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
        { label: "开/关机", field: "rd_air_state", tLabel: "开", fLabel: "关" },
        {
          label: "风机",
          field: "rd_air_windstate",
          tLabel: "开",
          fLabel: "关"
        },
        {
          label: "压缩机",
          field: "rd_air_compstate",
          tLabel: "开",
          fLabel: "关"
        },
        {
          label: "加热器",
          field: "rd_air_addhotstate",
          tLabel: "开",
          fLabel: "关"
        },
        {
          label: "除湿器",
          field: "rd_air_deleshistate",
          tLabel: "开",
          fLabel: "关"
        },
        {
          label: "加湿器",
          field: "rd_air_addshistate",
          tLabel: "开",
          fLabel: "关"
        }
      ],
      alarm: [
        {
          label: "高温状态",
          field: "rd_air_temphalarm",
          tLabel: "正常",
          fLabel: "过高"
        },
        {
          label: "低温状态",
          field: "rd_air_templowalarm",
          tLabel: "正常",
          fLabel: "过低"
        },
        {
          label: "高湿状态",
          field: "rd_air_humhalarm",
          tLabel: "正常",
          fLabel: "过高"
        },
        {
          label: "低湿状态",
          field: "rd_air_humlowalarm",
          tLabel: "正常",
          fLabel: "过低"
        },
        {
          label: "烟火状态",
          field: "rd_air_somkealarm",
          tLabel: "正常",
          fLabel: "异常"
        },
        {
          label: "风机状态",
          field: "rd_air_windalarm",
          tLabel: "正常",
          fLabel: "异常"
        },
        {
          label: "漏水状态",
          field: "rd_air_leakalarm",
          tLabel: "正常",
          fLabel: "异常"
        },
        {
          label: "通讯状态",
          field: "rd_NetCom",
          tLabel: "正常",
          fLabel: "断线"
        }
      ],
      boolFields: [
        "rd_air_state",
        "rd_air_windstate",
        "rd_air_compstate",
        "rd_air_addhotstate",
        "rd_air_deleshistate",
        "rd_air_addshistate"
      ],
      chartData: {},
      chartSettings: {}
    };
  },
  computed: {},
  methods: {
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
      const {
        rd_air_backwindtemp,
        rd_air_backwindhum,
        rd_air_sendwindtemp,
        rd_air_sendwindhum,
        rd_air_innertemp,
        rd_air_innerhum
      } = this.detail;
      const rows = [
        { name: "回风", temp: rd_air_backwindtemp, wet: rd_air_backwindhum },
        { name: "送风", temp: rd_air_sendwindtemp, wet: rd_air_sendwindhum },
        { name: "室内", temp: rd_air_innertemp, wet: rd_air_innerhum }
      ];
      const columns = ["name", "temp", "wet"];
      let yAxisName = ["温度: °C", "湿度: %"],
        yAxisType = ["value", "value"],
        axisSite = { right: ["wet"] };
      let min = [0, 0],
        max = [100, 100],
        labelMap = { temp: "温度", wet: "湿度" };

      this.chartSettings = {
        axisSite,
        yAxisType,
        yAxisName,
        min,
        max,
        labelMap
      };

      this.chartData = {
        columns,
        rows
      };
    },
    convertInt(val) {
      return val ? val : 0;
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
    fetchDevice({ pdi }).then(res => {
      console.log(res.data.devices);
      const device = res.data.devices;
      if (device) {
        Object.keys(device).map(item => {
          if (this.boolFields.indexOf(item) > -1) {
            device[item] = device[item] == 0 ? true : false;
          }
        });
      }
      this.detail = device;
      this.formatChartData();
    });
  }
};
</script>

<style lang='scss' scoped>
.sheet .mu-item-action {
  justify-content: center;
  color: inherit;
}
.real {
  /deep/ .mint-cell-value {
    position: relative;
    flex: 2.5;
  }
  .air-range {
    width: 100%;
  }
}
</style>
