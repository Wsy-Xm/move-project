import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/home/index.vue') // 主页home
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login') // 登陆页面
    }
  ]
})
