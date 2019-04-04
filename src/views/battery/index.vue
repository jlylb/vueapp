<template>
  <div class="layout-container">
    <top-component></top-component>

    <div v-if="detail">
      <mt-cell title="更新时间">{{ detail.rd_updatetime }}</mt-cell>
      <mt-cell
        :title="item.label"
        v-for="(item, index) in fieldss"
        :key="index"
      >{{ detail[item.field] }}</mt-cell>
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
      fieldss: [
        {
          label: "剩余容量",
          field: "rd_ReCat"
        },
        {
          label: "剩余放电时间",
          field: "rd_ReTime"
        },
        {
          label: "电池电压",
          field: "rd_BatVol"
        },
        {
          label: "电池电流",
          field: "rd_BatCur"
        }
      ]
    };
  },
  methods: {
    fetchDevice,
    openDetail() {}
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
</style>
