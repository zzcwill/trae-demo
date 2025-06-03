export default {
  getEnumOptions: "common/options", // 获取枚举选项信息接口
  postSaveImage: "common/saveImage", // 上传图片接口
  getBrandListByType: "common/brand/list", // 根据业务获取产品维度列表
  saveImage: '/common/saveImage',
  queryAreaList: '/common/queryAreaList',
  commonGetLocationList:'/common/locationList',
  getOrgList:"/common/orgList", // 查询组织结构列表
  getOrgTree:"/common/orgTree", // 查询组织机构树
  postUploadFile:"/common/upload/file", // 上传文件接口
  getCustomerList: '/customer/list', //获取权益信息 三种类型
  getCompanyByName: '/customer/queryCompanyByName', //通过企业名称查询企业
  fuzzyQueryCompany: '/customer/fuzzyQueryCompany' //模糊查询企业信息

}
