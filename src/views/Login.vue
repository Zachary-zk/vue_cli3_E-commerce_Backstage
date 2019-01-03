<template>
  <div class="login">
    <el-row class="row-bg" type="flex" justify="center" align="middle">
      <el-col :xs="16" :sm="14" :md="12" :lg="8" :xl="6" class="login-l">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          label-position="top"
          class="login_from"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        axios
          .post('http://localhost:8888/api/private/v1/login', this.ruleForm)
          .then(res => {
            if (res.data.meta.status === 200) {
              localStorage.setItem('token', res.data.data.token)
              this.$router.push('home')
              // console.log(res);
            } else {
              this.$message({
                message: res.data.meta.msg,
                showClose: true,
                type: 'error',
                duration: 1000
              })
            }
          })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.login,
.row-bg {
  height: 100%;
  background-color: #2d434c;
}
.login-l {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 10px;
}
</style>
