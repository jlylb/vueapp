<template>
  <mt-header :title="title||barTitle" fixed>
    <template slot="left">
      <slot name="left">
        <mt-button icon="back" @click="goBack" v-if="isShow">返回</mt-button>
      </slot>
    </template>
    <template slot="right">
      <slot name="right">
        <!-- <mt-button icon="more" slot="right" @click='goClick'></mt-button> -->
      </slot>
    </template>
  </mt-header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["title"],
  computed: {
    ...mapGetters("app", ["barTitle"]),
    isShow() {
      return this.$route.name !== "tab_home";
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goClick() {
      console.log("trigger menu...");
      this.$emit("top-btn");
    }
  }
};
</script>

<style>
</style>
