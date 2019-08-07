<template>
  <div class="grid-item">
    <div class="grid-item-top">
      <div class="grid-item-icon">
        <slot name="icon">
          <icon-bg :icon="item.icon" slot="icon"></icon-bg>
        </slot>
      </div>
      <div class="grid-item-tool">
        <slot name="tool"></slot>
      </div>
    </div>
    <div class="grid-item-bottom">{{ item.label }}</div>
  </div>
</template>

<script>
import IconBg from "@/components/iconBg";
export default {
  components: {
    IconBg
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss">
.grid-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.grid-item-top {
  display: flex;
  align-items: center;
  min-height: 70px;
}
.grid-item-bottom {
  color: $theme-color;
  padding: 2px 0;
}
</style>
