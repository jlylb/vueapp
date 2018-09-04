<template>
  <div class="scan">
    <div id="bcid">
      <div style="height:40%"></div>
      <p class="tip">...载入中...</p>
    </div>

    <footer>
      <mt-button type='primary' @click='createBarcode'>扫码</mt-button>
      <mt-button type='primary' @click='createView'>添加文字</mt-button>
      <mt-button type='primary' @click='createImg'>添加图片</mt-button>
    </footer>
    
  </div>
</template>

<script type='text/ecmascript-6'>
let barcode = null
  export default {
    data() {
      return {

      }
    },
    methods: {
      addText() {

      },
      addImg() {

      },
      createBarcode() {
      if(!window.plus) return;
      console.log(plus.barcode, plus.barcode.create)
      if(!barcode){
        barcode = plus.barcode.create('barcode', [plus.barcode.QR], {
          top:'100px',
          left:'0px',
          width: '100%',
          height: '200px',
          position: 'static',
          frameColor:'#00ff00',
          scanbarColor:'#00ff00'
        });
        console.log(barcode,77777777)
        function onmarked(type, result) {
        let text = '未知: ';
        switch(type){
          case plus.barcode.QR:
          text = 'QR: ';
          break;
          case plus.barcode.EAN13:
          text = 'EAN13: ';
          break;
          case plus.barcode.EAN8:
          text = 'EAN8: ';
          break;
        }
        alert( text+result );
      }
        barcode.onmarked = onmarked;
        console.log(barcode,2222222)
        plus.webview.currentWebview().append(barcode);
      }
      console.log(barcode,333333333333)
      barcode.start();
    },
      createView(){
        let view = new plus.nativeObj.View('test',
        {top:'0px',left:'0px',height:'44px',width:'100%'});
        view.draw([
          {tag:'font',id:'font',text:'原生控件',textStyles:{size:'18px'}},
          ]);
        view.show();
      },
      createImg(){
        let view = new plus.nativeObj.View('test1',
        {top:'0px',left:'0px',height:'44px',width:'100%'});
        view.draw([
          {tag:'img',id:'img',src:'_www/static/img/icon.png',position:{top:'100px',left:'0px',width:'100%',height:'200px'}},
          ]);
        view.show();
      }
    },
    mounted() {

    },
    beforeDestroy() {
 
    },
    destroyed() {
      // this.barcode = null
    },
    created() {

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
    // top: 0;
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