import axios from 'axios'
import * as _ from 'lodash'
import { message } from 'antd'
import Cookies from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, minimum: 0.2, easeing: 'swing', speed: 1000, trickleRate: 0.2 })

const baseSetting = {
  baseURL: process.env.NODE_ENV === 'development' ? '/' : '/api',
  timeout: 7200000,
}

const httpClient = axios.create(baseSetting)

let loadingNum = 0
const startLoading = () => {
  if (loadingNum === 0) {
    NProgress.start()
  }
  loadingNum += 1
}
const endLoading = () => {
  loadingNum -= 1
  if (loadingNum <= 0) {
    NProgress.done()
  }
}

httpClient.interceptors.request.use(
  config => {
    startLoading()
    const tempConfig = config
    const token = Cookies.get('jwt')
    // 给请求头注入token
    if (token) {
      tempConfig.headers.Authorization = `Bearer ${token}`
    }

    if (_.isObject(config)) {
      if (tempConfig.data instanceof FormData) {
        return tempConfig
      }
      if (_.isObject(tempConfig.data)) {
        tempConfig.data = _.omitBy(tempConfig.data, r => (typeof r === 'string' && _.isEmpty(r)) || _.isNil(r))
      }
      if (_.isObject(tempConfig.params)) {
        tempConfig.params = _.omitBy(tempConfig.params, r => (typeof r === 'string' && _.isEmpty(r)) || _.isNil(r))
      }
    }
    return tempConfig
  },
  error => {
    return Promise.reject(error)
  },
)

httpClient.interceptors.response.use(
  res => {
    endLoading()
    if (res?.data?.code !== 200 && res?.data?.code !== 0) {
      message.warn(res.data.message)
      return Promise.reject(res.data)
    }
    return res.data
  },
  axiosObject => {
    if (axiosObject.response.status === 401) {
      const { href } = window.location
      if (!href.includes('login')) {
        window.location.href = `/login?redirectTo=${encodeURIComponent(href)}` // TODO redirectTo 从哪来跳哪去
      }
      localStorage.removeItem('jwt')
      message.warn('未登录或者登录失效过期,请重新登录')
    }
    message.error(axiosObject.response?.data?.error)
    return Promise.reject(axiosObject.response)
  },
)

export default httpClient
export const httpCommonClient = axios.create(baseSetting)
