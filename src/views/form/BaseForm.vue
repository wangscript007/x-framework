<template>
  <x-page>
    <el-card shadow="never">
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">个人信息</strong>
          <el-button
            class="float-right el-card__header-btn"
            type="text"
          >
            返回列表
          </el-button>
        </div>
      </template>
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
                  <form-radio
                    v-model="form.sex"
                    :items="sex"
                    value-key="id"
                    label-key="name"
                  ></form-radio>
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
                    class="full-width"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="民族">
                  <form-select
                    v-model="form.nation"
                    :items="nation"
                    value-key="id"
                    label-key="name"
                    :filterable="true"
                    :clearable="true"
                    class="full-width"
                  ></form-select>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="籍贯">
                  <el-cascader
                    v-model="region.selected"
                    :options="region.options"
                    :props="region.props"
                    :clearable="true"
                    separator=" "
                    class="full-width"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="政治面貌">
                  <form-select
                    v-model="form.politicalStatus"
                    :items="politicalStatus"
                    value-key="id"
                    label-key="name"
                    :filterable="true"
                    :clearable="true"
                    class="full-width"
                  ></form-select>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="户口性质">
                  <form-select
                    v-model="form.householdType"
                    :items="householdType"
                    value-key="id"
                    label-key="name"
                    :filterable="true"
                    :clearable="true"
                    class="full-width"
                  ></form-select>
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
                  <form-checkbox
                    v-model="form.hobby"
                    :items="hobby"
                  ></form-checkbox>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="资料自己可见">
                  <el-switch v-model="form.private"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :md="24">
                <el-form-item>
                  <el-button type="primary">提交</el-button>
                  <el-button>返回</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <div class="x-description margin-bottom-3x">
        <h3>温馨提示</h3>
        <h4>1、此处可以写一些操作说明和注意事项</h4>
        <h4>2、此处可以写一些操作说明和注意事项</h4>
      </div>
    </el-card>
  </x-page>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { EMI_SEX, EMI_HOUSEHOLD_TYPE, EMI_NATION, EMI_POLITICAL_STATUS } from '@/common/emi/standard'
import validator from '@/common/utils/validate'
import FormSelect from '@/components/Form/Select'
import FormCheckbox from '@/components/Form/Checkbox'
import FormRadio from '@/components/Form/Radio'

export default {
  name: 'BaseForm',
  components: {
    FormSelect,
    FormCheckbox,
    FormRadio
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
        name: validator({ required: true }, '姓名'),
        cerNo: validator({ required: true, type: 'id' }, '身份证')
      },
      sex: EMI_SEX,
      region: {
        options: regionData,
        props: {
          value: 'label'
        },
        selected: []
      },
      householdType: EMI_HOUSEHOLD_TYPE,
      nation: EMI_NATION,
      politicalStatus: EMI_POLITICAL_STATUS,
      hobby: ['美食', '运动', '旅游', '政治', '军事', '汽车', '科技', '摄影']
    }
  },
  watch: {
    'region.selected' (value) {
      this.form.native = value.length ? value.join(' ') : ''
    }
  }
}
</script>

