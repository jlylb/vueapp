<template>
<mu-container :style='{overflow: "auto"}' class='layout-container'>
    <h1 class='chart-title' :style='{margin: 0}'>空气温湿度趋势图</h1>
    <div class='chart-sub-title'>设备编号: 1</div>
    <div class='chart-sub-action'>
      <mt-button type="primary" @click="changeDevice" size="small">切换设备</mt-button>
    </div>
    <air-line :wendu='items.wendu' :shidu='items.shidu' :title='2' :style='{width:"100%", height: "50%"}'></air-line>
    <mt-popup
    v-model="popupVisible"
    class='popup-device'
    position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange" :showToolbar='true' ref='picker1'>
        选择设备编号
      </mt-picker>
  </mt-popup>

</mu-container>
</template>

<script>
import { fetchDevice } from '@/api/monitor'
import AirLine from './Line'
export default {
  components: { AirLine },
  data() {
    return {
      items: [],
      popupVisible: false,
        slots: [
        {
          flex: 1,
          values: ['201501', '201502', '201503', '201504', '201505', '201506'],
          className: 'slot1',
          textAlign: 'right'
        }
      ]
    }
  },
  methods: {
    changeDevice() {
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      if (values[0]) {
        picker.setSlotValue(1, values[0]);
      }
    }
  },
  mounted() {
this.$refs.picker1.setSlotValue(0, '201502')
  },
  created() {
    fetchDevice().then((res) => {
      console.log(res)
      this.items = res.data
    })
    // this.$nextTick(() => {
    //   this.$refs.picker1.setSlotValue(0, '201502')
    // })
    
  }
}
</script>

<style lang='scss' scoped>
.chart-sub-action {
  margin-bottom: 10px;
}
.layout-container /deep/ .popup-device {
  width: 100%;
  display: flex;
  justify-content: center;
}
.popup-device /deep/ .picker-toolbar {
  display: flex;
  align-items: center;
}
</style>
