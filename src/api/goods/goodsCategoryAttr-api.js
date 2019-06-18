import {get, post} from '@/api/api'

const baseUrl = 'http://localhost:8002/goods/manage/categoryAttr'

function selectAttrsByCategoryId (categoryId) {
  return get(`${baseUrl}/getGoodsCategoryAttr/${categoryId}`, null)
}

function pageSelectAttrsByCategoryId (categoryId, pageNum, pageSize) {
  return get(`${baseUrl}/getGoodsCategoryAttrPage/${categoryId}`, {pageNum: pageNum, pageSize: pageSize})
}

function saveCategoryAttr (data) {
  return post(`${baseUrl}/saveCategoryAttr`, null, data)
}

function deleteCaById (caId) {
  return get(`${baseUrl}/deleteCaById/${caId}`, null)
}

export {selectAttrsByCategoryId, pageSelectAttrsByCategoryId, saveCategoryAttr, deleteCaById}
