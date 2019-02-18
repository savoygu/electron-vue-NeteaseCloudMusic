<template>
  <div class="daily landing__body">
    <div class="daily__title">每日推荐歌曲</div>
    <div class="daily__btn-group"></div>
    <div class="daily__songs">
      <ve-table
        @vuetable:loading="showLoader"
        @vuetable:loaded="hideLoader"
        @vuetable:cell-rightclicked="handleCellRightClicked"
        @vuetable:cell-clicked="handleCellClicked"
        :fields="fields"
        :sort-order="sortOrder"
        :data-manager="dataManager"
      ></ve-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { VeTable } from '@/components';
import SongTable from '@/mixins/SongTable';

export default {
  name: 'Daily',

  components: { VeTable },

  mixins: [SongTable],

  data() {
    return {};
  },

  computed: {
    ...mapState('Discovery', {
      songs: 'dailies'
    })
  },

  methods: {
    ...mapActions('Discovery', [
      'getDailySongRecommendationList'
    ])
  },

  async created() {
    await this.getDailySongRecommendationList();
  }
};
</script>

<style lang="scss">
@include b(daily) {
  margin-top: 56px;

  @include e(songs) {
  }
}
</style>