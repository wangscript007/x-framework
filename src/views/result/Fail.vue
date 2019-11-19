<template>
  <x-page :show-header="false">
    <el-card shadow="never">
      <result type="fail">
        <template v-slot:title>操作失败</template>
        <template v-slot:description>
          请核对并修改以下信息后，再重试。
        </template>
        <template v-slot:extra>
          <div class="margin-bottom-3x color-title font-size-16  font-weight-500">您的操作遇到了以下错误：</div>
          <div class="margin-bottom-2x">
            <x-icon
              icon="iconfont icon-close-circle"
              type="class"
              class="color-danger"
            ></x-icon>
            <span class="color-secondary-text">&nbsp;您的账户被冻结</span>
          </div>
          <div class="margin-bottom-2x">
            <x-icon
              icon="iconfont icon-close-circle"
              type="class"
              class="color-danger"
            ></x-icon>
            <span class="color-secondary-text">&nbsp;您的账户尚无该权限</span>
          </div>
        </template>
        <template v-slot:actions>
          <el-button
            type="primary"
          >
            返回修改
          </el-button>
        </template>
      </result>
    </el-card>
  </x-page>
</template>

<script>
import Result from '@/components/Result'

export default {
  name: 'ResultFail',
  components: {
    Result
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

