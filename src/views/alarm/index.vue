<template>
  <div class='layout-container'>
    <top-component></top-component>

    <div class='realwarn' 
      v-infinite-scroll="getData"
      infinite-scroll-disabled="moreLoading"
      infinite-scroll-distance="60">
      <mt-cell 
      :title="item.pdi_name"
      :label="item.pdi_warnname"
      @click.native.prevent='openRoute(item)' 
      is-link 
      v-for='(item, index) in device' 
      :key='index'>
        <mt-badge :type="wlevel[item.pdi_warnlevel]['class']" v-if="wlevel[item.pdi_warnlevel]">{{ wlevel[item.pdi_warnlevel]['name'] }}</mt-badge>
        <svg-icon :icon-class='icons[item.pdi_type]' class='item-icon' slot='icon' v-if='icons[item.pdi_type]'></svg-icon>
      </mt-cell>
    </div>
    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  <!-- <vue-qr :text="text"  qid="testid"></vue-qr> -->
  <mt-popup
    v-model="popupVisible"
    class='popup-device'
    position="bottom">
    <mt-cell title="告警信息" :label="selectItem.pdi_updatetime">
    </mt-cell>
    <mt-cell title="">
      <span>
        {{ selectItem.pdi_warnname }}
      </span>
    </mt-cell>
    <mt-cell title="">
    </mt-cell>
  </mt-popup>

  </div>
</template>

<script>
import { fetchList } from '@/api/alarm'
// import VueQr from 'vue-qr'

export default {
  // components: { VueQr },
  data() {
    return {
      device: [],
      icons: null,
      wlevel: null,
      loading: false,
      moreLoading: false,
      selectItem: {},
      popupVisible: false,
      text: '83569001&qr code test1'
    }
  },
  methods: {
    openRoute(item) {
      this.selectItem = item
      // this.popupVisible = true
    },
    getData() {
      this.loading = true
      fetchList().then((res) => {
        this.device = res.data.data.data
        this.icons = res.data.icons
        this.wlevel = res.data.wlevel
        this.loading = false
        this.moreLoading = false
      }).catch((res) => {
        this.loading = false
      })
    }
  },
  created() {

  }
}
</script>

<style lang='scss' scoped>
.page-infinite-loading {
  text-align: center;
  height: 50px;
  line-height: 50px;
  /deep/ div {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
