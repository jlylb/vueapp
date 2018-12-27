// import devtools from '@vue/devtools';
import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import messages from '@/lang/zh_CN';
import '@/permission';
import MintUI from 'mint-ui';
import 'reset.css';
import 'mint-ui/lib/style.css';
import 'animate.css';
// import VueSocketIO from 'vue-socket.io';
// import VueNativeSock from 'vue-native-websocket';
// import io from 'socket.io-client';
// import VueSocketIOExt from 'vue-socket.io-extended';

// import VueTouch from 'vue-touch';
// import '@/tools/backbutton';

import VueSocketIO from 'vue-socket-io';
import { socketHost } from '@/tools/config';
// import VueSocketIO from '@/tools/vue-sock';

import App from './App.vue';
import router from './router';
import store from './store';
import VeLine from 'v-charts/lib/line.common';
import VeHistogram from 'v-charts/lib/histogram.common';
// import './mock';
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

// Vue.use(VueSocketIOExt, io('http://192.168.1.33:2021'), { debug: true });
// Vue.use(new VueSocketIO({
//   connection: 'http://192.168.1.33:2021',
// }));

// Vue.use(VueNativeSock, 'ws://192.168.1.33:8383', { format: 'json' });
// devtools.connect(
//   '192.168.1.33',
//   8098,
// );

Vue.use(VueSocketIO, `${socketHost}`);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
