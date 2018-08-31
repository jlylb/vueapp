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
      redirect: '/login2',
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
          component: () => import(/* webpackChunkName: "about" */ './views/tabs/discover.vue'),
        },
        {
          path: '/tab_my',
          name: 'tab_my',
          component: () => import(/* webpackChunkName: "about" */ './views/tabs/my.vue'),
          meta: {
            title: '我的',
          },
        },
        {
          path: '/monitor/index',
          name: 'monitor',
          meta: {
            title: '实时监测',
          },
          component: () => import(/* webpackChunkName: "about" */ './views/monitor/index.vue'),
        },
        {
          path: '/monitor/shebei',
          name: 'shebei',
          meta: {
            title: '实时监测-设备',
          },
          component: () => import(/* webpackChunkName: "about" */ './views/monitor/shebei.vue'),
        },
        {
          path: '/alarm/index',
          name: 'alarm',
          meta: {
            title: '告警管理',
          },
          component: () => import(/* webpackChunkName: "about" */ './views/alarm/index.vue'),
        },
        {
          path: '/remote/index',
          name: 'remote',
          meta: {
            title: '远程控制',
          },
          component: () => import(/* webpackChunkName: "about" */ './views/remote/index.vue'),
        },
        {
          path: '/statistic/index',
          name: 'statistic',
          meta: {
            title: '统计分析',
          },
          component: () => import(/* webpackChunkName: "about" */ './views/statistic/index.vue'),
        },
        {
          path: '/video/index',
          name: 'video',
          meta: {
            title: '视频控制',
          },
          component: () => import(/* webpackChunkName: "about" */ './views/video/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login.vue'),
    },
    {
      path: '/login2',
      name: 'login2',
      component: () => import(/* webpackChunkName: "about" */ './views/login2.vue'),
    },
    {
      path: '/login3',
      name: 'login3',
      component: () => import(/* webpackChunkName: "about" */ './views/login3.vue'),
    },
  ],
});

router.beforeEach((to, form, next) => {
  // 如果自定义了标题就取标题，否则拿全局标题
  store.commit('app/BAR_TITLE', to.meta.title);
  next();
});

export default router;
