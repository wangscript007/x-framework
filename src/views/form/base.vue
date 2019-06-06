<template>
  <page>
    <el-card shadow="never">
      <div
        slot="header"
        class="fix"
      >
        <strong class="el-card__header-title">个人信息</strong>
        <el-button
          class="float-right el-card__header-btn"
          type="text"
        >
          返回
        </el-button>
      </div>
      <el-row>
        <el-col
          :xl="{span: 18, offset:3}"
          :lg="{span: 20, offset: 2}"
          :md="{span: 22, offset: 1}"
          :sm="{span: 24}"
        >
          <el-form
            ref="staffForm"
            :model="form"
            :rules="rules"
            label-width="auto"
            status-icon
          >
            <el-row :gutter="24">
              <el-col :md="12">
                <el-form-item
                  label="姓名"
                  prop="name"
                >
                  <el-input v-model.trim="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item
                  label="身份证号"
                  prop="cerNo"
                >
                  <el-input v-model.trim="form.cerNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="性别">
                  <el-radio-group v-model="form.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="出生日期">
                  <el-date-picker
                    v-model="form.birthday"
                    type="date"
                    format="yyyy年M月d日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="民族">
                  <el-select
                    v-model="form.nation"
                    filterable
                    clearable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in nation"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12">
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
              </el-col>
              <el-col :md="12">
                <el-form-item label="政治面貌">
                  <el-select
                    v-model="form.politicalStatus"
                    filterable
                    clearable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in politicalStatus"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="户口性质">
                  <el-select
                    v-model="form.householdType"
                    clearable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in householdType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24">
                <el-form-item label="户籍地址">
                  <el-input
                    v-model="form.householdAddress"
                    type="textarea"
                    :rows="2"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24">
                <el-form-item label="兴趣爱好">
                  <el-checkbox-group v-model="form.hobby">
                    <el-checkbox
                      label="美食"
                    ></el-checkbox>
                    <el-checkbox
                      label="运动"
                    ></el-checkbox>
                    <el-checkbox
                      label="旅游"
                    ></el-checkbox>
                    <el-checkbox
                      label="政治"
                    ></el-checkbox>
                    <el-checkbox
                      label="军事"
                    ></el-checkbox>
                    <el-checkbox
                      label="汽车"
                    ></el-checkbox>
                    <el-checkbox
                      label="科技"
                    ></el-checkbox>
                    <el-checkbox
                      label="摄影"
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="资料自己可见">
                  <el-switch v-model="form.private"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :md="24">
                <el-form-item>
                  <el-button ype="primary">提交</el-button>
                  <el-button>返回</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </page>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { EMI_HOUSEHOLD_TYPE, EMI_NATION, EMI_POLITICAL_STATUS } from '@/common/emi/standard'
import validateUtil from '@/common/utils/validate'
import Page from '@/components/Page'

export default {
  name: 'BaseForm',
  components: {
    Page
  },
  data () {
    return {
      form: {
        name: '',
        cerNo: '',
        sex: '1',
        birthday: '',
        native: '',
        nation: '',
        politicalStatus: '',
        householdType: '',
        householdAddress: '',
        hobby: [],
        private: false
      },
      rules: {
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        cerNo: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: validateUtil.validator('idCardNo'), trigger: 'blur' }
        ]
      },
      regionOptions: regionData,
      regionProps: {
        value: 'label'
      },
      regionSelect: [],
      householdType: EMI_HOUSEHOLD_TYPE,
      nation: EMI_NATION,
      politicalStatus: EMI_POLITICAL_STATUS
    }
  },
  watch: {
    regionSelect (value) {
      this.staff.native = value.length ? value.join(' ') : ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

