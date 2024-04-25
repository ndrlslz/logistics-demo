<template>
  <div class="sh-side-bar">
    <div class="icon-bar">
      <template>
        <img class="logo" src="@/share/assets/images/logo.png" @click="goToHome" />
        <ul>
          <li
            :class="{ active: isActiveRoute(menu) }"
            v-for="menu in menuList"
            :key="menu.title"
            @click="goToPage(menu.routeName)"
          >
            <i :class="menu.icon" />
          </li>
        </ul>
      </template>
      <div :class="['operation', {'show-factory': showFactory}]">
        <div :class="['extra', {active: isExtraMenuActive}]" v-if="showExtraMenu">
          <el-popover
            placement="right"
            trigger="click"
            ref="iconTriggerExtraMenuPopover"
          >
            <div
              class="sh-side-bar-extra-menu"
              v-for="extraMenu in extraMenuList"
              :key="extraMenu.name"
              @click="handleExtraMenu(extraMenu.name, 'iconTriggerExtraMenuPopover')"
            >
              {{ extraMenu.label }}
            </div>
            <i class="el-icon-more" slot="reference" />
          </el-popover>
        </div>
        <div class="factory" v-if="showFactory">
          <el-popover popper-class="sidebar-factory-popover" placement="right" trigger="click">
            <div
              class="sh-side-bar-extra-menu"
              v-for="item in factoryProviderAuth"
              :key="item.id"
              @click="handleSwitchFactoryProvider(item)"
            >
             <span :class="{active: item.name === currentFactoryName}">{{ item.name }}</span>
            </div>
            <i class="icon-factory" slot="reference" />
          </el-popover>
        </div>
        <div v-if="showUser" class="user-name">
          <i class="icon-account" />
        </div>
        <i
          class="icon-chevrons-right"
          :class="{ rotate: !isCollapse }"
          @click="toggleCollapse"
        />
      </div>
    </div>
    <transition name="fade" mode="out-in" :duration="1.8">
      <div class="title-bar" v-if="!isCollapse">
        <img
          class="logo"
          src="@/share/assets/images/company-name.jpeg"
        />
        <ul>
          <li
            :class="{ active: isActiveRoute(menu) }"
            v-for="menu in menuList"
            :key="menu.title"
            @click="goToPage(menu.routeName)"
          >
            {{ menu.title }}
          </li>
        </ul>
        <div :class="['operation', {'show-factory': showFactory}]">
          <div :class="['extra', {active: isExtraMenuActive}]" v-if="showExtraMenu">
            <el-popover
              placement="right"
              trigger="click"
              ref="textTriggerExtraMenuPopover"
            >
              <div
                class="sh-side-bar-extra-menu"
                v-for="extraMenu in extraMenuList"
                :key="extraMenu.name"
                @click="handleExtraMenu(extraMenu.name, 'textTriggerExtraMenuPopover')"
              >
                {{ extraMenu.label }}
              </div>
              <span slot="reference">其他功能</span>
            </el-popover>
          </div>
          <div class="factory" v-if="showFactory">
            <el-popover popper-class="sidebar-factory-popover" placement="right" trigger="click">
              <div
                class="sh-side-bar-extra-menu"
                v-for="item in factoryProviderAuth"
                :key="item.id"
                @click="handleSwitchFactoryProvider(item)"
              >
                <span :class="{active: item.name === currentFactoryName}">{{ item.name }}</span>
              </div>
              <div slot="reference">
                <div class="factory-name">{{ currentFactoryName }}</div>
                <div class="switch-factory" v-if="factoryProviderAuth.length > 1">切换工厂</div>
              </div>
            </el-popover>
          </div>
          <div v-if="showUser" :class="['user-name', {'user-name-with-logout': hasUserNameAndLogout}]">
            <el-tooltip
              v-if="userName"
              class="item"
              effect="dark"
              :content="userName"
              placement="top"
            >
              <span>{{userName}}</span>
            </el-tooltip>
            <div v-if="canLogout" class="logout" @click="logout">
              <span>登出</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import { Popover, Tooltip } from 'element-ui'
  import { get } from 'lodash-es'

  export default {
    name: 'SideBar',
    components: {
      ElPopover: Popover,
      ElTooltip: Tooltip,
    },
    props: {
      defaultActive: {
        type: String,
        default: '',
      },
      canLogout: {
        type: Boolean,
        default: true,
      },
      menuList: {
        type: Array,
        required: true,
      },
      userName: {
        type: String,
        default: '',
      },
      currentFactoryName: {
        type: String,
        default: '',
      },
      extraMenuList: {
        type: Array,
        default: () => ([]),
      },
      extraMenuRouteNames: {
        type: Array,
        default: () => ([]),
      },
      factoryProviderAuth: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
        get,
        active: this.defaultActive || this.menuList[0].routeName,
        isCollapse: false,
      }
    },
    watch: {
      $route: function (route) {
        this.active = route.name
      },
    },
    computed: {
      showUser () {
        return this.userName || this.canLogout
      },
      showFactory () {
        return this.factoryProviderAuth.length > 0
      },
      showExtraMenu () {
        return this.extraMenuList.length > 0
      },
      hasUserNameAndLogout () {
        return this.userName && this.canLogout
      },
      isExtraMenuActive () {
        return this.extraMenuRouteNames.includes(this.active)
      },
    },
    methods: {
      toggleCollapse () {
        this.isCollapse = !this.isCollapse
        this.$emit('onSideBarCollapse', this.isCollapse)
      },
      goToPage (routeName) {
        this.active = routeName[0]
        this.$emit('goToPage', routeName[0])
      },
      handleSwitchFactoryProvider (selected) {
        this.$emit('handleSwitchFactoryProvider', selected)
      },
      handleExtraMenu (extraMenuName, refName) {
        this.$refs[refName] && this.$refs[refName].doClose()
        this.$emit('handleExtraMenu', extraMenuName)
      },
      logout () {
        this.$emit('logout')
      },
      isActiveRoute (menu) {
        return menu.routeName.includes(this.active)
      },
      goToHome () {
        this.$router.push({ name: 'home' })
      },
    },
  }
