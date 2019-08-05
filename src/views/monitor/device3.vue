<template>
  <div class="layout-container">
    <top-component @top-btn="selectType"></top-component>

    <div class="chart-block">
      <ve-histogram
        :data="chartData"
        :settings="chartSettings"
        :extend="extend"
        :data-empty="dataEmpty"
        :after-set-option="afterSet"
        height="100%"
      ></ve-histogram>
    </div>
    <div class="chart-desc" v-if="item">
      <div class="chart-desc-title">
        <div class="chart-desc-item chart-desc-item-left">
          <div class="chart-desc-icon">
            <svg-icon icon-class="dapeng" class="item-icon"></svg-icon>
          </div>
        </div>
        <div class="chart-desc-item chart-desc-item-right">
          <p>
            {{ dapengName }}
            <span
              class="item-title item-title-select"
              @click="deviceFileter"
            >{{ pdiIndex && pdiIndex.label }}</span>
          </p>
          <p class="net-status">
            {{ item['consta']['consta_name'] }}:
            <mt-badge
              :type="item['consta']['consta_value']==0?'success':'error'"
            >{{ item['consta']['consta_value']==0?'正常':'断线' }}</mt-badge>
          </p>
        </div>
      </div>
      <div class="chart-desc-block">
        <mt-swipe :auto="0" class="swipe-param">
          <mt-swipe-item v-for="(itemValue, index) in currentItem" :key="'swipe_'+index">
            <div :class="['chart-desc-block-item', itemClass[itemFields.indexOf(index)]]">
              <div class="row">
                <div class="row-left">
                  <icon-bg :icon="icons[index]" slot="icon" small></icon-bg>
                  <span>{{ itemValue[index+'_name'] }}</span>
                </div>
                <span class="row-right">{{ itemValue[index+'_value'] }} {{ unit[index] }}</span>
              </div>
              <div class="row">
                <div class="row-left">
                  <icon-bg icon="alarm" slot="icon" small></icon-bg>
                  <span>上限告警</span>
                </div>
                <span class="row-right">{{ itemValue['hwarn_value']===0?'正常':'过高' }}</span>
              </div>
              <div class="row">
                <div class="row-left">
                  <icon-bg icon="alarm" slot="icon" small></icon-bg>
                  <span>下限告警</span>
                </div>
                <span class="row-right">{{ itemValue['lwarn_value']===0?'正常':'过低' }}</span>
              </div>
              <div class="row">
                <div class="row-left">
                  <icon-bg icon="limit-up" slot="icon" small></icon-bg>
                  <span>上限阀值</span>
                </div>
                <span class="row-right">{{ itemValue['up_value'] }} {{ unit[index] }}</span>
              </div>
              <div class="row">
                <div class="row-left">
                  <icon-bg icon="limit-down" slot="icon" small></icon-bg>
                  <span>下限阀值</span>
                </div>
                <span class="row-right">{{ itemValue['down_value'] }} {{ unit[index] }}</span>
              </div>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>

    <mt-popup
      v-model="selectDevice"
      class="popup-device"
      :style="{height: '240px'}"
      position="bottom"
    >
      <mt-cell
        :title="deviceName + item"
        @click.native="openDevice(item)"
        :class="['dapeng-item', { itemSelect: itemIndex===item }]"
        is-link
        v-for="item in num"
        :key="item"
      >
        <icon-bg :icon="pdiIndex.icon" slot="icon" small v-if="pdiIndex"></icon-bg>

        <mt-button size="small" @click="setValue" v-if="limitItems.length>0">
          <svg-icon icon-class="limit-config" slot="icon"></svg-icon>
        </mt-button>
      </mt-cell>
    </mt-popup>

    <drop-menu :open.sync="openMenu" :data="deviceData" @menuItem="clickMenu"></drop-menu>

    <value-setting
      :visible.sync="openSetting"
      :pdi-index="deviceIndex"
      :item-index="itemIndex"
      :items="limitItems"
    ></value-setting>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { fetchDevice, fetchAreaDevice } from "@/api/monitor";
import DropMenu from "@/components/dropdown";
import { getDataValue } from "@/tools";
import IconBg from "@/components/iconBg";
import freshData from "@/tools/freshdata";
import MyLoading from "@/tools/reloading";
import ValueSetting from "./setting";

