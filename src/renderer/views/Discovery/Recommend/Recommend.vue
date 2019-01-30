<template>
  <div class="recommend">
    <div class="recommend__hero">
      <h3 class="recommend__title">
        <span>推荐歌单</span>
        <i></i>
      </h3>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommend__song"></div>
    <!-- 独家放送 -->
    <div class="recommend__unique"></div>
    <!-- 最新音乐 -->
    <div class="recommend__latest"></div>
    <!-- 推荐MV -->
    <div class="recommend__mv"></div>
    <!-- 主播电台 -->
    <div class="recommend__radio"></div>
    <!-- LOOK直播 -->
    <div class="recommend__zhibo"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Recommend',
  data() {
    return {};
  },
  async created() {
    const data = await this['Discovery/getRecommendSongList'];
    console.log(data); //eslint-disable-line
  },
  methods: {
    ...mapActions(['someAsyncTask', 'Discovery/getRecommendSongList']),
  },
};
</script>

<style lang="scss">
@include b(recommend) {
  //body
}
</style>