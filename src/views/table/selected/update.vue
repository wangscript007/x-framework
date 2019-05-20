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
          @click="handleBack"
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
          :model="form"
          :rules="rules"
          label-width="auto"
          status-icon
        >
          <input
            v-model.trim="form.staffId"
            type="hidden"
          >
          <input
            v-model.trim="form.native"
            type="hidden"
          >
          <el-form-item
            label="员工姓名"
            prop="staffName"
          >
            <el-input v-model.trim="form.staffName"></el-input>
          </el-form-item>
          <el-form-item
            label="工号"
            prop="staffNo"
          >
            <el-input v-model.trim="form.staffNo"></el-input>
          </el-form-item>
          <el-form-item
            label="身份证号"
            prop="cerNo"
          >
            <el-input v-model.trim="form.cerNo"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号码"
            prop="phone"
          >
            <el-input v-model.trim="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
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
          <el-form-item label="入职时间">
            <el-date-picker
              v-model="form.entryTime"
              type="date"
              format="yyyy年M月d日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.state">
              <el-radio label="1">在职</el-radio>
              <el-radio label="2">离职</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model.trim="form.remark"
              type="textarea"
              :rows="5"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSubmit"
            >提交
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
      form: {
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
      },
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
      regionSelect: []
    }
  },
  watch: {
    regionSelect (value) {
      this.form.native = value.length ? value.join(' ') : ''
    }
  },
  created () {
    /* 如果是编辑，则在$route的query中会存在staffId */
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
        Object.assign(this.form, res.data)
        if (res.data.native) {
          this.regionSelect = res.data.native.split(' ')
        }
      } catch (e) {
        this.$message({
          showClose: true,
          type: 'error',
          message: e.message
        })
        this.handleBack()
      } finally {
        this.$nextTick(() => {
          loading.close()
        })
      }
    },
    handleSubmit () {
      this.$refs.staffForm.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            text: '正在处理',
            spinner: 'fa fa-spinner fa-spin fa-2x',
            background: 'rgba(255, 255, 255, 0.5)'
          })
          try {
            await updateStaff(this.form)
            this.$message({
              showClose: true,
              type: 'success',
              message: '操作成功'
            })
            this.handleBack()
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
