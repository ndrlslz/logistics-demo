<template>
  <div class="dashboard">
    <img class="statistics-img" src="@/share/assets/images/dashboard1.png" />
    <img class="statistics-img" src="@/share/assets/images/dashboard2.png" />
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
  }
</script>
<style lang="scss" scoped>
.dashboard {
  height: 100vh;
  overflow: scroll;
  .statistics-img {
    width: 100%;
  }
}
</style>
