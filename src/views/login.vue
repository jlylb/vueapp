<template>

    <div class='home-content'>
        <mt-header :title="'登录'" fixed>
            <router-link to="/" slot="left">
            <mt-button icon="back">back</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <mt-field label="username" placeholder="Input username" :model="username"></mt-field>
        <mt-field label="password" placeholder="Input password" type="password" :modal="password"></mt-field>
        <mt-button type="primary" size="large">primary</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    created() {
        this.$store.commit('app/BAR_TITLE', '登录')
    }
}
</script>

<style>
.home-content {
  margin-top: 60px;
}
</style>
