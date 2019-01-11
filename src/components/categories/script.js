export default {
  data () {
    return {
      commodityData: [],
      total: 0,
      loading: false,
      pagenum: 1,
      // 添加分类数据
      commodityDataFrom: false,
      commodityForm: {
        cat_name: '',
        nameList: []
      },
      shopingCommodityAll: [],
      props: {
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  created () {
    this.getShopingClassification()
    this.getShopCommodityAll()
  },
  methods: {
    async getShopingClassification (pagenum = 1, query = '', pagesize = 5) {
      this.loading = true
      const res = await this.$axios.get('/categories', {
        params: {
          query,
          pagenum,
          pagesize
        }
      })
      this.total = res.data.data.total
      this.commodityData = res.data.data.result

      this.loading = false
    },
    async getShopCommodityAll () {
      const res = await this.$axios.get('/categories', {
        params: {
          type: 2
        }
      })
      // console.log(res)
      this.shopingCommodityAll = res.data.data
    },
    changeCommodity (index) {
      this.getShopingClassification(index)
      this.pagenum = index
    },
    // 添加分类
    async addCommodity (formName) {
      const arr = this.commodityForm.nameList
      const res = await this.$axios.post('/categories', {
        cat_pid: arr[arr.length - 1],
        cat_name: this.commodityForm.cat_name,
        cat_level: arr.length
      })
      // console.log(res)
      if (res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })

        this.commodityDataFrom = false
        this.$refs[formName].resetFields()
        this.getShopingClassification(this.pagenum)
      }
    }
  }
}
