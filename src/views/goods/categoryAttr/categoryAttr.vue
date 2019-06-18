<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <el-row :gutter="10">
      <el-col :span="5" style="border-style: solid;border-radius: 4px;border-width: 1px;border-color: #B3C0D1 ">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>

        <el-tree
          class="filter-tree"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterNode"
          highlight-current
          @node-click="handleNodeClick"
          ref="categoryTree">
        </el-tree>
      </el-col>
      <el-col :span=19>
        <el-row style="text-align: left">
          <el-button type="primary" size="medium" @click="handleAddButtonClick">新增属性</el-button>
        </el-row>
        <el-row>
          <el-table
            :data="tableData"
            border
            style="width: 100%" highlight-current-row
            @row-click="handleRowClick" fix>
            <el-table-column
              prop="caId"
              label="分类属性id"
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
              <template v-slot:default="prop">{{getLabel1(prop.row)}}</template>
            </el-table-column>
            <el-table-column
              prop="selected"
              label="是否查询属性"
              width="110">
              <template v-slot:default="prop">{{getLabel2(prop.row)}}</template>
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
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleAttrEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="deleteAttr(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <el-row style="text-align: left">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="table1CurrentPage"
            :page-sizes="[1,2]"
            :page-size="table1PageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="table1Total">
          </el-pagination>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="5">
            <el-input v-model="attrValue" placeholder="请输入属性值"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="medium" @click="handleSelectAttrValue">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="medium" @click="handleAddAttrValue">新增属性值</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-table
            :data="detailTableData"
            highlight-current-row style="width: 371px" border>
            <el-table-column
              prop="cavId"
              label="属性值id"
              width="120">
            </el-table-column>
            <el-table-column
              prop="value"
              label="属性值"
              width="150">
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="deleteAttrValue(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

      </el-col>
    </el-row>

    <el-dialog title="编辑属性" :visible="editFormVisible">
      <el-form :model="editForm" label-position="left" ref="editAttrForm" :rules="rules">
        <el-row>
          <el-col :span="10">
            <el-form-item label="属性类型" :label-width="formLabelWidth" prop="type">
              <el-select v-model="editForm.type" placeholder="请选择属性类型" >
                <el-option label="关键属性" value="1"></el-option>
                <el-option label="销售属性" value="2"></el-option>
                <el-option label="其他属性" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="是否查询属性" :label-width="formLabelWidth" prop="selected">
              <el-select v-model="editForm.selected" placeholder="请选择是否查询属性">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditCaForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增属性" :visible.sync="addCaFormVisible">
      <el-form :model="addForm" label-position="left" ref="addAttrForm" :rules="rules">
        <el-row>
          <el-col :span="10">
            <el-form-item label="属性" :label-width="formLabelWidth">
              <!--<el-input v-model="addForm.name" autocomplete="off"></el-input>-->
              <AttrSelect @selectAttr="selectAttr"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="属性类型" :label-width="formLabelWidth" prop="type">
              <el-select v-model="addForm.type" placeholder="请选择属性类型">
                <el-option label="关键属性" value="1"></el-option>
                <el-option label="销售属性" value="2"></el-option>
                <el-option label="其他属性" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="是否查询属性" :label-width="formLabelWidth" prop="selected">
              <el-select v-model="addForm.selected" placeholder="请选择是否查询属性">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCaFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddCaForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增属性值" :visible="addCavVisible">
      <el-input v-model="addAttrValue" placeholder="请输入属性值" label="属性值"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCavVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCav">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  pageSelectAttrsByCategoryId, saveCategoryAttr, deleteCaById
} from '@/api/goods/goodsCategoryAttr-api'
import {
  getCategoryByParentId
} from '@/api/goods/goodsCategory-api'
import {selectByCaIdAndValue, deleteCavById, saveCav} from '@/api/goods/goodsCategoryAttrValue-api'
import AttrSelect from './component/attr'
import {GoodsCategoryAttrSaveVo} from '../goods'
import {warnMsg} from '@/assets/message'
import {getByCodes} from '@/api/system/dictionary-api'

