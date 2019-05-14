<template>
  <page>
    <el-card shadow="never">
      <div class="text-center">
        <el-button
          @click="handleBack"
        >
          返回
        </el-button>
      </div>
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
    console.log(this.$route)
    const { params } = this.$route
    if (params && params.staffId) {
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
    },
    handleBack () {
      const { query } = this.$route
      if (query) {
        /* 这里使用name和params的方式返回是因为当list页面重新刷新后，params将会消失，list可以回到初始状态 */
        this.$router.push({ name: 'BaseTableList', params: query })
      } else {
        this.$router.push('/table/base/list')
      }
    }
  }
}
</script>

<style scoped>

</style>
