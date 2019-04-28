<template>
  <div class="layout-container">
    <top-component></top-component>
    <div class="page-cell">
      <mt-cell title="告警通知">
        <mt-switch v-model="notice" @change="noticeChange"></mt-switch>
      </mt-cell>
      <mt-cell title="告警频率" v-if="notice">
        <mt-badge type="success" @click.native="openRate">{{ rateLabel }}</mt-badge>
      </mt-cell>
    </div>
    <mt-popup
      v-model="popupRate"
      class="popup-device"
      position="bottom"
      :close-on-click-modal="false"
    >
      <my-picker
        :slots="rateSlots"
        @change="onRateChange"
        ref="pickRate"
        :value-key="'label'"
        :show-toolbar="true"
      >
        <toolbar @cancel="cancel" @confirm="confirm"></toolbar>
      </my-picker>
    </mt-popup>
  </div>
</template>

<script>
import MyPicker from "@/components/picker/picker";
import Toolbar from "@/components/toolbar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    MyPicker,
    Toolbar
  },
  data() {
    return {
      notice: true,
      popupRate: false,
      selectRate: null,
      oriRate: null,
      rates: [
        { label: "30秒", value: 30 },
        { label: "60秒", value: 60 },
        { label: "120秒", value: 120 }
      ],
      rateSlots: null
    };
  },
  computed: {
    ...mapGetters("app", ["appNotice", "appRate"]),
    rateLabel() {
      return this.oriRate && this.getCurrent(this.oriRate).label;
    }
  },
  methods: {
    noticeChange(bval) {
      console.log(bval, "changing......");
      this.setNotice(this.notice);
      if (!this.notice) {
        this.setRate(null);
      } else {
        this.oriRate = this.rates[0].value;
        this.$refs.pickRate.setSlotValue(0, this.rates[0]);
      }
    },
    openRate() {
      this.popupRate = true;
    },
    onRateChange(picker, values) {
      if (!values[0]) return;
      this.selectRate = values[0].value;
    },
    setRate(nval) {
      this.$store.dispatch("app/setAppRate", nval);
      if (!window.plus) return;
      let val = nval ? nval + "" : nval;
      plus.storage.setItem("dh_appRate", val);
    },
    setNotice(nval) {
      this.$store.dispatch("app/setAppNotice", nval);
      if (!window.plus) return;
      plus.storage.setItem("dh_appNotice", nval + "");
    },
    cancel() {
      this.popupRate = false;
    },
    confirm() {
      this.popupRate = false;
      this.oriRate = this.selectRate;
      this.setRate(this.oriRate);
    },
    getCurrent(val) {
      let curitem;
      this.rates.forEach(item => {
        if (item.value == val) {
          curitem = item;
        }
      });
      return curitem;
    }
  },
  mounted() {
    if (this.appRate) {
      const current = this.getCurrent(this.appRate);
      this.$refs.pickRate.setSlotValue(0, current);
    }
  },
  created() {
    this.rateSlots = [
      {
        flex: 1,
        values: this.rates,
        className: "type-slot",
        textAlign: "center"
      }
    ];
    this.oriRate = this.appRate || this.rates[0].value;
    this.notice = this.appNotice;
  }
};
</script>

<style>
</style>
