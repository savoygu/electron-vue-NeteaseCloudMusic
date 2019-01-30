<template>
  <div class="discovery">
    <div class="discovery__top">
      <ul class="discovery__nav">
        <router-link tag="li" class="discovery__nav-item" to="/recommend">个性推荐</router-link>
        <router-link tag="li" class="discovery__nav-item" to="/song">歌单</router-link>
        <router-link tag="li" class="discovery__nav-item" to="/radio">主播电台</router-link>
        <router-link tag="li" class="discovery__nav-item" to="/ranking">排行榜</router-link>
        <router-link tag="li" class="discovery__nav-item" to="/singer">歌手</router-link>
        <router-link tag="li" class="discovery__nav-item" to="/latest">最新音乐</router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Recommend from './Recommend/Recommend';

export default {
  name: 'Discovery',

  components: {
    Recommend
  },

  methods: {
    handleCount() {
      this.$store.dispatch('someAsyncTask');
    }
  },

  created() { }
};
</script>

<style lang="scss">
@include b(discovery) {
  flex: 0 0 800px;

  @include e(nav) {
    display: flex;
    align-items: center;
    height: 52px;
    margin-left: 15px;
    font-size: 14px;
    line-height: 52px;
    color: $--color-text-primary;
  }

  @include e(nav-item) {
    margin: 0 15px;
    border-bottom: 2px solid transparent;
    cursor: pointer;

    &:hover {
      font-weight: 500;
    }

    @include is(active) {
      font-weight: 500;
      border-bottom-color: $--color-text-active;
    }
  }
}
</style>