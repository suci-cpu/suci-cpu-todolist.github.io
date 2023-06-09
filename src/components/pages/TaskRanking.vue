<template>
  <div>
    <el-row :gutter="0" type="flex" justify="center">
      <el-col :span="8" :offset="0">
        个人排名
        <div> &nbsp;</div>
      </el-col>
      <el-col :span="8">
        任务完成情况
        <div> &nbsp;</div>
      </el-col>
      <el-col :span="8">
        单词背诵情况
        <div> &nbsp;</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div>个人排名/总用户人数：</div>
        {{ rank }}
        <div> &nbsp;</div>
      </el-col>
      <el-col :span="8">
        <div>总专注时长/总使用时长：</div>
        {{ usedTime }}
        <div> &nbsp;</div>
      </el-col>
      <el-col :span="8">
        <div>已背诵单词/未背诵单词：</div>
        {{ recitedWord }}
        <div> &nbsp;</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div></div>
        {{ }}
        <div> &nbsp;</div>
      </el-col>
      <el-col :span="8">
        <div> 今日完成任务：</div>
        {{ todayProgramme }}
        <div> &nbsp;</div>
      </el-col>
      <el-col :span="8">
        <div> 已认识单词/未记住单词：</div>
        {{ isKnownWord }}
        <div> &nbsp;</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
      </el-col>
      <el-col :span="8">
        <pie-chart style="height: 410px;width: 600px;margin-left: 530px"/>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
    <el-statistic
        ref="statistic"
        :value="deadline4"
        title="距离明日仅剩："
        time-indices
    ></el-statistic>
    <div style="font-size: 60px">
      <div> &nbsp;</div>
      {{ evaluate }}
    </div>
  </div>
</template>
<script>

import PieChart from "@/components/views/datastatistic/PieChart";

export default {
  name: "TaskRanking",
  components: {PieChart},
  data() {
    return {
      rank: 'rank',
      usedTime: 'usedTime',
      recitedWord: 'recitedWord',
      todayProgramme: 'todayProgramme',
      todayRecite: 'todayRecite',
      isKnownWord: 'isKnownWord',
      deadline4: Date.now() + (new Date().setHours(23, 59, 59) - Date.now()),
      evaluate: '',
    }
  },
  methods: {},
  mounted() {
    this.usedTime = Math.floor(this.$store.state.allStatisticData.concentratedTimeData.bootData / 1000 / 60 / 60)
        + ' / ' + Math.floor(this.$store.state.allStatisticData.concentratedTimeData.useData / 1000 / 60 / 60)

    this.axios.get('http://localhost:8081/getUserCount').then(response => {
      console.log(response.data)
      this.rank = 1 + ' / ' + response.data
    }).catch(function (error) {
      console.log(error)
    })

    let wordListData = this.$store.state.allStatisticData.wordListData.allData
    let seeTimes = 0
    let noSeeTimes = 0
    let isKnownTimes = 0
    let notKnownTimes = 0
    for (let i = 0; i < wordListData.length; i++) {
      if (wordListData[i].totalTimes !== 0) {
        seeTimes++
      } else {
        noSeeTimes++
      }

      if (wordListData[i].totalTimes !== 0) {
        const num = ((wordListData[i].totalTimes * 0.0497 + wordListData[i].knowTimes * 0.393 - wordListData[i].vagueTimes * 0.1393 - wordListData[i].foolTimes * 0.418))
        if (num > 1) {
          isKnownTimes++
        } else {
          notKnownTimes++
        }
      }
    }
    this.recitedWord = seeTimes + ' / ' + noSeeTimes

    this.todayProgramme = this.$store.state.allStatisticData.taskData.dayData.length

    if (this.$store.state.allStatisticData.taskData.dayData.length === 0) {
      this.evaluate = '请开始今天的学习'
    } else if (this.$store.state.allStatisticData.taskData.dayData.length < 10) {
      this.evaluate = '还需要继续努力'
    } else {
      this.evaluate = '完成的很好，继续保持'
    }

    this.isKnownWord = isKnownTimes +' / '+ notKnownTimes


    while (this.$store.state.allStatisticData.taskData.pieData.length > 0) {
      this.$store.state.allStatisticData.taskData.pieData.pop()
    }

    this.$store.state.whichChartType = '饼状图'
    this.$store.state.tittle = {
      text: '饼状图',
      subtext: '已专注时长-已使用时长',
      left: 'center'
    }

    this.$store.state.allStatisticData.taskData.pieData.push({value: Math.floor(this.$store.state.allStatisticData.concentratedTimeData.bootData / 1000 / 60 / 60), name: '已专注时长'})
    this.$store.state.allStatisticData.taskData.pieData.push({value: Math.floor(this.$store.state.allStatisticData.concentratedTimeData.useData / 1000 / 60 / 60), name: '已使用时长'})
  },
}
</script>

<style scoped>

</style>