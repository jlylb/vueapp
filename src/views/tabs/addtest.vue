<template>
  <barcode-component-test></barcode-component-test>
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
        img && img.close();
        const ws = plus.webview.currentWebview();
        ws.close("auto");
      });
    }
  },
  mounted() {
    document.addEventListener("plusready", this.backButton, false);
  },
  created() {}
};
</script>

<style lang='scss'>
body,
html {
  height: 100%;
  width: 100%;
}
body {
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