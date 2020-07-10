import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'
/*import {guid} from './publicFunctions'*/
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000, // request timeout
  headers: {
      'content-type': 'application/json;charset=UTF-8',
  },
  //withCredentials: true, // default

})

// request interceptor
service.interceptors.request.use(config => {
  // config.headers['Y-Token'] = 'CBC9A1546D823D6319770C28C3E9D83F'
  // Do something before request is sent
  // if (Cookies.get('Y-Token')) {
    config.headers['Y-Token'] = Cookies.get('Y-Token')// 让每个请求携带token-- ['Y-Token']为自定义key 请根据实际情况自行修改
    // config.headers['Y-Token'] = '79c7c449f41347dbafd3017ff83513af'// 让每个请求携带token-- ['Y-Token']为自定义key 请根据实际情况自行修改
  // }
  /*config.headers['sign'] = guid()*/
  return config
}, error => {
  // Do something with request error

  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // console.log('err' + error)// for debug
    Message({
      message: '网络错误',
      type: 'error',
      duration: 2 * 1000
    })
    // Message({
    //   message: error,
    //   type: 'error',
    //   duration: 60*50
    // })
    return Promise.reject(error)
  }
)

export default service
