import Vue from 'vue'
import Vuex from 'vuex'
// 所有封装的本地存储全部加载进来
import * as auth from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: auth.getUser('user')
  },
  mutations: {
    setUser(state, data) {
      // toke赋值给user
      // console.log(data)
      state.user = data
      // toke存储到本地
      auth.setUser('user', data)
    }
  },
  actions: {

  }
})
