<template>
  <div class="rating">
    <ul>
      <li class="rating-item" v-for="(star, index) in result" :key="index" @click="choose(index)">
        <i :class="star ? `icon-star-highlight fill` : `icon-star-normal`"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  import { times, stubFalse, stubTrue } from 'lodash-es'

  export default {
    name: 'Rating',
    model: {
      prop: 'rating',
      event: 'change',
    },
    props: {
      rating: {
        type: Number,
        default: 0,
      },
    },
    data () {
      return {
        baseData: times(5, stubTrue).concat(times(5, stubFalse)),
      }
    },
    computed: {
      result () {
        return this.baseData.slice(5 - this.rating, 10 - this.rating)
      },
    },
    methods: {
      choose (index) {
        this.$emit('change', index + 1)
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variable";

  .rating {
    ul {
      padding: 0;
    }

    ul li {
      display: inline-block;
      color: #d8d8d8;
      font-size: 16/14 * 1rem;

      &:not(:last-of-type) {
        margin-right: 18px;
      }

      .fill {
        color: $color-dark-yellow;
      }

    }
  }
</style>
