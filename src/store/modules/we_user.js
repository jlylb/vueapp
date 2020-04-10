import { setWxToken, removeWxToken } from '@/tools/we_auth';

const user = {
    namespaced: true,
    state: {
        openid: null
    },
    mutations: {
        SET_OPEN_ID: (state, openid) => {
            state.openid = openid;
            setWxToken(openid)
        },
        REMOVE_OPEN_ID: (state) => {
            state.openid = null;
            removeWxToken()
        }
    },
    getters: {
        openid: state => state.openid,
    },
    actions: {
        setOpenid({ commit }, openid){
            commit('SET_OPEN_ID', openid);
        },
        removeOpenid({ commit }){
            commit('REMOVE_OPEN_ID');
        },
    }
}

export default user;