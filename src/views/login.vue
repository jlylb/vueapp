<template>

    <div class='login-container'> 
        <div class='login-cover'>
            <div class='home-content'>
                <div class='logo'>
                    <svg-icon icon-class="user" class='logo-icon'></svg-icon>
                </div>

                <cube-input v-model="username" class='input'  :placeholder="'请输入账号'" clearable>
                    <svg-icon icon-class="user" slot='prepend' class='login-icon'></svg-icon>
                </cube-input>

                <cube-input v-model="password" type='password'  :eye="eye" class='input' :placeholder="'请输入密码'" clearable>
                    <svg-icon icon-class="password" slot='prepend' class='login-icon'></svg-icon>
                </cube-input>

                <cube-button :primary="true" @click='handleLogin'>登  录</cube-button>

                <a class='forget-password'>
                    忘记密码?
                </a>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            username: 'username1',
            password: '123456',
            eye: { open: false, reverse: false },
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
.home-content /deep/ .login-icon {
    width: 2em;
    height: 2em; 
    color: #fff;
}
.home-content /deep/ .cube-input-field {
    color: #fff;
}
</style>
