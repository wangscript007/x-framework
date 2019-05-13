<template>
  <page>
    <el-card shadow="never">
      123456
    </el-card>
  </page>
</template>

<script>
import Page from '@/components/Page'
import { getStaff } from '@/api/staff'

export default {
  name: 'UpdateStaff',
  components: {
    Page
  },
  created () {
    /* 如果是编辑，则在$route的query中会存在staffId */
    const { params } = this.$route
    if (params && params.staffId) {
      console.log('pageNo:', params.page)
      this.getStaffInfo(params.staffId)
    }
  },
  methods: {
    getStaffInfo: async function (staffId) {
      const loading = this.$loading({
        text: '正在获取员工信息',
        spinner: 'fa fa-spinner fa-spin fa-2x',
        background: 'rgba(255, 255, 255, 0.5)'
      })
      try {
        const res = await getStaff(staffId)
        console.log(res)
      } catch (e) {
        this.$message({
          showClose: true,
          type: 'error',
          message: e.message
        })
      } finally {
        this.$nextTick(() => {
          loading.close()
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
