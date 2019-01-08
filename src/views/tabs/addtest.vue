<template>
  <div class="single-container">
    <top-component></top-component>
    <barcode-component-test @scan-success="scanSuccess"></barcode-component-test>
  </div>
</template>

<script>
import BarcodeComponentTest from "@/components/barcode3";

export default {
  components: {
    BarcodeComponentTest
  },
  data() {
    return {
      pdi_index: "",
      pdi_area: "",
      popupVisible: false,
      item: {}
    };
  },
  computed: {},
  methods: {
    popup() {
      this.popupVisible = true;
    },
    scanSuccess(code) {
      const [scanData, scanType] = code.split("&");
      console.log(code, scanData, scanType, "scan success.....");
      let name;
      if (scanType == "scancode") {
        name = "tab_verify";
      } else {
        name = "tab_discover";
      }
      console.log(name, "scan success after.....");
      this.$router.replace({ name, params: { code: scanData, success: 1 } });
    }
  },
  mounted() {},
  created() {}
};
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
}
</style>