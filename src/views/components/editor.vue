<template>
  <page>
    <card>
      <tinymce ref="editor"
               v-model="content">
      </tinymce>
      <div v-html="content"></div>
    </card>
  </page>
</template>

<script>
import Page from '@/components/Page'
import Card from '@/components/Card'
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
    Card,
    Tinymce
  }
}
</script>

<style scoped>
</style>
