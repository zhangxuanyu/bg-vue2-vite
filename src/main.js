import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'

//引入官方提供的vue-composition-api库
import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi)
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import instance from './service/request'

Vue.prototype.$axios = instance;

//获取菜单信息
function getMenu(){
  return instance.get(
    `/apaas/backmgt/menu/user/menu?teamName=APAAS3`
  )
}


//获取用户信息
function getUser(){
  return instance.get(`/apaas/backmgt/user/getCurrentUser`)
}

  Promise.all([getMenu(),getUser()]).then(res=>{
    if(res[1].data.success==1){
      //已登录则记录菜单和用户信息
      store.commit('setUserInfo',res[1].data.data)
      store.commit('setMenu',res[0].data.data)
    }
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }).catch(()=>{
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })





