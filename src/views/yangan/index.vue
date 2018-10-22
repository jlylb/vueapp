<template>
  <div class='layout-container'>

    <top-component></top-component> 

    <mt-cell ></mt-cell>

  </div>
</template>

<script>
import { fetchDevice } from '@/api/monitor'
export default {
  data() {
    return {
      detail: null,
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
      this.detail = device
      this.subFields = res.data.subFields
    })
  }

}
</script>

<style lang='scss' scoped>
</style>
