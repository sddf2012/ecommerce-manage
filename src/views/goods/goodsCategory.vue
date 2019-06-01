<template>
  <div>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>

    <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      lazy
      :load="loadLazy"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree2">
    </el-tree>
  </div>
</template>

<script>
import {getCategoryByParentId} from '@/api/goods/goodsCategory-api'

export default {
  name: 'goodsCategory',
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    loadLazy (node, resolve) {
      console.log('loadlazy' + Date.now())
      if (node.level === 0) {
        getCategoryByParentId(0).then(resp => {
          resolve(resp)
        })
      } else {
        getCategoryByParentId(node.data.categoryId).then(resp => {
          resolve(resp)
        })
      }
    }
  },

  /* created: function () {
    console.log('created' + Date.now())
    getCategoryByParentId(0).then(resp => {
      this.data = resp
    })
  }, */

  data () {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'childs',
        label: 'categoryName',
        isLeaf: 'isLeaf'
      }
    }
  }
}
</script>

<style scoped>

</style>
