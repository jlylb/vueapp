import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// import mui from 'mui'
// import '@/assets/mui/css/mui.css'

// Vue.prototype.$mui = mui

import './icons'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

import Cube from 'cube-ui'

Vue.use(Cube)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
