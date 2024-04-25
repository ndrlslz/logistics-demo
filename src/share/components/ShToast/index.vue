<template>
  <div class="toast-wrapper">
    <div class="loading-context" v-if="toastConfig.type === 'loading'"></div>
    <transition name="fadeInUp">
      <div :class="['toast', toastConfig.type]" v-if="shouldShowToast" :style="{width: toastConfig.width}">
        <div class="spinner" v-if="toastConfig.type === 'loading'">
          <i class="icon-btn-loading"></i>
        </div>
        <span class="text" v-if="toastConfig.text">{{ toastConfig.text }}</span>
        <div class="html" v-if="toastConfig.html" v-html="toastConfig.html"></div>
      </div>
    </transition>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    name: 'toast',

    computed: {
      ...mapState('ui', {
        shouldShowToast: state => state.toast.visible,
        toastConfig: state => state.toast.config,
      }),
    },
  }
</script>
<style scoped>
@import "./index.scss";
.toast-wrapper {
  z-index: 9999;
}
</style>
