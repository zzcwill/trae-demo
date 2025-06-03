import { topicsApi } from '@/api/user';

const user = {
  state: {
    userInfo: {
      username: '',
      phone: '',
      token: ''
    }
  },

  mutations: {
    userInfo: (state, userData) => {
      state.userInfo = userData;
    }
  },

  actions: {
    //设置用户信息
    async actionByUserInfo({ commit }, data) {
      const paramData = {
        page: 1,
        tab: 'good',
        limit: 10
      };

      let resData = await topicsApi(paramData);
      resData = {
        username: 'zzc',
        phone: '18042434280',
        token: 'token'
      };
      console.info('userInfo', resData);
      commit('userInfo', resData);
      return resData;
    }
  }
};

export default user;
