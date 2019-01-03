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
              <a href="javascript:;">退出</a>
            </p>
          </el-col>
        </el-row>
      </el-header>

      <el-container class="home_dibu">
        <el-aside width="200px" class="home_aside">
          <el-row class="tac">
            <el-col>
              <!-- 当前激活菜单的 index -->
              <el-menu
                default-active="/home/user"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true"
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item index="/home/user">
                    <!-- 二级菜单的图标和名称： -->
                    <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span>用户列表</span>
                    </template>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
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
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
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
