<template>

<div class='app-container'>

  <!-- <mt-header :title="barTitle" fixed>
    <mt-button icon="back" @click="goBack" slot="left" v-if='isShow'>返回</mt-button>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header> -->

  <div class='home-content'>
    <router-view></router-view>
  </div>

  <mt-tabbar v-model="selected" class='home-tab'>
    <mt-tab-item id="home" @click.native="tabClick('tab_home')">
      <svg-icon icon-class="user" slot='icon'></svg-icon>
      首页
    </mt-tab-item>
    <mt-tab-item id="discover" @click.native="tabClick('tab_discover')">
      <svg-icon icon-class="chart" slot='icon'></svg-icon>
      发现
    </mt-tab-item>
    <mt-tab-item id="my" @click.native="tabClick('tab_my')">
      <svg-icon icon-class="people" slot='icon'></svg-icon>
      我的
    </mt-tab-item>
  </mt-tabbar>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "home",
  components: {},
  data() {
    return {
      selected: "home"
    };
  },
  computed: {
    ...mapGetters('app',[
      'barTitle'
    ]),
    isShow() {
      return this.$route.name !=='tab_home'
    }
  },
  methods: {
    tabClick(name) {
      console.log({name})
      this.$router.push({name})
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    console.log(this.$store)
    // const name = 'tab_home'
    // this.$router.push({name})
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  overflow-y: auto;
  height: 100%;
  display: flex;
  position: relative;
  // background: #e8eaec;
}
.home-tab /deep/ .mint-tab-item-icon {
  margin: 0 auto;
}
.home-content {
  margin: 50px auto 60px;
  display: flex;
  flex: 1;
}
</style>

