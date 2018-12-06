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
    >
      <mt-cell
        :title="String(item.pdi_index)"
        :label="item.pdi_name"
        @click.native="openDevice(item)"
        is-link
        v-for="(item, index) in device"
        :key="index"
      ></mt-cell>
    </mt-loadmore>

    <mt-popup v-model="popupDetail" class="popup-device" position="bottom">
      <mt-cell title="设备索引">{{ item.pdi_index }}</mt-cell>
      <mt-cell title="设备名称">{{ item.pdi_name }}</mt-cell>
      <mt-cell title="设备类型">{{ item.dpt_id }}</mt-cell>

      <mt-cell title="公司">{{ item.company && item.company.Co_Name }}</mt-cell>
    </mt-popup>

    <mt-popup
      v-model="popupVisible"
      ref="addDevice"
      class="popup-device add-device"
      :close-on-click-modal="false"
      popup-transition="popup-fade"
    >
      <mt-field
        label="设备编号"
        placeholder="请输入设备编号"
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

      <mt-cell title="设备分类" class="type-device" @click.native="openType">{{ typeLabel }}</mt-cell>

      <mt-cell title="区域" class="type-device" @click.native="openArea">{{ areaLabel }}</mt-cell>

      <mt-cell title>
        <mt-button type="primary" @click="save">保存</mt-button>
        <mt-button type="danger" @click="cancel">取消</mt-button>
      </mt-cell>
    </mt-popup>

    <mt-popup v-model="popupDetailType" class="popup-device" position="bottom">
      <mt-picker :slots="typeSlots" @change="onTypeChange" ref="pickType" :value-key="'label'"></mt-picker>
    </mt-popup>

    <mt-popup v-model="popupArea" class="popup-device" position="bottom">
      <mt-picker :slots="areaSlots" @change="onAreaChange" ref="pickArea" :value-key="'label'"></mt-picker>
    </mt-popup>

    <mt-popup v-model="isAdd" class="popup-menu" popup-transition="popup-fade">
      <mt-cell title="扫码添加" @click.native="scanAdd"></mt-cell>
      <mt-cell title="手动添加" @click.native="handAdd"></mt-cell>
      <!-- <mt-cell title="扫码添加1"  @click.native='handtest'>
      </mt-cell>-->
    </mt-popup>
  </div>
</template>

<script>
import { MessageBox, Toast } from "mint-ui";
import {
  fetchAllDevice,
  fetchDeviceType,
  postDevice,
  fetchAreas
} from "@/api/monitor";

export default {
  components: {},
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
        name: "",
        area: ""
      },
      types: [],
      selectType: {},
      allLoaded: false,
      typeLabel: "",
      states: {},
      areaLabel: "",
      provinces: [],
      cities: {},
      selectArea: {},
      popupArea: false
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
      return;
    }
  },
  watch: {
    selectType(newval) {
      const { value, label } = newval;
      this.deviceModel.type = value;
      this.typeLabel = label;
    },
    selectArea(newval) {
      const { value, label } = newval;
      this.deviceModel.area = value;
      this.areaLabel = label;
    },
    fields: {
      handler(newval) {
        this.getStates();
      },
      deep: true
    }
  },
  methods: {
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
      this.isAdd = false;
      this.$router.push({ name: "addtest" });
    },
    handAdd() {
      this.isAdd = false;
      this.popupVisible = true;
      this.errors.clear();
      this.states = {};
      // this.deviceModel = {
      //   pdi: '',
      //   name: '',
      // };
    },
    handtest() {
      this.$router.push({ name: "addDevice_page" });
    },
    cancel() {
      this.popupVisible = false;
      this.errors.clear();
      this.states = {};
      this.deviceModel = {
        pdi: "",
        name: ""
        // area: '',
        // type: '',
      };
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
          console.log(
            this.deviceModel,
            "confirm ........",
            this.selectType,
            this.selectArea
          );
          const { pdi: pdi_code, name: pdi_name } = this.deviceModel;
          const { value: dpt_id } = this.selectType;
          const { value: AreaId } = this.selectArea;
          postDevice({ pdi_code, pdi_name, dpt_id, AreaId }).then(res => {
            if (res && res.data.status === 1) {
              this.popupVisible = false;
              let first = this.provinces[0];
              this.$refs.pickArea.setSlotValue(0, first);
              this.$refs.pickArea.setSlotValue(1, this.cities[first.value][0]);
              this.$refs.pickType.setSlotValue(0, this.types[0]);
            }
            res && Toast(res.data.msg);
          });
        });
      });
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
        let data = res.data.data.data;
        if (data.length < this.search.pageSize) {
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
    }
  },
  mounted() {
    console.log(this.fields, "created ....");
  },
  created() {
    const { code, success } = this.$route.params;

    if (success) {
      const [pdi, name] = code.split("&");
      this.deviceModel = Object.assign(this.deviceModel, { pdi, name });
      this.popupVisible = true;
    } else {
      this.popupVisible = false;
    }
    this.getData();
    this.getAllType();
    this.getAreas();
  }
};
</script>

<style lang='scss' scoped>
.add-device /deep/ {
  .mint-cell-value {
    width: 100%;
    justify-content: space-between;
  }
  .mint-button--normal {
    width: 48%;
    // margin-right: 10px;
  }
}
.type-device /deep/ {
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
</style>
