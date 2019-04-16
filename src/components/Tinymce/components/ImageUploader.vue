<template>
  <div class="uploader-wrapper">
    <el-button icon="el-icon-upload"
               size="mini"
               type="primary"
               @click="showDialog=true">上传图片</el-button>
    <el-dialog title="图片上传"
               :visible.sync="showDialog"
               :modal-append-to-body='false'>
      <div class="image-wrapper">
        <el-upload accept="image/png,image/jpg,image/jpeg,image/ico,image/gif"
                   :multiple="true"
                   :file-list="fileList"
                   :show-file-list="true"
                   :on-success="handleSuccess"
                   :on-remove="handleRemove"
                   :before-upload="beforeUpload"
                   action="https://httpbin.org/post"
                   list-type="picture-card"
                   class="image-uploader">
          <x-icon icon="plus"
                  class="uploader-icon"></x-icon>
        </el-upload>
      </div>
      <div slot="footer"
           class="text-right">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary"
                   @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImageUploader',
  props: {},
  data () {
    return {
      showDialog: false,
      listObj: {},
      fileList: []
    }
  },
  created () { },
  mounted () { },
  computed: {},
  watch: {},
  methods: {
    checkAllSuccess () {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSuccess (response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove (file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    handleSubmit () {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功, 如果出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('uploaderSuccess', arr)
      this.listObj = {}
      this.fileList = []
      this.showDialog = false
    },
    beforeUpload (file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function () {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  },
  components: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.uploader-wrapper {
  .image-wrapper {
    padding: 12px 0 0 12px;
    border: dashed 1px #c0ccda;
    .image-uploader {
      /deep/ .el-upload--picture-card {
        margin-bottom: 12px;
        .uploader-icon {
          display: inline-block;
          font-size: 40px;
          color: #c0ccda;
          vertical-align: middle;
        }
        &:hover,
        &:focus {
          .uploader-icon {
            color: $theme-color;
          }
        }
      }
    }
  }
}
</style>