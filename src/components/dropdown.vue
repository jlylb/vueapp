<template>
  <mt-popup
    v-model="isDrop"
    class='popup-menu'
    popup-transition="popup-fade">
      <mt-cell 
        :title="item.label" 
        v-for='(item, index) in data' 
        :key='item.label' 
        :class='{ "active-menu": menuIndex==index }'
        @click.native='openPop(item, $event, index)'>
      </mt-cell>
  </mt-popup>
</template>

<script>
export default {
  data() {
    return {
      isDrop: this.open,
      menuIndex: 0
    }
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    open(newVal) {
      this.isDrop = newVal
    },
    isDrop(newVal) {
      this.$emit('update:open', newVal)
    },
  },
  methods: {
    openPop(data, e, index) {
      this.menuIndex = index
      this.$emit('menuItem', data, e)
    }
  },
}
</script>

<style lang='scss' scoped>
.active-menu {
  background-color: $blue;
  /deep/ .mint-cell-text {
    color: #fff;
  }
}
</style>
