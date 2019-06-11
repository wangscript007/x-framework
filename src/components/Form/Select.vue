<template>
  <el-select
    v-model="selected"
    :filterable="filterable"
    :clearable="clearable"
    :placeholder="placeholder"
  >
    <el-option
      v-for="item in items"
      :key="item[valueKeyInItems]"
      :label="item[labelKeyInItems]"
      :value="item[valueKeyInItems]"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'Select',
  model: {
    prop: 'selectValue',
    event: 'selectChange'
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ''
    },
    selectValue: {
      type: String,
      default: ''
    },
    valueKeyInItems: {
      type: String,
      default: 'id'
    },
    labelKeyInItems: {
      type: String,
      default: 'name'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  watch: {
    selectValue (value) {
      this.selected = value
    },
    selected (value) {
      this.$emit('selectChange', value)
    }
  }
}
</script>
