const app = {
  namespaced: true,
  state: {
    barTitle: '首页',
  },
  mutations: {
    BAR_TITLE: (state, title) => {
      state.barTitle = title;
    },
  },
  getters: {
    barTitle: state => state.barTitle,
  },
};

export default app;
