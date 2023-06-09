<template>
  <div id="app">
    <HelloWorld/>

    <el-container>
      <el-header>
        <GraHeader/>
      </el-header>
      <el-container>
        <el-aside width="210px">
          <SidebarMenu/>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import GraHeader from './components/GraHeader.vue'
import SidebarMenu from './components/SidebarMenu.vue'

export default {
  name: 'App',
  components: {
    HelloWorld, GraHeader, SidebarMenu,
  },
  methods: {
    getStatisticData() {
      //  请求数据
      this.axios.get('/api/getConcentratedTime').then(response => {
        this.$store.state.allStatisticData.concentratedTimeData.allData = response.data
      }).catch(function (error) {
        console.log(error)
      })
      this.axios.get('/api/getBootConcentratedTime').then(response => {
        this.$store.state.allStatisticData.concentratedTimeData.bootData = response.data
      }).catch(function (error) {
        console.log(error)
      })
      this.axios.get('/api/getUsedConcentratedTime').then(response => {
        this.$store.state.allStatisticData.concentratedTimeData.useData = response.data
      }).catch(function (error) {
        console.log(error)
      })

      this.axios.get('/api/getProgramme').then(response => {
        this.$store.state.allStatisticData.programmeData.allData = response.data
      }).catch(function (error) {
        console.log(error)
      })

      this.axios.get('/api/getTask').then(response => {
        this.$store.state.allStatisticData.taskData.allData = response.data
      }).catch(function (error) {
        console.log(error)
      })
      this.axios.get('/api/getDayTask').then(response => {
        this.$store.state.allStatisticData.taskData.dayData = response.data
      }).catch(function (error) {
        console.log(error)
      })
      this.axios.get('/api/getWeekTask').then(response => {
        this.$store.state.allStatisticData.taskData.weekData = response.data
      }).catch(function (error) {
        console.log(error)
      })
      this.axios.get('/api/getMonthTask').then(response => {
        this.$store.state.allStatisticData.taskData.monthData = response.data
      }).catch(function (error) {
        console.log(error)
      })
      this.axios.get('/api/getYearTask').then(response => {
        this.$store.state.allStatisticData.taskData.yearData = response.data
      }).catch(function (error) {
        console.log(error)
      })

      this.axios.get('/api/getWordList').then(response => {
        this.$store.state.allStatisticData.wordListData.allData = response.data
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted() {
    this.$store.state.user = sessionStorage.getItem("user")
    this.getStatisticData()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  font-size: 24px;
}
</style>
