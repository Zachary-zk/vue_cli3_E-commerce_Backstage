<template>
  <div class="home">
    <el-container class="home_cent">
      <el-header class="home_header">
        <el-row type="flex" class="row-bg" justify="space-around" align="middle">
          <el-col :span="8">
            <img src="@/assets/images/logo.png" alt>
          </el-col>
          <el-col :span="8">
            <h1>电商后台管理系统</h1>
          </el-col>
          <el-col :span="8">
            <p class="home_header_right">
              欢迎上海前端31期星曜会员
              <a href="javascript:;" @click="logout">退出</a>
            </p>
          </el-col>
        </el-row>
      </el-header>

      <el-container class="home_dibu">
        <el-aside width="200px" class="home_aside">
          <!-- 当前激活菜单的 index
                @close="handleClose"
                @open="handleOpen"
          -->
          <el-menu
            :default-active="$route.path"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
            :unique-opened='true'
          >
            <el-submenu :index="item.order + ''" v-for="(item) in asideListData" :key="item.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item :index="'/home/' + item1.path" v-for="(item1) in item.children" :key="item1.id">
                <!-- 二级菜单的图标和名称： -->
                <template slot="title" >
                  <i class="el-icon-menu"></i>
                  <span>{{item1.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
      // 侧边栏导航 数据
      asideListData: []
    }
  },
  created () {
    this.asideList()
  },
  methods: {
    // 退出登陆
    async logout () {
      try {
        await this.$confirm('您确定要退出登陆吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        this.$message({
          type: 'success',
          duration: 1000,
          message: '退出成功!'
        })

        localStorage.removeItem('token')
        this.$router.push('/')
      } catch (error) {
        this.$message({
          type: 'info',
          duration: 1000,
          message: '已取消退出'
        })
      }
    },
    async asideList () {
      const res = await this.$axios.get('menus')
      this.asideListData = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.home,
.home_cent {
  height: 100%;
  background-color: #eaeef1;
}
.home_header {
  padding-left: 0px;
  background-color: #b3c1cd;

  img {
    width: 200px;
  }

  h1 {
    margin: 0;
    text-align: center;
  }

  .home_header_right {
    font-weight: 700;
    text-align: right;
    a {
      color: #daa520;
    }
  }
}
.home_dibu {
  height: 100%;
  .home_aside {
    width: 200px;
    background-color: #545c64;

    .el-menu {
      border: none;
    }
  }
}
</style>
