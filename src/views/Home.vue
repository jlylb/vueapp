<template>

<div style=' overflow: hidden'>

  <mt-header :title="barTitle" fixed>
    <router-link to="/" slot="left">
      <mt-button icon="back">back</mt-button>
    </router-link>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>

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
    ])
  },
  methods: {
    tabClick(name) {
      console.log({name})
      this.$router.push({name})
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
.home-tab /deep/ .mint-tab-item-icon {
  margin: 0 auto;
}
.home-content {
  margin-top: 60px;
}
</style>

