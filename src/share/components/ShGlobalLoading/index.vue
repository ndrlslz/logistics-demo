<template>
  <div class="loading-wrapper">
    <div class="loading">
      <i class="icon-btn-loading"></i>
      <span class="tip">数据加载中</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShGlobalLoading',
  }
</script>

<style lang="scss">
  @import '../../styles/variable';
  @import '../../styles/mixin';

  .loading-wrapper {
    position: fixed;
    left: 264px;
    width: calc(100% - 264px);
    height: 100vh;
    z-index: 2001;
  }

  .loading {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    height: 120px;
    left: 50%;
    margin: -60px 0 0 -60px;
    position: fixed;
    top: 50%;
    width: 120px;
    z-index: 2000;

    .icon-btn-loading {
      animation: loading 2s linear infinite;
      color: white;
      display: block;
      font-size: 32px;
      margin-top: 28px;
    }

    .tip {
      color: white;
      display: block;
      font-size: 14px;
      margin-top: 16px;
      text-align: center;
    }
  }
</style>
