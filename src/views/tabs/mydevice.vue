<template>
  <div class="layout-container">
    <top-component>
      <span slot="right" @click="openAdd">添加</span>
    </top-component>
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :auto-fill="false"
      ref="loadmore"
      class="device-more"
    >
      <div class="page-cell">
        <mt-cell-swipe
          :title="item.pdi_name"
          :label="`设备编号: ${item.pdi_index}`"
          @click.native="openDevice(item)"
          is-link
          v-for="(item, index) in device"
          :key="index"
          :right="[
        {
          content: '修改',
          style: { background: '#06509c', color: '#fff' },
          handler: () => { handlerUpdate(item, index) }
        },
        {
          content: '删除',
          style: { background: '#e21414', color: '#fff' },
          handler: () => { handlerDelete(item, index) }
        }
      ]"
        ></mt-cell-swipe>
      </div>
    </mt-loadmore>

    <mt-popup v-model="popupDetail" class="popup-device" position="bottom">
      <mt-cell title="设备名称">{{ item.pdi_name }}</mt-cell>
      <mt-cell title="设备编号">{{ item.pdi_index }}</mt-cell>
      <mt-cell title="设备类型">{{ item.types && item.types.dt_typename }}</mt-cell>

      <mt-cell title="所在区域">{{ item.area && item.area.AreaName }}</mt-cell>
    </mt-popup>

    <mt-popup
      v-model="popupVisible"
      ref="addDevice"
      class="popup-device add-device"
      :close-on-click-modal="false"
      popup-transition="popup-fade"
    >
      <mt-field
        label="设备编码"
        placeholder="请输入设备编码"
        v-model="deviceModel.pdi"
        data-vv-name="pdi"
        :state="states['pdi']"
        v-validate="{ required: true}"
      ></mt-field>
      <p class="field-error" v-if="states['pdi']=='error'">{{ errors.first('pdi') }}</p>
      <mt-field
        label="设备名称"
        placeholder="请输入设备名称"
        v-model="deviceModel.name"
        data-vv-name="name"
        :state="states['name']"
        v-validate="{ required: true}"
      ></mt-field>
      <p class="field-error" v-if="states['name']=='error'">{{ errors.first('name') }}</p>
      <!-- <mt-cell title="设备分类" class="type-device" @click.native="openType">{{ typeLabel }}</mt-cell> -->

      <mt-cell title="区域" class="type-device" @click.native="openArea">{{ areaLabel }}</mt-cell>

      <mt-cell title>
        <mt-button type="primary" @click="save">保存</mt-button>
        <mt-button type="danger" @click="cancel">取消</mt-button>
      </mt-cell>
    </mt-popup>

    <mt-popup v-model="popupDetailType" class="popup-device" position="bottom">
      <mt-picker
        :slots="typeSlots"
        class="device-type"
        @change="onTypeChange"
        ref="pickType"
        :value-key="'label'"
      ></mt-picker>
    </mt-popup>

    <mt-popup v-model="popupArea" class="popup-device" position="bottom">
      <mt-picker :slots="areaSlots" @change="onAreaChange" ref="pickArea" :value-key="'label'"></mt-picker>
    </mt-popup>

    <mt-popup v-model="isAdd" class="popup-menu" popup-transition="popup-fade">
      <mt-cell title="扫码添加" @click.native="scanAdd"></mt-cell>
      <mt-cell title="手动添加" @click.native="handAdd"></mt-cell>
    </mt-popup>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import {
  fetchAllDevice,
  fetchDeviceType,
  postDevice,
  updateDevice,
  deleteDevice,
  fetchAreas
} from "@/api/monitor";

import Toast from "@/components/toast/toast.js";

// import MyPicker from "@/components/picker/picker";

// 处理点击事件
var openw = null;
var w = window;
import { getJssdk } from '@/api/we_auth';

