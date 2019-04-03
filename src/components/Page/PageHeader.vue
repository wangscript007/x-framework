<template>
  <div>
    <breadcrumb></breadcrumb>
    <h1 class="page-herder-title">{{$route.meta.title||''}}</h1>
    <div class="page-herder-describe">{{$route.meta.describe||''}}</div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'PageHeader',
  components: {
    Breadcrumb
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
