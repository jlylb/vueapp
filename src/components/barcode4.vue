<template>
<div class='bcids'>
		<header>
			<a class="icon_back"></a>
			<span>扫码用车</span>
		</header>
		<div class="mask" id="mask"></div>
		<div class="mask2" id="mask2">
			<div id="scan1" class="scan">
				<img :src="scanClick" />
				<span id="">
						手动输入车牌号
				</span>
			</div>
			<div id="scan2" class="scan" @click='openFlash'>
				<img :src="flashIcon" />
				<span id="">
						手电筒
				</span>
			</div>
		</div>
</div>    
</template>

<script type='text/ecmascript-6'>
  import scanOff from '@/assets/scan_off.png'
  import scanOn from '@/assets/scan_on.png'
  import scanClick from '@/assets/click.png'

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
        flashIcon: scanOff,
        scanOff,
        scanOn,
        scanClick
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
              'mask',
            [plus.barcode.QR,plus.barcode.EAN8,plus.barcode.EAN13],
            {
              frameColor:'#00FF00',
              scanbarColor:'#00FF00',
              top: '0',
              left: '0',
              height: '100%',
              width: '100%',
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
        console.log(result, 'onmarked qrcode.......')
        history.back();
        this.$router.replace({name: 'tab_discover', params: {code: this.code, success: 1}})
      },
      back(){
        if(window.plus){
          console.log(this, 'back')
          history.back();
          this.$router.replace({name: 'mydevice'})
        }
      },

      openFlash() {
        if (!window.plus) return;
        this.isOpenFlash = !this.isOpenFlash
        this.flashIcon = this.isOpenFlash?scanOn:scanOff;
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
.bcids {
  height: 100%;
  width: 100%;
  background: #000000;
}
.mask {
  height: 80%;
  width: 100%;
  position: absolute;
  top: 44px;
  background: #000000;
}

.mask2 {
  height: 55px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #000000;
}
.scan {
  width: 50%;
  height: 55px;
  background: #000;
  float: left;
  text-align: center;
}

.scan img {
  width: 30px;
  height: 30px;
}

.scan span {
  display: block;
  color: #fff;
  font-size: 14px;
}

header {
  height: 44px;
  width: 100%;
  background: #262930;
  text-align: center;
  color: #fff;
  font-size: 18px;
  line-height: 44px;
  position: absolute;
  z-index: 10;
  top: 0;
}

// @font-face {
//   font-family: 'icomoon';
//   src: url('iconfont_.ttf');
// }

.icon_back {
  // font-family: 'icomoon'!important;
  text-decoration: none;
  color: #fff;
  float: left;
  font-size: 28px;
  margin-left: 14px;
}

.icon_back:before {
  content: '\E601';
}
</style>