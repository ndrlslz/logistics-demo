<template>
  <el-dialog
    class="handle-warning-dialog"
    title="处理告警"
    :visible="visible"
    :before-close="handleClose"
    center
    destroy-on-close
  >
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="添加日志：" prop="log">
        <el-input :rows="5" maxlength="140" type="textarea" v-model="form.log" placeholder="请填写处理信息（140字以内）" />
      </el-form-item>
      <el-form-item label="添加图片：" prop="images">
        <el-upload
          class="upload-image-wrapper"
          action=""
          accept=".jpg,.png,.jpeg"
          ref="upload"
          :file-list="form.images"
          :limit="LIMIT_NUMBER"
          :auto-upload="true"
          :show-file-list="true"
          :on-success="handleImageSuccess"
          :on-remove="handleImageRemove"
          :before-remove="handleBeforeRemove"
          :before-upload="handleBeforeUpload"
          :http-request="handleUpload"
          list-type="picture-card"
        >
          <div class="upload-image">
            <img class="file-type-icon" :src="require('@/share/assets/images/add.svg')" />
          </div>
        </el-upload>
      </el-form-item>
      <div class="image-tag-input-wrapper">
        <el-input
          class="image-tag-input"
          v-for="image in form.images"
          :key="image.name"
          v-model="image.tag"
          :autosize="{minRows: 2, maxRows: 6}"
          maxlength="50"
          type="textarea"
          placeholder="请输入图片描述50字以内"
        />
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <sh-button @click="handleClose">取 消</sh-button>
      <sh-button class="btn--fill" @click="handleSubmit" :disabled="disabled">确 定</sh-button>
    </span>
  </el-dialog>
</template>
<script>
  import ShButton from '@/share/components/Button/ShButton'
  import { Dialog, Form, FormItem, Input, Upload } from 'element-ui'
  import { mapActions } from 'vuex'
  import { set } from 'lodash-es'

  export default {
    name: 'HandleWarningDialog',
    components: {
      ShButton,
      [Dialog.name]: Dialog,
      [Form.name]: Form,
      [FormItem.name]: FormItem,
      [Input.name]: Input,
      [Upload.name]: Upload,
    },
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        LIMIT_NUMBER: 3,
        loading: false,
        form: {
          log: undefined,
          images: [],
        },
        rules: {
          log: [{ required: true, message: '请添加日志', trigger: 'blur' }],
        },
      }
    },
    computed: {
      disabled () {
        return this.loading || !this.form.log
      },
      canUploadImage () {
        return this.form.images.length < this.LIMIT_NUMBER
      },
    },
    watch: {
      canUploadImage (val) {
        const uploadEl = this.$refs.upload
        const uploadIconEl = uploadEl.$children[1]
        uploadIconEl.$el.style.display = val ? 'inline-block' : 'none'
      },
    },
    methods: {
      ...mapActions({
        showToast: 'ui/showToast',
      }),
      handleClose () {
        this.$emit('cancel')
      },
      handleBeforeUpload (file) {
        const isMaxSize = (file.size / 1024 / 1024) > 5 // 限制5m大小
        if (isMaxSize) {
          this.showToast({ text: '上传图片大小不能超过5MB!' })
        }
        return !isMaxSize
      },
      handleUpload (params) {
        this.$emit('handleUploadImage', params)
      },
      handleBeforeRemove (file) {
        return new Promise((resolve, reject) => {
          const payload = {
            imageName: file.name,
            onSuccess: resolve,
            onError: reject,
          }
          this.$emit('handleRemoveImage', payload)
        })
      },
      handleImageRemove (image) {
        this.form.images = this.form.images.filter((item) => item.name !== image.name)
      },
      handleImageSuccess (response, file, fileList) {
        fileList.forEach((item) => {
          if (item.uid === file.uid) {
            const imageName = response.imageUrl.split('/')
            set(item, 'url', response.imageThumbnailUrl)
            set(item, 'previewUrl', response.imageUrl)
            set(item, 'name', imageName[imageName.length - 1])
          }
        })
        this.form.images = fileList.map(({ name, url, previewUrl, tag, uid }) => ({ name, url, previewUrl, tag, uid }))
      },
      hideLoading () {
        this.loading = false
      },
      handleSubmit () {
        this.$refs.form.validate((validate) => {
          if (validate) {
            let { images } = this.form
            images = images.map((item) => {
              return {
                tag: item.tag,
                imageUrl: {
                  imageUrl: item.previewUrl,
                  imageThumbnailUrl: item.url,
                },
              }
            })
            this.loading = true
            this.$emit('submit', {
              data: {
                log: this.form.log,
                images,
              },
              onSuccess: this.handleClose,
              onFinally: this.hideLoading,
            })
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
@import "src/share/styles/variable";
@import "src/share/styles/mixin";

$image-width: 116px;
$image-height: 116px;
.handle-warning-dialog {
  display: inline-block;

  .upload-image-wrapper {
    height: $image-height + 4px;

    .upload-image {
      position: relative;
      width: $image-width;
      height: $image-height;
      margin-right: 24px;
      border-radius: 4px;
      box-shadow: 1px 2px 4px #999;
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all .5s ease;
    }

    .file-type-icon {
      width: auto;
      height: 36px;
      align-self: center;
    }
  }

  .image-tag-input-wrapper {
    display: flex;
    align-items: flex-start;
    margin-left: 100px;

    .image-tag-input {
      transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
      width: $image-width;
      margin-right: 8px;
    }
  }

  .dialog-footer {
    .btn {
      width: 160px;
    }
  }

  :global(.upload-image-wrapper .el-upload--picture-card) {
    border: none;
    width: $image-width;
    height: $image-height;
  }

  :global(.upload-image-wrapper .el-upload-list__item) {
    box-shadow: 1px 2px 4px #999;
    width: $image-width;
    height: $image-height;
  }

  :global(.upload-image-wrapper .el-upload-list__item-actions) {
    background-color: $color-shell-yellow;
  }

  :global(.upload-image-wrapper .el-upload-list--picture-card .el-progress) {
    width: $image-width - 10px;
    height: $image-height - 10px;
  }

  :global(.upload-image-wrapper .el-progress-circle) {
    width: $image-width - 10px !important;
    height: $image-height - 10px !important;
  }

  :global(.el-form-item:nth-child(2)) {
    margin-bottom: 2px;
  }
}
</style>
