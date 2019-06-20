<template>
  <div class="x-result-page">
    <div class="x-result-page-icon">
      <template v-if="$slots.icon"><slot name="icon" /></template>
      <template v-else>
        <x-icon
          :icon="resultIconClass"
          :class="resultIconColor"
        />
      </template>
    </div>
    <div class="x-result-page-title">
      <template v-if="$slots.title"><slot name="title"></slot></template>
      <template v-else>{{ title }}</template>
    </div>
    <div class="x-result-page-description">
      <template v-if="$slots.description"><slot name="description"></slot></template>
      <template v-else>{{ description }}</template>
    </div>
    <div class="x-result-page-extra">
      <slot name="extra"></slot>
    </div>
    <div class="x-result-page-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: {
    /* 类型 'success'|'fail' */
    type: {
      type: String,
      default: 'success'
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  computed: {
    resultIconClass () {
      return this.type === 'success' ? 'check-circle-fill' : this.type === 'fail' ? 'close-circle-fill' : ''
    },
    resultIconColor () {
      return this.type === 'success' ? 'color-success' : this.type === 'fail' ? 'color-danger' : ''
    }
  }
}
</script>
