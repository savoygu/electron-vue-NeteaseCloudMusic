<template>
  <div class="toolsbar">
    <div class="toolsbar__nav">
      <span class="toolsbar__icon">
        <i class="iconfont icon-arrow-left"></i>
      </span>
      <span class="toolsbar__icon is-disabled">
        <i class="iconfont icon-arrow-right"></i>
      </span>
    </div>
    <div class="toolsbar__search">
      <i class="toolsbar__search-icon iconfont icon-search"></i>
      <input type="text">
      <i class="toolsbar__search-clear iconfont icon-chahao"></i>
    </div>
    <span class="toolsbar__icon">
      <i class="toolsbar__settings iconfont icon-unfold"></i>
    </span>
    <span class="toolsbar__icon">
      <i class="toolsbar__letter iconfont icon-envelope"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Toolsbar'
};
</script>

<style lang="scss">
@include b(toolsbar) {
  display: flex;
  width: 360px;
  height: 56px;
  justify-content: space-around;
  align-items: center;
  padding: 0 24px;

  @include e(icon) {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;

    @include is(disabled) {
      color: $--color-text-forth;

      &:hover {
        background-color: white;
      }
    }

    &:hover {
      border-radius: 50%;
      background-color: $--color-text-fifth;
    }
  }

  @include e(nav) {
    display: flex;
  }

  @include e(search) {
    position: relative;
    display: flex;
    align-items: center;

    input {
      width: 150px;
      height: 24px;
      padding: 3px 24px;
      outline: none;
      border: none;
      background-color: $--color-text-fifth;
      border-radius: 12px;
    }

    i {
      position: absolute;
    }
  }

  @include e(search-icon) {
    left: 4px;
  }

  @include e(search-clear) {
    display: none;
    font-size: 12px;
    right: 4px;
  }
}
</style>