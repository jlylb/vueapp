<template>
  <div class='layout-container'>
    <top-component></top-component>
    <mt-cell 
    :title='item.label' 
    v-for='item in types' 
    :key='item.value' 
    is-link 
    @click.native='openDetail(item)'
    class='cell-icon'>
        <span style="color: green"> {{ item.num }}个设备</span>
        <svg-icon :icon-class='item.icon' class='item-icon' slot='icon'></svg-icon>
    </mt-cell>
  </div>  
</template>

<script>
import { fetchList } from '@/api/menu'
export default {
  data() {
    return {
      types: []
    }
  },
  methods: {
    openDetail(data) {
      const { router: name, value: type, num } = data
      if(num===0) {
        return;
      }
      this.$router.push({name: 'sysmenu_device', params: {type} })
    }
  },
  created() {
    const { type } = this.$route.params
    
    fetchList({ type })
    .then((res) => {
      console.log(res.data.devices)
      this.types = res.data.devices
      this.$store.commit('app/BAR_TITLE', res.data.name)
    })
  }
}
</script>

<style lang='scss' scoped>
.item-icon {
  color: darken($blue, 20%);
}
.cell-icon {
  color: $blue;
}
</style>
