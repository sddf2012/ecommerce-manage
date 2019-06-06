import {get} from '@/api/api'

const baseUrl = 'http://localhost:8002/goods/manage/categoryAttr'

function selectAttrsByCategoryId (categoryId) {
  return get(`${baseUrl}/getGoodsCategoryAttr/${categoryId}`, null)
}

export {selectAttrsByCategoryId}
