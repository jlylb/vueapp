<template>
  <transition name="nt-fade">
    <div class="nt-loading" v-if="visible">
      <mt-spinner type="fading-circle"></mt-spinner>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.nt-loading {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  align-items: center;
  top: 0;
}
.nt-fade-enter-active,
.nt-fade-leave-active {
  transition: opacity 1s;
}
.nt-fade-enter,
.nt-fade-leave-to {
  opacity: 0;
}
</style>
