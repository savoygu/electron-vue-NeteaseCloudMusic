import { fetch } from '@/http';
import { padZero, toHHMMSS } from '@/utils/util';

const SET_STATE_DATA = 'SET_STATE_DATA';

const state = {
  banners: [],
  songList: [],
  dailies: []
};

const mutations = {
  [SET_STATE_DATA](state, { name, value }) {
    state[name] = value;
  }
};

const actions = {
  async getBanners({ commit }) {
    const data = await fetch('/banner');
    commit(SET_STATE_DATA, { name: 'banners', value: data.banners });
  },
  async getRecommendSongList({ commit }) {
    const data = await fetch('/personalized');
    commit(SET_STATE_DATA, { name: 'songList', value: data.result });
  },
  async getDailySongRecommendationList({ commit }) {
    const data = await fetch('/recommend/songs');
    const formatData = data.recommend.map((item, index) => ({
      id: padZero(index + 1),
      // starred: item.starred,
      starred: Math.random() < 0.5,
      downloaded: Math.random() < 0.5,
      name: item.name,
      singer: item.artists.map(v => v.name).join(' / '),
      album: item.album.name,
      duration: toHHMMSS(item.duration / 1000)
    }));
    commit(SET_STATE_DATA, { name: 'dailies', value: formatData });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
