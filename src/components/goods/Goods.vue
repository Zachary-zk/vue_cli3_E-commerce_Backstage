<template>
  <div class="goods">
    <!-- 添加按钮 -->
    <el-button type="success" plain @click="addTo">添加商品</el-button>

    <el-table :data="goodsFromData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="180"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain icon="el-icon-edit" @click="editUser(scope.row)"></el-button>
        <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="delUser(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="changeData"></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsFromData: [],
      pagenumber: 1,
      total: 0
    }
  },
  created () {
    this.getCommodityList()
  },
  methods: {
    // 编辑
    editUser () {},
    // 删除
    delUser () {},
    async getCommodityList (pagenum = 1, query = '', pagesize = 5) {
      const res = await this.$axios.get('/goods', {
        params: {
          query,
          pagenum,
          pagesize
        }
      })
      // console.log(res)
      this.goodsFromData = res.data.data.goods
      this.total = res.data.data.total
      this.pagenumber = pagenum
    },
    changeData (index) {
      this.getCommodityList(index)
    },
    addTo () {
      this.$router.push('/home/goods-add')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
