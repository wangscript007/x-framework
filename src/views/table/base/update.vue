<template>
  <page>
    <el-card shadow="never">
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">员工信息</strong>
          <el-button
            class="float-right el-card__header-btn"
            type="text"
            @click="backHandler"
          >
            返回列表
          </el-button>
        </div>
      </template>
      <el-col
        :xl="{span: 18, offset:3}"
        :lg="{span: 20, offset: 2}"
        :md="{span: 22, offset: 1}"
        :sm="{span: 24}"
      >
        <el-form
          ref="staffForm"
          :model="staff"
          :rules="rules"
          label-width="auto"
          status-icon
        >
          <input
            v-model.trim="staff.staffId"
            type="hidden"
          >
          <input
            v-model.trim="staff.native"
            type="hidden"
          >
          <el-row :gutter="24">
            <el-col :md="12">
              <el-form-item
                label="员工姓名"
                prop="staffName"
              >
                <el-input v-model.trim="staff.staffName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item
                label="工号"
                prop="staffNo"
              >
                <el-input v-model.trim="staff.staffNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item
                label="身份证号"
                prop="cerNo"
              >
                <el-input v-model.trim="staff.cerNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item
                label="手机号码"
                prop="phone"
              >
                <el-input v-model.trim="staff.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="性别">
                <el-radio-group v-model="staff.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="籍贯">
                <el-cascader
                  v-model="region.selected"
                  :options="region.options"
                  :props="region.props"
                  :clearable="true"
                  style="width: 100%;"
                  separator=" "
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :md="24">
              <el-form-item
                label="联系地址"
              >
                <el-input v-model.trim="staff.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="入职时间">
                <el-date-picker
                  v-model="staff.entryTime"
                  type="date"
                  format="yyyy年M月d日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="状态">
                <el-radio-group v-model="staff.state">
                  <el-radio label="1">在职</el-radio>
                  <el-radio label="2">离职</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :md="24">
              <el-form-item label="备注">
                <el-input
                  v-model.trim="staff.remark"
                  type="textarea"
                  :rows="5"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="24">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitHandler()"
                >提交
                </el-button>
                <el-button
                  v-if="isAdd"
                  type="warning"
                  @click="submitHandler(true)"
                >提交并继续添加
                </el-button>
                <el-button
                  @click="backHandler"
                >返回列表
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-card>
  </page>
</template>

<script>
import awaitTo from 'await-to-js'
import dayJs from 'dayjs'
import { regionData } from 'element-china-area-data'
import { updateStaff } from '@/api/staff'
import validator from '@/common/utils/validate'
import Page from '@/components/Page'
import mixin from '@/views/table/base/mixin'

export default {
  name: 'UpdateStaff',
  components: {
    Page
  },
  mixins: [mixin],
  data () {
    return {
      staff: {},
      rules: {
        staffName: validator({ required: true }, '员工姓名'),
        staffNo: validator({ required: true }, '工号'),
        cerNo: validator({ required: true, type: 'id' }, '身份证'),
        phone: validator({ required: true, type: 'mobile' }, '手机号码')
      },
      region: {
        options: regionData,
        props: {
          value: 'label'
        },
        selected: []
      },
      isAdd: true
    }
  },
  watch: {
    'region.selected' (value) {
      this.staff.native = value.length ? value.join(' ') : ''
    }
  },
  created () {
    this.initStaff()
    const { params } = this.$route
    if (params && params.staffId) {
      this.isAdd = false
      this.getStaffInfo(params.staffId, staff => {
        Object.assign(this.staff, staff)
        if (staff.native) {
          this.region.selected = staff.native.split(' ')
        }
      })
    }
  },
  methods: {
    initStaff () {
      this.staff = {
        staffId: '',
        staffName: '',
        staffNo: '',
        cerNo: '',
        sex: '1',
        native: '',
        phone: '',
        entryTime: dayJs().format('YYYY-MM-DD'),
        address: '',
        state: '1',
        remark: ''
      }
    },
    submitHandler (isContinue = false) {
      this.$refs.staffForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        const loading = this.$loading({
          text: '正在处理',
          spinner: 'fa fa-spinner fa-spin fa-2x',
          background: 'rgba(255, 255, 255, 0.5)'
        })
        const [err] = await awaitTo(updateStaff(this.staff))
        this.$nextTick(() => {
          loading.close()
        })
        if (err) {
          this.$message({
            showClose: true,
            type: 'error',
            message: err.message
          })
          return
        }
        this.$message({
          showClose: true,
          type: 'success',
          message: '操作成功'
        })
        if (!isContinue) {
          this.backHandler()
          return
        }
        this.initStaff()
        this.$refs.staffForm.resetFields()
      })
    }
  }
}
</script>