export default {
  name: 'goodsCategoryAttr',
  components: {
    AttrSelect
  },
  watch: {
    filterText (value) {
      this.$refs.categoryTree.filter(value)
    }
  },
  data () {
    return {
      filterText: '',
      treeData: [],
      tableData: [],
      detailTableData: [],
      table1CurrentPage: 1,
      table1Total: 0,
      table1PageSize: 1,
      table2CurrentPage: 1,
      table2Total: 0,
      table2PageSize: 10,
      dict_type: new Map(),
      dict_selected: new Map(),
      currentCategoryId: '',
      currentCaId: '',
      currentAttrRow: {},
      attrValue: '',
      treeProps: {
        children: 'children',
        label: 'categoryName',
        isLeaf: 'isLeaf'
      },
      addCaFormVisible: false,
      editFormVisible: false,
      addCavVisible: false,
      editForm: {},
      formLabelWidth: '120px',
      addForm: {},
      addAttrValue: '',
      rules: {
        attrName: [
          {required: true, message: '请选择属性', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择属性类型', trigger: 'blur'}
        ],
        selected: [
          {required: true, message: '请选择是否为查询属性', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.categoryName.indexOf(value) !== -1
    },
    handleNodeClick (data) {
      this.currentCategoryId = data.categoryId
      this.selectAttrs(data.categoryId)
    },
    selectAttrs (categoryId) {
      pageSelectAttrsByCategoryId(categoryId, this.table1CurrentPage, this.table1PageSize).then(resp => {
        this.tableData = resp.data
        this.table1Total = resp.total
      })
    },
    handleCurrentChange (val) {
      this.table1CurrentPage = val
      pageSelectAttrsByCategoryId(this.currentCategoryId, val, this.table1PageSize).then(resp => {
        this.tableData = resp.data
        this.table1Total = resp.total
      })
    },
    handleSizeChange (val) {
      this.table1PageSize = val
      pageSelectAttrsByCategoryId(this.currentCategoryId, this.table1CurrentPage, val).then(resp => {
        this.tableData = resp.data
        this.table1Total = resp.total
      })
    },
    getLabel1 (row) {
      return this.dict_type.get(row.type.toString())
    },
    getLabel2 (row) {
      return this.dict_selected.get(row.selected.toString())
    },
    handleAddButtonClick () {
      if (this.currentCategoryId === '') {
        warnMsg('请选择分类')
      } else {
        this.addCaFormVisible = true
      }
    },
    handleRowClick (row) {
      this.currentCaId = row.caId
    },
    handleSelectAttrValue () {
      this.selectAttrValue()
    },
    selectAttrValue () {
      if (this.currentCaId !== '') {
        selectByCaIdAndValue(this.currentCaId, this.attrValue).then(resp => {
          this.detailTableData = resp
        })
      }
    },
    handleAttrEdit (row) {
      this.currentAttrRow = row
      // this.editForm.type = row.type
      // this.editForm.selected = row.selected
      this.editFormVisible = true
    },
    submitEditCaForm () {
      this.$refs['editAttrForm'].validate(valid => {
        if (valid) {
          let addVo = new GoodsCategoryAttrSaveVo(this.currentAttrRow.caId, null, null, this.currentAttrRow.attrName, this.editForm.type, this.editForm.selected, 'system')
          saveCategoryAttr(addVo).then(resp => { this.selectAttrs(this.currentCategoryId) })
          this.editFormVisible = false
          this.currentCaId = ''
          this.currentAttrRow = {}
        } else {
          return false
        }
      })
    },
    deleteAttr (row) {
      deleteCaById(row.caId).then(resp => { this.selectAttrs(this.currentCategoryId) })
    },
    deleteAttrValue (row) {
      deleteCavById(row.cavId).then(resp => { this.selectAttrValue() })
    },
    selectAttr (attrId, attrName) {
      this.addForm.attrId = attrId
      this.addForm.attrName = attrName
    },
    submitAddCaForm () {
      this.$refs['addAttrForm'].validate(valid => {
        if (valid) {
          let addVo = new GoodsCategoryAttrSaveVo(null, this.currentCategoryId, this.addForm.attrId, this.addForm.attrName, this.addForm.type, this.addForm.selected, 'system')
          saveCategoryAttr(addVo).then(resp => { this.selectAttrs(this.currentCategoryId) })
          this.addCaFormVisible = false
          this.currentCaId = ''
          this.currentAttrRow = {}
        } else {
          return false
        }
      })
    },
    handleAddAttrValue () {
      this.addCavVisible = true
    },
    submitCav () {
      if (this.addAttrValue === '') {
        warnMsg('请输入属性值')
        return false
      } else {
        saveCav({caId: this.currentCaId, value: this.addAttrValue, operator: 'system'}).then(resp => { this.selectAttrValue() })
        this.addAttrValue = ''
        this.addCavVisible = false
      }
    }
  },
  created: function () {
    getCategoryByParentId(0).then(resp => {
      this.treeData = resp
    })
    getByCodes(['attr_type', 'attr_selected']).then(resp => {
      if (resp != null && resp.length > 0) {
        resp.forEach(data => {
          if (data.code === 'attr_type') {
            this.dict_type.set(data.itemCode, data.itemValue)
          }
          if (data.code === 'attr_selected') {
            this.dict_selected.set(data.itemCode, data.itemValue)
          }
        })
      }
    })
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 10px;
  }
</style>
