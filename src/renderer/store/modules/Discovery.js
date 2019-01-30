import { fetch } from '@/http';

const state = {
  main: 0,
};

const mutations = {
  DECREMENT_MAIN_COUNTER(state) {
    state.main -= 1;
  },
  INCREMENT_MAIN_COUNTER(state) {
    state.main += 1;
  },
};

const actions = {
  async getRecommendSongList({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER');
    const data = await fetch('/personalized');
    return data;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
