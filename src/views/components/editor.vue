<template>
  <page>
    <el-card shadow="never">
      <tinymce ref="editor"
               v-model="content">
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
      content: 'Welcome to Use Tinymce Editor'
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
