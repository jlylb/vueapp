<template>
  <div class='layout-container'>
    <top-component></top-component>
    <mt-cell title="公司名称">
        <svg-icon icon-class='company' class='item-icon' slot='icon'></svg-icon>
        武汉盛世奈特科技有限公司
    </mt-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
      ...mapState('user', [
          'companyName',
      ])
  },
}
</script>

<style>
</style>