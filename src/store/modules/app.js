import { removeGuide, setGuide } from '@/tools/guide';

const app = {
  namespaced: true,
  state: {
    barTitle: '首页',
    isGuide: false,
    province: null,
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
  },
  getters: {
    barTitle: state => state.barTitle,
    currentProvince: state => state.province,
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
  },
};

export default app;
