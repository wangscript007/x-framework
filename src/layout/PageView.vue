<template>
  <div class="x-page">
    <div
      v-if="!$route.meta.hidePageHeader"
      class="x-page-header"
    >
      <breadcrumb v-if="(app.layout==='classic' || app.breadcrumbWrapper === 'page') && showBreadcrumb"></breadcrumb>
      <h1
        v-if="showTitle"
        class="x-page-header-title"
      >{{ pageHeaderTitle }}</h1>
      <div
        v-if="showDescribe"
        class="x-page-header-describe"
      >
        {{ $route.meta.describe || '' }}
      </div>
      <slot name="page-header"></slot>
    </div>
    <div class="x-page-content">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'PageView',
  components: {
    Breadcrumb
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showBreadcrumb: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showDescribe: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['app']),
    pageHeaderTitle () {
      const { headerTitle, title } = this.$route.meta
      return headerTitle || title || ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
