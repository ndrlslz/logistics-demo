<template>
  <div>
    <div class="template-header" v-if="title">{{ title }}</div>
    <div class="images-container" v-if="!isEmptyImages">
      <div class="img-item" v-for="file in imgFiles" :key="file.id">
        <div
            class="img-content"
            :style="imageStyles(file)"
        >
          <a :href="file.image.imageUrl" download="download"></a>
        </div>
        <div class="img-tag">
          <div class="tag-content">{{ file.tag }}</div>
        </div>
      </div>
    </div>
    <div class="template-placeholder" v-else>
      <i class="icon-image_placeholder"></i>
      <span>暂未上传图片</span>
    </div>
  </div>
</template>

<script>
  import { isEmpty } from 'lodash-es'

  export default {
    name: 'ImageSection',
    props: {
      title: {
        type: String,
      },
      size: {
        type: Object,
        default: () => ({ height: 242, width: 242 }),
      },
      imgFiles: {
        type: Array,
      },
    },
    computed: {
      isEmptyImages () {
        return isEmpty(this.imgFiles)
      },
    },
    methods: {
      imageStyles (file) {
        const style = { backgroundImage: `url(${file.image.imageThumbnailUrl})`, backgroundSize: 'cover' }
        if (this.size.height && this.size.width) {
          style.width = `${this.size.width}px`
          style.height = `${this.size.height}px`
        }
        return style
      },
    },
  }
</script>

<style lang="scss" scoped>
@import "../../styles/variable";

.template-header {
  flex: 100%;
  font-size: 20/14 * 1rem;
  color: #222;
  margin-bottom: 20px;
}

.images-container {
  display: flex;
  flex-wrap: wrap;

  .img-item {
    position: relative;
    flex-shrink: 0;
    margin-right: 28px;

    .img-tag {
      text-align: center;
      margin-bottom: 24px;
      white-space: normal;
      max-width: 242px;
      word-break: break-all;

      .tag-content {
        display: inline-block;
        text-align: left;
      }
    }
  }

  .img-content {
    width: 242px;
    height: 242px;
    margin-bottom: 16px;
    border-radius: 2px;

    & > a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
}

.template-placeholder {
  border: 1px solid $color-line;
  display: flex;
  flex-direction: column;
  color: $color-tip;
  align-items: center;
  padding: 32px 0;
  font-size: 1rem;

  i {
    font-size: 30px;
    color: $color-line;
  }

  span {
    margin-top: 12px;
  }
}
</style>
