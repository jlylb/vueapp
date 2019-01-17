<template>
  <div class="layout-container">
    <top-component></top-component>

    <div class="chart-block">
      <ve-histogram
        v-cloak
        :data="chartData"
        :settings="chartSettings"
        :extend="extend"
        :data-empty="dataEmpty"
        :after-set-option="afterSet"
        height="100%"
      ></ve-histogram>
    </div>
    <desc-block
      @filter="deviceFileter"
      :item="item"
      :item-fields="itemFields"
      :unit="unit"
      :is-column="isColumn"
      :device-name="`${deviceName}${itemIndex}`"
      :item-class="itemClass"
    ></desc-block>

    <mt-popup
      v-model="selectDevice"
      class="popup-device"
      :style="{height: '240px'}"
      position="bottom"
    >
      <mt-cell
        :title="deviceName + item"
        @click.native="openDevice(item)"
        :class="{ itemSelect: itemIndex===item }"
        is-link
        v-for="item in num"
        :key="item"
      >
        <svg-icon :icon-class="pdiIndex.icon" class="item-icon" slot="icon" v-if="pdiIndex"></svg-icon>
      </mt-cell>
    </mt-popup>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { fetchDevice } from "@/api/monitor";
import { getDataValue } from "@/tools";
import descBlock from "./desc";

export default {
  components: { descBlock },
  data() {
    return {
      selectDevice: false,
      device: null,
      item: null,
      items: [],
      openMenu: false,
      pdiIndex: null,
      deviceData: null,
      chartData: {},
      chartSettings: {},
      num: 0,
      deviceName: "",
      itemFields: null,
      unit: null,
      icons: null,
      itemIndex: 1,
      itemClass: ["red", "yellow", "primary"],
      dapeng: null,
      itemSelect: "itemSelect",
      dataEmpty: false,
      chart: null,
      loading: false,
      isColumn: false,
      pdi: null
    };
  },
  methods: {
    getDataValue,
    afterSet(chart) {
      this.chart = chart;
    },
    openDevice(item) {
      this.itemIndex = item;
    },
    deviceFileter() {
      this.selectDevice = true;
    },
    clickMenu(item) {
      // this.selectDevice = true
      this.openMenu = false;
      this.pdiIndex = item;
    },
    selectType() {
      this.openMenu = true;
      this.itemIndex = null;
    },
    formatChartData() {
      this.isColumn = false;
      if (!this.itemIndex) return;
      const item = this.items[this.itemIndex - 1];
      this.item = item;
      let yAxisName = [],
        yAxisType = ["normal"],
        axisSite = {},
        rows = [],
        columns = [];
      let chartRow = {},
        min = [0],
        max = [100],
        labelMap = {};
      chartRow["name"] = this.deviceName
        ? this.deviceName + this.itemIndex
        : "";
      let dataType = {};
      console.log(
        this.itemFields,
        "format chartdata",
        item,
        this.items,
        this.itemIndex
      );
      this.itemFields.map(temp => {
        let cur = item[temp];
        let itemKey = temp + "_name",
          itemValue = temp + "_value";
        let curKeyVal = cur[itemKey],
          curValueVal = cur[itemValue];
        yAxisName.push(curKeyVal + " " + this.unit[temp]);
        columns.push(temp);
        chartRow[temp] = curValueVal;
        labelMap[temp] = curKeyVal;
        dataType[temp] = "normal";
      });
      console.log(yAxisName, "yAxisName...");
      let len = yAxisName.length;
      if (len > 1) {
        axisSite = { right: [columns[len - 1]] };
        yAxisType.push("normal");
        min.push(0), max.push(100);
      }
      rows.push(chartRow);
      this.chartSettings = {
        dataType,
        axisSite,
        yAxisType,
        yAxisName,
        max,
        labelMap,
        digit: 2
      };
      if (columns.length > 1) {
        this.isColumn = true;
      }
      columns = ["name"].concat(columns);
      this.chartData = {
        columns,
        rows
      };
      console.log();
    },
    getData(data, loading = true) {
      fetchDevice(data, loading).then(res => {
        console.log(res);
        this.device = res.data.devices;
        if (this.device.length === 0) {
          // MessageBox.alert(`该设备没有数据！`, "提示");
          this.items = [];
          this.num = 0;
          this.itemFields = [];
          this.deviceName = null;
          this.item = null;
          this.dataEmpty = true;
          this.chartData = {
            columns: [],
            rows: []
          };
          this.chartSettings = {
            axisSite: {},
            yAxisType: [],
            yAxisName: [],
            min: [],
            max: [],
            labelMap: {}
          };
          console.log(this.chart, "chart instance....");
          if (this.chart) {
            this.chart.clear();
          }
          return;
        }
        this.dataEmpty = false;
        this.items = getDataValue(this.device, ["items"], []);
        this.num = getDataValue(this.device, ["num"], 0);
        this.itemFields = getDataValue(this.device, ["fields"], []);
        this.deviceName = getDataValue(this.device, ["name"], "");
        this.unit = getDataValue(this.device, ["unit"], null);
        this.icons = getDataValue(this.device, ["typeicons"], null);
        this.formatChartData();
      });
    },
    remoteCb() {
      const { pdi } = this;
      this.getData({ pdi }, false);
    }
  },
  watch: {
    pdiIndex(newVal) {
      let { value: device } = newVal;
      this.getData({ ...newVal, device });
    },
    itemIndex(newVal) {
      // this.getData(newVal)
      console.log(newVal, "item Index change.......");
      this.formatChartData();
    },
    selectDevice(newVal) {
      if (newVal === false) this.openMenu = false;
    },
    $route: function(to) {
      console.log(to, "device to .....");
    }
  },
  computed: {
    currentItem() {
      let items = {};
      for (let itemKey in this.item) {
        if (itemKey != "consta") {
          items[itemKey] = this.item[itemKey];
        }
      }
      return items;
    }
  },
  mounted() {},
  created() {
    console.log(this.$route.params);
    this.extend = {
      grid: {
        left: "5%",
        right: "5%",
        bottom: "1%"
      },
      tooltip: {}
    };
    const { pdi } = this.$route.params;
    this.pdi = pdi;
    this.getData({ pdi });
    this.startTimer();
  }
};
</script>

<style lang='scss' scoped>
.chart-block {
  display: inline-block;
  position: relative;
  height: 45%;
  width: 100%;
  // overflow: hidden;
}
.itemSelect {
  background-color: $blue;
  /deep/ {
    .mint-cell-text {
      color: #fff;
      vertical-align: inherit;
    }
    .item-icon {
      color: #fff;
    }
  }
}

.chart {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.layout-container /deep/ .popup-device {
  height: 40%;
  overflow-y: auto;
}
.layout-container {
  height: 100%;
  overflow: hidden;
}
</style>
