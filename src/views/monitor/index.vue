<template>
 <div class='layout-container'>

  <top-component @top-btn='selectProvince'></top-component>

  <mt-cell :title="`${index + 1}号大棚`" is-link  v-for='(item, index) in selectCity' :key='index' @click.native='openDetail(item, index)'>
    <span style="color: green"> {{ countDevice(item.value, device) }}个设备</span>
    <svg-icon icon-class='dapeng' class='item-icon' slot='icon'></svg-icon>
  </mt-cell>

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
</style>
