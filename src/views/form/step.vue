<template>
  <page>
    <el-card shadow="never">
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">注册流程</strong>
        </div>
      </template>
      <div class="margin-bottom-4x">
        <steps
          v-model="currentStep"
          :data="step"
        ></steps>
      </div>
      <div v-if="currentStep === 0">
        <el-row>
          <el-col
            :md="{span: 12, offset: 6}"
            :sm="{span: 24}"
          >
            <el-form label-width="auto">
              <el-form-item label="用户名">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password"></el-input>
              </el-form-item>
              <el-form-item label="重复密码">
                <el-input type="password"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名">
                <el-input></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="currentStep++"
                >
                  下一步
                </el-button>
                <el-button>返回</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div v-if="currentStep === 1">
        <el-row>
          <el-col
            :md="{span: 12, offset: 6}"
            :sm="{span: 24}"
          >
            <el-form label-width="auto">
              <el-form-item label="手机号码">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input>
                  <template v-slot:append>
                    <el-button>免费获取</el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="currentStep++"
                >
                  下一步
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div v-if="currentStep === 2">
        <result
          :space-top="false"
          type="success"
        >
          <template v-slot:title>注册成功</template>
          <template v-slot:actions>
            <el-link @click="currentStep = 0">立即登录</el-link>
            &nbsp;&nbsp;
            <el-link @click="currentStep = 0">回到首页</el-link>
          </template>
        </result>
      </div>
    </el-card>
  </page>
</template>

<script>
import Page from '@/components/Page'
import Steps from '@/components/Steps'
import Result from '@/components/Result'

export default {
  name: 'StepForm',
  components: {
    Page,
    Steps,
    Result
  },
  data () {
    return {
      currentStep: 0,
      step: [
        {
          id: 'p1',
          title: '填写资料'
        },
        {
          id: 'p2',
          title: '手机验证'
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

