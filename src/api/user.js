import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { "token":token }
  })
}

export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'post',
    data: {token: token}
  })
}

export function signup(data) {
  return request({
    url: '/user/signup',
    method: 'post',
    data
  })
}
