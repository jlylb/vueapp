<template>

<div  class='layout-container'>

  <top-component @top-btn='filterChart'>
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
    <mt-cell title='选择省份' @click.native="clickProvince"> {{ provinceLabel }} </mt-cell>
    <mt-cell title='选择大棚' @click.native="clickCity"> {{ areaLabel }} </mt-cell>
    <mt-cell title='选择设备' @click.native="clickDevice"> {{ deviceLabel }} </mt-cell>

    <mt-radio
      title="查询时间"
      class='radio-time'
      v-model="selectDate"
      :options="radioOptions">
    </mt-radio>

    <div class='radio-time'>
      <label class="mint-radiolist-title">自定义</label>
      <mt-cell title='开始时间' @click.native="changeTimeStart"> {{ formatTime(searchDate.start) }} </mt-cell>
      <mt-cell title='结束时间' @click.native="changeTimeEnd"> {{ formatTime(searchDate.end) }} </mt-cell>

    </div>
    <mt-button size="large" type='primary' @click="fetchHistoryData">筛选</mt-button>
</mt-popup>

  <mt-datetime-picker
    ref="pickerTimeStart"
    type="date"
    @confirm="handleConfirm($event, 'start')"
    @cancel="handleCancel('start')"
    v-model="pickerStart">
  </mt-datetime-picker>

  <mt-datetime-picker
    ref="pickerTimeEnd"
    type="date"
    @confirm="handleConfirm($event, 'end')"
    @cancel="handleCancel('end')"
    v-model="pickerEnd">
  </mt-datetime-picker>


  <my-popup v-model="province" :open.sync='provinceOpen' :slots="provinces"></my-popup>

  <my-popup v-model="area" :open.sync='cityOpen' :slots="citySlots"></my-popup>

  <my-popup v-model="device" :open.sync='deviceOpen' :slots="deviceSlots"></my-popup>

</div>

</template>

<script>
import { fetchList, fetchHistoryDevice } from '@/api/monitor'
import { parseTime } from '@/tools/'
import { Toast } from 'mint-ui'
import 'echarts/lib/component/dataZoom'
import MyPopup from '@/components/popup'
import { getDataValue } from '@/tools'


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
      cityOpen: false,
      deviceOpen: false,

      device: null,
      isChangeDevice: false,
      pickerStart: new Date(),
      pickerEnd: new Date(),
      province: null,
      provinces: null,
      provincesSlots: [],

      area: null,
      city: null,
      citys: null,
      citySlots: [],

      device: null,
      devices: null,
      areaDevice: null,
      deviceSlots: [],

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
    },
    areaLabel() {
      return this.area ? this.area.label : ''
    },
    deviceLabel() {
      return this.device ? this.device.label : ''
    }
  },
  watch: {
    province(newval) {
      this.citys = newval ? this.city[newval.value] : []
      this.citySlots = [
        {
          flex: 1,
          values: this.citys,
          className: 'slot3',
        }
      ]
    },
    area(newval) {
      this.devices = newval ? this.areaDevice[newval.value] : []
      this.deviceSlots = [
        {
          flex: 1,
          values: this.devices,
          className: 'slot4',
        }
      ]
    },
    searchDate: {
      handler(newval) {
        console.log(newval, 'watch search date ......')
        if(newval.start && newval.end) {
          this.selectDate = null
        }
        if(!newval.start && !newval.end) {
          this.selectDate = 'day'
        }
      },
      deep: true
    },
    selectDate(newval) {
      if(newval) {
        this.searchDate = { start: null, end: null }
      }
    }
  },
  filters: {
    parseTime
  },
  methods: {
    formatChartData() {
        const { fields, items, name, num, unit, surfix } = this.items
        const chartData = {}
        const columns = [], rows = []
        for(let i = 1; i <= 10; i++) {
          fields.forEach(field => {
            let fieldKey = field
            let row = {}
            row
          });
        }
    },
    formatTime(str) {
      if(!str) return
      return parseTime(new Date(str), '{y}-{m}-{d}')
    },
    handleConfirm(val, sType) {
      this.searchDate[sType] = this.formatTime(val)
    },
    handleCancel(sType) {
      this.searchDate[sType] = null
    },
    selectDevice(params) {
      fetchHistoryDevice(this.getParams(params)).then((res) => {
        this.items = res.data.devices
      })  
    },
    fetchHistoryData() {
      this.selectDevice(this.device)
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
    },
    clickCity() {
      this.cityOpen = true
    },
    clickDevice() {
      this.deviceOpen = true
    },
    clickRadio() {
      this.searchDate = {
        start: null,
        end: null
      }
    },
    getParams(curDevice = {}) {
      const { value: device = null, device_type = null } = curDevice
      let searchDate = Object.values(this.searchDate).filter(item => item);
      return { device, device_type, searchDate, selectDate: this.selectDate, fmt: 'pc' }
    },
    getHistoryData() {
      this.getParams()
    }
  },
  mounted() {

  },
  created() {
    fetchList().then((res) => {
      let province = res.data.province
      this.provinces = [
        {
          flex: 1,
          values: province,
          className: 'slot2',
        }
      ]

      const proFirst = getDataValue(province, [0, 'value'])
      this.city = res.data.city
      this.areaDevice = res.data.areaDevice
      const firstCity = getDataValue(this.city, [proFirst, 0, 'value'])
      const device = getDataValue(this.areaDevice, [firstCity, 0])
      return device     
    }).then((res) => {
        this.selectDevice(res)
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
