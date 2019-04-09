<template>
  <div class="layout-container single-page">
    <top-component></top-component>

    <div class="single-content">
      <my-input
        disable-clear
        class="input-active"
        placeholder="请输入手机号"
        data-vv-name="phone"
        key="phone"
        v-validate="{ required: true, digits: 11, regex: /^1[3578]\d{9}$/}"
        v-model.trim="validateForm.phone"
      >
        <svg-icon icon-class="phone" class="login-input-icon" slot="prepend"></svg-icon>
      </my-input>
      <div class="error" v-if="errors.has('phone')">{{ errors.first("phone") }}</div>

      <my-input
        disable-clear
        class="input-active"
        placeholder="请输入验证码"
        data-vv-name="code"
        key="code"
        v-validate="{ required: true, digits: 6 }"
        v-model.trim="validateForm.code"
      >
        <svg-icon icon-class="code" class="login-input-icon" slot="prepend"></svg-icon>
        <sms-btn :time="60" :is-disabled="isDisabled" @sentAjax="getCode" ref="sms"></sms-btn>
      </my-input>
      <div class="error" v-if="errors.has('code')">{{ errors.first("code") }}</div>

      <my-input
        disable-clear
        placeholder="请输入新密码"
        data-vv-name="password"
        class="input-active"
        v-validate="{ required: true, min: 6 }"
        type="password"
        autocomplete="off"
        key="password"
        v-model="validateForm.password"
      >
        <svg-icon icon-class="fpassword" class="login-input-icon" slot="prepend"></svg-icon>
      </my-input>
      <div class="error" v-if="errors.has('password')">{{ errors.first("password") }}</div>

      <mt-button
        size="large"
        type="primary"
        class="btn-top"
        @click.native="confirmPassword"
        :disabled="btnDisabled"
      >确定</mt-button>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/myinput";
import SmsBtn from "@/components/sms";
import { sendcode } from "@/api/login";
import { Toast } from "mint-ui";

export default {
  components: { MyInput, SmsBtn },
  data() {
    return {
      validateForm: {
        phone: "",
        code: "",
        password: ""
      }
    };
  },
  computed: {
    isDisabled() {
      return this.errors.has("phone");
    },
    btnDisabled() {
      return this.errors.all().length > 0;
    }
  },
  methods: {
    confirmPassword() {
      this.$validator.validate().then(valid => {
        console.log(
          valid,
          this.errors.all(),
          this.errors.collect(),
          this.fields
        );
        if (valid) {
          console.log(this.validateForm, "stating......");
          this.$store
            .dispatch("user/forgetPassword", this.validateForm)
            .then(res => {
              const { status, msg } = res.data;
              // Toast(msg)
              if (status !== 1) {
                return;
              }
              this.$router.push({ path: "/login" });
            });
        }
      });
    },
    getCode() {
      this.$validator.validate("phone").then(valid => {
        if (valid) {
          const { phone } = this.validateForm;
          sendcode({ phone })
            .then(res => {
              Toast(res.data.msg);
            })
            .catch(() => {
              this.$refs.sms.reset();
            });
        } else {
          this.$refs.sms.reset();
        }
      });
    }
  },
  created() {}
};
</script>

<style lang='scss'>
$border-color: #e5e5e5;

.input-active .mint-field-core {
  background-color: inherit;
  color: #000;
}
.input-active {
  border-bottom: 1px solid $border-color;
  margin: auto;
}
.input-active:active,
.input-active:hover {
  border-color: transparent;
  border-bottom-color: $border-color;
}
.input-active .mint-cell-wrapper {
  background-image: inherit;
  padding: 0 0 0 10px;
}
.input-active .login-input-icon {
  color: $theme-color;
  width: 1.5em;
  height: 1.5em;
}
.btn-top {
  margin-top: 10px;
}
.error {
  color: #ef4f4f;
  text-align: left;
}
</style>
