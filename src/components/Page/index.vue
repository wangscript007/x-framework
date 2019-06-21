<template>
  <div class="x-page">
    <div
      v-if="showHeader"
      class="x-page-header"
    >
      <breadcrumb v-if="(app.layout==='classic' || app.breadcrumbPosition === 'pageHeader') && showBreadcrumb"></breadcrumb>
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
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      const { meta } = this.$route
      return meta ? meta.headerTitle ? meta.headerTitle : meta.title ? meta.title : '' : ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
