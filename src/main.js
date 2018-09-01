import Vue from 'vue';
import VeeValidate from 'vee-validate';

import MintUI from 'mint-ui';
import 'reset.css';
import 'mint-ui/lib/style.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './mock';
import './icons';
import './plugins/axios';

import './assets/scss/index.scss';

import TopComponent from './components/top.vue';

Vue.use(VeeValidate);

Vue.use(MintUI);

Vue.config.productionTip = false;

Vue.component('topComponent', TopComponent);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
