const app = {
  state: {
    appInfo: {
      name: 'app'
    }
  },

  mutations: {
    appInfo: (state, appInfo) => {
      state.appInfo = appInfo;
    }
  },

  actions: {
    actionByAppInfo({ commit }, appInfo) {
      commit('appInfo', appInfo);
    }
  }
};

export default app;
