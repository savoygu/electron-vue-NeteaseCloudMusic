<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'electron-vue-neteasecloudmusic',

  methods: {
    ...mapActions('User', [
      'signin'
    ])
  },

  async created() {
    await this.signin();
  }
};
</script>

<style lang="scss">
/* CSS */
</style>
