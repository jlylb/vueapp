<template>
    <div class='layout-container'>
        <top-component></top-component> 
        <barcode-component></barcode-component>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BarcodeComponent from '@/components/barcode';


export default {
  components: {
    BarcodeComponent
  },
  computed: {
    ...mapState('user', [
        'name',
        'avatar'
    ])
  },
  methods: {

  },
  created() {

  }
}
</script>

<style lang='scss' scoped>
.layout-container {
  position: relative;
}
.home-content {
  margin-bottom: 0;
}
</style>