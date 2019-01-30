<template>
  <div class="sidebar">
    <div class="sidebar__user">
      <h1 class="sidebar__user-avatar">
        <img src="https://avatars2.githubusercontent.com/u/12810740?s=200&v=4" alt="savoygu">
      </h1>
      <div class="sidebar__user-name">
        <span>savoygu</span>
        <i>></i>
      </div>
    </div>
    <ul class="sidebar__nav">
      <router-link tag="li" class="sidebar__nav-item is-active" to="/">
        <i class="iconfont icon-wangyiyunyinle"></i>
        <span>发现音乐</span>
      </router-link>
      <router-link tag="li" class="sidebar__nav-item" to="/fm">
        <i class="iconfont icon-leida"></i>
        <span>私人FM</span>
      </router-link>
      <router-link tag="li" class="sidebar__nav-item" to="/video">
        <i class="iconfont icon-shipin"></i>
        <span>视频</span>
      </router-link>
      <router-link tag="li" class="sidebar__nav-item" to="/friends">
        <i class="iconfont icon-pengyou"></i>
        <span>朋友</span>
      </router-link>
    </ul>
    <div class="sidebar__my-music"></div>
    <div class="sidebar__song-list"></div>
  </div>
</template>

<script>
import { ipcRenderer as ipc } from 'electron';

export default {
  name: 'Sidebar',

  data() {
    return {
      ipc
    };
  },

  methods: {
    handleClose() {
      this.ipc.send('close');
    },

    handleMinimize() {
      this.ipc.send('min');
    },

    handleMaximize() {
      this.ipc.send('max');
    }
  }
};
</script>

<style lang="scss">
@include b(sidebar) {
  width: 200px;
  height: 100vh;
  color: $--color-text-primary;
  border-right: 1px solid #e5e5e5;

  @include e(user) {
    display: flex;
    align-items: center;
    padding: 54px 0 20px;
    font-size: 14px;
  }

  @include e(user-avatar) {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 10px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  @include e(nav) {
  }

  @include e(nav-item) {
    display: flex;
    align-items: center;
    height: 36px;
    line-height: 36px;
    padding-left: 18px;
    border-left: 3px solid transparent;
    cursor: pointer;

    i {
      width: 16px;
      margin-right: 5px;
    }

    &:hover {
      background-color: #f7f7f7;
    }

    @include is(active) {
      font-weight: 500;
      color: $--color-text-active;
      border-left-color: $--color-text-active;
      background-color: #f7f7f7;
    }
  }
}
</style>
