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
    }
  },
  methods: {
    getData() {

      const option = {
        backgroundColor: '#dfefbd',
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
          show: true,
          feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "time",
          boundaryGap: false
         // data: times
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C"
          }
        },
        grid: { 
            left: '15%',
            top: '10%',
         },
        series: [
          {
            name: "温度",
            type: "line",
            data: this.wendu,
            // markPoint: {
            //   data: [
            //     { type: "max", name: "最大值" },
            //     { type: "min", name: "最小值" }
            //   ]
            // },
            // markLine: {
            //   data: [{ type: "average", name: "平均值" }]
            // }
          },
          {
            name: "湿度",
            type: "line",
            data: this.shidu,
            // markPoint: {
            //   data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
            // },
            // markLine: {
            //   data: [
            //     { type: "average", name: "平均值" },
            //     [
            //       {
            //         symbol: "none",
            //         x: "90%",
            //         yAxis: "max"
            //       },
            //       {
            //         symbol: "circle",
            //         label: {
            //           normal: {
            //             position: "start",
            //             formatter: "最大值"
            //           }
            //         },
            //         type: "max",
            //         name: "最高点"
            //       }
            //     ]
            //   ]
            // }
          }
        ]
      }
      return option
    }
  }
};
</script>
