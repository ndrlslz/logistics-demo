<template>
  <div id="page-wrapper">
    <div id="page">
      <side-bar
        class="side-bar"
        :default-active="defaultActive"
        :menuList="menuList"
        :userName="getUserInfo.userName"
        @onSideBarCollapse="onSideBarCollapse"
        @goToPage="goToPage"
        @logout="logout"
      />
      <div :class="[{isCollapse: isSideBarCollapse}, 'content']">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import SideBar from '@/share/pageElements/SideBar'

  export default {
    name: 'Home',
    components: {
      SideBar,
    },
    data () {
      return {
        isSideBarCollapse: false,
      }
    },
    computed: {
      ...mapGetters('token', ['getUserInfo']),
      defaultActive () {
        return this.$route.name
      },
      menuList () {
        return [
          {
            title: '首页',
            icon: 'icon-home',
            routeName: ['dashboard'],
          },
          {
            title: '设备管理',
            icon: 'icon-equipment-manage',
            routeName: ['equipmentManage'],
          },
          {
            title: '车辆管理',
            icon: 'icon-onsite-service',
            routeName: ['carManage'],
          },
          {
            title: '行程管理',
            icon: 'icon-supervision',
            routeName: ['scheduleManage'],
          },
          {
            title: '告警管理',
            icon: 'icon-data-manage',
            routeName: ['warningManage'],
          },
          {
            title: '配置管理',
            icon: 'icon-iot-ops-manage',
            routeName: ['configManage'],
          },
          {
            title: '用户管理',
            icon: 'icon-lube-equipment',
            routeName: ['userManage'],
          },
        ]
      },
    },
    methods: {
      ...mapActions('token', ['clearToken']),
      logout () {
        this.$confirm('确定退出系统吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.clearToken()
          this.$router.replace('/login')
        }).catch(() => {
        })
      },
      onSideBarCollapse (isCollapse) {
        this.isSideBarCollapse = isCollapse
      },
      goToPage (routeName) {
        this.$router.push({ name: routeName })
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '../../share/styles/variable';

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#page-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  #page {
    display: flex;
    justify-content: space-between;

    .content {
      width: 100%;
    }

    .side-bar + .content {
      position: relative;
      width: calc(100% - 264px);

      &.isCollapse {
        width: calc(100% - 90px);
      }
    }
  }
}
</style>
