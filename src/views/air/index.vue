<template>
 <div class='layout-container air'>

  <top-component @top-btn='selectProvince'></top-component>
  <mt-button size="small" @click.native.prevent="active = 'tab-container1'">参数</mt-button>
  <mt-button size="small" @click.native.prevent="active = 'tab-container2'">状态</mt-button>
  <mt-button size="small" @click.native.prevent="active = 'tab-container3'">温湿度</mt-button>
  <mt-tab-container v-model="active">
    <mt-tab-container-item id="tab-container1" name='参数'>

     <mt-cell  label="空调运行参数"></mt-cell>

     <mt-cell  title="回风温度" :label='rangeValue'>
      <mt-range
        class='air-range'
        v-model="rangeValue"
        :min="1"
        :max="100"
        :step="1"
        disabled
        :bar-height="5">
      </mt-range>
     </mt-cell>

    <mt-cell  title="送风温度" :label='rangeValue1'>
      <mt-range
        class='air-range'
        v-model="rangeValue1"
        :min="1"
        :max="100"
        :step="1"
        disabled
        :bar-height="5">
      </mt-range>
     </mt-cell>

    <mt-cell  label="参数设定"></mt-cell>

     <mt-cell  title="温度设定" :label='rangeValue'>
      <mt-range
        class='air-range'
        v-model="rangeValue"
        :min="1"
        :max="100"
        :step="1"
        :bar-height="5">
      </mt-range>
     </mt-cell>

    <mt-cell  title="湿度设定" :label='rangeValue1'>
      <mt-range
        class='air-range'
        v-model="rangeValue1"
        :min="1"
        :max="100"
        :step="1"
        :bar-height="5">
      </mt-range>
     </mt-cell>
      <mt-cell  title="空调开关" :label='switch1?"开":"关"'>
        <mt-switch v-model="switch1"></mt-switch>
      </mt-cell>

      

    </mt-tab-container-item>
    <mt-tab-container-item id="tab-container2" name='状态'>
      2222222222222222
    </mt-tab-container-item>
    <mt-tab-container-item id="tab-container3" name="温湿度">
    33333333333333
    </mt-tab-container-item>
</mt-tab-container>


  <drop-menu :open.sync='openMenu' :data='province' @menuItem='clickMenu' :active='currentProvince'></drop-menu>

 </div> 

</template>

<script>
import { fetchList } from '@/api/monitor'
import DropMenu from '@/components/dropdown'
import { getDataValue } from '@/tools'
import { mapGetters } from 'vuex'

export default {
  components: { DropMenu },
  data() {
    return {
      openMenu: false,
      menu: [],
      province: [],
      city: [],
      firstProvince: null,
      firstCity: null,
      selectCity: [],
      device: null,
      deviceType: null,
      selectDeviceType: null,
      selectDevice: null,
      rangeValue: 10,
      rangeValue1: 5,
      active: "tab-container1",
      switch1: true,
    }
  },
  computed: {
    ...mapGetters('app',[
      'currentProvince'
    ]),
  },
  methods: {
    closeBottomSheet(val, val1) {
      console.log(val, val1)
    },
    selectProvince() {
      console.log(this.openMenu, 'select ....')
      this.openMenu = true
    },
    clickMenu(item) {
      this.openMenu = false
      this.firstProvince = item.value
      this.setProvince()
    },
    countDevice(cityId, data) {
      console.log(getDataValue(data, [cityId], []),'count ....')
      if(!data) {
        return 0
      }
      return Object.keys(getDataValue(data, [cityId], [])).length
    },
    openDetail(item, index) {
      this.$router.push({name: 'monitor_device2', params: { dapeng: index + 1, areaId: item.value } })
    },
    setProvince() {
      this.$store.commit('app/PROVINCE', this.firstProvince);
    }
  },
  watch: {
    firstProvince(newVal) {
      this.selectCity = getDataValue(this.city, [newVal], [])
    },
  },
  created() {
    fetchList().then((res) => {
      this.items = res.data.items
      this.province = res.data.province
      this.city = res.data.city
      this.device = res.data.device
      if(this.currentProvince) {
        this.firstProvince = this.currentProvince
        return 
      }
      this.firstProvince = getDataValue(this.province, [0, 'value'], null)
      this.setProvince()
    })
  }

}
</script>

<style lang='scss' scoped>
.sheet .mu-item-action {
  justify-content: center;
  color: inherit;
}
.air /deep/ .mint-cell-value {
  position: relative;
  flex: 2.5;
}
.air-range {
  width: 100%;
}
</style>
