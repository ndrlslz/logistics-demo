<template>
  <comp-tabs
    class="sh-tabs"
    v-model="activeIndex"
    @tab-click="handleClick"
  >
    <comp-tab-pane
      class="sh-tabs-item"
      v-for="(tab,index) in tabs"
      :label="tab.label"
      :index="tab.index"
      :key="index"
      :disabled="tab.disabled"
    />
    <slot></slot>
  </comp-tabs>
</template>

<script>
  import { Tabs, TabPane } from 'element-ui'

  export default {
    name: 'ShTabs',
    components: {
      CompTabs: Tabs,
      CompTabPane: TabPane,
    },
    props: {
      tabs: {
        type: Array,
        required: true,
      },
    },
    data () {
      return {
        activeIndex: this.tabs[0].index,
      }
    },
    methods: {
      handleClick (tab, event) {
        this.$emit('tab-click', Number(this.activeIndex))
      },
    },
  }
</script>

<style lang="scss">
@import "src/share/styles/variable";

.sh-tabs.el-tabs {
  div.el-tabs__header {
    margin: 24px 0;
  }

  div.el-tabs__nav-wrap:after {
    content: none;
  }

  div.el-tabs__nav {
    right: -50%;
    transform: translateX(-50%) !important;
  }

  div.el-tabs__active-bar {
    display: none;
  }

  div.el-tabs__item {
    font-size: 16/14 * 1rem;
    padding: 16px 12px;
    height: auto;
    line-height: normal;

    &:not(:last-of-type) {
      margin-right: 48px;
    }

    &:hover:not(.is-active):not(.is-disabled) {
      color: $color-shell-yellow;
    }

    &.is-active {
      color: $color-base;
      border-bottom: 6px solid $color-shell-yellow;
    }

    &.is-disabled {
      color: $color-tip;
      cursor: not-allowed;
    }
  }

  &.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 12px;
  }

  &.el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 12px;
  }
}
</style>
