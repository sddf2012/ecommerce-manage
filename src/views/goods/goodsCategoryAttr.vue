<template>
  <el-row :gutter="10">
    <el-col :span="5" style="border-style: solid;border-radius: 4px;border-width: 1px;border-color: #B3C0D1 ">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>

        <el-tree
          class="filter-tree"
          :data="data"
          :props="treeProps"
          :filter-node-method="filterNode"
          highlight-current
          @node-click="handleNodeClick"
          ref="categoryTree">
        </el-tree>
    </el-col>
    <el-col :span=19>
      <el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="categoryId"
            label="分类id"
            width="100">
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="分类名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="attrId"
            label="属性id"
            width="100">
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="type"
            label="属性类型"
            width="100">
          </el-table-column>
          <el-table-column
            prop="selected"
            label="是否查询属性"
            width="110">
          </el-table-column>
          <el-table-column
            prop="createdUser"
            label="创建人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="createdTime"
            label="创建时间"
            width="160">
          </el-table-column>
          <el-table-column
            prop="updatedUser"
            label="最后更改人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="updatedTime"
            label="最后更新时间"
            width="160">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleAttrClick(scope.row)" type="text" size="small">明细</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>

      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {
  selectAttrsByCategoryId
} from '@/api/goods/goodsCategoryAttr-api'
import {
  getCategoryByParentId
} from '@/api/goods/goodsCategory-api'
export default {
  name: 'goodsCategoryAttr',
  watch: {
    filterText (value) {
      this.$refs.categoryTree.filter(value)
    }
  },
  data () {
    return {
      filterText: '',
      data: [],
      tableData: [],
      treeProps: {
        children: 'children',
        label: 'categoryName',
        isLeaf: 'isLeaf'
      }
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.categoryName.indexOf(value) !== -1
    },
    handleNodeClick (data) {
      selectAttrsByCategoryId(data.categoryId).then(resp => { this.tableData = resp })
    },
    handleAttrClick (row) {
    }

  },
  created: function () {
    getCategoryByParentId(0).then(resp => {
      this.data = resp
    })
  }
}
</script>

<style scoped>

</style>
