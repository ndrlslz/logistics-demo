<template>
  <div class="login-page">
    <div class="login-card">
      <header class="login-card-header">用户登录</header>
      <div class="login-card-content">
        <form class="login-form">
          <div class="alert-error" v-if="errMsg">
            <span class="el-icon-circle-close error-icon"></span>
            <span class="error-text">{{errMsg}}</span>
          </div>
          <div class="form-group-wrapper">
            <div class="form-group">
              <el-input
                v-model="loginInfo.userName"
                placeholder="用户名"
              >
                <img slot="prefix" src="~@/share/assets/images/user.svg" />
              </el-input>
            </div>
            <div class="form-group">
              <el-input
                v-model="loginInfo.password"
                type="password"
                placeholder="密码"
              >
                <img slot="prefix" src="~@/share/assets/images/password.svg" />
              </el-input>
            </div>
            <div class="form-group">
              <el-button class="form-login-btn" @click="handleLogin">登录</el-button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Button,
    Input,
  } from 'element-ui'
  import { mapActions } from 'vuex'
  import { every, isEmpty } from 'lodash'

  const USERS = {
    admin: '123456',
  }

  export default {
    userName: 'login',
    components: {
      ElButton: Button,
      ElInput: Input,
    },
    data () {
      return {
        loginInfo: {
          userName: '',
          password: '',
        },
        errMsg: '',
      }
    },
    methods: {
      ...mapActions('token', ['setToken']),
      handleLogin () {
        const isValid = every(this.loginInfo, function (value) {
          return !isEmpty(value)
        })
        if (isValid) {
          if (USERS[this.loginInfo.userName] && USERS[this.loginInfo.userName] === this.loginInfo.password) {
            this.setToken(this.loginInfo)
            this.$router.replace('/')
          } else {
            this.errMsg = '用户名/密码错误'
          }
        } else {
          this.errMsg = '无效的用户名或密码'
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
@import "../../share/styles/mixin";
@import "../../share/styles/variable";

.login-page {
  position: relative;
  width: 100%;
  background-image: url('~@/share/assets/images/bg.jpg');
  background-size: 100%;

  .login-card {
    position: absolute;
    width: 500px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 70px;

    &-header {
      color: $color-pale-black;
      margin: 40px 0;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 2px;
      word-break: break-all;
      text-align: center;
    }

    &-content {
      .login-form {
        .alert-error {
          @include flex-start;
          margin-bottom: 20px;
          padding: 7px;
          border: 2px solid #c00;
          border-radius: 1px;
          color: #c00;

          .error-icon {
            font-size: 20px;
            font-weight: bold;
          }

          .error-text {
            margin-left: 6px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }

        .form-group-wrapper {
          margin-bottom: 18px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);

          .form-group {
            .form-login-btn {
              width: 100%;
              height: 70px;
              font-size: 14px;
              font-weight: bold;
              color: #333;
              background-color: $color-shell-yellow;
              border: none;
              border-radius: 2px;
              box-shadow: $base-shadow-box;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.login-page {
  .form-group {
    div.el-input.el-input--medium input.el-input__inner {
      height: 79px;
      border: none;
      border-radius: 0;
      padding-left: 70px;
    }
  }
}
</style>
