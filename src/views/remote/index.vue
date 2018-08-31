<template>
  <div class='layout-container'>

    <mt-cell title="选择大棚" is-link @click.native="changePeng">
      <span style="color: green">{{ peng }}</span>
    </mt-cell>

    <div class='device-list'>
      <div class='device-list-item'>
         <mt-cell title="工作状态">
          停止
        </mt-cell>
        <mt-cell title="设备状态">
          正常
        </mt-cell>
      </div>
    </div>

  <mt-popup
    v-model="popupVisible"
    class='popup-device'
    position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange" :showToolbar='true' ref='picker1'>
        选择大棚
        <div class='item-left'>
          <span @click='selectPeng'>确定</span>
        </div>
      </mt-picker>
  </mt-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      popupVisible: false,
      slots: [
        {
          flex: 1,
          values: ['201501', '201502', '201503', '201504', '201505', '201506'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      peng: null,
      isChangeDevice: false,
      workStatus: true
    }
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0]) {
        picker.setSlotValue(1, values[0]);
        this.peng = values[0]
        this.isChangeDevice = true
      }
    },
    changePeng() {
      this.popupVisible = true
    },
    selectPeng() {

    }
  }

}
</script>

<style lang='scss' scoped>
.layout-container {
  width: 100%;
  padding: 5px;
}
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
