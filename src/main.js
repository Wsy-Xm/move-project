import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入vant
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入vant

// 引入全局样式
import '@/styles/index.less'

import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

// 定时器
Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
