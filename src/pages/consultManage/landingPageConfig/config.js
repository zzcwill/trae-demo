// 卡片位置map
export const extraSiteTypeMap = {
  center: "center",
  right: "right",
};

export const editTypeEnum = {
  edit: "edit",
  add: "add",
};

export const officialType = {
  basic: "1", // 基础财税咨询
  tax: "0", // 办税咨询
  basicPage: "1", // 基础财税分类页
  taxPage: "2", // 办税分类页
};

export const errorType = {
  banner: "banner图不能为空！",
  expertClassifyNull: "专家财税咨询分类页筛选栏不能为空!",
  expertClassifyTypeNull: "筛选栏的分类类型不能为空！",
  expertClassifyLocationNull: "筛选栏的筛选栏位置不能为空！",
  expertClassifyNameNull: "筛选栏的筛选栏名称不能为空！",
  expertClassifyIdListNull: "筛选栏的展示内容不能为空！",
  exportClassifyDouble: "筛选栏展示内容重复，请确认无误后再发布！",
  exportClassifyLocationDouble: "筛选栏位置重复，请确认无误后再发布",
  exportServiceTypeDouble: "专家服务分类重复，请确认无误后再发布！",
  officialServiceNull: "官方服务列表不能为空",
  nameDouble: "服务重复添加,请确认无误后才发布！",

};
export const valueChangeTypeEnum = {
  banner: "banner", // 轮播图
  expertClassify: "expertClassify", // 专家分类
  expertService: "expertService", // 专家服务范围
  officialServiceClassify: "officialServiceClassify", // 官方服务分类
  officialServiceClassifyDelete: "officialServiceClassifyDelete", // 官方服务分类删除
  classifyInfoList: "classifyInfoList", // 分类列表
  classifyInfoListDelete: "classifyInfoListDelete", // 分类列表
  homePageModule: "homeModuleInfoList", // 首页配置模块
  homePageModuleDelete: "homeModuleInfoListDelete", // 首页配置模块
};

// tabPane 值
export const tabPaneMap = {
  entrance: "1", // 渠道配置
  landing: "2", // 落地页配置
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
// 首页配置跳转页面类型
export const linkTypeList = Object.keys(linkTypeMap).map((item) => {
  return linkTypeMap[item];
});

export const validatorList = [
  {
    key: "location", // 展示位置
    checkFunc: (value) => {
      if (value && value.trim()) {
        return true;
      }
      return false;
    },
    message: "配置项中展示位置不能为空！",
  },
  {
    key: "orderNum", // 展示顺序
    checkFunc: (value) => {
      if (value) {
        const temp = parseFloat(value);
        if (temp > 0 && temp % 1 === 0) {
          if (temp <= 99) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      return false;
    },
    message: "配置项中展示顺序不合法！必须是1到99的正整数",
  },
  {
    key: "uncheckedImageUrl", // 未选中状态的图片url
    checkFunc: (value) => {
      if (value && value.trim()) {
        return true;
      }
      return false;
    },
    message: "配置项中未选中状态的图片url不能为空！",
  },
  {
    key: "checkedImageUrl", // 选中状态的图片url
    checkFunc: (value) => {
      if (value && value.trim()) {
        return true;
      }
      return false;
    },
    message: "配置项中选中状态的图片url不能为空！",
  },
  {
    key: "jumpType", // 跳转页面类型
    checkFunc: (value) => {
      if (value && value.trim()) {
        return true;
      }
      return false;
    },
    message: "配置项中跳转页面类型不能为空！",
  },
  {
    key: "jumpBusinessId", // 业务id-落地页id
    checkFunc: (value, data) => {
      if (data.jumpType == linkTypeMap.landingPageLink.id) {
        if (value || value == 0) {
          return true;
        }
        return false;
      }
      return true;
    },
    message: "配置项中落地页名称不能为空！",
  },
  {
    key: "jumpUrl", // 外部链接
    checkFunc: (value, data) => {
      if (data.jumpType == linkTypeMap.otherLink.id) {
        if (value && value.trim()) {
          return true;
        }
        return false;
      }
      return true;
    },
    message: "配置项中跳转链接不能为空！",
  },
];


export const editTypeMap = {
  edit:'edit', // 编辑
  add:'add', // 新增
} 
