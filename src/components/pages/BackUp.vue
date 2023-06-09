<template>
  <div>
    <el-row>
      <div style="float: left;margin-top: 50px">
        <el-button style="margin-bottom: 50px;width: 300px;margin-left: 50px" @click="backup">数据备份到服务器</el-button>
        <br/>
        <el-button style="margin-bottom: 50px;width: 300px;margin-left: 50px" @click="recovery">数据下载到本地</el-button>
      </div>
    </el-row>
    <el-row>
      <el-result style="float: left" icon="success" title="同步成功"/>
      <div style="float: left;font-size: 50px;margin-top: 45px">
        数据同步：{{ this.$store.state.lastRecoveryTime == '01/01/1970 08:00:00' ? '未检测到备份数据':this.$store.state.lastRecoveryTime }}
      </div>
    </el-row>
    <el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "BackUp",
  date() {
    return {
    }
  },
  methods: {
    backup() {
      this.axios.get('http://localhost:8081/backup').then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
      setTimeout(() => {
        this.axios.get('http://localhost:8081/getRecoveryTime').then(response => {
          console.log(response.data)
          this.$store.state.lastRecoveryTime = response.data
        }).catch(function (error) {
          console.log(error)
        })
      }, 200)
    },
    recovery() {
      this.axios.get('http://localhost:8081/recovery').then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    },
  },
  mounted() {
    this.axios.get('http://localhost:8081/getRecoveryTime').then(response => {
      console.log(response.data)
      this.$store.state.lastRecoveryTime = response.data
    }).catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>

</style>