<template>
  <div class="layout-container" ref="topLayout">
    <top-component @top-btn="selectType"></top-component>

    <mt-swipe :auto="0" @change="handlerChange" :show-indicators="false">
      <mt-swipe-item class="slide2" key="slide2">
        <mt-index-list
          ref="outSlide"
          :show-indicator="false"
          :key="indexOutKey"
          v-if="device"
          class="mylist"
          :height="indexHeight"
          v-sindex
        >
          <mt-index-section :index="'输出'" key="out_first">
            <mt-loadmore
              :top-method="loadTop"
              :bottom-all-loaded="allLoaded"
              ref="loadmore"
              :auto-fill="false"
            >
              <div>
                <!-- <mt-cell class="control-title">输出</mt-cell> -->
                <mt-cell title="更新时间">{{ device.rd_updatetime }}</mt-cell>
                <mt-cell title="网络状态">
                  <mt-switch v-model="netStatus" disabled></mt-switch>
                </mt-cell>
                <mt-cell title="当前状态">
                  <mt-badge
                    :type="device.in[1].status==1?'primary':'error'"
                  >{{ device.in[1].status==1?"自动":"手动" }}</mt-badge>
                </mt-cell>
              </div>
            </mt-loadmore>
          </mt-index-section>

          <mt-index-section
            v-for="items in device.out"
            :key="'out_'+items.order"
            :index="items.order"
          >
            <mt-cell
              :key="'out_'+items.order+'_'+itemIndex"
              v-for="(item, itemIndex) in items.line"
            >
              <icon-bg
                slot="title"
              >{{ itemIndex==0?(items.line.length > 1 ? three[item.value] : two[item.value]): four[item.value] }}</icon-bg>
              <template v-if="items.line.length==1">
                <mt-switch
                  v-model="item.bStatus"
                  @change="changeControl($event, items.line, item,  items.order)"
                ></mt-switch>
              </template>
              <template v-if="items.line.length==2">
                <my-switch
                  @switch-change="changeControl($event, items.line, item,  items.order)"
                  :sstatus.sync="item.bStatus"
                  :true-label="itemIndex==0?'起':'落'"
                ></my-switch>
              </template>
            </mt-cell>
            <mt-cell>
              <icon-bg slot="icon" :icon="items.icon"></icon-bg>
              {{ items.label }}
            </mt-cell>
          </mt-index-section>
        </mt-index-list>
      </mt-swipe-item>
    </mt-swipe>

    <drop-menu :open.sync="openMenu" :data="deviceData" @menuItem="clickMenu"></drop-menu>
    <my-popup
      :show-toolbar="true"
      v-model="currentType"
      @input-change="changeType"
      :open.sync="open"
      :slots="slots"
      @confirm="confirmOk"
      @cancel="cancel"
    ></my-popup>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import {
  fetchAreaDevice,
  fetchDeviceData,
  saveCommand,
  saveSwitch,
  saveOut
} from "@/api/control";
import DropMenu from "@/components/dropdown";
import { getDataValue } from "@/tools";
import MyPopup from "@/components/popup";
import { Indicator, Toast } from "mint-ui";
import IconBg from "@/components/iconBg";
import MySwitch from "@/components/mySwitch";

