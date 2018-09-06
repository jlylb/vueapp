<template>
  <div class="scan">
    <div id="bcid">
      <div style="height:40%"></div>
      <p class="tip">...载入中...</p>
    </div>

    <footer>
    <div class='tools-bar'>
      <div class='tools-item'>
        <p>
          <svg-icon icon-class='light-open' class='item-icon' slot='icon'></svg-icon>
        </p>
        <p>闪光灯</p>
      </div>
    </div>
    </footer>

  </div>
</template>

<script type='text/ecmascript-6'>
  let scan = null;
  export default {
    data() {
      return {
        codeUrl: '',
        isOpenFlash: false,
      }
    },
    methods: {
      //创建扫描控件
      startRecognize() {
        let that = this;
        if (!window.plus) return;
        scan = new plus.barcode.Barcode('bcid', [plus.barcode.QR], {
          position: 'absolute',
          height: '200px',
          width: '200px',
          top: '0',
          frameColor:'#00FF00',
          scanbarColor:'#00FF00'
        });
        scan.onmarked = onmarked;
        function onmarked(type, result, file) {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR';
              break;
            case plus.barcode.EAN13:
              type = 'EAN13';
              break;
            case plus.barcode.EAN8:
              type = 'EAN8';
              break;
            default:
              type = '其它' + type;
              break;
          }
          result = result.replace(/\n/g, '');
          that.codeUrl = result;
          ///alert(result);
          that.closeScan();
          that.$parent.$router.push({name: 'addDevice_page'});
        }
      },
      //开始扫描
      startScan() {
        if (!window.plus) return;
        scan.start();
      },
      //关闭扫描
      cancelScan() {
        if (!window.plus) return;
        scan.cancel();
      },
      //关闭条码识别控件
      closeScan() {
        if (!window.plus) return;
        scan.close();
      },
      openFlash() {
        if (!window.plus) return;
        this.isOpenFlash = !this.isOpenFlash
        scan.setFlash(this.isOpenFlash);
      },
      setStyle(position) {
        if (!window.plus) return;
        scan.setStyles({position});
      },

    },
    mounted() {
      this.startRecognize()
      this.startScan()
    },
    beforeDestroy() {
      this.cancelScan()
      this.closeScan()
    },
    destroyed() {

    }
  }
</script>
<style lang="scss">
.scan {
  height: 100%;
  position: relative;
  #bcid {
    width: 100%;
    // height: 100%;
    position: absolute;
    left: 0;
    // right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.7);
    padding: 0;
    margin: 0;
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
  }
}
</style>