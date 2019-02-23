<template>
  <button
    class="button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'button--' + type : '',
      buttonSize ? 'button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: 'Button',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    buttonDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
};
</script>
<style lang="scss">
$--font-weight-primary: 500 !default;
$--border-radius-base: 4px !default;
$--color-text-regular: #606266 !default;
$--color-text-placeholder: #c0c4cc !default;
$--color-white: #fff !default;
$--color-black: #000 !default;
$--border-color-base: #dcdfe6 !default;
$--border-color-lighter: #ebeef5 !default;
$--color-primary: #409eff !default;
$--color-success: #67c23a !default;
$--color-warning: #e6a23c !default;
$--color-danger: #f56c6c !default;
$--color-info: #909399 !default;
$--border-width-base: 1px !default;
$--border-style-base: solid !default;
$--border-color-base: #dcdfe6 !default;
$--border-base: $--border-width-base $--border-style-base $--border-color-base !default;
$--color-primary-light-7: mix(
  $--color-white,
  $--color-primary,
  70%
) !default; /* c6e2ff */
$--color-primary-light-9: mix(
  $--color-white,
  $--color-primary,
  90%
) !default; /* ecf5ff */

$--button-font-size: 14px !default;
$--button-font-weight: $--font-weight-primary !default;
$--button-border-radius: $--border-radius-base !default;
$--button-padding-vertical: 12px !default;
$--button-padding-horizontal: 20px !default;

$--button-medium-font-size: 14px !default;
$--button-medium-border-radius: $--border-radius-base !default;
$--button-medium-padding-vertical: 10px !default;
$--button-medium-padding-horizontal: 20px !default;

$--button-small-font-size: 12px !default;
$--button-small-border-radius: #{$--border-radius-base - 1} !default;
$--button-small-padding-vertical: 9px !default;
$--button-small-padding-horizontal: 15px !default;

$--button-mini-font-size: 12px !default;
$--button-mini-border-radius: #{$--border-radius-base - 1} !default;
$--button-mini-padding-vertical: 7px !default;
$--button-mini-padding-horizontal: 15px !default;

$--button-default-color: $--color-text-regular !default;
$--button-default-fill: $--color-white !default;
$--button-default-border: $--border-color-base !default;

$--button-disabled-color: $--color-text-placeholder !default;
$--button-disabled-fill: $--color-white !default;
$--button-disabled-border: $--border-color-lighter !default;

$--button-primary-border: $--color-primary !default;
$--button-primary-color: $--color-white !default;
$--button-primary-fill: $--color-primary !default;

$--button-success-border: $--color-success !default;
$--button-success-color: $--color-white !default;
$--button-success-fill: $--color-success !default;

$--button-warning-border: $--color-warning !default;
$--button-warning-color: $--color-white !default;
$--button-warning-fill: $--color-warning !default;

$--button-danger-border: $--color-danger !default;
$--button-danger-color: $--color-white !default;
$--button-danger-fill: $--color-danger !default;

$--button-info-border: $--color-info !default;
$--button-info-color: $--color-white !default;
$--button-info-fill: $--color-info !default;

$--button-hover-tint-percent: 20% !default;
$--button-active-shade-percent: 10% !default;

@mixin utils-user-select($value) {
  -moz-user-select: $value;
  -webkit-user-select: $value;
  -ms-user-select: $value;
}

@import "button";

