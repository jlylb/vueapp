<template>
  <div class='layout-container'>
    <top-component></top-component>
      <mt-field type='textarea' v-model="content" rows='5' placeholder='请输入内容'>
      </mt-field>
      <mt-button size="large" type='primary'>保存</mt-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style>
</style>