<template>
  <div class='layout-container'>
    <top-component></top-component>

    <mt-cell 
    :title="item.name"
    @click.native.prevent='openRoute(item)' 
    is-link 
    v-for='(item, index) in device' 
    :key='index'>
      <mt-badge type="error">{{ item.num }}</mt-badge>
      <svg-icon :icon-class='item.icon' class='item-icon' slot='icon'></svg-icon>
    </mt-cell>

  </div>
</template>

<script>
export default {
  data() {
    return {
      device: [
        {name: '空气温室度传感器', icon: 'temp', type: 'temp', num: 10 },
        {name: '光照度传感器', icon: 'light', type: 'light' , num: 100 },
        {name: '二氧化碳传感器', icon: 'co2', type: 'co2' , num: 105 },
        {name: '土壤墒情传感器', icon: 'soil', type: 'soil', num: 20},
        {name: '液位传感器', icon: 'liquid', type: 'liquid', num: 30 },

      ],
    }
  },
  methods: {
    openRoute(item) {
      this.$router.push({name: "alarm_device", params: {...item} })
    }
  }
}
</script>

<style>
</style>
