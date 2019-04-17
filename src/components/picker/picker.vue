<template>
  <div class="picker" :class="{ 'picker-3d': rotateEffect }">
    <div class="picker-toolbar" v-if="showToolbar">
      <slot></slot>
    </div>
    <div class="picker-items">
      <picker-slot
        v-for="(slot, slotIndex) in slots"
        :valueKey="valueKey"
        :key="slotIndex"
        :values="slot.values || []"
        :text-align="slot.textAlign || 'center'"
        :visible-item-count="visibleItemCount"
        :class-name="slot.className"
        :flex="slot.flex"
        v-model="values[slot.valueIndex]"
        :rotate-effect="rotateEffect"
        :divider="slot.divider"
        :content="slot.content"
        :itemHeight="itemHeight"
        :default-index="slot.defaultIndex"
      ></picker-slot>
      <div
        class="picker-center-highlight"
        :style="{ height: itemHeight + 'rem', marginTop: -itemHeight / 2 + 'rem' }"
      ></div>
    </div>
  </div>
</template>

<script>
import MyPicker from "mint-ui/packages/picker/src/picker.vue";
import MyPickerSlot from "./picker-slot.vue";
export default {
  extends: MyPicker,
  components: {
    PickerSlot: MyPickerSlot
  },
  props: {
    itemHeight: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style>
</style>
