<template>
  <div class='layout-container'>

    <top-component></top-component> 

    <mt-cell title='更新时间' > {{ detail.rd_updatetime }}</mt-cell>
    <mt-cell :title='item.label' v-for='(item, index) in subFields' :key='index'>
      <mt-switch v-model="item.value" disabled></mt-switch>
    </mt-cell>
    <mt-cell title='网络通讯' > 
      <mt-badge :type="detail.rd_NetCom==0?'success':'error'">{{ detail.rd_NetCom==0?"正常":"断线" }}</mt-badge>
    </mt-cell>
  </div>
</template>

<script>
import { fetchDevice } from '@/api/monitor'
export default {
  data() {
    return {
      detail: {},
      subFields: []
    }
  },
  methods: {
    openDetail() {

    },

  },
  created() {
    const { pdi } = this.$route.params
    fetchDevice({ pdi }).then((res) => {
      const device = res.data.devices
      this.detail = device || {}
      this.subFields = res.data.subFields
    })
    
  }

}
</script>

<style lang='scss' scoped>
</style>
