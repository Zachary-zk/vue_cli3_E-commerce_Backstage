<template>
  <div class="rights">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="navBody">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 列表 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="props">
          <span v-if="props.row.level === '0'">一级</span>
          <span v-else-if="props.row.level === '1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList () {
      const res = await this.$axios.get('rights/list')
      this.tableData = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.navBody {
  line-height: 50px;
  background-color: #d4dae0;
  font-size: 16px;
  padding-left: 10px;
}
</style>
