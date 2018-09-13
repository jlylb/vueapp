<template>
<div>
  <my-echart v-model='echartsData' ></my-echart>
</div>
</template>

<script>
// import echarts from 'echarts'
import MyEchart from "@/components/Charts/myechart";

export default {
  components: { MyEchart },
  data() {
    return {
      echartsData: this.getData()
    }
  },
  props: {
    title: {
      type: [String, Number],
      default: ''
    },
    wendu: {
      type: Array,
      default() {
        return []
      }
    },
    shidu: {
      type: Array,
      default() {
        return []
      }
    },
  },
  watch: {
    wendu(newval) {
      console.log(newval, 'wendu')
      this.echartsData = this.getData()
    },
    // shidu(newval) {
    //   console.log(newval, 'shidu')
    //   this.echartsData = this.getData()
    // }
  },
  methods: {
    getData() {
      // const color = 'rgba(64,158,255,1)'
      const color = 'rgba(0,0,0,0.3)'
      const option = {
        backgroundColor: '#e6effb',
        title: {
          left: 'center',
         // text: '空气温湿度趋势图',
          // subtext: '设备编号: ' + this.title
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          left: 'center',
          bottom:'0',
          data: ["温度", "湿度"]
        },
        toolbox: {
          show: false,
        },
        xAxis: {
          type: "time",
          boundaryGap: false,
          splitLine: {show: false},
          axisLine: {
            lineStyle: {
              opacity: 0.8,
              color: ['rgba(0,0,0,0.3)']
            }
          },
          axisLabel: {
            color: color
          },
         // data: times
        },
        yAxis: {
          name: '单位: °C',
          type: "value",
          axisLabel: {
            formatter: "{value}",
            color: color
          },
          splitLine: {
            lineStyle: {
              opacity: 0.8,
              color: ['rgba(0,0,0,0.3)']
            }
          },
          axisLine: {
            lineStyle: {
              opacity: 0.8,
              color: ['rgba(0,0,0,0.3)']
            }
          }
        },
        grid: { 
            left: '12%',
            top: '12%',
         },
        series: [
          {
            name: "温度",
            type: "line",
            data: this.wendu,
            lineStyle: {
              color: '#f56c6c',
             opacity: 0.8,
            }

          },
          {
            name: "湿度",
            type: "line",
            data: this.shidu,
            lineStyle: {
              color: '#409eff',
              opacity: 0.8,
            }
          }
        ]
      }
      return option
    }
  }
};
</script>
