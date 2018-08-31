<template>
 <mt-header :title="barTitle" fixed>
     <template slot='left'>
        <slot name='left'>
            <mt-button icon="back" @click="goBack"  v-if='isShow'>返回</mt-button>
        </slot>
     </template>
    <template slot='right'>
        <slot name='right'>
            <mt-button icon="more" slot="right"></mt-button>
        </slot>
     </template>
    
  </mt-header>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('app',[
      'barTitle'
    ]),
    isShow() {
      return this.$route.name !=='tab_home'
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
}
</script>

<style>

</style>
