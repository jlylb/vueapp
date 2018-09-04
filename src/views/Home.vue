<template>

<div class='app-container'>

  <div class='home-content'>
    <router-view></router-view>
  </div>

  <mt-tabbar v-model="selected" class='home-tab' v-show='isShow'>
    <mt-tab-item id="tab_home" @click.native="tabClick('tab_home')" >
      <svg-icon icon-class="home1" slot='icon'></svg-icon>
      首页
    </mt-tab-item>
    <mt-tab-item id="tab_discover" @click.native="tabClick('tab_discover')" >
      <svg-icon icon-class="chart" slot='icon'></svg-icon>
      发现
    </mt-tab-item>
    <mt-tab-item id="tab_my" @click.native="tabClick('tab_my')">
      <svg-icon icon-class="user" slot='icon'></svg-icon>
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
      selected: "",
      hiddenTabs: ['add_device'],
      isShow: true
    };
  },
  computed: {
    ...mapGetters('app',[
      'barTitle'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.selected = to.name
      vm.isShow = !(vm.hiddenTabs.indexOf(to.name) > -1)
    })
  },
  watch: {
    '$route'(to) {
      console.log(to.name)
      this.selected = to.name
      this.isShow = !(this.hiddenTabs.indexOf(to.name) > -1)
      console.log(this.isShow)
    },
  },
  methods: {
    tabClick(name) {
      console.log({name})
      this.$router.push({name})
    },
    goBack() {
      this.$router.go(-1)
    },
    tabClass(tabName) {
    let cur = this.$route.name
      return {
        'is-selected': tabName===cur,
        'clear-selected': tabName!==cur
      }
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
  overflow-x: hidden;
  // background: #e8eaec;
  & {
    .home-tab {
      background-color: rgba(35, 159, 254, 0.8);
    }
    .mint-tab-item {
      color: #fff;
      &.is-selected {
        color: #26a2ff;
      }
      &.clear-selected {
        color: #fff;
        background-color: rgba(35, 159, 254, 0.8);
      }
    }
  }
}
.home-tab /deep/ .mint-tab-item-icon {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.home-content {
  margin: 50px auto 60px;
  display: flex;
  flex: 1;
}
</style>

