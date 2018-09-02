<template>
   <div class='layout-container'>

    <top-component></top-component> 

    <mt-cell 
    :title="item.name" 
    :label="item.type"
    @click.native='openDevice(item)' 
    is-link 
    v-for='(item, index) in device' 
    :key='index'>
    <span style='color: green'>查看趋势图</span>
      <svg-icon :icon-class='item.icon' class='item-icon' slot='icon'></svg-icon>
    </mt-cell>




  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';

export default {
  data() {
    return {
      popupVisible: false,
      deviceStatus: true,
      workStatus: true,
      device: [
        {name: 'pdi_1', icon: 'temp', type: '空气温室度传感器', params: {wd: { value: '35°', desc: '温度'},sd: { value: '15°', desc: '湿度'} } },
        {name: 'pdi_2', icon: 'light', type: '光照度传感器' , params: {light: { value: '35°', desc: '光照度'} } },
        {name: 'pdi_3', icon: 'co2', type: '二氧化碳传感器' , params: {nd: { value: '35°', desc: '浓度'} } },
        {name: 'pdi_4', icon: 'soil', type: '土壤墒情传感器', params: {wd: { value: '35°', desc: '温度'} }},
        {name: 'pdi_5', icon: 'liquid', type: '液位传感器', params: {level: { value: '1.0', desc: '水位'} }},
        {name: 'pdi_7', icon: 'temp', type: '空气温室度传感器' , params:{wd: { value: '35°', desc: '温度'},sd: { value: '15°', desc: '湿度'} }},

      ],
      item: {}
    }
  },
  methods: {
    openDevice(item) {

      this.$router.push({name: 'statistic_chart', params: {...item} })
    },

  }
}
</script>

<style>
</style>
