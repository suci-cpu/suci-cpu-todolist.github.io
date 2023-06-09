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
      <el-menu-item index="1">选择需要展示的单词数据：</el-menu-item>
      <el-submenu index="2">
        <template slot="title"><span>数据范围</span></template>
        <el-menu-item index="2-1" @click="chooseDayData" disabled>日</el-menu-item>
        <el-menu-item index="2-2" @click="chooseWeekData" disabled>周</el-menu-item>
        <el-menu-item index="2-3" @click="chooseMonthData" disabled>月</el-menu-item>
        <el-menu-item index="2-4" @click="chooseYearData" disabled>年</el-menu-item>
        <el-submenu index="2-5" disabled>
          <template slot="title"><span>自定义</span></template>
          <el-menu-item index="2-4-1">开始 - datepicker</el-menu-item>
          <el-menu-item index="2-4-2">结束 - datepicker</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><span>图表类型</span></template>
        <el-menu-item index="3-1" @click="chooseBarChart">柱状图</el-menu-item>
        <el-menu-item index="3-2" @click="chooseLineChart">折线图</el-menu-item>
        <el-menu-item index="3-3" @click="choosePieChart">饼状图</el-menu-item>
        <el-menu-item index="3-4" @click="chooseScatterChart">散点图</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        {{this.$store.state.whichChartType}}
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
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    chooseDayData() {
      this.clearData()
      this.$store.state.whichDataType = '日'
      console.log(this.$store.state.xAxis)
    },
    chooseWeekData() {
      this.clearData()
      this.$store.state.xAxis.push("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
      this.$store.state.whichDataType = '周'
      console.log(this.$store.state.xAxis)
    },
    chooseMonthData() {
      this.clearData()
      for (let i = 1; i <= 30; i++) {
        this.$store.state.xAxis.push(i)
      }
      this.$store.state.whichDataType = '月'
      console.log(this.$store.state.xAxis)
    },
    chooseYearData() {
      this.clearData()
      for (let i = 1; i <= 365; i++) {
        this.$store.state.xAxis.push(i)
      }
      this.$store.state.whichDataType = '年'
      console.log(this.$store.state.xAxis)
    },
    clearData() {
      while (this.$store.state.xAxis.length > 0) {
        this.$store.state.xAxis.pop()
      }
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
    clearScatterData() {
      while (this.$store.state.allStatisticData.scatterData.length > 0) {
        this.$store.state.allStatisticData.scatterData.pop()
      }
    },
    chooseBarChart() {
      this.$store.state.whichChartType = '柱状图'
      this.$store.state.tittle = {
        text: '柱状图',
        subtext: '见过单词-见过次数',
        left: 'center'
      }

      this.clearXAxisData()
      this.clearYData()
      let wordListData = this.$store.state.allStatisticData.wordListData.allData
      for (let i = 0; i < wordListData.length; i++) {
        if (wordListData[i].totalTimes !== 0) {
          this.$store.state.xAxis.push(wordListData[i].word)
          this.$store.state.yData.push(wordListData[i].totalTimes)
        }
      }

    },
    chooseLineChart() {
      this.$store.state.whichChartType = '折线图'
      this.$store.state.tittle = {
        text: '折线图',
        subtext: '不认识单词-不认识数量',
        left: 'center'
      }

      this.clearXAxisData()
      this.clearYData()
      let wordListData = this.$store.state.allStatisticData.wordListData.allData
      for (let i = 0; i < wordListData.length; i++) {
        if (wordListData[i].foolTimes !== 0) {
          this.$store.state.xAxis.push(wordListData[i].word)
          this.$store.state.yData.push(wordListData[i].foolTimes)
        }
      }


    },
    choosePieChart() {
      this.$store.state.whichChartType = '饼状图'
      this.$store.state.tittle = {
        text: '饼状图',
        subtext: '已背诵单词-未背诵单词',
        left: 'center'
      }

      this.clearPieData()
      let wordListData = this.$store.state.allStatisticData.wordListData.allData
      let seeTimes = 0
      let noSeeTimes = 0
      for (let i = 0; i < wordListData.length; i++) {
        if (wordListData[i].totalTimes !== 0) {
          seeTimes++
        } else {
          noSeeTimes++
        }
      }
      this.$store.state.allStatisticData.taskData.pieData.push({value: seeTimes, name: '已背诵单词'})
      this.$store.state.allStatisticData.taskData.pieData.push({value: noSeeTimes, name: '未背诵单词'})


    },
    chooseScatterChart() {
      this.$store.state.whichChartType = '散点图'
      this.$store.state.tittle = {
        text: '散点图',
        subtext: '单词记忆度-数量',
        left: 'center'
      }

 
      this.clearScatterData()
      let wordListData = this.$store.state.allStatisticData.wordListData.allData
      for (let i = 0; i < wordListData.length; i++) {
        if (wordListData[i].knowTimes !== 0) {
          const count = wordListData[i].totalTimes + wordListData[i].knowTimes + wordListData[i].vagueTimes + wordListData[i].foolTimes;
          const num = ((wordListData[i].totalTimes * 0.0497 + wordListData[i].knowTimes * 0.393 - wordListData[i].vagueTimes * 0.1393 - wordListData[i].foolTimes * 0.418))
          this.$store.state.allStatisticData.scatterData.push([count, num])
        }
      }


    },
  },
  mounted() {

  }
}
</script>

<style scoped>
* {
  font-size: 24px;
}
</style>