<template>
    <div class='layout-container'>
        <top-component @top-btn='openPusher'>
        </top-component>
        <pusher-component ref='pusher'></pusher-component>

<mt-popup
    v-model="isOpen"
    class='popup-device'
    :style='{height: "240px"}'
    position="bottom">

    <mt-cell 
    :title="item.label" 
    @click.native='changeUrl(item)'
    is-link 
    v-for='(item, index) in items' 
    :key='index'>
    </mt-cell>
    <mt-cell title='视频流' @click.native='goPlayer'></mt-cell>
  </mt-popup>
    </div>
</template>

<script>
import PusherComponent from '@/components/pushvideo.vue';

export default {
    components: {
        PusherComponent
    },
    data() {
        return {
            src: '',
            isOpen: false,
            items: [
                { label: '香港卫视', value: 'rtmp://live.hkstv.hk.lxdns.com/live/hks'},
                { label: 'CCTV1高清', value: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'},
                { label: 'CCTV6高清', value: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8'},
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
        goPlayer() {
            this.$router.push({name: 'video_player'})
        }
    },
    created() {
        this.src = this.$route.params.url
    }
}
</script>

<style>
</style>
