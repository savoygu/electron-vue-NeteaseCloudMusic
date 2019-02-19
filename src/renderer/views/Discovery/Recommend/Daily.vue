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
      >
        <template slot="id-slot" slot-scope="props">
          <div
            class="vuetable-td-slot-id"
            :class="{ 'is-playing': props.rowData.id === currentSong.id }"
          >
            <span class="id">{{props.rowData.id}}</span>
            <i class="iconfont icon-sound"></i>
          </div>
        </template>
        <template slot="name-slot" slot-scope="props">
          <div
            class="vuetable-td-slot-name"
            :class="{ 'is-playing': props.rowData.id === currentSong.id }"
            @click.right="handleMore(props)"
          >
            <span class="name">{{props.rowData.name}}</span>
            <i class="iconfont icon-more" @click="handleMore(props)"></i>
          </div>
        </template>
      </ve-table>
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