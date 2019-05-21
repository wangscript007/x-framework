import { getStaff } from '@/api/staff'

export default {
  methods: {
    getStaffInfo: async function (staffId, callback) {
      const loading = this.$loading({
        text: '正在获取员工信息',
        spinner: 'fa fa-spinner fa-spin fa-2x',
        background: 'rgba(255, 255, 255, 0.5)'
      })
      try {
        const res = await getStaff(staffId)
        if (callback && typeof (callback) === 'function') {
          (callback)(res.data)
        }
      } catch (e) {
        this.$message({
          showClose: true,
          type: 'error',
          message: e.message
        })
        this.backHandler()
      } finally {
        this.$nextTick(() => {
          loading.close()
        })
      }
    },
    backHandler () {
      const { query } = this.$route
      if (query) {
        if (query.page && typeof (query.page) === 'string') {
          query.page = parseInt(query.page)
        }
        if (query.limit && typeof (query.limit) === 'string') {
          query.limit = parseInt(query.limit)
        }
      }
      this.$router.push(query ? { name: 'BaseTableList', params: query } : '/table/base/list')
    }
  }
}
