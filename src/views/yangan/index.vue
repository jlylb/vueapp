<template>
  <div class='layout-container'>

    <top-component></top-component> 

    <mt-cell :title="`${index + 1}号大棚`" is-link :to='{name: "remote_device"}' v-for='(item, index) in dapeng' :key='index'>
      <span style="color: green">正常</span>
      <svg-icon icon-class='dapeng' class='item-icon' slot='icon'></svg-icon>
    </mt-cell>

  </div>
</template>

<script>
export default {
  data() {
    return {

      dapeng: [
        '201501', '201502', '201503', '201504', '201505', '201506'
      ],

    }
  },
  methods: {


  },
  created() {
    
  }

}
</script>

<style lang='scss' scoped>
.layout-container /deep/ .popup-device {
  width: 100%;
}
.popup-device /deep/ .picker-toolbar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  justify-content: center;
}

.item-left {
  position: absolute;
  right: 10px;
  display: inline-block;
  color: #26a2ff;
}
.popup-device /deep/ .slot1 {
  text-align: center;
}
.layout-container /deep/ .mint-cell-title {
  text-align: left;
}
</style>
