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
            <svg-icon :icon-class='flashIcon' class='item-icon' slot='icon' @click.native='openFlash'></svg-icon>
          </p>
        </div>
      </div>
      </footer>
      
  </div>
</template>

<script type='text/ecmascript-6'>
  import LightPng from '@/assets/light_open.png'
  export default {
    data() {
      return {
        ws: null,
        domready: null,
        wo: null,
        scan: null,
        bCancel: true,
        code: '',
        lightView: null,
        isOpenFlash: false,
        flashIcon: 'light-off4'
      }
    },
    methods: {
      scanSwitch() {
        if(!window.plus) return;
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
            // this.createImg();
            vm.scan=new plus.barcode.Barcode(
              'bcid',
            [plus.barcode.QR,plus.barcode.EAN8,plus.barcode.EAN13],
            {
              frameColor:'#00FF00',
              scanbarColor:'#00FF00',
              top: '0',
              position: 'absolute'
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
        this.$router.replace({name: 'tab_discover', params: {code: this.code, success: 1}})
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
          if(!window.plus) return;
          let view = new plus.nativeObj.View('test',
          {top:'auto',left:'40px',height:'44px',width:'100%'});
          view.draw([
            {tag:'font',id:'font',text:'原生控件',textStyles:{size:'18px'}},
            ]);
          view.show();
      },
      createImg(){
          if(!window.plus) return;
          this.lightView = new plus.nativeObj.View('test1',
          {bottom:'0',left:'50%',height:'40px',width:'60px', dock:'bottom', backgroundColor: 'rgba(0,0,0,0.7)'});
          this.lightView.addEventListener('click',()=>{
              this.openFlash();
          });
          this.lightView.draw([
            {tag:'img',id:'img',src: LightPng, position:{top:'0',left:'0',width:'100px',height:'auto'}},
            ]);
          this.lightView.show();
      },
      openFlash() {
        if (!window.plus) return;
        this.isOpenFlash = !this.isOpenFlash
        this.flashIcon = this.isOpenFlash?'light-open4':'light-off4';
        this.scan.setFlash(this.isOpenFlash);
      },
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
      if(this.lightView) {
        this.lightView.close()
      }
      if(this.scan) {
        this.scan.close()
      }
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
  // transform: translateY(40px);
  background-color: rgba(0, 0, 0, 0.7);
}
.tip {
  color: #ffffff;
  font-weight: bold;
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
  padding: 5px 0;
  & .item-icon {
    height: 2em;
    width: 2em;
  }
}
</style>