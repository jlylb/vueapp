import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/tab_home',
      children: [
        {
          path: '/tab_home',
          name: 'tab_home',
          meta: {
            title: '首页',
          },
          component: () => import(/* webpackChunkName: "tabs" */ './views/tabs/home.vue'),
        },
        {
          path: '/tab_control',
          name: 'tab_control',
          meta: {
            title: '控制',
          },
          component: () => import(/* webpackChunkName: "tabs" */ './views/tabs/control.vue'),
        },
        {
          path: '/notice',
          name: 'notice',
          meta: {
            title: '通知管理',
          },
          component: () => import(/* webpackChunkName: "notice" */ './views/notice/index.vue'),
        },
        {
          path: '/tab_discover/:pdi_index?',
          name: 'tab_discover',
          meta: {
            title: '我的设备',
          },
          component: () => import(/* webpackChunkName: "tabs" */ './views/tabs/mydevice.vue'),
        },
        {
          path: '/tab_my',
          name: 'tab_my',
          component: () => import(/* webpackChunkName: "tabs" */ './views/tabs/my.vue'),
          meta: {
            title: '我的',
          },
        },

        {
          path: '/upload',
          name: 'uploadAvatar',
          component: () => import(/* webpackChunkName: "device" */ './views/tabs/upload.vue'),
          meta: {
            title: '上传头像',
          },
        },
        {
          path: '/geo',
          name: 'geo',
          component: () => import(/* webpackChunkName: "geo" */ './views/geo/index.vue'),
          meta: {
            title: '我的-添加设备',
          },
        },
        {
          path: '/air/index/:pdi',
          name: 'air',
          meta: {
            title: '精密空调',
          },
          component: () => import(/* webpackChunkName: "air" */ './views/air/index.vue'),
        },
        {
          path: '/ptair/index',
          name: 'ptair',
          meta: {
            title: '精密空调',
          },
          component: () => import(/* webpackChunkName: "ptair" */ './views/ptair/index.vue'),
        },
        {
          path: '/alarm/index/:device_id?',
          name: 'alarm',
          props: true,
          meta: {
            title: '实时报警',
          },
          component: () => import(/* webpackChunkName: "realalarm" */ './views/alarm/index.vue'),
        },

        {
          path: '/ups/index/:pdi',
          name: 'ups',
          meta: {
            title: 'UPS电源',
          },
          component: () => import(/* webpackChunkName: "ups" */ './views/ups/index.vue'),
        },
        {
          path: '/sups/index/:pdi',
          name: 'sups',
          meta: {
            title: 'UPS电源',
          },
          component: () => import(/* webpackChunkName: "ups" */ './views/sups/index.vue'),
        },
        {
          path: '/shidian/index/:pdi',
          name: 'shidian',
          meta: {
            title: '精密配电',
          },
          component: () => import(/* webpackChunkName: "shidian" */ './views/shidian/index.vue'),
        },
        {
          path: '/temphu/index/:pdi',
          name: 'temphu',
          meta: {
            title: '温湿度',
          },
          component: () => import(/* webpackChunkName: "temphu" */ './views/temphu/index.vue'),
        },
        {
          path: '/peidian/index/:pdi',
          name: 'peidian',
          meta: {
            title: '精密配电',
          },
          component: () => import(/* webpackChunkName: "peidian" */ './views/peidian/index.vue'),
        },
        {
          path: '/battery/index/:pdi',
          name: 'battery',
          meta: {
            title: '电池电量',
          },
          component: () => import(/* webpackChunkName: "battery" */ './views/battery/index.vue'),
        },
        {
          path: '/batterygroup2/index/:pdi',
          name: 'batterygroup2',
          meta: {
            title: '电池组',
          },
          component: () =>
            import(/* webpackChunkName: "batterygroup2" */ './views/batterygroup/index2.vue'),
        },
        {
          path: '/batterygroup/index/:pdi',
          name: 'batterygroup',
          meta: {
            title: '电池组',
          },
          component: () =>
            import(/* webpackChunkName: "batterygroup" */ './views/batterygroup/index.vue'),
        },
        {
          path: '/switch/index/:pdi/:type',
          name: 'switch',
          meta: {
            title: '',
          },
          component: () => import(/* webpackChunkName: "switch" */ './views/switch/index.vue'),
        },
        {
          path: '/sysmenu/index/:type',
          name: 'sysmenu',
          meta: {
            title: '',
          },
          component: () => import(/* webpackChunkName: "sysmenu" */ './views/menu/index.vue'),
        },
        {
          path: '/sysmenu/device/:type',
          name: 'sysmenu_device',
          meta: {
            title: '',
          },
          component: () => import(/* webpackChunkName: "sysmenu" */ './views/menu/device.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'auth',
      component: Home,
      redirect: '/auth_userinfo',
      children: [
        {
          path: '/auth/userinfo',
          name: 'auth_userinfo',
          meta: {
            title: '个人信息',
          },
          component: () => import(/* webpackChunkName: "auth" */ './views/auth/userinfo.vue'),
        },
        {
          path: '/auth/about',
          name: 'auth_about',
          meta: {
            title: '关于我们',
          },
          component: () => import(/* webpackChunkName: "auth" */ './views/auth/about.vue'),
        },
        {
          path: '/auth/help',
          name: 'auth_help',
          meta: {
            title: '帮助中心',
          },
          component: () => import(/* webpackChunkName: "auth" */ './views/auth/help.vue'),
        },
        {
          path: '/auth/feedback',
          name: 'auth_feedback',
          meta: {
            title: '意见反馈',
          },
          component: () => import(/* webpackChunkName: "auth" */ './views/auth/feedback.vue'),
        },
        {
          path: '/auth/password',
          name: 'auth_password',
          meta: {
            title: '修改密码',
          },
          component: () => import(/* webpackChunkName: "auth" */ './views/auth/password.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue'),
    },
    {
      path: '/wxlogin',
      name: 'wx_login',
      component: () => import(/* webpackChunkName: "login" */ './views/wx_login.vue'),
    },
    {
      path: '/auth/forget',
      name: 'auth_forget',
      meta: {
        title: '忘记密码',
      },
      component: () => import(/* webpackChunkName: "auth" */ './views/auth/forget.vue'),
    },

    {
      path: '/addtest',
      name: 'addtest',
      component: () => import(/* webpackChunkName: "device" */ './views/tabs/addtest.vue'),
      meta: {
        title: '扫码添加设备',
      },
    },
  ],
});

router.beforeEach((to, form, next) => {
  // 如果自定义了标题就取标题，否则拿全局标题
  store.commit('app/BAR_TITLE', to.meta.title);
  next();
});

router.onError((error) => {
  const pattern = /Loading chunk (.*?) failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  console.log(error);
  // if (isChunkLoadFailed) {
  //   router.replace(targetPath);
  // }

  if (isChunkLoadFailed) {
    // window.location.reload();
    const LoadingChunk = window.sessionStorage.getItem('LoadingChunk');
    if (LoadingChunk) {
      window.sessionStorage.setItem('LoadingChunk', +LoadingChunk + 1);
    } else {
      window.sessionStorage.setItem('LoadingChunk', 1);
    }
    if (LoadingChunk - 0 > 1) {
      // 防止 死循环
      return false;
    }
    // router.replace(targetPath);
    window.location.reload();
  } else {
    console.log(error);
  }
});

export default router;
