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
    }
  ]
})
