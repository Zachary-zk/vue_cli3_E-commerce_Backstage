export default {
  data () {
    return {
      rolesTableData: [],
      isShowCharacter: false,
      // 角色授权数据
      permissionTree: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      defaultChecked: [],
      characterId: -1
    }
  },
  created () {
    this.getCharacterList()
    this.getAssignPermissions()
  },
  methods: {
    // 获取所有权限列表
    async getCharacterList () {
      const res = await this.$axios.get('/roles')
      if (res.data.meta.status !== 200) {
        return this.$message({
          message: res.data.meta.msg,
          type: 'error'
        })
      }
      this.rolesTableData = res.data.data
    },
    // 获取角色列表
    async getAssignPermissions () {
      const res = await this.$axios.get(`rights/tree`)
      this.permissionTree = res.data.data
    },
    // 显示分配校色权限模态框
    async assignPermissions (scope) {
      this.isShowCharacter = true
      const arr = []

      scope.children.forEach((v) => {
        v.children.forEach((vv) => {
          vv.children.forEach(vvv => {
            arr.push(vvv.id)
          })
        })
      })
      this.$nextTick(() => {
        // console.log(this.$refs.tree)
        this.$refs.tree.setCheckedKeys(arr)
      })

      this.characterId = scope.id
    },
    // 修改角色权限
    async characterGood () {
      const arr = this.$refs.tree.getHalfCheckedKeys()
      const arr1 = this.$refs.tree.getCheckedKeys()
      const res = await this.$axios.post(`roles/${this.characterId}/rights`, {
        rids: [...arr, ...arr1].join()
      })

      const { msg, status } = res.data.meta
      if (status === 200) {
        this.$message({
          type: 'success',
          message: msg
        })

        this.isShowCharacter = false
        this.getCharacterList()
      }
    }
  }
}
