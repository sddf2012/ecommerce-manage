// GoodsCategory 商品分类相关
class GoodsCategorySaveVo {
  constructor (categoryId, parentId, categoryCode, categoryName, operator) {
    this.categoryId = categoryId
    this.parentId = parentId
    this.categoryCode = categoryCode
    this.categoryName = categoryName
    this.operator = operator
  }
}

class GoodsCategoryAttrSaveVo {
  constructor (caId, categoryId, attrId, attrName, type, selected, operator) {
    this.caId = caId
    this.categoryId = categoryId
    this.attrName = attrName
    this.attrId = attrId
    this.type = type
    this.selected = selected
    this.operator = operator
  }
}

export {GoodsCategorySaveVo, GoodsCategoryAttrSaveVo}
