<template>
    <div>
        home
    </div>
</template>

<script>
export default {
    created() {
        this.$store.commit('app/BAR_TITLE', '首页')
    }
}
</script>

<style>

</style>
