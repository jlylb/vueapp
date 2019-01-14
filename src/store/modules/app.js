import { removeGuide, setGuide } from '@/tools/guide';
import checkUpdate from '@/api/home';

const app = {
  namespaced: true,
  state: {
    barTitle: '首页',
    isGuide: false,
    province: null,
    isUpdateApp: false,
  },
  mutations: {
    BAR_TITLE: (state, title) => {
      state.barTitle = title;
    },
    GUIDE: (state, bVal) => {
      state.isGuide = bVal;
    },
    PROVINCE: (state, nVal) => {
      state.province = nVal;
    },
    IS_UPDATE_APP: (state, nVal) => {
      state.isUpdateApp = nVal;
    },
  },
  getters: {
    barTitle: state => state.barTitle,
    currentProvince: state => state.province,
    isUpdateApp: state => state.isUpdateApp,
  },
  actions: {
    giveGuide({ commit }, bVal) {
      commit('GUIDE', bVal);
      setGuide(bVal);
    },
    forgetGuide({ commit }) {
      commit('GUIDE', false);
      removeGuide();
    },
    setProvince({ commit }, nVal) {
      commit('PROVINCE', nVal);
    },
    updateApp({ commit }) {
      console.log('update app......');
      // if (!window.plus) return;
      // const { version } = plus.runtime;
      // const data = {
      //   appid: plus.runtime.appid,
      //   appname: 'dh',
      //   version,
      // };
      const version = '1.0.0';
      const data = {
        appid: 'dh',
        appname: 'dh',
        version,
      };
      /* eslint-disable */
      return new Promise((resolve, reject) => {
        checkUpdate(data)
          .then(res => {
            commit('IS_UPDATE_APP', true);
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
  },
};

export default app;
