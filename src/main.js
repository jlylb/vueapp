import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './icons';

import 'mint-ui/lib/style.css';

import '@/assets/scss/index.scss';

import MintUI from 'mint-ui';
import Cube from 'cube-ui';
import './mock';

Vue.use(MintUI);

Vue.use(Cube);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
