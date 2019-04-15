<template>
  <page>
    <div class="x-card">
      <div class="x-card-body">
        <tinymce ref="editor"
                 v-model="content">
        </tinymce>
        <div v-html="content"></div>
      </div>
    </div>
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
