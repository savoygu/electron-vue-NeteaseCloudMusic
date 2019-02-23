<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ButtonGroup'
};
</script>
<style lang="scss">
$--color-white: #fff !default;
$--border-radius-base: 4px !default;
$--button-border-radius: $--border-radius-base !default;

@mixin utils-clearfix {
  $selector: &;

  @at-root {
    #{$selector}::before,
    #{$selector}::after {
      display: table;
      content: "";
    }
    #{$selector}::after {
      clear: both;
    }
  }
}

@include b(button-group) {
  @include utils-clearfix;
  display: inline-block;
  vertical-align: middle;

  & > .button {
    float: left;
    position: relative;
    & + .button {
      margin-left: 0;
    }
    &.is-disabled {
      z-index: 1;
    }
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:first-child:last-child {
      border-top-right-radius: $--button-border-radius;
      border-bottom-right-radius: $--button-border-radius;
      border-top-left-radius: $--button-border-radius;
      border-bottom-left-radius: $--button-border-radius;

      &.is-round {
        border-radius: 20px;
      }

      &.is-circle {
        border-radius: 50%;
      }
    }
    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    &:not(:last-child) {
      margin-right: -1px;
    }

    &:hover,
    &:focus,
    &:active {
      z-index: 1;
    }

    @include is(active) {
      z-index: 1;
    }
  }

  & > .dropdown {
    & > .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left-color: rgba($--color-white, 0.5);
    }
  }

  @each $type in (primary, success, warning, danger, info) {
    .button--#{$type} {
      &:first-child {
        border-right-color: rgba($--color-white, 0.5);
      }
      &:last-child {
        border-left-color: rgba($--color-white, 0.5);
      }
      &:not(:first-child):not(:last-child) {
        border-left-color: rgba($--color-white, 0.5);
        border-right-color: rgba($--color-white, 0.5);
      }
    }
  }
}
</style>
