import {get} from '@/api/api'

const baseUrl = 'http://localhost:8002/goods/manage/categoryAttrValue'

function selectByCaId (caId) {
  return get(`${baseUrl}/selectByCaId/${caId}`, null)
}

export {selectByCaId}
