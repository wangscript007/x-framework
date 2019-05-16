<template>
  <page>
    <el-card shadow="never">
      <el-form
        ref="form"
        :model="form"
        label-width="auto"
      >
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select
            v-model="form.region"
            placeholder="请选择活动区域"
          >
            <el-option
              label="区域一"
              value="shanghai"
            ></el-option>
            <el-option
              label="区域二"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col
            class="line text-center"
            :span="2"
          >
            -
          </el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="form.date2"
              placeholder="选择时间"
              style="width: 100%;"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox
              label="美食/餐厅线上活动"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="地推活动"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="线下主题活动"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="单纯品牌曝光"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input
            v-model="form.desc"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >提交
          </el-button>
          <el-button @click="handleBack">返回</el-button>
        </el-form-item>
      </el-form>
      <el-checkbox
        label="单纯品牌曝光"
      ></el-checkbox>
      <el-radio label="线上品牌商赞助"></el-radio>
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
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
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
    onSubmit () {
      console.log('submit!')
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
