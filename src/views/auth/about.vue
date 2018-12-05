<template>
  <div class="layout-container">
    <top-component></top-component>
    <div>{{ companyName }}</div>
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

<style>
</style>
