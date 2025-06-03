const getters = {
  appInfo: (state) => state.app.appInfo,
  token: (state) => state.user.userInfo.token,
  isLogin: (state) => !!state.user.userInfo.token,
  userInfo: (state) => state.user.userInfo
};
export default getters;
