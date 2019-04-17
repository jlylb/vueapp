<template>
  <div class="scan">
    <div id="bcid">
      <div style="height:40%"></div>
      <p class="tip">...载入中...</p>
    </div>
  </div>
</template>

<script>
import BackPng from "@/assets/res/back24.png";
import LightPng from "@/assets/res/light_open.png";

export default {
  data() {
    return {
      ws: null,
      domready: null,
      wo: null,
      scan: null,
      bCancel: true,
      code: "",
      lightView: null,
      titleView: null,
      backView: null,
      backViewImg: BackPng,
      lightViewImg: LightPng,
      isOpenFlash: false
    };
  },
  methods: {
    scanSwitch() {
      if (!window.plus) return;
      if (this.bCancel) {
        this.scan.cancel();
      } else {
        this.scan.start();
      }
      this.bCancel = !this.bCancel;
      console.log(this.bCancel);
    },
    plusReady() {
      if (this.ws || !window.plus) {
        return;
      }
      const vm = this;
      try {
        this.ws = plus.webview.currentWebview();
        this.createImg();
        this.createView();
        this.createBack();
        vm.scan = new plus.barcode.Barcode(
          "bcid",
          [plus.barcode.QR, plus.barcode.EAN8, plus.barcode.EAN13],
          {
            frameColor: "#06509c",
            scanbarColor: "#06509c",
            top: "0",
            position: "absolute"
          }
        );
        vm.scan.onmarked = vm.onmarked;
        vm.scan.start();
      } catch (e) {
        console.log(this.ws, "catch ws");
      }
    },
    onmarked(type, result, file) {
      switch (type) {
        case plus.barcode.QR:
          type = "QR";
          break;
        case plus.barcode.EAN13:
          type = "EAN13";
          break;
        case plus.barcode.EAN8:
          type = "EAN8";
          break;
        default:
          type = "其它" + type;
          break;
      }
      result = result.replace(/\n/g, "");

      this.code = result;
      history.back();
      this.$router.replace({
        name: "tab_discover",
        params: { code: this.code, success: 1 }
      });
    },
    back() {
      if (window.plus) {
        console.log(this, "back");
        history.back();
        this.$router.replace({ name: "mydevice" });
      }
    },
    createView() {
      if (!window.plus) return;
      this.titleView = new plus.nativeObj.View("titleview", {
        top: "0",
        height: "40px",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.7)"
      });

      this.titleView.draw([
        {
          tag: "font",
          id: "font",
          text: "扫一扫",
          textStyles: { size: "18px", color: "#ffffff" }
        }
      ]);
      this.titleView.show();
    },
    createBack() {
      if (!window.plus) return;
      this.backView = new plus.nativeObj.View("backview", {
        top: "0",
        height: "40px",
        width: "32px"
      });
      this.backView.addEventListener("click", () => {
        this.closeScan();
      });
      this.backView.draw([
        {
          tag: "img",
          id: "backimg",
          src: this.backViewImg,
          position: { top: "auto", left: "auto", width: "24px", height: "24px" }
        }
      ]);
      this.backView.show();
    },
    createImg() {
      if (!window.plus) return;
      this.lightView = new plus.nativeObj.View("lightview", {
        top: "60%",
        left: "45%",
        height: "32px",
        width: "32px"
      });
      this.lightView.addEventListener("click", () => {
        this.openFlash();
      });
      this.lightView.draw([
        {
          tag: "img",
          id: "img",
          src: this.lightViewImg,
          position: { top: "0", left: "0", width: "32px", height: "32px" }
        }
      ]);
      this.lightView.show();
    },
    openFlash() {
      if (!window.plus) return;
      this.isOpenFlash = !this.isOpenFlash;
      this.scan.setFlash(this.isOpenFlash);
    },
    closeScan() {
      if (this.lightView) {
        this.lightView.close();
      }
      if (this.titleView) {
        this.titleView.close();
      }
      if (this.backView) {
        this.backView.close();
      }
      if (this.scan) {
        this.scan.close();
      }
      history.back();
    }
  },
  computed: {
    btnText() {
      return this.bCancel ? "暂停" : "开始";
    }
  },
  mounted() {
    if (window.plus) {
      this.plusReady();
    } else {
      document.addEventListener("plusready", this.plusReady, false);
    }
  },
  beforeDestroy() {},
  destroyed() {
    this.ws = null;
    this.domready = null;
    this.wo = null;
    this.closeScan();
    this.scan = null;
    this.bCancel = false;
  },
  created() {},
  beforeCreate() {}
};
</script>
<style lang="scss" scoped>
$height: 40px;
.scan {
  height: 100%;
  position: relative;
  overflow: hidden;
}

#bcid {
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 1);
}
.tip {
  color: #ffffff;
  font-weight: bold;
}
</style>