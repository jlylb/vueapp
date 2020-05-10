import { MessageBox } from 'mint-ui';
import { getToken } from '@/tools/auth';
import { getGuide } from '@/tools/guide';
import { getWxToken } from '@/tools/we_auth';
import router from './router';
import store from './store';

import { isWechat, getWxUserInfo } from '@/api/we_auth';

const whiteList = ['/login','/wxlogin', '/guide', '/login3', '/login4', '/auth/forget'];



router.beforeEach((to, from, next) => {
  if (getToken()) {
    // determine if there has token
    if (to.path === '/login'||to.path === '/wxlogin') {
      next({ path: '/' });
    } else if (store.getters.isget === false) {
      store
        .dispatch('user/GetUserInfo', {openid: getWxToken()})
        .then((res) => {
          // next({ ...to, replace: true });
          next();
        })
        .catch((error) => {
          console.log(error, 'permission...........');
          const { err } = error.data||{}
          store.dispatch('user/LogOut')
          .then(()=>{
            let pathlogin = isWechat()?'/wxlogin':'/login'
            if(err==-1) {
              pathlogin = '/login'
            }
            next({ path: pathlogin, replace: true });
          })
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
    next();
  } else if(isWechat()){
    console.log(isWechat(), 'permission...........');
    try {
      getWxUserInfo()
      .then((res)=>{
        console.log(res, 'permission...........then');
        // next({ path: '/' });
     //   setTimeout(()=>{
          if(res===false){
            // MessageBox.alert('请先关注公众号!!');
          }else{
            next(); 
          }
         
       // }, 1000)
        // next(); 
       
      })
      .catch(error =>{
        console.log(error, 'permission........... catch');
        const {err} = error.data||{}
        if(err==-1){
          next({ path: '/login', replace: true });
        }else{
          next({ path: '/wxlogin', replace: true });
        }

      });
    } catch (error) {
      console.log(error, 'permission........... catch getWxUserInfo');
    }

   // next(); 

  }  else {
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
