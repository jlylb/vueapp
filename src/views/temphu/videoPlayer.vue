<template>
    <div class='layout-container'>
        <top-component></top-component>
        <video-component :src='src'></video-component>
    </div>
</template>

<script>
import videoComponent from '@/components/video.vue';

export default {
    components: {
        videoComponent
    },
    data() {
        return {
            src: ''
        }
    },
    created() {
        this.src = this.$route.params.url
    }
}
</script>

<style>

</style>
