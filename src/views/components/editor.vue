<template>
  <page>
    <el-card shadow="never">
      <tinymce
        v-model="content"
        @contentChange="contentChange"
      >
      </tinymce>
      <div v-html="content"></div>
    </el-card>
  </page>
</template>

<script>
import Page from '@/components/Page'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'Editor',
  components: {
    Page,
    Tinymce
  },
  data () {
    return {
      content: '<p>请输入内容</p>'
    }
  },
  methods: {
    contentChange (content) {
      console.log(content)
    }
  }
}
</script>

