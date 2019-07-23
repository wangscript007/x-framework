<template>
  <page>
    <el-card shadow="never">
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">部门管理</strong>
        </div>
      </template>
      <template v-slot:default>

      </template>
    </el-card>
  </page>
</template>

<script>
import Page from '@/components/Page'

export default {
  name: 'CheckboxTree',
  components: {
    Page
  }
}
</script>
