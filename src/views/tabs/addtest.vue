<template>
  <div id="app">
    <div class="single-container">
      <barcode-component-test></barcode-component-test>
    </div>
  </div>
</template>

<script>
import BarcodeComponentTest from "@/components/barcode3";

export default {
  components: {
    BarcodeComponentTest
  },
  methods: {
    backButton() {
      plus.key.addEventListener("backbutton", () => {
        console.log("listening back button barcode.......");
        const img = plus.nativeObj.View.getViewById("lightview");
        img.close();
        const ws = plus.webview.currentWebview();
        ws.close("auto");
      });
    }
  },
  mounted() {
    if (window.plus) {
      this.backButton();
    } else {
      document.addEventListener("plusready", this.backButton, false);
    }
  },
  created() {}
};
</script>

<style lang='scss'>
.single-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
body,
html {
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>