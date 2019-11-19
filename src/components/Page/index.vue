<template>
  <div class="x-page">
    <div
      v-if="showHeader"
      class="x-page-header"
    >
      <breadcrumb v-if="(app.layout==='classic' || app.breadcrumbWrapper === 'page') && showBreadcrumb" />
      <h1
        v-if="showTitle"
        class="x-page-header-title"
      >{{ pageHeaderTitle }}</h1>
      <div
        v-if="showDescribe"
        class="x-page-header-describe"
      >
        {{ pageHeaderDescribe }}
      </div>
      <slot name="page-header" />
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
    title: {
      type: String,
      default: ''
    },
    showDescribe: {
      type: Boolean,
      default: true
    },
    describe: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['app']),
    pageHeaderTitle () {
      return this.title || this.$route.meta.title || ''
    },
    pageHeaderDescribe () {
      return this.describe || this.$route.meta.describe || ''
    }
  }
}
</script>
