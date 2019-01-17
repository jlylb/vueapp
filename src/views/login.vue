<template>
  <div class="login-container" id="login-container">
    <div class="home-content" id="login-cover">
      <transition name="logo-scale">
        <div class="logo" v-show="showLogo">
          <svg-icon icon-class="dapeng" class="logo-icon"></svg-icon>
        </div>
      </transition>

      <my-input
        placeholder="请输入用户名"
        class="my-input input-active"
        data-vv-name="username"
        key="username"
        @click.native="smallLogo"
        @click-out="bigLogo"
        v-validate="{ required: true}"
        v-model="validateForm.username"
      >
        <svg-icon icon-class="user" class="login-input-icon" slot="prepend"></svg-icon>
      </my-input>
      <div class="error" v-if="errors.has('username')">{{ errors.first("username") }}</div>
      <my-input
        placeholder="请输入密码"
        data-vv-name="password"
        class="my-input input-active"
        v-validate="{ required: true, min: 6 }"
        type="password"
        autocomplete="off"
        key="password"
        @click.native="smallLogo"
        @click-out="bigLogo"
        v-model="validateForm.password"
      >
        <svg-icon icon-class="password" class="login-input-icon" slot="prepend"></svg-icon>
      </my-input>
      <div class="error" v-if="errors.has('password')">{{ errors.first("password") }}</div>
      <mt-button size="large" type="primary" @click="handleLogin" class="bt-login">登 录</mt-button>

      <a class="forget-password">
        <span @click.stop="forgetPwd">忘记密码?</span>
      </a>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/myinput";
import { mapState } from "vuex";

export default {
  components: { MyInput },
  data() {
    return {
      validateForm: {
        username: "",
        password: ""
      },
      showLogo: true,
      keyboard: null
    };
  },
  directives: {},
  methods: {
    handleLogin() {
      this.$validator.validate().then(valid => {
        console.log(
          valid,
          this.errors.all(),
          this.errors.collect(),
          this.fields
        );
        if (valid) {
          console.log(this.validateForm);
          this.$store
            .dispatch("user/LoginByUsername", this.validateForm)
            .then(res => {
              console.log(res, 333333333);
              this.$router.push({ path: "/tab_home" });
            });
        }
      });
    },
    smallLogo(e) {
      e.stopPropagation();
      this.showLogo = false;
    },
    bigLogo() {
      this.showLogo = true;
    },
    output(str = "init.....") {
      const body = document.getElementsByTagName("body")[0];
      const app = document.getElementById("app");
      const html = document.getElementById("login-container");
      const cover = document.getElementById("login-cover");
      this.keyboard = body.clientHeight;
      // console.log(body.clientHeight, app.clientHeight,html.clientHeight,cover.clientHeight, str)
    },
    forgetPwd() {
      this.$router.push({ name: "auth_forget" });
    }
  },
  computed: {
    ...mapState("user", ["companyLogo"])
  },
  mounted() {
    // const body = document.getElementsByTagName('body')[0];
    // body.style.height=body.clientHeight+"px";
    // const app = document.getElementById('app');
    // app.style.height = '100%';
    // const html = document.getElementById('login-container');
    // html.style.height = '100%';
    // const cover = document.getElementById('login-cover');
    // cover.style.height = '100%';
    // this.output()
  },
  created() {
    window.addEventListener("resize", () => {
      const body = document.getElementsByTagName("body")[0];
      if (this.keyboard > body.clientHeight) {
        this.showLogo = false;
      } else {
        this.showLogo = true;
      }

      this.output("resize.......");
    });
  }
};
</script>

<style lang='scss' scoped>
$cover-color: #4a9026;
$input-color: darken($cover-color, 10%);
$logo-color: #c4e1ff;
$placeholder-color: #ccc;
.login-container {
  // background-image: url('../assets/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  background: $cover-color;
  position: relative;
}
.login-cover {
  background: $cover-color;
  height: 100%;
  width: 98%;
  padding: 0 1%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.forget-password {
  color: #fff;
  text-align: right;
  line-height: 30px;
  margin: 5px 0;
  display: block;
  text-decoration: underline;
}
.home-content {
  // background: $cover-color;
  width: 98%;
  padding: 0 1%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  .input-active:active,
  .input-active:hover {
    border-color: $input-color;
  }
}
.logo {
  width: 180px;
  height: 180px;
  text-align: center;
  margin: 0 auto;
  // background-color: $logo-color;
  border-radius: 50%;
  border: 5px solid rgba(#fff, 0.5);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-top: 20px;
}
.logo /deep/ .logo-icon {
  width: 120px;
  height: 120px;
  color: rgba(#fff, 0.5);
}
.input {
  margin: 10px 0;
  background-color: transparent;
  color: rgba(#fff, 0.5);
}
.bt-login {
  background-color: $input-color;
}

.input-active /deep/ .mint-field-clear {
  color: $input-color;
}
.home-content /deep/ .login-input-icon {
  width: 1.5em;
  height: 1.5em;
  color: #fff;
}
.error {
  color: #ef4f4f;
  text-align: left;
}
.logo-scale-enter-active {
  animation: logo-big 0.5s;
}
.logo-scale-leave-active {
  animation: logo-big 0.5s reverse;
}

@keyframes logo-big {
  0% {
    transform: scale(0);
  }
  20% {
    transform: scale(0.4);
  }
  40% {
    transform: scale(0.6);
  }
  60% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
.my-input /deep/ .mint-field-core {
  &::-webkit-input-placeholder {
    color: $placeholder-color;
  }
  &::-moz-placeholder {
    color: $placeholder-color;
  }
}
</style>
