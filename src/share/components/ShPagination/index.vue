<template>
  <div class="pagination" v-if="totalPage > 1">
    <sh-button
      class="btn pagination_pre"
      @click.native="handleClick(prePageIndex)"
      :disabled="prePageIndex < 1"
      icon="arrow-right"
    />
    <div class="pagination_links">
      <template v-for="item in paginationNavList">
        <a
          :class="{active: item === pageIndex}"
          @click="handleClick(item)"
          :key="item.id"
        >
          {{item }}
        </a>
      </template>
    </div>
    <sh-button
      class="btn pagination_next"
      :disabled="nextPageIndex > totalPage"
      @click.native="handleClick(nextPageIndex)"
      icon="arrow-right"
    />
  </div>
</template>
<script>
  import ShButton from '../Button/ShButton'

  const calculatePaginationNavList = ({ pageIndex, totalPage, length }) => {
    const halfLength = Math.floor(length / 2)
    length = halfLength * 2 + 1
    const navList = []
    let start = pageIndex - halfLength
    let end = start + length - 1
    if (totalPage > length) {
      if (start < 1) {
        start = 1
        end = start + length - 1
      } else if (end > totalPage) {
        end = totalPage
        start = totalPage - length + 1
      }
    } else {
      start = 1
      end = totalPage
    }
    let i = start
    while (i <= end) {
      navList.push(i++)
    }
    return navList
  }
  export default {
    name: 'ShPagination',
    components: {
      ShButton,
    },
    props: {
      pageIndex: {
        type: Number,
        required: true,
      },
      totalNumber: {
        type: Number,
        required: true,
      },
      pageSize: {
        type: Number,
        default: 30,
      },
      paginationNavLength: {
        type: Number,
        default: 5,
      },
    },
    computed: {
      paginationNavList () {
        return this.calculatePaginationNavList({
          pageIndex: this.pageIndex,
          totalPage: this.totalPage,
          length: this.paginationNavLength,
        })
      },
      totalPage () {
        return Math.ceil(this.totalNumber / this.pageSize)
      },
      prePageIndex () {
        return this.pageIndex - 1
      },
      nextPageIndex () {
        return this.pageIndex + 1
      },
    },
    methods: {
      handleClick (nextPage) {
        this.$emit('goToPage', nextPage)
      },
      calculatePaginationNavList,
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/variable.scss';
  @import '../../styles/mixin.scss';
  .pagination {
    display: flex;
    align-items: center;
    margin-left: $double-gap;

    &_pre, &_next {
      width: 3rem !important;
      padding: 0;
    }
    &_pre {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      :global(.icon-arrow-right) {
        display: inline-block;
        transform: rotateY(180deg);
      }
    }
    &_next {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
    &_links {
      @include text-normal;
      display: inline-block;
      padding: 0 $double-gap;
      a {
        display: inline-flex;
        padding: 0 $base-gap;
        font-family: Helvetica;
        line-height: 1.86;
        color: inherit;
        transition: all .3s;
        &:hover {
          color: $color-hover;
        }
        &:active {
          color: $color-active;
        }
        &.active {
          border-bottom: solid 2px $color-shell-yellow;
          color: $color-shell-yellow;
        }
      }
    }
  }
</style>
