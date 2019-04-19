<template>
  <div id="bcid">
    <div style="height:40%"></div>
    <p class="tip">...载入中...</p>
  </div>
</template>

<script>
import LightPng from "@/assets/res/light_open.png";

export default {
  data() {
    return {
      ws: null,
      domready: null,
      wo: null,
      scan: null,
      code: "",
      lightView: null,
      isOpenFlash: false
    };
  },
  methods: {
    plusReady() {
      if (this.ws || !window.plus) {
        return;
      }
      const vm = this;
      try {
        this.ws = plus.webview.currentWebview();
        this.createImg();
        vm.scan = new plus.barcode.Barcode(
          "bcid",
          [plus.barcode.QR, plus.barcode.EAN8, plus.barcode.EAN13],
          {
            frameColor: "#00FF00",
            scanbarColor: "#00FF00"
          }
        );
        vm.scan.onmarked = vm.onmarked;
        vm.scan.start();
        vm.ws.show("pop-in");
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
      //this.lightView.close();

      result = result.replace(/\n/g, "");
      const wo = this.ws.opener();
      // wo.evalJS("scaned('" + result + "');");
      plus.storage.setItem("result", result);
      wo &&
        wo.evalJS(
          "var result = plus.storage.getItem('result');plus.storage.removeItem('result');"
        );
      this.lightView.draw([
        {
          tag: "img",
          id: "img",
          src: "",
          position: { top: "0", left: "0", width: "32px", height: "32px" }
        }
      ]);
      this.back();
    },

    back(hide) {
      const w = window;
      let ws = this.ws;
      if (w.plus) {
        ws || (ws = plus.webview.currentWebview());
        hide || ws.preate ? ws.hide("auto") : ws.close("auto");
      } else if (history.length > 1) {
        history.back();
      } else {
        w.close();
      }
    },

    createImg() {
      if (!window.plus) return;
      this.lightView = new plus.nativeObj.View("lightview", {
        top: "58%",
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
          src: LightPng,
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
      if (this.scan) {
        this.scan.close();
      }
    }
  },
  computed: {},
  mounted() {
    if (window.plus) {
      this.plusReady();
    } else {
      document.addEventListener("plusready", this.plusReady, false);
    }
  },
  beforeDestroy() {
    if (this.lightView) {
      this.lightView.close();
    }
  },
  destroyed() {
    this.ws = null;
    this.domready = null;
    this.wo = null;
    this.closeScan();
    this.scan = null;
  },
  created() {},
  beforeCreate() {}
};
</script>
<style lang="scss" scoped>
#bcid {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  text-align: center;
  // transform: translateY(40px);
  background-color: rgba(0, 0, 0, 1);
}
.tip {
  color: #ffffff;
  font-weight: bold;
}
</style>