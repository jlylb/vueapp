import Vue from 'vue';
import axios from 'axios';
import { getToken } from '@/tools/auth';
import store from '@/store';
import { MessageBox, Toast } from 'mint-ui';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common.Authorization = `Bearer ${getToken()}`;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: '/api',
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (sconfig) => {
    console.log(store.getters.token);
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      sconfig.headers.Authorization = `Bearer ${getToken()}`;
    }
    return sconfig;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  },
);

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    console.log(response, 'ok....');
    const { data } = response;

    if (data.status !== 1) {
      MessageBox.alert(data.msg || response.statusText, '提示');
    }
    return response;
  },
  (error) => {
    console.log(error, error.response, 'response');
    MessageBox.alert(`${error.response.statusText}`, '提示');
    Promise.reject(error);
  },
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
