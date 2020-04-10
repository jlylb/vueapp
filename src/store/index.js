import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import wxuser from './modules/we_user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user,
    wxuser
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {
    isget: state => state.user.isget,
    token: state => state.user.token,
  },
});
