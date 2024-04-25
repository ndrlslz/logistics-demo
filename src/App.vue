<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style lang="scss">
  #app {
    display: flex; // 登录页面上的元素为垂直居中的 flex，在 IE 上需要父元素 #app 也为 flex
    min-height: 100%;
  }
</style>
