<template>
  <div class="single-container">
    <top-component></top-component>
    <div class="single-content">
      <div class="img-show">
        <div class="icon-item">
          <svg-icon icon-class="phone" class="verify-icon"></svg-icon>
          <div class="icon-item-tips icon-item-phone">
            <p>确认登录</p>
            <!-- <mt-button type="danger" size="small">确认登录</mt-button> -->
          </div>
        </div>
        <div class="icon-item icon-item-middle">
          <svg-icon icon-class="right-arrow" class="right-arrow-icon"></svg-icon>
        </div>
        <div class="icon-item">
          <svg-icon icon-class="pc" class="verify-icon"></svg-icon>
          <div class="icon-item-tips">
            <svg-icon icon-class="confirm"></svg-icon>
            <p>登录成功</p>
          </div>
        </div>
      </div>
      <div class="img-tips">请不要扫描来源不明的二维码</div>
      <mt-button type="danger" size="large" @click="verify">确认登录</mt-button>
      <mt-button size="large" @click="cancel">取消授权</mt-button>
    </div>
  </div>
</template>

<script>
import verifyCode from "@/api/qrcode";

export default {
  components: {},
  data() {
    return {
      qruuid: null
    };
  },
  computed: {},
  methods: {
    verify() {
      this.postData("verify");
    },
    cancel() {
      this.postData("cancel");
    },
    postData(op) {
      const data = {
        token: this.qruuid,
        op
      };
      verifyCode(data).then(res => {
        console.log(res, "verify.....");
        if (res) {
          this.$router.push({ name: "home" });
        }
      });
    }
  },
  mounted() {},
  created() {
    const { code, success } = this.$route.params;
    this.qruuid = code;
  }
};
</script>

<style lang='scss' scoped>
.single-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.single-content {
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
  height: calc(100% - 50px);
}
.verify-icon {
  width: 100%;
  height: 60%;
  color: green;
}
.img-show {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-tips {
  margin: 20px auto;
  color: $theme-color;
}
.icon-item {
  position: relative;
  overflow: hidden;
  width: 45%;
  display: inline-block;
  &-tips {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate3d(-50%, -50%, 0);
    color: $theme-color;
  }
  &-phone {
    top: 60%;
  }
  &-middle {
    width: 10%;
    text-align: left;
  }
  .right-arrow-icon {
    color: $theme-color;
  }
}
</style>