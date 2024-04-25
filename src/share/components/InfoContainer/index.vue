<template>
  <div class="container">
    <h3>{{ title }}
      <slot name="icon"></slot>
    </h3>
    <div class="content-wrapper">
      <slot>
        <div class="placeholder" v-if="!hasSlotData">暂无数据</div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InfoContainer',
    props: {
      title: String,
    },
    computed: {
      hasSlotData () {
        return !!this.$slots.default
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/variable';

  .container {
    margin-top: 24px;

    h3 {
      font-size: 16/14 * 1rem;
      font-weight: 600;
      &:before {
        content: '';
        margin-right: 6px;
        border-left: 4px solid $color-shell-yellow;
      }

      i {
        margin-left: 2px;
        vertical-align: bottom;
      }
    }

    .content-wrapper {
      padding: 16px 10px;
    }

    .placeholder {
      padding: 8px 0;
      color: $color-tip;
    }
  }
</style>
