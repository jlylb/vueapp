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
      <span style="color: green">正常</span>
      <svg-icon :icon-class='item.icon' class='item-icon' slot='icon'></svg-icon>
    </mt-cell>



  <mt-popup
    v-model="popupVisible"
    class='popup-device'
    position="bottom">

    <mt-cell title="设备名称">
      <span>{{ item.name }}</span>
    </mt-cell>

    <mt-cell title="设备类型">
      <span>{{ item.type }}</span>
    </mt-cell>

    <mt-cell title="">
      <mt-switch v-model="workStatus" @change='changeWork'></mt-switch>
      <div slot='title'>
        工作状态
        <span style="color: green" v-if='workStatus'>正常</span>
        <span style="color: red" v-else>停止</span>
      </div>
    </mt-cell>

    <mt-cell title="">
      <mt-switch v-model="deviceStatus" @change='changeDevice'></mt-switch>
      <div slot='title'>
        设备状态
        <span style="color: green" v-if='deviceStatus'>正常</span>
        <span style="color: red" v-else>停止</span>
      </div>
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
      deviceStatus: true,
      workStatus: true,
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
    changeWork(val) {
      console.log(val)
      MessageBox.confirm('确定更改工作状态?', '提示', {
        closeOnClickModal: false
      }).then(action => {
        MessageBox.alert('操作成功');
      }).catch((res) => {
        this.workStatus = val
      });
    },
    changeDevice(val) {
      console.log(val)
      MessageBox.confirm('确定更改设备状态?', '提示', {
        closeOnClickModal: false
      }).then(action => {
        
      }).catch((res) => {
        this.deviceStatus = val
      }); 
    }
  }
}
</script>

<style>
</style>
