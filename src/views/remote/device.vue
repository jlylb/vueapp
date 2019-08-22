<template>
  <div class="layout-container" ref="topLayout">
    <top-component @top-btn="selectType"></top-component>
    <mt-loadmore
      :top-method="loadTop"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
      :auto-fill="false"
    >
      <u-grid :items="device.out" v-if="device"></u-grid>
      <mt-field
        :label="item.label"
        placeholder="请输入时间"
        v-model="item.line.value"
        v-for="item in time"
        :key="item.label"
      >分钟</mt-field>
      <mt-cell title class="btn-save" v-if="time.length>0">
        <mt-button type="primary" @click="saveTime" size="large">保存</mt-button>
      </mt-cell>
    </mt-loadmore>
    <drop-menu :open.sync="openMenu" :data="deviceData" @menuItem="clickMenu"></drop-menu>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { fetchAreaDevice, fetchDeviceData, saveCommand } from "@/api/yuxiang";
import DropMenu from "@/components/dropdown";
import { getDataValue } from "@/tools";

import { Indicator, Toast } from "mint-ui";
import IconBg from "@/components/iconBg";
import MySwitch from "@/components/mySwitch";
import uGrid from "@/components/grid/grid";

export default {
  components: { DropMenu, IconBg, MySwitch, uGrid },
  data() {
    return {
      popupVisible: false,
      deviceStatus: true,
      workStatus: true,
      device: null,
      item: {},
      dapeng: null,
      deviceData: null,
      pdiIndex: null,
      openMenu: false,
      netStatus: false,
      allLoaded: false,
      two: ["关", "开"],
      three: ["停", "起"],
      four: ["停", "落"],
      out: false,
      sub: [],
      formatSub: {},
      open: false,
      topHeight: 0,
      deviceOut: [],
      time: []
    };
  },

  provide() {
    return {
      control: this
    };
  },
  computed: {
    indexHeight: {
      get() {
        this.topHeight = this.$refs.topLayout.offsetHeight;
        return this.topHeight;
      },
      set(val) {
        this.topHeight = val;
      }
    }
  },
  methods: {
    openDevice(item) {
      this.popupVisible = true;
      this.item = item;
    },
    selectType() {
      this.openMenu = true;
    },
    clickMenu(item) {
      this.openMenu = false;
      this.pdiIndex = item;
    },
    getData(data) {
      Indicator.open("正在加载中...");
      return fetchDeviceData(data)
        .then(res => {
          console.log(res, "control deviceing......");
          this.device = res.data.devicesData;

          if (this.device) {
            this.deviceOut = this.device.out;
            this.time = this.device.time;
          }
          Indicator.close();
        })
        .catch(() => {
          Indicator.close();
        });
    },
    changeWork(item, val) {
      console.log(item, val);
      const { value: pdi_index } = this.pdiIndex;
      MessageBox.confirm("确定更改状态?", "提示", {
        closeOnClickModal: false
      })
        .then(action => {
          const { Dp_id, bStatus: status } = item;
          saveCommand({ status, dp_id: Dp_id, pdi_index }).then(res => {
            MessageBox.alert(res.data.msg);
          });
        })
        .catch(res => {
          item.bStatus = val;
        });
    },
    changeDevice(val) {
      console.log(val);
      MessageBox.confirm("确定更改设备状态?", "提示", {
        closeOnClickModal: false
      })
        .then(action => {})
        .catch(res => {
          this.deviceStatus = val;
        });
    },
    fetchData() {
      console.log(this.pdiIndex, "pdi_index..........");
      const { value: pdi_index, device_type: dpt_id } = this.pdiIndex;
      this.getData({ pdi_index, dpt_id });
      this.allLoaded = true;
      this.$refs.loadmore.onTopLoaded();
      // this.$refs.loadmore1.onTopLoaded();
      this.$forceUpdate();
    },

    loadTop() {
      //this.device = null;
      this.fetchData();
    },

    changeControl(val, data, current, index) {
      console.log(val, data, current, index, "change control.......");
      MessageBox.confirm("确定更改状态?", "提示", {
        closeOnClickModal: false
      })
        .then(action => {
          Indicator.open("正在处理中...");
          const { dp_id: dpId } = current;
          const { value: pdi_index } = this.pdiIndex;
          const params = [];
          params.push({ status: current.bStatus ? 1 : 0, dp_id: dpId });
          data.map(item => {
            if (item.dp_id != dpId) {
              params.push({
                status: 0,
                dp_id: item.dp_id
              });
            }
          });
          saveCommand({ params, pdi_index: pdi_index })
            .then(res => {
              data.map(item => {
                if (item.dp_id != dpId) {
                  item.bStatus = false;
                  item.value = 0;
                }
                return item;
              });
              current.value = current.bStatus ? 1 : 0;
              setTimeout(() => {
                Indicator.close();
                Toast(res.data.msg);
              }, 3000);
            })
            .catch(() => {
              current.bStatus = !current.bStatus;
              current.value = current.bStatus ? 1 : 0;
              Indicator.close();
              Toast("已取消更改");
            });
        })
        .catch(res => {
          current.bStatus = !current.bStatus;
          current.value = current.bStatus ? 1 : 0;
          Indicator.close();
        });
    },
    isNumber(val) {
      return /^\d+$/.test(val);
    },
    saveTime() {
      console.log(this.time, "......");
      if (this.time.length === 0) return;
      const params = [];
      const errors = [];
      this.time.forEach(item => {
        let line = item.line;
        if (!this.isNumber(line.value)) {
          errors.push(item.label);
        } else {
          params.push({ dp_id: line.dp_id, status: line.value });
        }
      });
      if (errors.length > 0) {
        Toast(`${errors[0]}必须是数字`);
        return;
      }
      const { value: pdi_index } = this.pdiIndex;
      Indicator.open("正在处理中...");
      saveCommand({ params, pdi_index: pdi_index }).then(res => {
        setTimeout(() => {
          Indicator.close();
          Toast(res.data.msg);
        }, 3000);
      });
    }
  },
  watch: {
    pdiIndex(newVal) {
      const { value: pdi_index, device_type: dpt_id } = newVal;
      this.getData({ pdi_index, dpt_id });
    }
  },
  beforeUpdate() {},
  mounted() {
    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.indexHeight = this.$refs.topLayout.offsetHeight;
      }, 100);
      // this.indexOutKey = `${this.indexOutKey}${+new Date()}`;
    });
  },
  created() {
    console.log(this.$route.params);
    const { areaId, dapeng } = this.$route.params;
    this.dapeng = dapeng;
    Indicator.open("正在加载中...");
    fetchAreaDevice({ areaId }).then(res => {
      this.deviceData = res.data.devices;
      Indicator.close();
      if (!this.deviceData) {
        MessageBox.alert(`该大棚没有设备！`, "提示");
        return;
      }
      this.pdiIndex = getDataValue(this.deviceData, [0], null);
    });
  }
};
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
}
.mylist {
  overflow: auto;
}
.control-title /deep/ .mint-cell-value {
  width: 100%;
  justify-content: center;
  color: $theme-color;
  font-weight: bolder;
}
</style>
<style lang="scss">
.btn-save .mint-cell-value {
  width: 100%;
  justify-content: center;
}
</style>