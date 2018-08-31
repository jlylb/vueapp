<template>
  <!-- <div class='dapeng'>
    <div class='dapeng-item' v-for='(item, index) in items' :key='index'>
      <div class='dapeng-item-img'>
        <img :src='item.image'>
      </div>
      <div class='dapeng-item-desc'>
        {{ index+1 }}号大棚
      </div>  
    </div>
  </div> -->
  <!-- <div class='wrap-container' :style='{overflow: "auto"}'> -->
  <mu-container :style='{overflow: "auto"}'>
    <top-component></top-component> 
  <mu-flex justify-content="center">
 <mu-paper :z-depth="1">
      <mu-grid-list class="gridlist-demo">
        <mu-grid-tile v-for="(tile, index) in items" :key="index">
          <img :src="tile.image" >
          <span slot="title">{{ index+1 }}号大棚</span>
          <mu-button slot="action" icon @click='openPeng(tile)' color="#fff">
            <svg-icon icon-class='monitor' class='item-icon'></svg-icon>
          </mu-button>
        </mu-grid-tile>
      </mu-grid-list>
 </mu-paper>
  </mu-flex>

  <mu-bottom-sheet :open.sync="open" class='sheet'>
    <mu-list @item-click="closeBottomSheet">
      <mu-sub-header>选择监测设备</mu-sub-header>
      <mu-list-item button to='/monitor/shebei'>
        <mu-list-item-action>
          <svg-icon icon-class='temp' class='item-icon'></svg-icon>
        </mu-list-item-action>
        <mu-list-item-title>空气温室度传感器</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-action>
          <svg-icon icon-class='light' class='item-icon'></svg-icon>
        </mu-list-item-action>
        <mu-list-item-title>光照度传感器</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-action>
         <svg-icon icon-class='co2' class='item-icon'></svg-icon>
        </mu-list-item-action>
        <mu-list-item-title>二氧化碳传感器</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-action>
          <svg-icon icon-class='soil' class='item-icon'></svg-icon>
        </mu-list-item-action>
        <mu-list-item-title>土壤墒情传感器</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-action>
          <svg-icon icon-class='liquid' class='item-icon'></svg-icon>
        </mu-list-item-action>
        <mu-list-item-title>液位传感器</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-action>
          <svg-icon icon-class='shexiangtou' class='item-icon'></svg-icon>
        </mu-list-item-action>
        <mu-list-item-title>IP摄像头</mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </mu-bottom-sheet>
</mu-container>
<!-- </div> -->
</template>

<script>
import { fetchList } from '@/api/monitor'

export default {
  data() {
    return {
      items: [],
      open: false
    }
  },
  methods: {
    openPeng(tile) {
      //this.$router.push({ name: 'shebei'})
      this.open = true
    },
    closeBottomSheet(val, val1) {
      console.log(val, val1)
    }
  },
  created() {
    fetchList().then((res) => {
      this.items = res.data.items
    })
  }

}
</script>

<style lang='scss' scoped>
.dapeng {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  & .dapeng-item-img {
    display: inline-block;
    height: 150px;
    padding: 0 10px;
  }
  & .dapeng-item {
    width: 50%;
  }
  .wrap-container {
    overflow: auto;
  }
}
.sheet .mu-item-action {
  justify-content: center;
  color: inherit;
}
</style>
