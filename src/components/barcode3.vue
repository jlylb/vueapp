<template>
  <div class="scan">
		<div id="bcid">
			<div style="height:40%"></div>
			<p class="tip">...载入中...</p>
		</div>
		<footer>
			<div class="fbt" @click="createImg">取　消</div>
			<div id="btCancel" class="fbt" @click="scanSwitch">{{ btnText }}</div>
		</footer>
  </div>
</template>

<script type='text/ecmascript-6'>

  export default {
    data() {
      return {
        ws: null,
        domready: null,
        wo: null,
        scan: null,
        bCancel: true,
        code: ''
      }
    },
    methods: {
      scanSwitch() {
        if(this.bCancel){
          this.scan.cancel();
        }else{
          this.scan.start();
        }
        this.bCancel=!this.bCancel;
        console.log(this.bCancel)
      },
      plusReady(){
        if(this.ws||!window.plus){
          return;
        }
        const vm = this
        try{
            this.ws=plus.webview.currentWebview();
            vm.scan=new plus.barcode.Barcode(
              'bcid',
            [plus.barcode.QR,plus.barcode.EAN8,plus.barcode.EAN13],
            {
              frameColor:'#00FF00',
              scanbarColor:'#00FF00',
              top: '40px',
            });
            vm.scan.onmarked=vm.onmarked;
            vm.scan.start();
            vm.ws.show('pop-in');
        }catch(e) {
          console.log(this.ws,'catch ws')
        }

      },
      onmarked(type, result, file){
        switch(type){
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
          type = '其它'+type;
          break;
        }
        result = result.replace(/\n/g, '');

        this.code = result
        history.back();
        this.$router.replace({name: 'mydevice', params: {code: this.code, success: 1}})
        //this.back();
        // this.$parent.popup()
        // this.$router.go(-1);
      },
      back(){
        if(window.plus){
          console.log(this, 'back')
          // this.scan.close()
          // this.ws.close()
          // this.$router.go(-1);
          history.back();
          this.$router.replace({name: 'mydevice'})
        }
      },
      createView(){
          let view = new plus.nativeObj.View('test',
          {top:'auto',left:'40px',height:'44px',width:'100%'});
          view.draw([
            {tag:'font',id:'font',text:'原生控件',textStyles:{size:'18px'}},
            ]);
          view.show();
      },
      createImg(){
          let view = new plus.nativeObj.View('test1',
          {top:'100px',left:'auto',height:'200px',width:'100%'});
          view.draw([
            {tag:'img',id:'img',src:'_www/static/img/icon.png',position:{top:'0',left:'0px',width:'100%',height:'200px'}},
            ]);
          view.show();
        }
    },
    computed: {
      btnText() {
        return this.bCancel?'暂停':'开始'
      }
    },
    mounted() {
      // console.log(window.plus)
      if(window.plus){
        this.plusReady();
      }else{
        document.addEventListener('plusready', this.plusReady, false);
      }
    },
    beforeDestroy() {
      
    },
    destroyed() {
      this.ws = null;
      this.domready = null;
      this.wo = null;
      this.scan.close()
      this.scan = null;
      this.bCancel = false;
    },
    created() {

    },
    beforeCreate() {

    }
  }
</script>
<style lang="scss" scoped>
.scan {
  height: 100%;
  position: relative;
  overflow: hidden;
}
#bcid {
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 44px;
  text-align: center;
}
.tip {
  color: #ffffff;
  font-weight: bold;
  text-shadow: 0px -1px #103e5c;
}
footer {
  width: 100%;
  height: 44px;
  position: absolute;
  bottom: 0px;
  line-height: 44px;
  text-align: center;
  color: #fff;
}
.fbt {
  width: 50%;
  height: 100%;
  background-color: #ffcc33;
  float: left;
}
.fbt:active {
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
}
</style>