import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect:'/tab_home',
      children: [
        {
          path: '/tab_home',
          name: 'tab_home',
          component: () => import(/* webpackChunkName: "tabs" */ './views/tabs/home.vue'),
        },
        {
          path: '/tab_discover',
          name: 'tab_discover',
          component: () => import(/* webpackChunkName: "about" */ './views/tabs/discover.vue'),
        },
        {
          path: '/tab_my',
          name: 'tab_my',
          component: () => import(/* webpackChunkName: "about" */ './views/tabs/my.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login.vue'),
    },
    
  ],
});
