<template>
   <ve-gauge :data="dchartData" :settings='chartSettings'></ve-gauge>
</template>

<script>
export default {
  data() {
    return {
      chartSettings: {
        seriesMap: {
          '输入电压': {
            min: 0,
            max: 240,
            radius: '70%',
            axisLine: {
              lineStyle: {
                color: [[1, '#1e90ff']],
                width: 3,
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            axisLabel: {
              textStyle: {
                fontWeight: 'bolder',
                color: '#26a2ff',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            axisTick: {
              length:15,
              lineStyle: {
                color: 'auto',
                shadowColor: '#26a2ff',
                shadowBlur: 10
              }
            },
          }
        }
      },
      dchartData: {
          columns: ['type', 'value'],
          rows: [
            { type: '输入电压', value: 60, },
          ]
      }
    }
  }
}
</script>

<style>
</style>
