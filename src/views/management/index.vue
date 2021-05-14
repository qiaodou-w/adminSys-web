<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.studentNumber" placeholder="学号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.counselor" placeholder="辅导员" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查找
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      :data="stuList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="studentNumber"
        label="学号"
      >
        <template slot-scope="{row}">
          <span>{{ row.studentNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="grade"
        label="年级"
      >
        <template slot-scope="{row}">
          <span>{{ row.grade }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="counselor"
        label="辅导员"
      >
        <template slot-scope="{row}">
          <span>{{ row.counselor }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话"
      >
        <template slot-scope="{row}">
          <span>{{ row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="room"
        label="寝室"
      >
        <template slot-scope="{row}">
          <span>{{ row.room }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item v-if="dialogStatus==='create'" label="认证码" prop="uuid">
          <el-input v-model="temp.uuid" />
        </el-form-item>
        <el-form-item v-if="dialogStatus==='create'" label="学号" prop="studentNumber">
          <el-input v-model="temp.studentNumber" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="temp.tel" />
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="temp.grade" />
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-select v-model="temp.college" class="filter-item" placeholder="请选择">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="寝室" prop="room">
          <el-input v-model="temp.room" />
        </el-form-item>
        <el-form-item label="辅导员" prop="counselor">
          <el-input v-model="temp.counselor" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          添加
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, add, deleteStu, update } from '@/api/student'
const calendarTypeOptions = [
  { key: 'collegeA', display_name: '学院A' },
  { key: 'collegeB', display_name: '学院B' },
  { key: 'collegeC', display_name: '学院C' },
  { key: 'collegeD', display_name: '学院D' },
  { key: 'collegeE', display_name: '学院E' }
]
export default {
  name: 'Index',
  data() {
    return {
      tableKey: 1,
      stuList: [],
      temp: {
        uuid: '',
        name: '',
        tel: '',
        grade: '',
        college: '',
        room: '',
        counselor: '',
        studentNumber: ''
      },
      calendarTypeOptions,
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [{ required: true, message: '必填', trigger: 'change' }],
        uuid: [{ required: true, message: '必填', trigger: 'change' }],
        tel: [{ required: true, message: '必填', trigger: 'change' }],
        grade: [{ required: true, message: '必填', trigger: 'change' }],
        college: [{ required: true, message: '必填', trigger: 'change' }],
        room: [{ required: true, message: '必填', trigger: 'change' }],
        studentNumber: [{ required: true, message: '必填', trigger: 'change' }],
        counselor: [{ required: true, message: '必填', trigger: 'change' }]
      },
      listQuery: {
        name: '',
        studentNumber: '',
        counselor: ''

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    resetTemp() {
      this.temp = {
        uuid: '',
        name: '',
        tel: '',
        grade: '',
        college: '',
        room: '',
        counselor: '',
        studentNumber: ''
      }
    },
    getList(params) {
      this.listLoading = true
      fetchList(params).then(res => {
        this.stuList = res.data
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList(this.listQuery)
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.temp)
          add(this.temp).then((res) => {
            switch (res.msg) {
              case '添加成功': {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: res.msg,
                  type: 'success',
                  duration: 2000
                })
                break
              }
              case '统一认证码已存在': {
                this.$notify({
                  title: '失败',
                  message: res.msg,
                  type: 'error',
                  duration: 2000
                })
                break
              }
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          update(tempData).then(() => {
            const index = this.stuList.findIndex(v => v.uuid === this.temp.uuid)
            this.stuList.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    async handleDelete(row, index) {
      const res = await deleteStu({ uuid: row.uuid })
      this.$notify({
        title: '成功',
        message: res.msg,
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    }
  }
}
</script>
<style scoped />
