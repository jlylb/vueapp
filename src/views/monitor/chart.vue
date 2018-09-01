<template>

<div :style='{overflow: "auto"}' class='layout-container'>

  <top-component>
    <span slot='right' @click='filterChart'>筛选</span>
  </top-component> 

    <h1 class='chart-title' :style='{margin: 0}'>空气温湿度趋势图</h1>

    <div class='chart'>
        <air-line :wendu='items.wendu' :shidu='items.shidu' :title='2' :style='{width:"100%", height: "50%"}'></air-line>
    </div>

  <mt-datetime-picker
    ref="pickerTimeStart"
    type="date"
    v-model="pickerStart">
  </mt-datetime-picker>

  <mt-datetime-picker
    ref="pickerTimeEnd"
    type="date"
    v-model="pickerEnd">
  </mt-datetime-picker>

    <mt-popup
    v-model="filterOpen"
    class='popup-device'
    position="bottom">

    <mt-cell title="开始日期" is-link @click.native="changeTimeStart">
      <span>{{ pickerStart|parseTime('{y}-{m}-{d}') }} </span>
    </mt-cell>

    <mt-cell title="结束日期" is-link  @click.native="changeTimeEnd">
      <span>{{ pickerEnd|parseTime('{y}-{m}-{d}') }}</span>
    </mt-cell>

    <mt-cell title="条件过滤">
      <mt-button size="small" type='primary' @click="selectDevice">确定</mt-button>
    </mt-cell>


  </mt-popup>

</div>

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
      filterOpen: false,
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

    selectDevice() {

      fetchDevice().then((res) => {
        console.log(res)
        this.items = res.data
        this.isChangeDevice = false
      })  
    },
    changeTimeStart() {
      this.$refs.pickerTimeStart.open();
    },
    changeTimeEnd() {
      this.$refs.pickerTimeEnd.open();
    },

    filterChart() {
      this.filterOpen = true
    }
  },
  mounted() {

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
.chart {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  min-height: 300px;
  flex: 1;
}
</style>
