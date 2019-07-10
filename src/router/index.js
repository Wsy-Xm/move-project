import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/tabbar-layout'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home') // 主页home
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login') // 登陆页面
    }
  ]
})
