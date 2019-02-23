<template>
  <li class="recommend__song-item">
    <div class="recommend__song-cover">
      <span class="recommend__song-view-counts">
        <i class="iconfont icon-play"></i>
        {{Math.floor(data.playCount / 10000)}}万
      </span>
      <span class="recommend__song-play-btn">
        <i class="iconfont icon-play-empty"></i>
      </span>
      <img :src="data.picUrl">
    </div>
    <p class="recommend__song-title">{{data.name}}</p>
  </li>
</template>

<script>
export default {
  name: 'RecommendSongItem',

  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>