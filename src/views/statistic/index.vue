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
  position="bottom"
  class='popup-menu popup-menu-right'
  popup-transition="popup-fade">
    <mt-field label="公司" placeholder="选择省份" :value="provinceLabel" @click.native="clickProvince"></mt-field>
    <mt-field label="大棚" placeholder="选择大棚" v-model="area"></mt-field>
    <mt-field label="设备" placeholder="选择设备" v-model="device"></mt-field>

    <mt-radio
      title="查询时间"
      class='radio-time'
      v-model="selectDate"
      :options="radioOptions">
    </mt-radio>

    <div class='radio-time'>
      <label class="mint-radiolist-title">自定义</label>
      <mt-field label="开始时间" placeholder="开始时间" v-model="searchDate.start" @click.native="changeTimeStart"></mt-field>
      <mt-field label="结束时间" placeholder="结束时间" v-model="searchDate.end" @click.native="changeTimeEnd"></mt-field>
    </div>
    <mt-button size="large" type='primary'>筛选</mt-button>
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


  <my-popup v-model="province" :open.sync='provinceOpen' :slots="provinces"></my-popup>

</div>

</template>

<script>
import { fetchList, fetchDevice } from '@/api/monitor'
import { parseTime } from '@/tools/'
import { Toast } from 'mint-ui'
import 'echarts/lib/component/dataZoom'
import MyPopup from '@/components/popup'


export default {
  components: { MyPopup },
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
      provinceOpen: false,
      slots: [
        {
          flex: 1,
          values: ['201501', '201502', '201503', '201504', '201505', '201506'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      device: null,
      isChangeDevice: false,
      pickerStart: new Date(),
      pickerEnd: new Date(),
      province: null,
      provinces: null,
      provincesSlots: [],
      area: null,
      device: null,
      selectDate: 'day',
      searchDate: { start: null, end: null },
      radioOptions: [
        {
          label: '当天',
          value: 'day',
        },
        {
          label: '本周',
          value: 'week'
        },
        {
          label: '本月',
          value: 'month'
        },
        {
          label: '本年',
          value: 'year'
        },
      ],
      // provinceLabel: ''
    }
  },
  computed: {
    provinceLabel() {
      return this.province ? this.province.label : ''
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
    },
    onProvinceChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    clickProvince() {
      this.provinceOpen = true
    }
  },
  mounted() {

  },
  created() {
    fetchList().then((res) => {
      this.items = res.data.items
this.province = {value: 251, label: "广东省1"}
      this.provinces = [
        {
          flex: 1,
          // defaultIndex: 0,
          values: [{value: 250, label: "广东省"},{value: 251, label: "广东省1"}],
          className: 'slot2',
        }
      ]
      
console.log('main .............')
      this.city = res.data.city
      // this.device = res.data.device

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
  transform: translate3d(-50%, 0, 0);

  // flex: 1;
}
.popup-menu-right {
  width: 80%;
  height: 100%;
  left: auto;
}
.radio-time /deep/ .mint-radiolist-title {
  text-align: left;
}
</style>
