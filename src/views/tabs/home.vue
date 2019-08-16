<template>
  <div class="tab-container">
    <top-component></top-component>
    <div class="slide-image" ref="slideimg">
      <mt-swipe :show-indicators="true" ref="slideContainer" :style="imgStyle">
        <mt-swipe-item v-for="(item, index) in items" :key="index">
          <img :src="item.image" :ref="`slideimg_${index}`" class="slide-item-img" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="fluid-content">
      <div class="fluid-content-item">
        <div class="item-power item item-right" @click="openRouter('sysmenu', 'power')">
          <div class="wrap-item">
            <div class="icon">
              <svg-icon icon-class="sys-power" class="item-icon"></svg-icon>
            </div>
            <div class="icon-desc">动力系统</div>
          </div>
        </div>
        <div class="item-alarm item item-right" @click="openRouter('alarm')">
          <div class="wrap-item">
            <div class="icon">
              <svg-icon
                icon-class="afbj"
                :class="['animation2','item-icon', {'animation2-pause': notification == 0 }]"
              ></svg-icon>
            </div>
            <div class="icon-desc">
              实时告警
              <mt-badge size="small" type="error" v-if="notification > 0">{{ notification }}</mt-badge>
            </div>
          </div>
        </div>
        <div class="item-statistic item item-right" @click="openRouter('sysmenu', 'fire')">
          <div class="wrap-item">
            <div class="icon">
              <svg-icon icon-class="sys-xf" class="item-icon"></svg-icon>
            </div>
            <div class="icon-desc">消防系统</div>
          </div>
        </div>
      </div>
      <div class="fluid-content-item">
        <div class="item-remote item" @click="openRouter('sysmenu', 'env')">
          <div class="wrap-item">
            <div class="icon">
              <svg-icon icon-class="sys-env" class="item-icon"></svg-icon>
            </div>
            <div class="icon-desc">环境系统</div>
          </div>
        </div>
        <div class="item-video item" @click="openRouter('sysmenu', 'protect')">
          <div class="wrap-item">
            <div class="icon">
              <svg-icon icon-class="sys-protect" class="item-icon"></svg-icon>
            </div>
            <div class="icon-desc">安保系统</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
import { getImageUrl } from "@/tools";

import Myimg from "@/tools/img.js";

export default {
  data() {
    return {
      items: [
        {
          url: "http://www.baidu.com",
          image: Myimg.TestJpg1
        },
        {
          url: "http://www.baidu.com",
          image: Myimg.TestJpg2
        },
        {
          url: "http://www.baidu.com",
          image: Myimg.TestJpg3
        }
      ],
      imgStyle: null
    };
  },
  computed: {
    ...mapGetters("user", ["notification"]),
    ...mapGetters("app", ["isUpdateApp"])
  },
  methods: {
    openRouter(name, type) {
      let params = type ? { type } : {};
      this.$router.push({ name, params: params });
    },
    slideImage() {
      console.log("img slide............");
      const simg = this.$refs.slideimg;
      let { height } = simg.getBoundingClientRect();

      const indexs = [0, 1, 2];

      this.imgStyle = { height: `${height}px` };

      console.log(this.$refs.slideContainer);
      indexs.forEach(index => {
        let obj = `slideimg_${index}`;
        this.$refs[obj][0].style.height = `${height}px`;
      });
    },
    resizeHandler() {
      setTimeout(() => {
        this.slideImage();
      }, 300);
    },
    resizeImg() {
      this.slideImage();
      window.addEventListener("resize", this.resizeHandler, false);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler, false);
  },
  mounted() {
    console.log("mounted ing ...before", this.isUpdateApp);
    this.resizeImg();
    if (this.isUpdateApp) return;
    const AutoUpdateApp = this.$AutoUpdateApp();
    AutoUpdateApp.getVersion(version => {
      console.log(version, "version......");
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
  }
};
</script>

<style lang='scss'>
.slide-image {
  padding: 0 0.15rem;
  flex: 1.2;
  position: relative;
  // width: calc(100% - 0.3rem);
  // margin: 0 auto;
  overflow: hidden;
  & img {
    display: inline-block;
    width: 100%;
  }
}

.tab-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.fluid-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex: 3;
  .fluid-content-item {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .item {
    // padding: 20px;
    margin: 0.15rem;
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
    padding: 0.3rem;
    padding-bottom: 0;
    font-size: 1.3em;
  }
  .item-icon {
    width: 1.3rem;
    height: 1.3rem;
    color: #fff;
  }
  .item-right {
    margin-right: 0;
  }
  .item-power {
    background-color: #409eff;
    flex: 1.4;
  }
  .item-alarm {
    background-color: rgb(245, 108, 108);
    flex: 1.4;
  }
  .item-statistic {
    background-color: #a448bb;
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
  .item-temp {
    flex: 1.7;
    background-color: #19d4ae;
  }
}
.icon {
  width: 1.8rem;
  height: 1.8rem;
  line-height: 1.8rem;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
