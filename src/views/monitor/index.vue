<template>
 <div class='layout-container'>

  <top-component></top-component>

  <mt-cell :title="`${index + 1}号大棚`" is-link :to='{name: "monitor_device"}' v-for='(item, index) in dapeng' :key='index'>
    <span style="color: green"> {{ index + 5 }}个设备</span>
    <svg-icon icon-class='dapeng' class='item-icon' slot='icon'></svg-icon>
  </mt-cell>

 </div> 

</template>

<script>
import { fetchList } from '@/api/monitor'

export default {
  data() {
    return {
      items: [],
      open: false,
      dapeng: [
        '201501', '201502', '201503', '201504', '201505', '201506'
      ],
    }
  },
  methods: {
    openPeng(tile) {
      this.open = true
    },
    closeBottomSheet(val, val1) {
      console.log(val, val1)
    }
  },
  created() {
    fetchList().then((res) => {
      this.items = res.data.items
    })
  }

}
</script>

<style lang='scss' scoped>
.sheet .mu-item-action {
  justify-content: center;
  color: inherit;
}
</style>
