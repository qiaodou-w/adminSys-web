<template>
  <div class="app-container">
    <!--    <div class="filter-container">-->
    <!--    </div>-->
    <el-table
      :key="tableKey"
      :data="stuList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="uuid"
        label="学号"
      >
        <template slot-scope="{row}">
          <span>{{ row.uuid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
        <template slot-scope="{row}">
          <span>{{ row.owner.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="hasTouch"
        label="年级"
      >
        <template slot-scope="{row}">
          <span>{{ row.owner.grade }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="hasTravel"
        label="辅导员"
      >
        <template slot-scope="{row}">
          <span>{{ row.owner.counselor }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="hasWrong"
        label="电话"
      >
        <template slot-scope="{row}">
          <span>{{ row.owner.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="location"
        label="打卡地点"
      >
        <template slot-scope="{row}">
          <span>{{ row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="打卡时间"
      >
        <template slot-scope="{row}">
          <span>{{ parseTime(new Date(row.time)) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">-->
    <!--      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">-->
    <!--        <el-form-item v-if="dialogStatus==='create'" label="认证码" prop="uuid">-->
    <!--          <el-input v-model="temp.uuid" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item v-if="dialogStatus==='create'" label="学号" prop="studentNumber">-->
    <!--          <el-input v-model="temp.studentNumber" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="姓名" prop="name">-->
    <!--          <el-input v-model="temp.name" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="电话" prop="tel">-->
    <!--          <el-input v-model="temp.tel" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="年级" prop="grade">-->
    <!--          <el-input v-model="temp.grade" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="学院" prop="college">-->
    <!--          <el-select v-model="temp.college" class="filter-item" placeholder="请选择">-->
    <!--            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="寝室" prop="room">-->
    <!--          <el-input v-model="temp.room" />-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="辅导员" prop="counselor">-->
    <!--          <el-input v-model="temp.counselor" />-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <div slot="footer" class="dialog-footer">-->
    <!--        <el-button @click="dialogFormVisible = false">-->
    <!--          取消-->
    <!--        </el-button>-->
    <!--        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">-->
    <!--          添加-->
    <!--        </el-button>-->
    <!--      </div>-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
import { fetchList } from '@/api/uploadInfo'
import { parseTime } from '@/utils'

export default {
  name: 'Index',
  data() {
    return {
      tableKey: 1,
      stuList: [],
      temp: {
        uuid: '',
        tel: '',
        grade: '',
        college: '',
        room: '',
        counselor: '',
        studentNumber: '',
        time: '',
        location: '',
        hasWrong: '',
        hasTravel: '',
        hasTouch: '',
        other: ''
      },
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
    parseTime,
    getList(params) {
      this.listLoading = true
      fetchList(params).then(res => {
        console.log(res.data)
        this.stuList = res.data
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList(this.listQuery)
    }
    // async handleDelete(row, index) {
    //   const res = await deleteStu({ uuid: row.uuid })
    //   this.$notify({
    //     title: '成功',
    //     message: res.msg,
    //     type: 'success',
    //     duration: 2000
    //   })
    //   this.stuList.splice(index, 1)
    // }
  }
}
</script>
<style scoped />
