<template>
  <div class='layout-container'>
    <top-component></top-component>
    <mt-cell 
    :title='item.label'
    :label='"设备编号: " + item.value' 
    v-for='item in devices' 
    :key='item.value' 
    is-link 
    @click.native='openDetail(item)'
    class='cell-icon'>
        <svg-icon :icon-class='item.icon' class='item-icon' slot='icon'></svg-icon>
    </mt-cell>
  </div>
</template>

<script>
import { fetchDevice } from '@/api/menu'
export default {
  data(){
    return {
      devices: []
    }
  },
  methods: {
    openDetail(data) {
      const { router: name, value: pdi } = data
      this.$router.push({name, params: { pdi } })
    }
  },
  created() {
    const { type } = this.$route.params
    fetchDevice({type})
    .then((res) => {
      console.log(res.data.devices)
      this.devices = res.data.devices
    })
  }
}
</script>

<style>
</style>
