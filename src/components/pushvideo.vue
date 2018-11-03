<template>
    <div>
        <div class='video-card' id='livepusher'>

        </div>
        <!-- <mt-button type='primary' @click.native='start'>播放</mt-button> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            video: null,
        }
    },
    props: {
        src: {
            type: String,
            default: 'rtmp://58.200.131.2:1935/livetv/hunantv'
        }
    },
    methods: {
        createVideo() {
            console.log(this.src, 'begin src ........')
            if(!this.src) return
            this.video = new plus.video.LivePusher('livepusher', {
                url: this.src,
                top:'0px',
                left:'0px',
                width: '100%',
                height: '100%',
                position: 'static'
            });
            //plus.webview.currentWebview().append(this.video);
            // this.video.setStyles({
            //     src: this.url,
            //     top:'0px',
            //     left:'0px',
            //     width: '100%',
            //     height: '200px',
            //     position: 'static'
            // })
            
            this.video.start()
            console.log(this.src, 'end src ........', this.video,window.plus)
            // plus.webview.currentWebview().append(this.video);
        },
        start(){
            this.video.start()
        },
        updateVideoUrl(url) {
            if(!window.plus) return;
            this.video.setStyles({
                url: url
            })
        }
    },
    mounted() {
        if(!window.plus) return;
         console.log(this.src, 'mounted src ..........', this.video, window.plus)
        this.createVideo();
        console.log(this.video)
    },
    beforeDestroy() {
        if(this.video) {
            plus.webview.close(this.video);
            this.video.close();
        }  
    },
    destroyed() {
        if(this.video) {
            plus.webview.close(this.video);
            this.video.close();
            
        }
    }
}
</script>

<style lang='scss' scoped>
.video-card {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
