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
            <div class='item-power item item-right' @click="openRouter('sysmenu', 'power')">
                <div class='wrap-item'>
                    <div class='icon'>
                    <svg-icon icon-class='sys-power' class='item-icon'></svg-icon>
                    </div>
                    <div class='icon-desc'>动力系统</div>
                </div>
            </div>
            <div class='item-alarm item item-right'  @click="openRouter('alarm')">
                <div class='wrap-item'>
                    <div class='icon'>
                        <svg-icon icon-class='afbj'   :class='["animation2","item-icon", {"animation2-pause": notification == 0 }]'></svg-icon>
                    </div>
                    <div class='icon-desc'>实时告警<mt-badge size="small" type='error' v-if='notification > 0'>{{ notification }}</mt-badge></div>
                </div>
            </div>
            <div class='item-statistic item item-right'   @click="openRouter('sysmenu', 'fire')">
                <div class='wrap-item'>
                    <div class='icon'>
                        <svg-icon icon-class='sys-xf'  class='item-icon'></svg-icon>
                    </div>
                    <div class='icon-desc'>消防系统</div>
                </div>
            </div>
        </div>
        <div class="fluid-content-item">
            <div class='item-remote item'   @click="openRouter('sysmenu', 'env')">
                <div class='wrap-item'>
                    <div class='icon'>
                        <svg-icon icon-class='sys-env'  class='item-icon'></svg-icon>
                    </div>
                    <div class='icon-desc'>环境系统</div>
                </div>
            </div>
            <div class='item-video item'   @click="openRouter('sysmenu', 'protect')">
                <div class='wrap-item'>
                    <div class='icon'>
                        <svg-icon icon-class='sys-protect'  class='item-icon'></svg-icon>
                    </div>
                    <div class='icon-desc'>安保系统</div>
                </div>
            </div>

        </div>
    </div>

    </div>
</template>

<script>
// import testJpg from '@/assets/test.jpg'
import testJpg1 from '@/assets/s1.jpg'
import testJpg2 from '@/assets/s2.jpg'
import testJpg3 from '@/assets/s3.jpg'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            items : [
                {
                    url: 'http://www.baidu.com',
                    image: testJpg1,
                },
                {
                    url: 'http://www.baidu.com',
                    image: testJpg2,
                },
                {
                    url: 'http://www.baidu.com',
                    image: testJpg3,
                },
            ],
        }
    },
    computed: {
        ...mapGetters('user',[
        'notification'
        ]), 
    },
    methods: {
        openRouter(name, type) {
            let params = type ? { type } : {}
            this.$router.push({name, params: params})
        }
    },
    created() {
        this.$store.commit('app/BAR_TITLE', '首页')
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
    width: 100%;
    // max-width: 100%;
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
    // padding: 20px;
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
    padding-bottom: 0;
  }
  .item-icon {
    width: 2.6em;
    height: 2.6em;
    color: #fff;
  }
  .item-right {
    margin-right: 0;
  }
  .item-power {
    background-color: #409eff;
    flex: 1.4;
  }
  .item-alarm {
    background-color: rgb(245, 108, 108);
    flex: 1.4;
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
  display: flex;
  justify-content: center;
  align-items: center;
  .item-icon {
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate3d(-50%, -50%, 0);
  }
}
</style>
