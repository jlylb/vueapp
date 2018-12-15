import { loginByUsername, logout, getUserInfo, forgotPassword, modifyPassword } from '@/api/login';
import { getToken, setToken, removeToken } from '@/tools/auth';

const user = {
  namespaced: true,
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: [],
    },
    companyName: '',
    companyLogo: '',
    isget: false,
    notification: 0,
    company: null,
    companyId: null,
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      if (token) {
        state.token = token;
      }
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_COMPANY_LOGO: (state, logopath) => {
      state.companyLogo = logopath;
    },
    SET_COMPANY_NAME: (state, companyName) => {
      state.companyName = companyName;
    },
    SET_IS_GET: (state, val) => {
      state.isget = val;
    },
    SET_NOTIFICATION: (state, val) => {
      state.notification = val;
    },
    SET_COMPANY: (state, val) => {
      state.company = val;
    },
    SET_COMPANY_ID: (state, val) => {
      state.companyId = val;
    },
  },
  getters: {
    isget: state => state.isget,
    notification: state => state.notification,
  },
  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then((response) => {
            console.log(response);
            const data = { ...response.data };
            const { status } = data;
            if (status === 0) {
              reject(response);
              return;
            }
            commit('SET_TOKEN', data.token);
            setToken(response.data.token);
            resolve();
          })
          .catch((error) => {
            console.log(error, 'login error');
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log(state.token, 666666);
        getUserInfo()
          .then((response) => {
            console.log(response);
            if (!response || !response.data) {
              reject('error');
            }
            const data = response.data.user;

            if (data.roles && data.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles);
            } // else {
            //   reject('getInfo: roles must be a non-null array !')
            // }
            let logo;
            let cname;
            if (!data.company) {
              logo = null;
              cname = null;
            } else {
              logo = data.company.Co_Logo;
              cname = data.company.Co_Name;
            }
            commit('SET_IS_GET', true);
            commit('SET_NAME', data.username);
            commit('SET_AVATAR', data.avatar);
            commit('SET_INTRODUCTION', data.introduction);
            commit('SET_NOTIFICATION', data.notification);
            commit('SET_COMPANY', data.company);
            commit('SET_COMPANY_LOGO', logo);
            commit('SET_COMPANY_NAME', cname);
            commit('SET_COMPANY_ID', data.Co_ID);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            dispatch('app/forgetGuide', null, { root: true });
            commit('SET_IS_GET', false);
            removeToken();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', role);
        setToken(role);
        getUserInfo(role).then((response) => {
          const data = response.data;
          commit('SET_ROLES', data.roles);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          resolve();
        });
      });
    },
    forgetPassword({ dispatch }, info) {
      return new Promise((resolve, reject) => {
        dispatch('FedLogOut').then(() => {
          forgotPassword(info)
            .then((res) => {
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    },
    password({ dispatch }, info) {
      return new Promise((resolve, reject) => {
        modifyPassword(info)
          .then((res) => {
            dispatch('FedLogOut');
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default user;
