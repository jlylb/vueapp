<template>
  <div class="app-container">
    <div class="home-content">
      <router-view></router-view>
    </div>

    <mt-tabbar v-model="selected" class="home-tab" v-show="isShow">
      <mt-tab-item id="tab_home" @click.native="tabClick('tab_home')">
        <svg-icon icon-class="home1" slot="icon"></svg-icon>首页
      </mt-tab-item>
      <mt-tab-item id="tab_discover" @click.native="tabClick('tab_discover')">
        <svg-icon icon-class="chart" slot="icon"></svg-icon>设备
      </mt-tab-item>
      <mt-tab-item id="tab_my" @click.native="tabClick('tab_my')">
        <svg-icon icon-class="tab-user" slot="icon"></svg-icon>我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getGuide } from "@/tools/guide";

export default {
  name: "home",
  components: {},
  data() {
    return {
      selected: "",
      hiddenTabs: ["add_device"],
      isShow: true
    };
  },
  computed: {
    ...mapGetters("app", ["barTitle"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.selected = to.name;
      vm.isShow = !(vm.hiddenTabs.indexOf(to.name) > -1);
    });
  },
  watch: {
    $route(to) {
      console.log(to.name);
      this.selected = to.name;
      this.isShow = !(this.hiddenTabs.indexOf(to.name) > -1);
      console.log(this.isShow);
    }
  },
  methods: {
    tabClick(name) {
      console.log({ name });
      this.$router.push({ name });
    },
    goBack() {
      this.$router.go(-1);
    },
    tabClass(tabName) {
      let cur = this.$route.name;
      return {
        "is-selected": tabName === cur,
        "clear-selected": tabName !== cur
      };
    },
    addEventTest() {
      const vm = this;
      if (window.plus) {
        console.log(plus);
        plus.screen.lockOrientation("portrait-primary");
        // function plusReady() {
        plus.key.addEventListener("backbutton", () => {
          console.log("listening back button");
          // const path = location.path;
          // const hash = location.hash;
          const path = vm.$route.path;
          console.log(path, "url params");
          if (path === "/tab_home" || path === "/login") {
            // 入口页了，执行退出。
            plus.runtime.quit();
          } else {
            // 根据实际需求选择相应的方法
            vm.$router.go(-1);
            history.back();
          }
        });
        //}
        // document.addEventListener('plusready', plusReady, false);
      }
    }
  },
  mounted() {
    this.addEventTest();
    if (!window.plus) {
      return;
    }
    if (plus.navigator.hasSplashscreen()) {
      plus.navigator.closeSplashscreen();
    }
  },
  created() {
    console.log(this.$store);

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
  // & {
  //   .home-tab {
  //     background-color: rgba(35, 159, 254, 0.8);
  //   }
  //   .mint-tab-item {
  //     color: #fff;
  //     &.is-selected {
  //       color: #26a2ff;
  //     }
  //     &.clear-selected {
  //       color: #fff;
  //       background-color: rgba(35, 159, 254, 0.8);
  //     }
  //   }
  // }
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
  height: calc(100% - 110px);
}
</style>

