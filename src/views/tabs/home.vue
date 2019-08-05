<template>
  <div class="tab-container">
    <top-component></top-component>

    <mt-swipe :show-indicators="true" class="slide-image">
      <mt-swipe-item v-for="(item, index) in items" :key="index">
        <img :src="item.image">
      </mt-swipe-item>
      <!-- <mt-swipe-item >
            <img :src='testJpg' />
      </mt-swipe-item>-->
    </mt-swipe>

    <div class="fluid-content">
      <div class="fluid-content-item">
        <div class="item-monitor item item-right" @click="openRouter('monitor')">
          <div class="wrap-item">
            <svg-icon icon-class="monitor" class="item-icon"></svg-icon>
            <div class="icon-desc">实时监测</div>
          </div>
        </div>
        <div class="item-alarm item item-right" @click="openRouter('alarm')">
          <div class="wrap-item">
            <svg-icon icon-class="message" class="item-icon"></svg-icon>
            <div class="icon-desc">告警管理</div>
          </div>
        </div>
        <div class="item-statistic item item-right" @click="openRouter('statistic')">
          <div class="wrap-item">
            <svg-icon icon-class="statistic" class="item-icon"></svg-icon>
            <div class="icon-desc">统计分析</div>
          </div>
        </div>
      </div>
      <div class="fluid-content-item">
        <div class="item-remote item" @click="openRouter('remote')">
          <div class="wrap-item">
            <svg-icon icon-class="control" class="item-icon"></svg-icon>
            <div class="icon-desc">远程控制</div>
          </div>
        </div>
        <div class="item-video item" @click="openRouter('video')">
          <div class="wrap-item">
            <svg-icon icon-class="video" class="item-icon"></svg-icon>
            <div class="icon-desc">视频控制</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slider1 from "@/assets/s11.jpg";
import slider2 from "@/assets/s12.jpg";
import slider3 from "@/assets/s13.jpg";
import { MessageBox } from "mint-ui";
import { getImageUrl } from "@/tools";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      items: [{ image: slider1 }, { image: slider2 }, { image: slider3 }]
      // testJpg
    };
  },
  methods: {
    openRouter(name) {
      this.$router.push({ name });
    }
  },
  computed: {
    ...mapGetters("user", ["notification"]),
    ...mapGetters("app", ["isUpdateApp"])
  },
  mounted() {
    console.log("mounted ing ...before", this.isUpdateApp);
    if (this.isUpdateApp) return;
    const AutoUpdateApp = this.$AutoUpdateApp();
    AutoUpdateApp.getVersion(version => {
      console.log(version, "version......");
      this.$store
        .dispatch("app/setVersion", version)
      this.$store
        .dispatch("app/updateApp", { version })
        .then(res => {
          const { apk } = res;
          if (apk) {
            MessageBox.confirm("检测到更新,是否更新?", "更新提示", {
              confirmButtonText: "立即更新",
              cancelButtonText: "稍后更新",
              closeOnClickModal: false
            })
              .then(() => {
                let url = apk;
                if (!/http[s]?:\/\//.test(apk)) {
                  url = getImageUrl(apk);
                }
                AutoUpdateApp.downWgt(url);
              })
              .catch(err => {
                console.log("取消更新", err);
              });
          }
        })
        .catch(() => {});
    });
  },
  created() {
    this.$store.commit("app/BAR_TITLE", "首页");
    // this.$axios({
    //     url: '/image/item'
    // }).then((res)=>{
    //     console.log(res)
    //     this.items = res.data.items
    // })
  }
};
</script>

<style lang='scss' scoped>
.slide-image {
  height: 150px;
  padding: 0 10px;
  flex: 1.2;
  & img {
    display: inline-block;
    height: 100%;
    width: 100%;
  }
}
.tab-container {
  //   height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.fluid-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex: 3;
  //   height: 100%;
  .fluid-content-item {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .item {
    padding: 20px;
    margin: 10px;
    color: #ffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
  }
  .wrap-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .icon-desc {
    padding: 5px;
  }
  .item-icon {
    width: 3em;
    height: 3em;
    color: #fff;
  }
  .item-right {
    margin-right: 0;
  }
  .item-monitor {
    background-color: #409eff;
    flex: 1.2;
  }
  .item-alarm {
    background-color: rgb(245, 108, 108);
    flex: 2;
  }
  .item-statistic {
    background-color: #409eff;
    flex: 1.4;
  }
  .item-remote {
    flex: 1.3;
    background-color: #67c23a;
  }
  .item-video {
    flex: 1.7;
    background-color: #e6a23c;
  }
}
</style>
