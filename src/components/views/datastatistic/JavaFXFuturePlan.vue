<template>
  <div>
    <el-calendar style="width: 60%;height: 20px">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
          slot="dateCell"
          slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          <span>{{
              data.isSelected ? data.day.split('-').slice(1).join('-') : data.day.split('-').slice(2).join('-')
            }}</span>
          <span @click="clickDate(date,data)">{{ data.isSelected ? '✔️' : '' }}</span>
          <br/>
          <el-popover
              placement="top-start"
              :title="popoverBadgeShowTitle(date)"
              width="200"
              trigger="hover"
              content="">
            <el-badge v-if="isShowCircle(date)" is-dot class="item" slot="reference"></el-badge>
          </el-popover>
        </p>

      </template>
    </el-calendar>
    <el-table
        :data="tableData"
        :row-style="{height: '86px'}"
        style="width: 40%;margin-left: 59%;margin-top: 56.5px">
      <el-table-column
          prop="name"
          label="事件名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="date"
          label="截止日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="dayRemain"
          label="距离今日剩">
      </el-table-column>
      <el-table-column
          label="删除">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" @click="delTableData(scope.$index)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="编辑事件信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <div>
        <el-form ref="form" :model="addTableData" label-width="40px">
          <el-form-item>
            <span style="font-size: 24px;float: left">事件名称:</span><input v-model="addTableData.name"/>
          </el-form-item>
          <el-form-item>
            <span style="font-size: 24px;float: left">截止日期:</span>
            <el-date-picker
                style="width: 281px;border-color: black"
                v-model="addTableData.date"
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
export default {
  name: "JavaFXFuturePlan",
  data() {
    return {
      tableData: [{
        date: '2023-04-05',
        name: '论文50%',
        dayRemain: 0
      }, {
        date: '2023-04-15',
        name: 'C语言复习',
        dayRemain: 0
      }, {
        date: '2023-03-29',
        name: '爬塔',
        dayRemain: 0
      }, {
        date: '2023-03-29',
        name: '板！',
        dayRemain: 0
      }, {
        date: '2023-03-29',
        name: '牌！',
        dayRemain: 0
      }],
      addTableData: {
        date: '',
        name: '',
        dayRemain: 0
      },
      dialogVisible: false,
    }
  },
  computed: {},
  watch: {
    tableData: {
      deep: true,
      handler() {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].dayRemain === null) {
            this.tableData.splice(i, 1)
          }
        }
        localStorage.setItem("JavaFXFutureTableData", JSON.stringify(this.tableData))
      }
    }
  },
  methods: {
    isShowCircle(date) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (date.setHours(0, 0, 0, 0).valueOf() === new Date(this.tableData[i].date).setHours(0, 0, 0, 0).valueOf()) {
          return true;
        }
      }
      return false
    },
    clickDate(date, data) {
      this.dialogVisible = true
      this.addTableData.date = date
      console.log('点击了一下' + date, data)
    },
    popoverBadgeShowTitle(date) {
      let ans = ''
      for (let i = 0; i < this.tableData.length; i++) {
        if (date.setHours(0, 0, 0, 0).valueOf() === new Date(this.tableData[i].date).setHours(0, 0, 0, 0).valueOf()) {
          ans += this.tableData[i].name
          ans += '\r\n'
        }
      }
      return ans
    },
    handleClose() {
      this.dialogVisible = false
    },
    confirm() {
      this.dialogVisible = false
      //this.tableData[this.userIndex] = this.editUser   由于 JavaScript 的限制，Vue 不能检测数组和对象的变化。深入响应式原理
      // Vue.set(this.tableData, this.userIndex, this.editUser)

      this.addTableData.date = this.addTableData.date.getFullYear() + '-' + (this.addTableData.date.getMonth() + 1) + '-' + this.addTableData.date.getDate()

      this.tableData.push({
        date: this.addTableData.date,
        name: this.addTableData.name,
        dayRemain: this.addTableData.dayRemain
      })
      this.addTableData.date = ''
      this.addTableData.name = ''
      this.addTableData.dayRemain = ''

      this.updateTableDayRemain();
      this.sortTableByDate()
    },
    updateTableDayRemain() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].dayRemain = Math.ceil((new Date(this.tableData[i].date) - new Date()) / 1000 / 60 / 60 / 24) >= 0 ? Math.ceil((new Date(this.tableData[i].date) - new Date()) / 1000 / 60 / 60 / 24) + '天' : null
      }
    },
    delTableData(index) {
      this.tableData.splice(index, 1)
    },
    sortTableByDate() {
      this.tableData = this.tableData.sort(function (a, b) {
        return (new Date(a.date).valueOf()) > (new Date(b.date).valueOf()) ? 1 : -1
      })
      return this.tableData
    },
  },
  mounted() {
    const tableDataTmp = JSON.parse(localStorage.getItem("JavaFXFutureTableData"))
    this.tableData = tableDataTmp
    this.updateTableDayRemain();
  }
}
</script>

<style scoped>

</style>