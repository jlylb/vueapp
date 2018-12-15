import Vue from 'vue';
import axios from 'axios';
import { getToken } from '@/tools/auth';
import store from '@/store';
import { MessageBox, Indicator } from 'mint-ui';
import router from '../router';
import apiUrl from '@/tools/config';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common.Authorization = `Bearer ${getToken()}`;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function startLoading() {
  Indicator.open({
    text: '加载中……',
  });
}

function endLoading() {
  Indicator.close();
}

let needLoadingRequestCount = 0;

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

// const tryCloseLoading = () => {
//   if (needLoadingRequestCount === 0) {
//     loading.close()
//   }
// }

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

const config = {
  baseURL: process.env.NODE_ENV === 'production' ? apiUrl : '/api',
  timeout: 5000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  showLoading: true,
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (sconfig) => {
    console.log(store.getters.token);
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      sconfig.headers.Authorization = `Bearer ${getToken()}`;
    }
    if (sconfig.showLoading) {
      showFullScreenLoading();
    }
    return sconfig;
  },
  (error) => {
    console.log(error);
    tryHideFullScreenLoading();
    Promise.reject(error);
  },
);

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    console.log(response, 'ok....');

    if (response.status === 200) {
      const { data } = response;
      if (data && data.status !== 1 && data.msg) {
        MessageBox.alert(data.msg, '提示');
      }
    }
    if (response.config.showLoading) {
      tryHideFullScreenLoading();
    }
    return response;
  },
  (error) => {
    console.log(error, error.response, 'response');
    tryHideFullScreenLoading();
    const res = error.response;
    let errorMsg;
    if (res.status === 401) {
      store.dispatch('user/FedLogOut').then(() => {
        router.push({ name: 'login', replace: true });
      });
    } else if (res.status === 422) {
      const firstKey = Object.keys(res.data)[0];
      errorMsg = Array.isArray(res.data[firstKey]) ? res.data[firstKey][0] : res.data[firstKey];
    } else if (res.status === 403) {
      errorMsg = '用户没有权限';
    } else if (res.status === 500) {
      errorMsg = '服务器程序运行异常,请联系管理员';
    } else {
      errorMsg = res.statusText;
    }
    MessageBox.alert(errorMsg, '提示');
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
