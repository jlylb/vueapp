<template>
  <div class="layout-container">
    <top-component></top-component>

    <my-input
      disable-clear
      placeholder="请输入原密码"
      data-vv-name="password"
      class="input-active"
      v-validate="{ required: true, min: 6 }"
      type="password"
      autocomplete="off"
      key="password"
      v-model="validateForm.password"
    >
      <svg-icon icon-class="new-password" class="login-input-icon" slot="prepend"></svg-icon>
    </my-input>
    <div class="error" v-if="errors.has('password')">{{ errors.first("password") }}</div>

    <my-input
      disable-clear
      placeholder="请输入新密码"
      data-vv-name="new_password"
      class="input-active"
      v-validate="{ required: true, min: 6 }"
      type="password"
      autocomplete="off"
      key="new_password"
      v-model="validateForm.new_password"
    >
      <svg-icon icon-class="new-password" class="login-input-icon" slot="prepend"></svg-icon>
    </my-input>
    <div class="error" v-if="errors.has('new_password')">{{ errors.first("new_password") }}</div>

    <my-input
      disable-clear
      placeholder="确认新密码"
      data-vv-name="new_password_confirmation"
      class="input-active"
      v-validate="{ required: true, min: 6 }"
      type="password"
      autocomplete="off"
      key="new_password_confirmation"
      v-model="validateForm.new_password_confirmation"
    >
      <svg-icon icon-class="confirm-password" class="login-input-icon" slot="prepend"></svg-icon>
    </my-input>
    <div
      class="error"
      v-if="errors.has('new_password_confirmation')"
    >{{ errors.first("new_password_confirmation") }}</div>

    <mt-button
      size="large"
      type="primary"
      class="btn-top"
      @click.native="confirmPassword"
      :disabled="btnDisabled"
    >确定</mt-button>
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
        password: "123456",
        new_password: "123456",
        new_password_confirmation: "123456"
      }
    };
  },
  computed: {
    btnDisabled() {
      return this.errors.all().length > 0;
    }
  },
  methods: {
    confirmPassword() {
      this.$validator.validate().then(valid => {
        if (valid) {
          console.log(this.validateForm, "stating......");
          this.$store.dispatch("user/password", this.validateForm).then(res => {
            const { status, msg } = res.data;
            // Toast(msg)
            if (status !== 1) {
              return;
            }
            Toast(msg);
            this.$router.push({ path: "/login" });
          });
        }
      });
    }
  },
  created() {}
};
</script>

<style lang='scss' scoped>
$border-color: #e5e5e5;
.input-active /deep/ .mint-field-core {
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
.input-active /deep/ .mint-cell-wrapper {
  background-image: inherit;
  padding: 0 0 0 10px;
}
.input-active /deep/ .login-input-icon {
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