export default {
  components: {
    // MyPicker
  },
  data() {
    return {
      popupVisible: false,
      popupDetail: false,
      popupDetailType: false,
      isAdd: false,
      device: [],
      search: {
        page: 1,
        pageSize: 15
      },
      item: {},
      deviceModel: {
        pdi: "",
        type: "",
        name: ""
      },
      types: [],
      selectType: {},
      allLoaded: false,
      typeLabel: "",
      states: {},
      popupUpdate: false,
      updateDeviceModel: {
        name: "",
        pdi_index: ""
      },
      popupArea: false,
      areaLabel: "",
      selectArea: {},
      provinces: [],
      cities: {}
    };
  },
  computed: {
    typeSlots() {
      return [
        {
          flex: 1,
          values: this.types,
          className: "type-slot",
          textAlign: "center"
        }
      ];
    },

    areaSlots() {
      let city = [];
      if (this.provinces.length > 0) {
        let first = this.provinces[0].value;
        city = this.cities[first];
      }
      return [
        {
          flex: 1,
          values: this.provinces,
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: city,
          className: "slot3",
          textAlign: "center"
        }
      ];
    }
  },
  watch: {
    selectType(newval) {
      if (!newval) return;
      const { value, label } = newval;
      this.deviceModel.type = value;
      this.typeLabel = label;
    },
    fields: {
      handler(newval) {
        this.getStates();
      },
      deep: true
    },
    selectArea(newval) {
      if (!newval) return;
      const { value, label } = newval;
      this.deviceModel.area = value;
      this.areaLabel = label;
    }
  },
  methods: {
    getAreas() {
      fetchAreas().then(res => {
        const { province, city } = res.data;
        this.provinces = province;
        this.cities = city;
      });
    },
    onAreaChange(picker, values) {
      console.log(values, "on area change ..........");
      if (!values[0]) return;
      picker.setSlotValues(1, this.cities[values[0].value]);
      this.selectArea = values[1];
    },
    openArea() {
      this.popupArea = true;
    },
    getStates() {
      let states = {};
      Object.keys(this.fields).map(field => {
        if (this.errors.has(field)) {
          if (this.fields[field].invalid && this.fields[field].dirty) {
            states[field] = "error";
          } else {
            states[field] = "none";
          }
        } else {
          if (this.fields[field].valid) {
            states[field] = "success";
          }
        }
      });
      this.states = states;
      console.log(this.states, "states....", this.fields);
    },
    openDevice(item) {
      this.popupDetail = true;
      this.item = item;
    },
    openAdd() {
      this.isAdd = true;
    },
    scanAdd() {
     // this.openBarcode();
      this.scan()
    },
    openBarcode() {
      this.createWithoutTitle("barcode.html", {
        titleNView: {
          type: "float",
          backgroundColor: "rgba(215,75,40,0.3)",
          titleText: "扫一扫",
          titleColor: "#FFFFFF",
          autoBackButton: true
        }
      });
    },
    createWithoutTitle(id, ws) {
      if (openw) {
        //避免多次打开同一个页面
        return null;
      }
      const vm = this;
      if (w.plus) {
        ws = ws || {};
        ws.scrollIndicator || (ws.scrollIndicator = "none");
        ws.scalable || (ws.scalable = false);
        ws.backButtonAutoControl || (ws.backButtonAutoControl = "close");
        openw = plus.webview.create(id, id, ws);
        openw.addEventListener(
          "close",
          () => {
            this.isAdd = false;
            const img = plus.nativeObj.View.getViewById("lightview");
            img && img.close();
            console.log(img);
            openw = null;
            let code = window.result;
            if (!code) return;
            const pdi = code,
              name = `设备${code}`;
            vm.deviceModel = Object.assign(vm.deviceModel, { pdi, name });
            vm.popupVisible = true;
          },
          false
        );
        return openw;
      } else {
        w.open(id);
      }
      return null;
    },
    clearBarcode() {
      window.result = null;
      // this.isAdd = false;
      // this.$router.push({ name: "addtest" });
    },
    scan() {
        wx.ready(function () {
          wx.checkJsApi({
            jsApiList: ["scanQRCode"],
            success: function (res) {
              wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], //可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                  console.log(res, 'scan code in wx.....')
                },
                error: function (err) {
                  alert("扫描失败::扫描码=" + err);
                }
              });
            }
          });
        });
      },
    handAdd() {
      this.isAdd = false;
      this.popupVisible = true;
      this.errors.clear();
      this.states = {};
      this.$validator.resume();
    },
    handtest() {
      this.$router.push({ name: "addDevice_page" });
    },
    cancel() {
      this.$validator.reset();
      this.deviceModel = {
        pdi: "",
        type: "",
        name: ""
      };
      this.popupVisible = false;
      this.clearBarcode();
    },

    openType() {
      this.popupDetailType = true;
    },
    onTypeChange(picker, values) {
      if (!values[0]) return;
      this.selectType = values[0];
    },
    save() {
      this.$validator.validate().then(valid => {
        this.clearBarcode();
        let states = {};
        Object.keys(this.fields).map(field => {
          if (this.errors.has(field)) {
            states[field] = "error";
          } else {
            states[field] = "success";
          }
        });
        this.states = states;
        if (!valid) return;
        MessageBox.confirm("确定保存?").then(action => {
          this.popupVisible = false;
          const {
            pdi: pdi_code,
            name: pdi_name
            //  type: dpt_id
          } = this.deviceModel;
          const dpt_id = 0;
          const { value: AreaId } = this.selectArea;
          postDevice({ pdi_code, pdi_name, dpt_id, AreaId }).then(res => {
            let first = this.provinces[0];
            this.$refs.pickArea.setSlotValue(0, first);
            this.$refs.pickArea.setSlotValue(1, this.cities[first.value][0]);
            // this.$refs.pickType.setSlotValue(0, this.types[0]);
            this.$validator.pause();
            this.deviceModel = {
              pdi: "",
              name: ""
            };
            Toast(res.data.msg);
            this.loadTop();
          });
        });
      });
    },
    saveUpdate() {
      this.$validator.validateAll("scope").then(valid => {
        console.log(this.fields, "save updating.......");
        let states = {};
        Object.keys(this.fields).map(field => {
          if (this.errors.has(field)) {
            states[field] = "error";
          } else {
            states[field] = "success";
          }
        });
        this.states = states;
        if (!valid) return;
        this.popupUpdate = false;
        const { name: pdi_name, pdi_index } = this.updateDeviceModel;
        updateDevice({ pdi_name, pdi_index }).then(res => {
          Toast(res.data.msg);
        });
      });
    },
    cancelUpdate() {
      this.updateDeviceModel = {
        name: ""
      };
      this.popupUpdate = false;
    },
    loadTop() {
      this.search = {
        page: 1,
        pageSize: 15
      };
      this.getData();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      this.search.page = this.search.page + 1;
      this.getData(true);
      this.$refs.loadmore.onBottomLoaded();
    },
    getData(more = false) {
      fetchAllDevice(this.search).then(res => {
        let data = res.data.data;
        if (data.length === 0) {
          this.allLoaded = true;
        } else {
          this.allLoaded = false;
        }
        if (more) {
          this.device = this.device.concat(data);
        } else {
          this.device = data;
        }
      });
    },
    getAllType() {
      fetchDeviceType().then(res => {
        this.types = res.data.data;
      });
    },
    handlerUpdate(item, index) {
      console.log(item, "updating.....");
      // this.popupUpdate = true;
      // this.updateDeviceModel = {
      //   name: item.pdi_name,
      //   pdi_index: item.pdi_index
      // };
      MessageBox.prompt("修改设备名称", "", {
        inputValue: item.pdi_name,
        closeOnClickModal: false,
        inputValidator: this.inputValidator,
        inputType: "text"
      })
        .then(({ value, action }) => {
          const data = {
            pdi_name: value,
            pdi_index: item.pdi_index
          };
          updateDevice(data).then(res => {
            item.pdi_name = value;
            Toast(res.data.msg);
          });
        })
        .catch(() => {
          Toast("已取消修改");
        });
    },
    inputValidator(value) {
      let sStr = value.replace(/(^\s*)|(\s*$)/g, "");
      if (!sStr) {
        return "设备名称不能为空";
      }
      return true;
    },
    handlerDelete(item, index) {
      console.log(item, index, "deleting.....");
      MessageBox.confirm(`确定删除${item.pdi_name}吗?`)
        .then(action => {
          deleteDevice(item.pdi_index).then(res => {
            this.device.splice(index, 1);
            Toast(res.data.msg);
          });
        })
        .catch(() => {
          Toast("已取消删除");
        });
    }
  },
  mounted() {
    console.log(this.fields, "created ....");
    const url = window.location.href.split('#')[0];
    getJssdk({url: url }).then(res=>{
      console.log(res, url, 'get jssdk.........')
      wx.config(res.data);
    })
  },
  beforeDestroy() {
    this.clearBarcode();
  },
  created() {
    this.getData();
    // this.getAllType();
    this.getAreas();
  }
};
</script>

<style lang='scss'>
.add-device {
  .mint-cell-value {
    width: 100%;
    justify-content: space-between;
  }
  .mint-button--normal {
    width: 48%;
    // margin-right: 10px;
  }
}
.type-device {
  .mint-cell-title {
    width: 105px;
    flex: none;
  }
  .mint-cell-value {
    width: auto;
    text-align: right;
  }
}
.field-error {
  text-align: left;
  padding-left: 10px;
  color: $red;
}
.update-device-title {
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
}
.close-type {
  display: inline-block;
  font-size: 30px;
  width: 40px;
  margin: 0;
  color: $theme-color;
  text-align: center;
}
.device-type .picker-toolbar {
  text-align: right;
  line-height: 40px;
}
.device-more {
  margin-bottom: 10px;
}
</style>

