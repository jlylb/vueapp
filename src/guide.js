import Vue from 'vue';
import MintUI from 'mint-ui';
import 'reset.css';
import 'mint-ui/lib/style.css';
import 'animate.css';

import GuideApp from '@/views/guide/index.vue';
// import router from './router';
import store from './store';

import './icons';

import './assets/scss/index.scss';

Vue.use(MintUI);

Vue.config.productionTip = false;

new Vue({
  // router,
  store,
  render: h => h(GuideApp),
}).$mount('#app');
