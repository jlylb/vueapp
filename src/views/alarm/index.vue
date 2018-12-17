<template>
  <div class="layout-container">
    <top-component></top-component>

    <div
      class="realwarn"
      v-infinite-scroll="getData"
      infinite-scroll-disabled="moreLoading"
      infinite-scroll-distance="60"
    >
      <mt-cell
        :title="item.pdi_name"
        :label="item.pdi_warnname"
        @click.native.prevent="openRoute(item)"
        is-link
        v-for="(item, index) in device"
        :key="index"
      >
        <mt-badge
          :type="wlevel[item.pdi_warnlevel]['class']"
          v-if="wlevel[item.pdi_warnlevel]"
        >{{ wlevel[item.pdi_warnlevel]['name'] }}</mt-badge>
        <!-- <svg-icon
          :icon-class="icons[item.pdi_type]"
          class="item-icon"
          slot="icon"
          v-if="icons[item.pdi_type]"
        ></svg-icon>-->
      </mt-cell>
    </div>
    <!-- <vue-qr  text="Hello world!" :size="200"></vue-qr> -->
    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>加载中...
    </p>

    <mt-popup v-model="popupVisible" class="popup-device" position="bottom">
      <mt-cell title="告警信息" :label="selectItem.pdi_updatetime"></mt-cell>
      <mt-cell title>
        <span>{{ selectItem.pdi_warnname }}</span>
      </mt-cell>
      <mt-cell title></mt-cell>
    </mt-popup>
  </div>
</template>

<script>
import { fetchList } from "@/api/alarm";
// import VueQr from 'vue-qr'
export default {
  components: {},
  data() {
    return {
      device: [],
      icons: null,
      wlevel: null,
      loading: false,
      moreLoading: false,
      selectItem: {},
      popupVisible: false,
      search: {
        page: 0,
        pageSize: 15
      },
      hasPage: true
    };
  },
  methods: {
    openRoute(item) {
      this.selectItem = item;
      // this.popupVisible = true
    },
    getData() {
      this.loading = true;
      console.log(this.search, "search data ing.......");
      if (!this.hasPage) {
        return;
      }
      this.search.page += 1;
      this.moreLoading = true;
      fetchList(this.search)
        .then(res => {
          const data = res.data.data.data;
          if (data.length < this.search.pageSize) {
            this.moreLoading = true;
            this.hasPage = false;
          } else {
            this.hasPage = true;
            // this.search.page += 1;
            this.moreLoading = false;
          }
          this.device = this.device.concat(data || []);
          this.icons = res.data.icons;
          this.wlevel = res.data.wlevel;
          this.loading = false;
        })
        .catch(res => {
          this.loading = false;
        });
    }
  },
  created() {
    this.search = {
      page: 0,
      pageSize: 15
    };
  }
};
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
.realwarn /deep/ {
  .mint-cell-title {
    width: 60%;
  }
  .mint-cell-text {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
  }
}
</style>
