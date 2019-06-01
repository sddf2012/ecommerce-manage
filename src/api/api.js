import axios from 'axios'
import {
  Message
} from 'element-ui'

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
    Message({
      message: err,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(err)
  }
}, error => {
  Message({
    message: error,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

function get (url, params) {
  console.log('get' + Date.now())
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
