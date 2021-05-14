import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/management/list/fetch',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/management/add',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/management/update',
    method: 'post',
    data
  })
}

export function deleteStu(data) {
  return request({
    url: '/management/delete',
    method: 'post',
    data
  })
}
