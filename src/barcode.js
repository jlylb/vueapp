import Vue from 'vue';
import AddtestApp from '@/views/tabs/addtest.vue';
// import Router from 'vue-router';

// Vue.use(Router);

// const router = new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home1',
//       component: AddtestApp,
//     },
//   ],
// });
new Vue({
  render: h => h(AddtestApp),
}).$mount('#app');
