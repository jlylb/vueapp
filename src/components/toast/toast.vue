<template>
  <transition name="mint-toast-pop">
    <div class="mint-toast" v-show="visible" :class="customClass">
      <i class="mint-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="mint-toast-text">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
import toast from "mint-ui/packages/toast/src/toast.vue";
export default {
  extends: toast
};
</script>

<style>
.mint-toast {
  padding: 0.5rem;
}
</style>
