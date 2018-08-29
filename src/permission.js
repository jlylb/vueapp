import router from './router';
import store from './store';
import { MessageBox } from 'mint-ui';

import { getToken } from '@/utils/auth';

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

const islogined = () => logged;

const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  if (islogined()) {
    // determine if there has token
    if (to.path === '/login') {
      next({ path: '/' });
    } else if (store.getters.isget === false) {
      store
        .dispatch('GetUserInfo')
        .then((res) => {
          const myroutes = res.data || [];
          store.dispatch('GenerateRoutes', myroutes).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({ ...to, replace: true });
          });
        })
        .catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again');
            next({ path: '/' });
          });
        });
    } else {
      if (hasPermission(store.getters.roles, to.meta.roles)) {
        next(); //
      } else {
        next({ path: '/401', replace: true, query: { noGoBack: true } });
      }
      // 可删 ↑
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    // 在免登录白名单，直接进入
    next();
  } else {
    next({ path: '/login', replace: true }); // 否则全部重定向到登录页
  }
});

router.afterEach((to) => {});
