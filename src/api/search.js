import request from '@/utils/request'

/**
 * 获取联想建议
 */
export const associateSearch = (q) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取联想建议
 */
export const searchResult = ({ page, perPage, q }) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params: {
      page,
      per_page: perPage,
      q
    }
  })
}
