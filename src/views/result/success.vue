<template>
  <page :show-header="false">
    <el-card shadow="never">
      <result type="success">
        <template v-slot:title>提交成功</template>
        <template v-slot:description>
          提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。
        </template>
        <template v-slot:extra>
          <div class="margin-bottom-3x color-title font-size-16  font-weight-500">审批进度：</div>
          <el-steps
            :active="current"
            size="mini"
            align-center
          >
            <el-step
              v-for="item in process"
              :key="item.id"
            >
              <template v-slot:title>
                <div>
                  <small>{{ item.title }}</small>
                </div>
              </template>
              <template v-slot:description>
                <div>
                  <span>{{ item.operator }}</span><br>
                  <span>{{ item.opTime }}</span>
                </div>
              </template>
            </el-step>
          </el-steps>
        </template>
        <template v-slot:actions>
          <el-button
            type="primary"
          >
            返回列表
          </el-button>
          <el-button>
            查看明细
          </el-button>
        </template>
      </result>
    </el-card>
  </page>
</template>

<script>
import Page from '@/components/Page'
import Result from '@/components/Result'

export default {
  name: 'ResultSuccess',
  components: {
    Page,
    Result
  },
  data () {
    return {
      process: [
        {
          id: 'p1',
          title: '资料填写',
          operator: '冯娜',
          opTime: '2019-05-31 10:32'
        },
        {
          id: 'p2',
          title: '人事部审核',
          operator: '谢思贤',
          opTime: '2019-06-03 09:23'
        },
        {
          id: 'p3',
          title: '总经理审核',
          operator: '周毅',
          opTime: ''
        },
        {
          id: 'p4',
          title: '云备案',
          operator: '',
          opTime: ''
        }
      ],
      current: 2
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

