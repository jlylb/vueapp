<template>

<div  class='layout-container'>

  <top-component>
    <span slot='right' @click='filterChart'>筛选</span>
  </top-component> 

<div class='chart-block'>

    <h1 class='chart-title' >空气温湿度趋势图</h1>

        <ve-line
          :data="chartData"
          :data-zoom="dataZoom">
        </ve-line>

    </div>
  


  <mt-popup
  v-model="filterLeft"
  class='popup-menu'
  popup-transition="popup-fade">
    <mt-cell title="当天" is-link>
    </mt-cell>
    <mt-cell title="本周" is-link>
    </mt-cell>
    <mt-cell title="本月" is-link>
    </mt-cell>
    <mt-cell title="本年" is-link>
    </mt-cell>
    <mt-cell title="自定义" is-link @click.native='openChart'>
    </mt-cell>
</mt-popup>

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

    <mt-cell class='filter-button'>
      <mt-button size="large" type='primary' @click="selectDevice">确定</mt-button>
    </mt-cell>


  </mt-popup>

</div>

</template>

<script>
import { fetchDevice } from '@/api/monitor'
import { parseTime } from '@/tools/'
import { Toast } from 'mint-ui'
import 'echarts/lib/component/dataZoom'

export default {
  components: {  },
  data() {
    this.dataZoom = [
        {
          type: 'slider',
          start: 0,
          end: 20
        }
    ]
    return {
    chartData: {
        columns: ['日期', '成本', '利润'],
        rows: [
          { '日期': '1月1日', '成本': 15, '利润': 12 },
          { '日期': '1月2日', '成本': 12, '利润': 25 },
          { '日期': '1月3日', '成本': 21, '利润': 10 },
          { '日期': '1月4日', '成本': 41, '利润': 32 },
          { '日期': '1月5日', '成本': 31, '利润': 30 },
          { '日期': '1月6日', '成本': 71, '利润': 55 }
        ]
      },
      items: [],
      popupVisible: false,
      filterOpen: false,
      filterLeft: false,
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
      this.filterLeft = true
    },
    openChart() {
      this.filterLeft = false
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
.chart-title {
  font-size: 24px;
  line-height: 24px;
  // font-weight: bold;
}
.chart-block {
  // overflow: auto;
  display: inline-block;
  position: relative;
  height: 300px;
  width: 100%;
}
.chart {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  width: 400px;
  min-height: 300px;
  position: absolute;
  margin-top: 20px;
  left: 50%;
  transform: translate3d(-50%,0,0);

  // flex: 1;
}
</style>
