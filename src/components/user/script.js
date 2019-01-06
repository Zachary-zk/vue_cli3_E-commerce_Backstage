export default {
  data () {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 3,
      total: undefined,
      msg: true,
      // 搜索内容
      search: '',
      // 添加用户数据
      isShowAddUserFrame: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
        email: [
          { pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机格式不正确', trigger: 'blur' }
        ]
      },
      iseditUserFrame: false,
      editUserForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      rules2: {
        email: [
          { pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.axiosUsers()
  },
  methods: {
    async axiosUsers (pagenum = 1, query = '', pagesize = 3) {
      const res = await this.$axios.get('/users', {
        params: {
          query,
          pagenum,
          pagesize
        }
      })
      if (!res.data.meta.status === 200) {
        localStorage.removeItem('token')
        return this.$router.push('/')
      }
      // console.log(res)
      this.tableData = res.data.data.users
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
    },
    switchPage (page) {
      this.axiosUsers(page, this.search)
    },
    async swithChange (info) {
      try {
        const res = await this.$axios.put(
          `/users/${info.id}/state/${info.mg_state}`
        )
        if (res.data.meta.status === 200) {
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
          info.mg_state = !info.mg_state
        }
      } catch (err) {
        this.$message({
          message: '修改失败',
          type: 'error'
        })
        info.mg_state = !info.mg_state
      }
    },
    // 根据条件查找用户
    searchFilter () {
      this.axiosUsers(1, this.search)
    },
    // 添加用户
    async addUser (info) {
      try {
        await this.$refs[info].validate()
        const res = await this.$axios.post('users', this.addUserForm)
        const { msg, status } = res.data.meta
        if (status === 201) {
          this.$message({
            message: msg,
            type: 'success'
          })
          this.isShowAddUserFrame = false
          this.axiosUsers(1, this.search)
          this.$refs[info].resetFields()
        } else {
          this.$message({
            message: msg,
            type: 'error'
          })
        }
      } catch (error) { }
    },
    // 删除用户
    async delUser (id) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        const res = await this.$axios.delete(`/users/${id}`)
        const { msg, status } = res.data.meta
        if (status === 200) {
          this.$message({
            message: msg,
            type: 'success'
          })
          this.axiosUsers(1, this.search)
        } else {
          this.$message({
            message: msg,
            type: 'error'
          })
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    // 编辑用户- 显示编辑模态框
    async editUser (scope) {
      for (const key in this.editUserForm) {
        this.editUserForm[key] = scope[key]
      }
      this.iseditUserFrame = true
    },
    // 编辑用户 - 完成
    async editUserDetermine (info) {
      try {
        await this.$refs[info].validate()
        const { id, email, mobile } = this.editUserForm
        const res = await this.$axios.put(`users/${id}`, {
          email,
          mobile
        })
        const { msg, status } = res.data.meta
        if (status === 200) {
          this.$message({
            message: msg,
            type: 'success'
          })
          this.axiosUsers(this.pagenum, this.search)
          this.iseditUserFrame = false
        } else {
          this.$message({
            message: msg,
            type: 'error'
          })
        }
      } catch (error) {}
    }
  }
}
