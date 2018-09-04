<template>
    <div class='single-container'>
        <top-component></top-component>
        <barcode-component3></barcode-component3>

    </div>
</template>

<script>
import BarcodeComponent3 from '@/components/barcode3';

export default {
  components: {
    BarcodeComponent3
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
 footer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2rem;
    line-height: 2rem;
    z-index: 3002;
    width: 100%;
    height: 60px;
    color: #fff;
  }
</style>