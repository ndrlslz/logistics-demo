<template>
  <el-popover ref="popFilter" class="multiple-tab-filter equipment-filter" popper-class="equipment-filter-popover" placement="bottom" trigger="click">
    <el-tabs class="equipment-filter-tabs" v-model="activeTab" stretch>
      <el-tab-pane v-for="tab in tabsData" :key="tab.key" :label="tab.label" :name="tab.key">
        <ul class="filter-tab-content" v-if="tab.data.length > 0">
          <li v-for="tag in tab.data" :key="tag.value" :class="{active: tag.checked}"
              @click="onTagCheckChange(tab.key, tag)">
            {{ tag.label }}
          </li>
        </ul>
        <div v-else class="empty-data">暂无数据</div>
      </el-tab-pane>
      <div class="buttons-row">
        <sh-button class="btns reset" @click="resetFilters">重置</sh-button>
        <sh-button class="btns btn--fill" @click="saveFilters">确定</sh-button>
      </div>
    </el-tabs>
    <div class="text" slot="reference">
      <i class="icon-filter"></i>
      <span>筛选</span>
    </div>
  </el-popover>
</template>

<script>
  import { cloneDeep, get } from 'lodash-es'
  import ShButton from '@/share/components/Button/ShButton'
  import { Popover, TabPane, Tabs } from 'element-ui'

  export default {
    name: 'ShTagsFilter',
    components: {
      ShButton,
      ElPopover: Popover,
      ElTabs: Tabs,
      ElTabPane: TabPane,
    },
    props: {
      dataSource: {
        type: Array,
        default: () => ([]),
      },
      initFilter: {
        type: Object,
        default: () => ({}),
      },
      isSingleSelect: Boolean,
    },
    data () {
      return {
        activeTab: this.dataSource[0].key,
        activeTag: {},
      }
    },
    watch: {
      initFilter: function (val) {
        this.activeTag = cloneDeep(val)
      },
    },
    computed: {
      tabsData () {
        return this.dataSource.map((tab) => {
          const activeTagsInCurrentTab = get(this.activeTag, [tab.key], [])
          // 给每个tag添加是否check状态
          const checkedTags = tab.data.map((tag) => {
            // 判断是否check
            const isChecked = activeTagsInCurrentTab.includes(tag.value)
            return {
              ...tag,
              checked: isChecked,
            }
          })
          return {
            ...tab,
            data: checkedTags,
          }
        })
      },
    },
    methods: {
      closeFilters () {
        this.$refs.popFilter.doClose()
      },
      saveFilters () {
        this.$emit('onSave', this.activeTag)
        this.closeFilters()
      },
      resetFilters () {
        this.activeTag = {}
        this.$emit('onReset')
        this.closeFilters()
      },
      onTagCheckChange (tabKey, tag) {
        let activeTagsInCurrentTab = get(this.activeTag, [tabKey], [])
        const index = activeTagsInCurrentTab.indexOf(tag.value)
        if (index !== -1) {
          activeTagsInCurrentTab.splice(index, 1)
        } else {
          if (this.isSingleSelect) {
            activeTagsInCurrentTab = [tag.value]
          } else {
            activeTagsInCurrentTab.push(tag.value)
          }
        }
        this.$set(this.activeTag, tabKey, activeTagsInCurrentTab)
      },
    },
  }
</script>

<style lang="scss" scoped>
@import "../../styles/variable";

.equipment-filter {
  border: 1px solid #DCDFE6;
}
</style>
