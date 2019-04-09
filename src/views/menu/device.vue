<template>
  <div class="layout-container">
    <top-component></top-component>
    <mt-cell
      :title="item.label"
      :label="`设备编号: ${item.value}`"
      v-for="item in devices"
      :key="item.value"
      is-link
      @click.native="openDetail(item)"
      class="cell-icon"
    >
      <!-- <svg-icon :icon-class="item.icon" class="item-icon" slot="icon"></svg-icon> -->
      <icon-bg slot="icon" :icon="item.icon" small></icon-bg>
    </mt-cell>
  </div>
</template>

<script>
import { fetchDevice } from "@/api/menu";
export default {
  data() {
    return {
      devices: [],
      pdiType: null
    };
  },
  methods: {
    openDetail(data) {
      console.log(data, "open menu.......");
      const { router: name, value: pdi, type } = data;
      this.$router.push({ name, params: { pdi, type: this.pdiType } });
    }
  },
  created() {
    const { type } = this.$route.params;
    this.pdiType = type;
    fetchDevice({ type }).then(res => {
      console.log(res.data.devices);
      this.devices = res.data.devices;
      this.$store.commit("app/BAR_TITLE", res.data.title);
    });
  }
};
</script>

<style lang='scss'>
.cell-icon {
  .mint-cell-text {
    vertical-align: middle;
    display: inline-block;
    height: 26px;
    line-height: 26px;
  }
  .icon-background-small {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0;
  }
}
</style>
