<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <page>
    <el-card shadow="never">
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">部门管理</strong>
        </div>
      </template>
      <template v-slot:default>
        <div class="x-tree margin-bottom-4x">
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
          <h3>操作说明</h3>
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
import Page from '@/components/Page'
import UpdateTreeNode from '@/views/components/tree/dialog/updateTreeNode'

export default {
  name: 'Tree',
  components: {
    Page,
    UpdateTreeNode
  },
  data () {
    return {
      /* 原始数据 */
      deptData: [{
        deptId: 'X01',
        deptName: '机构X-FRAMEWORK',
        addable: true,
        editable: false,
        removable: false,
        draggable: false,
        children: [
          {
            deptId: 'X0101',
            deptName: '总经办',
            draggable: false
          },
          {
            deptId: 'X0102',
            deptName: '财务部',
            children: [
              {
                deptId: 'X010201',
                deptName: '会计'
              },
              {
                deptId: 'X010202',
                deptName: '出纳'
              }
            ]
          },
          {
            deptId: 'X0103',
            deptName: '行政部',
            children: [
              {
                deptId: 'X010301',
                deptName: '人力资源'
              },
              {
                deptId: 'X010302',
                deptName: '综合管理'
              }
            ]
          },
          {
            deptId: 'X0104',
            deptName: '市场部',
            children: [
              {
                deptId: 'X010401',
                deptName: '市场营销'
              },
              {
                deptId: 'X010402',
                deptName: '市场调研'
              },
              {
                deptId: 'X010403',
                deptName: '投标组'
              }
            ]
          },
          {
            deptId: 'X0105',
            deptName: '资质管理部'
          },
          {
            deptId: 'X0106',
            deptName: '软件技术部',
            children: [
              {
                deptId: 'X010601',
                deptName: '设计组'
              },
              {
                deptId: 'X010602',
                deptName: '产品组'
              },
              {
                deptId: 'X010603',
                deptName: '数据中心'
              },
              {
                deptId: 'X010604',
                deptName: '研发组'
              },
              {
                deptId: 'X010605',
                deptName: '测试组'
              }
            ]
          }
        ]
      }],
      /* 数据对应关系 */
      props: {
        children: 'children',
        label: 'deptName'
      },
      /* updateDialog */
      dialog: {
        data: null,
        isEdit: false,
        opened: false
      }
    }
  },
  methods: {
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
      }).catch(() => {
        /* 点击取消 */
        this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', {
          dangerouslyUseHTMLString: true
        })
      })
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
