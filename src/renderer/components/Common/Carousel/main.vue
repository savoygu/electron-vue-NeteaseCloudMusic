<template>
  <div
    class="carousel"
    :class="{ 'carousel--card': type === 'card' }"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <div class="carousel__container" :style="{ height: height }">
      <transition name="carousel-arrow-left">
        <button
          type="button"
          v-if="arrow !== 'never'"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)"
          class="carousel__arrow carousel__arrow--left"
        >
          <i class="el-icon-arrow-left"></i>
        </button>
      </transition>
      <transition name="carousel-arrow-right">
        <button
          type="button"
          v-if="arrow !== 'never'"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)"
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex + 1)"
          class="carousel__arrow carousel__arrow--right"
        >
          <i class="el-icon-arrow-right"></i>
        </button>
      </transition>
      <slot></slot>
    </div>
    <ul
      class="carousel__indicators"
      v-if="indicatorPosition !== 'none'"
      :class="{ 'carousel__indicators--labels': hasLabel, 'carousel__indicators--outside': indicatorPosition === 'outside' || type === 'card' }"
    >
      <li
        v-for="(item, index) in items"
        class="carousel__indicator"
        :class="{ 'is-active': index === activeIndex }"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)"
      >
        <button class="carousel__button">
          <span v-if="hasLabel">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce';
import { addResizeListener, removeResizeListener } from '@/utils/resize-event';

export default {
  name: 'Carousel',

  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: String,
    trigger: {
      type: String,
      default: 'hover'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    indicatorPosition: String,
    indicator: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: 'hover'
    },
    type: String,
    loop: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    };
  },

  computed: {
    hasLabel() {
      return this.items.some(item => item.label.toString().length > 0);
    }
  },

  watch: {
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },

    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      this.$emit('change', val, oldVal);
    },

    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    },

    loop() {
      this.setActiveItem(this.activeIndex);
    }
  },

  methods: {
    handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },

    handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    },

    itemInStage(item, index) {
      const length = this.items.length;
      if (index === length - 1 && item.inStage && this.items[0].active ||
        (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
        return 'left';
      } else if (index === 0 && item.inStage && this.items[length - 1].active ||
        (item.inStage && this.items[index - 1] && this.items[index - 1].active)) {
        return 'right';
      }
      return false;
    },

    handleButtonEnter(arrow) {
      this.items.forEach((item, index) => {
        if (arrow === this.itemInStage(item, index)) {
          item.hover = true;
        }
      });
    },

    handleButtonLeave() {
      this.items.forEach((item) => {
        item.hover = false;
      });
    },

    updateItems() {
      this.items = this.$children.filter(child => child.$options.name === 'CarouselItem');
    },

    resetItemPosition(oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex);
      });
    },

    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },

    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },

    setActiveItem(index) {
      if (typeof index === 'string') {
        const filteredItems = this.items.filter(item => item.name === index);
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        process.env.NODE_ENV !== 'production' &&
          console.warn('[Element Warn][Carousel]index must be an integer.'); // eslint-disable-line
        return;
      }
      const length = this.items.length;
      const oldIndex = this.activeIndex;
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex);
      }
    },

    prev() {
      this.setActiveItem(this.activeIndex - 1);
    },

    next() {
      this.setActiveItem(this.activeIndex + 1);
    },

    handleIndicatorClick(index) {
      this.activeIndex = index;
    },

    handleIndicatorHover(index) {
      if (this.trigger === 'hover' && index !== this.activeIndex) {
        this.activeIndex = index;
      }
    }
  },

  created() {
    this.throttledArrowClick = throttle(300, true, (index) => {
      this.setActiveItem(index);
    });
    this.throttledIndicatorHover = throttle(300, (index) => {
      this.handleIndicatorHover(index);
    });
  },

  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      addResizeListener(this.$el, this.resetItemPosition);
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex;
      }
      this.startTimer();
    });
  },

  beforeDestroy() {
    if (this.$el) removeResizeListener(this.$el, this.resetItemPosition);
    this.pauseTimer();
  }
};
</script>

<style lang="scss">
$--index-normal: 1 !default;
$--color-white: #fff !default;

$--carousel-arrow-font-size: 12px !default;
$--carousel-arrow-size: 36px !default;
$--carousel-arrow-background: rgba(31, 45, 61, 0.11) !default;
$--carousel-arrow-hover-background: rgba(31, 45, 61, 0.23) !default;
$--carousel-indicator-width: 30px !default;
$--carousel-indicator-height: 2px !default;
$--carousel-indicator-padding-horizontal: 4px !default;
$--carousel-indicator-padding-vertical: 12px !default;
$--carousel-indicator-out-color: #c0c4cc !default;

@include b(carousel) {
  overflow-x: hidden;
  position: relative;

  @include e(container) {
    position: relative;
    height: 300px;
  }

  @include e(arrow) {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    height: $--carousel-arrow-size;
    width: $--carousel-arrow-size;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 50%;
    background-color: $--carousel-arrow-background;
    color: $--color-white;
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    text-align: center;
    font-size: $--carousel-arrow-font-size;

    @include m(left) {
      left: 16px;
    }

    @include m(right) {
      right: 16px;
    }

    &:hover {
      background-color: $--carousel-arrow-hover-background;
    }

    & i {
      cursor: pointer;
    }
  }

  @include e(indicators) {
    position: absolute;
    list-style: none;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    padding: 0;
    z-index: #{$--index-normal + 1};

    @include m(outside) {
      bottom: #{$--carousel-indicator-height +
        $--carousel-indicator-padding-vertical * 2};
      text-align: center;
      position: static;
      transform: none;
      .carousel__indicator:hover button {
        opacity: 0.64;
      }
      button {
        background-color: $--carousel-indicator-out-color;
        opacity: 0.24;
      }
    }

    @include m(labels) {
      left: 0;
      right: 0;
      transform: none;
      text-align: center;

      .carousel__button {
        height: auto;
        width: auto;
        padding: 2px 18px;
        font-size: 12px;
      }

      .carousel__indicator {
        padding: 6px 4px;
      }
    }
  }

  @include e(indicator) {
    display: inline-block;
    background-color: transparent;
    padding: $--carousel-indicator-padding-vertical
      $--carousel-indicator-padding-horizontal;
    cursor: pointer;

    &:hover button {
      opacity: 0.72;
    }

    @include is(active) {
      button {
        opacity: 1;
      }
    }
  }

  @include e(button) {
    display: block;
    opacity: 0.48;
    width: $--carousel-indicator-width;
    height: $--carousel-indicator-height;
    background-color: $--color-white;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: 0.3s;
  }
}

.carousel-arrow-left-enter,
.carousel-arrow-left-leave-active {
  transform: translateY(-50%) translateX(-10px);
  opacity: 0;
}

.carousel-arrow-right-enter,
.carousel-arrow-right-leave-active {
  transform: translateY(-50%) translateX(10px);
  opacity: 0;
}
</style>
