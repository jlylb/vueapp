<template>
  <div class="picker-toolbar">
    <span class="mint-datetime-action mint-datetime-cancel" @click="cancel">{{ cancelText }}</span>
    <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">{{ confirmText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    cancelText: {
      type: String,
      default: "取消"
    },
    confirmText: {
      type: String,
      default: "确定"
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
    }
  }
};
</script>

<style lang="scss">
</style>
