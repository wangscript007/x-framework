<template>
  <page>
    <el-card shadow="never">
      <tinymce v-model="content"
               name="editor">
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
  data () {
    return {
      content: '<p>Welcome to Use Tinymce Editor</p>'
    }
  },
  components: {
    Page,
    Tinymce
  }
}
</script>

<style scoped>
</style>
