import { Function } from "core-js";

/**
 * 유저정보와 토큰을 set하고 
 * 토큰여부를 확인하는 내용을 작성
 */
export default {

    namespaced : true,

    state : {
        token : '',
        user : {
            id : '',
            name : ''
        }
    },

    getters : {
        token(state) {
            return state.token;
        },
        hasToken(state) {
            return !!state.token;
        },
        userName(state) {
            return state.user.name;
        },
        userId(state) {
            return state.user.id;
        }
    },

    mutations : {
        setToken(state, token) {
            state.token=token;
        },
        setName(state, name) {
            state.user.name = name;
        },
        setId(state, id) {
            state.user.id = id;
        }
    },

    actions : {
        setToken({commit}, token) {
            commit('setToken', token);
        },
        setName({commit}, name) {
            commit('setName', name);
        },
        setId({commit}, id) {
            commit('setId', id);
        }
    }
}