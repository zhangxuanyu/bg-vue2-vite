import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

const store = new Vuex.Store({
      state: {
        userInfo:null,
        menu:null,
      },
      getters: {
        count(state) {
          return state.userInfo
        }
      },
      mutations: {
        setUserInfo(state, info) {
          state.userInfo = info
        },
        setMenu(state,menu){
          state.menu = menu
        }
      },
      actions: {}
})

export default store