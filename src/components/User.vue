<template>
  <div class="user">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="role_name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="address" label="用户状态"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      @current-change="switchPage"
    ></el-pagination>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 3,
      total: undefined
    }
  },
  created () {
    this.axiosUsers()
  },
  methods: {
    axiosUsers (pagenum = 1, pagesize = 3) {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            pagenum,
            pagesize
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          // console.log(res);
          if (!res.data.meta.status === 200) {
            return this.$router.push('/')
          }
          this.tableData = res.data.data.users
          this.total = res.data.data.total
        })
    },
    switchPage (page) {
      this.axiosUsers(page)
    }
  }
}
</script>
