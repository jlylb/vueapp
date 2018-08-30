<template>

    <div class='login-container'> 
        <div class='login-cover'>
            <div class='home-content'>
                <div class='logo'>
                    <svg-icon icon-class="user" class='logo-icon'></svg-icon>
                </div>

<!-- <mu-container>

    <mu-text-field 
      v-model="validateForm.username"
      label='username' 
      full-width
      label-float 
      prop="username">
      </mu-text-field>
  
    
    <mu-text-field
    label='password' 
    type="password"  
    label-float 
    full-width
    v-model="validateForm.password" 
    prop="password">
    <svg-icon icon-class="password"  class='login-icon' slot='prepend'></svg-icon>
    </mu-text-field>
  
  
      <mu-button 
      color="primary" 
      full-width
      @click="handleLogin">提交</mu-button>
    

</mu-container> -->


                <!-- <mt-field  placeholder="请输入用户名" v-model="username" data-vv-name='username' v-validate="'required|email'">
                     <svg-icon icon-class="user" class='login-icon'></svg-icon>
                </mt-field>
            
                <mt-field  placeholder="请输入密码" type="password" v-model="password">
                     <svg-icon icon-class="password"  class='login-icon'></svg-icon>
                </mt-field> -->

               

             <my-input 
             placeholder="请输入用户名"  
             v-model="username"
             >
              <svg-icon icon-class="user" class='login-input-icon' slot='prepend'></svg-icon>
             </my-input>

             <my-input 
             placeholder="请输入密码" 
             type="password"
             autocomplete="off" 
             v-model="password">
              <svg-icon icon-class="password"  class='login-input-icon' slot='prepend'></svg-icon>
             </my-input>

              <mt-button size="large" type="primary" @click='handleLogin'>primary</mt-button>

                <a class='forget-password'>
                    忘记密码?
                </a>
            </div>
        </div>
    </div>

</template>

<script>
import MyInput from '@/components/myinput'
export default {
    components: { MyInput },
    data() {
        return {
            username: 'username1',
            password: '123456',
            eye: { open: false, reverse: false },
            visibility: false,
            validateForm: {
                username: '',
                password: '',
                isAgree: false
            }
        }
    },
    methods: {
        handleLogin() {
            this.$router.push({ path: '/' })
        }
    },
    created() {
      
    }
}
</script>

<style lang='scss' scoped>
body, html {
    height: 100%;
}
#app {
    height: 100%;
}
.login-container {
    background-image: url('../assets/bg.png');
    background-repeat:no-repeat; 
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-cover {
    background: rgba(0,0,0,0.5);
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
    margin-bottom: 120px;
}
.logo /deep/ .logo-icon {
    width: 200px;
    height: 200px; 
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

</style>
