import { removeGuide, setGuide } from '@/tools/guide';

const app = {
  namespaced: true,
  state: {
    barTitle: '首页',
    isGuide: false,
  },
  mutations: {
    BAR_TITLE: (state, title) => {
      state.barTitle = title;
    },
    GUIDE: (state, bVal) => {
      state.isGuide = bVal;
    },
  },
  getters: {
    barTitle: state => state.barTitle,
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
  },
};

export default app;
