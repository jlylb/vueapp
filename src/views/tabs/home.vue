<template>
    <div>
        <!-- <div class='slide-image'>
            <mt-swipe :show-indicators="true">
                <mt-swipe-item v-for='(item, index) in items' :key='index'>
                    <img :src='item.image' />
                </mt-swipe-item>
            </mt-swipe>
        </div> -->

    <div class='fluid-content'>
        <div class="fluid-content-item">
            <div class='item1 item item-right'>
                <div class='wrap-item'>
                    <svg-icon icon-class='lock' class='item-icon'></svg-icon>
                    <div class='icon-desc'>实时监控</div>
                </div>
            </div>
            <div class='item2 item item-right'>
                <div class='wrap-item'>
                    <svg-icon icon-class='message'  class='item-icon'></svg-icon>
                    <div class='icon-desc'>报警提醒</div>
                </div>
            </div>
        </div>
        <div class="fluid-content-item">
            <div class='item3 item'>
                <div class='wrap-item'>
                    <svg-icon icon-class='qq'  class='item-icon'></svg-icon>
                    <div class='icon-desc'>控制中心</div>
                </div>
            </div>
            <div class='item4 item'>
                <div class='wrap-item'>
                    <svg-icon icon-class='star'  class='item-icon'></svg-icon>
                    <div class='icon-desc'>视频中心</div>
                </div>
            </div>
        </div>
    </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            items : []
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
  & img {
    display: inline-block;
    height: auto;
    max-width: 100%;
  }
}

.fluid-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .fluid-content-item {
    width: 50%;
    // padding: 0 1%;
  }
  .item {
      padding: 20px;
      background-color: rgb(255, 0, 140);
      margin: 10px;
      color: #ffff;
      display: flex;
      align-items: center;
      justify-content: center;
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
      width: 3em;
      height: 3em;
      color: #fff;
  }
  .item-right {
      margin-right: 0;
  }
  .item1 {
    height: 80px;
  }
  .item2 {
    height: 250px;
    background-color: rgb(255, 251, 0);
  }
  .item3 {
    height: 180px;
    background-color: rgb(18, 194, 41);
  }
  .item4 {
    height: 150px;
    background-color: rgb(71, 18, 194);
  }
}
</style>
