<template>
   <div class='layout-container'>

    <top-component></top-component> 

    <mt-cell 
    :title="item.title" 
    :label="new Date()+ ''"
    @click.native='openDevice(item)' 
    is-link 
    v-for='(item, index) in contents' 
    :key='index'>
 
    </mt-cell>



  <mt-popup
    v-model="popupVisible"
    class='popup-device'
    position="bottom">
<mt-cell title="详情" :label="new Date()+ ''">
</mt-cell>
    <mt-cell title="">
      <span>
        温度计坏了温度计坏了
        温度计坏了温度计坏了温度
        计坏了温度计坏了温度计坏了温度计坏了温度计坏了温度计坏了温度计坏了温度计坏了温度计坏了
        </span>
    </mt-cell>
<mt-cell title="">
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
      contents: [
        {title: '温度计坏了', content: '温度计坏了' },
        {title: '温度计坏了', content: '温度计坏了' },
        {title: '温度计坏了', content: '温度计坏了' },
        {title: '温度计坏了', content: '温度计坏了' },
        {title: '温度计坏了', content: '温度计坏了' },
        {title: '温度计坏了', content: '温度计坏了' },
        {title: '温度计坏了', content: '温度计坏了' },
        {title: '温度计坏了', content: '温度计坏了' },
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
