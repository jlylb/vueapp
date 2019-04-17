<template>
  <div class="about">
    <top-component></top-component>
    <mt-cell :title="companyName"></mt-cell>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", ["companyName"])
  }
};
</script>

<style lang="scss">
.about {
  width: 100%;
  padding: 0 5px;
  overflow-y: auto;
  overflow-x: auto;
  .mint-cell-title {
    text-align: center;
  }
}
</style>
