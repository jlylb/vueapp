<template>
  <div class="layout-container">
    <top-component @top-btn="openPusher"></top-component>
    <video-component ref="pusher"></video-component>
    <!-- <pusher-component ref='pusher'></pusher-component> -->
    <mt-popup
      v-model="isOpen"
      class="popup-device"
      :style="{height: '240px', 'overflow': 'auto'}"
      position="bottom"
    >
      <mt-cell
        :title="item.label"
        @click.native="changeUrl(item)"
        is-link
        v-for="(item, index) in items"
        :key="index"
      ></mt-cell>
      <mt-cell title="直播流" @click.native="goPusher"></mt-cell>
      <mt-cell title="自定义" @click.native="goCustom"></mt-cell>
      <mt-cell title="js播放" @click.native="goVideo"></mt-cell>
    </mt-popup>
  </div>
</template>

<script>
import videoComponent from '@/components/video.vue';
import { MessageBox } from 'mint-ui';

export default {
    components: {
        videoComponent,
    },
    data() {
        return {
            src: '',
            isOpen: false,
            items: [
                { label: '香港卫视', value: 'rtmp://live.hkstv.hk.lxdns.com/live/hks'},
                { label: 'CCTV1高清', value: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'},
                { label: 'CCTV6高清', value: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8'},
                 { label: '本地', value: 'rtmp://192.168.1.188:1935/live/1111'},
            ]
        }
    },
    methods: {
        openPusher() {
            this.isOpen = true
        },
        changeUrl(item) {
            this.$refs.pusher.updateVideoUrl(item.value)
        },
        goPusher() {
            this.$router.push({name: 'video_pusher'})
        },
        goVideo() {
            this.$router.push({name: 'jsvideo'})
        },
        goCustom() {
            MessageBox.prompt('请输入网络地址').then(({ value, action }) => {
                console.log(value)
                this.$refs.pusher.updateVideoUrl(value)
            });
        }
    },
    mounted() {

    },
    destroyed() {

    },
    created() {

    }
}
</script>

<style scoped>
</style>
