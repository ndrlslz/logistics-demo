<template>
  <button
    type="button"
    :class="[`btn`, isLoading && `btn--loading`]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <i v-if="icon" :class="`icon-${icon}`"></i>
    <span class="text">
    <slot></slot>
    </span>
    <span class="btn_loading-content" v-if="isLoading">
      <i class="icon-btn-loading"></i>
    </span>
  </button>
</template>

<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
      icon: String,
    },
  }
</script>

<style lang="scss">
  @import '../../styles/variable';
  @import '../../styles/mixin';
  .btn {
    @include text-normal;
    position: relative;
    padding: 0 2rem;
    height: $primary-height;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: solid 1px #404040;
    border-radius: 2px;
    background-color: white;
    transition: all .3s;
    cursor: pointer;
    white-space: nowrap;

    &[disabled] {
      opacity: .2;
      cursor: not-allowed;
    }
    &:not([disabled]) {
      &:hover {
        color: $color-shell-yellow;
        border: solid 1px $color-shell-yellow;
      }
      &:active {
        color: $color-active;
        border: solid 1px $color-active;
      }
    }
    &--fill {
      border: solid 1px transparent;
      background: $color-shell-yellow;
      &[disabled] {
        opacity: .3;
      }
      &:not([disabled]) {
        &:hover {
          border: solid 1px transparent;
          color: $color-base;
          background: $color-hover;
        }
        &:active {
          border: solid 1px transparent;
          color: $color-base;
          background: $color-active;
        }
      }
    }
    &--weak {
      border-color: #d9d9d9;
      &.has-checked {
        color: $color-active;
      }
    }

    [class*="icon-"] + span {
      margin-left: 0.5em;
    }

    & + .btn {
      margin-left: 16px;
    }
  }

  .text:empty {
    display: none;
  }

  .btn_loading-content {
    position: absolute;
    display: inline-block;
    margin: 0 !important;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    background: white;
    @include flex-center();

    [class*="icon-"] {
      animation: loading 2s linear infinite;
    }
  }

  .btn--loading.btn {
    border: solid 1px #404040 !important;
    color: $color-base !important;
  }

  .btn--loading.btn--fill {
    border: solid 1px $color-shell-yellow !important;
    color: $color-base !important;
  }

  .btn--loading.btn--fill {
    border: solid 1px $color-shell-yellow;
    color: $color-base;
    .btn_loading-content {
      background: $color-shell-yellow;
    }
  }

  @keyframes loading
  {
    from{transform:rotate(0deg);}
    to{transform:rotate(360deg);}
  }
</style>
