<template>
  <div class="login-container" id="login-container">
    <!-- <top-component></top-component> -->
    <div class="login-cover" id="login-cover">
      <div class="login-content">
        <div class="logo">
          <svg-icon icon-class="sys-power" class="logo-icon"></svg-icon>
        </div>

        <my-input
          placeholder="请输入用户名"
          data-vv-name="username"
          class="my-input"
          v-validate="{ required: true}"
          v-model="validateForm.username"
        >
          <svg-icon icon-class="user" class="login-input-icon" slot="prepend"></svg-icon>
        </my-input>
        <div class="error" v-if="errors.has('username')">{{ errors.first("username") }}</div>
        <my-input
          placeholder="请输入密码"
          data-vv-name="password"
          class="my-input"
          v-validate="{ required: true, min: 6 }"
          type="password"
          autocomplete="off"
          v-model="validateForm.password"
        >
          <svg-icon icon-class="password" class="login-input-icon" slot="prepend"></svg-icon>
        </my-input>
        <div class="error" v-if="errors.has('password')">{{ errors.first("password") }}</div>
        <mt-button size="large" type="primary" @click="handleLogin" class="login-btn">绑定用户</mt-button>

        <a class="forget-password">
          <span @click.stop="forgetPwd">忘记密码?</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/myinput";
import { getWxToken } from '@/tools/we_auth';

export default {
  components: { MyInput },
  data() {
    return {
      // username: "username1",
      // password: "123456",
      validateForm: {
        username: "",
        password: ""
      }
    };
  },
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
            const openid = getWxToken()
            this.$axios.post('/auth/bind-login', {...this.validateForm, openid})
            .then(res => {
              console.log(res, 'bind login...........')
              this.$store.dispatch('user/refreshToken', res.data.access_token)
              this.$router.push({ path: "/tab_home" });
              return res
            }).catch(err => {
              console.log(err, 'err')
            })
        }
      });
    },
    forgetPwd() {
      this.$router.push({ name: "auth_forget" });
    }
  },
  computed: {},
  mounted() {
    // const body = document.getElementsByTagName('body')[0];
    // body.style.height=body.clientHeight+"px";
    // const html = document.getElementById('login-container');
    // html.style.height = '100%';
    // const cover = document.getElementById('login-cover');
    // cover.style.height = '100%';
  },
  created() {}
};
</script>

<style lang='scss'>
$icon-color: #ccc;
$placeholder-color: #ccc;

.login-container {
  background-image: url("../assets/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-cover {
  background: rgba($theme-color, 0.8);
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
.login-content {
  width: 100%;
  flex-direction: column;
  .mint-field {
    width: 100%;
  }
  .mint-cell-left,
  .mint-cell-right {
    display: flex;
    align-items: center;
  }
  .login-input-icon {
    width: 2em;
    height: 2em;
    color: $icon-color;
  }
  .error {
    color: #ef4f4f;
    text-align: left;
  }
  .my-input .mint-field-clear {
    color: $icon-color;
  }
  .my-input .mint-field-core {
    &::-webkit-input-placeholder {
      color: $placeholder-color;
    }
    &::-moz-placeholder {
      color: $placeholder-color;
    }
  }
}
.logo {
  width: 150px;
  height: 150px;
  text-align: center;
  margin: 0 auto;
  background-color: rgba($theme-color, 0.5);
  border-radius: 50%;
  border: 3px solid #fff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo .logo-icon {
  width: 120px;
  height: 120px;
  color: #fff;
}

.login-btn {
  background-color: darken($theme-color, 10%);
}
</style>
