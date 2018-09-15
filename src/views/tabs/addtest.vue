<template>
    <div class='single-container'>
        <top-component></top-component>
        <barcode-component-test></barcode-component-test>

    </div>
</template>

<script>
import BarcodeComponentTest from '@/components/barcode3';

export default {
  components: {
    BarcodeComponentTest
  },
  data() {
    return {
      pdi_index: '',
      pdi_area: '',
      popupVisible: false,
      item: {}
    }
  },
  computed: {

  },
  methods: {
    popup() {
      this.popupVisible = true
    },

  },
  mounted() {

  },
  created() {

  }
}
</script>

<style lang='scss' scoped>
.single-container {
  background-color: rgba(0, 0, 0, 0.7);
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  & .mint-header {
    background-color: transparent;
    // position: static;
  }
}
</style>