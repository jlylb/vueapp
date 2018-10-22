<template>

    <div class='login-container' id='login-container'> 
        <div class='login-cover' id='login-cover'>
            <div class='home-content'>
                <div class='logo'>
                    <svg-icon icon-class="user" class='logo-icon'></svg-icon>
                </div>
            
             <my-input 
             placeholder="请输入用户名"
             data-vv-name='username'
             v-validate="{ required: true}"  
             v-model="validateForm.username">
              <svg-icon icon-class="user" class='login-input-icon' slot='prepend'></svg-icon>
             </my-input>
             <div class='error' v-if='errors.has("username")'>{{ errors.first("username") }}</div>
             <my-input 
             placeholder="请输入密码"
             data-vv-name='password'
             v-validate="{ required: true, min: 6 }" 
             type="password"
             autocomplete="off" 
             v-model="validateForm.password">
              <svg-icon icon-class="password"  class='login-input-icon' slot='prepend'></svg-icon>
             </my-input>
              <div class='error' v-if='errors.has("password")'>{{ errors.first("password") }}</div>
              <mt-button size="large" type="primary" @click='handleLogin'>登  录</mt-button>

                <a class='forget-password'>
                    忘记密码?
                </a>
            </div>
        </div>
    </div>

</template>

<script>
import MyInput from "@/components/myinput";
export default {
  components: { MyInput },
  data() {
    return {
      // username: "username1",
      // password: "123456",
      validateForm: {
        username: "username1",
        password: "123456"
      }
    };
  },
  methods: {
    handleLogin() {
      this.$validator.validate().then((valid) => {
        console.log(valid,this.errors.all(), this.errors.collect(), this.fields)
        if(valid) {
          console.log(this.validateForm)
          this.$store.dispatch('user/LoginByUsername', this.validateForm)
          .then((res) => {
              console.log(res, 333333333)
              this.$router.push({ path: "/tab_home" });
          })
          
        }
      })

    }
  },
  computed: {

  },
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

<style lang='scss' scoped>
.login-container {
  background-image: url('../assets/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-cover {
  background: rgba(0, 0, 0, 0.5);
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
  width: 100%;
}
.logo {
  width: 200px;
  height: 200px;
  text-align: center;
  margin: 0 auto;
  background-color: bisque;
  border-radius: 50%;
  border: 5px solid #fff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo /deep/ .logo-icon {
  width: 150px;
  height: 150px;
  color: #fff;
}
.input {
  margin: 10px 0;
  background-color: transparent;
  color: #fff;
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
</style>