@include b(button) {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: $--button-default-fill;
  border: $--border-base;
  border-color: $--button-default-border;
  color: $--button-default-color;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: $--button-font-weight;
  @include utils-user-select(none);
  & + & {
    margin-left: 10px;
  }

  @include button-size(
    $--button-padding-vertical,
    $--button-padding-horizontal,
    $--button-font-size,
    $--button-border-radius
  );

  &:hover,
  &:focus {
    color: $--color-primary;
    border-color: $--color-primary-light-7;
    background-color: $--color-primary-light-9;
  }

  &:active {
    color: mix(
      $--color-black,
      $--color-primary,
      $--button-active-shade-percent
    );
    border-color: mix(
      $--color-black,
      $--color-primary,
      $--button-active-shade-percent
    );
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }

  & [class*="el-icon-"] {
    & + span {
      margin-left: 5px;
    }
  }

  @include is(plain) {
    &:hover,
    &:focus {
      background: $--color-white;
      border-color: $--color-primary;
      color: $--color-primary;
    }

    &:active {
      background: $--color-white;
      border-color: mix(
        $--color-black,
        $--color-primary,
        $--button-active-shade-percent
      );
      color: mix(
        $--color-black,
        $--color-primary,
        $--button-active-shade-percent
      );
      outline: none;
    }
  }

  @include is(active) {
    color: mix(
      $--color-black,
      $--color-primary,
      $--button-active-shade-percent
    );
    border-color: mix(
      $--color-black,
      $--color-primary,
      $--button-active-shade-percent
    );
  }

  @include is(disabled) {
    &,
    &:hover,
    &:focus {
      color: $--button-disabled-color;
      cursor: not-allowed;
      background-image: none;
      background-color: $--button-disabled-fill;
      border-color: $--button-disabled-border;
    }

    &.el-button--text {
      background-color: transparent;
    }

    &.is-plain {
      &,
      &:hover,
      &:focus {
        background-color: $--color-white;
        border-color: $--button-disabled-border;
        color: $--button-disabled-color;
      }
    }
  }

  @include is(loading) {
    position: relative;
    pointer-events: none;

    &:before {
      pointer-events: none;
      content: "";
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: inherit;
      background-color: rgba(255, 255, 255, 0.35);
    }
  }
  @include is(round) {
    border-radius: 20px;
    padding: 12px 23px;
  }
  @include is(circle) {
    border-radius: 50%;
    padding: $--button-padding-vertical;
  }
  @include m(primary) {
    @include button-variant(
      $--button-primary-color,
      $--button-primary-fill,
      $--button-primary-border
    );
  }
  @include m(success) {
    @include button-variant(
      $--button-success-color,
      $--button-success-fill,
      $--button-success-border
    );
  }
  @include m(warning) {
    @include button-variant(
      $--button-warning-color,
      $--button-warning-fill,
      $--button-warning-border
    );
  }
  @include m(danger) {
    @include button-variant(
      $--button-danger-color,
      $--button-danger-fill,
      $--button-danger-border
    );
  }
  @include m(info) {
    @include button-variant(
      $--button-info-color,
      $--button-info-fill,
      $--button-info-border
    );
  }
  @include m(medium) {
    @include button-size(
      $--button-medium-padding-vertical,
      $--button-medium-padding-horizontal,
      $--button-medium-font-size,
      $--button-medium-border-radius
    );
    @include is(circle) {
      padding: $--button-medium-padding-vertical;
    }
  }
  @include m(small) {
    @include button-size(
      $--button-small-padding-vertical,
      $--button-small-padding-horizontal,
      $--button-small-font-size,
      $--button-small-border-radius
    );
    @include is(circle) {
      padding: $--button-small-padding-vertical;
    }
  }
  @include m(mini) {
    @include button-size(
      $--button-mini-padding-vertical,
      $--button-mini-padding-horizontal,
      $--button-mini-font-size,
      $--button-mini-border-radius
    );
    @include is(circle) {
      padding: $--button-mini-padding-vertical;
    }
  }
  @include m(text) {
    border-color: transparent;
    color: $--color-primary;
    background: transparent;
    padding-left: 0;
    padding-right: 0;

    &:hover,
    &:focus {
      color: mix(
        $--color-white,
        $--color-primary,
        $--button-hover-tint-percent
      );
      border-color: transparent;
      background-color: transparent;
    }
    &:active {
      color: mix(
        $--color-black,
        $--color-primary,
        $--button-active-shade-percent
      );
      border-color: transparent;
      background-color: transparent;
    }

    &.is-disabled,
    &.is-disabled:hover,
    &.is-disabled:focus {
      border-color: transparent;
    }
  }
}
</style>
