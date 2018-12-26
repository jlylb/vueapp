<template>
  <div class="video-card" id="videoPusher"></div>
</template>

<script>
export default {
  data() {
    return {
      video: null
    };
  },
  props: {
    src: {
      type: String,
      default: "rtmp://58.200.131.2:1935/livetv/hunantv"
    }
  },
  watch: {
    src(val) {
      if (this.video) {
        this.updateVideoUrl(val);
      }
    }
  },
  methods: {
    createVideo() {
      this.video = new plus.video.VideoPlayer("videoPusher", {
        src: this.src,
        top: "0",
        left: "0px",
        width: "100%",
        height: "100%",
        position: "static",
        autoplay: true
      });
      console.log(this.video);
      // this.video.setStyles({
      //     src: this.url,
      //     top:'0px',
      //     left:'0px',
      //     width: '100%',
      //     height: '200px',
      //     position: 'static'
      // })
      // this.video.play()
      // plus.webview.currentWebview().append(this.video);
    },
    updateVideoUrl(url) {
      if (!window.plus) return;
      this.video.setStyles({
        src: url,
        autoplay: true
      });
    }
  },
  mounted() {
    if (!window.plus) return;
    this.createVideo();
  },
  destroyed() {
    if (this.video) {
      plus.webview.close(this.video);
      this.video.close();
    }
  }
};
</script>

<style lang='scss' scoped>
.video-card {
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
</style>
