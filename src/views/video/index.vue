<template>
  <div class='layout-container'>
    <top-component></top-component>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="60">
      <li v-for="(item, index) in list" :key='index'>
        <a class='video-card' @touchstart="touchstart">
          <p>视频 {{ item }}</p>
          <p class='video-desc'>视频描述</p>
        </a>
      </li>
    </ul>
    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false
    };
  },
  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list.length;
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    },
    touchstart() {

    }
  }
};
</script>

<style lang='scss' scoped>
.video-card {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 200px;
  margin-bottom: 20px;
  background-color: goldenrod;
  position: relative;

  .video-desc {
    display: none;
    width: 100%;
    height: 30%;
    background-color: rgba(0, 0, 0, .2);
    position: absolute;
    bottom: 0;
    left:0;
  }

  &:hover {
    .video-desc {
      display: block;

    }
  }
}
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
