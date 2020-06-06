// store.js
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state : {
        type : 1,
        name : "",
        gmail : ""
    },
    mutations: {
        gmail: (state, payload) => state.gmail = payload,
        name: (state, payload) => state.name = payload,
        type: (state, payload) => state.type = payload
      }
});