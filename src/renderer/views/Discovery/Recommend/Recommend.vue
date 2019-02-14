<template>
  <div class="recommend">
    <!-- banner -->
    <div class="recommend__hero">
      <carousel
        class="recommend__banner"
        type="card"
        indicator-position="top"
        indicator-type="dot"
        from="netease"
        height="220px"
        :autoplay="false"
        mask
      >
        <carousel-item class="recommend__banner-item" v-for="item in banners">
          <div class="recommend__banner-details">
            <img :src="item.imageUrl">
            <span class="recommend__banner-flag">{{item.typeTitle}}</span>
          </div>
        </carousel-item>
      </carousel>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommend__song">
      <h3 class="recommend__title">
        <span>推荐歌单</span>
        <i class="iconfont icon-right"></i>
      </h3>
      <ul class="recommend__song-list">
        <li class="recommend__song-item" v-for="song in songList.slice(0, 10)">
          <div class="recommend__song-cover">
            <span class="recommend__song-view-counts">
              <i class="iconfont icon-bofangsanjiaoxing"></i>
              {{Math.floor(song.playCount / 10000)}}万
            </span>
            <span class="recommend__song-play-btn">
              <i class="iconfont icon-bofang"></i>
            </span>
            <img :src="song.picUrl">
          </div>
          <p class="recommend__song-title">{{song.name}}</p>
        </li>
      </ul>
    </div>
    <!-- 独家放送 -->
    <div class="recommend__unique">
      <h3 class="recommend__title">
        <span>独家放送</span>
        <i class="iconfont icon-right"></i>
      </h3>
      <ul class="recommend__unique-list">
        <li class="recommend__unique-item"></li>
      </ul>
    </div>
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
import { Carousel, CarouselItem } from '@/components';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Recommend',

  components: {
    Carousel,
    CarouselItem
  },

  data() {
    return {};
  },

  computed: {
    ...mapState('Discovery', ['banners', 'songList'])
  },

  methods: {
    ...mapActions('Discovery', [
      'getRecommendSongList',
      'getBanners'
    ])
  },

  async created() {
    await this.getBanners();
    await this.getRecommendSongList();
  }
};
</script>

<style lang="scss">
@include b(recommend) {
  width: 742px;
  margin: 0 auto;

  @include e(hero) {
    width: 100%;
  }

  @include e(title) {
    display: inline-block;
    padding: 24px 0 16px;
    font-size: 16px;
    cursor: pointer;

    span {
      font-weight: bold;
    }

    &:hover {
      color: $--color-text-hover;
    }
  }

  @include e(banner) {
    .carousel__mask {
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 1;
    }

    .carousel__item--card {
      &.is-in-stage {
        &:hover .carousel__mask,
        &.is-hover .carousel__mask {
          opacity: 1;
        }
      }
    }

    .carousel__arrow {
      color: #717171;
      margin-top: 11px;
      background-color: transparent;

      &:hover {
        background-color: transparent;
      }

      .icon-right,
      .icon-left {
        font-size: 24px;
      }
    }
  }

  @include e(banner-item) {
    width: 600px;
    height: 220px;
    margin-top: 11px;
    transition: all 0.6s;
    border-radius: 10px;

    @include is(active) {
      margin-top: 0px;
    }
  }

  @include e(banner-details) {
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }

  @include e(banner-flag) {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 6px 12px;
    color: white;
    background: $--color-text-active;
    border-top-left-radius: 6px;
    border-bottom-right-radius: 5px;
  }

  @include e(song) {
    //body
  }

  @include e(song-list) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  @include e(song-item) {
    flex: 0 0 136px;
    margin-bottom: 36px;
    cursor: pointer;
  }

  @include e(song-play-btn) {
    display: none;
    position: absolute;
    right: 8px;
    bottom: 10px;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    transition: all 0.3s;

    i {
      color: $--color-text-active;
      opacity: 1;
    }
  }

  @include e(song-cover) {
    position: relative;

    img {
      width: 100%;
      border-radius: 6px;
    }

    &:hover {
      .recommend__song-play-btn {
        display: block;
      }
    }
  }

  @include e(song-view-counts) {
    position: absolute;
    top: 6px;
    right: 8px;
    color: white;

    i {
      font-size: 12px;
    }
  }

  @include e(song-title) {
    height: 40px;
    padding: 4px 0;
    font-size: 13px;
    line-height: 16px;

    &:hover {
      color: $--color-text-hover;
    }
  }
}
</style>