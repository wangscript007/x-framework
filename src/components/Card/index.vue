<template>
  <div class="x-card">
    <div v-if="title"
         class="x-card-header">
      <div class="x-card-header-wrapper">
        <div class="x-card-header-title">
          <x-icon v-if="icon"
                  :icon="icon"
                  :type="iconType" />
          <span>{{title}}</span>
        </div>
      </div>
    </div>
    <div class="x-card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconType: {
      type: String,
      default: ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.x-card {
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s;
  &-header {
    min-height: 48px;
    margin-bottom: -1px;
    padding: 0 24px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 16px;
    background: transparent;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 2px 2px 0 0;
    zoom: 1;
    &:before,
    &:after {
      content: "";
      display: table;
    }
    &:after {
      clear: both;
    }
    &-wrapper {
      display: flex;
      align-items: center;
      .x-card-header-title {
        display: inline-block;
        flex: 1 1;
        padding: 16px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        & > .x-icon,
        & > span {
          display: inline-block;
          vertical-align: middle;
        }
        & > .x-icon {
          margin-right: 6px;
        }
      }
    }
  }
  &-body {
    padding: 24px;
    zoom: 1;
    &:before,
    &:after {
      content: "";
      display: table;
    }
    &:after {
      clear: both;
    }
  }
}
</style>
