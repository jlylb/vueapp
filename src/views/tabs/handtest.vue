<template>
    <div class='single-container'>
        <top-component></top-component>
        <barcode-component-test></barcode-component-test>
        <footer>
          <div class='tools-bar'>
            <div class='tools-item'>
              <p>
                <svg-icon :icon-class='flashIcon' class='item-icon' slot='icon' @click.native='openFlash'></svg-icon>
              </p>
            </div>
          </div>
        </footer>
    </div>
</template>

<script>
import BarcodeComponentTest from '@/components/barcode4';

export default {
  components: {
    BarcodeComponentTest
  },
  data() {
    return {
      pdi_index: '',
      pdi_area: '',
      popupVisible: false,
      item: {},
      isOpenFlash: false,
      flashIcon: 'light-off4'
    }
  },
  computed: {

  },
  methods: {
    popup() {
      this.popupVisible = true
    },
    openFlash() {
      if (!window.plus) return;
      this.isOpenFlash = !this.isOpenFlash
      this.flashIcon = this.isOpenFlash?'light-open4':'light-off4';
      const scan = plus.barcode.getBarcodeById('bcid');
      scan.setFlash(this.isOpenFlash);
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
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  & .mint-header {
    background-color: transparent;
  }
  background-color: rgba(0, 0, 0, 0.7);
}
footer {
  position: absolute;
  left: 0;
  bottom: 0;
  // height: 2rem;
  // line-height: 2rem;
  z-index: 3002;
  width: 100%;
  // height: 60px;
  color: #fff;
}
.tools-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tools-item {
  width: 50%;
  // display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  & .item-icon {
    height: 2em;
    width: 2em;
  }
}
</style>