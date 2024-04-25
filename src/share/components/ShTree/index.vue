<template>
  <div class="sh-tree" v-if="data.length">
    <div
      class="sh-tabs-item"
      v-for="node in treeNodes"
      :key="node.id"
    >
      <div
        :class="[
        isRoot ? 'sh-tree-title' : 'sh-tree-item',
        {'sh-tree-item-sub': !hasChild(node)},
        {'active': node.isActive},
      ]"
        @click.stop="handleMenuClick(node)"
      >
        <i v-if="hasChild(node)" :class="[{'rotate': node.isExpand }, 'el-icon-caret-right']"></i>
        <span>{{node.label}}</span>
      </div>
      <ShTree
        v-if="(hasChild(node) && node.isExpand)"
        :isRoot="false"
        :keyword="keyword"
        :data="node.children"
        :defaultSelectedKeys="selectedKeys"
        :depth="depth + 1"
        :onSelected="onSelected"
      />
    </div>
  </div>
  <div v-else class="empty">暂无数据，请重新搜索</div>
</template>
<script>
  import { getSelectedKeys, initStore } from './utils.js'

  export default {
    name: 'ShTree',
    props: {
      isRoot: {
        type: Boolean,
        default: true,
      },
      keyword: {
        type: String,
        default: '',
      },
      data: {
        type: Array,
        default: () => ([]),
      },
      defaultSelectedKeys: {
        type: Array,
        default: () => ([]),
      },
      depth: {
        type: Number,
        default: 0,
      },
      onSelected: {
        type: Function,
        default: () => {},
      },
    },
    data () {
      return {
        treeNodes: [],
        selectedKeys: this.defaultSelectedKeys,
      }
    },
    mounted () {
      if (this.depth === 0) {
        initStore(this.data)
      }
      this.treeNodes = this.initTree(this.data)
    },
    watch: {
      data (menus) {
        if (this.depth === 0) {
          initStore(this.data)
        }
        this.treeNodes = this.initTree(menus)
      },
      defaultSelectedKeys (defaultKeys) {
        this.selectedKeys = defaultKeys
      },
      selectedKeys (keys) {
        this.treeNodes = this.treeNodes.map(menu => ({
          ...menu,
          // 暂时不需要点击别的item后关闭所有已展开的item功能
          // isExpand: !!this.keyword || keys.includes(menu.id),
          isActive: !this.hasChild(menu) && keys.includes(menu.id),
        }))
      },
    },
    methods: {
      initTree (menuData) {
        return menuData.map(menu => ({
          ...menu,
          isExpand: !!this.keyword || this.selectedKeys.includes(menu.id),
          isActive: this.isActive(menu),
        }))
      },
      hasChild (menu) {
        return menu.children && menu.children.length
      },
      isActive (menu) {
        return !this.hasChild(menu) && this.selectedKeys.includes(menu.id)
      },
      onExpand (selectedMenu) {
        this.treeNodes = this.treeNodes.map(menuItem => ({
          ...menuItem,
          isExpand: selectedMenu.id === menuItem.id ? !menuItem.isExpand : menuItem.isExpand,
        }))
      },
      onSelectNode (selectedMenu) {
        if (!selectedMenu.isActive) {
          this.selectedKeys = getSelectedKeys(selectedMenu.id)

          this.onSelected(this.selectedKeys)
        }
      },
      handleMenuClick (menuItem) {
        if (this.hasChild(menuItem)) {
          this.onExpand(menuItem)
        } else {
          this.onSelectNode(menuItem)
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
@import "src/share/styles/variable";

.sh-tree {
  background: $color-white;
  color: $color-pale-black;

  &:first-child {
    padding: 20px 10px;
  }

  &-title {
    padding: 5px 2px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    cursor: pointer;

    span {
      font-weight: bold;
    }

    i {
      height: max-content;
      margin-right: 10px;
    }
  }

  &-item {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    padding: 5px 2px 5px 24px;
    cursor: pointer;

    i {
      height: max-content;
      margin-right: 10px;
    }

    &.sh-tree-item-sub{
      padding-left: 62px;
    }

    &.active {
      background-color: #eaf5fd;
      border-radius: 4px;
    }
  }

  .rotate {
    transform: rotate(90deg);
    transform-origin: center;
  }
}

.empty {
  color: $color-tip;
  text-align: center;
}
</style>
