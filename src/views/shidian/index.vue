<template>
  <div class="layout-container">
    <top-component></top-component>

    <div v-if="detail">
      <mt-cell title="更新时间">{{ detail.rd_updatetime }}</mt-cell>
      <mt-cell :title="item.label" v-for="(item, index) in shidian" :key="index">
        <mt-badge
          :type="detail[item.value]==0?'success':'error'"
        >{{ detail[item.value]==0?"正常":"异常" }}</mt-badge>
      </mt-cell>
      <mt-cell title="通讯状态" v-if="typeof detail.rd_CommSta!='undefined'">
        <mt-badge
          :type="detail.rd_CommSta==0?'success':'error'"
        >{{ detail.rd_CommSta==0?"正常":"故障" }}</mt-badge>
      </mt-cell>
      <mt-cell title="网络通讯">
        <mt-badge :type="detail.rd_NetCom==0?'success':'error'">{{ detail.rd_NetCom==0?"正常":"断线" }}</mt-badge>
      </mt-cell>
    </div>
  </div>
</template>

<script>
import { fetchDevice } from "@/api/monitor";
export default {
  data() {
    return {
      detail: null,
      subFields: [],
      pditype: null,
      shidian: []
    };
  },
  methods: {
    fetchDevice,
    openDetail() {},
    genShidian() {
      const res = [];
      const prefix = "rd_ACSta";
      for (let i = 1; i < 9; i++) {
        res.push({
          label: `市电${i}状态`,
          value: `${prefix}${i}`
        });
      }
      this.shidian = res;
    }
  },
  watch: {
    toptitle(nval) {
      nval && this.$store.commit("app/BAR_TITLE", nval);
    }
  },
  created() {
    const { pdi, type } = this.$route.params;
    this.genShidian();
    this.pdi = pdi;
    this.pditype = type;
    this.getData();
    this.startTimer();
  }
};
</script>

<style lang='scss' scoped>
</style>
