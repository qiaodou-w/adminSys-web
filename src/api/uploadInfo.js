import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/uploadInfo/list/fetch',
    method: 'get',
    params
  })
}
