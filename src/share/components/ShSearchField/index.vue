<template>
  <div class="search-field">
    <el-tooltip v-if="icon" placement="top" :content="icon.toolTip">
      <i class="search-field__icon" :class="icon.className"/>
    </el-tooltip>
    <span class="search-field__label" v-if="label">{{ label + ': ' }}</span>
    <slot/>
  </div>
</template>

<script>
  import { Tooltip } from 'element-ui'

  export default {
    name: 'ShSearchField',
    components: {
      ElTooltip: Tooltip,
    },
    props: {
      label: String,
      icon: Object,
    },
  }
</script>

<style lang="scss">
  @import 'src/share/styles/variable';
  @import 'src/share/styles/mixin';

  .search-field {
    display: inline-flex;
    align-items: center;

    &__label {
      @include text-normal;
      margin-right: 3px;
    }
    &__icon {
      font-size: 16px;
      color: $color-shell-yellow;
    }
  }
</style>
