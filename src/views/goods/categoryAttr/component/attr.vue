<template>
  <el-popover
    placement="bottom"
    width="600"
    trigger="click"
  ref="popover">
    <el-row :gutter="6">
      <el-col :span="10"><el-input v-model="attrName" placeholder="请输入属性名称"></el-input></el-col>
      <el-col :span="4"><el-button type="primary" size="medium" @click="handleSelect">查询</el-button></el-col>
    </el-row>
    <el-row>
    <el-table :data="attrData" border width="100%" @row-click="tableClick">
      <el-table-column width="100" prop="attrId" label="属性id"></el-table-column>
      <el-table-column width="140" prop="attrCode" label="属性代码"></el-table-column>
      <el-table-column width="150" prop="attrName" label="属性名称"></el-table-column>
      <el-table-column  prop="description" label="描述"></el-table-column>
    </el-table>
    </el-row>
    <el-row>
    <!--<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>-->
    </el-row>
    <el-input slot="reference" v-model="inputValue"></el-input>
  </el-popover>
</template>

<script>
import {getAttrByName} from '@/api/goods/goodsAttr-api'
export default {
  name: 'attr',
  data () {
    return {
      attrData: [],
      attrName: '',
      currentPage: 1,
      total: 0,
      inputValue: ''
    }
  },

  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleSelect () {
      getAttrByName(this.attrName).then(resp => { this.attrData = resp })
    },
    tableClick (row) {
      this.$emit('selectAttr', row.attrId, row.attrName)
      this.inputValue = row.attrName
      this.$refs.popover.showPopper = false
    }
  }
}
</script>

<style scoped>
 .el-row{
   margin-bottom: 10px;
 }
</style>
