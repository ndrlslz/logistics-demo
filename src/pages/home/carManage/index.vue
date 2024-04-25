<template>
  <div class="report-page" id="car-manage">
    <div :class="['page-content', {'without-footer': totalNumber <= pageSize}]">
      <div class="sh-table-wrapper">
        <div class="adaptive-header-content">
          <div class="filter-item">
            <el-input
              class="search-input-with-prefix-icon"
              v-model="id"
              type="search"
              placeholder="搜索车辆编号"
              clearable
              @input="handleSearchChange"
            >
              <i slot="prefix" class="icon-group-search"></i>
            </el-input>
          </div>
          <ShUploadButton
            class="filter-item"
            text="上传数据"
            description="仅支持.xlsx文件，文件最大20M"
            fileTypes="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :maxFileSize="20"
            @upload="uploadCars"
          />
          <div class="count filter-item fixed-right-header-item">
            总数：{{ totalNumber }}
          </div>
        </div>
        <div class="sh-table-content-sticky-wrapper">
          <div class="sh-table-sub">
            <div class="sh-table-sub_center" :class="{ 'overflow-x-auto': list.length < 1 }">
              <table class="sh-table">
                <thead>
                <tr>
                  <th v-for="header in tableHeaders" :key="header.name" :class="header.class">
                    <span :title="header.description">
                      {{ header.description }}
                    </span>
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
                  <td v-for="header in tableHeaders" :key="header.name" :class="header.class">
                    <sh-ellipsis-tooltip
                      :content="item[header.name]"
                    />
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
  import { get } from 'lodash-es'
  import ShUploadButton from '@/share/components/Button/ShUploadButton'
  import ShPagination from '@/share/components/ShPagination'
  import ShEllipsisTooltip from '@/share/components/ShEllipsisTooltip'
  import { Input } from 'element-ui'

  const TABLE_HEADERS = [
    {
      name: 'id',
      description: '车辆编号',
      class: 'sh-table_cell--small',
    },
    {
      name: 'type',
      description: '车辆型号',
      class: 'sh-table_cell--small',
    },
    {
      name: 'buyAt',
      description: '购买时间',
      class: 'sh-table_cell--tiny',
    },
    {
      name: 'age',
      description: '使用年份',
      class: 'sh-table_cell--tiny',
    },
    {
      name: 'updatedAt',
      description: '最近维修时间',
      class: 'sh-table_cell--tiny',
    },
    {
      name: 'company',
      description: '所属公司',
      class: 'sh-table_cell--large',
    },
  ]

  export default {
    name: 'carManage',
    components: {
      ElInput: Input,
      ShUploadButton,
      ShPagination,
      ShEllipsisTooltip,
    },
    data () {
      return {
        tableHeaders: TABLE_HEADERS,
        id: undefined,
        pageIndex: 1,
        pageSize: 12,
        totalNumber: 15,
        list: [
          {
            id: '001',
            type: '宝马X5',
            buyAt: '2024/01/01',
            age: '4个月',
            updatedAt: '2024/04/01',
            company: '上海宝马汽车制造一厂',
          },
          {
            id: '002',
            type: '宝马X5',
            buyAt: '2024/01/01',
            age: '4个月',
            updatedAt: '2024/04/01',
            company: '上海宝马汽车制造一厂',
          },
          {
            id: '003',
            type: '宝马X5',
            buyAt: '2024/01/01',
            age: '4个月',
            updatedAt: '2024/04/01',
            company: '上海宝马汽车制造一厂',
          },
          {
            id: '004',
            type: '宝马X5',
            buyAt: '2024/01/01',
            age: '4个月',
            updatedAt: '2024/04/01',
            company: '上海宝马汽车制造一厂',
          },
          {
            id: '005',
            type: '宝马X5',
            buyAt: '2024/01/01',
            age: '4个月',
            updatedAt: '2024/04/01',
            company: '上海宝马汽车制造一厂',
          },
          {
            id: '006',
            type: '宝马X5',
            buyAt: '2024/01/01',
            age: '4个月',
            updatedAt: '2024/04/01',
            company: '上海宝马汽车制造一厂',
          },
          {
            id: '007',
            type: '宝马X5',
            buyAt: '2024/01/01',
            age: '4个月',
            updatedAt: '2024/04/01',
            company: '上海宝马汽车制造一厂',
          },
          {
            id: '008',
            type: '宝马X5',
            buyAt: '2024/01/01',
            age: '4个月',
            updatedAt: '2024/04/01',
            company: '上海宝马汽车制造一厂',
          },
          {
            id: '009',
            type: '宝马X5',
            buyAt: '2024/01/01',
            age: '4个月',
            updatedAt: '2024/04/01',
            company: '上海宝马汽车制造一厂',
          },
          {
            id: '010',
            type: '宝马X5',
            buyAt: '2024/01/01',
            age: '4个月',
            updatedAt: '2024/04/01',
            company: '上海宝马汽车制造一厂',
          },
          {
            id: '011',
            type: '宝马X5',
            buyAt: '2024/01/01',
            age: '4个月',
            updatedAt: '2024/04/01',
            company: '上海宝马汽车制造一厂',
          },
          {
            id: '012',
            type: '宝马X5',
            buyAt: '2024/01/01',
            age: '4个月',
            updatedAt: '2024/04/01',
            company: '上海宝马汽车制造一厂',
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
          id: this.id,
          pageIndex: 1,
        })
        this.fetchData()
      },
      uploadCars (file) {
      },
      replaceUrl (newQuery) {
        this.$router.replace({
          name: 'carManage',
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
    },
  }
</script>
<style lang="scss" scoped>
.report-page {
  .adaptive-header-content {
    border: solid 1px #e5e5e5;
  }
}
</style>
