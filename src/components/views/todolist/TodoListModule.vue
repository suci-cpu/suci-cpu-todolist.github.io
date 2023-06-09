<template>
  <div class="header">
    <h3>TodoList</h3>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input
            placeholder="请输入任务名"
            v-model="addTodoList.name"
            clearable>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input
            placeholder="请输入任务次数"
            v-model="addTodoList.comTimes"
            clearable>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input
            placeholder="请输入备注"
            v-model="addTodoList.tips"
            clearable>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-date-picker
            v-model="addTodoList.time"
            type="date"
            placeholder="请选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-button class="add" type="primary" @click="add">添加</el-button>
    <el-table
        highlight-current-row
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          label="完成"
          width="180">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
          <input type="checkbox" checked v-model="tableData[scope.$index].isDone"
                 style="object-fit: fill;height: 18px;width: 18px">
        </template>
      </el-table-column>
      <el-table-column
          row-class-name="rowHighLight"
          prop="name"
          label="任务名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="comTimes"
          label="任务次数"
          width="180">
      </el-table-column>
      <el-table-column
          prop="tips"
          label="任务备注"
          width="240">
      </el-table-column>
      <el-table-column
          label="跳转"
          width="300">
        <template slot-scope="scope">
          <a style="text-decoration:none;" :href="''+tableData[scope.$index].isJump"
             v-show="tableData[scope.$index].isJump" target="_blank">{{ tableData[scope.$index].name }}</a>
        </template>
      </el-table-column>
      <el-table-column
          prop="time"
          label="创建时间"
          width="150">
      </el-table-column>
      <el-table-column
          prop="colTime"
          label="当前时间"
          width="150">
        <template slot-scope="scope">
          {{
            new Date(tableData[scope.$index].colTime).getFullYear() + '-' +
            (new Date(tableData[scope.$index].colTime).getMonth() + 1) + '-' +
            new Date(tableData[scope.$index].colTime).getDate()
          }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              placeholder="输入姓名搜索" @click="scope"/>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row,scope.$index)" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="del(scope.$index)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="编辑任务信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <div>
        <el-form ref="form" :model="editUser" label-width="40px">
          <el-row>
            <el-form-item>
              <span style="font-size: 24px;float: left">任务名称:</span><input v-model="editUser.name"/>
            </el-form-item>
          </el-row>
          <el-form-item>
            <span style="font-size: 24px;float: left">任务次数:</span><input v-model="editUser.comTimes"/>
          </el-form-item>
          <el-form-item>
            <span style="font-size: 24px;float: left">任务备注:</span><input v-model="editUser.tips"/>
          </el-form-item>
          <el-form-item>
            <span style="font-size: 24px;float: left">是否跳转:</span><input v-model="editUser.isJump"/>
          </el-form-item>
          <el-form-item>
            <span style="font-size: 24px;float: left">创建时间:</span>
            <el-date-picker
                style="width: 281px;border-color: black"
                v-model="editUser.time"
                type="date"
                placeholder="请选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
// import Vue from 'vue'
import {MessageBox} from 'element-ui'

export default {
  name: 'TodoListModule',
  data() {
    return {
      addTodoList: { //添加用户信息
        name: '',
        comTimes: '',
        tips: '',
        isJump: '',
        time: '',
        isDone: false,
        colTime: '',
      },
      tableData: [{
        name: '1',
        comTimes: '1',
        tips: '备注1',
        isJump: '',
        time: '2023-03-12',
        isDone: true,
        colTime: '2023-03-12',
      }, {
        name: '2',
        comTimes: '2',
        tips: '备注2',
        isJump: '',
        time: '2023-03-12',
        isDone: false,
        colTime: '2023-03-12',
      }],
      dialogVisible: false, //编辑弹框显示
      editUser: { //添加用户信息
        name: '',
        comTimes: '',
        tips: '',
        isJump: '',
        time: '',
        isDone: false,
        colTime: '',
      },
      userIndex: 0,
      search: ''
    }
  },
  methods: {
    add() {
      if (!this.addTodoList.name) {
        this.$message({
          message: '请输入任务名',
          type: 'warning'
        });
        return;
      }
      if (!this.addTodoList.comTimes) {
        this.$message({
          message: '请输入任务次数',
          type: 'warning'
        });
        return;
      }
      if (!this.addTodoList.time) {
        this.$message({
          message: '请选择创建日期',
          type: 'warning'
        });
        return;
      }
      this.addTodoList.colTime = new Date().valueOf()
      this.addTodoList.isDone = false
      this.tableData.push(this.addTodoList)
      this.addTodoList = { //添加用户信息
        name: '',
        comTimes: '',
        tips: '',
        time: '',
        isDone: false,
        colTime: '',
      }
    },
    del(idx) {
      MessageBox.confirm('此操作将永久删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(idx, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleClose() {
      this.dialogVisible = false
    },
    edit(item, idx) {
      this.userIndex = idx
      this.editUser = {
        name: item.name,
        comTimes: item.comTimes,
        tips: item.tips,
        isJump: item.isJump,
        time: item.time,
      }
      this.dialogVisible = true
    },
    confirm() {
      this.dialogVisible = false
      //this.tableData[this.userIndex] = this.editUser   由于 JavaScript 的限制，Vue 不能检测数组和对象的变化。深入响应式原理
      // Vue.set(this.tableData, this.userIndex, this.editUser)

      this.tableData[this.userIndex].name = this.editUser.name
      this.tableData[this.userIndex].comTimes = this.editUser.comTimes
      this.tableData[this.userIndex].tips = this.editUser.tips
      this.tableData[this.userIndex].isJump = this.editUser.isJump
      this.tableData[this.userIndex].time = this.editUser.time
    },
  },
  computed: {
    conputedColTime(scope) {
      const colDateObj = new Date(this.tableData[scope.$index].colTime)
      return colDateObj.getFullYear() + '-' + colDateObj.getMonth() + '-' + colDateObj.getDate()
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler: function () {
        localStorage.setItem("TodoListData", JSON.stringify(this.tableData))
      }
    }
  },
  mounted() {
    this.tableData = JSON.parse(localStorage.getItem("TodoListData"))
    const colDateTimeStamp = new Date().valueOf();

    this.tableData.forEach(function (item, index, self) {
      index;
      self;
      if (item.colTime === null || item.colTime === undefined) {
        item.colTime = new Date().valueOf();
        console.log('当前时间为空！重置！')
      }
      if (new Date(item.colTime).setHours(23, 59, 59, 999) < colDateTimeStamp) {
        item.isDone = false
        item.colTime = new Date().valueOf();
        console.log('已经是第二天！重置是否完成！')
      }
    })
  }
}
</script>

<style scoped>
h3 {
  margin: 20px;
}

.add {
  margin: 20px 0;
  width: 100%;
}
</style>