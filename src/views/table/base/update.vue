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
      <el-col
        :md="{span: 12, offset: 6}"
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
          <el-form-item
            label="员工姓名"
            prop="staffName"
          >
            <el-input v-model.trim="staff.staffName"></el-input>
          </el-form-item>
          <el-form-item
            label="工号"
            prop="staffNo"
          >
            <el-input v-model.trim="staff.staffNo"></el-input>
          </el-form-item>
          <el-form-item
            label="身份证号"
            prop="cerNo"
          >
            <el-input v-model.trim="staff.cerNo"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号码"
            prop="phone"
          >
            <el-input v-model.trim="staff.phone"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="staff.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-cascader
              v-model="regionSelect"
              :options="regionOptions"
              :props="regionProps"
              :clearable="true"
              style="width: 100%;"
              separator=" "
            >
            </el-cascader>
          </el-form-item>
          <el-form-item
            label="联系地址"
          >
            <el-input v-model.trim="staff.address"></el-input>
          </el-form-item>
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
          <el-form-item label="状态">
            <el-radio-group v-model="staff.state">
              <el-radio label="1">在职</el-radio>
              <el-radio label="2">离职</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model.trim="staff.remark"
              type="textarea"
              :rows="5"
            ></el-input>
          </el-form-item>
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
              v-else
              @click="backHandler"
            >返回
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-card>
  </page>
</template>

<script>
import moment from 'moment'
import { regionData } from 'element-china-area-data'
import { getStaff, updateStaff } from '@/api/staff'
import validateUtil from '@/common/utils/validate'
import Page from '@/components/Page'

export default {
  name: 'UpdateStaff',
  components: {
    Page
  },
  data () {
    return {
      staff: {},
      rules: {
        staffName: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        staffNo: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        cerNo: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: validateUtil.validator('idCardNo'), trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validateUtil.validator('mobileNo'), trigger: 'blur' }
        ]
      },
      regionOptions: regionData,
      regionProps: {
        value: 'label'
      },
      regionSelect: [],
      isAdd: true
    }
  },
  watch: {
    regionSelect (value) {
      this.staff.native = value.length ? value.join(' ') : ''
    }
  },
  created () {
    this.initStaffInfo()
    const { params } = this.$route
    if (params && params.staffId) {
      this.isAdd = false
      this.getStaffInfo(params.staffId)
    }
  },
  methods: {
    initStaffInfo () {
      this.staff = {
        staffId: '',
        staffName: '',
        staffNo: '',
        cerNo: '',
        sex: '1',
        native: '',
        phone: '',
        entryTime: moment().format('YYYY-MM-DD'),
        address: '',
        state: '1',
        remark: ''
      }
    },
    getStaffInfo: async function (staffId) {
      const loading = this.$loading({
        text: '正在获取员工信息',
        spinner: 'fa fa-spinner fa-spin fa-2x',
        background: 'rgba(255, 255, 255, 0.5)'
      })
      try {
        const res = await getStaff(staffId)
        Object.assign(this.staff, res.data)
        if (res.data.native) {
          this.regionSelect = res.data.native.split(' ')
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
    submitHandler (isContinue = false) {
      this.$refs.staffForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            text: '正在处理',
            spinner: 'fa fa-spinner fa-spin fa-2x',
            background: 'rgba(255, 255, 255, 0.5)'
          })
          try {
            await updateStaff(this.staff)
            this.$message({
              showClose: true,
              type: 'success',
              message: '操作成功'
            })
            if (isContinue) {
              this.initStaffInfo()
              this.$refs.staffForm.resetFields()
            } else {
              this.backHandler()
            }
          } catch (e) {
            this.$message.error({
              showClose: true,
              type: 'error',
              message: e.message
            })
          } finally {
            this.$nextTick(() => {
              loading.close()
            })
          }
        } else {
          return false
        }
      })
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
