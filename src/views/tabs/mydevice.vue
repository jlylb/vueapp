<template>
   <div class='layout-container'>

    <top-component>
      <span slot='right' @click='openAdd'>添加</span>
    </top-component> 

    <mt-cell 
    :title="item.name" 
    :label="item.type"
    @click.native='openDevice(item)' 
    is-link 
    v-for='(item, index) in device' 
    :key='index'>

    </mt-cell>

  <mt-popup
    v-model="popupDetail"
    class='popup-device'
    position="bottom">

    <mt-cell title="设备名称">
      {{ item.name }}
    </mt-cell>

    <mt-cell title="设备类型">
      {{ item.type }}
    </mt-cell>

  </mt-popup>

  <mt-popup
    v-model="popupVisible"
    ref='addDevice'
    class='popup-device add-device'
    :close-on-click-modal='false'
    popup-transition="popup-fade">

    <mt-field label="设备编号" placeholder="请输入设备编号" v-model="deviceModel.pdi"></mt-field>

    <mt-field label="设备分类" placeholder="请输入设备分类" v-model="deviceModel.type" @click.native="openType"></mt-field>

    <mt-field label="区域" placeholder="请选择区域" v-model="deviceModel.area" @click.native="openArea"></mt-field>

    <mt-cell title="">
        <mt-button type="primary" @click='save'>保存</mt-button> 
        <mt-button type="danger" @click='cancel'>取消</mt-button>
    </mt-cell>

  </mt-popup>

    <mt-popup
    v-model="popupDetailArea"
    class='popup-device'
    position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange" ref='pickArea'></mt-picker>
   </mt-popup>


  <mt-popup
    v-model="popupDetailType"
    class='popup-device'
    position="bottom">
      <mt-picker :slots="typeSlots" @change="onTypeChange" ref='pickType' :value-key='"areaName"'></mt-picker>
   </mt-popup>

  <mt-popup
  v-model="isAdd"
  class='popup-menu'
  popup-transition="popup-fade">
    <mt-cell title="扫码添加"  @click.native='scanAdd'>
    </mt-cell>
    <mt-cell title="手动添加"  @click.native='handAdd'>
    </mt-cell>
    <!-- <mt-cell title="测试"  @click.native='handTest'>
    </mt-cell> -->
    <!-- <mt-cell title="窗口测试"  @click.native='handWindow'>
    </mt-cell> -->
</mt-popup>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
  const   areas = {
        '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
        '上海': ['上海'],
        '天津': ['天津'],
        '重庆': ['重庆']
    };
  const first = Object.keys(areas);
export default {
  data() {
    return {
      popupVisible: false,
      popupDetail: false,
      popupDetailArea: false,
      popupDetailType: false,
      isAdd: false,
      device: [
        {name: 'pdi_1', icon: 'temp', type: '空气温室度传感器'},
        {name: 'pdi_2', icon: 'light', type: '光照度传感器'},
        {name: 'pdi_3', icon: 'co2', type: '二氧化碳传感器'},
        {name: 'pdi_4', icon: 'soil', type: '土壤墒情传感器'},
        {name: 'pdi_5', icon: 'liquid', type: '液位传感器'},
        {name: 'pdi_6', icon: 'video', type: 'IP摄像头'},
        {name: 'pdi_7', icon: 'temp', type: '空气温室度传感器'},

      ],
      item: {},
      deviceModel: {
        pdi: '',
        area: '',
        type: ''
      },
      slots: [
        {
          flex: 1,
          values: first,
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: areas[first[0]],
          className: 'slot3',
          textAlign: 'left'
        }
      ],
      typeSlots: [
        { 
          flex: 1,
          values: [
            {areaId: 1, areaName: '空气温室度传感器'},
            {areaId: 2, areaName: '光照度传感器'},
            {areaId: 3, areaName: '二氧化碳传感器'},
            {areaId: 4, areaName: '土壤墒情传感器'},
            {areaId: 5, areaName: '液位传感器'},
            {areaId: 6, areaName: 'IP摄像头'},
          ],
          className: 'type-slot',
          textAlign: 'center'
        },
      ]
    }
  },
  methods: {
    openDevice(item) {
      this.popupDetail = true
      this.item = item
    },
    openAdd() {
      this.isAdd = true
    },
    scanAdd() {
      this.isAdd = false
      this.$router.push({name: 'addtest'})
    },
    handAdd() {
      this.isAdd = false
      this.popupVisible = true;
    },
    cancel() {
      this.deviceModel = {
        pdi: '',
        area: ''
      };
      this.popupVisible = false;
    },
    onValuesChange(picker, values) {
      console.log(values, areas[values[0]])
      picker.setSlotValues(1, areas[values[0]]);
      this.deviceModel.area = values[1];
      
    },
    openArea() {
      this.popupDetailArea = true
    },
    openType() {
      this.popupDetailType = true
    },
    onTypeChange(picker, values) {
      console.log(values[0].areaId)
    },
    save() {
      this.popupVisible = false;
    },
    handTest() {
      this.isAdd = false
      this.$router.push({name: 'handtest'})
    },
    handWindow() {
      this.isAdd = false
      if(!window.plus) {
        return
      }
      const cself = plus.webview.currentWebview();
      let csecond = plus.webview.getWebviewById("barcode");
      if(!csecond) {
        csecond = plus.webview.create('barcode.html','barcode', {
                                top:"0",   bottom:"0px",left: "0px", width:"100%",   height:"100%", 
                        });
        csecond.show();
        cself.append(csecond);
      }else{
        csecond.show();
      }

    },
    hide() {
      // if(!window.plus) {
      //   return
      // }
      // plus.webview.getWebviewById("barcode").hide();
    }
  },
  destroyed() {
    this.hide()
  },
  created() {
    const params = this.$route.params;
 
    if(params.success) {
      this.popupVisible = true;
    }else{
      this.popupVisible = false;
    }
  }
}
</script>

<style lang='scss' scoped>
.add-device /deep/ {
  .mint-cell-value {
    width: 100%;
    justify-content: space-between;
  }
  .mint-button--normal {
    width: 48%;
    // margin-right: 10px;
  }
}
</style>
