<template>
   <ve-gauge :data="dchartData"></ve-gauge>
</template>

<script>
export default {
  data() {
    return {
      chartSettings: {},
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
