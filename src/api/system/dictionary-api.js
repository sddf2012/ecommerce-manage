import {get, post} from '../api'
const baseUrl = 'http://localhost:8100/system/dictionary'

function getByCode (code) {
  return get(`${baseUrl}/getByCode/${code}`, null)
}

function getByCodes (codes) {
  return post(`${baseUrl}/getByCodes`, null, codes)
}

export {getByCode, getByCodes}
