import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // 首页底部
    {
      path: '/',
      component: () => import('@/views/tabbar-layout'),
      // 首页
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home') // 主页home
        }
      ]
    },
    // 登陆
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login') // 登陆页面
    },
    {
      name: 'search',
      path: '/search',
      component: () => import('@/views/search') // 搜索页面
    },
    {
      name: 'searchLenovo',
      path: '/searchLenovo/:q',
      component: () => import('@/views/SearchLenovo') // 搜索联想跳转页面内容
    }
  ]
})
