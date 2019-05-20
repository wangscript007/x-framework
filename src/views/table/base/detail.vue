<template>
  <page>
    <el-card shadow="never">
      <div
        slot="header"
        class="fix"
      >
        <strong class="el-card__header-title">员工信息</strong>
        <el-button
          class="float-right el-card__header-btn"
          type="text"
          @click="backHandler"
        >
          员工管理
        </el-button>
      </div>
    </el-card>
  </page>
</template>

<script>
import Page from '@/components/Page'

export default {
  name: 'StaffDetail',
  components: {
    Page
  },
  methods: {
    backHandler () {
      const { query } = this.$route
      this.$router.push(query ? { name: 'BaseTableList', params: query } : '/table/base/list')
    }
  }
}
</script>

<style scoped>

</style>
