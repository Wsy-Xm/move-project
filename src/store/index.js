import Vue from 'vue'
import Vuex from 'vuex'
// 所有封装的本地存储全部加载进来
import * as auth from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: auth.getUser()
  },
  mutations: {
    setUser (state, data) {
      // toke赋值给user
      state.user = data
      // toke存储到本地
      auth.setUser(data)
    }
  },
  actions: {

  }
})
