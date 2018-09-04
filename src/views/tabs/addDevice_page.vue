<template>
    <div class='single-container'>
        <top-component></top-component>
        <mt-field  placeholder="设备编号" v-model="pdi_index"></mt-field>
        <mt-field  placeholder="选择区域" v-model="pdi_area"></mt-field>
    </div>
</template>

<script>


export default {
  components: {
    
  },
  data() {
    return {
      pdi_index: '',
      pdi_area: ''
    }
  },
  computed: {

  },
  methods: {

  },
  created() {

  }
}
</script>

<style lang='scss' scoped>
.single-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>