<template>
    <div>
        <mt-button type="primary" @click='gologin("login")'>login</mt-button>
         <mt-button type="primary" @click='gologin("login2")'>login2</mt-button>
          <mt-button type="primary" @click='gologin("login3")'>login3</mt-button>
    </div>
</template>

<script>
export default {
    methods: {
       gologin(name) {
           this.$router.push({name})
       } 
    },
    created() {
        this.$store.commit('app/BAR_TITLE', '我的')
    }
}
</script>

<style>
</style>