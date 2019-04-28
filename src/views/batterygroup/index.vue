<template>
  <div class="layout-container air">
    <top-component></top-component>
    <div v-if="detail" class="battery-total">
      <mt-cell :title="item.label" v-for="(item, index) in totalFields" :key="index">
        <template v-if="!item.isBool">{{ detail[item.field] }}</template>
        <template v-if="item.isBool">
          <mt-badge
            :type="detail[item.field]==0?'success':'error'"
          >{{ detail[item.field]==0?"正常":"断线" }}</mt-badge>
        </template>
      </mt-cell>

      <!-- <mt-cell title="当前电池" @click.native="openBattery">{{ currentBattery }}</mt-cell> -->
    </div>
    <div class="battery" v-if="detail">
      <svg-icon icon-class="battery-bg" :class="['bg-item-icon', {'battery-error': batteryClass}]"></svg-icon>
      <ul class="battery-result">
        <li class="battery-title" @click="openBattery">{{ currentBattery }}</li>
        <li
          v-for="item in batterySingle"
          :key="item.field"
        >{{ item.label }}: {{ item.value }} {{ item.unit }}</li>
      </ul>
    </div>

    <mt-popup v-model="groupStatusPopup" class="popup-device" position="bottom">
      <mt-cell
        :title="item.label"
        v-for="(item, index) in groupStatusText"
        :key="index"
        @click.native="changeGroupStatus(index)"
        :class="['donghuang-item', {'active-cell': groupStatusIndex == index}]"
      >
        <!-- <icon-bg slot="icon" class="battery-group" icon="battery-group" small></icon-bg> -->
      </mt-cell>
    </mt-popup>
    <mt-popup v-model="batteryPopup" class="popup-device battery-popup" position="bottom">
      <mt-cell title="电池状态" @click.native="openStatus">{{ currentGroupText }}</mt-cell>
      <mt-field label="电池节数" placeholder="请输入电池节数" type="number" v-model="batteryFilterIndex"></mt-field>
      <mt-cell
        :title="getBattery(item)"
        v-for="item in batteryPopupData"
        :key="item"
        @click.native="changeBattery(item)"
        :class="['donghuang-item', {'active-cell': batteryIndex == item}]"
      >
        <icon-bg slot="icon" class="battery-group" icon="battery" small></icon-bg>
      </mt-cell>
    </mt-popup>
  </div>
</template>

<script>
import { fetchDevice } from "@/api/monitor";

export default {
  data() {
    return {
      detail: null,
      pdi: null,
      prefix: "rd_Bat",
      groupStatusPopup: false,
      groupStatusText: [
        { label: "全部", value: 1 },
        { label: "故障", value: 2 },
        { label: "正常", value: 3 }
      ],
      groupStatusIndex: 0,
      currentGroupStatus: 1,
      currentGroupText: "全部",
      batteryPopup: false,
      batteryIndex: 1,
      batteryLength: 64,
      batteryPopupData: [],
      batteryWarnData: [],
      batterySuccessData: [],
      batteryAllData: [],
      batterySingle: [],
      batteryFilterIndex: this.batteryIndex,
      totalFields: [
        { label: "总电压", field: "rd_BatAllVol", isBool: false },
        { label: "总电流1", field: "rd_BatAllCur1", isBool: false },
        { label: "总电流2", field: "rd_BatAllCur", isBool: false },
        { label: "后备时间", field: "rd_BatBackTime", isBool: false },
        { label: "剩余毫安", field: "rd_RemTime", isBool: false },
        { label: "总毫安", field: "rd_AllMAH", isBool: false },
        { label: "剩余容量", field: "rd_RemCap", isBool: false },
        { label: "充电电流", field: "rd_BatCharSta", isBool: true },
        { label: "放电电流", field: "rd_BatDisCharSta", isBool: true },
        { label: "总电压状态", field: "rd_BatAllVolSta", isBool: true },
        { label: "通讯状态", field: "rd_BatAllVolSta", isBool: true },
        { label: "网络通讯", field: "rd_NetCom", isBool: true }
      ],
      paramsField: [
        { field: "SinVol", label: "电压", unit: "V" },
        { field: "SinTemp", label: "温度", unit: "℃" },
        { field: "SinRes", label: "内阻", unit: "V/A" }
      ]
    };
  },
  computed: {
    currentBattery() {
      return this.getBattery(this.batteryIndex);
    },
    batteryClass() {
      return this.batteryWarnData.includes(this.batteryIndex);
    }
  },
  watch: {
    batteryFilterIndex(nval) {
      if (!nval) return;
      this.batteryIndex = nval;
      this.batterySingle = this.genFields(this.batteryIndex);
    },
    detail(nval) {
      if (!nval) return;
      this.genBattery();
    }
  },
  methods: {
    fetchDevice,
    openStatus() {
      this.groupStatusPopup = true;
    },
    changeGroupStatus(index) {
      this.groupStatusIndex = index;
      const { value, label } = this.groupStatusText[index];
      this.currentGroupText = label;
      this.currentGroupStatus = value;
      if (value == 1) {
        this.batteryPopupData = this.batteryAllData;
      }
      if (value == 2) {
        this.batteryPopupData = this.batteryWarnData;
      }
      if (value == 3) {
        this.batteryPopupData = this.batterySuccessData;
      }
    },
    openBattery() {
      this.batteryPopup = true;
    },
    changeBattery(index) {
      this.batteryIndex = index;
      this.batterySingle = this.genFields(index);
    },
    getBattery(i) {
      return `${i}号电池`;
    },
    genFields(i) {
      return this.paramsField.map(item => {
        item.value = this.detail[`rd_${item.field}_${i}`];
        return item;
      });
    },
    genBattery() {
      const warn = [];
      const success = [];
      const data = [];
      for (let i = 1; i <= 64; i++) {
        let warnField = `rd_SinWarn_${i}`;
        data.push(i);
        if (this.detail[warnField] == 0) {
          success.push(i);
        } else {
          warn.push(i);
        }
      }
      this.batteryAllData = data;
      this.batteryWarnData = warn;
      this.batterySuccessData = success;
      this.batteryPopupData = this.batteryAllData;
      this.batterySingle = this.genFields(this.batteryIndex);
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

<style lang='scss' scoped>
.battery-group {
  border-color: rgba(#ccc, 0.5);
}
.bg-item-icon {
  width: 8rem;
  height: 8rem;
  color: $theme-color;
  &.battery-error {
    color: #f44336;
  }
}
.battery {
  position: relative;
  // background: url("../../assets/battery-bg.svg") no-repeat 50% 50%;
  // background-size: 100% 100%;
  // width: 100%;
  // height: 50%;
  color: $theme-color;
}
.battery-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 2.5rem;
  li {
    line-height: 40px;
    height: 40px;
    text-align: left;
    border-bottom: 1px solid $theme-color;
    &.battery-title {
      text-align: center;
      line-height: 50px;
      height: 50px;
      font-size: 0.5rem;
      &::after {
        border: solid 2px $theme-color;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        // position: absolute;
        width: 6px;
        height: 6px;
        transform: rotate(135deg);
        display: inline-block;
        margin-left: 5px;
        margin-bottom: 0.15rem;
      }
    }
  }
}
.battery-popup {
  max-height: 300px;
  overflow: hidden;
  overflow-y: auto;
}
.battery-total .mint-cell {
  width: 50%;
  min-height: 1.1rem;
  display: inline-block;
}
</style>

