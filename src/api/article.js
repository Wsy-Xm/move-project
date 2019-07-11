import request from '@/utils/request'

/**
 * 封装文章相关的函数
 */

export const GetArticle = ({
  channelId,
  timestamp,
  withTop
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    data: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
