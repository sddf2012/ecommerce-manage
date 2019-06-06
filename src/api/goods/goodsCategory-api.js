import {get, post} from '../api'
const baseUrl = 'http://localhost:8002/goods/manage/category'

function getCategoryByParentId (parentId) {
  return get(`${baseUrl}/searchAll/${parentId}`, null)
}
function removeNode (categoryId) {
  return get(`${baseUrl}/deleteCategory/${categoryId}`, null)
}
function saveCategory (data) {
  return post(`${baseUrl}/saveCategory`, null, data)
}
export {getCategoryByParentId, removeNode, saveCategory}
