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
          text: '光照强度趋势图',
          subtext: '设备编号: ' + this.title
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          left: 'center',
          bottom:'0',
          data: ["光照"]
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
            left: '10%',
            top: '20%',
         },
        series: [
          {
            name: "光照",
            type: "line",
            data: this.wendu,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      }
      return option
    }
  }
};
</script>
