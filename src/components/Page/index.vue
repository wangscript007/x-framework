<template>
  <div class="x-layout-page">
    <div
      v-if="showHeader"
      class="x-layout-page-header"
    >
      <breadcrumb></breadcrumb>
      <h1 class="page-header-title">{{ $route.meta.title||'' }}</h1>
      <div
        v-if="showDescribe"
        class="page-header-describe"
      >
        {{ $route.meta.describe || '' }}
      </div>
      <slot name="page-header"></slot>
    </div>
    <div class="x-layout-page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'Page',
  components: {
    Breadcrumb
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showDescribe: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.x-layout-page {
  .x-layout-page-header {
    padding: 16px 32px 0;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    .el-breadcrumb {
      margin-bottom: 16px;
      line-height: 1.5;
    }
    .page-header-title {
      margin-bottom: 16px;
      font-weight: 600;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.85);
    }
    .page-header-describe {
      margin-bottom: 16px;
    }
  }
  .x-layout-page-content {
    margin: 24px;
  }
}
</style>
