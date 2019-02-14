<template>
  <div class="landing">
    <div class="landing__content">
      <sidebar/>
      <router-view></router-view>
    </div>
    <player/>
  </div>
</template>

<script>
import { Sidebar, Player } from '@/components';

export default {
  name: 'landing',

  components: { Sidebar, Player }
};
</script>

<style lang="scss">
@include b(landing) {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  @include e(content) {
    display: flex;
  }
}
</style>