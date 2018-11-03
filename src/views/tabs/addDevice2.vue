<template>
    <div class='single-container'>
        <!-- <top-component></top-component>  -->
        <barcode-component2></barcode-component2>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BarcodeComponent2 from '@/components/barcode4';


export default {
  components: {
    BarcodeComponent2
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