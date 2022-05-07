import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import instance from '../service/request'


// 注册路由插件
Vue.use(VueRouter)

// 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('../page/home.vue')
  },
]

const router = new VueRouter({
  routes
})

function inWhiteList (toPath) {
  const whiteList = ['/', '/404']
  const path = whiteList.find((value) => {
    // 使用正则匹配
    const reg = new RegExp('^' + value)
    return reg.test(toPath)
  })
  return !!path
}

router.beforeEach((to, from, next) => {
  const userInfo = store.state.userInfo
  // 检查to.path是否存在于免登陆白名单
  if (inWhiteList(to.path)) {
    next()
  }else{
    // 判断是否已经登录，未登录则重定向到首页（通过query传参记录原来的路径）
    if (!userInfo) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  }
})

// 在路由完成初始导航时调用，如果有异步操作放置到这里
// 请求相应的角色和菜单
router.onReady(() => {
  
  generateRoutes()
})






function generateRoutes () {
  const _asyncRoutes = store.state.menu

  if(_asyncRoutes){
    router.addRoutes([
      ..._asyncRoutes,
      {
        path: '*',
        redirect: '/404'
      }
    ])
  }else{
    router.addRoutes([
      {
        path: '*',
        redirect: '/404'
      }
    ])
  }
  
}


export default router