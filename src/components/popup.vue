<template>
  <mt-popup v-model="popupVisible" class="popup-device" position="bottom">
    <slot>
      <mt-picker
        :show-toolbar="showToolbar"
        :slots="slots"
        ref="picker1"
        @change="slotsChange"
        :value-key="showKey"
      >
        <span @click="cancelButton" class="w50">取消</span>
        <span @click="okButton" class="w50">确定</span>
      </mt-picker>
    </slot>
  </mt-popup>
</template>

<script>
export default {
  data() {
    return {
      popupVisible: this.open
    };
  },
  props: {
    value: null,
    open: {
      type: Boolean,
      default: false
    },
    showToolbar: {
      type: Boolean,
      default: false
    },
    slots: {
      type: Array,
      default() {
        return [];
      }
    },
    showKey: {
      type: String,
      default: "label"
    }
  },
  watch: {
    open(newVal) {
      this.popupVisible = newVal;
    },
    popupVisible(newval) {
      this.$emit("update:open", newval);
    },
    slots(newval) {
      console.log("slots........", newval);
      this.$nextTick(function() {
        const picker = this.$refs.picker1;
        if (this.value) {
          // if (this.isObject(this.value)) {
          //   // this.slots[0].defaultIndex = this.getSlotIndex(
          //   //   this.value,
          //   //   this.slots[0].values
          //   // );
          //   picker.setSlotValue(0, this.value);
          // } else {
          //   picker.setSlotValue(0, this.value);
          // }
          this.$emit("input", this.value);
        } else {
          this.$emit("input", picker.getValues()[0]);
        }
      });
    },
    value(newval) {
      console.log("value........", newval);

      // this.$refs.picker1.setSlotValue(0, newval);
    }
  },
  methods: {
    slotsChange(picker, values) {
      console.log(values, ".............costom pick1", picker.getValues()[0]);
      this.$emit("input", values[0]);
      this.$emit("input-change", values[0]);
    },
    cancelButton() {
      this.popupVisible = false;
      this.$emit("cancel");
    },
    okButton() {
      this.$emit("confirm");
    }
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
.toolbar {
  display: flex;
}
</style>