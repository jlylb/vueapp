<template>
   <div class='layout-container'>

    <top-component></top-component> 


    <div class='chart-block'>
      <ve-histogram 
        :data="chartData" 
        :settings="chartSettings" 
        :extend="extend" 
        :data-empty="dataEmpty"
        :loading="loading"
        :after-set-option='afterSet'
        height='100%' ></ve-histogram>
    </div>
    <div class='chart-desc' v-if='item'>
      <div class='chart-desc-title'>
        <div class='chart-desc-item chart-desc-item-left'>
          <div class='chart-desc-icon'>
            <svg-icon icon-class='wsdu' class='item-icon'></svg-icon>
          </div>
        </div>
        <div class='chart-desc-item chart-desc-item-right'>
          <p> 
            <span class='item-title item-title-select' @click='deviceFileter'>{{  this.deviceName + this.itemIndex }}</span>
          </p>
          <p>
            {{ item['consta']['consta_name'] }}: 
            <mt-badge :type="item['consta']['consta_value']===0?'success':'error'">{{ item['consta']['consta_value']===0?'正常':'断线' }}</mt-badge>
           </p>
        </div>
      </div>
      <div class='chart-desc-block'>
        
        <div :class='["chart-desc-block-item", itemClass[itemFields.indexOf(index)]]' v-for='(itemValue, index) in item' :key='index' v-if='index!=="consta"'>
          <p :class='{column: isColumn}'>
            <span>{{ itemValue[index+'_name'] }}</span>
            <span>{{ itemValue[index+'_value'] }}  {{ unit[index] }}</span> </p>
          <p :class='{column: isColumn}'>
            <span>上限告警</span>
            <span>{{ itemValue['hwarn_value']===0?'正常':'过高' }}</span> 
          </p>
          <p :class='{column: isColumn}'>
            <span>下限告警</span>
            <span>{{ itemValue['lwarn_value']===0?'正常':'过低' }}</span> 
          </p>

        </div>


      </div>
    </div>

  <mt-popup
    v-model="selectDevice"
    class='popup-device'
    :style='{height: "240px"}'
    position="bottom">

    <mt-cell 
    :title="deviceName + item" 
    @click.native='openDevice(item)'
    :class='{ itemSelect: itemIndex===item }' 
    is-link 
    v-for='item in num' 
    :key='item'>
      <svg-icon :icon-class='pdiIndex.icon' class='item-icon' slot='icon' v-if='pdiIndex'></svg-icon>
    </mt-cell>

  </mt-popup>


  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { fetchDevice } from '@/api/monitor'
import DropMenu from '@/components/dropdown'
import { getDataValue } from '@/tools'

export default {
  components: { DropMenu },
  data() {
    return {
      selectDevice: false,
      device: null,
      item: null,
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
      itemClass: ['red', 'yellow', 'primary'],
      dapeng: null,
      itemSelect: 'itemSelect',
      dataEmpty: false,
      chart: null,
      loading: false,
      isColumn: false
    }
  },
  methods: {
    getDataValue,
    afterSet(chart) {
      this.chart = chart
    },
    openDevice(item) {
      this.itemIndex = item
    },
    deviceFileter() {
      this.selectDevice = true
    },
    clickMenu(item) {
      // this.selectDevice = true
      this.openMenu = false
      this.pdiIndex = item
    },
    selectType() {
      this.openMenu = true
      this.itemIndex = null
    },
    formatChartData() {
      this.isColumn = false
      if(!this.itemIndex) return
      const item = this.items[this.itemIndex - 1]
      this.item = item
      let yAxisName = [], yAxisType = ['value'], axisSite = {}, rows = [], columns = []
      let chartRow = {}, min = [0], max = [100], labelMap = {}
      chartRow['name'] = this.deviceName ? (this.deviceName + this.itemIndex) : ''
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
      if(columns.length > 1) {
        this.isColumn = true
      }
      columns = ['name'].concat(columns)
      this.chartData = {
        columns, rows
      }
      console.log()
    },
    getData(data) {
      this.loading = true
      fetchDevice(data).then((res) => {
        this.loading = false
        console.log(res)
        this.device = res.data.devices
        if(this.device.length === 0) {
          MessageBox.alert(`该设备没有数据！`, '提示');
          this.items = []
          this.num = 0
          this.itemFields = []
          this.deviceName = null
          this.item = null
          this.dataEmpty = true
          this.chartData = {
            columns: [], rows: []
          }
          this.chartSettings = {
            axisSite: {}, yAxisType: [], yAxisName: [], min: [], max: [], labelMap: {}
          }
          console.log(this.chart, 'chart instance....')
          if(this.chart) {
            this.chart.clear()
          }
          this.itemIndex = null
          return
        }
        this.dataEmpty = false
        this.items = getDataValue(this.device, ['items'], [])
        this.num = getDataValue(this.device, ['num'], 0)
        this.itemFields = getDataValue(this.device, ['fields'], [])
        this.deviceName = getDataValue(this.device, ['name'], '')
        this.unit = getDataValue(this.device, ['unit'], null)
        this.icons = getDataValue(this.device, ['typeicons'], null)
        this.itemIndex = 1
      }) 
    }
  },
  watch: {
    pdiIndex(newVal) {
      let { value: device } = newVal
      this.getData({ ...newVal, device })
    },
    itemIndex(newVal) {
      // this.getData(newVal)
      this.formatChartData()
    },
    selectDevice(newVal) {
      if(newVal===false) this.openMenu = false
    },
    '$route': function(to) {
      console.log(to, 'device to .....')
    }
  },
  created() {
    console.log(this.$route.params)
    this.extend = {
          grid: { 
            left: '5%',
            right: '5%',
            bottom: '1%',
         },
    }
    const { pdi } = this.$route.params
    this.getData({pdi})
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
.item-title {
  letter-spacing: normal;
  cursor: pointer;
  &::after {
    border: solid 2px $blue;
    border-bottom-width: 0;
    border-left-width: 0;
    content: ' ';
    position: absolute;
    width: 6px;
    height: 6px;
    transform: rotate(135deg);
    display: inline-block;
    margin-left: 3px;
  }
}
.item-title-select {
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
  background-color: $blue;
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
      color: $blue;
      letter-spacing: 5px;
    }
    text-align: left;
    padding: 5px;
    color: rgba(0, 0, 0, 0.5);
    span {
      display: inline-block;
      // padding-left: 3px;
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
  flex: 1;
  p {
    display: flex;
    justify-content: space-around;
    width: 80%;
    &.column {
      flex-direction: column;
      width: auto;
      span {
        &:first-child {
          margin-bottom: 3px;
        }
      }
    }
    span {
      &:first-child {
        margin-right: 5px;
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
