<template>
  <page>
    <el-card
      shadow="never"
      class="margin-bottom-2x"
    >
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">资料审核进度</strong>
        </div>
      </template>
      <steps
        v-model="currentStep"
        :data="step"
      ></steps>
    </el-card>
    <el-card
      shadow="never"
      class="margin-bottom-2x"
    >
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">基本信息</strong>
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
    <el-card
      shadow="never"
      class="margin-bottom-2x"
    >
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">教育信息</strong>
        </div>
      </template>
      <el-table
        :data="staff.education"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="50"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="机构或学校"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          width="280"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="教育等级"
          width="120"
        >
        </el-table-column>
      </el-table>
    </el-card>
    <el-card
      shadow="never"
    >
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">家庭成员</strong>
        </div>
      </template>
      <el-table
        :data="staff.family"
        border
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          width="50"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="relationshipChinese"
          label="关系"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="phoneNo"
          label="联系电话"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="job"
          label="职位"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="workingUnit"
          label="工作单位"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </page>
</template>

<script>
import Page from '@/components/Page'
import Steps from '@/components/Steps'

export default {
  name: 'SeniorDetail',
  components: {
    Page,
    Steps
  },
  data () {
    return {
      currentStep: 2,
      step: [
        {
          id: 'p1',
          title: '资料填写',
          description: '员工入职当天通过企业云平台填写相应资料'
        },
        {
          id: 'p2',
          title: '人事部审核',
          description: '员工填写完毕后，由人事部进行初审'
        },
        {
          id: 'p3',
          title: '总经理审核',
          description: '人事部初审完毕后，由总经理进行终审'
        },
        {
          id: 'p4',
          title: '云备案',
          description: '终审后，员工资料将在企业云平台上备案并部分公示'
        }
      ],
      tabActive: 'base',
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
        remark: '',
        education: [
          {
            id: 'edu01',
            orgName: '光环国际',
            time: '2019-03-01至2019-05-31',
            type: 'PMP'
          },
          {
            id: 'edu02',
            orgName: '华南理工大学',
            time: '2010-09-01至2014-06-30',
            type: '本科'
          }
        ],
        family: [
          {
            id: 'fm01',
            name: '冯建英',
            relationshipChinese: '父女',
            phoneNo: '15915554462',
            job: '医生',
            workingUnit: '广东省人民医院'
          },
          {
            id: 'fm02',
            name: '李心娜',
            relationshipChinese: '母女',
            phoneNo: '13455667722',
            job: '律师',
            workingUnit: '广州市赛德律师事务所'
          }
        ]
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
