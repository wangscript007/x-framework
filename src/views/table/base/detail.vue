<template>
  <page>
    <el-card shadow="never">
      <div
        slot="header"
        class="fix"
      >
        <strong class="el-card__header-title">员工信息</strong>
      </div>
      <el-form
        label-width="auto"
        label-suffix="："
        size="mini"
      >
        <el-row>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
          >
            <el-form-item label="姓名">{{ staff.staffName || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
          >
            <el-form-item label="工号">{{ staff.staffNo || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
          >
            <el-form-item label="身份证号">{{ staff.cerNo || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
          >
            <el-form-item label="手机号码">{{ staff.phone || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
          >
            <el-form-item label="性别">{{ staff.sex === '1' ? '男' : '女' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
          >
            <el-form-item label="籍贯">{{ staff.native || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
          >
            <el-form-item label="联系地址">{{ staff.address || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
          >
            <el-form-item label="入职时间">{{ staff.entryTime || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
          >
            <el-form-item label="状态">{{ staff.state === '1' ? '在职' : '离职' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
          >
            <el-form-item label="备注">{{ staff.remark || '-' }}</el-form-item>
          </el-col>
          <el-col
            span="24"
            class="text-center"
          >
            <el-button
              type="primary"
              @click="backHandler"
            >返回
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </page>
</template>

<script>
import { getStaff } from '@/api/staff'
import Page from '@/components/Page'

export default {
  name: 'StaffDetail',
  components: {
    Page
  },
  data () {
    return {
      staff: {}
    }
  },
  created () {
    const { params } = this.$route
    if (params && params.staffId) {
      this.getStaffInfo(params.staffId)
    } else {
      this.backHandler()
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
        this.staff = res.data
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
      this.$router.push(query ? { name: 'BaseTableList', params: query } : '/table/base/list')
    }
  }
}
</script>

<style scoped>

</style>
