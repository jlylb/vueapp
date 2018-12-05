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
          path: '/tab_discover',
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
          path: '/mydevice',
          name: 'mydevice',
          component: () => import(/* webpackChunkName: "tabs" */ './views/tabs/mydevice.vue'),
          meta: {
            title: '我的设备',
          },
        },
        {
          path: '/tab_my/addDevice',
          name: 'add_device',
          component: () => import(/* webpackChunkName: "tabs" */ './views/tabs/addDevice.vue'),
          meta: {
            title: '我的-添加设备',
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
          path: '/air/device2/:dapeng/:areaId/',
          name: 'air_device2',
          meta: {
            title: '精密空调',
          },
          component: () => import(/* webpackChunkName: "air" */ './views/air/device2.vue'),
        },
        {
          path: '/alarm/index',
          name: 'alarm',
          meta: {
            title: '实时报警',
          },
          component: () => import(/* webpackChunkName: "alarm" */ './views/alarm/index.vue'),
        },
        {
          path: '/alarm/device',
          name: 'alarm_device',
          meta: {
            title: '安防报警-设备报警',
          },
          component: () => import(/* webpackChunkName: "alarm" */ './views/alarm/device.vue'),
        },
        {
          path: '/alarm/detail',
          name: 'alarm_detail',
          meta: {
            title: '安防报警-报警内容',
          },
          component: () => import(/* webpackChunkName: "alarm" */ './views/alarm/detail.vue'),
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
          path: '/ups/device',
          name: 'ups_device',
          meta: {
            title: 'UPS电源',
          },
          component: () => import(/* webpackChunkName: "ups" */ './views/ups/device.vue'),
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
          path: '/red/index/:pdi/:type',
          name: 'red',
          meta: {
            title: '红外',
          },
          component: () => import(/* webpackChunkName: "red" */ './views/red/index.vue'),
        },
        {
          path: '/yangan/index/:pdi/:type',
          name: 'yangan',
          meta: {
            title: '烟感',
          },
          component: () => import(/* webpackChunkName: "yangan" */ './views/yangan/index.vue'),
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
        {
          path: '/auth/forget',
          name: 'auth_forget',
          meta: {
            title: '忘记密码',
          },
          component: () => import(/* webpackChunkName: "auth" */ './views/auth/forget.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue'),
    },
    {
      path: '/login3',
      name: 'login3',
      component: () => import(/* webpackChunkName: "login" */ './views/login3.vue'),
    },
    {
      path: '/login4',
      name: 'login4',
      component: () => import(/* webpackChunkName: "login" */ './views/login4.vue'),
    },
    {
      path: '/addDevice2',
      name: 'add_device2',
      component: () => import(/* webpackChunkName: "device" */ './views/tabs/addDevice2.vue'),
      meta: {
        title: '我的-添加设备2',
      },
    },

    {
      path: '/addDevice_page',
      name: 'addDevice_page',
      component: () => import(/* webpackChunkName: "device" */ './views/tabs/addDevice_page.vue'),
      meta: {
        title: '我的-添加设备2',
      },
    },
    {
      path: '/addtest',
      name: 'addtest',
      component: () => import(/* webpackChunkName: "device" */ './views/tabs/addtest.vue'),
      meta: {
        title: '扫码添加设备',
      },
    },
    {
      path: '/guide',
      name: 'guide',
      component: () => import(/* webpackChunkName: "guide index" */ './views/guide/index.vue'),
      meta: {
        title: '引导页',
      },
    },
    {
      path: '/guide1',
      name: 'guide1',
      component: () => import(/* webpackChunkName: "guide index" */ './views/guide/guide1.vue'),
      meta: {
        title: '引导页',
      },
    },
  ],
});

router.beforeEach((to, form, next) => {
  // 如果自定义了标题就取标题，否则拿全局标题
  store.commit('app/BAR_TITLE', to.meta.title);
  next();
});

export default router;
