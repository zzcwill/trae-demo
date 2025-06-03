// 首页模块配置位置map
export const siteMap = {
  left: {
    id: "0",
    name: "中间",
  }, // 左侧
  right: {
    id: "1",
    name: "右侧",
  },
};
export const siteList = Object.keys(siteMap).map((item) => {
  return siteMap[item];
});
// 字段改变map
export const valueChangeTypeMap = {
  site: {
    code: "location",
  }, // 展示位置
  orderNum: {
    code: "orderNum",
  }, // 展示顺序
  unCheckedImgUrl: {
    code: "uncheckedImageUrl",
  }, // 未选中状态的图片url
  checkedImgUrl: {
    code: "checkedImageUrl",
  }, // 选中状态的图片Url
  linkType: {
    code: "jumpType",
  }, // 跳转页面类型，0-不跳转;1-落地页;2-外部链接
  linkBusinessId: {
    code: "jumpBusinessId",
  }, // 业务Id，在跳转页面类型为1-落地页的时候传
  linkUrl: {
    code: "jumpUrl",
  }, // 外部链接，在跳转页面类型为2-外部链接的时候传
};
// 跳转页面类型
export const linkTypeMap = {
  noLink: {
    id: "0",
    name: "不跳转",
  },
  landingPageLink: {
    id: "1",
    name: "落地页",
  },
  otherLink: {
    id: "2",
    name: "外部链接",
  },
};

export const linkTypeList = Object.keys(linkTypeMap).map((item) => {
  return linkTypeMap[item];
});
