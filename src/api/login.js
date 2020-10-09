// import qs from "qs";
import httpClient, { httpCommonClient } from '../tool/axios'

// 登录按钮触发方法
export function login(data) {
  return httpClient.post('/sys/login', data)
}

// 退出触发方法
export function logout() {
  return httpClient.post('/user/logout')
}

export const getCodeImage = data =>
  httpCommonClient.get('/sys/captcha', {
    responseType: 'blob',
    params: data,
  })

export default {
  login,
  logout,
  getCodeImage,
}
