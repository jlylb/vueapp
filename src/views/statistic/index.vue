<template>

<div  class='layout-container'>

  <top-component @top-btn='filterChart'>
  </top-component> 

<div class='chart-block'>

    <!-- <h1 class='chart-title' v-if='allRows.length > 0'>{{ deviceName }}趋势图</h1> -->

        <ve-line
          :data="chartData"
          :data-zoom="dataZoom"
          :settings="chartSettings"
          :loading="loading"
          :data-empty="dataEmpty"
          :extend='extend'
          :after-set-option-once='afterRoom'>
        </ve-line>

      <div class='selectButton' @click='deviceFileter' v-if='allRows.length > 0'>
        <label> {{ deviceName }}{{ curIndex }} </label>
        <i :class='["item-arrow-icon", {"item-arrow-up": !arrow, "item-arrow-down": arrow}]'> </i>
      </div>

    </div>
  


  <mt-popup
  v-model="filterLeft"
  position="right"
  class='popup-menu-right'>
  <top-component :fixed='false' :title='"筛选条件"'>
      <template slot='left'>
        <mt-button icon="back" @click="cancelFilter" >返回</mt-button>
     </template>
    <template slot='right'>
        <mt-button  slot="right" @click='fetchHistoryData'>确定</mt-button>
     </template>
  </top-component> 
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

    <my-loading :visible='loadingSpinner'></my-loading>
    <!-- <div>
      <mt-button  type='danger' @click="cancelFilter" :style='{width: "40%", "margin-right": "10px"}'>关闭</mt-button>
      <mt-button  type='primary' @click="fetchHistoryData" :style='{width: "40%"}'>筛选</mt-button>
    </div> -->
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


  <!-- <my-popup v-model="province" :open.sync='provinceOpen' :slots="provinces"></my-popup> -->

  <my-popup2 v-model="provinceArea" :open.sync='provinceAreaOpen' :slots="provinceAreaSlots" @inputChange='changeCompany' @confirm='confirmOk'></my-popup2>

  <my-popup v-model="area" :open.sync='cityOpen' :slots="citySlots" show-key='alias'></my-popup>

  <my-popup v-model="device" :open.sync='deviceOpen' :slots="deviceSlots"></my-popup>

  <mt-popup
    v-model="isSelectDevice"
    class='popup-device'
    :style='{height: "240px", "overflow-y": "auto"}'
    position="bottom">

    <mt-cell 
    :title="deviceName + item" 
    @click.native='openDevice(item)'
    :class='{ itemSelect: curIndex===item }' 
    is-link 
    v-for='item in num' 
    :key='item'>
    <svg-icon :icon-class='deviceIcon' class='item-icon' slot='icon' v-if='deviceIcon'></svg-icon>
    </mt-cell>

  </mt-popup>

</div>

</template>

<script>
import { fetchList, fetchHistoryDevice } from '@/api/monitor'
import { parseTime } from '@/tools/'
import { Toast,Indicator } from 'mint-ui'
import 'echarts/lib/component/dataZoom'
import MyPopup from '@/components/popup'
import MyPopup2 from '@/components/popup2'
import { getDataValue } from '@/tools'
import 'v-charts/lib/style.css'
import MyLoading from '@/components/loading'

