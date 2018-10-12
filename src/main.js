import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import messages from '@/lang/zh_CN';
import '@/permission';
import MintUI from 'mint-ui';
import 'reset.css';
import 'mint-ui/lib/style.css';
import 'animate.css';
// import VueTouch from 'vue-touch';
// import '@/tools/backbutton';

import App from './App.vue';
import router from './router';
import store from './store';
import VeLine from 'v-charts/lib/line.common';
import VeHistogram from 'v-charts/lib/histogram.common';
import './mock';
import './icons';
import './plugins/axios';

import './assets/scss/index.scss';

import TopComponent from './components/top.vue';

Validator.localize('zh_CN', messages);
const config = {
  locale: 'zh_CN',
};

Vue.use(VeeValidate, config);

Vue.use(MintUI);

Vue.config.productionTip = false;

Vue.component('topComponent', TopComponent);

Vue.component(VeLine.name, VeLine);
Vue.component(VeHistogram.name, VeHistogram);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
