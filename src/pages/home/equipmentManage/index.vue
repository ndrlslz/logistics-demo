<template>
  <div class="report-page" id="equipment-manage">
    <div :class="['page-content', {'without-footer': totalNumber <= pageSize}]">
      <div class="sh-table-wrapper">
        <div class="adaptive-header-content">
          <div class="filter-item">
            <sh-select-search
              class="search-device"
              :value="searchQuery.searchFields"
              :options="searchOptions"
              :searchPlaceholder="selectSearchFieldPlaceholder"
              @selectedChange="handleSelectFieldChange"
              @change="handleSearchFieldChange"
            />
          </div>
          <div class="filter-item">
            <sh-select
              class="device-state"
              :value="searchQuery.selectedDeviceStatus"
              :options="deviceStatusOptions"
              placeholder="设备状态"
              @change="handleDeviceStatusChange"
            />
          </div>
          <div class="filter-item multi-date-time-picker">
            <el-date-picker
              v-model="searchQuery.dateTimeRange"
              value-format="timestamp"
              type="datetimerange"
              range-separator="~"
              start-placeholder="首次绑定开始时间"
              end-placeholder="首次绑定结束时间"
              @change="handleDatePickerChange"
            />
          </div>
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
          <div class="filter-item">
            <sh-button
              icon="add"
              class="btn--fill"
              @click="goToAddDevicePage"
            >
              创建设备
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
                      <span class="operate-btn" @click="goToDeviceDetailPage(item.id)">查看</span>
                      <span class="operate-btn" @click="goToEditDevicePage(item.id)">编辑</span>
                      <span class="operate-btn" @click="goToDeviceMapPage(item.id)">地图</span>
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
  import ShSelectSearch from '@/share/components/ShSelectSearch'
  import ShSelect from '@/share/components/ShSelect'
  import ShButton from '@/share/components/Button/ShButton'
  import ShPagination from '@/share/components/ShPagination'
  import ShEllipsisTooltip from '@/share/components/ShEllipsisTooltip'
  import { DatePicker } from 'element-ui'
  import { map, debounce, omit } from 'lodash-es'

  const DEVICE_LIST_TABLE_HEADERS = [
    {
      name: 'id',
      description: '设备编号',
    },
    {
      name: 'carNumber',
      description: '绑定车牌号',
    },
    {
      name: 'limitedPeriod',
      description: '有限期/使用寿命',
    },
    {
      name: 'deviceStatus',
      description: '设备状态',
    },
    {
      name: 'bindAt',
      description: '首次绑定时间',
    },
    {
      name: 'supplierName',
      description: '供应商名称',
    },
  ]
  const DEVICE_OPTIONS = [{
    value: 'id',
    label: '设备编号',
  }, {
    value: 'carNumber',
    label: '车牌号',
  }]
  const DEVICE_STATUS_ENUM = {
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE',
  }
  const DEVICE_STATUS = {
    [DEVICE_STATUS_ENUM.ONLINE]: {
      value: DEVICE_STATUS_ENUM.ONLINE,
      label: '在线',
    },
    [DEVICE_STATUS_ENUM.OFFLINE]: {
      value: DEVICE_STATUS_ENUM.OFFLINE,
      label: '离线',
    },
  }

  export default {
    name: 'equipmentManage',
    components: {
      ShSelectSearch,
      ShSelect,
      ShButton,
      ShPagination,
      ShEllipsisTooltip,
      ElDatePicker: DatePicker,
    },
    data () {
      return {
        tableHeaders: DEVICE_LIST_TABLE_HEADERS,
        searchOptions: DEVICE_OPTIONS,
        deviceStatusOptions: map(DEVICE_STATUS),
        searchQuery: {
          searchFields: {
            selectedOption: undefined,
            searchValue: undefined,
          },
          selectedDeviceStatus: undefined,
          dateTimeRange: [],
          pageIndex: 1,
        },
        exporting: false,
        totalNumber: 6,
        pageSize: 10,
        list: [
          {
            id: '001',
            carNumber: '川A67678',
            limitedPeriod: '24个月',
            deviceStatus: '在线',
            bindAt: '2024/04/01 12:00',
            supplierName: '永鑫制造有限公司',
          },
          {
            id: '002',
            carNumber: '川A67678',
            limitedPeriod: '24个月',
            deviceStatus: '在线',
            bindAt: '2024/04/01 12:00',
            supplierName: '永鑫制造有限公司',
          },
          {
            id: '003',
            carNumber: '川A67678',
            limitedPeriod: '24个月',
            deviceStatus: '在线',
            bindAt: '2024/04/01 12:00',
            supplierName: '永鑫制造有限公司',
          },
          {
            id: '004',
            carNumber: '川A67678',
            limitedPeriod: '24个月',
            deviceStatus: '在线',
            bindAt: '2024/04/01 12:00',
            supplierName: '永鑫制造有限公司',
          },
          {
            id: '005',
            carNumber: '川A67678',
            limitedPeriod: '24个月',
            deviceStatus: '在线',
            bindAt: '2024/04/01 12:00',
            supplierName: '永鑫制造有限公司',
          },
          {
            id: '006',
            carNumber: '川A67678',
            limitedPeriod: '24个月',
            deviceStatus: '在线',
            bindAt: '2024/04/01 12:00',
            supplierName: '永鑫制造有限公司',
          },
        ],
        confirmSearchFieldDebounced: null,
      }
    },
    computed: {
      selectSearchFieldPlaceholder () {
        const selectOptionLabel = DEVICE_OPTIONS.find(item => item.value === this.searchQuery.searchFields.selectedOption) && DEVICE_OPTIONS.find(item => item.value === this.searchQuery.searchFields.selectedOption).label
        return `搜索${selectOptionLabel}`
      },
    },
    methods: {
      goToPage () {},
      goToDeviceMapPage () {},
      goToEditDevicePage () {},
      goToDeviceDetailPage () {},
      goToAddDevicePage () {},
      exportData () {},
      handleDatePickerChange () {},
      handleDeviceStatusChange (selectedStatus) {
        this.searchQuery.selectedDeviceStatus = selectedStatus
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
          selectedDeviceStatus,
          start,
          end,
          pageIndex,
        } = this.$route.query
        this.searchQuery = {
          searchFields: {
            selectedOption: selectedOption || 'id',
            searchValue,
          },
          selectedDeviceStatus,
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

    .search-device {
      width: $xl-width;
    }
    .device-state {
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
