// 是否在筛选栏展示枚举
export const showFlagMap = {
  N: {
    id: "N",
    name: "否",
  },
  Y: {
    id: "Y",
    name: "是",
  },
};

export const isShowCategoryEnum = Object.keys(showFlagMap).map((key) => {
  return showFlagMap[key];
});
