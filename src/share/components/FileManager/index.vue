<template>
  <div class="templates-page-container">
    <div class="template-header" v-if="title">
      {{title}}
      <span class="file-upload-constriant" v-html="description"/>
    </div>
    <div class="file-list" v-for="(item, index) in files" :key="index">
      <div class="template-wrapper" :style="fileStyle">
        <img class="file-type-icon" :src="fileImage"/>
        <div class="template-overflow">
          <a
            v-if="canDownload"
            class="download-icon"
            :download="item.fileName"
            @click="downloadUrlOf(item)"
          >
            <img :src="require('@/share/assets/images/square-download.svg')"/>
          </a>
          <a
            v-show="canEdit"
            class="download-icon delete-icon"
            @click="confirmDeleteReport(item.fileName)"
          >
            <img :src="require('@/share/assets/images/trash-simple.svg')"/>
          </a>
        </div>
      </div>
      <span class="file-name" :style="fileNameStyle">{{item.fileName}}</span>
    </div>
    <div class="template-wrapper can-click" v-if="canUpload" @click="doUpLoadReport" :style="fileStyle">
      <input type="file" :accept="fileTypes" ref="pdfUpload" v-on:change="onChooseFile"/>
      <img class="file-type-icon" :src="require('@/share/assets/images/add.svg')"/>
    </div>
    <div class="template-placeholder" v-if="isShowPlaceHolder">
      <span><br/>目前还未上传报告</span>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { isEmpty, findIndex } from 'lodash-es'
  import fileImage from '@/share/assets/images/file.svg'
  import pdfImage from '@/share/assets/images/pdf.svg'

  const onlyPdfType = 'application/pdf'

  export default {
    name: 'file-manager',
    props: {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      canEdit: {
        type: Boolean,
      },
      files: {
        type: Array,
        default: () => ([]),
      },
      isSingleFile: {
        type: Boolean,
      },
      maxUploadNum: {
        type: Number,
        default: 3,
      },
      fileTypes: {
        type: String,
        default: onlyPdfType,
      },
      maxFileSize: {
        type: Number,
        default: 10,
      },
      canDownload: {
        type: Boolean,
        default: true,
      },
      fileWidth: {
        type: Number,
        default: 80,
      },
    },
    data () {
      return {
        modalActive: false,
        fileToken: '',
      }
    },
    computed: {
      isShowPlaceHolder () {
        return !this.canEdit && (!this.files || this.files.length === 0)
      },

      reportCount () {
        return this.files.length
      },

      canUpload () {
        return this.canEdit && this.reportCount < this.maxUploadNum
      },

      fileImage () {
        return this.fileTypes !== onlyPdfType ? fileImage : pdfImage
      },
      fileStyle () {
        return { width: `${this.fileWidth}px`, height: `${this.fileWidth}px` }
      },
      fileNameStyle () {
        return { width: `${this.fileWidth}px` }
      },
    },
    methods: {
      ...mapActions('ui', [
        'showToast',
      ]),

      downloadUrlOf (item) {
        this.$emit('download', item)
      },

      confirmDeleteReport (fileName) {
        this.$emit('delete', fileName)
      },

      onChooseFile (event) {
        if (!isEmpty(event.target.files)) {
          const chosenFile = event.target.files[0]
          const chosenFileName = chosenFile.name
          const fileSize = chosenFile.size
          const fileType = chosenFile.type
          const acceptTypes = this.fileTypes.split(',')

          // if (findIndex(acceptTypes, type => type.trim() === fileType) === -1) {
          //   this.showToast({ text: '文件格式错误', type: '' })
          //   event.target.value = ''
          //   return
          // }
          console.log('filetype:', fileType)
          console.log('acceptTypes:', acceptTypes)
          if (findIndex(this.$props.files, (report) => report.fileName === chosenFileName) !== -1) {
            this.showToast({ text: '文件已经存在', type: '' })
            event.target.value = ''
            return
          }
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

      doUpLoadReport () {
        const fileInputComponent = this.$refs.pdfUpload
        fileInputComponent.click()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../styles/variable';

  .templates-page-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    height: auto;

    .template-header {
      flex: 100%;
      font-size: 16/14 * 1rem;
      color: #222;
      margin-bottom: 16px;

      .file-upload-constriant {
        font-size: 1rem;
        color: #999;
      }
    }

    .template-overlay {
      position: relative;
      left: 0;
      top: 0;
      background: #900;
      width: 130px;
      height: 130px;
    }

    .template-placeholder {
      width: 100%;
      padding: 0 0 50px;
      text-align: left;
      font-size: 1rem;
      color: $color-tip;

      img {
        margin-bottom: 16px;
      }
    }

    .template-wrapper {
      position: relative;
      width: 80px;
      height: 80px;
      margin-right: 24px;
      border-radius: 4px;
      box-shadow: 1px 2px 4px #999;
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all .5s ease;

      .file-type-icon {
        width: auto;
        height: 36px;
        align-self: center;
      }

      .template-overflow {
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        border-radius: 4px;
        background-color: $color-shell-yellow;
        opacity: 0;

        img {
          height: 16px;
        }

      }

      &:hover .template-overflow {
        transition: .3s all ease;
        opacity: 1;
      }

      input {
        display: none;
      }
    }

    .file-name {
      text-align: center;
      font-family: Helvetica;
      font-size: 12px;
      margin-top: 10px;
      width: 80px;
      display: inline-block;
      word-wrap: break-word;
      border: none;
      line-height: 16px;
    }
  }

  :global {
    .can-click {
      cursor: pointer;
    }
  }
</style>
