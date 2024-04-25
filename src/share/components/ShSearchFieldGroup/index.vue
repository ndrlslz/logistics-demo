<template>
  <div class="search-field-group">
    <h3 class="search-field-group__title"><span>{{ title }}</span></h3>
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'ShSearchFieldGroup',
    props: ['title'],
  }
</script>

<style lang="scss">
  @import 'src/share/styles/variable';
  @import 'src/share/styles/mixin';

  .search-field-group {
    &:first-child {
      .search-field-group__title {
        margin-top: 0;
      }
    }

    &__title {
      @include text-title;
      display: flex;
      align-items: center;
      margin: $quad-gap 0 -6px;
      line-height: normal;

      &::before {
        content: ' ';
        display: block;
        width: 4px;
        height: $base-font-size;
        margin-right: 10px;
        background-color: #FFD500;
      }
    }

    .search-field {
      margin: 24px 24px 0 0;
    }
  }
</style>
