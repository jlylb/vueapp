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
            title: '发现',
          },
          component: () => import(/* webpackChunkName: "tabs" */ './views/tabs/discover.vue'),
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
          path: '/tab_my/addDevice',
          name: 'add_device',
          component: () => import(/* webpackChunkName: "tabs" */ './views/tabs/addDevice.vue'),
          meta: {
            title: '我的-添加设备',
          },
        },
        {
          path: '/monitor/index',
          name: 'monitor',
          meta: {
            title: '实时监测',
          },
          component: () => import(/* webpackChunkName: "monitor" */ './views/monitor/index.vue'),
        },

        {
          path: '/monitor/device',
          name: 'monitor_device',
          meta: {
            title: '实时监测-选择设备',
          },
          component: () => import(/* webpackChunkName: "monitor" */ './views/monitor/device.vue'),
        },

        {
          path: '/alarm/index',
          name: 'alarm',
          meta: {
            title: '告警管理',
          },
          component: () => import(/* webpackChunkName: "alarm" */ './views/alarm/index.vue'),
        },
        {
          path: '/alarm/device',
          name: 'alarm_device',
          meta: {
            title: '告警管理-设备报警',
          },
          component: () => import(/* webpackChunkName: "alarm" */ './views/alarm/device.vue'),
        },
        {
          path: '/alarm/detail',
          name: 'alarm_detail',
          meta: {
            title: '告警管理-报警内容',
          },
          component: () => import(/* webpackChunkName: "alarm" */ './views/alarm/detail.vue'),
        },
        {
          path: '/remote/index',
          name: 'remote',
          meta: {
            title: '远程控制',
          },
          component: () => import(/* webpackChunkName: "remote" */ './views/remote/index.vue'),
        },
        {
          path: '/remote/device',
          name: 'remote_device',
          meta: {
            title: '远程控制设备',
          },
          component: () => import(/* webpackChunkName: "remote" */ './views/remote/device.vue'),
        },
        {
          path: '/statistic/index',
          name: 'statistic',
          meta: {
            title: '统计分析',
          },
          component: () =>
            import(/* webpackChunkName: "statistic" */ './views/statistic/index.vue'),
        },
        {
          path: '/statistic/device',
          name: 'statistic_device',
          meta: {
            title: '统计分析-设备',
          },
          component: () =>
            import(/* webpackChunkName: "statistic" */ './views/statistic/device.vue'),
        },
        {
          path: '/statistic/chart',
          name: 'statistic_chart',
          meta: {
            title: '统计分析-趋势图',
          },
          component: () =>
            import(/* webpackChunkName: "statistic" */ './views/statistic/chart.vue'),
        },
        {
          path: '/video/index',
          name: 'video',
          meta: {
            title: '视频控制',
          },
          component: () => import(/* webpackChunkName: "video" */ './views/video/index.vue'),
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
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "zbout" */ './views/login.vue'),
    },
    {
      path: '/login3',
      name: 'login3',
      component: () => import(/* webpackChunkName: "zbout" */ './views/login3.vue'),
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
      component: () => import(/* webpackChunkName: "device" */ './views/tabs/addDevice2.vue'),
      meta: {
        title: '我的-添加设备2',
      },
    },
    {
      path: '/addtest',
      name: 'addtest',
      component: () => import(/* webpackChunkName: "device" */ './views/tabs/addtest.vue'),
      meta: {
        title: '我的-添加设备测试',
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