export default {
  components: { DropMenu, IconBg, ValueSetting },
  mixins: [freshData],
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
      dapengName: null,
      itemSelect: "itemSelect",
      dataEmpty: false,
      chart: null,
      loading: false,
      isColumn: false,
      deviceParams: {},
      openSetting: false
    };
  },
  computed: {
    currentItem() {
      let items = {};
      for (let itemKey in this.item) {
        if (itemKey != "consta" && itemKey != "limit") {
          items[itemKey] = this.item[itemKey];
        }
      }
      return items;
    },
    limitItems() {
      return this.item ? this.item.limit : null;
    },
    deviceIndex() {
      return this.pdiIndex ? this.pdiIndex.value : null;
    }
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
      if (!this.deviceData) return;
      this.openMenu = true;
    },
    formatChartData() {
      this.isColumn = false;
      if (this.items.length === 0) return;
      const item = this.items[this.itemIndex - 1];
      this.item = item;
      let yAxisName = [],
        yAxisType = ["value"],
        axisSite = {},
        rows = [],
        columns = [];
      let chartRow = {},
        labelMap = {};
      chartRow["name"] = this.deviceName
        ? this.deviceName + this.itemIndex
        : "";
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
      });
      let len = yAxisName.length;

      // let min = ["dataMin"],
      //   max = ["dataMax"];
      if (len > 1) {
        axisSite = { right: [columns[len - 1]] };
        yAxisType.push("value");
        // min.push("dataMin"), max.push("dataMax");
      }
      rows.push(chartRow);
      this.chartSettings = {
        axisSite,
        yAxisType,
        yAxisName,
        // min,
        // max,
        labelMap
      };
      if (columns.length > 1) {
        this.isColumn = true;
      }
      columns = ["name"].concat(columns);
      this.chartData = {
        columns,
        rows
      };
    },
    getData(isLoading = true) {
      MyLoading.isShow = isLoading;
      MyLoading.start();
      fetchDevice(this.deviceParams)
        .then(res => {
          MyLoading.close();
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
              // min: [],
              // max: [],
              labelMap: {}
            };
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
          this.icons = getDataValue(this.device, ["icons"], null);
          this.formatChartData();
        })
        .catch(() => {
          MyLoading.close();
        });
    },
    setValue() {
      this.openSetting = true;
    }
  },
  watch: {
    pdiIndex(newVal) {
      const { value: device, device_type } = newVal;
      this.itemIndex = 1;
      this.deviceParams = { device, device_type };
      this.getData();
    },
    itemIndex(newVal) {
      this.formatChartData();
    },
    selectDevice(newVal) {
      if (newVal === false) this.openMenu = false;
    }
  },
  created() {
    const { areaId, dapeng, dapengName } = this.$route.params;
    this.dapeng = dapeng;
    this.dapengName = dapengName;
    this.extend = {
      grid: {
        left: "8%",
        right: "8%",
        bottom: "1%"
      },
      yAxis(v) {
        v.forEach(i => {
          i.min = value => {
            return value.min == 0 ? 0 : value.min - 10;
          };
          i.max = value => {
            return value.max + 10;
          };
        });
        return v;
      },
      series(v) {
        if (v) {
          v.forEach(i => {
            i.barWidth = "15%";
          });
          return v;
        }
      }
    };
    MyLoading.enable().start();
    fetchAreaDevice({ areaId })
      .then(res => {
        this.deviceData = res.data.devices;
        MyLoading.close();
        if (!this.deviceData) {
          MessageBox.alert(`该大棚没有设备！`, "提示");
          return;
        }
        this.pdiIndex = getDataValue(this.deviceData, [0], null);
        this.startTimer();
      })
      .catch(() => {
        MyLoading.close();
      });
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
  background-color: darken($theme-color, 10%);

  /deep/ {
    .mint-cell-text {
      color: #fff;
      vertical-align: inherit;
    }
    .item-icon {
      color: #fff;
    }
    .mint-cell-allow-right::after {
      border-color: #fff;
    }
  }
}
.item-title {
  letter-spacing: normal;
  // cursor: pointer;
  &::after {
    border: solid 2px #67c23a;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    position: absolute;
    width: 6px;
    height: 6px;
    transform: rotate(135deg);
    display: inline-block;
    margin-left: 3px;
  }
}

.chart {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.chart-desc {
  height: 55%;
}
.chart-desc-title {
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 10px 0;
  height: 25%;
  background-color: darken($theme-color, 10%);
}
.chart-desc-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: $theme-color;
  position: relative;
  margin: 0 auto;
  .item-icon {
    position: absolute;
    fill: #fff;
    width: 40px;
    height: 40px;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
.chart-desc-item-left {
  width: 25%;
}
.chart-desc-item-right {
  width: 75%;
  p {
    &:first-child {
      color: #67c23a;
      // letter-spacing: 5px;
    }
    text-align: left;
    padding: 5px;
    color: #67c23a;
    span {
      display: inline-block;
      // padding-left: 3px;
    }
  }
}
.chart-desc-block {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  // height: 185px;
  height: 75%;
}
.chart-desc-block-item {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  .row {
    display: flex;
    justify-content: space-around;
    width: 90%;
    .row-left {
      display: flex;
      width: 60%;
      text-align: left;
    }
    .row-right {
      width: 40%;
      text-align: center;
    }
    span {
      &:first-child {
        margin-right: 5px;
      }
      border-radius: 25%;
      border: 1px solid rgba(255, 255, 255, 0.8);
      display: inline-block;
      padding: 5px;
    }
  }
}

@mixin color-item($color) {
  /deep/ .icon-background {
    background-color: $color;
    border-color: $color;
  }
  .row span {
    border: none;
  }
  color: darken($color, 10%);
}

// $color-red: #b76cf5;
// $color-yellow: #e6a23c;
// $color-primary: #409eff;

$color-red: $theme-color;
$color-yellow: $theme-color;
$color-primary: $theme-color;

.red {
  // background-color: rgba(lighten($color-red, 1%), 0.5);
  @include color-item($color-red);
}
.yellow {
  // background-color: rgba(lighten($color-yellow, 1%), 0.5);
  @include color-item($color-yellow);
}
.primary {
  // background-color: rgba(lighten($color-primary, 1%), 0.5);
  @include color-item($color-primary);
}
.layout-container /deep/ .popup-device {
  height: 40%;
  overflow-y: auto;
}
.layout-container {
  height: 100%;
  overflow: hidden;
}
.swipe-param {
  width: 100%;
  color: $theme-color;
  /deep/ .mint-swipe-indicator {
    background-color: lighten($theme-color, 5%);
    &.is-active {
      background-color: darken($theme-color, 10%);
      opacity: 1;
    }
  }
}
</style>
