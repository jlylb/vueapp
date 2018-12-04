<template>
  <mt-popup v-model="popupVisible" class="popup-device" position="bottom">
    <slot>
      <mt-picker
        :slots="slots"
        ref="picker1"
        :show-toolbar="true"
        @change="slotsChange"
        :value-key="showKey"
      >
        <span @click="cancelButton" class="w50">取消</span>
        <span type="default" @click="okButton" class="w50">确定</span>
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
      console.log("slots........", newval, this.value);
      this.$nextTick(function() {
        const picker = this.$refs.picker1;
        if (this.value[0] && this.value[1]) {
          if (this.isObject(this.value[0])) {
            this.slots[0].defaultIndex = this.getSlotIndex(
              this.value[0],
              this.slots[0].values
            );
            this.slots[2].defaultIndex = this.getSlotIndex(
              this.value[1],
              this.slots[2].values
            );
          } else {
            picker.setSlotValue(0, this.value[0]);
            picker.setSlotValue(1, this.value[1]);
          }
          this.$emit("input", this.value);
        } else {
          this.$emit("input", picker.getValues());
        }
      });
    },
    value(newval) {
      console.log("value........", newval);
    }
  },
  methods: {
    slotsChange(picker, values) {
      console.log(values, ".............costom pick1", picker.getValues());
      this.$emit("input", values);
      this.$emit("inputChange", values, picker);
    },
    cancelButton() {
      this.popupVisible = false;
    },
    okButton() {
      this.$emit("confirm");
    },
    isObject(val) {
      let isBool = false;
      if (val instanceof Array) {
        isBool = true;
      } else if (val instanceof Object) {
        isBool = true;
      }
      return isBool;
    },
    getSlotIndex(first, data) {
      for (let index in data) {
        let { label, value } = data[index];
        if (first.label === label && first.value == value) {
          return Number(index);
        }
      }
      return 0;
    }
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
.toolbar {
  display: flex;
}
.w50 {
  width: 50%;
  border-radius: 0;
  display: inline-block;
  border: 0;
  color: inherit;
  font-size: 18px;
  height: 41px;
  outline: 0;
  overflow: hidden;
  position: relative;
  text-align: center;
  line-height: 41px;
  border-bottom: 1px solid rgb(245, 245, 245);
  // cursor: pointer;
}
</style>
