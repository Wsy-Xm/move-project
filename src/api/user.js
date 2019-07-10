import request from '@/utils/request'

// 这里是用的的api

export const login = ({ mobild, code }) => {
  request({
    method: 'POST',
    path: ' /app/v1_0/authorizations',
    data: {
      mobild,
      code
    }
  })
}
