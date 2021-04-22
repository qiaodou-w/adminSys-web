import request from '@/utils/request'
const userUrl = '/user/'
export function login(data) {
  return request({
    url: userUrl + 'login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: userUrl + 'info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: userUrl + 'logout',
    method: 'post'
  })
}
