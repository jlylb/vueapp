<template>
  <div class='guide'>
    <mt-tab-container class="page-tab" v-model="active" swipeable>

      <mt-tab-container-item id="tab1" class='tab-item tab-item-first'>
            <img :src='guide2'>
            <div class='item-txt'>
              <div class='item-title animated bounceInDown delay-1s'>
                武汉盛世奈特有限公司
              </div>
              <div class='item-left animated bounceInRight delay-2s'>
                智能物联网
              </div>
              <div class='item-right animated bounceInLeft faster'>
                大数据
              </div>
            </div>
         
      </mt-tab-container-item>

            <mt-tab-container-item id="tab2" class='tab-item tab-item-first'>
            <img :src='guide3'>
            <div class='item-txt'>
              <div class='item-title animated bounceInDown'>
                武汉盛世奈特有限公司
              </div>
              <div class='item-left animated bounceInRight'>
                智能物联网
              </div>
              <div class='item-right animated bounceInLeft'>
                大数据
              </div>
            </div>
         
      </mt-tab-container-item>

            <mt-tab-container-item id="tab3" class='tab-item tab-item-first'>
            <img :src='guide4'>
            <div class='item-txt'>
              <div class='item-title animated bounceInDown'>
                武汉盛世奈特有限公司
              </div>
              <div class='item-left animated bounceInRight'>
                智能物联网
              </div>
              <div class='item-right animated bounceInLeft'>
                大数据
              </div>
            </div>
         
      </mt-tab-container-item>

    </mt-tab-container>
    
    <div class='indicators-wrap'>
      <div class='indicators' :class='{"is-active": active=="tab1" }' @click='slide("tab1")'>
      </div>
      <div class='indicators' :class='{"is-active": active=="tab2" }' @click='slide("tab2")'>
      </div>
      <div class='indicators' :class='{"is-active": active=="tab3" }' @click='slide("tab3")'>
      </div>
    </div>

  </div>
</template>

<script>
import guide2 from '@/assets/guide2.jpg';
import guide3 from '@/assets/guide3.jpg';
import guide4 from '@/assets/guide4.jpg';
export default {
  data() {
    return {
      active: 'tab1',
      guide2,
      guide3,
      guide4,
      timer: null
    };
  },
  methods: {
    slide(to) {
      this.active = to
    },
    auto() {

    }
  },
  mounted() {

  },
  destroyed() {

  }
}
</script>

<style lang='scss' scoped>
.guide,
.tab-item,
.page-tab {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
}
.tab-item {
  // display: flex;
  // justify-content: center;
}
.item-txt {
  position: absolute;
  font-weight: bold;
  bottom: 30%;
  left: 0;
  width: 100%;
}
.tab-item img {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
}
.item-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 20px;
  line-height: 20px;
}
.item-left {
  width: 50%;
  height: 30px;
  line-height: 30px;
  text-align: right;
}
.item-right {
  text-align: left;
  float: right;
  width: 50%;
}
.guide /deep/ .mint-tab-container-wrap {
  height: 100%;
}
.indicators-wrap {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 10%;
}
.indicators{
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: 0.2;
    margin: 0 3px;
}
.is-active {
  background: #fff;
}

</style>
