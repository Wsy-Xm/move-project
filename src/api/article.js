import request from '@/utils/request'

/**
 * 封装文章相关的函数
 */

export const getArticle = ({
  channelId,
  timestamp,
  withTop
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}

/**
 * 对文章不喜欢
 */
export const dislikeArticle = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target
    }
  })
}
