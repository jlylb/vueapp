<template>
    <div class='video-card'>

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
            default: ''
        }
    },
    methods: {
        createVideo() {
            this.video = plus.video.createVideoPlayer('video',{
                src: this.url,
                top:'0px',
                left:'0px',
                width: '100%',
                height: '200px',
                position: 'static'
            });
            console.log(this.video, this.video.setStyles)
            // this.video.setStyles({
            //     src: this.url,
            //     top:'0px',
            //     left:'0px',
            //     width: '100%',
            //     height: '200px',
            //     position: 'static'
            // })
            plus.webview.currentWebview().append(this.video);
        }
    },
    mounted() {
        if(!window.plus) return;
        this.createVideo();
    },
    destroyed() {
        if(this.video) {
            this.video.close();
        }
    }
}
</script>

<style lang='scss' scoped>
.video-card {
    width: 100%;
    height: 300px;
    position: relative;
}
</style>
