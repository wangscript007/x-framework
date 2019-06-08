<template>
  <page :show-header="false">
    <el-card shadow="never">
      <div class="result-page-wrap">
        <div class="result-page-icon">
          <x-icon
            icon="check-circle-fill"
            class="result-index-icon color-success"
          ></x-icon>
        </div>
        <div class="result-page-index-title">提交成功</div>
        <div class="result-page-description">提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。</div>
        <div class="result-page-extra">
          <div class="result-page-extra-title">审批进度：</div>
          <div class="result-page-extra-content">
            <el-steps
              :active="current"
              size="mini"
              align-center
            >
              <el-step
                v-for="item in process"
                :key="item.id"
              >
                <div slot="title">
                  <small>{{ item.title }}</small>
                </div>
                <div slot="description">
                  <span>{{ item.operator }}</span><br>
                  <span>{{ item.opTime }}</span>
                </div>
              </el-step>
            </el-steps>
          </div>
        </div>
        <div class="result-page-actions">
          <el-button
            type="primary"
          >
            返回列表
          </el-button>
          <el-button>
            查看明细
          </el-button>
        </div>
      </div>
    </el-card>
  </page>
</template>

<script>
import Page from '@/components/Page'

export default {
  name: 'ResultSuccess',
  components: {
    Page
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

