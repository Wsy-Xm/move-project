import axios from 'axios'

// 引入容器
import store from '@/store'

// 处理数字丢失精度
import JSONbig from 'json-bigint'

const request = axios.create({
  // 线上地址
  baseURL: 'http://ttapi.research.itcast.cn'
  // 本地地址
  // baseURL: 'http://toutiao.course.itcast.cn'
})

request.defaults.transformResponse = [function(data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

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
