<template>
  <div class="layout-container my">
    <top-component></top-component>
    <!-- <div class="user">
      <div class="user-info">
        <div class="user-avatr" @click="openAvatar">
          <img :src="showAvatar()" class="item-icon">
        </div>
      </div>
    </div>-->
    <mt-cell title="个人信息" is-link to="/auth/userinfo">
      <svg-icon icon-class="user-circle" class="item-icon" slot="icon"></svg-icon>
      您好, {{ name }}
    </mt-cell>

    <mt-cell title="修改密码" is-link to="/auth/password">
      <svg-icon icon-class="password-circle" class="item-icon" slot="icon"></svg-icon>
    </mt-cell>

    <mt-cell title="关于我们" is-link to="/auth/about">
      <svg-icon icon-class="us-circle" class="item-icon" slot="icon"></svg-icon>
    </mt-cell>

    <mt-cell></mt-cell>
    <div class="sign-out" @click="logout('login')">退出登录</div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getImageUrl } from "@/tools";

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["name", "avatar"])
  },
  methods: {
    showAvatar() {
      return this.avatar.indexOf("data:") > -1
        ? this.avatar
        : getImageUrl(this.avatar);
    },
    gologin(name) {
      this.$router.push({ name });
    },
    logout(name) {
      this.$store.dispatch("user/LogOut").then(() => {
        this.$router.replace({ name });
      });
    },
    openAvatar() {
      this.$router.push({ name: "uploadAvatar" });
    }
  },
  created() {}
};
</script>

<style lang='scss'>
.my {
  width: 100%;
  padding: 5px;
  font-weight: bolder;
  overflow-y: auto;
}
.user {
  background-color: #fff;
  margin-bottom: 20px;
}
.user-info {
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
  background-color: rgba(236, 236, 236, 0.3);
  color: #fff;
  .item-icon {
    width: 190px;
    height: 190px;
    border-radius: 60%;
  }
}

.sign-out {
  background-color: #fff;
  height: 1.4rem;
  line-height: 1.4rem;
  text-align: center;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  margin-top: 0.625rem;
  color: $theme-color;
  font-size: 0.7rem;
}

.my .mint-cell-title {
  text-align: left;
}
</style>