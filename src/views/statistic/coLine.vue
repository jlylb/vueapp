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
    };
  },
  methods: {
    getData() {
      const option = {
        backgroundColor: '#dfefbd',
        title: {
          left: 'center',
          text: "CO2浓度趋势图",
        },
        tooltip: {
          trigger: "axis"
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
          type: "category",
          boundaryGap: false,
          data: ["2018-8-24 11", "2018-8-24 12", "2018-8-24 13", "2018-8-24 14", "2018-8-24 15", "2018-8-24 16"]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C"
          }
        },
        grid: { 
            left: 50,
         },
        series: [
          {
            name: "浓度",
            type: "line",
            data: [11, 11, 15, 13, 12, 13],
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
