<template>
    <div class='single-container'>
      <!-- <mt-button @click.native="createBarcode" type='danger'>创建扫码控件</mt-button> -->
    </div>
</template>

<script>

let barcode = null;
let view = null
// 扫码成功回调
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

function  createView(){
  if(!window.plus) return;
  view = new plus.nativeObj.View('test',
  { bottom: 0 ,height:'20%',width: '100%', backgroundColor: 'rgba(0,0,0,0.5)' });
  view.draw([
    {tag:'font',id:'font',text:'原生控件',textStyles:{size:'18px'}},
    ]);
  view.show();
}

// 创建Barcode扫码控件
function createBarcode() {
	if(!barcode && window.plus){
    // plus.navigator.setFullscreen(true);
    let ws = plus.webview.currentWebview()
    ws.setStyle({  top: 0, width: '100%', height: '100%', background:'transparent' });
		barcode = plus.barcode.create('barcode',  [plus.barcode.QR,plus.barcode.EAN8,plus.barcode.EAN13], {
      top: '20%',
      bottom: '0',
      left:'0',
      right: '0',
			width: '100%',
			height: '80%',
      position: 'static',
      frameColor:'#26a2ff',
      scanbarColor:'#26a2ff',
		});
    barcode.onmarked = onmarked;
    barcode.BarcodeErrorCallback = (err) => {
      var code = error.code;
      var message = error.message;
      console.log(code, message, 'barcode...........')
    };
    
    let isImmersedStatusbar = plus.navigator.isImmersedStatusbar();
    //获取系统状态栏高度
    let StatusbarHeight = plus.navigator.getStatusbarHeight();
    console.log(StatusbarHeight, isImmersedStatusbar, 'status bar.......');
    
    const style=ws.getStyle();
    ws.append(barcode);
    // createView()
    console.log(JSON.stringify(ws.WebviewStyles), 'log webview style............')
    console.log(JSON.stringify(style), 'log webview style............11')
	}
	barcode && barcode.start();
}
export default {
  components: {
    
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    createBarcode
  },
  beforeDestroy(){
    barcode && barcode.close();
    view && view.close()
    barcode = null
    view = null
  },
  mounted(){
    this.createBarcode()
  },
  created() {

  }
}
</script>

<style lang='scss' scoped>
.single-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>