</script>
<style lang="scss" scoped>
@import 'src/share/styles/variable';

.sh-side-bar {
  display: flex;
  height: 100vh;
  box-shadow: $base-shadow-box;
  background-color: $color-blue;
  color: $color-pale-grey;
  font-size: $md-font-size;

  .icon-bar,
  .title-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;

    ul {
      padding: 30px 0;
      width: 100%;

      li {
        width: 100%;
        height: 34/14 * 1rem;
        display: flex;
        align-items: center;
        cursor: pointer;

        & + li {
          margin-top: 20px;
        }

        &.active {
          color: $color-shell-yellow;
        }

        i {
          font-size: 25/14 * 1rem;
        }
      }
    }

    .operation {
      width: 90%;
      height: 120px;
      margin-bottom: 43px;

      &.show-factory {
        height: 160px;
      }

      & > div:not(:last-child) {
        margin-bottom: 20px;
      }

      .extra,
      .factory {
        height: 34/14 * 1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        .icon-factory,
        .el-icon-more,
        .el-icon-download {
          font-size: $xxl-font-size;
        }
      }

      .extra {
        &.active {
          color: $color-shell-yellow;
        }
      }

      .factory {
        width: 100%;
        .el-popover__reference {
          .factory-name{
            display: inline-block;
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .switch-factory{
            cursor: pointer;
            position: relative;
            margin-top: 2px;
            &:before {
              content: '';
              position: absolute;
              left: 0;
              bottom: -1px;
              width: 54px;
              height: 1px;
              background-color: #979797;
            }
          }
        }
      }
      .user-name {
        margin-bottom: 20px;
        height: 46/14 * 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .item, .logout {
          line-height: 46/14 * 1rem;
        }

        &.user-name-with-logout {
          .item, .logout {
            line-height: 23/14 * 1rem;
          }
          .logout {
            padding-top: 2px;
            font-size: 1rem;
          }
        }

        .logout {
          span {
            cursor: pointer;
            position: relative;

            &:before {
              content: '';
              position: absolute;
              left: 0;
              bottom: -1px;
              width: 30px;
              height: 1px;
              background-color: #979797;
            }
          }
        }
      }
    }
  }

  .icon-bar {
    width: 90px;

    .logo {
      width: 54px;
      height: 50px;
      cursor: pointer;
    }

    li {
      justify-content: center;
      &.active {
        position: relative;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          width: 5px;
          height: 34/14 * 1rem;
          background-color: $color-shell-yellow;
        }
      }
    }

    .operation {
      .extra, .factory {
        justify-content: center;
      }

      .extra.active {
        position: relative;

        &:before {
          content: '';
          position: absolute;
          left: -4px;
          width: 5px;
          height: 34/14 * 1rem;
          background-color: $color-shell-yellow;
        }
      }

      .user-name {
        display: flex;
        justify-content: center;
        align-items: center;

        .icon-account {
          font-weight: 600;
          font-size: $xxl-font-size;
        }
      }

      & > i {
        display: inline-block;
        cursor: pointer;
        font-size: 25/14 * 1rem;
        font-weight: bold;

        &.rotate {
          transform: rotate(180deg);
          transition: rotate 0.5s;
        }
      }
    }
  }

  .title-bar {
    width: 174px;
    align-items: flex-start;

    .factory {
      span:first-of-type {
        width: 100%;
      }
    }

    .logo {
      width: 85%;
      height: 50px;
    }
  }
}

:global(.sh-side-bar-extra-menu) {
  padding: 8px 0;
  cursor: pointer;

  .active {
    color: $color-shell-yellow;
  }
}
:global(.sh-side-bar-extra-menu-tag) {
  margin-left: 6px;
  padding: 4px 8px;
  background-color: $color-shell-yellow;
}
</style>
<style lang="scss">
:global(.el-popover.el-popper.sidebar-factory-popover) {
  max-height: 200px;
  overflow-y: auto;
}
</style>
