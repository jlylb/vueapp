<template>
  <div class="my-switch">
    <label v-if="falseLabel" :class="{ 'gray': status }">{{ falseLabel }}</label>
    <mt-switch v-model="status" @change="change" :disabled="disabled"></mt-switch>
    <label v-if="trueLabel" :class="{ 'gray': status == false }">{{ trueLabel }}</label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: this.sstatus
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    sstatus: {
      type: Boolean,
      default: false
    },
    trueLabel: {
      type: String,
      default: ""
    },
    falseLabel: {
      type: String,
      default: ""
    }
  },
  computed: {
    falsegray() {
      return this.status;
    },
    truegray() {
      return this.status == false;
    }
  },
  watch: {
    sstatus(newVal) {
      this.status = newVal;
    },
    status(newVal) {
      this.$emit("update:sstatus", newVal);
    }
  },
  methods: {
    change(val) {
      console.log(val, this.status, "my switch......");
      this.$emit("switch-change", this.status);
    }
  }
};
</script>

<style lang="scss" scoped>
.my-switch {
  display: flex;
  align-items: center;
  label {
    color: darken($blue, 30%);
    display: inline-block;
    margin: 0 2px;
    &.gray {
      color: #ccc;
    }
  }
}
</style>
