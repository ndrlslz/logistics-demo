<template>
  <button
    :class="['btn', 'btn_light', isLoading && 'btn--loading']"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <i v-if="icon" :class="`icon-${icon}`"/>
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
      icon: String,
      isLoading: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style lang="scss">
@import '../../styles/variable';
@import '../../styles/mixin';
.btn.btn_light {
  height: $primary-height;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: solid 1px $color-shell-pale-yellow;
  background-color: $color-white;
  transition: all .3s;
  cursor: pointer;
  white-space: nowrap;

  .text {
    @include text-normal;
  }

  &[disabled] {
    cursor: not-allowed;
    border: 1px solid $color-shell-mid-grey;
    .text {
      color: $color-shell-mid-grey;
    }
  }

  &:not([disabled]) {
    &:hover {
      border: solid 1px $color-shell-hover-yellow;
    }
  }

  &--fill {
    border: none;
    background-color: $color-shell-pale-yellow;

    &[disabled] {
      border: none;
      background-color: $color-pale-grey;
    }

    &:not([disabled]) {
      &:hover {
        border: none;
        background-color: $color-shell-hover-yellow;
      }
    }
  }

  [class*="icon-"] + span {
    margin-left: 1em;
  }

  & + .btn_light {
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

.btn--loading.btn_light {
  border: solid 1px #404040 !important;
  color: $color-base !important;
}

.btn--loading.btn_light--fill {
  border: solid 1px $color-shell-pale-yellow !important;
  color: $color-base !important;
}

.btn--loading.btn_light--fill {
  border: solid 1px $color-shell-pale-yellow;
  color: $color-base;

  .btn_loading-content {
    background:$color-shell-pale-yellow;
  }
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
