<template>
  <el-dialog
    class="sh-modal"
    :visible.sync="modalVisible"
    :title="title"
    top="10%"
    center
  >
    <slot name="content"></slot>
    <div class="submit">
      <sh-button :disabled="disabled" class="btn--fill" @click="handleSubmit">确 定</sh-button>
    </div>
  </el-dialog>
</template>

<script>
  import { Dialog } from 'element-ui'
  import ShButton from '@/share/components/Button/ShButton'

  export default {
    name: 'ShModal',
    components: {
      [Dialog.name]: Dialog,
      ShButton,
    },
    model: {
      prop: 'isVisible',
      event: 'change',
    },
    props: {
      isVisible: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      modalVisible: {
        get () {
          return this.isVisible
        },
        set (value) {
          this.$emit('change', value)
        },
      },
    },
    methods: {
      handleSubmit () {
        this.modalVisible = false
        this.$emit('submit')
      },
    },
  }
</script>

<style scoped lang="scss">
.sh-modal {
  .submit {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
  }

  :global(.el-dialog__title) {
    font-weight: 600;
  }
}
</style>
