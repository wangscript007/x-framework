<template>
  <page>
    <el-card shadow="never">
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">找回密码</strong>
        </div>
      </template>
      <steps
        v-model="currentStep"
        :data="step"
      ></steps>
      <div>123456</div>
      <div>123456</div>
      <div>123456</div>
    </el-card>
  </page>
</template>

<script>
import Page from '@/components/Page'
import Steps from '@/components/Steps'

export default {
  name: 'StepForm',
  components: {
    Page,
    Steps
  },
  data () {
    return {
      currentStep: 0,
      step: [
        {
          id: 'p1',
          title: '身份验证'
        },
        {
          id: 'p2',
          title: '重设密码'
        },
        {
          id: 'p3',
          title: '完成'
        }
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

