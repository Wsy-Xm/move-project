import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入vant
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
// 引入vant

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
