<template>
 <div class='layout-container air'>

  <top-component ></top-component>
  <mt-button size="small" @click.native.prevent="active = 'tab-container1'">实时数据</mt-button>
  <mt-button size="small" @click.native.prevent="active = 'tab-container2'">运行状态</mt-button>
  <mt-button size="small" @click.native.prevent="active = 'tab-container3'">告警状态</mt-button>
  <mt-button size="small" @click.native.prevent="active = 'tab-container4'">温湿度</mt-button>
  <mt-tab-container v-model="active">
    <mt-tab-container-item id="tab-container1" name='参数' class='real'>

     <mt-cell  title="回风温度" :label='"当前: "+detail.rd_air_backwindtemp'>
      <mt-range
        class='air-range'
        v-model="detail.rd_air_backwindtemp"
        :min="1"
        :max="100"
        :step="1"
        disabled
        :bar-height="5">
      </mt-range>
     </mt-cell>

    <mt-cell  title="回风湿度" :label='"当前: "+detail.rd_air_backwindhum'>
      <mt-range
        class='air-range'
        v-model="detail.rd_air_backwindhum"
        :min="1"
        :max="100"
        :step="1"
        disabled
        :bar-height="5">
      </mt-range>
     </mt-cell>

    <mt-cell  title="送风温度" :label='"当前: "+detail.rd_air_sendwindtemp'>
      <mt-range
        class='air-range'
        v-model="detail.rd_air_sendwindtemp"
        :min="1"
        :max="100"
        :step="1"
        disabled
        :bar-height="5">
      </mt-range>
     </mt-cell>

    <mt-cell  title="送风湿度" :label='"当前: "+detail.rd_air_sendwindhum'>
      <mt-range
        class='air-range'
        v-model="detail.rd_air_sendwindhum"
        :min="1"
        :max="100"
        :step="1"
        disabled
        :bar-height="5">
      </mt-range>
     </mt-cell>

    <mt-cell  title="室内温度" :label='"当前: "+detail.rd_air_innertemp'>
      <mt-range
        class='air-range'
        v-model="detail.rd_air_innertemp"
        :min="1"
        :max="100"
        :step="1"
        disabled
        :bar-height="5">
      </mt-range>
     </mt-cell>

    <mt-cell  title="室内湿度" :label='"当前: "+detail.rd_air_innerhum'>
      <mt-range
        class='air-range'
        v-model="detail.rd_air_innerhum"
        :min="1"
        :max="100"
        :step="1"
        disabled
        :bar-height="5">
      </mt-range>
     </mt-cell>


    </mt-tab-container-item>
    <mt-tab-container-item id="tab-container2" name='运行状态'>

      <mt-cell  :title="item.label" :label='detail[item.field]?item.tLabel:item.fLabel' v-for='(item, index) in running' :key='index'>
        <mt-switch v-model="detail[item.field]" disabled></mt-switch>
      </mt-cell>


    </mt-tab-container-item>

    <mt-tab-container-item id="tab-container3" name="告警状态">
      <mt-cell  :title="item.label"  v-for='(item, index) in alarm' :key='index'>
      <mt-badge :type="detail[item.field]==0?'success':'error'">{{ detail[item.field]==0?item.tLabel:item.fLabel }}</mt-badge>
      </mt-cell>
    </mt-tab-container-item>

    <mt-tab-container-item id="tab-container4" name="温湿度">
       温湿度
    </mt-tab-container-item>
</mt-tab-container>


 </div> 

</template>

<script>
import { fetchDevice } from '@/api/monitor'
import { getDataValue } from '@/tools'
import { mapGetters } from 'vuex'

export default {
  components: {  },
  data() {
    return {
      rangeValue: 10,
      rangeValue1: 5,
      active: "tab-container1",
      switch1: true,
      detail: {},
      running:[
        {label: '开/关机', field: 'rd_air_state', tLabel:'开', fLabel:'关' },
        {label: '风机', field: 'rd_air_windstate', tLabel:'开', fLabel:'关'},
        {label: '压缩机', field: 'rd_air_compstate', tLabel:'开', fLabel:'关'},
        {label: '加热器', field: 'rd_air_addhotstate', tLabel:'开', fLabel:'关'},
        {label: '除湿器', field: 'rd_air_deleshistate', tLabel:'开', fLabel:'关'},
        {label: '加湿器', field: 'rd_air_addshistate', tLabel:'开', fLabel:'关'},
      ],
      alarm: [
        {label: '高温状态', field: 'rd_air_temphalarm',  tLabel:'正常', fLabel:'过高'},
        {label: '低温状态', field:  'rd_air_templowalarm', tLabel:'正常', fLabel:'过低'},
        {label: '高湿状态', field: 'rd_air_humhalarm', tLabel:'正常', fLabel:'过高'},
        {label: '低湿状态', field: 'rd_air_humlowalarm', tLabel:'正常', fLabel:'过低'},
        {label: '烟火状态', field: 'rd_air_somkealarm', tLabel:'正常', fLabel:'异常'},
        {label: '风机状态', field: 'rd_air_windalarm', tLabel:'正常', fLabel:'异常'},
        {label: '漏水状态', field: 'rd_air_leakalarm', tLabel:'正常', fLabel:'异常'},
        {label: '通讯状态', field: 'rd_NetCom', tLabel:'正常', fLabel:'断线'},
      ],
      boolFields: [
        'rd_air_state', 'rd_air_windstate', 'rd_air_compstate', 'rd_air_addhotstate', 'rd_air_deleshistate', 'rd_air_addshistate'
      ]
    }
  },
  computed: {

  },
  methods: {

  },

  created() {
    const { pdi } = this.$route.params
    fetchDevice({ pdi }).then((res) => {
      console.log(res.data.devices)
      const device = res.data.devices
      Object.keys(device).map((item)=>{
        if(this.boolFields.indexOf(item) > -1) {
          device[item] = device[item]==0?true:false
        }
      })
      this.detail = device
    })
  }

}
</script>

<style lang='scss' scoped>
.sheet .mu-item-action {
  justify-content: center;
  color: inherit;
}
.real {
  /deep/ .mint-cell-value {
    position: relative;
    flex: 2.5;
  }
  .air-range {
    width: 100%;
  }
}
</style>
