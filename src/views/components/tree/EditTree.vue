<template>
  <page>
    <el-card shadow="never">
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">部门管理</strong>
        </div>
      </template>
      <template v-slot:default>
        <div
          v-loading="loading"
          class="x-tree margin-bottom-4x"
        >
          <el-tree
            ref="deptTree"
            node-key="deptId"
            :data="deptData"
            :props="props"
            :default-expand-all="true"
            :draggable="true"
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
            @node-drop="handleDrop"
          >
            <template v-slot:default="{ node, data }">
              <div class="x-tree-node">
                <span class="x-tree-node-label">{{ node.label }}</span>
                <span class="x-tree-node-options">
                  <a
                    v-if="data.addable !== false"
                    class="x-tree-icon x-tree-icon-add"
                    href="javascript:void(0)"
                    title="添加"
                    @click.stop="openDialog(data)"
                  ></a>
                  <a
                    v-if="data.editable !== false"
                    class="x-tree-icon x-tree-icon-edit"
                    href="javascript:void(0)"
                    title="编辑"
                    @click.stop="openDialog(data, true)"
                  ></a>
                  <a
                    v-if="data.removable !== false"
                    class="x-tree-icon x-tree-icon-remove"
                    href="javascript:void(0)"
                    title="删除"
                    @click.stop="removeNode(node, data)"
                  ></a>
                </span>
              </div>
            </template>
          </el-tree>
        </div>
        <el-divider></el-divider>
        <div class="x-description margin-bottom-3x">
          <h3>温馨提示</h3>
          <h4>1、鼠标移动到树型节点，点击“<span class="x-tree-icon x-tree-icon-add"></span>”可以添加部门，点击“<span class="x-tree-icon x-tree-icon-edit"></span>”可以编辑部门信息，“<span class="x-tree-icon x-tree-icon-remove"></span>”可以删除部门信息
          </h4>
          <h4>2、单击部门节点不放开并移动鼠标，可以拖拽部门</h4>
        </div>
        <update-tree-node
          :opened="dialog.opened"
          :data="dialog.data"
          :is-edit="dialog.isEdit"
          @closeHandler="closeDialog"
          @updateHandler="updateNode"
        ></update-tree-node>
      </template>
    </el-card>
  </page>
</template>

<script>
import awaitTo from 'await-to-js'
import * as api from '@/api/tree'
import Page from '@/components/Page'
import UpdateTreeNode from '@/views/components/tree/dialog/UpdateTreeNode'

export default {
  name: 'Tree',
  components: {
    Page,
    UpdateTreeNode
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
      },
      /* 新增、编辑dialog */
      dialog: {
        data: null,
        isEdit: false,
        opened: false
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
    /* 打开新增、编辑节点dialog */
    openDialog (treeNodeData, isEdit = false) {
      this.dialog.data = treeNodeData
      this.dialog.isEdit = isEdit
      this.dialog.opened = true
    },
    /* 关闭dialog */
    closeDialog () {
      this.dialog.opened = false
      this.dialog.data = null
      this.dialog.isEdit = false
    },
    /* dialog将数据提交后，更新界面节点 */
    updateNode (newNodeData, currentNodeData) {
      /* 编辑操作 */
      if (this.dialog.isEdit) {
        currentNodeData = Object.assign(currentNodeData, newNodeData)
        return
      }
      /* 新增操作 */
      if (!currentNodeData.children) {
        this.$set(currentNodeData, 'children', [])
      }
      currentNodeData.children.push(newNodeData)
    },
    /* 删除节点 */
    removeNode (node, data) {
      const _this = this
      _this.$confirm(`确认删除部门 <strong class="color-danger">${data.deptName}</strong> ?`, '提示', {
        dangerouslyUseHTMLString: true
      }).then(() => {
        /* **************************** */
        /* 异步处理数据 */
        /* **************************** */
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.deptId === data.deptId)
        children.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    /* 拖拽成功完成时触发的事件 */
    handleDrop (draggingNode, dropNode, type, event) {
      console.log('draggingNode: ', draggingNode)
      console.log('dropNode: ', dropNode)
      console.log('type: ', type)
      console.log('event: ', event)
      /* ******************************************************** */
      /* 异步处理数据，将拖拽的节点，放置的节点以及类型提交至后台 */
      /* ******************************************************** */
    },
    /* 拖拽时判定目标节点能否被放置，如果拖拽到跟节点，且类型是‘next’或者‘prev’则不允许放置 */
    allowDrop (draggingNode, dropNode, type) {
      const dropNodeData = dropNode.data
      return !(dropNodeData.deptId === this.deptData[0].deptId && ['next', 'prev'].includes(type))
    },
    /* 判断节点能否被拖拽，如果设置了draggable:false则不允许拖拽 */
    allowDrag (draggingNode) {
      return draggingNode.data.draggable !== false
    }
  }
}
</script>
