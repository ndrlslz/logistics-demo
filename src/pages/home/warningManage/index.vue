<template>
  <div class="report-page" id="warning-manage">
    <div :class="['page-content', {'without-footer': totalNumber <= pageSize}]">
      <div class="sh-table-wrapper">
        <div class="adaptive-header-content">
          <div class="filter-item">
            <sh-select-search
              class="search-warning"
              :value="searchQuery.searchFields"
              :options="searchOptions"
              :searchPlaceholder="selectSearchFieldPlaceholder"
              @selectedChange="handleSelectFieldChange"
              @change="handleSearchFieldChange"
            />
          </div>
          <div class="filter-item">
            <sh-select
              class="warning-type"
              :value="searchQuery.selectedWarningType"
              :options="warningTypeOptions"
              placeholder="告警类型"
              @change="handleWarningTypeChange"
            />
          </div>
          <div class="filter-item">
            <sh-select
              class="warning-level"
              :value="searchQuery.selectedWarningLevel"
              :options="warningLevelOptions"
              placeholder="严重等级"
              @change="handleWarningLevelChange"
            />
          </div>
          <div class="filter-item">
            <sh-select
              class="warning-status"
              :value="searchQuery.selectedWarningStatus"
              :options="warningStatusOptions"
              placeholder="告警状态"
              @change="handleWarningStatusChange"
            />
          </div>
          <div class="filter-item">
            <sh-select
              class="notify-status"
              :value="searchQuery.selectedNotifyStatus"
              :options="notifyStatusOptions"
              placeholder="已推送"
              @change="handleNotifyStatusChange"
            />
          </div>
          <div class="filter-item multi-date-time-picker">
            <el-date-picker
              v-model="searchQuery.dateTimeRange"
              value-format="timestamp"
              type="datetimerange"
              range-separator="~"
              start-placeholder="告警开始时间"
              end-placeholder="告警结束时间"
              @change="handleDatePickerChange"
            />
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
                      <span class="operate-btn" @click="goToDetailPage(item.id)">查看</span>
                      <span class="operate-btn" @click="addComment(item.id)">添加备注</span>
                      <span class="operate-btn" @click="showHandleWarningDialog">处理告警</span>
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
    <sh-modal
      v-if="isShowCommentModal"
      v-model="isShowCommentModal"
      title="添加备注"
      :disabled="comments.length === 0"
      @submit="handleSubmit"
    >
      <el-input
        slot="content"
        type="textarea"
        rows="4"
        placeholder="请填写备注信息"
        v-model="comments"
        maxlength="100"
        show-word-limit
      />
    </sh-modal>
    <HandleWarningDialog
      v-if="isVisibleHandleWarningDialog"
      :visible="isVisibleHandleWarningDialog"
      @cancel="closeHandleWarningDialog"
      @submit="handleWarningTask"
      @handleUploadImage="handleUploadImage"
      @handleRemoveImage="handleRemoveImage"
    />
  </div>
</template>

