<template>
  <div class="layout-container">
    <top-component @top-btn="selectProvince"></top-component>

    <mt-cell
      class="dapeng-item"
      is-link
      v-for="(item, index) in selectCity"
      :key="index"
      @click.native="openDetail(item, index)"
    >
      <span style="color: green">{{ countDevice(item.value, device) }}个设备</span>
      <span slot="title">
        <b class="dark-gray">[{{ item.label }}]</b>
        {{ item.area_text?item.area_text:item.label }}
      </span>
      <icon-bg icon="dapeng" slot="icon"></icon-bg>
    </mt-cell>

    <my-popup
      v-model="area"
      :open.sync="areaOpen"
      :slots="areaSlots"
      @inputChange="changeCompany"
      :show-toolbar="true"
      @confirm="confirmOk"
    ></my-popup>
  </div>
</template>

<script>
import { fetchList } from "@/api/monitor";
import MyPopup from "@/components/popup2";
import { getDataValue } from "@/tools";
import { mapGetters } from "vuex";
import IconBg from "@/components/iconBg";
import { Indicator } from "mint-ui";

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
        name: "monitor_device3",
        params: {
          dapeng: index + 1,
          areaId: item.value,
          dapengName: item.area_text ? item.area_text : item.label
        }
      });
    },
    setProvince() {
      this.$store.commit("app/PROVINCE", [
        this.firstCompany,
        this.firstProvince
      ]);
    },
    changeCompany(values, picker) {
      console.log(values, picker, "log.......", this.area);
      if (values[0]) {
        let pro = getDataValue(this.company_pro, [+values[0].value], []);
        picker.setSlotValues(1, pro);
        // this.area = [values[0], pro[0] ? pro[0] : undefined];
        // picker.setSlotValue(0, values[0]);
        picker.setSlotValue(1, pro[0] ? pro[0] : undefined);
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
      let current = newVal ? newVal.value : undefined;
      this.selectCity = getDataValue(this.city, [current], []);
    }
  },
  created() {
    Indicator.open("正在加载中...");
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
      Indicator.close();
    });
  },
  beforeDestroy() {
    Indicator.close();
  }
};
</script>

<style lang='scss' scoped>
.sheet .mu-item-action {
  justify-content: center;
  color: inherit;
}
</style>
