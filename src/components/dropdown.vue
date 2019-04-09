<template>
  <mt-popup v-model="isDrop" class="popup-menu" v-bind="popProp" popup-transition="popup-fade">
    <mt-cell
      :title="item.label"
      v-for="(item, index) in data"
      :key="'dropdown' + index"
      :class="{ 'active-menu': isActive && (active? active===item.value : menuIndex==index ) }"
      @click.native="openPop(item, $event, index)"
    >
      <svg-icon :icon-class="item.icon" class="item-icon" slot="icon" v-if="item.icon"></svg-icon>
      <span v-if="showLabel" style="color: green">{{ item.value }}</span>
    </mt-cell>
  </mt-popup>
</template>

<script>
export default {
  data() {
    return {
      isDrop: this.open,
      menuIndex: 0
    };
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    open: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    active: {
      type: [String, Number],
      default: null
    },
    popProp: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    open(newVal) {
      this.isDrop = newVal;
    },
    isDrop(newVal) {
      this.$emit("update:open", newVal);
    }
  },
  methods: {
    openPop(data, e, index) {
      this.menuIndex = index;
      this.$emit("menuItem", data, e);
    }
  }
};
</script>

<style lang='scss'>
.active-menu {
  background-color: $blue;
  .mint-cell-text {
    color: #fff;
    vertical-align: inherit;
  }
  .item-icon,
  span {
    color: #fff;
  }
}
.popup-menu {
  .mint-cell-text {
    vertical-align: inherit;
  }
}
</style>
