import { action } from "easy-peasy";

export default {
  landingConfigPageInfo: {
    pageIndex: 1,
    pageSize: 10,
  }, // 咨询入口信息
  
  setLandingConfigPageInfo: action((state, payload) => {
    state.landingConfigPageInfo = payload;
  }),
};
