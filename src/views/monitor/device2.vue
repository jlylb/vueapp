<template>
   <div class='layout-container'>

    <top-component @top-btn='selectType'>
    </top-component> 


    <div class='chart-block'>
<ve-histogram :data="chartData" :settings="chartSettings" :extend="extend" height='100%' ></ve-histogram>
      <!-- <air-line :wendu='items.wendu' :shidu='items.shidu' :title='2' class='chart'></air-line> -->
    </div>
    <div class='chart-desc'>
      <div class='chart-desc-title'>
        <div class='chart-desc-item chart-desc-item-left'>
          <div class='chart-desc-icon'>
            <svg-icon icon-class='dapeng' class='item-icon'></svg-icon>
          </div>
        </div>
        <div class='chart-desc-item chart-desc-item-right'>
          <p>一号大棚</p>
          <p>状态:<span>温度正常</span><span>湿度正常</span><span>湿度正常</span>
           </p>
        </div>
      </div>
      <div class='chart-desc-block'>
        
        <div class='chart-desc-block-item red' v-for='(itemValue, index) in item' :key='index' v-if='index!=="consta"'>
          <p>{{ itemValue[index+'_name'] }}</p>
          <p>{{ itemValue[index+'_value'] }}  {{ unit[index] }}</p>
          <p>上限告警</p>
          <p>{{ itemValue['hwarn_value'] }}</p>
          <p>下限告警</p>
          <p>{{ itemValue['lwarn_value'] }}</p>

        </div>


      </div>
    </div>

  <mt-popup
    v-model="selectDevice"
    class='popup-device'
    position="bottom">

    <mt-cell 
    :title="deviceName + item" 
    @click.native='openDevice(item)' 
    is-link 
    v-for='item in num' 
    :key='item'>
      <!-- <svg-icon :icon-class='item.icon' class='item-icon' slot='icon'></svg-icon> -->
    </mt-cell>

  </mt-popup>

  <drop-menu :open.sync='openMenu' :data='deviceData' @menuItem='clickMenu'></drop-menu>

  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { fetchDevice } from '@/api/monitor'
import AirLine from '@/views/statistic/Line'
import DropMenu from '@/components/dropdown'
import { getDataValue } from '@/tools'

export default {
  components: { AirLine, DropMenu },
  data() {
    return {
      popupVisible: false,
      deviceStatus: true,
      workStatus: true,
      selectDevice: false,
      device: null,
      item: {},
      items: [],
      openMenu: false,
      pdiIndex: null,
      deviceData: null,
      chartData: {},
      chartSettings: {},
      num: 0,
      deviceName: '',
      itemFields: null,
      unit: null,
      icons: null,
      itemIndex: null,
    }
  },
  methods: {
    openDevice(item) {
      // this.items = {...this.items}
      this.itemIndex = item
      // this.selectDevice = false
    },
    deviceFileter() {
      this.selectDevice = true
    },
    clickMenu(item) {
      this.selectDevice = true
      this.pdiIndex = item
    },
    selectType() {
      this.openMenu = true
    },
    formatDevice(data) {
      const result = []
      for(let dtype in data) {
        data[dtype].map((item)=> {
          let { value: device } = item
          result.push({ device, device_type: dtype, ...item })
        })
      }
      return result
    },
    formatChartData() {
      const item = this.items[this.itemIndex - 1]
      this.item = item
      let yAxisName = [], yAxisType = ['value'], axisSite = {}, rows = [], columns = []
      let chartRow = {}, min = [0], max = [100], labelMap = {}
      chartRow['name'] = this.deviceName + this.itemIndex
      console.log(this.itemFields, 'format chartdata')
      this.itemFields.map((temp) => {
        let cur = item[temp]
        let itemKey = temp+'_name', itemValue = temp+'_value'
        let curKeyVal = cur[itemKey], curValueVal = cur[itemValue]
        yAxisName.push(curKeyVal + ' ' + this.unit[temp])
        columns.push(temp)
        chartRow[temp] = curValueVal
        labelMap[temp] = curKeyVal
      })
      console.log(yAxisName, 'yAxisName...')
      let len = yAxisName.length
      if(len > 1) {
        axisSite = { right: [columns[len-1]] }
        yAxisType.push('value')
        min.push(0),
        max.push(100)
      }
      rows.push(chartRow)
      this.chartSettings = {
        axisSite, yAxisType, yAxisName, min, max, labelMap
      }
      columns = ['name'].concat(columns)
      this.chartData = {
        columns, rows
      }
      console.log()
    },
    getData(data) {
      fetchDevice(data).then((res) => {
        console.log(res)
        this.device = res.data.devices
        this.items = getDataValue(this.device, ['items'], [])
        this.num = getDataValue(this.device, ['num'], [])
        this.itemFields = getDataValue(this.device, ['fields'], [])
        this.deviceName = getDataValue(this.device, ['name'], '')
        this.unit = getDataValue(this.device, ['unit'], '')
        this.icons = getDataValue(this.device, ['icons'], '')
        this.itemIndex = 1
      }) 
    }
  },
  watch: {
    pdiIndex(newVal) {
      this.getData(newVal)
    },
    itemIndex(newVal) {
      // this.getData(newVal)
      this.formatChartData()
    },
    selectDevice(newVal) {
      if(newVal===false) this.openMenu = false
    }
  },
  created() {
    console.log(this.$route.params)
    const { selectDevice } = this.$route.params
    this.deviceData = this.formatDevice(selectDevice)
    this.pdiIndex = getDataValue(this.deviceData, [0], null)
    this.extend = {
          grid: { 
            left: '5%',
            right: '5%',
            bottom: '1%',
         },
    }
   
  }
}
</script>

<style lang='scss' scoped>
.chart-block {
  display: inline-block;
  position: relative;
  height: 45%;
  width: 100%;
  // overflow: hidden;
}

.chart {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.chart-desc {
  height: 55%;
}
.chart-desc-title {
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 10px 0;
  height: 25%;
  background-color: #e6effb;
}
.chart-desc-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #67c23a;
  position: relative;
  margin: 0 auto;
  .item-icon {
    position: absolute;
    fill: #fff;
    width: 40px;
    height: 40px;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
.chart-desc-item-left {
  width: 25%;
}
.chart-desc-item-right {
  width: 75%;
  p {
    &:first-child {
      color: #67c23a;
      letter-spacing: 5px;
    }
    text-align: left;
    padding: 5px;
    color: rgba(0, 0, 0, 0.5);
    span {
      display: inline-block;
      padding-left: 3px;
    }
  }
}
.chart-desc-block {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  // height: 185px;
  height: 75%;
}
.chart-desc-block-item {
  width: 50%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  p {
    span {
      &:first-child {
        margin-right: 5px;
        margin-bottom: 5px;
      }
      border-radius: 25%;
      border: 1px solid rgba(255, 255, 255, 0.8);
      display: inline-block;
      padding: 5px;
    }
  }
}
.red {
  background-color: #f56c6c;
}
.yellow {
  background-color: #e6a23c;
}
.primary {
  background-color: #409eff;
}
.layout-container /deep/ .popup-device {
  height: 40%;
  overflow-y: auto;
}
.layout-container {
  height: 100%;
  overflow: hidden;
}
</style>
