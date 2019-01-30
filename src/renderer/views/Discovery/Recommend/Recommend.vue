<template>
  <div class="recommend">
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
            <img :src="item.imageUrl" alt>
            <span class="recommend__banner-flag">{{item.typeTitle}}</span>
          </div>
        </carousel-item>
      </carousel>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommend__song">
      <h3 class="recommend__title">
        <span>推荐歌单</span>
        <i></i>
      </h3>
    </div>
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
  width: 100%;

  @include e(hero) {
    width: 742px;
    margin: 0 auto;
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
}
</style>