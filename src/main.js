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

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

Vue.use(MintUI);

Vue.use(Cube);

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
