/**
 * 将本地存储中用户数据的信息封装为一个模块
 */

// const USER_KEY = 'user'
// export const getUser = () => JSON.parse(window.localStorage.getItem(USER_KEY))

// export const setUser = () => window.localStorage.setItem(USER_KEY, JSON.stringify(USER_KEY))

// export const removeUser = () => window.localStorage.removeItem(USER_KEY)

// const USER_KEY = 'user'

// 查询
export const getUser = (user) => {
  return JSON.parse(window.localStorage.getItem(user))
}

// 添加
export const setUser = (item, data) => {
  window.localStorage.setItem(item, JSON.stringify(data))
}

// 删除
export const removeUser = (user) => {
  window.localStorage.removeItem(user)
}
