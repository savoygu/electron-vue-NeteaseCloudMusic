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
        <carousel-item class="recommend__banner-item" v-for="(item, index) in banners" :key="index">
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
        <i class="iconfont icon-arrow-right"></i>
      </h3>
      <ul class="recommend__song-list">
        <li class="recommend__song-item" @click="$router.push('/daily')">
          <div class="recommend__song-cover recommend__song-daily">
            <span class="recommend__song-daily-text">根据你的音乐口味生成每日更新</span>
            <img src="~@/assets/lover.jpg">
            <span class="recommend__song-daily-mask"></span>
            <div class="recommend__song-daily-calender">
              <i class="iconfont icon-date"></i>
              <span>{{new Date().getDate()}}</span>
            </div>
          </div>
          <p class="recommend__song-title">每日歌曲推荐</p>
        </li>
        <recommend-song-item :data="song" :key="song.id" v-for="song in songList.slice(0, 9)"></recommend-song-item>
      </ul>
    </div>
    <!-- 独家放送 -->
    <div class="recommend__unique">
      <h3 class="recommend__title">
        <span>独家放送</span>
        <i class="iconfont icon-arrow-right"></i>
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
import { mapActions, mapState } from 'vuex';
import { Carousel, CarouselItem } from '@/components';
import RecommendSongItem from './RecommendSongItem';

export default {
  name: 'Recommend',

  components: {
    Carousel,
    CarouselItem,
    RecommendSongItem
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

    &:hover {
      .recommend__song-daily-text {
        display: block;
      }
    }
  }

  @include e(song-daily-text) {
    display: none;
    position: absolute;
    height: 54px;
    padding: 8px;
    line-height: 18px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    z-index: 1;
    transition: all 0.6s;
  }

  @include e(song-daily-mask) {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 165, 0, 0.8);
    border-radius: 6px;
  }

  @include e(song-daily-calender) {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    i,
    span {
      color: white;
    }

    i {
      font-size: 80px;
    }

    span {
      position: absolute;
      margin-top: 6px;
      font-size: 24px;
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
    transition: all 0.6s;

    i {
      color: $--color-text-active;
      opacity: 1;
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