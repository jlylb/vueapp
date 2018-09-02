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
          show: false,
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
          name: '单位: °C',
          type: "value",
          axisLabel: {
            formatter: "{value}"
          }
        },
        grid: { 
            left: '12%',
            top: '10%',
         },
        series: [
          {
            name: "温度",
            type: "line",
            data: this.wendu,

          },
          {
            name: "湿度",
            type: "line",
            data: this.shidu,

          }
        ]
      }
      return option
    }
  }
};
</script>
