<template>
  <div class="uploader-wrapper">
    <el-dialog title="上传图片"
               custom-class="image-uploader-dialog"
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
  data () {
    return {
      showDialog: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    openUploaderDialog () {
      this.showDialog = true
    },
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
        this.$message({
          showClose: true,
          message: '请等待所有图片上传完成, 如果上传失败，请刷新后重试'
        })
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
    min-height: 336px;
    padding: 12px 12px 0;
    border: solid 2px #c0ccda;
    .image-uploader {
      /deep/ .el-upload--picture-card {
        border-width: 2px;
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
  /deep/ .image-uploader-dialog {
    .el-dialog__body {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    @media screen and (max-width: 767px) {
      & {
        width: 90% !important;
      }
    }
    @media (min-width: 768px) and (max-width: 1199px) {
      & {
        width: 80% !important;
      }
    }
    @media screen and (min-width: 1200px) {
      & {
        width: 60% !important;
      }
    }
  }
}
</style>