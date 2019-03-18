<template>
  <div class="layout-container">
    <top-component></top-component>

    <div v-if="detail">
      <mt-cell title="更新时间">{{ detail.rd_updatetime }}</mt-cell>
      <mt-cell :title="item.label" v-for="(item, index) in subFields" :key="index">
        <!-- <mt-switch v-model="item.value" disabled></mt-switch> -->
        <mt-badge :type="item.value?'success':'error'">{{ item.value?"正常":"异常" }}</mt-badge>
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
      pditype: null
    };
  },
  methods: {
    fetchDevice,
    openDetail() {}
  },
  watch: {
    toptitle(nval) {
      nval && this.$store.commit("app/BAR_TITLE", nval);
    }
  },
  created() {
    const { pdi, type } = this.$route.params;
    this.pdi = pdi;
    this.pditype = type;
    this.getData();
    this.startTimer();
  }
};
</script>

<style lang='scss' scoped>
</style>
