import Vue from 'vue';
// import AddtestApp from '@/views/tabs/addtest.vue';
import Router from 'vue-router';
import App from './App.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home1',
      component: () => import('./views/tabs/addtest.vue'),
    },
  ],
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
