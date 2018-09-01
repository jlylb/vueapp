<template>
  <mt-popup
    v-model="popupVisible"
    class='popup-device'
    position="bottom">

    <div class='device-list'>
      <div class='device-list-item'>

        <svg-icon icon-class='temp' class='item-icon'></svg-icon>

        <div class='device-list-item-title'>工作状态</div>

        <div class='device-list-item-title'>设备状态</div>
        
        <div class='device-list-item-action'>
        </div>

      </div>
    </div>

  </mt-popup>
</template>

<script>
export default {

}
</script>

<style>
</style>
