import { fetch } from '@/http';

const state = {
  user: {}
};
const mutations = {};
const actions = {
  async signin() {
    await fetch('/login/cellphone?phone=17801050894&password=$Saifei94521wy$');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
