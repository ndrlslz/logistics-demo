<template>
  <comp-breadcrumb separator-class="el-icon-arrow-right">
    <comp-breadcrumb-item
      class="breadcrumb-item"
      v-for="(item,index) in items"
      :to="item.to"
      :key="index"
    >
      {{item.name}}
    </comp-breadcrumb-item>
  </comp-breadcrumb>
</template>

<script>
  import { Breadcrumb, BreadcrumbItem } from 'element-ui'

  export default {
    name: 'ShBreadcrumb',
    components: {
      CompBreadcrumb: Breadcrumb,
      CompBreadcrumbItem: BreadcrumbItem,
    },
    props: {
      items: Array,
    },
  }
</script>
