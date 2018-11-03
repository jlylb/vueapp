<template>
      <div class='layout-container'>
        <top-component>
          <template slot='right'>
            <mt-button  @click.native='upload' v-if='showfile'>确定</mt-button>
        </template>
        </top-component> 

        <div class='preview' v-if='showfile'>

        <vue-cropper
              ref='cropper'
              :guides="true"
              :view-mode="3"
              drag-mode="crop"
              :movable="true"
              :aspect-ratio='1'
              :auto-crop-area="0.5"
              :min-container-width="100"
              :min-container-height="100"
              :min-crop-box-width='200'
              :min-crop-box-height='200'
              :background="true"
              :rotatable="true"
              :crop-box-resizable='false'
              :src="showfile"
              alt="Source Image"
              :img-style="{ 'width': '100vw', 'height': '66vh', 'max-width': '100%', 'max-height': '100%' }">
          </vue-cropper>
        </div>
        <div class='btn'>
          <mt-button type='primary'  @click.native='openCamera' class='btn-w'>相机拍照</mt-button> 
          <mt-button type='danger'  @click.native='openPhoto' class='btn-w'>相册选取</mt-button>
        </div>

      </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui';
import { getToken } from '@/tools/auth';
import VueCropper from 'vue-cropperjs';
import { Indicator } from 'mint-ui';
import testjpg from '@/assets/guide3.jpg';
// import testjpg1 from '@/assets/guide2.jpg';

export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      file: null,
      showfile: null,
      cropImg: null
    }
  },
  methods: {
    openCamera() {
      if(!window.plus) return
      plus.camera.getCamera().captureImage((p) => {
        this.appendFile(p);
      }, (err)=> {
        console.log('打开失败....', JSON.stringify(err))
      }, {});	
    },
    openPhoto() {
      if(!window.plus) return
      plus.gallery.pick((p) => {
        this.appendFile(p);
      });
    },
    appendFile(p) {
      // this.file = p
      plus.io.resolveLocalFileSystemURL(p, (entry) => {    
        this.showfile = entry.toLocalURL();
        this.$refs.cropper.replace(this.showfile)
      });
    },
    convertBase64UrlToBlob(urlData){
     
      var bytes=window.atob(urlData.split(',')[1]);
      
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
      }
  
      return new Blob( [ab] , {type : 'image/png'});
},
upload(){
    if(!this.showfile){
        Toast("请选择文件");
        return;
    }
    Indicator.open('上传中...');
    let file = this.$refs.cropper.getCroppedCanvas({
      width: 200,
      height: 200
    }).toDataURL();

    let blob = this.convertBase64UrlToBlob(file);
    const formData = new FormData();
    formData.append('avatar', blob);
    formData.append('field', 'avatar');
    this.$axios({
      url: '/upload',
      method: 'post',
      data: formData
    }).then((res)=>{
      console.log(res)
       Indicator.close()
      if(res.data.status===1){
         this.$store.commit('user/SET_AVATAR', file)
         this.$router.go(-1)
         
      }else{
        Toast(res.data.msg);
      }
      //Indicator.close()
    }).catch((res)=>{

    })  
},
  uploadNative(){

  },
  deleteImg() {
    this.file = null
    this.showfile = null
  },
  cutimg() {

  }
}

}
</script>

<style lang='scss' scoped>
.btn {
  text-align: center;
}
.btn-w {
  width: 80%;
  margin-top: 10px;
}
.preview {
  // height: 100%;
}
</style>
