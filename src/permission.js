import { MessageBox } from 'mint-ui';
import { getToken } from '@/tools/auth';
import { getGuide } from '@/tools/guide';
import router from './router';
import store from './store';

const whiteList = ['/login'];

console.log(store.getters);

router.beforeEach((to, from, next) => {
  if (getToken()) {
    // determine if there has token
    if (to.path === '/login') {
      next({ path: '/' });
    } else if (store.getters.isget === false) {
      store
        .dispatch('user/GetUserInfo')
        .then((res) => {
          // next({ ...to, replace: true });
          next();
        })
        .catch((err) => {
          store.dispatch('user/FedLogOut').then(() => {
            MessageBox.alert(err || '验证失败, 请重新登录!!');
            next({ path: '/' });
          });
        });
    } else {
      // next({ path: '/401', replace: true, query: { noGoBack: true } });
      next();
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next({ path: '/login', replace: true });
  }
});

router.afterEach((to) => {});
