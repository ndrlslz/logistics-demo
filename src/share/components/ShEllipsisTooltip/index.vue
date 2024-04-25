<template>
  <div class="sh-ellipsis-tooltip-wrapper" :class="{'is-link':linkable}" :style="`max-width:${maxWidth}`">
    <template v-if="showHtml">
      <span
        class="popover-tooltip"
        ref="el"
        v-if="isShowTooltip"
        v-html="content"
        v-tooltip.top="transformedContent"
      >
      </span>
      <span class="content" ref="el" v-else v-html="content"></span>
    </template>
    <template v-else>
      <span
        class="popover-tooltip"
        ref="el"
        v-if="isShowTooltip"
        v-text="content"
        v-tooltip.top="transformedContent"
      >
      </span>
      <span class="content" ref="el" v-else v-text="content"></span>
    </template>
    <i v-if="isShowIcon" :class="`icon-${icon}`"></i>
  </div>
</template>

<script>

  export default {
    name: 'ShEllipsisTooltip',
    props: {
      content: {
        type: [String, Number],
        default: undefined,
      },
      icon: {
        type: String,
        default: undefined,
      },
      tooltip: {
        type: String,
        default: undefined,
      },
      linkable: {
        type: Boolean,
        default: false,
      },
      showHtml: {
        type: Boolean,
        default: false,
      },
      maxWidth: {
        type: String,
        default: '170px',
      },
    },
    data () {
      return {
        isEllipsis: true,
      }
    },
    computed: {
      transformedContent () {
        if (this.tooltip) {
          return this.tooltip
        } else if (this.showHtml) {
          return this.content
        }
        return this.content && this.content.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;')
      },
      isShowTooltip () {
        return (!!this.linkable && !!this.tooltip) || this.isEllipsis
      },
      isShowIcon () {
        return this.linkable && this.icon
      },
    },
    methods: {
      updateTooltip () {
        this.isEllipsis = this.$refs.el.clientWidth < this.$refs.el.scrollWidth
      },
    },
    mounted: function () {
      this.updateTooltip()
    },
    updated: function () {
      this.updateTooltip()
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variable";

  .sh-ellipsis-tooltip-wrapper {
    display: flex;
    align-items: center;

    &.is-link:hover {
      color: $color-shell-yellow;
    }

    span {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    i {
      margin-left: 4px;
    }
  }
</style>
