<template>
  <div :class="['icon-background', {'icon-background-small': small}]">
    <slot name="icon">
      <svg-icon :icon-class="icon" :class="['item-icon', {'item-icon-small': small}]" v-if="icon"></svg-icon>
    </slot>
    <span class="item-icon" v-if="$slots.default">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "icon-bg",
  props: {
    icon: {
      type: String,
      default() {
        return "";
      }
    },
    small: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang='scss'>
</style>
