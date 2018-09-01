<template>
    <div class='layout-container'>
        <top-component></top-component> 
        <div class='user'>
            <div class='user-info'>
                <div class='user-avatr'>
                    <svg-icon icon-class='monitor' class='item-icon' slot='icon'></svg-icon>
                </div>
            </div>
            <div class='user-device'>
                <div class='device-item'>
                    <div class='device-title'>
                        设备数量
                    </div>
                    <div class='device-num'>
                        10
                    </div>
                </div>
                <div class='device-item'>
                    <div class='device-title'>
                        大棚数量
                    </div>
                    <div class='device-num'>
                        5
                    </div>
                </div>
            </div>
        </div>

        <mt-cell title="个人信息" is-link>
            <svg-icon icon-class='user-circle' class='item-icon' slot='icon'></svg-icon>
            您好, username1
        </mt-cell>

        <mt-cell title="帮助中心" is-link>
            <svg-icon icon-class='help-circle' class='item-icon' slot='icon'></svg-icon>
        </mt-cell>
        <mt-cell title="意见反馈" is-link>
            <svg-icon icon-class='adviser-circle' class='item-icon' slot='icon'></svg-icon>
        </mt-cell>
        <mt-cell title="关于我们" is-link>
            <svg-icon icon-class='us-circle' class='item-icon' slot='icon'></svg-icon>
        </mt-cell>
        <mt-cell></mt-cell>
        <div class='sign-out' @click='logout("login2")'>退出登录</div>
    </div>
</template>

<script>
export default {
    methods: {
       gologin(name) {
           this.$router.push({name})
       },
       logout(name) {
           this.$router.replace({name})
       } 
    },
    created() {
        this.$store.commit('app/BAR_TITLE', '我的')
    }
}
</script>

<style lang='scss' scoped>
.layout-container {
  width: 100%;
  padding: 5px;
  font-weight: bolder;
  overflow-y: auto;
}
.user {
  background-color: #fff;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
.user-info {
  border-bottom: 1px solid #dfdfdf;
  padding: 10px 0;
}
.user-info,
.user-device {
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-avatr {
  border-radius: 50%;
  border: 5px;
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rebeccapurple;
  color: #fff;

  & /deep/ .item-icon {
    width: 150px;
    height: 150px;
  }
}
.device-item {
  // display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  width: 50%;
  padding: 10px 0;
}
.device-title {
  font-size: 1.2rem;
  font-weight: bold;
}
.device-num {
  font-size: 1.8rem;
  font-weight: bold;
  color: #26a2ff;
}
.sign-out {
  background-color: #fff;
  height: 3.25rem;
  line-height: 3.25rem;
  text-align: center;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  cursor: pointer;
  margin-top: 0.625rem;
  font-size: 24px;
}

.layout-container /deep/ .mint-cell-title {
  text-align: left;
}
</style>