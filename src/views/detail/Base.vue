<template>
  <x-page>
    <el-card shadow="never">
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">员工基本信息</strong>
        </div>
      </template>
      <el-form
        label-width="120px"
        label-suffix="："
        class="detail-form"
      >
        <el-row>
          <el-col
            :md="{span: 8}"
            :sm="{span: 12}"
            :xs="{span: 24}"
          >
            <el-form-item label="姓名">{{ staff.staffName || '-' }}</el-form-item>
          </el-col>
          <el-col
            :md="{span: 8}"
            :sm="{span: 12}"
            :xs="{span: 24}"
          >
            <el-form-item label="工号">{{ staff.staffNo || '-' }}</el-form-item>
          </el-col>
          <el-col
            :md="{span: 8}"
            :sm="{span: 12}"
            :xs="{span: 24}"
          >
            <el-form-item label="身份证号">{{ staff.cerNo || '-' }}</el-form-item>
          </el-col>
          <el-col
            :md="{span: 8}"
            :sm="{span: 12}"
            :xs="{span: 24}"
          >
            <el-form-item label="手机号码">{{ staff.phone || '-' }}</el-form-item>
          </el-col>
          <el-col
            :md="{span: 8}"
            :sm="{span: 12}"
            :xs="{span: 24}"
          >
            <el-form-item label="性别">{{ staff.sex === '1' ? '男' : '女' }}</el-form-item>
          </el-col>
          <el-col
            :md="{span: 8}"
            :sm="{span: 12}"
            :xs="{span: 24}"
          >
            <el-form-item label="籍贯">{{ staff.native || '-' }}</el-form-item>
          </el-col>
          <el-col
            :md="{span: 8}"
            :sm="{span: 12}"
            :xs="{span: 24}"
          >
            <el-form-item label="联系地址">{{ staff.address || '-' }}</el-form-item>
          </el-col>
          <el-col
            :md="{span: 8}"
            :sm="{span: 12}"
            :xs="{span: 24}"
          >
            <el-form-item label="入职时间">{{ staff.entryTime || '-' }}</el-form-item>
          </el-col>
          <el-col
            :md="{span: 8}"
            :sm="{span: 12}"
            :xs="{span: 24}"
          >
            <el-form-item label="状态">{{ staff.state === '1' ? '在职' : '离职' }}</el-form-item>
          </el-col>
          <el-col
            :md="{span: 8}"
            :sm="{span: 12}"
            :xs="{span: 24}"
          >
            <el-form-item label="备注">{{ staff.remark || '-' }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </x-page>
</template>

<script>
export default {
  name: 'BaseDetail',
  data () {
    return {
      staff: {
        staffId: 'eA4DE357-e8bb-df05-fF5f-dcFe8E1A5eF2',
        staffName: '冯娜',
        staffNo: '20190001',
        cerNo: '320000197610292351',
        sex: '2',
        native: '广东省 汕头市 潮南区',
        phone: '15845493777',
        entryTime: '1978-04-10',
        address: '',
        state: '1',
        remark: ''
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

