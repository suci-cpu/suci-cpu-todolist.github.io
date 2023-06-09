<template>
  <div>
    <div style="height: 300px;margin-top: 50px;float: left" v-show="!$store.state.user">
      <div v-show="!isRegister">
        <div style="font-size: 50px">{{ this.$store.state.user }}</div>
        <span>当前状态：未登录</span><br/>
        账号：<input type="text" v-model="inputUserCode" placeholder="请输入内容"
                  style="margin-bottom: 50px;margin-top: 50px"/><br/>
        密码：<input type="password" v-model="inputUserPassword" placeholder="请输入密码" style="margin-bottom: 50px"/><br/>
      </div>
      <div v-show="isRegister">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="form.userCode"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.userPassword"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.gender" placeholder="请选择活动区域">
              <el-option label="男" value="2"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="角色">
            <el-radio-group v-model="form.userRole">
              <el-radio :label="1">管理员</el-radio>
              <el-radio :label="2">用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址">
            <el-input type="textarea" v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button @click="loginWeb">登录</el-button>
      <el-button @click="registerWeb">注册</el-button>
    </div>
    <div style="margin-top: 80px;float: left" v-show="$store.state.user">
      <div style="font-size: 50px">欢迎用户：{{ this.$store.state.user ? this.$store.state.user.userName : '' }}</div>
      <div style="font-size: 50px;margin-bottom: 200px">
        用户名：{{ this.$store.state.user ? this.$store.state.user.userCode : '' }}
      </div>
      <span>当前状态：已登录</span>
      <el-button @click="logoutWeb" style="margin-left: 50px">退出</el-button>
      <br/>
      <el-button @click="loginJavaFX" style="margin-top: 100px">登录本地端</el-button>
      <el-button @click="logoutJavaFX">退出本地端</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginRegister",
  data() {
    return {
      inputUserCode: 'admin',
      inputUserPassword: '123456',
      isRegister: false,
      form: {
        userName: 'suci',
        userCode: 'person',
        userPassword: '123456',
        gender: '2',
        birthday: '2023-4-27',
        userRole: '2',
        phone: '18772289785',
        address: '黄石',
      },
    }
  },
  methods: {
    loginJavaFX() {
      this.axios.get('http://localhost:8081/doLogin?userCode=' + this.$store.state.user.userCode + '&userPassword=' + this.$store.state.user.userPassword).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    },
    logoutJavaFX() {
      this.axios.get('http://localhost:8081/doLogout').then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    },
    loginWeb() {
      if (this.isRegister) {
        this.isRegister = false
        return
      }

      this.axios.get('http://localhost:8081/getUser?userCode=' + this.inputUserCode + '&userPassword=' + this.inputUserPassword).then(response => {
        if(response.data !== ''){
          console.log(response.data)
          this.$store.state.user = response.data
          sessionStorage.setItem('user', this.$store.state.user)
        }
      }).catch(function (error) {
        console.log(error)
      })

    },
    logoutWeb() {
      sessionStorage.removeItem('user')
      this.$store.state.user = null;
    },
    registerWeb() {
      this.isRegister = true
    },
    onSubmit() {
      console.log('submit!');
      console.log(this.form.userRole)

      this.axios.get('http://localhost:8081/register?userName=' + this.form.userName +
          '&userCode=' + this.form.userCode +
          '&userPassword=' + this.form.userPassword +
          '&gender=' + this.form.gender +
          '&birthday=' + (new Date(this.form.birthday).getFullYear()+'-'+new Date(this.form.birthday).getMonth()+'-'+new Date(this.form.birthday).getDay()) +
          '&userRole=' + this.form.userRole +
          '&phone=' + this.form.phone +
          '&address=' + this.form.address).then(response => {
        this.$store.state.user = response.data
        sessionStorage.setItem('user', this.$store.state.user)
        this.isRegister = false
      }).catch(function (error) {
        console.log(error)
      })
    },
  }
}
</script>

<style scoped>

</style>