<template>
  <page :show-header="false">
    <el-card shadow="never">
      <div class="result-page-wrap">
        <div class="result-page-icon">
          <x-icon
            icon="close-circle-fill"
            class="result-index-icon color-danger"
          ></x-icon>
        </div>
        <div class="result-page-index-title">操作失败</div>
        <div class="result-page-description">请核对并修改以下信息后，再重试。</div>
        <div class="result-page-extra">
          <div class="result-page-extra-title">您的操作遇到了以下错误：</div>
          <div class="result-page-extra-content">
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
          </div>
        </div>
        <div class="result-page-actions">
          <el-button
            type="primary"
          >
            返回修改
          </el-button>
        </div>
      </div>
    </el-card>
  </page>
</template>

<script>
import Page from '@/components/Page'

export default {
  name: 'ResultFail',
  components: {
    Page
  },
  data () {
    return {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

