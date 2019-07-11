import axios from 'axios'

// 引入容器
import store from '@/store/index'

const request = axios.create({
  // 线上地址
  baseURL: 'http://ttapi.research.itcast.cn'
  // 本地地址
  // baseURL: 'http://toutiao.course.itcast.cn'
})

// 拦截器
request.interceptors.request.use(config => {
  // 判断用户是否登陆
  // console.log(store.state)
  const { user } = store.state
  if (user) {
    // 登陆成功以后统一设置token
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
  // 响应数据
  return response.data.data || response.data
}, error => {
  return Promise.reject(error)
})

export default request
