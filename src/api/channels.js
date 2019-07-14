import request from '@/utils/request'

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

/**
 * 获取全部频道列表
 */

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

/**
 * 批量修改用户频道列表
 */

export const amendChannels = (channels) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}

/**
 * 删除登陆指定用户频道
 */

export const delUserChannels = channelsId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelsId}`
  })
}
