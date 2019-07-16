<template>
  <page>
    <el-card
      shadow="never"
      class="margin-bottom-2x"
    >
      <template v-slot:header>
        <div class="fix">
          <strong class="el-card__header-title">文件上传</strong>
        </div>
      </template>
      <template v-slot:default>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="auto"
          status-icon
        >
          <el-row>
            <el-col
              :xl="{span: 18, offset:3}"
              :lg="{span: 20, offset: 2}"
              :md="{span: 22, offset: 1}"
              :sm="{span: 24}"
            >
              <el-row :gutter="24">
                <el-col :md="24">
                  <el-form-item
                    label="文章标题"
                    prop="title"
                  >
                    <el-input v-model.trim="form.title"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="24">
                  <el-form-item
                    label="标题描述"
                    prop="describe"
                  >
                    <el-input
                      v-model="form.describe"
                      type="textarea"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="作者"
                    prop="author"
                  >
                    <el-input v-model.trim="form.author"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="发布时间"
                    prop="releaseTime"
                  >
                    <el-date-picker
                      v-model.trim="form.releaseTime"
                      type="date"
                      class="full-width"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :md="12">
                  <el-form-item
                    label="附件"
                    prop="enclosure"
                  >
                    <el-upload
                      multiple
                      :action="uploadPath"
                      :data="uploadData"
                      :limit="3"
                      :file-list="enclosure"
                      :on-remove="enclosureOnRemove"
                      :on-success="enclosureOnSuccess"
                      :on-exceed="enclosureOnExceed"
                      :before-upload="enclosureBeforeUpload"
                    >
                      <el-button type="default">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :md="24">
                  <el-form-item
                    label="内容"
                    prop="content"
                  >
                    <tinymce
                      ref="editor"
                      v-model="form.content"
                      @contentChange="contentChange"
                    >
                    </tinymce>
                  </el-form-item>
                </el-col>
                <el-col :md="24">
                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="submitHandler()"
                    >创建文章
                    </el-button>
                    <el-button @click="resetForm()">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-card>
  </page>
</template>

<script>
import validator from '@/common/utils/validate'
import { createUploadToken } from '@/common/utils/qiniu'
import Page from '@/components/Page'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'Upload',
  components: {
    Page,
    Tinymce
  },
  data () {
    return {
      form: {
        title: '',
        author: '',
        releaseTime: '',
        describe: '',
        titleImage: [],
        enclosure: [],
        content: ''
      },
      rules: {
        title: validator({ required: true }, '标题'),
        author: validator({ required: true }, '作者'),
        releaseTime: validator({ required: true, type: 'date', message: '请选择日期' }),
        enclosure: validator({ required: true, message: '请上传附件' }),
        describe: validator({ required: true, message: '请填写描述' }),
        content: validator({ required: true, message: '请填写内容' })
      },
      enclosure: [],
      uploadPath: 'http://upload.qiniu.com',
      uploadData: {}
    }
  },
  created () {
    this.uploadData.token = createUploadToken()
  },
  methods: {
    enclosureBeforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('附件只能上传jpg格式的图片')
      }
      if (!isLt2M) {
        this.$message.error('附件的大小不能大于 2MB')
      }
      return isJPG && isLt2M
    },
    enclosureOnExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    enclosureOnSuccess (res, file) {
      this.form.enclosure.push({
        key: res.key,
        name: file.name,
        url: `http://puo5abfbc.bkt.clouddn.com/${res.key}`
      })
      this.$refs['form'].validateField('enclosure')
    },
    enclosureOnRemove (file) {
      const key = file.response.key
      const matchedIndex = this.form.enclosure.findIndex(item => {
        return item.key === key
      })
      if (matchedIndex > -1) {
        this.form.enclosure.splice(matchedIndex, 1)
      }
      this.$refs['form'].validateField('enclosure')
    },
    contentChange () {
      this.$refs['form'].validateField('content')
    },
    submitHandler () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs['form'].resetFields()
    }
  }
}
</script>
