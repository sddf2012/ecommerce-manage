<template>
  <el-row :gutter="10">
    <el-col :span="5">
      <div style="border-radius: 4px">
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
          check-on-click-node
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
          ref="categoryTree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
        </el-tree>
      </div>
    </el-col>
    <el-col :span="17">
      <el-form :model="currentNode" :rules="rules" ref="categoryForm" label-width="100px">
        <el-row :gutter="1">
          <el-col :span="8">
            <el-form-item label="节点id" prop="categoryId">
              <el-input v-model="currentNode.categoryId" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="父节点id" prop="parentId">
              <el-input v-model="currentNode.parentId" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="层级" prop="level">
              <el-input v-model="currentNode.level" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="8">
            <el-form-item label="节点代码" prop="categoryCode">
              <el-input v-model="currentNode.categoryCode" @change="inputChange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="节点名称" prop="categoryName">
              <el-input v-model="currentNode.categoryName" @change="inputChange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="排序值" prop="orderValue">
              <el-input v-model="currentNode.orderValue" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="叶子节点" prop="isLeaf">
              <el-radio-group v-model="currentNode.isLeaf" disabled>
              <el-radio label="true">是</el-radio>
              <el-radio label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人" prop="createdUser">
              <el-input v-model="currentNode.createdUser" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间" prop="createdTime">
              <el-input v-model="currentNode.createdTime" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="text-align: left">
          <el-button type="primary" :disabled="submitDisabled" @click="submitForm('categoryForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import {
  getCategoryByParentId,
  removeNode,
  saveCategory
} from '@/api/goods/goodsCategory-api'
import {GoodsCategorySaveVo} from '@/views/goods/goods'
import {errMsg, successMsg} from '@/assets/message'
export default {
  name: 'goodsCategory',
  watch: {
    filterText (val) {
      this.$refs.categoryTree.filter(val)
    }
  },

  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.categoryName.indexOf(value) !== -1
    },
    handleNodeClick (current) {
      this.currentNode = current
      this.submitDisabled = (current.categoryId != null)
    },
    inputChange () {
      this.submitDisabled = false
    },
    append (data) {
      const newChild = {parentId: data.categoryId, categoryName: '请输入节点名称'}
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.categoryId === data.categoryId)
      children.splice(index, 1)
      if (data.categoryId != null) {
        removeNode(data.categoryId)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.currentNode.categoryId == null && this.currentNode.parentId == null) {
            errMsg('请先保存父节点!')
          } else {
            saveCategory(new GoodsCategorySaveVo(this.currentNode.categoryId, this.currentNode.parentId, this.currentNode.categoryCode, this.currentNode.categoryName, 'system'))
              .then(resp => {
                this.currentNode.categoryId = resp.categoryId
                this.currentNode.parentId = resp.parentId
                this.currentNode.categoryCode = resp.categoryCode
                this.currentNode.categoryName = resp.categoryName
                this.currentNode.orderValue = resp.orderValue
                this.currentNode.level = resp.level
                this.currentNode.isLeaf = resp.isLeaf
                this.currentNode.createdTime = resp.createdTime
                this.currentNode.updatedTime = resp.updatedTime
                this.currentNode.createdUser = resp.createdUser
                this.currentNode.updatedUser = resp.updatedUser
                successMsg('保存成功')
              }
              )
          }
        } else {
          return false
        }
      })
    }
  },
  data () {
    return {
      filterText: '',
      data: [],
      currentNode: {},
      submitDisabled: true,
      rules: {
        categoryCode: [
          {required: true, message: '请输入节点代码', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        categoryName: [
          {required: true, message: '请输入节点名称', trigger: 'blur'},
          {min: 1, max: 15, message: '长度在 1 到 15 个汉字', trigger: 'blur'}
        ]
      },
      treeProps: {
        children: 'children',
        label: 'categoryName',
        isLeaf: 'isLeaf'
      }
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
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
