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
      <!-- <mt-tab-item id="tab_control" @click.native="tabClick('tab_control')">
        <svg-icon icon-class="control" slot="icon"></svg-icon>控制
      </mt-tab-item>-->
      <mt-tab-item id="tab_my" @click.native="tabClick('tab_my')">
        <svg-icon icon-class="user" slot="icon"></svg-icon>我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { getGuide } from "@/tools/guide";
// import { addDevice } from "@/api/home";
import { unread } from "@/api/alarm";

export default {
  name: "home",
  components: {},
  data() {
    return {
      selected: "",
      hiddenTabs: ["add_device"],
      isShow: true,
      warnNum: null,
      noticeTimerId: null
    };
  },
  computed: {
    ...mapGetters("app", ["barTitle", "appNotice", "appRate"]),
    ...mapGetters("user", ["notification", "companyId"])
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
    },
    warnNum(nval, oval) {
      if (nval == oval) return;
      this.setBage(nval);
      this.$store.dispatch("user/setNotification", nval);
      // this.createLocalPushMsg(nval);
    }
    // noticeSec(nval, oval) {
    //   this.setTimerNotice();
    // }
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
        plus.screen.lockOrientation("portrait-primary");
        // function plusReady() {
        plus.key.addEventListener("backbutton", () => {
          console.log("listening back button");
          const path = vm.$route.path;
          console.log(path, "url params");
          if (path === "/tab_home" || path === "/login") {
            // 入口页了，执行退出。
            plus.runtime.quit();
          } else {
            // 根据实际需求选择相应的方法
            vm.$router.go(-1);
            // history.back();
          }
        });
        //}
        // document.addEventListener('plusready', plusReady, false);
      }
    },
    addPush() {
      //监听系统通知栏消息点击事件
      plus.push.addEventListener(
        "click",
        msg => {
          //处理点击消息的业务逻辑代码
          // this.$message(msg.content)
          console.log(msg, "notice click........");
          // plus.nativeUI.toast(msg.content);
          switch (msg.payload) {
            case "LocalMSG":
              console.log("点击本地创建消息启动：click......");
              this.gotoRouter();
              break;
            default:
              console.log("点击离线推送消息启动：click.....");
              break;
          }
          // 提示点击的内容
          // plus.nativeUI.alert(msg.content);
          // this.addMessage(msg.payload);

          this.logoutPushMsg(msg);
        },
        false
      );
      //监听接收透传消息事件
      plus.push.addEventListener(
        "receive",
        msg => {
          // 处理透传消息的业务逻辑代码
          console.log(msg, "notice receive........");
          // plus.nativeUI.toast(msg.content);
          plus.nativeUI.alert(msg.content);
          if (msg.aps) {
            // Apple APNS message
            console.log("接收到在线APNS消息：receive........");
          } else {
            console.log("接收到在线透传消息：receive........");
          }
          this.logoutPushMsg(msg);
          // this.addMessage(msg.payload);
        },
        false
      );
    },
    gotoRouter() {
      this.$router.push({ name: "alarm", replace: true });
    },
    createLocalPushMsg(num) {
      if (num < 1) return;
      var options = { cover: true };
      var str = `接收到告警信息${num}条, 请查看处理`;
      if (!window.plus) return;
      plus.push.createMessage(str, "LocalMSG", options);
    },
    logoutPushMsg(msg) {
      if (msg.payload) {
        if (typeof msg.payload == "string") {
          console.log("payload(String): " + msg.payload);
        } else {
          console.log("payload(JSON): " + JSON.stringify(msg.payload));
        }
      } else {
        console.log("payload: undefined");
      }
      if (msg.aps) {
        console.log("aps: " + JSON.stringify(msg.aps));
      }
    },
    getClientId() {
      // setTimeout(() => {
      //   const pinf = plus.push.getClientInfo();
      //   const { id, appid, clientid, appkey } = pinf;
      //   console.log(id, appid, clientid, appkey, "clientid..........");
      //   addDevice({ appid, clientid, Co_ID: this.companyId });
      // }, 200);
    },
    addMessage(payload) {
      if (!payload) return;
      if (typeof payload === "string") {
        payload = JSON.parse(payload);
      }
      const options = { cover: false, title: "告警通知" };
      let str = `告警信息${payload.payload1.num}条,请查看处理`;
      plus.push.createMessage(str, null, options);
    },
    setBage(num) {
      if (!window.plus) return;
      plus.runtime.setBadgeNumber(num || this.notification);
    },
    initApp() {
      this.addEventTest();
      if (plus.navigator.hasSplashscreen()) {
        plus.navigator.closeSplashscreen();
      }
      // this.getClientId();
      this.addPush();
      this.setBage();
      this.setUnread();
      this.setNoticeParams();
      this.watchRate();
    },
    getUnread() {
      unread().then(res => {
        this.warnNum = res.data.data;
      });
    },
    setUnread() {
      const notificationId = setInterval(() => {
        this.getUnread();
      }, 2000);
      this.$store.dispatch("app/setAppNotificationId", notificationId);
    },
    setTimerNotice(sec) {
      this.noticeTimerId = setInterval(() => {
        this.createLocalPushMsg(this.notification);
      }, sec);
    },
    clearNotice() {
      this.noticeTimerId && clearInterval(this.noticeTimerId);
    },
    setNoticeParams() {
      const appNotice = plus.storage.getItem("dh_appNotice");
      const appRate = plus.storage.getItem("dh_appRate");

      if (appRate != null) {
        this.$store.dispatch("app/setAppRate", +appRate);
      }
      if (appNotice != null) {
        this.$store.dispatch("app/setAppNotice", appNotice == "true");
      }
    },
    watchRate() {
      this.$watch(
        () => {
          return this.appRate;
        },
        (nval, oval) => {
          console.log(nval, "watching sec....... ");
          this.clearNotice();
          if (this.appNotice) {
            this.setTimerNotice((nval || 30) * 1000);
          }
        }
      );
      this.$watch(
        () => {
          return this.appNotice;
        },
        (nval, oval) => {
          console.log(nval, "watching notice....... ");
          if (!nval) {
            this.clearNotice();
          } else {
            this.setTimerNotice((this.appRate || 30) * 1000);
          }
        },
        {
          immediate: true
        }
      );
    }
  },
  mounted() {
    // this.setNoticeParams();
    // this.watchRate();
    // this.$store.dispatch("app/setAppRate", 30);
    this.getUnread();
    // this.setUnread();
    if (window.plus) {
      this.initApp();
    } else {
      document.addEventListener(
        "plusready",
        () => {
          this.initApp();
        },
        false
      );
    }
  },
  created() {
    if (this.notification > 0) {
      this.gotoRouter();
    }
  }
};
</script>

<style lang="scss" >
.app-container {
  overflow-y: auto;
  height: 100%;
  display: flex;
  position: relative;
  overflow-x: hidden;
  // background: #e8eaec;
  & {
    .home-tab {
      background-color: $theme-color;
    }
    .mint-tab-item {
      color: #ccc;
      &.is-selected {
        color: #fff;
      }
      &.clear-selected {
        color: #fff;
        background-color: $theme-color;
      }
    }
  }
}
.home-tab .mint-tab-item-icon {
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

