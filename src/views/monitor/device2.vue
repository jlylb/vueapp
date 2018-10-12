<template>
   <div class='layout-container'>

    <top-component @top-btn='selectType'>
    </top-component> 


    <div class='chart-block'>
<ve-histogram :data="chartData" :settings="chartSettings" height='100%' ></ve-histogram>
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
        
        <div class='chart-desc-block-item red'>
          <p>温度</p>
          <p>22°C</p>
          <p>预警</p>
          <p>
            <span>-22°C</span>
            <span>+22°C</span>
          </p>
        </div>

        <div class='chart-desc-block-item primary'>
          <p>湿度</p>
          <p>59%RH</p>
          <p>预警</p>
          <p>
            <span>-10%RH</span>
            <span>+10%RH</span>
          </p>
        </div>

        <div class='chart-desc-block-item yellow'>
          <p>湿度</p>
          <p>59%RH</p>
          <p>预警</p>
          <p>
            <span>-10%RH</span>
            <span>+10%RH</span>
          </p>
        </div>

      </div>
    </div>

  <mt-popup
    v-model="selectDevice"
    class='popup-device'
    position="bottom">

    <mt-cell 
    :title="item.name" 
    :label="item.type"
    @click.native='openDevice(item)' 
    is-link 
    v-for='(item, index) in device' 
    :key='index'>
      <svg-icon :icon-class='item.icon' class='item-icon' slot='icon'></svg-icon>
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
      chartData: {
          columns: ['日期', '访问用户', '下单用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, },
          ]
        }
    }
  },
  methods: {
    openDevice(item) {
      this.items = {...this.items}
      this.selectDevice = false
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
          result.push({...item, type: dtype})
        })
      }
      return result
    },
    getData(data) {
      fetchDevice(data).then((res) => {
        console.log(res)
        this.device = res.data.devices
      }) 
    }
  },
  watch: {
    pdiIndex(newVal) {
      this.getData(newVal)
    }
  },
  created() {
    console.log(this.$route.params)
    const { selectDevice } = this.$route.params
    this.deviceData = this.formatDevice(selectDevice)
    this.pdiIndex = getDataValue(this.deviceData, [0], null)
    this.chartSettings = {
        axisSite: { right: ['下单用户'] },
        yAxisType: ['normal', 'normal'],
        yAxisName: ['数值', '数值']
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
