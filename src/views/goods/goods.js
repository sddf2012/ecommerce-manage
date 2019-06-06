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

export {GoodsCategorySaveVo}
