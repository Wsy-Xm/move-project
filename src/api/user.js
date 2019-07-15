import request from '@/utils/request'

// 这里是用的的api

// 用户登陆
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 拉黑用户
 */
export const blacklistAuthor = (target) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target
    }
  })
}
