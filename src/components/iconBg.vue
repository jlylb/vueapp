<template>
  <div :class="['icon-background', {'icon-background-small': small}]">
    <slot name="icon">
      <svg-icon :icon-class="icon" :class="['item-icon', {'item-icon-small': small}]" v-if="icon"></svg-icon>
    </slot>
    <span class="item-icon">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
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

<style lang='scss' scoped>
$normal: 40px;
$small: 24px;
$normal-icon: 1.8em;
$small-icon: 1em;
.icon-background {
  width: $normal;
  height: $normal;
  border: 1px solid $blue;
  border-radius: 50%;
  background-color: darken($blue, 30%);
  text-align: center;
  position: relative;
  display: inline-block;
  margin-right: 5px;
  &-small {
    width: $small;
    height: $small;
  }
  /deep/ .item-icon {
    height: $normal-icon;
    width: $normal-icon;
    line-height: $normal-icon;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    &-small {
      width: $small-icon;
      height: $small-icon;
      line-height: $small-icon;
    }
  }
}
</style>
