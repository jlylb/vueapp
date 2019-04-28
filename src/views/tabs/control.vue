<template>
  <div class="layout-container">
    <top-component></top-component>
    <mt-cell title="放电管理">
      <mt-button type="primary" @click="release">放电</mt-button>
    </mt-cell>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import Toast from "@/components/toast/toast.js";

export default {
  methods: {
    release() {
      MessageBox.confirm(`确定执行吗?`)
        .then(action => {
          Toast("执行成功");
        })
        .catch(() => {
          Toast("已取消执行");
        });
    }
  }
};
</script>

<style>
</style>
