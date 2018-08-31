<template>
<mu-container :style='{overflow: "auto"}' class='layout-container'>
  <top-component></top-component> 
    <h1 class='chart-title' :style='{margin: 0}'>空气温湿度趋势图</h1>

    <div class='chart-sub-action'>
      <mt-button type="primary" @click="selectDevice" size="small">切换设备</mt-button>
    </div>

    <mt-cell title="选择设备" is-link @click.native="changeDevice">
      <span style="color: green">{{ device }}</span>
    </mt-cell>
    <mt-cell title="选择日期" is-link @click.native="changeTime">
      <span style="color: green">{{ pickerStart|parseTime('{y}-{m}-{d}') }} - {{ pickerEnd|parseTime('{y}-{m}-{d}') }}</span>
    </mt-cell>

    <air-line :wendu='items.wendu' :shidu='items.shidu' :title='2' :style='{width:"100%", height: "50%"}'></air-line>
    <mt-popup
    v-model="popupVisible"
    class='popup-device'
    position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange" :showToolbar='true' ref='picker1'>
        
        选择设备编号
        <!-- <div class='item-left'>
        <span @click='selectDevice'>确定</span>
        </div> -->
      </mt-picker>
  </mt-popup>

  <mt-datetime-picker
    ref="pickerTimeStart"
    type="date"
    :confirmText='"下一步"'
    @confirm='nextPicker'
    v-model="pickerStart">
  </mt-datetime-picker>

  <mt-datetime-picker
    ref="pickerTimeEnd"
    type="date"
    :confirmText='"上一步"'
    @confirm='lastPicker'
    v-model="pickerEnd">
  </mt-datetime-picker>

</mu-container>
</template>

<script>
import { fetchDevice } from '@/api/monitor'
import AirLine from './Line'
import { parseTime } from '@/tools/'
import { Toast } from 'mint-ui'

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
      ],
      device: null,
      isChangeDevice: false,
      pickerStart: new Date(),
      pickerEnd: new Date(),
    }
  },
  filters: {
    parseTime
  },
  methods: {
    changeDevice() {
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      if (values[0]) {
        picker.setSlotValue(1, values[0]);
        this.device = values[0]
        this.isChangeDevice = true
      }
    },
    selectDevice() {
      // if(!this.isChangeDevice) {
      //   return
      // }
      // this.device = this.$refs.picker1.getSlotValue(0)
      fetchDevice().then((res) => {
        console.log(res)
        this.items = res.data
        this.isChangeDevice = false
      })  
    },
    changeTime() {
      this.$refs.pickerTimeStart.open();
    },
    nextPicker() {
      this.$refs.pickerTimeStart.close();
      this.$refs.pickerTimeEnd.open();
    },
    lastPicker() {
      this.$refs.pickerTimeStart.open();
      this.$refs.pickerTimeEnd.close();
    },

  },
  mounted() {
    this.device = '201502'
    this.$refs.picker1.setSlotValue(0, this.device)
  },
  created() {
    fetchDevice().then((res) => {
      console.log(res)
      this.items = res.data
    })    
  }
}
</script>

<style lang='scss' scoped>
.chart-sub-action {
  margin-bottom: 10px;
}
.layout-container /deep/ .popup-device {
  width: 100%;
}
.popup-device /deep/ .picker-toolbar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  justify-content: center;
}

.item-left {
  position: absolute;
  right: 10px;
  display: inline-block;
  color: #26a2ff;
}
.popup-device /deep/ .slot1 {
  text-align: center;
}
.layout-container /deep/ .mint-cell-title {
  text-align: left;
}
</style>
