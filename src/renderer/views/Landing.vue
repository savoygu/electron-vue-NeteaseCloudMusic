<template>
  <div class="landing">
    <div class="landing__container">
      <sidebar/>
      <div class="landing__content">
        <div class="landing__toolsbar">
          <toolsbar/>
        </div>
        <router-view></router-view>
      </div>
    </div>
    <player/>
  </div>
</template>

<script>
import { Sidebar, Player, Toolsbar } from '@/components';

export default {
  name: 'Landing',

  components: { Sidebar, Player, Toolsbar }
};
</script>

<style lang="scss">
@include b(landing) {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  @include e(container) {
    display: flex;
  }

  @include e(content) {
    flex: 0 0 800px;
  }

  @include e(toolsbar) {
    position: absolute;
    right: 0;
  }

  @include e(body) {
    width: 100%;
    height: 544px;
    overflow-y: auto;
  }
}
</style>