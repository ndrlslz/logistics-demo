<template>
  <div :class="['btn-group', className]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      className: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variable";
  @import "../../styles/mixin";

  .btn-group {
    position: relative;
    display: inline-block;

    > .btn:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    > .btn:not(:first-child):not(:last-child) {
      border-radius: 0;
    }

    > .btn:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .btn {
      @include text-annotation;
      border-color: #d3d5dc;

      &:hover, &:active, &:focus {
        z-index: 2;
      }

      &.btn--active {
        @include text-normal;
        background-color: $color-shell-yellow;
        border-color: $color-shell-yellow;
      }
    }

    .btn + .btn {
      margin-left: -1px;
    }

  }
</style>
