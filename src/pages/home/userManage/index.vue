<template>
  <div class="report-page" id="user-manage">
    <div :class="['page-content', {'without-footer': totalNumber <= pageSize}]">
      <div class="sh-table-wrapper">
        <div class="adaptive-header-content">
          <div class="filter-item">
            <el-input
              class="search-input-with-prefix-icon"
              v-model="phone"
              type="search"
              placeholder="搜索手机号"
              clearable
              @input="handleSearchChange"
            >
              <i slot="prefix" class="icon-group-search"></i>
            </el-input>
          </div>
          <div class="filter-item">
            <sh-button
              icon="add"
              class="btn--fill"
              @click="goToAddUserPage"
            >
              创建用户
            </sh-button>
          </div>
          <div class="count filter-item fixed-right-header-item">
            总数：{{totalNumber}}
          </div>
        </div>
        <div class="sh-table-content-sticky-wrapper">
          <div class="sh-table-sub">
            <div class="sh-table-sub_center" :class="{ 'overflow-x-auto': list < 1 }">
              <table class="sh-table">
                <thead>
                <tr>
                  <th v-for="header in tableHeaders" :key="header.name">
                    <span :title="header.description">
                      {{ header.description }}
                    </span>
                  </th>
                  <th class="sh-table_cell--large operation">
                    <span title="operation">操作</span>
                  </th>
                </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="sh-table-content">
            <div class="sh-table-placeholder" v-if="list.length === 0">
              暂无数据
            </div>
            <div v-else>
              <table class="sh-table">
                <tbody>
                <tr v-for="item in list" :key="item.name">
                  <td v-for="header in tableHeaders" :key="header.name">
                    <sh-ellipsis-tooltip
                      :content="item[header.name]"
                    />
                  </td>
                  <td class="sh-table_cell--large operation">
                    <div>
                      <span class="operate-btn" @click="editUser(item.id)">编辑</span>
                      <span class="operate-btn" @click="deleteUser(item.id)">删除</span>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <sh-pagination
          class="footer-pagination-wrapper"
          @goToPage="goToPage"
          :pageIndex="pageIndex"
          :totalNumber="totalNumber"
          :pageSize="pageSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import ShButton from '@/share/components/Button/ShButton'
  import ShPagination from '@/share/components/ShPagination'
  import ShEllipsisTooltip from '@/share/components/ShEllipsisTooltip'
  import { Input } from 'element-ui'
  import { get } from 'lodash-es'

  const TABLE_HEADERS = [
    {
      name: 'name',
      description: '姓名',
      class: 'sh-table_cell--small',
    },
    {
      name: 'phone',
      description: '手机号',
      class: 'sh-table_cell--small',
    },
    {
      name: 'password',
      description: '密码',
      class: 'sh-table_cell--small',
    },
  ]

  export default {
    name: 'userManage',
    components: {
      ShButton,
      ShPagination,
      ShEllipsisTooltip,
      ElInput: Input,
    },
    data () {
      return {
        tableHeaders: TABLE_HEADERS,
        phone: undefined,
        pageIndex: 1,
        pageSize: 12,
        totalNumber: 15,
        list: [
          {
            phone: '13907980001',
            name: '张三',
            password: '123456',
          },
          {
            phone: '13907980002',
            name: '李四',
            password: '123456',
          },
          {
            phone: '13907980003',
            name: '王五',
            password: '123456',
          },
          {
            phone: '13907980004',
            name: '杜海涛',
            password: '123456',
          },
          {
            phone: '13907980005',
            name: '吴昕',
            password: '123456',
          },
          {
            phone: '13907980006',
            name: '何炅',
            password: '123456',
          },
          {
            phone: '13907980007',
            name: '谢娜',
            password: '123456',
          },
          {
            phone: '13907980008',
            name: '孔子',
            password: '123456',
          },
          {
            phone: '13907980009',
            name: '老子',
            password: '123456',
          },
          {
            phone: '13907980010',
            name: '黄子韬',
            password: '123456',
          },
          {
            phone: '13907980011',
            name: '鹿晗',
            password: '123456',
          },
          {
            phone: '13907980012',
            name: '吴亦凡',
            password: '123456',
          },
        ],
      }
    },
    computed: {
      searchParams () {
        return get(this.$route, 'query', {})
      },
    },
    methods: {
      handleSearchChange () {
        this.replaceUrl({
          phone: this.phone,
          pageIndex: 1,
        })
        this.fetchData()
      },
      replaceUrl (newQuery) {
        this.$router.replace({
          name: 'userManage',
          query: {
            ...this.$route.query,
            ...newQuery,
          },
        })
      },
      fetchData () {
      },
      goToPage (pageIndex) {
        this.replaceUrl({ pageIndex })
        this.fetchData()
      },
      goToAddUserPage () {},
      editUser () {},
      deleteUser () {},
    },
  }
</script>
<style lang="scss" scoped>
.report-page {
  .adaptive-header-content {
    border: solid 1px #e5e5e5;
  }
  .operation {
    text-align: left;
    div {
      justify-content: flex-start;

      span + span {
        margin-left: 10px;
      }
    }
  }
}
</style>
