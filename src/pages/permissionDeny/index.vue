<template>
  <div class="permission">
    <p>抱歉，您无权限访问此页面。</p>
    请联系管理员获取相关权限
    <el-button
      class="back-to-login"
      type="info"
      @click="backToLogin"
    >
      返回登录页
    </el-button>
  </div>
</template>
<script>
  import { Button } from 'element-ui'

  export default {
    name: 'permission-deny',
    components: {
      ElButton: Button,
    },
    methods: {
      backToLogin () {
        this.$router.push('/login')
      },
    },
  }
</script>
<style lang="scss" scoped>
@import "../../share/styles/mixin";

.permission {
  width: 100%;
  height: 100%;
  @include flex-center;
  flex-direction: column;

  p {
    font-size: 20px;
    font-weight: bold;
  }

  .back-to-login {
    margin-top: 10px;
  }
}
</style>
