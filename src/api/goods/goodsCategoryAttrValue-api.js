import {get, post} from '@/api/api'

const baseUrl = 'http://localhost:8002/goods/manage/categoryAttrValue'

function selectByCaId (caId) {
  return get(`${baseUrl}/selectByCaId/${caId}`, null)
}
function selectByCaIdAndValue (caId, value) {
  return get(`${baseUrl}/selectByCaId/${caId}`, {value: value})
}
function deleteCavById (cavId) {
  return get(`${baseUrl}/deleteCavById/${cavId}`, null)
}

function saveCav (data) {
  return post(`${baseUrl}/saveCav`, null, data)
}

export {selectByCaId, selectByCaIdAndValue, deleteCavById, saveCav}
