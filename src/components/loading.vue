<template>
  <transition name="loading-indicator">
    <div class="loading-indicator" v-show="visible">
      <div class="loading-indicator-wrapper" :style="{ 'padding': text ? '20px' : '15px' }">
        <mt-spinner class="loading-indicator-spin" :type="convertedSpinnerType" :size="32"></mt-spinner>
        <span class="loading-indicator-text" v-show="text">{{ text }}</span>
      </div>
      <div class="loading-indicator-mask" @touchmove.stop.prevent></div>
    </div>
  </transition>
</template>

<style lang='scss'>
.loading {
  &-indicator {
    transition: opacity 0.2s linear;
    &-wrapper {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      box-sizing: border-box;
      text-align: center;
      z-index: 3000;
    }
    &-text {
      display: block;
      color: #fff;
      text-align: center;
      margin-top: 10px;
      font-size: 16px;
    }
    &-spin {
      display: inline-block;
      text-align: center;
    }
    &-mask {
      position: fixed;
      left: 0;
      top: 0;
      size: 100%;
      opacity: 0;
      background: transparent;
      z-index: 3000;
    }
  }
}
.loading-indicator-enter,
.loading-indicator-leave-active {
  opacity: 0;
}
</style>

<script>
 
  export default {
    data() {
      return {
        
      };
    },
    components: {
      // Spinner
    },
    computed: {
      convertedSpinnerType() {
        switch (this.spinnerType) {
          case 'double-bounce':
            return 1;
          case 'triple-bounce':
            return 2;
          case 'fading-circle':
            return 3;
          default:
            return 0;
        }
      }
    },
    props: {
      visible: false,
      text: String,
      spinnerType: {
        type: String,
        default: 'snake'
      }
    }
  };
</script>