<template>
  <div class="picker-toolbar">
    <span class="mint-datetime-action mint-datetime-cancel" @click="cancel">取消</span>
    <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
  </div>
</template>

<script>
export default {
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

<style>
</style>
