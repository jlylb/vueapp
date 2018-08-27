<template>
    <div>
        <mt-button type="primary" @click='gologin'>login</mt-button>
    </div>
</template>

<script>
export default {
    methods: {
       gologin() {
           this.$router.push({name: 'login'})
       } 
    },
    created() {
        this.$store.commit('app/BAR_TITLE', '我的')
    }
}
</script>

<style>

</style>