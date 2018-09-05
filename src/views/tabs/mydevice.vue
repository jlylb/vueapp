<template>
   <div class='layout-container'>

    <top-component>
      <span slot='right' @click='openAdd'>添加</span>
    </top-component> 

    <mt-cell 
    :title="item.name" 
    :label="item.type"
    @click.native='openDevice(item)' 
    is-link 
    v-for='(item, index) in device' 
    :key='index'>

    </mt-cell>



  <mt-popup
    v-model="popupVisible"
    class='popup-device'
    position="bottom">

    <mt-cell title="设备名称">
      <span>{{ $route.params.code }}</span>
    </mt-cell>

    <mt-cell title="设备类型">
      <span>{{ $route.params.success }}</span>
    </mt-cell>

  </mt-popup>

    <mt-popup
  v-model="isAdd"
  class='popup-menu'
  popup-transition="popup-fade">
    <mt-cell title="扫码添加"  @click.native='scanAdd'>
    </mt-cell>
    <mt-cell title="手动添加"  @click.native='handAdd'>
    </mt-cell>
</mt-popup>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';

export default {
  data() {
    return {
      popupVisible: false,
      isAdd: false,
      device: [
        {name: 'pdi_1', icon: 'temp', type: '空气温室度传感器'},
        {name: 'pdi_2', icon: 'light', type: '光照度传感器'},
        {name: 'pdi_3', icon: 'co2', type: '二氧化碳传感器'},
        {name: 'pdi_4', icon: 'soil', type: '土壤墒情传感器'},
        {name: 'pdi_5', icon: 'liquid', type: '液位传感器'},
        {name: 'pdi_6', icon: 'video', type: 'IP摄像头'},
        {name: 'pdi_7', icon: 'temp', type: '空气温室度传感器'},

      ],
      item: {}
    }
  },
  methods: {
    openDevice(item) {
      this.popupVisible = true
      this.item = item
    },
    openAdd() {
      this.isAdd = true
    },
    scanAdd() {
      this.$router.push({name: 'addtest'})
    },
    handAdd() {

    },
  },
  created() {
    
  }
}
</script>

<style>
</style>
