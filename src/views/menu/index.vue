<template>
  <div class="layout-container">
    <top-component></top-component>
    <mt-cell
      v-for="item in types"
      :key="item.value"
      is-link
      @click.native="openDetail(item)"
      class="donghuang-item"
    >
      <span style="color: green" v-if="showTypeDesc(item.rvalue)">{{ item.num }}个设备</span>
      <span style="color: green" v-else>浏览设备</span>
      <!-- <svg-icon :icon-class='item.icon' class='item-icon' slot='icon'></svg-icon> -->
      <span slot="title">{{ item.label }}</span>
      <icon-bg slot="icon" :icon="item.icon"></icon-bg>
    </mt-cell>
  </div>
</template>

<script>
import { fetchList } from "@/api/menu";
import Toast from "@/components/toast/toast.js";
export default {
  data() {
    return {
      types: []
    };
  },
  methods: {
    openDetail(data) {
      const { router: name, value: type, num } = data;
      if (num === 0) {
        Toast({
          message: "暂无设备",
          duration: 1000
        });
        return;
      }
      this.$router.push({ name: "sysmenu_device", params: { type } });
    },
    showTypeDesc(rvalue) {
      const notShow = [33, 34];
      return !notShow.includes(+rvalue);
    }
  },
  created() {
    const { type } = this.$route.params;

    fetchList({ type }).then(res => {
      console.log(res.data.devices);
      this.types = res.data.devices;
      this.$store.commit("app/BAR_TITLE", res.data.name);
    });
  }
};
</script>

<style lang='scss' scoped>
</style>
