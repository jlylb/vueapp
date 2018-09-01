<template>
   <div class='layout-container'>

    <top-component></top-component> 

    <mt-cell 
    :title="item.name" 
    :label="alarmDevice.name"
    @click.native='openDevice(item)' 
    is-link 
    v-for='(item, index) in device' 
    :key='index'>
      <mt-badge type="error">{{ item.total }}</mt-badge>
      <svg-icon :icon-class='alarmDevice.icon' class='item-icon' slot='icon'></svg-icon>
    </mt-cell>



  <mt-popup
    v-model="popupVisible"
    class='popup-device'
    position="bottom">

    <mt-cell title="设备名称">
      <span>{{ item.name }}</span>
    </mt-cell>

    <mt-cell title="一级报警" is-link @click.native='openDetail(item)'>
      <mt-badge type="error">10</mt-badge>
    </mt-cell>

    <mt-cell title="二级报警" is-link @click.native='openDetail(item)'>
      <mt-badge type="warning">10</mt-badge>
    </mt-cell>

    <mt-cell title="三级报警" is-link @click.native='openDetail(item)'>
      <mt-badge type="primary">30</mt-badge>
    </mt-cell>

    <mt-cell title="四级报警" is-link @click.native='openDetail(item)'>
      <mt-badge type="success">10</mt-badge>
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
        {name: 'pdi_1', total: 2 },
        {name: 'pdi_2', total: 2 },
        {name: 'pdi_3', total: 2 },
        {name: 'pdi_4', total: 2 },
        {name: 'pdi_5', total: 2 },
        {name: 'pdi_7', total: 2 },
      ],
      item: {},
      alarmDevice: [],
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
    },
    openDetail(item) {
      this.$router.push({name: "alarm_detail", params: {...item} })
    }
  },
  created() {
    console.log(this.$route)
    this.alarmDevice = this.$route.params
  }
}
</script>

<style>
</style>
