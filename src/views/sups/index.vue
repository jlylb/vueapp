<template>
 <div class='layout-container air'>

  <top-component ></top-component>

  <mt-button 
    size="small"
    :type='active===item.value?"primary":"default"' 
    @click.native.prevent="selectButton(item.value)" 
    v-for='item in buttons' 
    :key='item.value'>{{ item.label }}</mt-button>

  <mt-tab-container v-model="active">

    <mt-tab-container-item id="tab-real"  class='real'>

    <mt-cell>
      
        <v-circle :percent="detail.rd_upsinvol/240"  dashboard>
            <p>输入电压</p>
            <p>
              {{ detail.rd_upsinvol }}
            </p>
        </v-circle>


    </mt-cell>

        <mt-cell>
      
        <v-circle :percent="detail.rd_upsoutvol/240"  dashboard>
            <p>输出电压</p>
            <p>
              {{ detail.rd_upsinvol }}
            </p>
        </v-circle>

    </mt-cell>

    <mt-cell>
      
        <v-circle :percent="detail.rd_upsvolr/240"  dashboard>
            <p>额定电压</p>
            <p>
              {{ detail.rd_upsvolr }}
            </p>
        </v-circle>

    </mt-cell>

    <mt-cell>
      
        <v-circle :percent="detail.rd_OutMaxVol/240"  dashboard>
            <p>最大电压</p>
            <p>
              {{ detail.rd_OutMaxVol }}
            </p>
        </v-circle>

    </mt-cell>

    <mt-cell>
      
        <v-circle :percent="detail.rd_OutMinVol/240"  dashboard>
            <p>最小电压</p>
            <p>
              {{ detail.rd_OutMinVol }}
            </p>
        </v-circle>

    </mt-cell>
        <mt-cell>
            <mt-button type="primary" size='large' @click.native.prevent="more">更多参数</mt-button>
        </mt-cell>
    </mt-tab-container-item>

    <mt-tab-container-item id="tab-running" >

      <mt-cell  :title="item.label" :label='detail[item.field]?item.tLabel:item.fLabel' v-for='(item, index) in running' :key='index'>
        <mt-switch v-model="detail[item.field]" disabled></mt-switch>
      </mt-cell>


    </mt-tab-container-item>

    <mt-tab-container-item id="tab-alarm">
      <mt-cell  :title="item.label"  v-for='(item, index) in alarm' :key='index'>
      <mt-badge :type="detail[item.field]==0?'success':'error'">{{ detail[item.field]==0?item.tLabel:item.fLabel }}</mt-badge>
      </mt-cell>
    </mt-tab-container-item>

    <mt-tab-container-item id="tab-temp">
        <mt-cell :title='item.label' v-for='(item, index) in moreParams' :key='index'>
          <span style="color: green"> {{ detail[item.field] }} </span>
        </mt-cell>
    </mt-tab-container-item>

  </mt-tab-container>

 </div> 

</template>

<script>
import { fetchDevice } from '@/api/monitor'
import { getDataValue } from '@/tools'
import { mapGetters } from 'vuex'
import VCircle from '@/components/vcircle'

export default {
  components: { VCircle },
  data() {
    return {
      rangeValue: 10,
      rangeValue1: 5,
      active: "tab-real",
      buttons: [ 
        {value: "tab-real", label: '实时数据'},
        {value: "tab-running", label: '运行状态'},
        {value: "tab-alarm", label: '告警状态'},
        {value: "tab-temp", label: '参数'},
      ],
      switch1: true,
      detail: {},
      running:[
        {label: '开/关机', field: 'rd_upspoweroff', tLabel:'开', fLabel:'关' },
        {label: 'UPS喇叭', field: 'rd_upssound', tLabel:'开', fLabel:'关' },
      ],
      alarm: [
        {label: 'UPS故障', field: 'rd_upsfailstat',  tLabel:'无', fLabel:'有'},
        {label: 'UPS旁路', field:  'rd_upsbypassstat', tLabel:'正常', fLabel:'异常'},
        {label: '电池电压', field: 'rd_upsbatvollow', tLabel:'正常', fLabel:'过低'},
        {label: '市电状态', field: 'rd_upsacfail', tLabel:'正常', fLabel:'中断'},
        {label: '负载状态', field: 'rd_LoadAlarm', tLabel:'正常', fLabel:'过载'},
        {label: '网络状态', field: 'rd_NetCom', tLabel:'正常', fLabel:'断线'},
        {label: '通讯状态', field: 'rd_upsdisconn', tLabel:'正常', fLabel:'断线'},
      ],
      boolFields: [
        'rd_upspoweroff', 'rd_upssound'
      ],
      moreParams: [
        {label: '当前负载', field: 'rd_upscurload',},
        {label: '输入频率', field: 'rd_upsinfreq',},
        {label: 'UPS电池单体电压', field: 'rd_ups1batvol',},
        {label: 'UPS的温度', field: 'rd_upstemp',},
        {label: '电池容量', field: 'rd_BattCap',},
        {label: '电池温度', field: 'rd_BatTemp',},
        {label: '电池总电压', field: 'rd_BatAllVol',},
        {label: '剩余时间', field: 'rd_ReTime',},
      ],
      chartData: {},
      chartSettings: {},

    }
  },
  computed: {

  },
  methods: {
    selectButton(tab) {
      this.active = tab
    },
    more() {
      this.active = 'tab-temp'
    }
  },

  created() {
      this.extend = {
          grid: { 
            left: '5%',
            right: '5%',
            bottom: '1%',
         },
         xAxis: {
           axisLabel: {
             interval: 0
           }
         }
      }
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
    justify-content: center;
    margin: 5px 0;
    width: 100%;
  }
  .air-range {
    width: 100%;
  }
}
</style>

