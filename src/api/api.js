import axios from 'axios'
import {errMsg} from '@/assets/message'

const instance = axios.create({
  // baseURL: 'http://localhost:8001/',
  timeout: 2000
})

instance.interceptors.response.use(resp => {
  const data = resp.data
  const respCode = data.respCode
  const respMsg = data.respMsg
  if (respCode === '00000') {
    return data.data
  } else {
    let err = respCode + ' ' + respMsg
    errMsg(err)
    return Promise.reject(err)
  }
}, error => {
  errMsg(error.message)
  return Promise.reject(error)
})

function get (url, params) {
  return instance({
    url: url,
    method: 'get',
    params: params
  })
}

function post (url, params, data) {
  return instance({
    url: url,
    method: 'post',
    params: params,
    data: data
  })
}

export {get, post}
export default instance
