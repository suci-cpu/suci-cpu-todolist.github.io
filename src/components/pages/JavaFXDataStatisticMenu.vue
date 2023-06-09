<template>
  <div>
    <el-menu
        :default-active="activeIndex4"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="1">选择需要展示的任务数据：</el-menu-item>
      <el-submenu index="2">
        <template slot="title"><span>数据范围</span></template>
        <el-menu-item index="2-1" @click="chooseDayData">日</el-menu-item>
        <el-menu-item index="2-2" @click="chooseWeekData">周</el-menu-item>
        <el-menu-item index="2-3" @click="chooseMonthData">月</el-menu-item>
        <el-menu-item index="2-4" @click="chooseYearData">年</el-menu-item>
        <el-submenu index="2-5" disabled>
          <template slot="title"><span>自定义</span></template>
          <el-menu-item index="2-5-1">
            <el-date-picker
                v-model="chooseDateRange"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><span>图表类型</span></template>
        <el-menu-item index="3-1" @click="chooseBarChart">柱状图</el-menu-item>
        <el-menu-item index="3-2" @click="chooseLineChart">折线图</el-menu-item>
        <el-menu-item index="3-3" @click="choosePieChart">饼状图</el-menu-item>
        <el-menu-item index="3-4" @click="chooseScatterChart" disabled>散点图</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">{{ this.$store.state.whichDataType }}数据 - {{
          this.$store.state.whichChartType
        }}：{{ this.beginTime }} - {{ this.endTime }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "DataStatistic",
  components: {},
  data() {
    return {
      activeIndex4: '4',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }],
      },
      chooseDateRange: '',
      beginTime: {},
      endTime: {},
    };
  },
  watch: {
    chooseDateRange() {
      this.$store.state.whichDataType = '自定义'

      let begin = new Date(this.chooseDateRange[0])
      let end = new Date(this.chooseDateRange[1])
      let beginTime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
      let endTime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
      this.beginTime = beginTime
      this.endTime = endTime

      this.axios.get('/api/getCustomTask', {
        params: {
          beginTime: beginTime,
          endTime: endTime,
        }
      }).then(response => {
        this.$store.state.allStatisticData.taskData.customData = response.data
        console.log(response.data)
      }).catch(function (error) {
        console.log(error)
      })

      let customData = this.$store.state.allStatisticData.taskData.customData
      if (this.$store.state.whichDataType === '自定义') {
        // if (this.$store.state.whichDataType === '自定义' && this.$store.state.whichChartType === '柱状图') {
        console.log('自定义数据柱状图')
        this.clearXAxisData()
        // for (let i = 0; i <= (end.getTime() - begin.getTime()) / 60 / 60 / 24 / 1000; i++) {
        //   const pushData = new Date(new Date().setTime(begin.getTime() + 60 * 60 * 24 * 1000 * i))
        //   this.$store.state.xAxis.push((pushData.getMonth()+1)+'-'+pushData.getDate())
        // }
        this.clearYData()
        // let count
        // let currentDate =  new Date(this.beginTime).setHours(0,0,0,0);
        for (let i = 0; i < customData.length; i++) {
          // if(new Date(customData[i].taskBeginTime).setHours(0,0,0,0) === currentDate){
          //   count++
          // }else {
          //   // for (let j = 1; j < (new Date(customData[i].taskBeginTime).setHours(0, 0, 0, 1).valueOf() - currentDate.valueOf() -1) / 60 / 60 / 24 / 1000; j++) {
          //   //   this.$store.state.yData.push(0);
          //   // }
          //   this.$store.state.yData.push(count);
          //   currentDate = new Date(customData[i].taskBeginTime).setHours(0,0,0,0)
          //   count = 1

          this.$store.state.xAxis.push(customData[i].taskName)
          this.$store.state.yData.push(customData[i].taskScore);
        }
        // this.$store.state.yData.push(count);
      }
      console.log('自定义总量' + this.$store.state.yData)
      // }

    },
  }
  ,
  methods: {
    handleSelect(key, keyPath) {
      key
      keyPath
    }
    ,
    chooseDayData() {
      this.clearXAxisData()
      this.$store.state.whichDataType = '日'
      this.beginTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
      this.endTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
      let dayData = this.$store.state.allStatisticData.taskData.dayData

      if (this.$store.state.whichDataType === '日' && this.$store.state.whichChartType === '柱状图') {
        console.log('日数据柱状图')
        this.clearYData()
        for (let i = 0; i < dayData.length; i++) {
          this.$store.state.xAxis.push(dayData[i].taskName);
          this.$store.state.yData.push(dayData[i].taskScore);
        }
      }

      this.tacklePieData(this.$store.state.allStatisticData.taskData.dayData)
    }
    ,
    chooseWeekData() {
      this.clearXAxisData()
      this.$store.state.xAxis.push("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
      this.$store.state.whichDataType = '周'
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      this.beginTime = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
      this.endTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()

      let weekData = this.$store.state.allStatisticData.taskData.weekData
      if (this.$store.state.whichDataType === '周') {
        // if (this.$store.state.whichDataType === '周' && this.$store.state.whichChartType === '柱状图') {
        console.log('周数据柱状图')
        this.clearXAxisData()
        for (let i = 0; i <= (new Date().getTime() - start.getTime()) / 60 / 60 / 24 / 1000; i++) {
          const pushData = new Date(new Date().setTime(start.getTime() + 60 * 60 * 24 * 1000 * i))
          this.$store.state.xAxis.push((pushData.getMonth() + 1) + '-' + pushData.getDate())
        }
        this.clearYData()
        let count
        let currentDate = new Date(this.beginTime).setHours(0, 0, 0, 0);
        for (let i = 0; i < weekData.length; i++) {
          if (new Date(weekData[i].taskBeginTime).setHours(0, 0, 0, 0) === currentDate) {
            count++
          } else {
            for (let j = 1; j < (new Date(weekData[i].taskBeginTime).setHours(0, 0, 0, 0).valueOf() - currentDate.valueOf() - 1) / 60 / 60 / 24 / 1000; j++) {
              this.$store.state.yData.push(0);
            }
            this.$store.state.yData.push(count);
            currentDate = new Date(weekData[i].taskBeginTime).setHours(0, 0, 0, 0)
            count = 1
          }
        }
        this.$store.state.yData.push(count);
      }
      console.log('周总量' + this.$store.state.yData)

      this.tacklePieData(this.$store.state.allStatisticData.taskData.weekData)
    }
    ,
    chooseMonthData() {
      this.clearXAxisData()
      for (let i = 1; i <= 30; i++) {
        this.$store.state.xAxis.push(i)
      }
      this.$store.state.whichDataType = '月'
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      this.beginTime = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
      this.endTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()

      let monthData = this.$store.state.allStatisticData.taskData.monthData
      if (this.$store.state.whichDataType === '月') {
        // if (this.$store.state.whichDataType === '月' && this.$store.state.whichChartType === '柱状图') {
        console.log('月数据柱状图')
        this.clearXAxisData()
        for (let i = 0; i <= (new Date().getTime() - start.getTime()) / 60 / 60 / 24 / 1000; i++) {
          const pushData = new Date(new Date().setTime(start.getTime() + 60 * 60 * 24 * 1000 * i))
          this.$store.state.xAxis.push((pushData.getMonth() + 1) + '-' + pushData.getDate())
        }
        this.clearYData()
        let count
        let currentDate = new Date(this.beginTime).setHours(0, 0, 0, 1);
        for (let i = 0; i < monthData.length; i++) {
          if (new Date(monthData[i].taskBeginTime).setHours(0, 0, 0, 0) === currentDate) {
            count++
          } else {
            for (let j = 1; j < (new Date(monthData[i].taskBeginTime).setHours(0, 0, 0, 0).valueOf() - currentDate.valueOf()) / 60 / 60 / 24 / 1000; j++) {
              this.$store.state.yData.push(0);
            }
            this.$store.state.yData.push(count);
            currentDate = new Date(monthData[i].taskBeginTime).setHours(0, 0, 0, 0)
            count = 1
          }
        }
        this.$store.state.yData.push(count);
      }
      console.log('月总量' + this.$store.state.yData)

      this.tacklePieData(this.$store.state.allStatisticData.taskData.monthData)
    }
    ,
    chooseYearData() {
      this.clearXAxisData()
      for (let i = 1; i <= 365; i++) {
        this.$store.state.xAxis.push(i)
      }
      this.$store.state.whichDataType = '年'
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
      this.beginTime = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
      this.endTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()

      let yearData = this.$store.state.allStatisticData.taskData.yearData
      if (this.$store.state.whichDataType === '年') {
        // if (this.$store.state.whichDataType === '年' && this.$store.state.whichChartType === '柱状图') {
        console.log('年数据柱状图')
        this.clearYData()
        let count
        let currentDate = new Date(this.beginTime).setHours(0, 0, 0, 10);
        for (let i = 0; i < yearData.length; i++) {
          if (new Date(yearData[i].taskBeginTime).setHours(0, 0, 0, 0) === currentDate) {
            count++
          } else {
            for (let j = 1; j < (new Date(yearData[i].taskBeginTime).setHours(0, 0, 0, 0).valueOf() - currentDate.valueOf()) / 60 / 60 / 24 / 1000; j++) {
              this.$store.state.yData.push(0);
            }
            this.$store.state.yData.push(count);
            currentDate = new Date(yearData[i].taskBeginTime).setHours(0, 0, 0, 0)
            count = 1
          }
        }
        this.$store.state.yData.push(count);
      }
      console.log('年总量' + this.$store.state.yData.length)

      this.tacklePieData(this.$store.state.allStatisticData.taskData.yearData)
    },
    clearXAxisData() {
      while (this.$store.state.xAxis.length > 0) {
        this.$store.state.xAxis.pop()
      }
    },
    clearYData() {
      while (this.$store.state.yData.length > 0) {
        this.$store.state.yData.pop()
      }
    },
    clearPieData() {
      while (this.$store.state.allStatisticData.taskData.pieData.length > 0) {
        this.$store.state.allStatisticData.taskData.pieData.pop()
      }
    },
    chooseBarChart() {
      this.$store.state.whichChartType = '柱状图'
      this.$store.state.tittle = {
        text: '柱状图',
        subtext: '数量-日期',
        left: 'center'
      }
    }
    ,
    chooseLineChart() {
      this.$store.state.whichChartType = '折线图'
      this.$store.state.tittle = {
        text: '折线图',
        subtext: '数量-日期',
        left: 'center'
      }
    }
    ,
    choosePieChart() {
      this.$store.state.whichChartType = '饼状图'
      this.$store.state.tittle = {
        text: '饼状图',
        subtext: '任务-数量',
        left: 'center'
      }
    }
    ,
    chooseScatterChart() {
      this.$store.state.whichChartType = '散点图'
      this.$store.state.tittle = {
        text: '散点图',
        subtext: '任务-数量',
        left: 'center'
      }
    },
    tacklePieData(tacklePieData) {


      this.clearPieData()
      let pieData = tacklePieData
      let pieDataName = []
      let add = true
      for (let i = 0; i < pieData.length; i++) {
        for (let j = 0; j < pieDataName.length; j++) {
          if (pieDataName[j] === pieData[i].taskName) {
            add = false
            break
          }
        }
        if (add) {
          pieDataName.push(pieData[i].taskName)
        }
        add = true
      }
      let count = 0
      for (let i = 0; i < pieDataName.length; i++) {
        for (let j = 0; j < pieData.length; j++) {
          if (pieData[j].taskName === pieDataName[i]) {
            count++
          }
        }
        this.$store.state.allStatisticData.taskData.pieData.push({value: count, name: pieDataName[i]})
        count = 0
      }
      console.log('PieData', this.$store.state.allStatisticData.taskData.pieData)
    },
  }
  ,
  mounted() {
    this.beginTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    this.endTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
  }
}
</script>

<style scoped>
* {
  font-size: 24px;
}
</style>