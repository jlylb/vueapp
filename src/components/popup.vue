<template>
  <mt-popup
    v-model="popupVisible"
    class='popup-device'
    position="bottom">
    <slot>
      <mt-picker 
        :slots="slots"
        ref='picker1' 
        @change="slotsChange" 
        value-key='label'>
      </mt-picker>
    </slot>

  </mt-popup>
</template>

<script>
export default {
  data() {
    return {
      popupVisible: this.open
    }
  },
  props: 
    {
      value: null, 
      open: {
        type: Boolean,
        default: false,
      },
      slots: {
        type: Array,
        default() {
          return []
        }
      }
    },
  watch: {
    open(newVal) {
      this.popupVisible = newVal
    },
    popupVisible(newval) {
      this.$emit('update:open', newval)
    },
    slots(newval) {
       console.log('slots........', newval)
      this.$nextTick(function(){
        const picker = this.$refs.picker1
       this.value && picker.setSlotValue(0, this.value) || this.$emit('input', picker.getValues()[0])
      })
    },
    value(newval) {
      console.log('value........', newval)
    },
  },
  methods: {
    slotsChange(picker, values) {
      console.log(values, '.............costom pick1', picker.getValues()[0])
      this.$emit('input', values[0])
    }
  },
  mounted() {
 
  }

}
</script>

<style>
</style>
