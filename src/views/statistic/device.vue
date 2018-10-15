<template>
   <div class='layout-container'>

    <top-component></top-component> 

    <mt-cell 
    :title="item.label" 
    @click.native='openDevice(item)' 
    is-link 
    v-for='(item, index) in deviceData' 
    :key='index'>
    <span style='color: green'>查看趋势图</span>
      <svg-icon :icon-class='item.icon' class='item-icon' slot='icon' v-if='item.icon'></svg-icon>
    </mt-cell>




  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { fetchAreaDevice } from "@/api/monitor";

export default {
  data() {
    return {
      deviceData: [],
      item: {}
    };
  },
  methods: {
    openDevice(item) {
      this.$router.push({ name: "statistic_chart", params: { ...item } });
    }
  },
  created() {
    console.log(this.$route.params);
    const { areaId, dapeng } = this.$route.params;
    fetchAreaDevice({ areaId }).then(res => {
      this.deviceData = res.data.devices;
      if (!this.deviceData) {
        MessageBox.alert(`该大棚没有设备！`, "提示");
        return;
      }
    });
  }
};
</script>

<style>
</style>
