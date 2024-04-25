<template>
  <div id="sh-dialog">
    <el-dialog
      width="40%"
      top="0"
      :visible.sync="visible"
      :title="title"
      :before-close="handleClose"
      destroy-on-close="destroy-on-close"
      append-to-body="append-to-body"
    >
      <div class="dialog-title" slot="title">
        <slot name="title"></slot>
      </div>
      <div class="dialog-content">
        <div class="dialog-content-data">
          <slot name="dialogData"></slot>
        </div>
        <div class="dialog-content-chart">
          <slot name="dialogChart"></slot>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { Dialog } from 'element-ui'

  export default {
    name: 'ShDialog',
    components: {
      ElDialog: Dialog,
    },
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
    },
    methods: {
      handleClose () {
        this.$emit('beforeClose')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/variable";
  .el-dialog__wrapper {

    :global(div.el-dialog) {
        height: 80%;
        top: 50%;
        left: 50%;
        margin: 0;
        transform: translate(-50%, -50%);
        background: transparent url("../../assets/images/bg-popup.png") no-repeat;
        background-size: 100% 100%;

      :global(.el-dialog__body) {
          padding: 0;
          height: calc(100% - 66px);
          overflow-y: auto;

          &::-webkit-scrollbar {
            display: none;
          }
        }

      :global(div.el-dialog__header) {
        border: none;

        :global(.dialog-title), :global(.el-dialog__headerbtn .el-dialog__close) {
          font-size: 18px;
          font-weight: 600;
          color: #fff;

          i {
            margin-right: 8px;
            font-weight: normal;
            font-size: 20px;
          }
        }

        :global(button.el-dialog__headerbtn:focus .el-dialog__close), :global(button.el-dialog__headerbtn:hover .el-dialog__close) {
          color:$color-shell-blue-text;
        }
      }
    }
  }

  .dialog-content {
    padding: 0 52px;
  }
</style>
