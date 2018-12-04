<template>
  <div class="layout-container">
    <top-component @top-btn="selectProvince"></top-component>

    <mt-cell
      is-link
      v-for="(item, index) in selectCity"
      class="dapeng-item"
      :key="index"
      @click.native="openDetail(item, index)"
    >
      <span style="color: green">{{ countDevice(item.value, device) }}个设备</span>
      <span slot="title">{{ `${index + 1}号大棚` }}</span>
      <icon-bg icon="dapeng" slot="icon"></icon-bg>
    </mt-cell>

    <my-popup
      v-model="area"
      :open.sync="areaOpen"
      :slots="areaSlots"
      @inputChange="changeCompany"
      @confirm="confirmOk"
    ></my-popup>
  </div>
</template>

<script>
import { fetchList } from "@/api/control";
import { getDataValue } from "@/tools";
import { mapGetters } from "vuex";
import MyPopup from "@/components/popup2";
import IconBg from "@/components/iconBg";

export default {
  components: { MyPopup, IconBg },
  data() {
    return {
      openMenu: false,
      menu: [],
      province: [],
      city: [],
      firstProvince: null,
      firstCompany: null,
      firstCity: null,
      selectCity: [],
      device: null,
      deviceType: null,
      selectDeviceType: null,
      selectDevice: null,
      area: [],
      areaOpen: false,
      areaSlots: [],
      company: null,
      company_pro: null
    };
  },
  computed: {
    ...mapGetters("app", ["currentProvince"])
  },
  methods: {
    closeBottomSheet(val, val1) {
      console.log(val, val1);
    },
    selectProvince() {
      console.log(this.openMenu, "select ....");
      this.areaOpen = true;
    },
    countDevice(cityId, data) {
      console.log(getDataValue(data, [cityId], []), "count ....");
      if (!data) {
        return 0;
      }
      return Object.keys(getDataValue(data, [cityId], [])).length;
    },
    openDetail(item, index) {
      this.$router.push({
        name: "remote_device",
        params: { dapeng: index + 1, areaId: item.value }
      });
    },
    setProvince() {
      this.$store.commit("app/PROVINCE", [
        this.firstCompany,
        this.firstProvince
      ]);
    },
    changeCompany(values, picker) {
      console.log(values, picker, "log.......");
      if (values[0]) {
        picker.setSlotValues(
          1,
          getDataValue(this.company_pro, [values[0].value], [])
        );
      }
    },
    confirmOk() {
      const [currentCompay, currentProvince] = this.area;
      console.log(currentProvince, currentCompay);
      this.firstProvince = currentProvince;
      this.firstCompany = currentCompay;
      this.setProvince();
      this.areaOpen = false;
    }
  },
  watch: {
    firstProvince(newVal) {
      this.selectCity = newVal
        ? getDataValue(this.city, [newVal.value], [])
        : [];
    }
  },
  created() {
    fetchList().then(res => {
      this.items = res.data.items;
      this.province = res.data.province;
      this.city = res.data.city;
      this.device = res.data.areaDevice;
      this.company = res.data.company;
      this.company_pro = res.data.company_province;
      let firstKey;
      if (this.currentProvince) {
        let [company, province] = this.currentProvince;
        this.firstProvince = province;
        firstKey = company;
      } else {
        firstKey = getDataValue(this.company, [0], null);
        this.firstProvince = getDataValue(
          this.company_pro,
          [firstKey.value, 0],
          null
        );
      }
      this.firstCompany = firstKey;
      const area = getDataValue(this.company_pro, [firstKey.value], []);
      this.areaSlots = [
        {
          flex: 1,
          values: this.company,
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
          values: area,
          className: "slot3",
          textAlign: "center"
        }
      ];
      this.area = [firstKey, this.firstProvince];

      // this.setProvince()
    });
  }
};
</script>

<style lang='scss' scoped>
.sheet .mu-item-action {
  justify-content: center;
  color: inherit;
}
</style>
