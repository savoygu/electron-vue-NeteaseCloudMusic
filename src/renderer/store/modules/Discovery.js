import { fetch } from '@/http';

const SET_STATE_DATA = 'SET_STATE_DATA';

const state = {
  banners: [],
  songList: []
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
    commit(SET_STATE_DATA, { name: 'songList', value: data });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
