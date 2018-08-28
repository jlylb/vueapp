<template>
    <div>
        <div class='slide-image'>
            <mt-swipe :show-indicators="true">
                <mt-swipe-item v-for='(item, index) in items' :key='index'>
                    <img :src='item.image' />
                </mt-swipe-item>
            </mt-swipe>
        </div>

    <div class='fluid-content'>
        <div class="fluid-content-item">
            <div class='item1'></div>
            <div class='item2'></div>
            <div class='item3'></div>
            <div class='item4'></div>
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
  .fluid-content-item {
    width: 48%;
  }
  .item1 {
    height: 150px;
    background-color: rgb(255, 0, 140);
    &::after {
      content: 'item1';
    }
  }
  .item2 {
    height: 250px;
    background-color: rgb(255, 251, 0);
    &::after {
      content: 'item2';
    }
  }
  .item3 {
    height: 350px;
    background-color: rgb(18, 194, 41);
    &::after {
      content: 'item3';
    }
  }
  .item4 {
    height: 150px;
    background-color: rgb(71, 18, 194);
    &::after {
      content: 'item4';
    }
  }
}
</style>
