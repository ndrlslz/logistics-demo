<template>
  <div class="step-list">
    <div v-for="(step, index) in steps" :key="index" class="step-wrapper">
      <div class="step-chart">
        <div :class="['circle',{'active':isActive(index)}]"></div>
        <div class="line" v-if="!isEnd(index)"></div>
      </div>
      <div class="label" :style="step.labelColor">
        {{ step.label }}
      </div>
      <template v-if="hasDescriptions(step)">
        <div v-for="(description, idx) in step.descriptions" :key="idx" class="description">
          {{ description }}
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  import { isEmpty } from 'lodash-es'

  export default {
    props: {
      steps: {
        type: Array,
        default: () => ([]),
      },
      activeStepIndex: {
        type: Number,
        default: -1,
      },
    },
    methods: {
      isEnd (index) {
        return index === this.steps.length - 1
      },
      isActive (index) {
        return index === this.activeStepIndex
      },
      hasDescriptions (step) {
        return !isEmpty(step.descriptions)
      },
    },
  }
</script>
<style lang="scss" scoped>
@import '../../styles/variable';

.step-list {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  .step-wrapper {
    width: 200px;
    max-width: 20%;
    margin-top: 20px;

    .step-chart {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      .circle {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: $color-pale-grey;
      }

      .active {
        background-color: $color-shell-yellow;
      }

      .line {
        flex: 1;
        height: 2px;
        background-color: $color-pale-blue;
      }
    }

    .label {
      margin-right: 6px;
    }

    .description {
      width: 160px;
      margin-right: 6px;
      font-size: 12px;
      margin-top: 4px;
      color: $color-light-grey;
    }
  }
}
</style>
