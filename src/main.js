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

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
