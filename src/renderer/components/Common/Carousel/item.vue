<template>
  <div
    ref="carouselItem"
    v-show="ready"
    class="carousel__item"
    :class="{
      'is-active': active,
      'carousel__item--card': $parent.type === 'card',
      'is-in-stage': inStage,
      'is-hover': hover,
      'is-animating': animating
    }"
    @click="handleItemClick"
    :style="{
      msTransform: `translateX(${ translate }px) scale(${ scale })`,
      webkitTransform: `translateX(${ translate }px) scale(${ scale })`,
      transform: `translateX(${ translate }px) scale(${ scale })`
    }"
  >
    <div v-if="$parent.type === 'card'" v-show="!active" class="carousel__mask"></div>
    <slot></slot>
  </div>
</template>

<script>
const CARD_SCALE = 0.83;
const NETEASE_CARD_SCALE = 0.9;

export default {
  name: 'CarouselItem',

  props: {
    name: String,
    label: {
      type: [String, Number],
      default: ''
    }
  },

  data() {
    return {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    };
  },

  created() {
    this.$parent && this.$parent.updateItems();
  },

  methods: {
    processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    },

    calculateTranslate(index, activeIndex, parentWidth) {
      const scale = this.$parent.from === 'netease' ? NETEASE_CARD_SCALE : CARD_SCALE;
      const itemWidth = this.$refs.carouselItem.offsetWidth;
      const sideWidth = (parentWidth - itemWidth) / 2;
      const halfItemWidth = itemWidth / 2;

      if (this.inStage) {
        // return ((2 - CARD_SCALE) * (index - activeIndex) + 1) * parentWidth / 4;
        return (index - activeIndex + 1) * sideWidth +
          halfItemWidth * (1 - scale) * (index - activeIndex);
      } else if (index < activeIndex) {
        // return -(1 + CARD_SCALE) * parentWidth / 4;
        return -(1 + scale) * halfItemWidth;
      }
      // return (3 + CARD_SCALE) * parentWidth / 4;
      return (1 + scale) * halfItemWidth + 2 * sideWidth;
    },

    translateItem(index, activeIndex, oldIndex) {
      const scale = this.$parent.from === 'netease' ? NETEASE_CARD_SCALE : CARD_SCALE;
      const parentWidth = this.$parent.$el.offsetWidth;
      const length = this.$parent.items.length;
      if (this.$parent.type !== 'card' && oldIndex !== undefined) {
        this.animating = index === activeIndex || index === oldIndex;
      }
      if (index !== activeIndex && length > 2 && this.$parent.loop) {
        index = this.processIndex(index, activeIndex, length);
      }
      if (this.$parent.type === 'card') {
        this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
        this.active = index === activeIndex;
        this.translate = this.calculateTranslate(index, activeIndex, parentWidth);
        this.scale = this.active ? 1 : scale;
      } else {
        this.active = index === activeIndex;
        this.translate = parentWidth * (index - activeIndex);
      }
      this.ready = true;
    },

    handleItemClick() {
      const parent = this.$parent;
      if (parent && parent.type === 'card') {
        const index = parent.items.indexOf(this);
        parent.setActiveItem(index);
      }
    }
  },

  destroyed() {
    this.$parent && this.$parent.updateItems();
  }
};
</script>

<style lang="scss">
$--index-normal: 1 !default;
$--color-white: #fff !default;

@include b(carousel) {
  @include e(item) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    z-index: #{$--index-normal - 1};

    @include is(active) {
      z-index: #{$--index-normal + 1};
    }

    @include is(animating) {
      transition: transform 0.4s ease-in-out;
    }

    @include m(card) {
      width: 50%;
      transition: transform 0.4s ease-in-out;
      &.is-in-stage {
        cursor: pointer;
        z-index: $--index-normal;
        &:hover .carousel__mask,
        &.is-hover .carousel__mask {
          opacity: 0.12;
        }
      }
      &.is-active {
        z-index: #{$--index-normal + 1};
      }
    }
  }

  @include e(mask) {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: $--color-white;
    opacity: 0.24;
    transition: 0.2s;
  }
}
</style>
