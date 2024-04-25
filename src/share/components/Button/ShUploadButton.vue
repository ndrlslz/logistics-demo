<template>
  <div class="upload-file-button-wrapper">
    <input
      style="display: none"
      type="file"
      :accept="fileTypes"
      class="file-input"
      ref="fileUpload"
      @change="onChooseFile"
    />
    <el-popover
      placement="top-start"
      width="200"
      trigger="hover"
      :content="description"
    >
      <sh-button
        slot="reference"
        icon="upload"
        class="btn--fill"
        @click="doUpLoadReport"
      >
        {{ text }}
      </sh-button>
    </el-popover>
  </div>
</template>
<script>
  import { Popover } from 'element-ui'
  import ShButton from '@/share/components/Button/ShButton'
  import { isEmpty } from 'lodash-es'
  import { mapActions } from 'vuex'

  const onlyPdfType = 'application/pdf'

  export default {
    components: {
      ElPopover: Popover,
      ShButton,
    },
    props: {
      text: {
        type: String,
      },
      description: {
        type: String,
      },
      fileTypes: {
        type: String,
        default: onlyPdfType,
      },
      maxFileSize: {
        type: Number,
        default: 10,
      },
    },
    methods: {
      ...mapActions('ui', [
        'showToast',
      ]),
      doUpLoadReport () {
        const fileInputComponent = this.$refs.fileUpload
        fileInputComponent.click()
      },
      onChooseFile (event) {
        if (!isEmpty(event.target.files)) {
          const chosenFile = event.target.files[0]
          const fileSize = chosenFile.size
          const fileType = chosenFile.type
          const acceptTypes = this.fileTypes.split(',')

          console.log('filetype:', fileType)
          console.log('acceptTypes:', acceptTypes)
          if (fileSize >= (this.maxFileSize * 1000000)) {
            this.showToast({ text: `文件不能大于${this.maxFileSize}M`, type: '' })
            event.target.value = ''
            return
          }

          const fileReader = new FileReader()
          fileReader.onload = () => {
            this.handleUploadReport(chosenFile)
            event.target.value = ''
          }
          fileReader.readAsDataURL(chosenFile)
        }
        event.target.value = ''
      },
      handleUploadReport (file) {
        this.$emit('upload', file)
      },
    },
  }
</script>
