<template>
    <div>
       <top-component></top-component> 
    </div>
</template>

<script>
export default {
    created() {
        this.$store.commit('app/BAR_TITLE', '发现')
    }
}
</script>

<style>

</style>