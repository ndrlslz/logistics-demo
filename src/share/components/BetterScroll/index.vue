<template>
  <div ref="scroll" class="better-scroll">
    <ul>
      <slot/>
      <li class="tips-wrapper">
        <span v-if="!isPullUpLoad && hasMore">上拉加载更多</span>
        <span v-else-if="!hasMore">已经到底啦～</span>
        <span v-else>加载中...</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'
  import ScrollBar from '@better-scroll/scroll-bar'
  import MouseWheel from '@better-scroll/mouse-wheel'

  BScroll.use(Pullup)
  BScroll.use(ScrollBar)
  BScroll.use(MouseWheel)

  export default {
    name: 'BetterScroll',
    props: {
      hasMore: {
        type: Boolean,
        default: false,
      },
      isPullUpLoad: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        bscroll: null,
      }
    },
    methods: {
      initScroll () {
        this.bscroll = new BScroll(this.$refs.scroll, {
          scrollY: true,
          disableMouse: false,
          scrollbar: true,
          click: true,
          pullUpLoad: true,
          mouseWheel: true,
        })
        this.bscroll.on('pullingUp', this.pullingUpHandler)
      },
      pullingUpHandler () {
        if (this.hasMore) {
          this.$emit('pullUp', null, () => {
            this.bscroll.finishPullUp()
            this.bscroll.refresh()
          })
        }
      },
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.scroll && this.initScroll()
      })
    },
  }
</script>

<style lang="scss" scoped>
@import "../../../share/styles/variable";

.better-scroll{
  position: relative;
  height: 100%;
  overflow: hidden;
  width: max-content;
}

.tips-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  color: $color-light-grey;
}
</style>
