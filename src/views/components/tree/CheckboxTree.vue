<template>
  <page>
    <el-card shadow="never">
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">部门管理</strong>
        </div>
      </template>
      <template v-slot:default>
        <div class="margin-bottom-2x">
          <el-button @click="getCheckedKeys">根据Key获取</el-button>
          <el-button @click="getCheckedNodes">根据Node获取</el-button>
        </div>
        <div
          v-loading="loading"
          class="x-tree margin-bottom-4x"
        >
          <el-tree
            ref="deptTree"
            node-key="deptId"
            :data="deptData"
            :props="props"
            :show-checkbox="true"
            :default-expand-all="true"
          >
          </el-tree>
        </div>
      </template>
    </el-card>
  </page>
</template>

<script>
import awaitTo from 'await-to-js'
import * as api from '@/api/tree'
import Page from '@/components/Page'

export default {
  name: 'CheckboxTree',
  components: {
    Page
  },
  data () {
    return {
      loading: true,
      /* 原始数据 */
      deptData: [],
      /* 数据对应关系 */
      props: {
        children: 'children',
        label: 'deptName'
      }
    }
  },
  mounted () {
    this.getDeptTree()
  },
  methods: {
    /* 获取部门数据 */
    getDeptTree: async function () {
      const [err, res] = await awaitTo(api.getDeptTree())
      this.loading = false
      if (err) {
        this.$message({
          showClose: true,
          type: 'error',
          message: err.message
        })
        return
      }
      this.deptData = res.data
    },
    /* 根据key获取节点 */
    getCheckedKeys () {
      const checkedKeys = this.$refs['deptTree'].getCheckedKeys(true)
      if (!checkedKeys.length) {
        this.$message({
          type: 'error',
          message: '请选择部门',
          showClose: true
        })
        return
      }
      let html = ''
      for (const i of checkedKeys) {
        html += `<span class="color-danger">${i}</span><br>`
      }
      this.$alert(html, '选中的部门的key：', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true
      })
    },
    /* 根据node获取 */
    getCheckedNodes () {
      const checkedNodes = this.$refs['deptTree'].getCheckedNodes(true)
      if (!checkedNodes.length) {
        this.$message({
          type: 'error',
          message: '请选择部门',
          showClose: true
        })
        return
      }
      let html = ''
      for (const node of checkedNodes) {
        html += `<span class="color-danger">Name：${node.deptName} ------ Id：${node.deptId}</span><br>`
      }
      this.$alert(html, '选中的部门：', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true
      })
    }
  }
}
</script>
