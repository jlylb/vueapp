<template>
  <mt-popup v-model="isOpen" class="progress-modal" :close-on-click-modal="false">
    <h1 class="progress-header">{{ title }}</h1>
    <div class="progress-content">
      <div class="progress-msg">{{ msg }}</div>
      <mt-progress :value="per">
        <div slot="start">{{ start }}</div>
        <div slot="end">{{ end }}</div>
      </mt-progress>
    </div>
  </mt-popup>
</template>

<script>
export default {
  props: {
    pervalue: {
      type: [String, Number],
      default: 0
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      per: 0,
      isOpen: false,
      title: "更新提示",
      msg: "正在下载更新文件，请稍候......",
      start: "0%",
      end: "100%"
    };
  }
};
</script>

<style lang="scss" scoped>
.progress-modal {
  width: 90%;
  min-height: 120px;
}
.progress-header {
  padding: 10px 0;
  font-weight: bold;
  text-align: center;
  font-size: 18px;
  border-bottom: 1px solid #f1f1f1;
}
.progress-msg {
  text-align: center;
  margin: 10px 0;
}
.progress-content {
  width: 90%;
  margin: 0 auto;
}
</style>
