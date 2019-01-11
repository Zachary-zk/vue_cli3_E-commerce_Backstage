<template>
  <div class="goods-add">
    <el-steps :active="active" finish-status="success">
      <el-step title="第一步" description="基本信息"></el-step>
      <el-step title="第二步" description="商品图片"></el-step>
      <el-step title="第三步" description="商品内容"></el-step>
    </el-steps>

    <el-tabs tab-position="left" @tab-click="tableChange" v-model="activeName">
      <el-tab-pane label="基本信息" name="0">
        <el-form ref="form" :model="goodsForm" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="goodsForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="goodsForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="goodsForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="goodsForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader :options="options" :props="props" v-model="goodsForm.goods_cat"></el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="goodsForm.is_promote">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <el-button type="primary" @click="next">下一步</el-button>
      </el-tab-pane>

      <el-tab-pane label="商品图片" name="1">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers="headers"
          list-type="picture-card"
          :on-success="changeUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <!-- 按钮 -->
        <el-button type="primary" @click="next" class="anniu">下一步</el-button>
      </el-tab-pane>

      <el-tab-pane label="商品内容" name="2">
        <quillEditor class="quillEditor" v-model="goodsForm.goods_introduce"></quillEditor>
        <!-- 按钮 -->
        <br>
        <el-button type="primary" @click="addClassification">完成</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      active: 0,
      activeName: '0',
      // 基本信息
      goodsForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        is_promote: false,
        pics: [],
        goods_introduce: ''
      },
      options: [],
      props: {
        label: 'cat_name',
        value: 'cat_id'
      },
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.getClassificationAll()
  },
  methods: {
    tableChange (info, event) {
      // console.log(info.index, event)
      this.active = info.index - 0
    },
    // 下一步
    next () {
      this.active++
      this.activeName = this.activeName - 0 + 1 + ''
    },
    // 获取全部商品分类
    async getClassificationAll () {
      const res = await this.$axios.get('/categories')
      this.options = res.data.data
      // console.log(res)
    },
    // 上传
    changeUpload (response, file, fileList) {
      // console.log(response, file, fileList)
      this.goodsForm.pics.push({
        pic: response.data.tmp_path
      })
    },
    async addClassification () {
      const res = await this.$axios.post('/goods', {
        goods_name: this.goodsForm.goods_name,
        goods_cat: this.goodsForm.goods_cat.join(','),
        goods_price: this.goodsForm.goods_price,
        goods_number: this.goodsForm.goods_number,
        goods_weight: this.goodsForm.goods_weight,
        goods_introduce: this.goodsForm.goods_introduce,
        pics: this.goodsForm.pics,
        is_promote: this.goodsForm.is_promote
      })
      if (res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })

        this.$router.push('/home/goods')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.quillEditor {
  background-color: #fff;
  margin-bottom: 20px;
}
.anniu {
  margin-top: 20px;
}
</style>
