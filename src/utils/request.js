import axios from 'axios'

const request = axios.create({
  // 线上地址
  baseURL: 'http://ttapi.research.itcast.cn'
  // 本地地址
  // baseURL: 'http://toutiao.course.itcast.cn'
})

// 拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  // 响应数据
  return response.data.data || response.data
}, error => {
  return Promise.reject(error)
})

export default request
