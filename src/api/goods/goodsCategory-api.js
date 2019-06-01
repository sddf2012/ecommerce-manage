import {get} from '../api'
const baseUrl = 'http://localhost:8002/goods/manage/category'

function getCategoryByParentId (parentId) {
  console.log('getCategoryByParentId' + Date.now())
  return get(`${baseUrl}/search/${parentId}`, null)
}

export {getCategoryByParentId}
