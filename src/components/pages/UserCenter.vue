<template>
  <div>
    <div style="margin-left: 50px;margin-top: 50px">
      <el-descriptions title="用户信息" direction="vertical" :column="4" border>
        <el-descriptions-item label="用户名">{{this.$store.state.user.userCode}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{this.$store.state.user.phone}}</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">{{this.$store.state.user.userName}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">{{this.$store.state.user.address}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{this.$store.state.user.gender==1?'男':'女'}}</el-descriptions-item>
        <el-descriptions-item label="出生日期">{{new Date(this.$store.state.user.birthday).toLocaleString().replace(/:\d{1,2}$/,' ')}}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{new Date(this.$store.state.user.creationDate).toLocaleString().replace(/:\d{1,2}$/,' ')}}</el-descriptions-item>
        <el-descriptions-item label="用户角色">{{this.$store.state.user.userRole==1?'系统管理员':'用户'}}</el-descriptions-item>
      </el-descriptions>
    </div>

    <el-row>
      <div style="margin-right: 1000px;margin-left: 50px;margin-top: 100px">
        <el-descriptions title="修改密码"></el-descriptions>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UserCenter",
  data() {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        age: [
          {validator: checkAge, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');

          this.axios.get('http://localhost:8081/updatePassword?userCode='
              +this.$store.state.user.userCode+'&userPassword='+this.ruleForm.pass).then(response => {
            console.log(response.data)
          }).catch(function (error) {
            console.log(error)
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>