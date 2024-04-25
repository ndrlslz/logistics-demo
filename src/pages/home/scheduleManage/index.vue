<template>
  <div class="report-page" id="schedule-manage">
    <div :class="['page-content', {'without-footer': totalNumber <= pageSize}]">
      <div class="sh-table-wrapper">
        <div class="adaptive-header-content">
          <div class="filter-item">
            <sh-select-search
              class="search-schedule"
              :value="searchQuery.searchFields"
              :options="searchOptions"
              :searchPlaceholder="selectSearchFieldPlaceholder"
              @selectedChange="handleSelectFieldChange"
              @change="handleSearchFieldChange"
            />
          </div>
          <div class="filter-item">
            <sh-select
              class="car-state"
              :value="searchQuery.selectedCarStatus"
              :options="carStatusOptions"
              placeholder="车辆状态"
              @change="handleCarStatusChange"
            />
          </div>
          <div class="filter-item">
            <sh-select
              class="schedule-state"
              :value="searchQuery.selectedScheduleStatus"
              :options="scheduleStatusOptions"
              placeholder="行程状态"
              @change="handleScheduleStatusChange"
            />
          </div>
          <div class="filter-item multi-date-time-picker">
            <el-date-picker
              v-model="searchQuery.dateTimeRange"
              value-format="timestamp"
              type="datetimerange"
              range-separator="~"
              start-placeholder="实际到达开始时间"
              end-placeholder="实际到达结束时间"
              @change="handleDatePickerChange"
            />
          </div>
          <ShUploadButton
            class="filter-item"
            text="上传数据"
            description="仅支持.xlsx文件，文件最大20M"
            fileTypes="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :maxFileSize="20"
            @upload="uploadData"
          />
          <div class="filter-item">
            <sh-button
              class="btn--fill"
              @click="exportData"
              icon="download"
              :disabled="exporting"
              :isLoading="exporting"
            >
              导出数据
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
                  <th class="sh-table_cell--tiny operation">
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
                  <td class="sh-table_cell--tiny operation">
                    <div>
                      <span class="operate-btn" @click="goToDetailPage(item.id)">查看</span>
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
          :pageIndex="searchQuery.pageIndex"
          :totalNumber="totalNumber"
          :pageSize="pageSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { map, omit, debounce } from 'lodash-es'
  import ShSelectSearch from '@/share/components/ShSelectSearch'
  import ShSelect from '@/share/components/ShSelect'
  import ShButton from '@/share/components/Button/ShButton'
  import ShUploadButton from '@/share/components/Button/ShUploadButton'
  import ShPagination from '@/share/components/ShPagination'
  import ShEllipsisTooltip from '@/share/components/ShEllipsisTooltip'
  import { DatePicker } from 'element-ui'

  const TABLE_HEADERS = [
    {
      name: 'id',
      description: '行程编号',
      class: 'sh-table_cell--small',
    },
    {
      name: 'planDepartureAddress',
      description: '计划出发地点',
      class: 'sh-table_cell--small',
    },
    {
      name: 'planDepartureTime',
      description: '计划发车时间',
      class: 'sh-table_cell--small',
    },
    {
      name: 'planArriveAddress',
      description: '计划到达地点',
      class: 'sh-table_cell--small',
    },
    {
      name: 'planArriveTime',
      description: '计划到达时间',
      class: 'sh-table_cell--small',
    },
    {
      name: 'actualDepartureAddress',
      description: '实际出发地点',
      class: 'sh-table_cell--small',
    },
    {
      name: 'actualDepartureTime',
      description: '实际发车时间',
      class: 'sh-table_cell--small',
    },
    {
      name: 'actualArriveAddress',
      description: '实际到达地点',
      class: 'sh-table_cell--small',
    },
    {
      name: 'actualArriveTime',
      description: '实际到达时间',
      class: 'sh-table_cell--small',
    },
    {
      name: 'goodsQuantity',
      description: '货物数量',
      class: 'sh-table_cell--tiny',
    },
    {
      name: 'goodsCategory',
      description: '货物品类',
      class: 'sh-table_cell--tiny',
    },
    {
      name: 'carNumber',
      description: '车牌号',
      class: 'sh-table_cell--small',
    },
    {
      name: 'latestLocation',
      description: '最新位置',
      class: 'sh-table_cell--large',
    },
    {
      name: 'carStatus',
      description: '车辆状态',
      class: 'sh-table_cell--small',
    },
    {
      name: 'scheduleStatus',
      description: '行程状态',
      class: 'sh-table_cell--small',
    },
  ]
  const SEARCH_OPTIONS = [{
    value: 'carNumber',
    label: '车辆编号',
  }, {
    value: 'planDepartureAddress',
    label: '计划出发地点',
  }, {
    value: 'planArriveAddress',
    label: '计划到达地点',
  }, {
    value: 'actualDepartureAddress',
    label: '实际出发地点',
  }, {
    value: 'actualArriveAddress',
    label: '实际到达地点',
  }]
  const CAR_STATUS_ENUM = {
    ACTIVE: 'ACTIVE',
    REST: 'REST',
    WAIT_CHECK: 'WAIT_CHECK',
  }
  const CAR_STATUS = {
    [CAR_STATUS_ENUM.ACTIVE]: {
      value: CAR_STATUS_ENUM.ACTIVE,
      label: '工作中',
    },
    [CAR_STATUS_ENUM.REST]: {
      value: CAR_STATUS_ENUM.REST,
      label: '空闲中',
    },
    [CAR_STATUS_ENUM.WAIT_CHECK]: {
      value: CAR_STATUS_ENUM.WAIT_CHECK,
      label: '待检修',
    },
  }
  const SCHEDULE_STATUS_ENUM = {
    TO_START: 'TO_START',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
  }
  const SCHEDULE_STATUS = {
    [SCHEDULE_STATUS_ENUM.TO_START]: {
      value: SCHEDULE_STATUS_ENUM.TO_START,
      label: '待开始',
    },
    [SCHEDULE_STATUS_ENUM.IN_PROGRESS]: {
      value: SCHEDULE_STATUS_ENUM.IN_PROGRESS,
      label: '运输中',
    },
    [SCHEDULE_STATUS_ENUM.COMPLETED]: {
      value: SCHEDULE_STATUS_ENUM.COMPLETED,
      label: '已完成',
    },
  }

  export default {
    name: 'scheduleManage',
    components: {
      ShSelectSearch,
      ShSelect,
      ShButton,
      ShUploadButton,
      ShPagination,
      ShEllipsisTooltip,
      ElDatePicker: DatePicker,
    },
    data () {
      return {
        tableHeaders: TABLE_HEADERS,
        searchOptions: SEARCH_OPTIONS,
        carStatusOptions: map(CAR_STATUS),
        scheduleStatusOptions: map(SCHEDULE_STATUS),
        searchQuery: {
          searchFields: {
            selectedOption: undefined,
            searchValue: undefined,
          },
          selectedCarStatus: undefined,
          selectedScheduleStatus: undefined,
          dateTimeRange: [],
          pageIndex: 1,
        },
        exporting: false,
        totalNumber: 8,
        pageSize: 10,
        list: [
          {
            id: '001',
            planDepartureAddress: '四川省成都市',
            planDepartureTime: '2023/12/10',
            planArriveAddress: '江苏省南京市',
            planArriveTime: '2024/12/15',
            actualDepartureAddress: '四川省成都市',
            actualDepartureTime: '2023/12/10',
            actualArriveAddress: '江苏省南京市',
            actualArriveTime: '2024/12/14',
            goodsQuantity: '5箱',
            goodsCategory: '砂石',
            carNumber: '川A67678',
            latestLocation: '江苏省南京市',
            carStatus: '空闲中',
            scheduleStatus: '已完成',
          },
          {
            id: '002',
            planDepartureAddress: '四川省成都市',
            planDepartureTime: '2023/12/10',
            planArriveAddress: '江苏省南京市',
            planArriveTime: '2024/12/15',
            actualDepartureAddress: '四川省成都市',
            actualDepartureTime: '2023/12/10',
            actualArriveAddress: '江苏省南京市',
            actualArriveTime: '2024/12/14',
            goodsQuantity: '5箱',
            goodsCategory: '砂石',
            carNumber: '川A67678',
            latestLocation: '江苏省南京市',
            carStatus: '空闲中',
            scheduleStatus: '已完成',
          },
          {
            id: '003',
            planDepartureAddress: '四川省成都市',
            planDepartureTime: '2023/12/10',
            planArriveAddress: '江苏省南京市',
            planArriveTime: '2024/12/15',
            actualDepartureAddress: '四川省成都市',
            actualDepartureTime: '2023/12/10',
            actualArriveAddress: '江苏省南京市',
            actualArriveTime: '2024/12/14',
            goodsQuantity: '5箱',
            goodsCategory: '砂石',
            carNumber: '川A67678',
            latestLocation: '江苏省南京市',
            carStatus: '空闲中',
            scheduleStatus: '已完成',
          },
          {
            id: '004',
            planDepartureAddress: '四川省成都市',
            planDepartureTime: '2023/12/10',
            planArriveAddress: '江苏省南京市',
            planArriveTime: '2024/12/15',
            actualDepartureAddress: '四川省成都市',
            actualDepartureTime: '2023/12/10',
            actualArriveAddress: '江苏省南京市',
            actualArriveTime: '2024/12/14',
            goodsQuantity: '5箱',
            goodsCategory: '砂石',
            carNumber: '川A67678',
            latestLocation: '江苏省南京市',
            carStatus: '空闲中',
            scheduleStatus: '已完成',
          },
          {
            id: '005',
            planDepartureAddress: '四川省成都市',
            planDepartureTime: '2023/12/10',
            planArriveAddress: '江苏省南京市',
            planArriveTime: '2024/12/15',
            actualDepartureAddress: '四川省成都市',
            actualDepartureTime: '2023/12/10',
            actualArriveAddress: '江苏省南京市',
            actualArriveTime: '2024/12/14',
            goodsQuantity: '5箱',
            goodsCategory: '砂石',
            carNumber: '川A67678',
            latestLocation: '江苏省南京市',
            carStatus: '空闲中',
            scheduleStatus: '已完成',
          },
          {
            id: '006',
            planDepartureAddress: '四川省成都市',
            planDepartureTime: '2023/12/10',
            planArriveAddress: '江苏省南京市',
            planArriveTime: '2024/12/15',
            actualDepartureAddress: '四川省成都市',
            actualDepartureTime: '2023/12/10',
            actualArriveAddress: '江苏省南京市',
            actualArriveTime: '2024/12/14',
            goodsQuantity: '5箱',
            goodsCategory: '砂石',
            carNumber: '川A67678',
            latestLocation: '江苏省南京市',
            carStatus: '空闲中',
            scheduleStatus: '已完成',
          },
          {
            id: '007',
            planDepartureAddress: '四川省成都市',
            planDepartureTime: '2023/12/10',
            planArriveAddress: '江苏省南京市',
            planArriveTime: '2024/12/15',
            actualDepartureAddress: '四川省成都市',
            actualDepartureTime: '2023/12/10',
            actualArriveAddress: '江苏省南京市',
            actualArriveTime: '2024/12/14',
            goodsQuantity: '5箱',
            goodsCategory: '砂石',
            carNumber: '川A67678',
            latestLocation: '江苏省南京市',
            carStatus: '空闲中',
            scheduleStatus: '已完成',
          },
          {
            id: '008',
            planDepartureAddress: '四川省成都市',
            planDepartureTime: '2023/12/10',
            planArriveAddress: '江苏省南京市',
            planArriveTime: '2024/12/15',
            actualDepartureAddress: '四川省成都市',
            actualDepartureTime: '2023/12/10',
            actualArriveAddress: '江苏省南京市',
            actualArriveTime: '2024/12/14',
            goodsQuantity: '5箱',
            goodsCategory: '砂石',
            carNumber: '川A67678',
            latestLocation: '江苏省南京市',
            carStatus: '空闲中',
            scheduleStatus: '已完成',
          },
        ],
        confirmSearchFieldDebounced: null,
      }
    },
    computed: {
      selectSearchFieldPlaceholder () {
        const selectOptionLabel = SEARCH_OPTIONS.find(item => item.value === this.searchQuery.searchFields.selectedOption) && SEARCH_OPTIONS.find(item => item.value === this.searchQuery.searchFields.selectedOption).label
        return `搜索${selectOptionLabel}`
      },
    },
    methods: {
      goToPage () {},
      goToDetailPage () {},
      exportData () {},
      uploadData () {},
      handleDatePickerChange () {},
      handleCarStatusChange (selectedStatus) {
        this.searchQuery.selectedCarStatus = selectedStatus
        this.confirmSearch()
      },
      handleScheduleStatusChange (selectedStatus) {
        this.searchQuery.selectedScheduleStatus = selectedStatus
        this.confirmSearch()
      },
      handleSearchFieldChange (searchFields) {
        this.searchQuery.searchFields = searchFields
        this.confirmSearchFieldDebounced()
      },
      handleSelectFieldChange (searchFields) {
        if (this.searchQuery.searchFields.searchValue === searchFields.searchValue) {
          this.searchQuery.searchFields = searchFields
        } else {
          this.handleSearchFieldChange(searchFields)
        }
      },
      confirmSearch () {
        this.replaceQuery({
          ...omit(this.searchQuery, 'searchFields', 'dateTimeRange'),
          ...this.searchQuery.searchFields,
          start: this.searchQuery.dateTimeRange[0] || undefined,
          end: this.searchQuery.dateTimeRange[1] || undefined,
          pageIndex: 1,
        })
        this.initSearchQuery()
        // this.fetchData()
      },
      replaceQuery (params) {
        this.$router.replace({
          query: { ...this.$route.query, ...params },
        })
      },
      initSearchQuery () {
        const {
          selectedOption,
          searchValue,
          selectedCarStatus,
          selectedScheduleStatus,
          start,
          end,
          pageIndex,
        } = this.$route.query
        this.searchQuery = {
          searchFields: {
            selectedOption: selectedOption || 'carNumber',
            searchValue,
          },
          selectedCarStatus,
          selectedScheduleStatus,
          dateTimeRange: start && end ? [start, end] : [],
          pageIndex: Number(pageIndex) || 1,
        }
      },
    },
    async created () {
      this.initSearchQuery()
      this.confirmSearchFieldDebounced = debounce(this.confirmSearch, 300)
    },
  }
</script>
<style lang="scss" scoped>
@import 'src/share/styles/variable';

.report-page {
  .adaptive-header-content {
    border: solid 1px #e5e5e5;
    border-top: 0;

    .search-schedule {
      width: $xl-width;
    }
    .car-state, .schedule-state {
      width: $sm-width;
    }
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