export default {
  components: { MyPopup, MyLoading, MyPopup2 },
  data() {

    return {
      chartData: {

      },
      items: [],
      popupVisible: false,
      filterOpen: false,
      filterLeft: false,
      cityOpen: false,
      deviceOpen: false,

      device: null,
      isChangeDevice: false,
      pickerStart: new Date(),
      pickerEnd: new Date(),

      firstProvince: null,
      firstCompany: null,
      provinceArea: [],
      provinceAreaOpen: false,
      provinceAreaSlots: [],
      company: null,
      company_pro: null,

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
      curIndex: 0,
      deviceName: '',
      curRow: [],
      allRows: [],
      chart: null,
      isSelectDevice: false,
      num: 10,
      dataZoom: [],
      loading: false,
      dataEmpty: false,
      arrow: false,
      extend: {},
      deviceIcon: null,
      loadingSpinner: false,
      // provinceLabel: ''
    }
  },
  computed: {
    provinceLabel() {
      return this.firstProvince ? this.firstProvince.label : ''
    },
    areaLabel() {
      return this.area ? this.area.alias  : ''
    },
    deviceLabel() {
      return this.device ? this.device.label : ''
    }
  },
  watch: {
    firstProvince(newval) {
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
        if(newval.start || newval.end) {
          this.selectDate = null
        }
        // if(!newval.start && !newval.end) {
        //   this.selectDate = 'day'
        // }
      },
      deep: true
    },
    selectDate(newval) {
      if(newval) {
        this.searchDate = { start: null, end: null }
      }
    },
    curIndex(newVal) {
      if(newVal===0){
        return
      }
      this.curRow = this.allRows[newVal-1]?this.allRows[newVal-1]:[]
      this.formatChartData()

    },
    isSelectDevice(newval){
      this.arrow = newval
    }
  },
  filters: {
    parseTime
  },
  methods: {
    cancelFilter() {
      this.filterLeft = false
    },
    deviceFileter() {
      this.isSelectDevice = true
      // this.arrow = !this.arrow
    },
    openDevice(item) {
      this.curIndex = item
    },
    afterRoom($chart) {
      this.chart = $chart
      let i=0
      const len = this.curRow.length

      console.log(len, 'after room...')
      let sint
      if(sint){
        clearInterval(sint)
      }
      sint = setInterval(function () {
        if(len===0){
          clearInterval(sint)
          return
        }
        let s = i
        let e = i+1
        console.log(s,e,'data room........')
        $chart.dispatchAction({
              type: 'dataZoom',
              dataZoomIndex: 0,
              // 开始位置的百分比，0 - 100
              startValue: s,
              // 结束位置的百分比，0 - 100
              endValue: e,

          })
          if(i==len-2) {
            i = 0
          }else{
            i++
          }
          
      }, 1000)


    },
    formatRows() {
      const { fields, items, name, icon } = this.items
      console.log(this.chart,'rows....')
      if((!fields && this.chart)||!items){
        this.curIndex = 0
        this.chart.clear()
        this.allRows = []
        this.dataEmpty = true
        return;
      }
      this.dataEmpty = false
      this.deviceIcon = icon
      const  rows = []
      this.deviceName = name
      for(let i = 1; i <= 10; i++) {
        let row = {}
        fields.forEach(field => {
          let fieldKey = field + i
          let curItem = items[field][fieldKey];
          Object.keys(curItem).sort().map((item) => {
            if(!row[item]) {
              row[item] = { date: item, [field]: curItem[item]}
            }else{
              row[item] = Object.assign(row[item], { [field]: curItem[item] })
            }
          })
        });
        rows.push(Object.values(row))
      }
      this.allRows = rows
    },
    formatChartData() {
        const { items, fields, num, unit, surfix } = this.items
        if(!items) {
          this.allRows = []
          this.curIndex = 0
          this.chart.clear()
          return ;
        }
        console.log(fields, 'chart data............')
        const chartData = {}

        let columns = ['date'].concat(fields)
        
        this.chartData = {
          columns,
          rows: this.curRow
        }
        let axisSite = { right: [columns[columns.length-1]] }
        let yAxisType = []
        let min = [], max = [], labelMap = {}
        labelMap = surfix
        let yAxisName = []
        fields.forEach((field) => {
          yAxisType.push('value')
          min.push(0)
          max.push(100)
          yAxisName.push(surfix[field] + ' ' + unit[field])
        })

        this.chartSettings = {
          axisSite,
          yAxisType,
          yAxisName,
          labelMap,
          min,
          max
        }
        this.dataZoom = [
            {
              type: 'slider',
              start: 0,
              end: 20,
              // left: '20%',
              // right: '20%',
              labelFormatter: function (value) {
              }
            }
        ]
      this.extend = {
         'xAxis.0.axisLabel.formatter': (value) => {
           return value.split(/\s/).join('\n')
         }
      }
      console.log('format chart data......')
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
      // Indicator.open({
      //   text: '加载中...',
      //   spinnerType: 'fading-circle'
      // });
      this.loading = true
      this.loadingSpinner = true
      fetchHistoryDevice(this.getParams(params)).then((res) => {
        this.items = res.data.devices 
        this.formatRows()
        this.curIndex = 1
        this.loading = false
        this.loadingSpinner = false
        this.filterLeft = false
       // Indicator.close();
        // this.formatChartData()
      }).catch((res)=>{
        // Indicator.close();
        this.loadingSpinner = false
        this.loading = false
      })  
    },
    fetchHistoryData() {
      this.curIndex = 0
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
// this.provinceOpen = true
      this.provinceAreaOpen = true
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
    },
    changeCompany(values, picker) {
      console.log(values, picker, 'log.......')
      if(values[0] && values[1]){
        picker.setSlotValues(1, getDataValue(this.company_pro, [values[0].value], []));
      }
      
    },
    confirmOk() {
      const [currentCompay , currentProvince ] = this.provinceArea
      console.log(currentProvince, currentCompay)
      this.firstProvince = currentProvince
      this.firstCompany = currentCompay
      // this.setProvince()
      this.provinceAreaOpen = false
    },
  },
  mounted() {

  },
  created() {
    fetchList().then((res) => {
      let province = res.data.province

      const proFirst = getDataValue(province, [0, 'value'])
      this.city = res.data.city
      this.areaDevice = res.data.areaDevice

      this.company = res.data.company
      this.company_pro = res.data.company_province
      let firstKey
      if(this.currentProvince) {
        let [ company, province ] = this.currentProvince
        this.firstProvince = province
        firstKey =  company
      }else{
        firstKey = getDataValue(this.company, [0], null)
        this.firstProvince = getDataValue(this.company_pro, [firstKey.value, 0], null)
      }
      const firstCity = getDataValue(this.city, [this.firstProvince.value, 0, 'value'])
      const device = getDataValue(this.areaDevice, [firstCity, 0])
      this.firstCompany = firstKey
      const area = getDataValue(this.company_pro, [firstKey.value], [])
      this.provinceAreaSlots = [
        {
          flex: 1,
          values: this.company,
          className: 'slot1',
          textAlign: 'center',
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: area,
          className: 'slot3',
          textAlign: 'center',
        }
      ]
      this.provinceArea =  [firstKey, this.firstProvince]
      
      return device     
    }).then((res) => {
        this.selectDevice(res)
        // this.curIndex = 1
    })
      this.chartSettings = {

      }

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
  width: 100%;
  height: 100%;
  left: auto;
  overflow-y: auto;
  // top: 0;
}
.radio-time /deep/ .mint-radiolist-title {
  text-align: left;
}
.itemSelect {
  background-color: $blue;
  /deep/ {
    .mint-cell-text {
      color: #fff;
      vertical-align: inherit;
    }
    .item-icon {
      color: #fff;
    }
  }
}
.item-arrow-icon {
  &::after {
    border: solid 2px $blue;
    content: ' ';
    top: 50%;
    right: 20px;
    position: absolute;
    width: 5px;
    height: 5px;
    transform: translateY(-50%) rotate(45deg);
    letter-spacing: normal;
    cursor: pointer;
  }
}
.item-arrow-right {
  &::after {
    border-bottom-width: 0;
    border-left-width: 0;
  }
}
.item-arrow-down {
  &::after {
    border-top-width: 0;
    border-left-width: 0;
  }
}
.item-arrow-up {
  &::after {
    border-bottom-width: 0;
    border-right-width: 0;
  }
}
.item-arrow-left {
  &::after {
    border-top-width: 0;
    border-right-width: 0;
  }
}
.selectButton {
  border: 1px solid $blue;
  background-color: transparent;
  color: $blue;
  display: block;
  width: 90%;
  border-radius: 4px;
  font-size: 18px;
  height: 41px;
  outline: 0;
  overflow: hidden;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style>
