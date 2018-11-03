<template>
  <!-- <div class="scan"> -->
    <div id="bcid">
      <div style="height:40%"></div>
      <p class="tip">...载入中...</p>
    </div>


  <!-- </div> -->
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
        scan = plus.barcode.create('abcid', [plus.barcode.QR], {
          position: 'absolute',
          top: '0',
          left: '0',
          height: '100%',
          frameColor:'#00FF00',
          scanbarColor:'#00FF00'
        });
        let view = plus.nativeObj.View.getViewById('abcid');
        console.log('begin bcid',view, 'barcode bcid......')
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
        plus.webview.currentWebview().append(scan);
      },
      //开始扫描
      startScan() {
        if (!window.plus) return;
        scan.start();
      },
      createView(){
          if(!window.plus) return;
          let view = new plus.nativeObj.View('test',
          {top:'auto',left:'40px',height:'44px',width:'100%'});
          view.draw([
            {tag:'font',id:'font',text:'原生控件',textStyles:{size:'18px'}},
            ]);
          view.show();
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
        scan.setStyles(position);
      },

    },
    mounted() {
      this.$nextTick(()=>{
        this.startRecognize()
        const bar = document.getElementById('bcid')

        this.startScan()
      })

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
// .scan {
//   height: 100%;
//   position: relative;
#bcid {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  left: 0;
  // right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
}
//}
</style>