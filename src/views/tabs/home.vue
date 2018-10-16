<template>

    <div class='tab-container'>

    <top-component></top-component> 
        
    <mt-swipe :show-indicators="true" class='slide-image'>
        <mt-swipe-item v-for='(item, index) in items' :key='index'>
            <img :src='item.image' />
        </mt-swipe-item>
        <!-- <mt-swipe-item >
            <img :src='testJpg' />
        </mt-swipe-item> -->
    </mt-swipe>
      

    <div class='fluid-content'>
        <div class="fluid-content-item">
            <div class='item-monitor item item-right' @click="openRouter('air')">
                <div class='wrap-item'>
                    <div class='icon'>
                    <svg-icon icon-class='jmkt' class='item-icon'></svg-icon>
                    </div>
                    <div class='icon-desc'>精密空调</div>
                </div>
            </div>
            <div class='item-alarm item item-right'  @click="openRouter('ups')">
                <div class='wrap-item'>
                    <div class='icon'>
                        <svg-icon icon-class='ups'  class='item-icon'></svg-icon>
                    </div>
                    <div class='icon-desc'>UPS电源</div>
                </div>
            </div>
            <div class='item-statistic item item-right'   @click="openRouter('electric')">
                <div class='wrap-item'>
                    <div class='icon'>
                        <svg-icon icon-class='dlyi'  class='item-icon'></svg-icon>
                    </div>
                    <div class='icon-desc'>电量仪</div>
                </div>
            </div>
        </div>
        <div class="fluid-content-item">
            <div class='item-remote item'   @click="openRouter('alarm')">
                <div class='wrap-item'>
                    <div class='icon'>
                        <svg-icon icon-class='afbj'  class='item-icon'></svg-icon>
                    </div>
                    <div class='icon-desc'>安防报警</div>
                </div>
            </div>
            <div class='item-video item'   @click="openRouter('guard')">
                <div class='wrap-item'>
                    <div class='icon'>
                        <svg-icon icon-class='menjin'  class='item-icon'></svg-icon>
                    </div>
                    <div class='icon-desc'>门禁控制</div>
                </div>
            </div>
            <div class='item-temp item'   @click="openRouter('temphu')">
                <div class='wrap-item'>
                    <div class='icon'>
                        <svg-icon icon-class='wsdu'  class='item-icon'></svg-icon>
                    </div>    
                    <div class='icon-desc'>温湿度</div>
                </div>
            </div>
        </div>
    </div>

    </div>
</template>

<script>
// import testJpg from '@/assets/test.jpg'
export default {
    data() {
        return {
            items : [],
            // testJpg
        }
    },
    methods: {
        openRouter(name) {
            this.$router.push({name})
        }
    },
    created() {
        this.$store.commit('app/BAR_TITLE', '首页')
        this.$axios({
            url: '/image/item'
        }).then((res)=>{
            console.log(res)
            this.items = res.data.items
        })
    }
}
</script>

<style lang='scss' scoped>
.slide-image {
  height: 150px;
  padding: 0 10px;
  flex: 1.2;
  & img {
    display: inline-block;
    height: 100%;
    max-width: 100%;
  }
}
.tab-container {
  //   height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.fluid-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex: 3;
  //   height: 100%;
  .fluid-content-item {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .item {
    padding: 20px;
    margin: 10px;
    color: #ffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
  }
  .wrap-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .icon-desc {
    padding: 5px;
  }
  .item-icon {
    width: 2.6em;
    height: 2.6em;
    color: #fff;
  }
  .item-right {
    margin-right: 0;
  }
  .item-monitor {
    background-color: #409eff;
    flex: 1.2;
  }
  .item-alarm {
    background-color: rgb(245, 108, 108);
    flex: 1.8;
  }
  .item-statistic {
    background-color: #a448bb;
    flex: 1.4;
  }
  .item-remote {
    flex: 1.3;
    background-color: #67c23a;
  }
  .item-video {
    flex: 1.7;
    background-color: #e6a23c;
  }
  .item-temp {
    flex: 1.7;
    background-color: #19d4ae;
  }
}
.icon {
  width: 65px;
  height: 65px;
  line-height: 65px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  position: relative;
  .item-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
