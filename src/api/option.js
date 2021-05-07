import request from '@/utils/request'

export function fetchAdminList(params) {
  return request({
    url: '/setting/list',
    method: 'get',
    params
  })
}

export function addAdmin(data) {
  return request({
    url: '/setting/addAdmin',
    method: 'post',
    data
  })
}

export function updateAdmin(data) {
  return request({
    url: '/setting/updateAdmin',
    method: 'post',
    data
  })
}

export function deleteAdmin(data) {
  return request({
    url: '/setting/deleteAdmin',
    method: 'post',
    data
  })
}
