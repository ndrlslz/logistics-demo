<template>
  <div class="border-background" :class="[`${state}-border-bg`,{'exporting': isExporting}, {'checked': isChecked}]"
       @click="onClick">
    <div class="border-background-top"></div>
    <div class="border-background-bottom"></div>
    <slot name="content"></slot>
  </div>
</template>
<script>
  export default {
    name: 'borderBackground',
    props: {
      state: String,
      isChecked: Boolean,
      isExporting: Boolean,
    },
    methods: {
      onClick () {
        this.$emit('click')
      },
    },
  }
</script>
<style scoped lang="scss">
  @import "../../../share/styles/variable";

  .border-background {
    position: relative;
    border-radius: 4px;
    border: 2px solid transparent;

    &-top,
    &-bottom {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: calc(100% / 2);
      pointer-events: none;

      &:before,
      &:after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        border: 2px solid transparent;
      }

      &:before {
        top: -2px;
        left: -2px;
        border-top-left-radius: 4px;
      }

      &:after {
        top: -2px;
        right: -2px;
        border-top-right-radius: 4px;
      }
    }

    &-bottom {
      top: 50%;
      transform: scale(1, -1);
    }

    &.checked {
      border: 2px solid $color-shell-blue-text;
      border-radius: 4px;
      box-shadow: inset 0 0 20px 2px rgba(75, 152, 229, .2);
      background: none;

      .border-background-top,
      .border-background-bottom {
        display: none;
      }
    }
  }

  div.exporting {
    @extend .NORMAL-border-bg;
    cursor: auto;
    border-color: rgba(75, 152, 229, 0.4);
    box-shadow: none !important;
    background: none;
  }

  .NORMAL-border-bg {
    box-shadow: inset 0 0 20px 2px rgba(75, 152, 229, .2);
    border: 2px solid rgba(75, 152, 229, .5);
    background-color: rgba(75, 152, 229, .1);

    .border-background-top:before,
    .border-background-bottom:before {
      border-top-color: $color-shell-blue-text;
      border-left-color: $color-shell-blue-text;
    }

    .border-background-top:after,
    .border-background-bottom:after {
      border-top-color: $color-shell-blue-text;
      border-right-color: $color-shell-blue-text;
    }
  }

  .WARNING-border-bg {
    box-shadow: inset 0 0 20px 2px rgba(216, 89, 97, .2);
    border: 2px solid rgba(216, 89, 97, .5);
    background-color: rgba(216, 89, 97, .1);

    .border-background-top:before,
    .border-background-bottom:before {
      border-top-color: $color-shell-red;
      border-left-color: $color-shell-red;
    }

    .border-background-top:after,
    .border-background-bottom:after {
      border-top-color: $color-shell-red;
      border-right-color: $color-shell-red;
    }
  }

  .ABNORMAL-border-bg {
    box-shadow: inset 0 0 20px 2px rgba(233, 158, 57, .2);
    border: 2px solid rgba(233, 158, 57, .5);
    background-color: rgba(233, 158, 57, .1);

    .border-background-top:before,
    .border-background-bottom:before {
      border-top-color: $color-shell-orange;
      border-left-color: $color-shell-orange;
    }

    .border-background-top:after,
    .border-background-bottom:after {
      border-top-color: $color-shell-orange;
      border-right-color: $color-shell-orange;
    }
  }
</style>
