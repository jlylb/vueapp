<template>
  <span>
    <component :is="spinner"></component>
  </span>
</template>
<script>
import { Spinner } from "mint-ui";
export default {
  extends: Spinner,
  components: {
    SpinnerSnake: require("./spinner/snake.vue").default,
    SpinnerDoubleBounce: require("./spinner/double-bounce.vue").default,
    SpinnerTripleBounce: require("./spinner/triple-bounce.vue").default,
    SpinnerFadingCircle: require("./spinner/fading-circle.vue").default
  },
  props: {
    size: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style>
</style>