export default {
  components: { DropMenu, MyPopup, IconBg, MySwitch },
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
      slots: [],
      slotsValue: [],
      currentType: null,
      currentItem: null,
      currentIndex: null,
      index2: "index-list2",
      swipeIndex: 0,
      titleOpen: false,
      topHeight: 0,
      indexOutKey: "index-list1",
      deviceOut: []
    };
  },
  directives: {
    sindex: {
      // 指令的定义
      bind: function(el, binding, vnode) {},
      inserted: function(el, binding, vnode) {
        console.log(el, binding, "inserted....", vnode, this);
        const { key: currentKey } = vnode;
        if (currentKey === "index-list2") {
          const { content } = vnode.child.$refs;
          content.style.marginRight = `36px`;
        }
      },
      update(el, binding, vnode) {},
      componentUpdated(el, binding, vnode) {}
    }
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
          this.deviceOut = this.device.out;
          if (this.device) {
            const { rd_NetCom, sub } = res.data.devicesData;
            this.netStatus = rd_NetCom === 0 ? true : false;
            this.sub = sub;
            let slots = [];
            sub.forEach(item => {
              this.formatSub[item.ts_typeid] = item.ts_TypeMo;
              let { ts_typeid: value, ts_TypeMo: label, ts_Icon: icon } = item;
              slots.push({ label, value, icon });
            });
            this.slotsValue = slots;
            console.log(slots, "after slots.....");
          }
          Indicator.close();
        })
        .catch(() => {
          Indicator.close();
        });
    },
    doStatus(data) {},
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
      this.$refs.loadmore1.onTopLoaded();
      this.$forceUpdate();
    },

    loadTop() {
      //this.device = null;
      this.fetchData();
    },
    handlerChange(index) {
      console.log(index, "change.....", this);
      this.index2 = "index-list2_1";
      this.swipeIndex = index;
    },
    changeType(item) {
      // this.currentItem = null;
      console.log(item, "change item....");
    },
    chooseType(items, index) {
      console.log(items, "choose type......");
      this.open = true;
      this.currentIndex = index;
      this.currentItem = items;
      let curItem;
      if (Array.isArray(items)) {
        curItem = items[0];
      } else {
        curItem = items;
      }
      if (curItem) {
        this.currentType = {
          value: curItem.tu_SubTypeId,
          label: curItem.ts_TypeMo,
          icon: curItem.ts_Icon
        };
      } else {
        this.currentType = null;
      }

      this.slots = [
        {
          flex: 1,
          defaultIndex: this.currentType
            ? this.getSlotIndex(this.currentType, this.slotsValue)
            : 0,
          values: this.slotsValue,
          className: "slot4"
        }
      ];
      this.currentType = null;
    },
    chooseOutType(items) {},
    getSlotIndex(first, data) {
      for (let index in data) {
        let { label, value } = data[index];
        if (first.value == value) {
          return Number(index);
        }
      }
      return 0;
    },
    inputSelect() {
      const { Dp_id: dp_id, dp_paramdesc: desc } = this.currentItem;
      const { value: subtype = 0 } = this.currentType;
      const { value: pdi_index } = this.pdiIndex;
      Indicator.open("正在处理中...");
      saveSwitch({
        sindex: this.currentIndex,
        pdi_index: pdi_index,
        dp_id,
        subtype,
        desc
      })
        .then(res => {
          Toast(res.data.msg);
          const inData = this.device.in;
          const {
            value: tu_SubTypeId,
            label: ts_TypeMo,
            icon: ts_Icon
          } = this.currentType;
          inData[this.currentIndex] = Object.assign(
            {},
            inData[this.currentIndex],
            { tu_SubTypeId, ts_TypeMo, ts_Icon }
          );
          this.device.in = inData;
          Indicator.close();
        })
        .catch(() => {
          Indicator.close();
        });
    },
    inputSave(pdesc, data, index) {
      const { Dp_id: dp_id, dp_paramdesc: sdesc } = data;

      const { tu_SubTypeId: subtype = 0 } = data;

      let desc = pdesc ? pdesc : sdesc;

      Indicator.open("正在处理中...");
      const { value: pdi_index } = this.pdiIndex;
      saveSwitch({
        sindex: index,
        pdi_index: pdi_index,
        dp_id,
        subtype,
        desc
      })
        .then(res => {
          Toast(res.data.msg);
          const inData = this.device.in;

          inData[index] = Object.assign({}, inData[index], {
            dp_paramdesc: desc
          });
          this.device.in = inData;
          Indicator.close();
        })
        .catch(() => {
          Indicator.close();
        });
    },
    outSelect() {
      const dpId = [];
      this.currentItem.forEach(item => {
        dpId.push(item.tu_Warnid);
      });
      const { value: pdi_index, device_type: dpt_id } = this.pdiIndex;
      const { value: subtype = 0 } = this.currentType;
      Indicator.open("正在处理中...");
      saveOut({
        pdi_index: pdi_index,
        subtype,
        dp_id: dpId
      })
        .then(res => {
          this.getData({ pdi_index: pdi_index, dpt_id: dpt_id });
          Toast(res.data.msg);
          Indicator.close();
        })
        .catch(() => {
          Indicator.close();
        });
    },
    confirmOk() {
      this.open = false;
      // 输入
      if (this.swipeIndex == 1) {
        this.inputSelect();
      }
      // 输出
      if (this.swipeIndex == 0) {
        this.outSelect();
      }
    },
    cancel() {},
    titleChange(items, index) {
      MessageBox.prompt(items.dp_paramdesc)
        .then(({ value, action }) => {
          this.inputSave(value, items, index);
        })
        .catch(() => {});
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
    console.log(
      this.$refs.topLayout,
      "mounted.......",
      this.$refs.topLayout.offsetHeight
    );

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