<script>
  import { map, omit, debounce } from 'lodash-es'
  import ShSelectSearch from '@/share/components/ShSelectSearch'
  import ShSelect from '@/share/components/ShSelect'
  import ShPagination from '@/share/components/ShPagination'
  import ShEllipsisTooltip from '@/share/components/ShEllipsisTooltip'
  import ShModal from '@/share/components/ShModal'
  import HandleWarningDialog from '@/share/pageElements/HandleWarningDialog'
  import { DatePicker, Input } from 'element-ui'

  const TABLE_HEADERS = [
    {
      name: 'warningTime',
      description: '告警发生时间',
      class: 'sh-table_cell--large',
    },
    {
      name: 'equipmentNumber',
      description: '设备编号',
      class: 'sh-table_cell--small',
    },
    {
      name: 'carNumber',
      description: '车牌号',
      class: 'sh-table_cell--small',
    },
    {
      name: 'scheduleNumber',
      description: '行程编号',
      class: 'sh-table_cell--small',
    },
    {
      name: 'warningType',
      description: '告警类型',
      class: 'sh-table_cell--tiny',
    },
    {
      name: 'warningLevel',
      description: '严重等级',
      class: 'sh-table_cell--tiny',
    },
    {
      name: 'warningStatus',
      description: '告警状态',
      class: 'sh-table_cell--tiny',
    },
    {
      name: 'warningReason',
      description: '告警原因',
      class: 'sh-table_cell--large',
    },
    {
      name: 'comment',
      description: '备注',
      class: 'sh-table_cell--large',
    },
    {
      name: 'isNotify',
      description: '已推送告警',
      class: 'sh-table_cell--tiny',
    },
  ]
  const SEARCH_OPTIONS = [{
    value: 'equipmentNumber',
    label: '设备编号',
  }, {
    value: 'carNumber',
    label: '车牌号',
  }, {
    value: 'scheduleNumber',
    label: '行程编号',
  }]
  const WARNING_TYPE_ENUM = {
    TIMEOUT: 'TIMEOUT',
    DAMAGED: 'DAMAGED',
    LOST: 'LOST',
  }
  const WARNING_TYPE = {
    [WARNING_TYPE_ENUM.TIMEOUT]: {
      value: WARNING_TYPE_ENUM.TIMEOUT,
      label: '超时',
    },
    [WARNING_TYPE_ENUM.DAMAGED]: {
      value: WARNING_TYPE_ENUM.DAMAGED,
      label: '破损',
    },
    [WARNING_TYPE_ENUM.LOST]: {
      value: WARNING_TYPE_ENUM.LOST,
      label: '丢件',
    },
  }
  const WARNING_LEVEL_ENUM = {
    ONE: 'ONE',
    TWO: 'TWO',
    THREE: 'THREE',
  }
  const WARNING_LEVEL = {
    [WARNING_LEVEL_ENUM.ONE]: {
      value: WARNING_LEVEL_ENUM.ONE,
      label: '一级',
    },
    [WARNING_LEVEL_ENUM.TWO]: {
      value: WARNING_LEVEL_ENUM.TWO,
      label: '二级',
    },
    [WARNING_LEVEL_ENUM.THREE]: {
      value: WARNING_LEVEL_ENUM.THREE,
      label: '三级',
    },
  }
  const WARNING_STATUS_ENUM = {
    PENDING: 'PENDING',
    PROCESSED: 'PROCESSED',
    ELIMINATED: 'ELIMINATED',
  }
  const WARNING_STATUS = {
    [WARNING_STATUS_ENUM.PENDING]: {
      value: WARNING_STATUS_ENUM.PENDING,
      label: '待处理',
    },
    [WARNING_STATUS_ENUM.PROCESSED]: {
      value: WARNING_STATUS_ENUM.PROCESSED,
      label: '已处理',
    },
    [WARNING_STATUS_ENUM.ELIMINATED]: {
      value: WARNING_STATUS_ENUM.ELIMINATED,
      label: '已消除',
    },
  }

  export default {
    name: 'warningManage',
    components: {
      ShSelectSearch,
      ShSelect,
      ShPagination,
      ShEllipsisTooltip,
      ShModal,
      HandleWarningDialog,
      ElDatePicker: DatePicker,
      ElInput: Input,
    },
    data () {
      return {
        tableHeaders: TABLE_HEADERS,
        searchOptions: SEARCH_OPTIONS,
        warningTypeOptions: map(WARNING_TYPE),
        warningLevelOptions: map(WARNING_LEVEL),
        warningStatusOptions: map(WARNING_STATUS),
        notifyStatusOptions: [{ value: true, label: '是' }, { value: false, label: '否' }],
        searchQuery: {
          searchFields: {
            selectedOption: undefined,
            searchValue: undefined,
          },
          selectedWarningType: undefined,
          selectedWarningLevel: undefined,
          selectedWarningStatus: undefined,
          selectedNotifyStatus: undefined,
          dateTimeRange: [],
          pageIndex: 1,
        },
        totalNumber: 8,
        pageSize: 10,
        list: [
          {
            id: '001',
            warningTime: '2023/12/10 11:11:00',
            equipmentNumber: 'EQ.001',
            carNumber: '川A67678',
            scheduleNumber: 'SN001',
            warningType: '超时',
            warningLevel: '一级',
            warningStatus: '已处理',
            warningReason: '天气原因，运输延迟',
            comment: '已联系客户，告知实际情况',
            isNotify: '是',
          },
          {
            id: '002',
            warningTime: '2023/12/10 11:11:00',
            equipmentNumber: 'EQ.001',
            carNumber: '川A67678',
            scheduleNumber: 'SN001',
            warningType: '超时',
            warningLevel: '一级',
            warningStatus: '已处理',
            warningReason: '天气原因，运输延迟',
            comment: '已联系客户，告知实际情况',
            isNotify: '是',
          },
          {
            id: '003',
            warningTime: '2023/12/10 11:11:00',
            equipmentNumber: 'EQ.001',
            carNumber: '川A67678',
            scheduleNumber: 'SN001',
            warningType: '超时',
            warningLevel: '一级',
            warningStatus: '已处理',
            warningReason: '天气原因，运输延迟',
            comment: '已联系客户，告知实际情况',
            isNotify: '是',
          },
          {
            id: '004',
            warningTime: '2023/12/10 11:11:00',
            equipmentNumber: 'EQ.001',
            carNumber: '川A67678',
            scheduleNumber: 'SN001',
            warningType: '超时',
            warningLevel: '一级',
            warningStatus: '已处理',
            warningReason: '天气原因，运输延迟',
            comment: '已联系客户，告知实际情况',
            isNotify: '是',
          },
          {
            id: '005',
            warningTime: '2023/12/10 11:11:00',
            equipmentNumber: 'EQ.001',
            carNumber: '川A67678',
            scheduleNumber: 'SN001',
            warningType: '超时',
            warningLevel: '一级',
            warningStatus: '已处理',
            warningReason: '天气原因，运输延迟',
            comment: '已联系客户，告知实际情况',
            isNotify: '是',
          },
          {
            id: '006',
            warningTime: '2023/12/10 11:11:00',
            equipmentNumber: 'EQ.001',
            carNumber: '川A67678',
            scheduleNumber: 'SN001',
            warningType: '超时',
            warningLevel: '一级',
            warningStatus: '已处理',
            warningReason: '天气原因，运输延迟',
            comment: '已联系客户，告知实际情况',
            isNotify: '是',
          },
          {
            id: '007',
            warningTime: '2023/12/10 11:11:00',
            equipmentNumber: 'EQ.001',
            carNumber: '川A67678',
            scheduleNumber: 'SN001',
            warningType: '超时',
            warningLevel: '一级',
            warningStatus: '已处理',
            warningReason: '天气原因，运输延迟',
            comment: '已联系客户，告知实际情况',
            isNotify: '是',
          },
          {
            id: '008',
            warningTime: '2023/12/10 11:11:00',
            equipmentNumber: 'EQ.001',
            carNumber: '川A67678',
            scheduleNumber: 'SN001',
            warningType: '超时',
            warningLevel: '一级',
            warningStatus: '已处理',
            warningReason: '天气原因，运输延迟',
            comment: '已联系客户，告知实际情况',
            isNotify: '是',
          },
        ],
        confirmSearchFieldDebounced: null,
        isShowCommentModal: false,
        warningId: undefined,
        comments: '',
        isVisibleHandleWarningDialog: false,
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
      addComment (id) {
        this.isShowCommentModal = true
        this.warningId = id
        this.comments = ''
      },
      handleSubmit () {},
      showHandleWarningDialog () {
        this.isVisibleHandleWarningDialog = true
      },
      closeHandleWarningDialog () {
        this.isVisibleHandleWarningDialog = false
      },
      handleUploadImage (payload) {},
      handleRemoveImage (payload) {},
      handleWarningTask (payload) {},
      handleDatePickerChange () {},
      handleWarningTypeChange (selectedStatus) {
        this.searchQuery.selectedWarningType = selectedStatus
        this.confirmSearch()
      },
      handleWarningLevelChange (selectedStatus) {
        this.searchQuery.selectedWarningLevel = selectedStatus
        this.confirmSearch()
      },
      handleWarningStatusChange (selectedStatus) {
        this.searchQuery.selectedWarningStatus = selectedStatus
        this.confirmSearch()
      },
      handleNotifyStatusChange (selectedStatus) {
        this.searchQuery.selectedNotifyStatus = selectedStatus
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
          selectedWarningType,
          selectedWarningLevel,
          selectedWarningStatus,
          selectedNotifyStatus,
          start,
          end,
          pageIndex,
        } = this.$route.query
        this.searchQuery = {
          searchFields: {
            selectedOption: selectedOption || 'equipmentNumber',
            searchValue,
          },
          selectedWarningType,
          selectedWarningLevel,
          selectedWarningStatus,
          selectedNotifyStatus,
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

    .search-warning {
      width: $xl-width;
    }
    .warning-type, .warning-level, .warning-status, .notify-status {
      width: $xs-width;
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
