<template>
  <page>
    <el-card shadow="never">
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">部门管理</strong>
        </div>
      </template>
      <template v-slot:default>
        <div class="x-tree-wrap has-border has-space">
          <el-tree
            ref="deptTree"
            node-key="deptId"
            :data="deptData"
            :props="props"
            :show-checkbox="true"
            :default-expand-all="true"
            @check-change="handleCheckChange"
            @node-click="handleNodeClick"
          >
          </el-tree>
        </div>
      </template>
    </el-card>
  </page>
</template>

<script>
import Page from '@/components/Page'

export default {
  name: 'Tree',
  components: {
    Page
  },
  data () {
    return {
      deptData: [{
        deptId: 'X01',
        deptName: 'X-FRAMEWORK STUDIO',
        children: [
          {
            deptId: 'X0101',
            deptName: '总经办'
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
                deptName: 'UX设计'
              },
              {
                deptId: 'X010602',
                deptName: '交互设计'
              },
              {
                deptId: 'X010603',
                deptName: '数据管理'
              },
              {
                deptId: 'X010604',
                deptName: '研发'
              },
              {
                deptId: 'X010605',
                deptName: '测试'
              }
            ]
          }
        ]
      }],
      /* 数据对应关系 */
      props: {
        children: 'children',
        label: 'deptName'
      }
    }
  },
  methods: {
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>
