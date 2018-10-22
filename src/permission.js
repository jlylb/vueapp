import { MessageBox } from 'mint-ui';
import { getToken } from '@/tools/auth';
import { getGuide } from '@/tools/guide';
import router from './router';
import store from './store';

const whiteList = ['/login', '/guide', '/login3', '/login4'];

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
          console.log(err, 'permission...........');
          // next({ path: '/' });
          // store.dispatch('user/FedLogOut').then(() => {
          //   MessageBox.alert(err || '验证失败, 请重新登录!!');
          //   next({ path: '/' });
          // });
        });
    } else {
      // next({ path: '/401', replace: true, query: { noGoBack: true } });
      next();
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    console.log(window.plus, 'window plus', to, from);
    next();
  } else {
    console.log('last login', getGuide());
    next({ path: '/login', replace: true });
    // if (!getGuide()) {
    //   next({ path: '/guide', replace: true });
    // } else {
    //   next({ path: '/login', replace: true });
    // }
  }
});

router.afterEach((to) => {});
