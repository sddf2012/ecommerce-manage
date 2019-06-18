import {get} from '../api'
const baseUrl = 'http://localhost:8002/goods/manage/attr'

function getAttrByName (attrName) {
  return get(`${baseUrl}/selectAttrByName`, {attrName: attrName})
}

export {getAttrByName}
