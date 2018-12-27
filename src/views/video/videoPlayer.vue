<template>
  <div class="layout-container">
    <top-component @top-btn="openPusher"></top-component>
    <video-component ref="pusher" :src="urlSrc"></video-component>
    <!-- <pusher-component ref='pusher'></pusher-component> -->
    <mt-popup
      v-model="isOpen"
      :close-on-click-modal="false"
      :modal="false"
      class="popup-device"
      :style="{height: '38%', 'overflow': 'auto'}"
      position="bottom"
    >
      <mt-cell
        :title="item.pdi_name"
        :label="String(item.pdi_index)"
        @click.native="changeUrl(item)"
        is-link
        v-for="(item, index) in items"
        :key="index"
      ></mt-cell>
    </mt-popup>
  </div>
</template>

<script>
import videoComponent from "@/components/video.vue";
import { MessageBox } from "mint-ui";
import fetchList from "@/api/home";

export default {
  components: {
    videoComponent
  },
  data() {
    return {
      urlSrc: null,
      isOpen: true,
      items: [
        // { label: '香港卫视', value: 'rtmp://live.hkstv.hk.lxdns.com/live/hks'},
        // { label: 'CCTV1高清', value: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'},
        // { label: 'CCTV6高清', value: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8'},
        // { label: '本地', value: 'rtmp://192.168.1.188:1935/live/1111'},
      ]
    };
  },
  methods: {
    openPusher() {
      if (this.items.length === 0) return;
      this.isOpen = !this.isOpen;
    },
    changeUrl(item) {
      this.$refs.pusher.updateVideoUrl(item.url);
    }
  },
  mounted() {},
  destroyed() {},
  created() {
    fetchList().then(res => {
      this.items = res.data.data;
      if (this.items.length > 0) {
        this.urlSrc = this.items[0].url;
      }
    });
  }
};
</script>

<style scoped>
</style>
