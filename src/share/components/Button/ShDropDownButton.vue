<template>
  <button
    :class="['btn', 'btn--weak', {active: active, 'has-checked': hasChecked}]"
  >
    <span class="slot">
    <slot></slot>
    </span>
    <span class="icon-triangle-down"></span>
  </button>
</template>

<script>

  export default {
    props: {
      active: Boolean,
      hasChecked: Boolean,
    },
  }
</script>

<style lang="scss" scoped>
  .slot:empty {
    display: none;
  }

  .icon-triangle-down {
    font-size: 1rem;
    margin-left: 4px;
    transition: transform 0.3s;
    transform: scale(0.5);
  }

  .active {
    .icon-triangle-down {
      transform: rotate(-180deg) scale(0.5);
    }
  }
</style>
