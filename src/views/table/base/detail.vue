<template>
  <page>
    <el-card shadow="never">
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">员工信息</strong>
        </div>
      </template>
      <el-form
        label-width="120px"
        label-suffix="："
        class="detail-form"
      >
        <el-row>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 8}"
          >
            <el-form-item label="姓名">{{ staff.staffName || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 8}"
          >
            <el-form-item label="工号">{{ staff.staffNo || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 8}"
          >
            <el-form-item label="身份证号">{{ staff.cerNo || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 8}"
          >
            <el-form-item label="手机号码">{{ staff.phone || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 8}"
          >
            <el-form-item label="性别">{{ staff.sex === '1' ? '男' : '女' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 8}"
          >
            <el-form-item label="籍贯">{{ staff.native || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 8}"
          >
            <el-form-item label="联系地址">{{ staff.address || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 8}"
          >
            <el-form-item label="入职时间">{{ staff.entryTime || '-' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 8}"
          >
            <el-form-item label="状态">{{ staff.state === '1' ? '在职' : '离职' }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 8}"
          >
            <el-form-item label="备注">{{ staff.remark || '-' }}</el-form-item>
          </el-col>
          <el-col
            :span="24"
            class="detail-btn-wrap text-center"
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
import Page from '@/components/Page'
import mixin from '@/views/table/base/mixin'

export default {
  name: 'StaffDetail',
  components: {
    Page
  },
  mixins: [mixin],
  data () {
    return {
      staff: {}
    }
  },
  created () {
    const { params } = this.$route
    if (params && params.staffId) {
      this.getStaffInfo(params.staffId, staff => {
        this.staff = staff
      })
    } else {
      this.backHandler()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

