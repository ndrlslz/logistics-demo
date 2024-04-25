<template>
  <div class="wrapper">
    <sh-button-group>
      <sh-button
        v-for="tab in tabs"
        :key="tab.title"
        :class="{'btn--active': activeRouterName === tab.routeName}"
        @click="goToPage(tab.routeName)"
      >
        {{ tab.title }}
      </sh-button>
    </sh-button-group>
  </div>
</template>

<script>
  import ShButton from '@/share/components/Button/ShButton'
  import ShButtonGroup from '@/share/components/Button/ShButtonGroup'
  import { isEmpty } from 'lodash-es'

  export default {
    name: 'ShTabBar',
    components: {
      ShButton,
      ShButtonGroup,
    },
    props: {
      tabs: {
        type: Array,
        default: () => [],
      },
      router: {
        type: Boolean,
        default: true,
      },
      activeRouter: String,
      query: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      activeRouterName () {
        if (!this.router) {
          return this.activeRouter
        }
        return this.$route.name
      },
    },
    methods: {
      goToPage (routeName) {
        if (this.router) {
          if (isEmpty(this.query)) {
            this.$router.push({ name: routeName })
          } else {
            this.$router.push({
              name: routeName,
              query: this.query,
            })
          }
        } else {
          this.$emit('tab-click', routeName)
        }
      },
    },
  }
</script>
