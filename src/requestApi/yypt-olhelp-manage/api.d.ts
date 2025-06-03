// 该文件自动生成，请勿修改(除非知道自己在做什么)
/* eslint-disable */
declare namespace API {
  export type ET<T> = T extends object ? (T extends infer O ? { [K in keyof O]: ET<O[K]> } : never) : T;

  export module GetBizParamsList {
    export type BizParamsJO = {
      /** 参数key */
      key?: string;
      /** 参数组 */
      group?: string;
      /** 参数值 */
      value?: string;
    };

    export type Req = any;
    export type Res = Array<BizParamsJO>;
  }

  /** 查询业务参数接口 get /bizParams/list */
  function getBizParamsList(req?: ET<GetBizParamsList.Req>, options?: object): Promise<ET<GetBizParamsList.Res>>;

  export module PostBizParamsUpdate {
    export type BizParamsJO = {
      /** 参数key */
      key?: string;
      /** 参数组 */
      group?: string;
      /** 参数值 */
      value?: string;
    };

    export type Req = Array<BizParamsJO>;
    export type Res = boolean;
  }

  /** 修改业务参数接口 post /bizParams/update */
  function postBizParamsUpdate(req: ET<PostBizParamsUpdate.Req>, options?: object): Promise<ET<PostBizParamsUpdate.Res>>;

  export module PostClassifyDelete {
    export interface Req {
      /** 分类id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除分类 post /classify/delete */
  function postClassifyDelete(req: ET<PostClassifyDelete.Req>, options?: object): Promise<ET<PostClassifyDelete.Res>>;

  export module GetClassifyList {
    export type TypeClassifyListDTO = {
      type?: string;
      list?: Array<ClassifyDTO>;
    };
    export type ClassifyDTO = {
      id?: number;
      name?: string;
      type?: string;
      code?: string;
      orderNum?: number;
      showFlag?: string;
      parentId?: number;
      isDel?: string;
      creator?: string;
      createTime?: string;
      lastModifier?: string;
      lastModifyTime?: string;
      children?: Array<ClassifyDTO>;
    };

    export interface Req {
      /** 类型 */
      types: string;
    }
    export type Res = Array<TypeClassifyListDTO>;
  }

  /** 分类树 get /classify/list */
  function getClassifyList(req: ET<GetClassifyList.Req>, options?: object): Promise<ET<GetClassifyList.Res>>;

  export module PostClassifySave {
    export interface Req {
      /** name : ${分类名称} */
      name?: string;
      /** type : ${分类类型} */
      type?: string;
      /** orderNum : ${排序} */
      orderNum?: number;
      /** 是否展示:Y是，N否 */
      showFlag?: string;
      /** parentId : ${父级目录id} */
      parentId?: number;
    }
    export interface Res {
      /** id */
      id?: number;
    }
  }

  /** 保存分类 post /classify/save */
  function postClassifySave(req: ET<PostClassifySave.Req>, options?: object): Promise<ET<PostClassifySave.Res>>;

  export module PostClassifyUpdate {
    export interface Req {
      /** parentId : ${分类id} */
      id?: number;
      /** name : ${分类名称} */
      name?: string;
      /** orderNum : ${排序} */
      orderNum?: number;
      /** 是否展示:Y是，N否 */
      showFlag?: string;
    }
    export type Res = boolean;
  }

  /** 更新分类 post /classify/update */
  function postClassifyUpdate(req: ET<PostClassifyUpdate.Req>, options?: object): Promise<ET<PostClassifyUpdate.Res>>;

  export module GetClassifyPageExpertDetail {
    export type BannerImageInfoDTO = {
      /** 图片名称 */
      imageName?: string;
      /** 图片url */
      imageUrl?: string;
      /** 跳转页面类型 0-不跳转;1-落地页;2-外部链接 */
      jumpType?: string;
      /** 跳转链接 */
      jumpUrl?: string;
      /** 跳转内部类型,landingPage-落地页 */
      jumpBusinessType?: string;
      /** 跳转链接名称 */
      jumpUrlName?: string;
      /** 跳转业务id-落地页id */
      jumpBusinessId?: number;
      /** 图片顺序 */
      orderNum?: number;
    };
    export type ClassifyInfo = {
      /** 筛选栏位置 */
      location?: string;
      /** 筛选栏名称 */
      name?: string;
      /** 专家业务分类id */
      idList?: Array<number>;
      /** 专家服务分类类型,0-咨询范围，1-擅长行业，2-咨询地区，3-服务方式 */
      type?: string;
    };

    export interface Req {
      /** 落地页id */
      businessId: number;
    }
    export interface Res {
      /** banner图列表 */
      bannerImageList?: Array<BannerImageInfoDTO>;
      /** 分类信息列表 */
      classifyInfoList?: Array<ClassifyInfo>;
    }
  }

  /** 查询分类页配置信息 get /classifyPage/expert/detail */
  function getClassifyPageExpertDetail(req: ET<GetClassifyPageExpertDetail.Req>, options?: object): Promise<ET<GetClassifyPageExpertDetail.Res>>;

  export module GetClassifyPageOfficialServiceDetail {
    export type BannerImageInfoDTO = {
      /** 图片名称 */
      imageName?: string;
      /** web图片url */
      imageUrl?: string;
      /** 跳转页面类型 0-不跳转;1-落地页;2-外部链接 */
      jumpType?: string;
      /** 跳转链接 */
      jumpUrl?: string;
      /** 跳转内部类型,landingPage-落地页 */
      jumpBusinessType?: string;
      /** 跳转链接名称 */
      jumpUrlName?: string;
      /** 跳转业务id-落地页id */
      jumpBusinessId?: number;
      /** 图片顺序 */
      orderNum?: number;
    };
    export type OfficialServiceDetailDTO = {
      /** 官方服务id */
      id?: number;
      /** 官方服务名称 */
      name?: string;
      /** 图片组id */
      imageGroupId?: number;
      /** web图片url */
      imageUrl?: string;
      /** h5图片url */
      mobileImageUrl?: string;
      /** web图片名称 */
      imageUrlName?: string;
      /** h5图片名称 */
      mobileImageName?: string;
      /** 产品维度 */
      brand?: string;
      /** 产品维度名称 */
      brandName?: string;
      /** 【字段弃用】服务类型 0-办税操作咨询，1-财税实务咨询 */
      type?: string;
      /** 场景 */
      scene?: string;
      /** 服务类型名称:办税咨询/基础财税咨询 */
      typeName?: string;
      /** 服务详情简介 */
      description?: string;
      /** 服务类型 1:办税咨询;2:财税实务咨询;3:财税专家咨询;4:专项服务咨询;5:人资咨询;6:专家问诊 */
      consultService?: string;
    };

    export interface Req {
      /** 落地页id */
      businessId: number;
    }
    export interface Res {
      /** banner图列表 */
      bannerImageList?: Array<BannerImageInfoDTO>;
      /** 服务信息 */
      officialServiceList?: Array<OfficialServiceDetailDTO>;
    }
  }

  /** 查询分类页服务配置信息 get /classifyPage/officialService/detail */
  function getClassifyPageOfficialServiceDetail(req: ET<GetClassifyPageOfficialServiceDetail.Req>, options?: object): Promise<ET<GetClassifyPageOfficialServiceDetail.Res>>;

  export module GetBrandList {
    export interface Req {
      /** brandType */
      brandType: string;
    }
    export interface Res {
      map?: Record<string, any>;
    }
  }

  /** 根据业务获取产品维度列表 get /common/brand/list */
  function getBrandList(req: ET<GetBrandList.Req>, options?: object): Promise<ET<GetBrandList.Res>>;

  export module GetCommonLocationList {
    export type EnumDTO = {
      /** 枚举key */
      id?: string;
      /** 名称 */
      name?: string;
    };

    export interface Req {
      /** 地区类型 */
      type: string;
    }
    export type Res = Array<EnumDTO>;
  }

  /** 获取地区列表 get /common/locationList */
  function getCommonLocationList(req: ET<GetCommonLocationList.Req>, options?: object): Promise<ET<GetCommonLocationList.Res>>;

  export module GetCommonQueryAreaList {
    export type EnumDTO = {
      /** 枚举key */
      id?: string;
      /** 名称 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<EnumDTO>;
  }

  /** 查询所有地区列表接口（包括所有省份、直辖市、计划单列市） get /common/queryAreaList */
  function getCommonQueryAreaList(req?: ET<GetCommonQueryAreaList.Req>, options?: object): Promise<ET<GetCommonQueryAreaList.Res>>;

  export module GetCommonGroupList {
    export type GroupDTO = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
    };

    export interface Req {
      /** 组类型，1电话组，2在线组 */
      type: string;
    }
    export type Res = Array<GroupDTO>;
  }

  /** 查询有效的坐席组信息列表 get /common/groupList */
  function getCommonGroupList(req: ET<GetCommonGroupList.Req>, options?: object): Promise<ET<GetCommonGroupList.Res>>;

  export module GetCommonOptions {
    export type OptionResultDTO = {
      /** 选项组 */
      options?: Array<Options>;
      /** 组名 */
      groupName?: string;
    };
    export type Options = {
      /** 猜您想问系统ID */
      id?: string;
      /** 名称 */
      name?: string;
    };

    export interface Req {
      /** 选项组名称，多个用英文逗号分隔 */
      groupNames: string;
    }
    export type Res = Array<OptionResultDTO>;
  }

  /** 批量获取枚举选项信息接口 get /common/options */
  function getCommonOptions(req: ET<GetCommonOptions.Req>, options?: object): Promise<ET<GetCommonOptions.Res>>;

  export module GetCommonReloadCache {
    export interface Req {
      /** 类型 */
      type: string;
    }
    export type Res = boolean;
  }

  /** 刷新缓存 get /common/reloadCache */
  function getCommonReloadCache(req: ET<GetCommonReloadCache.Req>, options?: object): Promise<ET<GetCommonReloadCache.Res>>;

  export module PostCommonSaveImage {
    export interface Req {
      /** 上传的文件 */
      file: any;
    }
    export interface Res {
      /** 图片相对路径 */
      imageUrl?: string;
      /** 图片名称 */
      name?: string;
      /** 阿里云图片服务器地址 */
      domain?: string;
    }
  }

  /** 上传图片接口 post /common/saveImage */
  function postCommonSaveImage(req: ET<PostCommonSaveImage.Req>, options?: object): Promise<ET<PostCommonSaveImage.Res>>;

  export module GetConsultEntranceDetail {
    export interface Req {
      /** 渠道配置ID */
      id: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 渠道名称 */
      name?: string;
      /** 落地页配置id */
      landingPageId?: number;
      /** 地区code列表 */
      locationList?: Array<string>;
    }
  }

  /** 渠道配置详情查询接口 get /consultEntrance/detail */
  function getConsultEntranceDetail(req: ET<GetConsultEntranceDetail.Req>, options?: object): Promise<ET<GetConsultEntranceDetail.Res>>;

  export module GetConsultEntranceQuery {
    export type ConsultEntranceInfoDTO = {
      /** id */
      id?: number;
      /** 渠道名称 */
      name?: string;
      /** 落地页配置id */
      landingPageId?: number;
      /** 落地页配置名称 */
      landingPageName?: string;
      /** 地区code列表 */
      locationList?: Array<string>;
      /** 状态，0：未生效，1：已生效，2：已失效 */
      status?: string;
      /** 状态，0：未生效，1：已生效，2：已失效 */
      statusName?: string;
      /** 创建人 */
      creator?: string;
      /** 创建人 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改人姓名 */
      lastModifierName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 落地页id */
      landingPageId?: number;
      /** 最后修改时间起 */
      modifyTimeFrom?: string;
      /** 最后修改时间止 */
      modifyTimeTo?: string;
      /** 名称 */
      name?: string;
      /** 状态，0：未生效，1：已生效，2：已失效 */
      status?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ConsultEntranceInfoDTO>;
    }
  }

  /** 渠道配置列表查询接口 get /consultEntrance/query */
  function getConsultEntranceQuery(req: ET<GetConsultEntranceQuery.Req>, options?: object): Promise<ET<GetConsultEntranceQuery.Res>>;

  export module PostConsultEntranceSave {
    export interface Req {
      /** 渠道名称 */
      name?: string;
      /** 落地页配置id */
      landingPageId?: number;
      /** 地区code列表 */
      locationList?: Array<string>;
    }
    export interface Res {
      /** id */
      id?: number;
    }
  }

  /** 新增渠道配置 post /consultEntrance/save */
  function postConsultEntranceSave(req: ET<PostConsultEntranceSave.Req>, options?: object): Promise<ET<PostConsultEntranceSave.Res>>;

  export module PostConsultEntranceUpdate {
    export interface Req {
      /** id */
      id?: number;
      /** 渠道名称 */
      name?: string;
      /** 落地页配置id */
      landingPageId?: number;
      /** 地区code列表 */
      locationList?: Array<string>;
      /** 状态 */
      status?: string;
    }
    export type Res = boolean;
  }

  /** 修改渠道配置 post /consultEntrance/update */
  function postConsultEntranceUpdate(req: ET<PostConsultEntranceUpdate.Req>, options?: object): Promise<ET<PostConsultEntranceUpdate.Res>>;

  export module PostConsultEntranceUpdateStatus {
    export interface Req {
      /** id */
      id?: number;
      /** 渠道名称 */
      name?: string;
      /** 落地页配置id */
      landingPageId?: number;
      /** 地区code列表 */
      locationList?: Array<string>;
      /** 状态 */
      status?: string;
    }
    export type Res = boolean;
  }

  /** 修改渠道配置状态 post /consultEntrance/updateStatus */
  function postConsultEntranceUpdateStatus(req: ET<PostConsultEntranceUpdateStatus.Req>, options?: object): Promise<ET<PostConsultEntranceUpdateStatus.Res>>;

  export module PostExpertDel {
    export interface Req {
      idList?: Array<number>;
    }
    export type Res = boolean;
  }

  /** 删除咨询专家接口（支持批量） post /expert/del */
  function postExpertDel(req: ET<PostExpertDel.Req>, options?: object): Promise<ET<PostExpertDel.Res>>;

  export module GetExpertDetail {
    export interface Req {
      /** 专家信息ID */
      id: number;
    }
    export interface Res {
      /** 主键ID */
      id?: number;
      /** 专家账号 */
      account?: string;
      /** 专家名称 */
      name?: string;
      /** 阿里云图片服务器地址 */
      domain?: string;
      /** 头像图片地址 */
      headPicUrl?: string;
      /** 头像图片名称 */
      headPicName?: string;
      /** 头衔 */
      appellation?: string;
      /** 职称 */
      professionalTitle?: string;
      /** 擅长 */
      speciality?: string;
      /** 上班时间 */
      workTime?: string;
      /** 顺序，小的在前 */
      indexNum?: number;
      /** 标签ID列表 */
      labelList?: Array<string>;
      /** 地区代码列表 */
      locationList?: Array<string>;
      /** 渠道ID列表 */
      channelList?: Array<string>;
      /** 创建者 */
      creator?: string;
      /** 创建人姓名 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最近修改人 */
      lastModifier?: string;
      /** 最后修改人姓名 */
      lastModifierName?: string;
      /** 最近修改时间 */
      lastModifyTime?: string;
    }
  }

  /** 查询咨询专家详情接口 get /expert/detail */
  function getExpertDetail(req: ET<GetExpertDetail.Req>, options?: object): Promise<ET<GetExpertDetail.Res>>;

  export module PostExpertEdit {
    export interface Req {
      /** 主键ID */
      id?: number;
      /** 专家账号 */
      account?: string;
      /** 专家名称 */
      name?: string;
      /** 阿里云图片服务器地址 */
      domain?: string;
      /** 头像图片地址 */
      headPicUrl?: string;
      /** 头像图片名称 */
      headPicName?: string;
      /** 头衔 */
      appellation?: string;
      /** 职称 */
      professionalTitle?: string;
      /** 擅长 */
      speciality?: string;
      /** 上班时间 */
      workTime?: string;
      /** 顺序，小的在前 */
      indexNum?: number;
      /** 标签ID列表 */
      labelList?: Array<string>;
      /** 地区代码列表 */
      locationList?: Array<string>;
      /** 渠道ID列表 */
      channelList?: Array<string>;
      /** 创建者 */
      creator?: string;
      /** 创建人姓名 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最近修改人 */
      lastModifier?: string;
      /** 最后修改人姓名 */
      lastModifierName?: string;
      /** 最近修改时间 */
      lastModifyTime?: string;
    }
    export type Res = boolean;
  }

  /** 修改咨询专家接口 post /expert/edit */
  function postExpertEdit(req: ET<PostExpertEdit.Req>, options?: object): Promise<ET<PostExpertEdit.Res>>;

  export module PostExpertSave {
    export interface Req {
      /** 主键ID */
      id?: number;
      /** 专家账号 */
      account?: string;
      /** 专家名称 */
      name?: string;
      /** 阿里云图片服务器地址 */
      domain?: string;
      /** 头像图片地址 */
      headPicUrl?: string;
      /** 头像图片名称 */
      headPicName?: string;
      /** 头衔 */
      appellation?: string;
      /** 职称 */
      professionalTitle?: string;
      /** 擅长 */
      speciality?: string;
      /** 上班时间 */
      workTime?: string;
      /** 顺序，小的在前 */
      indexNum?: number;
      /** 标签ID列表 */
      labelList?: Array<string>;
      /** 地区代码列表 */
      locationList?: Array<string>;
      /** 渠道ID列表 */
      channelList?: Array<string>;
      /** 创建者 */
      creator?: string;
      /** 创建人姓名 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最近修改人 */
      lastModifier?: string;
      /** 最后修改人姓名 */
      lastModifierName?: string;
      /** 最近修改时间 */
      lastModifyTime?: string;
    }
    export type Res = number;
  }

  /** 新增咨询专家接口 post /expert/save */
  function postExpertSave(req: ET<PostExpertSave.Req>, options?: object): Promise<ET<PostExpertSave.Res>>;

  export module GetExpertList {
    export type T = {
      /** 主键ID */
      id?: number;
      /** 专家名称 */
      name?: string;
      /** 头衔 */
      appellation?: string;
      /** 职称 */
      professionalTitle?: string;
      /** 擅长 */
      speciality?: string;
      /** 上班时间 */
      workTime?: string;
      /** 顺序，小的在前 */
      indexNum?: number;
      /** 标签ID列表 */
      labelList?: Array<string>;
      /** 地区代码列表 */
      locationList?: Array<string>;
      /** 渠道ID列表 */
      channelList?: Array<string>;
      /** 最后修改人姓名 */
      lastModifierName?: string;
      /** 最近修改时间 */
      lastModifyTime?: string;
    };

    export interface Req {
      /** 每页显示条数 */
      pageSize?: number;
      /** 当前页码 */
      pageIndex?: number;
      /** 专家名称 */
      expertName?: string;
      /** 地区代码列表 */
      locationList?: Array<string>;
      /** 渠道ID列表 */
      channelList?: Array<string>;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<T>;
    }
  }

  /** 分页查询咨询专家列表接口 get /expert/list */
  function getExpertList(req: ET<GetExpertList.Req>, options?: object): Promise<ET<GetExpertList.Res>>;

  export module PostExpertServiceAudit {
    export interface Req {
      /** 服务id */
      id?: number;
      /** 审核状态 */
      status?: string;
      /** 审核不通过原因 */
      auditUnpassReason?: string;
      /** 审核不通过描述 */
      auditUnpassDesc?: string;
      /** 审核人 */
      auditor?: string;
    }
    export type Res = boolean;
  }

  /** 审核专家服务 post /expertService/audit */
  function postExpertServiceAudit(req: ET<PostExpertServiceAudit.Req>, options?: object): Promise<ET<PostExpertServiceAudit.Res>>;

  export module PostExpertServiceBatchDelete {
    export interface Req {
      /** id列表 */
      idList: Array<number>;
    }
    export type Res = boolean;
  }

  /** 批量删除专家服务 post /expertService/batchDelete */
  function postExpertServiceBatchDelete(req: ET<PostExpertServiceBatchDelete.Req>, options?: object): Promise<ET<PostExpertServiceBatchDelete.Res>>;

  export module PostExpertServiceBatchUpdatePriority {
    export interface Req {
      /** 专家&机构id */
      idList?: Array<number>;
      /** 优先级值 */
      priority?: number;
    }
    export type Res = boolean;
  }

  /** 批量修改专家服务优先级 post /expertService/batchUpdatePriority */
  function postExpertServiceBatchUpdatePriority(req: ET<PostExpertServiceBatchUpdatePriority.Req>, options?: object): Promise<ET<PostExpertServiceBatchUpdatePriority.Res>>;

  export module GetExpertServiceDetail {
    export type ClassifyListDTO = {
      /** 分类类型 */
      type?: string;
      /** 分类列表 */
      list?: Array<ClassifyDTO>;
    };
    export type ServiceWayDTO = {
      /** 服务方式 */
      serviceWay?: string;
      /** 服务地区 */
      locationList?: Array<string>;
      /** 服务时间配置 */
      serviceTimeList?: Array<ServiceTimeDTO>;
    };
    export type ClassifyDTO = {
      /** id : ${分类id} */
      id?: number;
      /** name : ${分类名称} */
      name?: string;
      /** type : ${分类类型} */
      type?: string;
      /** type : ${code} */
      code?: string;
      /** orderNum : ${排序} */
      orderNum?: number;
      /** parentId : ${父级目录id} */
      parentId?: number;
      /** 子节点列表 */
      children?: Array<ClassifyDTO>;
    };
    export type ServiceTimeDTO = {
      /** 服务地区 */
      locationList?: Array<string>;
      /** 服务日期开始 */
      serviceDateBegin?: string;
      /** 服务日期截止 */
      serviceDateEnd?: string;
      /** 服务时间开始，格式 HH:mm */
      serviceTimeBegin?: string;
      /** 服务时间截止，格式 HH:mm */
      serviceTimeEnd?: string;
    };

    export interface Req {
      /** 专家服务ID */
      id: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 专家&机构账号 */
      account?: string;
      /** 专家&机构名称 */
      name?: string;
      /** 头像图片URL */
      headImgUrl?: string;
      /** 头像图片名称 */
      headImgName?: string;
      /** 专家&机构描述 */
      description?: string;
      /** 咨询详情 */
      consultDetail?: string;
      /** 自述 */
      introduction?: string;
      /** 专家类型,0-专家,1-事务所 */
      type?: string;
      /** 优先级 */
      priority?: number;
      /** 专家咨询初始量 */
      consultNumInit?: number;
      /** 分类列表 */
      classifyList?: Array<ClassifyListDTO>;
      /** 咨询量 */
      consultNum?: number;
      /** 审核状态 0-未审核 1审核通过 2-审核未通过 */
      status?: string;
      /** 场景 web-亿企咨询,tool-工具场景,h5-h5专用 */
      scene?: string;
      /** 子场景 member-会员咨询，special-专项咨询 */
      subScene?: string;
      /** 服务类型;1:办税咨询;2:财税实务咨询;3:财税专家咨询;4:专项服务咨询;5:人资咨询;6:专家问诊 */
      consultService?: string;
      /** 好评率 */
      praiseRate?: number;
      /** 服务方式 */
      serviceWayList?: Array<ServiceWayDTO>;
      /** 专家好评率初始量 */
      praiseRateInit?: number;
    }
  }

  /** 专家服务详情查询接口 get /expertService/detail */
  function getExpertServiceDetail(req: ET<GetExpertServiceDetail.Req>, options?: object): Promise<ET<GetExpertServiceDetail.Res>>;

  export module GetExpertServiceList {
    export type ExpertServiceDetailDTO = {
      /** id */
      id?: number;
      /** 专家&机构账号 */
      account?: string;
      /** 专家&机构名称 */
      name?: string;
      /** 头像图片URL */
      headImgUrl?: string;
      /** 头像图片名称 */
      headImgName?: string;
      /** 专家&机构描述 */
      description?: string;
      /** 咨询详情 */
      consultDetail?: string;
      /** 自述 */
      introduction?: string;
      /** 专家类型,0-专家,1-事务所 */
      type?: string;
      /** 优先级 */
      priority?: number;
      /** 专家咨询初始量 */
      consultNumInit?: number;
      /** 分类列表 */
      classifyList?: Array<ClassifyListDTO>;
      /** 咨询量 */
      consultNum?: number;
      /** 审核状态 0-未审核 1审核通过 2-审核未通过 */
      status?: string;
      /** 场景 web-亿企咨询,tool-工具场景,h5-h5专用 */
      scene?: string;
      /** 子场景 member-会员咨询，special-专项咨询 */
      subScene?: string;
      /** 服务类型;1:办税咨询;2:财税实务咨询;3:财税专家咨询;4:专项服务咨询;5:人资咨询;6:专家问诊 */
      consultService?: string;
      /** 好评率 */
      praiseRate?: number;
      /** 服务方式 */
      serviceWayList?: Array<ServiceWayDTO>;
      /** 专家好评率初始量 */
      praiseRateInit?: number;
    };
    export type ClassifyListDTO = {
      /** 分类类型 */
      type?: string;
      /** 分类列表 */
      list?: Array<ClassifyDTO>;
    };
    export type ServiceWayDTO = {
      /** 服务方式 */
      serviceWay?: string;
      /** 服务地区 */
      locationList?: Array<string>;
      /** 服务时间配置 */
      serviceTimeList?: Array<ServiceTimeDTO>;
    };
    export type ClassifyDTO = {
      /** id : ${分类id} */
      id?: number;
      /** name : ${分类名称} */
      name?: string;
      /** type : ${分类类型} */
      type?: string;
      /** type : ${code} */
      code?: string;
      /** orderNum : ${排序} */
      orderNum?: number;
      /** parentId : ${父级目录id} */
      parentId?: number;
      /** 子节点列表 */
      children?: Array<ClassifyDTO>;
    };
    export type ServiceTimeDTO = {
      /** 服务地区 */
      locationList?: Array<string>;
      /** 服务日期开始 */
      serviceDateBegin?: string;
      /** 服务日期截止 */
      serviceDateEnd?: string;
      /** 服务时间开始，格式 HH:mm */
      serviceTimeBegin?: string;
      /** 服务时间截止，格式 HH:mm */
      serviceTimeEnd?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 专家服务名称 */
      name?: string;
      /** 服务地区 */
      locationList?: Array<string>;
      /** 分类信息id，包括咨询地区，咨询范围，擅长行业 */
      classifyIdList?: Array<number>;
      /** 审核状态，0-未审核 1-审核通过 2-审核不通过 */
      status?: string;
      /** 场景：web：亿企咨询；tool：工具场景（目前仅咨询前台） */
      scene?: string;
      /** 子场景:member-会员咨询；special-专项咨询 */
      subScene?: string;
      /** 服务方式 */
      serviceWay?: string;
      /** 优先级 */
      priorityList?: Array<number>;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ExpertServiceDetailDTO>;
    }
  }

  /** 专家服务列表查询接口 post /expertService/list */
  function getExpertServiceList(req: ET<GetExpertServiceList.Req>, options?: object): Promise<ET<GetExpertServiceList.Res>>;

  export module GetExpertServiceListForPriority {
    export type ExpertServiceDetailDTO = {
      /** id */
      id?: number;
      /** 专家&机构账号 */
      account?: string;
      /** 专家&机构名称 */
      name?: string;
      /** 头像图片URL */
      headImgUrl?: string;
      /** 头像图片名称 */
      headImgName?: string;
      /** 专家&机构描述 */
      description?: string;
      /** 咨询详情 */
      consultDetail?: string;
      /** 自述 */
      introduction?: string;
      /** 专家类型,0-专家,1-事务所 */
      type?: string;
      /** 优先级 */
      priority?: number;
      /** 专家咨询初始量 */
      consultNumInit?: number;
      /** 分类列表 */
      classifyList?: Array<ClassifyListDTO>;
      /** 咨询量 */
      consultNum?: number;
      /** 审核状态 0-未审核 1审核通过 2-审核未通过 */
      status?: string;
      /** 场景 web-亿企咨询,tool-工具场景,h5-h5专用 */
      scene?: string;
      /** 子场景 member-会员咨询，special-专项咨询 */
      subScene?: string;
      /** 服务类型;1:办税咨询;2:财税实务咨询;3:财税专家咨询;4:专项服务咨询;5:人资咨询;6:专家问诊 */
      consultService?: string;
      /** 好评率 */
      praiseRate?: number;
      /** 服务方式 */
      serviceWayList?: Array<ServiceWayDTO>;
      /** 专家好评率初始量 */
      praiseRateInit?: number;
    };
    export type ClassifyListDTO = {
      /** 分类类型 */
      type?: string;
      /** 分类列表 */
      list?: Array<ClassifyDTO>;
    };
    export type ServiceWayDTO = {
      /** 服务方式 */
      serviceWay?: string;
      /** 服务地区 */
      locationList?: Array<string>;
      /** 服务时间配置 */
      serviceTimeList?: Array<ServiceTimeDTO>;
    };
    export type ClassifyDTO = {
      /** id : ${分类id} */
      id?: number;
      /** name : ${分类名称} */
      name?: string;
      /** type : ${分类类型} */
      type?: string;
      /** type : ${code} */
      code?: string;
      /** orderNum : ${排序} */
      orderNum?: number;
      /** parentId : ${父级目录id} */
      parentId?: number;
      /** 子节点列表 */
      children?: Array<ClassifyDTO>;
    };
    export type ServiceTimeDTO = {
      /** 服务地区 */
      locationList?: Array<string>;
      /** 服务日期开始 */
      serviceDateBegin?: string;
      /** 服务日期截止 */
      serviceDateEnd?: string;
      /** 服务时间开始，格式 HH:mm */
      serviceTimeBegin?: string;
      /** 服务时间截止，格式 HH:mm */
      serviceTimeEnd?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 专家服务名称 */
      name?: string;
      /** 服务地区 */
      locationList?: Array<string>;
      /** 分类信息id，包括咨询地区，咨询范围，擅长行业 */
      classifyIdList?: Array<number>;
      /** 审核状态，0-未审核 1-审核通过 2-审核不通过 */
      status?: string;
      /** 场景：web：亿企咨询；tool：工具场景（目前仅咨询前台） */
      scene?: string;
      /** 子场景:member-会员咨询；special-专项咨询 */
      subScene?: string;
      /** 服务方式 */
      serviceWay?: string;
      /** 优先级 */
      priorityList?: Array<number>;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ExpertServiceDetailDTO>;
    }
  }

  /** 专家优先级管理页面专家服务列表查询接口 get /expertService/listForPriority */
  function getExpertServiceListForPriority(req: ET<GetExpertServiceListForPriority.Req>, options?: object): Promise<ET<GetExpertServiceListForPriority.Res>>;

  export module PostExpertServiceSave {
    export type ServiceWayJO = {
      /** 服务方式，ONLINE_CHAT：线上咨询，ONLINE_VIDEO：线上视频，OFFLINE：线下 */
      serviceWay?: string;
      /** 服务地区 */
      locationList?: Array<string>;
      /** 服务时间配置 */
      serviceTimeList?: Array<ServiceTimeJO>;
    };
    export type ServiceTimeJO = {
      /** 服务地区 */
      locationList?: Array<string>;
      /** 服务日期开始 */
      serviceDateBegin?: string;
      /** 服务日期截止 */
      serviceDateEnd?: string;
      /** 服务时间开始，格式 HH:mm */
      serviceTimeBegin?: string;
      /** 服务时间截止，格式 HH:mm */
      serviceTimeEnd?: string;
    };

    export interface Req {
      /** 专家&机构账号 */
      account?: string;
      /** 专家&机构名称 */
      name?: string;
      /** 场景：web：亿企咨询；tool：工具场景（目前仅咨询前台）；h5：h5专用;all:通用 */
      scene?: string;
      /** 子场景，member：会员咨询，special：专项咨询 ,fin_tax_exp_inquiry:财税专家咨询 inquiry:专家问诊 */
      subScene?: string;
      /** 服务类型;1:办税咨询;2:财税实务咨询;3:财税专家咨询;4:专项服务咨询;5:人资咨询;6:专家问诊 */
      consultService?: string;
      /** 头像图片URL */
      headImgUrl?: string;
      /** 头像图片名称 */
      headImgName?: string;
      /** 专家&机构描述 */
      description?: string;
      /** 咨询详情 */
      consultDetail?: string;
      /** 专家&机构自述 */
      introduction?: string;
      /** 专家咨询初始量 */
      consultNumInit: number;
      /** 专家好评率初始量 */
      praiseRateInit: number;
      /** 分类id列表 */
      classifyIdList?: Array<number>;
      /** 服务方式 */
      serviceWayList?: Array<ServiceWayJO>;
    }
    export interface Res {
      /** 专家&机构id */
      id?: number;
    }
  }

  /** 新增专家服务 post /expertService/save */
  function postExpertServiceSave(req: ET<PostExpertServiceSave.Req>, options?: object): Promise<ET<PostExpertServiceSave.Res>>;

  export module PostExpertServiceUpdate {
    export type ServiceWayJO = {
      /** 服务方式，ONLINE_CHAT：线上咨询，ONLINE_VIDEO：线上视频，OFFLINE：线下 */
      serviceWay?: string;
      /** 服务地区 */
      locationList?: Array<string>;
      /** 服务时间配置 */
      serviceTimeList?: Array<ServiceTimeJO>;
    };
    export type ServiceTimeJO = {
      /** 服务地区 */
      locationList?: Array<string>;
      /** 服务日期开始 */
      serviceDateBegin?: string;
      /** 服务日期截止 */
      serviceDateEnd?: string;
      /** 服务时间开始，格式 HH:mm */
      serviceTimeBegin?: string;
      /** 服务时间截止，格式 HH:mm */
      serviceTimeEnd?: string;
    };

    export interface Req {
      /** 专家&机构id */
      id?: number;
      /** 专家&机构账号 */
      account?: string;
      /** 专家&机构名称 */
      name?: string;
      /** 头像图片URL */
      headImgUrl?: string;
      /** 头像图片名称 */
      headImgName?: string;
      /** 专家&机构描述 */
      description?: string;
      /** 咨询详情 */
      consultDetail?: string;
      /** 专家&机构自述 */
      introduction?: string;
      /** 分类id列表 */
      classifyIdList?: Array<number>;
      /** 服务方式 */
      serviceWayList?: Array<ServiceWayJO>;
    }
    export type Res = boolean;
  }

  /** 修改专家服务 post /expertService/update */
  function postExpertServiceUpdate(req: ET<PostExpertServiceUpdate.Req>, options?: object): Promise<ET<PostExpertServiceUpdate.Res>>;

  export module GetGuidePageGetById {
    export type GuidePageDataDTO = {
      /** 主键ID */
      id?: number;
      /** 元数据ID */
      metaId?: number;
      /** 入口顺序 */
      indexNum?: number;
      /** 默认图片地址 */
      defaultImgPath?: string;
      /** 默认图片名称 */
      defaultImgName?: string;
      /** 悬浮图片地址 */
      hoverImgPath?: string;
      /** 悬浮图片名称 */
      hoverImgName?: string;
      /** 是否是会员通道（Y：是，N：否） */
      vipEntranceFlag?: string;
      /** 新增字段咨询服务，对应字典consult_service */
      consultService?: string;
      /** 构件类型（0：服务构件，1：软件构件） */
      gjlx?: string;
      /** 构件ID */
      gjid?: string;
      /** 无构件处理类型（0：弹出宣传图，1：禁用图片） */
      extraDealType?: number;
      /** 特殊处理图片地址 */
      extraImgPath?: string;
      /** 特殊处理图片名称 */
      extraImgName?: string;
      /** 跳转网页链接 */
      jumpPageUrl?: string;
      /** 产品维度 */
      cpwd?: string;
    };

    export interface Req {
      /** 元数据主键ID */
      id: number;
    }
    export interface Res {
      /** 元数据表主键ID */
      id?: number;
      /** 入口类型 */
      entryType?: string;
      /** 地区代码 */
      location?: string;
      /** 产品代码 */
      cpdm?: string;
      /** 来源渠道 */
      channel?: string;
      /** 模块名称 */
      module?: string;
      /** 入口数量 */
      entryAmount?: number;
      /** 入口页配置信息列表 */
      entryList?: Array<GuidePageDataDTO>;
    }
  }

  /** 根据主键ID查询咨引导页配置信息详情 get /guidePage/getById */
  function getGuidePageGetById(req: ET<GetGuidePageGetById.Req>, options?: object): Promise<ET<GetGuidePageGetById.Res>>;

  export module GetGuidePageListByPage {
    export type GuidePageMetaDTO = {
      /** 元数据表主键ID */
      id?: number;
      /** 入口类型 */
      entryType?: string;
      /** 地区代码 */
      location?: string;
      /** 产品代码 */
      cpdm?: string;
      /** 来源渠道 */
      channel?: string;
      /** 模块名称 */
      module?: string;
      /** 入口数量 */
      entryAmount?: number;
      /** 最后修改人（trueId） */
      lastModifier?: string;
      /** 最后修改人名称 */
      lastModifyName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 入口类型 */
      entryType?: string;
      /** 地区代码 */
      location?: string;
      /** 产品代码 */
      cpdm?: string;
      /** 来源渠道 */
      channel?: string;
      /** 模块标签页 */
      module?: string;
      /** 逻辑删除字段（Y：已删除，N：未删除） */
      delFlag?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<GuidePageMetaDTO>;
    }
  }

  /** 分页查询引导页配置信息 get /guidePage/listByPage */
  function getGuidePageListByPage(req: ET<GetGuidePageListByPage.Req>, options?: object): Promise<ET<GetGuidePageListByPage.Res>>;

  export module PostGuidePageRemove {
    export interface Req {
      /** id列表 */
      idList?: Array<number>;
    }
    export type Res = boolean;
  }

  /** 根据主键ID列表删除元数据配置信息 post /guidePage/remove */
  function postGuidePageRemove(req: ET<PostGuidePageRemove.Req>, options?: object): Promise<ET<PostGuidePageRemove.Res>>;

  export module PostGuidePageSave {
    export type SaveGuidePageDataDTORequest = {
      /** 入口顺序 */
      indexNum?: number;
      /** 默认图片地址 */
      defaultImgPath?: string;
      /** 默认图片名称 */
      defaultImgName?: string;
      /** 悬浮图片地址 */
      hoverImgPath?: string;
      /** 悬浮图片名称 */
      hoverImgName?: string;
      /** 是否是会员通道（Y：是，N：否） */
      vipEntranceFlag?: string;
      /** 新增字段咨询服务，对应字典consult_service */
      consultService?: string;
      /** 构件类型（0：服务构件，1：软件构件） */
      gjlx?: string;
      /** 构件ID */
      gjid?: string;
      /** 无构件处理类型（0：弹出宣传图，1：禁用图片） */
      extraDealType?: number;
      /** 特殊处理图片地址 */
      extraImgPath?: string;
      /** 特殊处理图片名称 */
      extraImgName?: string;
      /** 跳转网页链接 */
      jumpPageUrl?: string;
      /** 产品维度 */
      cpwd?: string;
    };

    export interface Req {
      /** 主键ID */
      id?: number;
      /** 入口类型 */
      entryType?: string;
      /** 地区代码 */
      location?: string;
      /** 产品代码 */
      cpdm?: string;
      /** 来源渠道 */
      channel?: string;
      /** 模块名称 */
      module?: string;
      /** 入口数量 */
      entryAmount?: number;
      /** 新增引导页入口数据请求参数列表 */
      entryList?: Array<SaveGuidePageDataDTORequest>;
    }
    export type Res = number;
  }

  /** 新增引导页配置信息 post /guidePage/save */
  function postGuidePageSave(req: ET<PostGuidePageSave.Req>, options?: object): Promise<ET<PostGuidePageSave.Res>>;

  export module PostGuidePageUpdate {
    export type SaveGuidePageDataDTORequest = {
      /** 入口顺序 */
      indexNum?: number;
      /** 默认图片地址 */
      defaultImgPath?: string;
      /** 默认图片名称 */
      defaultImgName?: string;
      /** 悬浮图片地址 */
      hoverImgPath?: string;
      /** 悬浮图片名称 */
      hoverImgName?: string;
      /** 是否是会员通道（Y：是，N：否） */
      vipEntranceFlag?: string;
      /** 新增字段咨询服务，对应字典consult_service */
      consultService?: string;
      /** 构件类型（0：服务构件，1：软件构件） */
      gjlx?: string;
      /** 构件ID */
      gjid?: string;
      /** 无构件处理类型（0：弹出宣传图，1：禁用图片） */
      extraDealType?: number;
      /** 特殊处理图片地址 */
      extraImgPath?: string;
      /** 特殊处理图片名称 */
      extraImgName?: string;
      /** 跳转网页链接 */
      jumpPageUrl?: string;
      /** 产品维度 */
      cpwd?: string;
    };

    export interface Req {
      /** 主键ID */
      id?: number;
      /** 入口类型 */
      entryType?: string;
      /** 地区代码 */
      location?: string;
      /** 产品代码 */
      cpdm?: string;
      /** 来源渠道 */
      channel?: string;
      /** 模块名称 */
      module?: string;
      /** 入口数量 */
      entryAmount?: number;
      /** 新增引导页入口数据请求参数列表 */
      entryList?: Array<SaveGuidePageDataDTORequest>;
    }
    export type Res = number;
  }

  /** 更新引导页数据 post /guidePage/update */
  function postGuidePageUpdate(req: ET<PostGuidePageUpdate.Req>, options?: object): Promise<ET<PostGuidePageUpdate.Res>>;

  export module GetHomeDetail {
    export type BannerImageInfoDTO = {
      /** 图片名称 */
      imageName?: string;
      /** 图片url */
      imageUrl?: string;
      /** 跳转页面类型 0-不跳转;1-落地页;2-外部链接 */
      jumpType?: string;
      /** 外部链接 */
      jumpUrl?: string;
      /** 跳转内部类型,landingPage-落地页 */
      jumpBusinessType?: string;
      /** 跳转链接名称 */
      jumpUrlName?: string;
      /** 业务id-落地页id */
      jumpBusinessId?: number;
      /** 展示顺序 */
      orderNum?: number;
    };
    export type HomeModuleInfoDTO = {
      /** 展示位置(0:中间，1:右侧) */
      location?: string;
      /** 展示顺序 */
      orderNum?: number;
      /** 未选中状态的图片url */
      uncheckedImageUrl?: string;
      /** 选中状态的图片url */
      checkedImageUrl?: string;
      /** 跳转页面类型 0-不跳转;1-落地页;2-外部链接 */
      jumpType?: string;
      /** 业务id-落地页id */
      jumpBusinessId?: number;
      /** 外部链接 */
      jumpUrl?: string;
    };

    export interface Req {
      /** 落地页id */
      businessId: number;
    }
    export interface Res {
      /** banner图列表 */
      bannerImageList?: Array<BannerImageInfoDTO>;
      /** 财税咨询 */
      moduleInfoList?: Array<HomeModuleInfoDTO>;
    }
  }

  /** 查询首页配置信息 get /home/detail */
  function getHomeDetail(req: ET<GetHomeDetail.Req>, options?: object): Promise<ET<GetHomeDetail.Res>>;

  export module PostManualDelete {
    export interface Req {
      /** id */
      id?: number;
    }
    export type Res = boolean;
  }

  /** 删除智能助理配置 post /interact/manual/delete */
  function postManualDelete(req: ET<PostManualDelete.Req>, options?: object): Promise<ET<PostManualDelete.Res>>;

  export module PostManualInsert {
    export interface Req {
      /** 地区代码列表 */
      locationList?: Array<string>;
      /** 地区代码列表 */
      brandList?: Array<string>;
      /** 自动解答阈值 */
      autoAnswerThreshold?: string;
    }
    export type Res = boolean;
  }

  /** 新增智能助理配置 post /interact/manual/insert */
  function postManualInsert(req: ET<PostManualInsert.Req>, options?: object): Promise<ET<PostManualInsert.Res>>;

  export module GetManualList {
    export type InteractManualDTO = {
      /** id */
      id?: number;
      /** 地区代码 */
      location?: string;
      /** 地区名称 */
      locationName?: string;
      /** 产品维度 */
      brand?: string;
      /** 产品维度名称 */
      brandName?: string;
      /** 自动解答阈值 */
      autoAnswerThreshold?: string;
      /** 创建时间 */
      createTime?: string;
      /** 创建人 */
      creator?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改人名称 */
      lastModifierName?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 地区代码列表 */
      location?: string;
      /** 产品维度列表 */
      brand?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<InteractManualDTO>;
    }
  }

  /** 查询智能助理配置 get /interact/manual/list */
  function getManualList(req: ET<GetManualList.Req>, options?: object): Promise<ET<GetManualList.Res>>;

  export module PostManualUpdate {
    export interface Req {
      /** 配置id */
      id?: number;
      /** 自动解答阈值 */
      autoAnswerThreshold?: string;
    }
    export type Res = boolean;
  }

  /** 修改智能助理配置 post /interact/manual/update */
  function postManualUpdate(req: ET<PostManualUpdate.Req>, options?: object): Promise<ET<PostManualUpdate.Res>>;

  export module PostRobotDelete {
    export interface Req {
      /** id */
      id?: number;
    }
    export type Res = boolean;
  }

  /** 删除机转人人机交互配置 post /interact/robot/delete */
  function postRobotDelete(req: ET<PostRobotDelete.Req>, options?: object): Promise<ET<PostRobotDelete.Res>>;

  export module PostRobotInsert {
    export interface Req {
      /** 地区代码列表 */
      locationList?: Array<string>;
      /** 地区代码列表 */
      brandList?: Array<string>;
      /** 满意度模型阈值 */
      satisfactionModelThreshold?: string;
    }
    export type Res = boolean;
  }

  /** 新增机转人人机交互配置 post /interact/robot/insert */
  function postRobotInsert(req: ET<PostRobotInsert.Req>, options?: object): Promise<ET<PostRobotInsert.Res>>;

  export module GetRobotList {
    export type InteractRobotDTO = {
      /** id */
      id?: number;
      /** 地区代码 */
      location?: string;
      /** 地区名称 */
      locationName?: string;
      /** 产品维度 */
      brand?: string;
      /** 产品维度名称 */
      brandName?: string;
      /** 满意度模型阈值 */
      satisfactionModelThreshold?: string;
      /** 创建时间 */
      createTime?: string;
      /** 创建人 */
      creator?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改人名称 */
      lastModifierName?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 地区代码列表 */
      location?: string;
      /** 产品维度列表 */
      brand?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<InteractRobotDTO>;
    }
  }

  /** 查询机转人人机交互配置 get /interact/robot/list */
  function getRobotList(req: ET<GetRobotList.Req>, options?: object): Promise<ET<GetRobotList.Res>>;

  export module PostRobotUpdate {
    export interface Req {
      /** 配置id */
      id?: number;
      /** 满意度模型阈值 */
      satisfactionModelThreshold?: string;
    }
    export type Res = boolean;
  }

  /** 修改机转人人机交互配置 post /interact/robot/update */
  function postRobotUpdate(req: ET<PostRobotUpdate.Req>, options?: object): Promise<ET<PostRobotUpdate.Res>>;

  export module GetLandingPageDetail {
    export interface Req {
      /** id */
      id: number;
    }
    export interface Res {
      /** 落地页配置id */
      id?: number;
      /** 落地页名称 */
      name?: string;
      /** 落地页类型  0-通用 1-专属 */
      type?: string;
      /** 模板页类型，1:分类页-基础财税，2：分类页-办税咨询，3：分类页-专家财税，4：详情页-专家财税，5：服务页-官方团队,6-首页 */
      modelType?: string;
      /** 是否展示logo，Y展示，N不展示 */
      headerType?: string;
      /** 备注信息 */
      description?: string;
    }
  }

  /** 查询落地页配置信息 get /landingPage/detail */
  function getLandingPageDetail(req: ET<GetLandingPageDetail.Req>, options?: object): Promise<ET<GetLandingPageDetail.Res>>;

  export module GetLandingPageExpertDetail {
    export type ClassifyListDTO = {
      /** 分类类型 */
      type?: string;
      /** 分类列表 */
      list?: Array<ClassifyDTO>;
    };
    export type ServiceWayDTO = {
      /** 服务方式 */
      serviceWay?: string;
      /** 服务地区 */
      locationList?: Array<string>;
      /** 服务时间配置 */
      serviceTimeList?: Array<ServiceTimeDTO>;
    };
    export type ClassifyDTO = {
      /** id : ${分类id} */
      id?: number;
      /** name : ${分类名称} */
      name?: string;
      /** type : ${分类类型} */
      type?: string;
      /** type : ${code} */
      code?: string;
      /** orderNum : ${排序} */
      orderNum?: number;
      /** parentId : ${父级目录id} */
      parentId?: number;
      /** 子节点列表 */
      children?: Array<ClassifyDTO>;
    };
    export type ServiceTimeDTO = {
      /** 服务地区 */
      locationList?: Array<string>;
      /** 服务日期开始 */
      serviceDateBegin?: string;
      /** 服务日期截止 */
      serviceDateEnd?: string;
      /** 服务时间开始，格式 HH:mm */
      serviceTimeBegin?: string;
      /** 服务时间截止，格式 HH:mm */
      serviceTimeEnd?: string;
    };

    export interface Req {
      /** 落地页id */
      businessId: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 专家&机构账号 */
      account?: string;
      /** 专家&机构名称 */
      name?: string;
      /** 头像图片URL */
      headImgUrl?: string;
      /** 头像图片名称 */
      headImgName?: string;
      /** 专家&机构描述 */
      description?: string;
      /** 咨询详情 */
      consultDetail?: string;
      /** 自述 */
      introduction?: string;
      /** 专家类型,0-专家,1-事务所 */
      type?: string;
      /** 优先级 */
      priority?: number;
      /** 专家咨询初始量 */
      consultNumInit?: number;
      /** 分类列表 */
      classifyList?: Array<ClassifyListDTO>;
      /** 咨询量 */
      consultNum?: number;
      /** 审核状态 0-未审核 1审核通过 2-审核未通过 */
      status?: string;
      /** 场景 web-亿企咨询,tool-工具场景,h5-h5专用 */
      scene?: string;
      /** 子场景 member-会员咨询，special-专项咨询 */
      subScene?: string;
      /** 服务类型;1:办税咨询;2:财税实务咨询;3:财税专家咨询;4:专项服务咨询;5:人资咨询;6:专家问诊 */
      consultService?: string;
      /** 好评率 */
      praiseRate?: number;
      /** 服务方式 */
      serviceWayList?: Array<ServiceWayDTO>;
      /** 专家好评率初始量 */
      praiseRateInit?: number;
    }
  }

  /** 查询专家财税详情页配置 get /landingPage/expertDetail */
  function getLandingPageExpertDetail(req: ET<GetLandingPageExpertDetail.Req>, options?: object): Promise<ET<GetLandingPageExpertDetail.Res>>;

  export module GetLandingPageOfficialServiceDetail {
    export interface Req {
      /** 落地页id */
      businessId: number;
    }
    export interface Res {
      /** 官方服务id */
      id?: number;
      /** 官方服务名称 */
      name?: string;
      /** 图片组id */
      imageGroupId?: number;
      /** web图片url */
      imageUrl?: string;
      /** h5图片url */
      mobileImageUrl?: string;
      /** web图片名称 */
      imageUrlName?: string;
      /** h5图片名称 */
      mobileImageName?: string;
      /** 产品维度 */
      brand?: string;
      /** 产品维度名称 */
      brandName?: string;
      /** 【字段弃用】服务类型 0-办税操作咨询，1-财税实务咨询 */
      type?: string;
      /** 场景 */
      scene?: string;
      /** 服务类型名称:办税咨询/基础财税咨询 */
      typeName?: string;
      /** 服务详情简介 */
      description?: string;
      /** 服务类型 1:办税咨询;2:财税实务咨询;3:财税专家咨询;4:专项服务咨询;5:人资咨询;6:专家问诊 */
      consultService?: string;
    }
  }

  /** 官方团队服务页详情 get /landingPage/officialServiceDetail */
  function getLandingPageOfficialServiceDetail(req: ET<GetLandingPageOfficialServiceDetail.Req>, options?: object): Promise<ET<GetLandingPageOfficialServiceDetail.Res>>;

  export module GetLandingPageQuery {
    export type LandingPageDTO = {
      /** 落地页配置id */
      id?: number;
      /** 落地页名称 */
      name?: string;
      /** 落地页类型  0-通用 1-专属 */
      type?: string;
      /** 是否展示logo，Y展示，N不展示 */
      headerType?: string;
      /** 模板页类型，1:分类页-基础财税，2：分类页-办税咨询，3：分类页-专家财税，4：详情页-专家财税，5：服务页-官方团队,6-首页 */
      modelType?: string;
      /** 备注信息 */
      description?: string;
      /** 创建者 */
      creator?: string;
      /** 创建人姓名 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改人姓名 */
      lastModifierName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };

    export interface Req {
      /** 落地页类型,0-通用 1-专属 */
      name?: string;
      /** 落地页名称 */
      type?: string;
      /** 模板页类型，1:分类页-办税咨询，2：分类页-基础财税，3：分类页-专家财税，4：详情页-专家财税，5：服务页-官方团队，6：首页，7：服务页-专家&机构 */
      modelType?: string;
      /** 是否展示logo，Y展示，N不展示 */
      headerType?: string;
      /** 最后修改时间起yyyy-MM-dd */
      modifyTimeFrom?: string;
      /** 最后修改时间止yyyy-MM-dd */
      modifyTimeTo?: string;
      /** 分页页码 */
      pageIndex?: number;
      /** 分页大小 */
      pageSize?: number;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<LandingPageDTO>;
    }
  }

  /** 查询落地页配置列表 get /landingPage/query */
  function getLandingPageQuery(req: ET<GetLandingPageQuery.Req>, options?: object): Promise<ET<GetLandingPageQuery.Res>>;

  export module PostLandingPageSave {
    export type BannerImageComponentSaveDTO = {
      /** 图片名称 */
      imageName?: string;
      /** 图片url */
      imageUrl?: string;
      /** 展示顺序 */
      orderNum?: number;
      /** 跳转页面类型 0-不跳转;1-落地页;2-外部链接 */
      jumpType?: string;
      /** 业务id-落地页id */
      jumpBusinessId?: number;
      /** 外部链接 */
      jumpUrl?: string;
      /** 跳转链接名称 */
      jumpUrlName?: string;
    };
    export type HomeComponentSaveDTO = {
      /** 筛选栏位置，0：中间栏；1：右侧栏1；2：右侧栏2；3：右侧栏3 */
      location?: string;
      /** 展示顺序 */
      orderNum?: number;
      /** 未选中状态的图片url */
      uncheckedImageUrl?: string;
      /** 选中状态的图片url */
      checkedImageUrl?: string;
      /** 跳转页面类型 0-不跳转;1-落地页;2-外部链接 */
      jumpType?: string;
      /** 业务id-落地页id */
      jumpBusinessId?: number;
      /** 外部链接 */
      jumpUrl?: string;
    };
    export type FilterBarComponentSaveDTO = {
      /** 分类类型 0：咨询范围 1：擅长行业 2：咨询地区 3：服务方式 */
      type?: string;
      /** 筛选栏位置，0：中间栏；1：右侧栏1；2：右侧栏2；3：右侧栏3 */
      location?: string;
      /** 筛选栏名称 */
      name?: string;
      /** 分类id列表 */
      idList?: Array<number>;
    };

    export interface Req {
      /** 落地页名称，落地页名称不能重复，长度不能超过20个字 */
      name?: string;
      /** 落地页类型  0-通用 1-专属 */
      type?: string;
      /** 模板页类型，1:分类页-基础财税，2：分类页-办税咨询，3：分类页-专家财税，4：详情页-专家财税，5：服务页-官方团队,6-首页，7:服务页-专家 */
      modelType?: string;
      /** 备注信息，长度不能超过100个字 */
      description?: string;
      /** 是否展示logo，Y展示，N不展示 */
      headerType?: string;
      /** banner图列表 */
      bannerImageList?: Array<BannerImageComponentSaveDTO>;
      /** 首页模块信息列表 */
      homeModuleInfoList?: Array<HomeComponentSaveDTO>;
      /** 分类信息 */
      classifyInfoList?: Array<FilterBarComponentSaveDTO>;
      /** 服务id列表，modelType=1、2、5时为官方服务id，modelType=4时为专家服务id */
      serviceIdList?: Array<number>;
    }
    export interface Res {
      /** id */
      id?: number;
    }
  }

  /** 保存落地页配置信息 post /landingPage/save */
  function postLandingPageSave(req: ET<PostLandingPageSave.Req>, options?: object): Promise<ET<PostLandingPageSave.Res>>;

  export module GetLandingPageSimpleList {
    export type LandingPageSimpleDTO = {
      /** 落地页配置id */
      id?: number;
      /** 落地页类型,0-通用 1-专属 */
      type?: string;
      /** 落地页名称 */
      name?: string;
    };

    export interface Req {
      /** 落地页类型 */
      type: string;
    }
    export type Res = Array<LandingPageSimpleDTO>;
  }

  /** 查询落地页配置列表，只返回id和name，下拉框用 get /landingPage/simpleList */
  function getLandingPageSimpleList(req: ET<GetLandingPageSimpleList.Req>, options?: object): Promise<ET<GetLandingPageSimpleList.Res>>;

  export module PostLandingPageUpdate {
    export type BannerImageComponentSaveDTO = {
      /** 图片名称 */
      imageName?: string;
      /** 图片url */
      imageUrl?: string;
      /** 展示顺序 */
      orderNum?: number;
      /** 跳转页面类型 0-不跳转;1-落地页;2-外部链接 */
      jumpType?: string;
      /** 业务id-落地页id */
      jumpBusinessId?: number;
      /** 外部链接 */
      jumpUrl?: string;
      /** 跳转链接名称 */
      jumpUrlName?: string;
    };
    export type HomeComponentSaveDTO = {
      /** 筛选栏位置，0：中间栏；1：右侧栏1；2：右侧栏2；3：右侧栏3 */
      location?: string;
      /** 展示顺序 */
      orderNum?: number;
      /** 未选中状态的图片url */
      uncheckedImageUrl?: string;
      /** 选中状态的图片url */
      checkedImageUrl?: string;
      /** 跳转页面类型 0-不跳转;1-落地页;2-外部链接 */
      jumpType?: string;
      /** 业务id-落地页id */
      jumpBusinessId?: number;
      /** 外部链接 */
      jumpUrl?: string;
    };
    export type FilterBarComponentSaveDTO = {
      /** 分类类型 0：咨询范围 1：擅长行业 2：咨询地区 3：服务方式 */
      type?: string;
      /** 筛选栏位置，0：中间栏；1：右侧栏1；2：右侧栏2；3：右侧栏3 */
      location?: string;
      /** 筛选栏名称 */
      name?: string;
      /** 分类id列表 */
      idList?: Array<number>;
    };

    export interface Req {
      /** 落地页名称，落地页名称不能重复，长度不能超过20个字 */
      name?: string;
      /** 落地页类型  0-通用 1-专属 */
      type?: string;
      /** 模板页类型，1:分类页-基础财税，2：分类页-办税咨询，3：分类页-专家财税，4：详情页-专家财税，5：服务页-官方团队,6-首页，7:服务页-专家 */
      modelType?: string;
      /** 备注信息，长度不能超过100个字 */
      description?: string;
      /** 是否展示logo，Y展示，N不展示 */
      headerType?: string;
      /** banner图列表 */
      bannerImageList?: Array<BannerImageComponentSaveDTO>;
      /** 首页模块信息列表 */
      homeModuleInfoList?: Array<HomeComponentSaveDTO>;
      /** 分类信息 */
      classifyInfoList?: Array<FilterBarComponentSaveDTO>;
      /** 服务id列表，modelType=1、2、5时为官方服务id，modelType=4时为专家服务id */
      serviceIdList?: Array<number>;
      /** 落地页id */
      id?: number;
    }
    export type Res = boolean;
  }

  /** 修改落地页配置信息 post /landingPage/update */
  function postLandingPageUpdate(req: ET<PostLandingPageUpdate.Req>, options?: object): Promise<ET<PostLandingPageUpdate.Res>>;

  export module PostOfficialServiceBatchDelete {
    export interface Req {
      /** 官方服务id列表 */
      idList: Array<number>;
    }
    export type Res = boolean;
  }

  /** 批量删除官方服务 post /officialService/batchDelete */
  function postOfficialServiceBatchDelete(req: ET<PostOfficialServiceBatchDelete.Req>, options?: object): Promise<ET<PostOfficialServiceBatchDelete.Res>>;

  export module GetOfficialServiceDetail {
    export interface Req {
      /** 官方服务id */
      id: number;
    }
    export interface Res {
      /** 官方服务id */
      id?: number;
      /** 官方服务名称 */
      name?: string;
      /** 图片组id */
      imageGroupId?: number;
      /** web图片url */
      imageUrl?: string;
      /** h5图片url */
      mobileImageUrl?: string;
      /** web图片名称 */
      imageUrlName?: string;
      /** h5图片名称 */
      mobileImageName?: string;
      /** 产品维度 */
      brand?: string;
      /** 产品维度名称 */
      brandName?: string;
      /** 【字段弃用】服务类型 0-办税操作咨询，1-财税实务咨询 */
      type?: string;
      /** 场景 */
      scene?: string;
      /** 服务类型名称:办税咨询/基础财税咨询 */
      typeName?: string;
      /** 服务详情简介 */
      description?: string;
      /** 服务类型 1:办税咨询;2:财税实务咨询;3:财税专家咨询;4:专项服务咨询;5:人资咨询;6:专家问诊 */
      consultService?: string;
    }
  }

  /** 官方服务详情查询 get /officialService/detail */
  function getOfficialServiceDetail(req: ET<GetOfficialServiceDetail.Req>, options?: object): Promise<ET<GetOfficialServiceDetail.Res>>;

  export module GetOfficialServiceList {
    export type OfficialServiceDetailDTO = {
      /** 官方服务id */
      id?: number;
      /** 官方服务名称 */
      name?: string;
      /** 图片组id */
      imageGroupId?: number;
      /** web图片url */
      imageUrl?: string;
      /** h5图片url */
      mobileImageUrl?: string;
      /** web图片名称 */
      imageUrlName?: string;
      /** h5图片名称 */
      mobileImageName?: string;
      /** 产品维度 */
      brand?: string;
      /** 产品维度名称 */
      brandName?: string;
      /** 【字段弃用】服务类型 0-办税操作咨询，1-财税实务咨询 */
      type?: string;
      /** 场景 */
      scene?: string;
      /** 服务类型名称:办税咨询/基础财税咨询 */
      typeName?: string;
      /** 服务详情简介 */
      description?: string;
      /** 服务类型 1:办税咨询;2:财税实务咨询;3:财税专家咨询;4:专项服务咨询;5:人资咨询;6:专家问诊 */
      consultService?: string;
    };

    export interface Req {
      /** 官方服务名称 */
      name?: string;
      /** 【该字段弃用】服务类型 0-办税操作咨询，1-财税实务咨询，英文逗号分隔 */
      type?: string;
      /** 服务类型 1:办税咨询;2:财税实务咨询;3:财税专家咨询;4:专项服务咨询;5:人资咨询;6:专家问诊 */
      consultService: string;
      /** 咨询类别 0-办税咨询，1-实务咨询TODO 原有的数据怎么兼容处理 */
      consultType: string;
      /** 场景 */
      scene?: string;
      /** 产品维度（code） */
      brand?: string;
      /** 不包含的官方服务id列表，英文逗号分隔 */
      excludeIdList?: string;
      /** 页码 */
      pageIndex?: number;
      /** 页大小 */
      pageSize?: number;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<OfficialServiceDetailDTO>;
    }
  }

  /** 官方服务列表查询 get /officialService/list */
  function getOfficialServiceList(req: ET<GetOfficialServiceList.Req>, options?: object): Promise<ET<GetOfficialServiceList.Res>>;

  export module PostOfficialServiceSave {
    export interface Req {
      /** 官方服务名称 */
      name: string;
      /** web图片url */
      imageUrl: string;
      /** h5图片url，在服务类型为：财税实务咨询，并且场景为：web的情况下，该字段必填 */
      mobileImageUrl?: string;
      /** web图片名称 */
      imageUrlName: string;
      /** h5图片名称，在服务类型为：财税实务咨询，并且场景为：web的情况下，该字段必填 */
      mobileImageName?: string;
      /** 产品维度 */
      brand: string;
      /** 服务类型 0-办税操作咨询，1-财税实务咨询服务类型下拉框名称调整为咨询类别，下拉框内容中基础财税调整为实务咨询（仅仅是名称调整）咨询类别字段作用不变，仍是作为网站、落地页过滤卡片用 */
      type: string;
      /** 服务类型TAX_INQUIRY:办税咨询,FIN_TAX_INQUIRY:财税实务咨询 FIN_TAX_EXP_INQUIRY:财税专家咨询SPECIAL:专项服务咨询 HUMAN_RESORCES:人资实务咨询 INQUIRY:专家问诊 */
      consultService: string;
      /** 服务详情简介 */
      description: string;
      /** 场景 */
      scene: string;
    }
    export interface Res {
      /** id */
      id?: number;
    }
  }

  /** 新增官方服务 post /officialService/save */
  function postOfficialServiceSave(req: ET<PostOfficialServiceSave.Req>, options?: object): Promise<ET<PostOfficialServiceSave.Res>>;

  export module PostOfficialServiceUpdate {
    export interface Req {
      /** 官方服务名称 */
      name: string;
      /** web图片url */
      imageUrl: string;
      /** h5图片url，在服务类型为：财税实务咨询，并且场景为：web的情况下，该字段必填 */
      mobileImageUrl?: string;
      /** web图片名称 */
      imageUrlName: string;
      /** h5图片名称，在服务类型为：财税实务咨询，并且场景为：web的情况下，该字段必填 */
      mobileImageName?: string;
      /** 产品维度 */
      brand: string;
      /** 服务类型 0-办税操作咨询，1-财税实务咨询服务类型下拉框名称调整为咨询类别，下拉框内容中基础财税调整为实务咨询（仅仅是名称调整）咨询类别字段作用不变，仍是作为网站、落地页过滤卡片用 */
      type: string;
      /** 服务类型TAX_INQUIRY:办税咨询,FIN_TAX_INQUIRY:财税实务咨询 FIN_TAX_EXP_INQUIRY:财税专家咨询SPECIAL:专项服务咨询 HUMAN_RESORCES:人资实务咨询 INQUIRY:专家问诊 */
      consultService: string;
      /** 服务详情简介 */
      description: string;
      /** 场景 */
      scene: string;
      /** 官方服务id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 修改官方服务 post /officialService/update */
  function postOfficialServiceUpdate(req: ET<PostOfficialServiceUpdate.Req>, options?: object): Promise<ET<PostOfficialServiceUpdate.Res>>;

  export module GetLogExport {
    export type Object = any;
    export type ModelMap = {
      head?: Record<string, any>;
      tail?: Record<string, any>;
      accessOrder?: boolean;
      table?: Array<NodeKV>;
      entrySet?: Array<EntryKV>;
      size?: number;
      modCount?: number;
      threshold?: number;
      loadFactor?: number;
      keySet?: Array<K>;
      values?: Array<V>;
    };
    export type NodeKV = any;
    export type EntryKV = any;
    export type K = any;
    export type V = any;

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 咨询时间起 */
      startTime?: string;
      /** 咨询时间止 */
      endTime?: string;
      /** 地区代码列表 */
      locationList?: Array<string>;
      /** 产品维度列表 */
      brandList?: Array<string>;
      /** 机器人服务提供者 */
      robotFlag?: string;
      /** 满意度评价项 */
      services?: string;
      /** 业务类型,已废弃,新版本接口请使用brandTypeId */
      brandType?: string;
      /** 业务类型id */
      brandTypeId?: number;
      /** 满意度评价起始时间 */
      evaluationStartTime?: string;
      /** 满意度评价截止时间 */
      evaluationEndTime?: string;
      /** 会员等级 */
      userType?: string;
      /** 关键字 */
      keyword?: string;
      /** 问题提问方式 */
      questionOriginList?: Array<string>;
      /** 解决情况,Y-已解决，N-未解决，不传查全部 */
      solution?: string;
    }
    export interface Res {
      view?: Object;
      model?: ModelMap;
      cleared?: boolean;
    }
  }

  /** 导出机器人咨询日志 get /robot/log/export */
  function getLogExport(req: ET<GetLogExport.Req>, options?: object): Promise<ET<GetLogExport.Res>>;

  export module GetRobotWdList {
    export type Req = any;
    export type Res = any;
  }

  /** 查询知识库维度列表 get /robot/wdList */
  function getRobotWdList(req?: ET<GetRobotWdList.Req>, options?: object): Promise<ET<GetRobotWdList.Res>>;

  export module GetLogList {
    export type RobotConsultFeedbackLogDTO = {
      /** id */
      id?: number;
      /** sessionId */
      sessionId?: string;
      /** 咨询时间 */
      zxsj?: string;
      /** 税号 */
      yhdm?: string;
      /** 用户名称 */
      yhmc?: string;
      /** 地区 */
      location?: string;
      /** 地区名称 */
      locationName?: string;
      /** 产品维度 */
      brand?: string;
      /** 产品维度名称 */
      brandName?: string;
      /** 会员等级 */
      usertype?: string;
      /** 会员等级名称 */
      usertypeName?: string;
      /** 机器人服务提供者 */
      robotFlag?: string;
      /** 机器人服务提供者名称 */
      robotFlagName?: string;
      /** 关键字 */
      keyword?: string;
      /** 匹配问题 */
      question?: string;
      /** 答案对应的问题 */
      answerQuestion?: string;
      /** 问题匹配相似度 */
      similarity?: string;
      /** 查询结果 */
      result?: string;
      /** 满意度选项 */
      services?: string;
      /** 满意度选项名称 */
      servicesName?: string;
      /** 用户评价内容 */
      comment?: string;
      /** 评价时间 */
      evaluationTime?: string;
      /** 不满意原因 */
      dissatisfiedReason?: string;
      /** 称呼 */
      personalName?: string;
      /** 电话 */
      phone?: string;
      /** 是否解决 */
      solution?: string;
      /** 是否解决名称 */
      solutionName?: string;
      /** 打分 */
      score?: string;
      /** 问题类型 */
      questionType?: string;
      /** 问题提问方式 */
      questionOrigin?: string;
      /** 推荐问题 */
      recommendQuestion?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 咨询时间起 */
      startTime?: string;
      /** 咨询时间止 */
      endTime?: string;
      /** 地区代码列表 */
      locationList?: Array<string>;
      /** 产品维度列表 */
      brandList?: Array<string>;
      /** 机器人服务提供者 */
      robotFlag?: string;
      /** 满意度评价项 */
      services?: string;
      /** 业务类型,已废弃,新版本接口请使用brandTypeId */
      brandType?: string;
      /** 业务类型id */
      brandTypeId?: number;
      /** 满意度评价起始时间 */
      evaluationStartTime?: string;
      /** 满意度评价截止时间 */
      evaluationEndTime?: string;
      /** 会员等级 */
      userType?: string;
      /** 关键字 */
      keyword?: string;
      /** 问题提问方式 */
      questionOriginList?: Array<string>;
      /** 解决情况,Y-已解决，N-未解决，不传查全部 */
      solution?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<RobotConsultFeedbackLogDTO>;
    }
  }

  /** 查询机器人咨询日志 get /robot/log/list */
  function getLogList(req: ET<GetLogList.Req>, options?: object): Promise<ET<GetLogList.Res>>;

  export module GetRobotQuestionDetail {
    export interface Req {
      /** 关键字 */
      question?: string;
      /** 所属地区 */
      location?: string;
      /** 产品 */
      brand?: string;
      /** 用户等级 */
      usertype?: string;
      /** 用户id */
      userId?: string;
    }
    export interface Res {
      /** 问题详情 */
      content?: string;
      /** p4问题详情 */
      p4Content?: string;
      /** p4标题 */
      p4Title?: string;
    }
  }

  /** 查询问题答案 get /robot/questionDetail */
  function getRobotQuestionDetail(req: ET<GetRobotQuestionDetail.Req>, options?: object): Promise<ET<GetRobotQuestionDetail.Res>>;

  export module GetRobotQuestionList {
    export interface Req {
      /** 关键字 */
      question?: string;
      /** 所属地区 */
      location?: string;
      /** 产品 */
      brand?: string;
      /** 用户等级 */
      usertype?: string;
      /** 用户id */
      userId?: string;
    }
    export type Res = Array<string>;
  }

  /** 查询问题列表 get /robot/questionList */
  function getRobotQuestionList(req: ET<GetRobotQuestionList.Req>, options?: object): Promise<ET<GetRobotQuestionList.Res>>;

  export module PostPolicyDelete {
    export interface Req {
      /** 路由策略id */
      id?: number;
    }
    export type Res = boolean;
  }

  /** 删除路由策略 post /route/policy/delete */
  function postPolicyDelete(req: ET<PostPolicyDelete.Req>, options?: object): Promise<ET<PostPolicyDelete.Res>>;

  export module GetPolicyList {
    export type RoutePolicyDetailJO = {
      /** id */
      id?: number;
      /** 策略名称 */
      name?: string;
      /** 备注 */
      remark?: string;
      /** 策略来源渠道列表 */
      channelList?: Array<RoutePolicyChannelJO>;
      /** 创建人名称 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人名称 */
      lastModifierName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };
    export type RoutePolicyChannelJO = {
      /** 来源渠道id */
      id?: number;
      /** 来电渠道名称 */
      name?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 策略名称 */
      name?: string;
      /** 来源渠道 */
      channel?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<RoutePolicyDetailJO>;
    }
  }

  /** 根据策略名称和来源名称查询路由策略 get /route/policy/list */
  function getPolicyList(req: ET<GetPolicyList.Req>, options?: object): Promise<ET<GetPolicyList.Res>>;

  export module GetPolicyDetail {
    export type RoutePolicyChannelJO = {
      /** 来源渠道id */
      id?: number;
      /** 来电渠道名称 */
      name?: string;
    };

    export interface Req {
      id: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 策略名称 */
      name?: string;
      /** 备注 */
      remark?: string;
      /** 策略来源渠道列表 */
      channelList?: Array<RoutePolicyChannelJO>;
      /** 创建人名称 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人名称 */
      lastModifierName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    }
  }

  /** 根据策略名称和来源名称查询路由策略 get /route/policy/detail */
  function getPolicyDetail(req: ET<GetPolicyDetail.Req>, options?: object): Promise<ET<GetPolicyDetail.Res>>;

  export module PostPolicySave {
    export interface Req {
      /** 策略名称 */
      name?: string;
      /** 备注 */
      remark?: string;
      /** 来源渠道id列表 */
      channelList?: Array<string>;
    }
    export interface Res {
      /** 路由策略ID */
      id?: number;
    }
  }

  /** 新增路由策略 post /route/policy/save */
  function postPolicySave(req: ET<PostPolicySave.Req>, options?: object): Promise<ET<PostPolicySave.Res>>;

  export module PostPolicyUpdate {
    export interface Req {
      /** 路由策略id */
      id?: number;
      /** 策略名称 */
      name?: string;
      /** 备注 */
      remark?: string;
      /** 来源渠道id列表 */
      channelList?: Array<string>;
    }
    export type Res = boolean;
  }

  /** 修改路由策略 post /route/policy/update */
  function postPolicyUpdate(req: ET<PostPolicyUpdate.Req>, options?: object): Promise<ET<PostPolicyUpdate.Res>>;

  export module GetRouteRuleChatTipDetail {
    export type RouteRuleWaitingMessageSendConfigJO = {
      /** 消息发送条数 */
      sendNum?: string;
      /** 消息发送提示 */
      sendTip?: string;
    };

    export interface Req {
      ruleId: number;
    }
    export interface Res {
      /** 规则id */
      ruleId?: number;
      /** 配置类型 */
      type?: string;
      /** 对话接通前提示语 */
      beforeChatTip?: string;
      /** 欢迎语 */
      welcomeTip?: string;
      /** 排队提示语 */
      waitingTip?: string;
      /** 忙碌提示语 */
      busyTip?: string;
      /** 黑名单提示语 */
      blacklistTip?: string;
      /** 离线提示语 */
      offlineTip?: string;
      /** 访客长时未回复提示是否开启 */
      visitorNoReplyTipEnable?: string;
      /** 同步提醒坐席是否开启 */
      remindAgentEnable?: string;
      /** 访客未发送消息时间间隔 */
      visitorNoReplyInterval?: string;
      /** 访客未发送消息提示 */
      visitorNoReplyTip?: string;
      /** 访客未发送消息对话结束时间间隔 */
      visitorNoReplyEndInternal?: string;
      /** 访客未发送消息对话结束提示 */
      visitorNoReplyEndTip?: string;
      /** 排队发送消息是否开启 */
      waitingSendMessageEnable?: string;
      /** 排队消息发送条数及提示配置 */
      waitingMessageSendConfigList?: Array<RouteRuleWaitingMessageSendConfigJO>;
      /** 消息发送上限 */
      waitingMessageSendLimit?: string;
      /** 发送消息上限提示 */
      waitingMessageSendLimitTip?: string;
      /** 排队发送消息不开启提示语 */
      disableTip?: string;
      /** 机器人和人工都不启用提示 */
      noServiceTip?: string;
      /** 重连时间间隔 */
      reconnectInterval?: string;
    }
  }

  /** get /route/rule/chatTip/detail */
  function getRouteRuleChatTipDetail(req: ET<GetRouteRuleChatTipDetail.Req>, options?: object): Promise<ET<GetRouteRuleChatTipDetail.Res>>;

  export module PostRuleDelete {
    export interface Req {
      /** 路由规则id */
      id?: number;
    }
    export type Res = boolean;
  }

  /** 删除路由规则 post /route/rule/delete */
  function postRuleDelete(req: ET<PostRuleDelete.Req>, options?: object): Promise<ET<PostRuleDelete.Res>>;

  export module GetRuleDetail {
    export type RuleConditionJO = {
      /** id */
      id?: number;
      /** 规则id */
      ruleId?: number;
      /** 参数code */
      paramCode?: string;
      /** 参数名称 */
      paramName?: string;
      /** 运算类型, 0-等于；1-不等于；2-包含；3-不包含；4-符合任意项；5-不符合任意项 */
      operatorType?: string;
      /** 运算类型名称 */
      operatorTypeName?: string;
      /** 目标值, 多个值英文分号分隔 */
      targetValue?: string;
      /** 目标值名称, 多个值英文分号分隔 */
      targetValueName?: string;
    };

    export interface Req {
      /** 路由规则id */
      id?: number;
    }
    export interface Res {
      /** 规则id */
      id?: number;
      /** 路由策略id */
      policyId?: number;
      /** 规则名称 */
      name?: string;
      /** 备注 */
      remark?: string;
      /** 组id */
      groupId?: number;
      /** 组名称 */
      groupName?: string;
      /** 受理模式 */
      acceptanceMode?: string;
      /** 受理模式名称 */
      acceptanceModeName?: string;
      /** 排序 */
      orderNum?: number;
      /** 规则条件列表 */
      conditionList?: Array<RuleConditionJO>;
      /** 创建人 */
      creator?: string;
      /** 创建人姓名 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人姓名 */
      lastModifier?: string;
      /** 最后修改人 */
      lastModifierName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    }
  }

  /** 查询路由规则详情 get /route/rule/detail */
  function getRuleDetail(req: ET<GetRuleDetail.Req>, options?: object): Promise<ET<GetRuleDetail.Res>>;

  export module GetRouteRuleFeedbackDetail {
    export type FeedbackEvaluationDTO = {
      /** 评价模块是否展示.Y/N */
      evaluationEnable?: string;
      /** 评价模块展示顺序.0-9 */
      evaluationOrder?: number;
      /** 满意度选项。每项最长20字 */
      feedbackOptionList?: Array<string>;
      /** 是否采集不满意用户信息。Y/N */
      userInfoEnable?: string;
      /** 用户信息项 */
      userInfoOptionList?: Array<string>;
      /** 用户不满意信息采集引导语。最长200字 */
      userInfoTip?: string;
      /** 是否采集不满意度原因。Y/N */
      dissatisfiedReasonEnable?: string;
      /** 是否支持访客多选。Y/N */
      dissatisfiedReasonMultipleEnable?: string;
      /** 采集不满意原因引导语.200字 */
      dissatisfiedReasonTip?: string;
      /** 不满意原因选项。每项最长20字 */
      dissatisfiedReasonOptionList?: Array<string>;
    };
    export type FeedbackSolutionDTO = {
      /** 解决模块是否展示.Y/N */
      solutionEnable?: string;
      /** 解决模块展示顺序.0-9 */
      solutionOrder?: number;
      /** 解决模块的引导语.最多200字 */
      solutionTip?: string;
      /** 解决项展示内容.最多20字 */
      solutionOptionYesContent?: string;
      /** 未解决项展示内容.最多20字 */
      solutionOptionNoContent?: string;
      /** 解决项是否必填.Y/N */
      solutionOptionRequired?: string;
    };
    export type FeedbackScoreDTO = {
      /** 打分模块是否开启.Y/N */
      scoreEnable?: string;
      /** 打分模块展示顺序.0-9 */
      scoreOrder?: number;
      /** 打分模块提示语,最多200字 */
      scoreTip?: string;
    };
    export type FeedbackCustomQuestionDTO = {
      /** 自定义问题模块是否开启，Y/N */
      customQuestionEnable?: string;
      /** 自定义问题模块展示顺序，0-9 */
      customQuestionOrder?: number;
      /** 展示问题数 */
      displayNum?: number;
      /** 自定义问题列表 */
      questionList?: Array<QuestionDTO>;
    };
    export type QuestionDTO = {
      /** 问题描述 */
      questionTip?: string;
      /** 问题选项 */
      questionOptionList?: Array<string>;
      /** 是否支持访客多选。Y/N */
      multipleEnable?: string;
      /** 是否必填.Y/N */
      solutionOptionRequired?: string;
    };

    export interface Req {
      /** 路由规则id */
      ruleId: number;
    }
    export interface Res {
      /** 路由规则id */
      ruleId?: number;
      /** 配置类型，0-全局配置；1-差异化配置 */
      type?: string;
      /** 评价模块 */
      evaluation?: FeedbackEvaluationDTO;
      /** 解决模块 */
      solution?: FeedbackSolutionDTO;
      /** 打分模块 */
      score?: FeedbackScoreDTO;
      /** 自定义问题模块 */
      customQuestion?: FeedbackCustomQuestionDTO;
      /** 创建人名称 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人名称 */
      lastModifierName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    }
  }

  /** 查询路由规则满意度评价配置详情 get /route/rule/feedback/detail */
  function getRouteRuleFeedbackDetail(req: ET<GetRouteRuleFeedbackDetail.Req>, options?: object): Promise<ET<GetRouteRuleFeedbackDetail.Res>>;

  export module GetRouteRuleInteractDetail {
    export type AutoCustomerServiceJO = {
      /** 自动转人工是否开启 */
      enable?: string;
      /** 多轮对话转人工开关 */
      multiRoundsEnable?: string;
      /** 多轮对话发言次数 */
      multiRoundsCount?: string;
      /** 多轮对话提示语 */
      multiRoundsTip?: string;
    };

    export interface Req {
      ruleId: number;
    }
    export interface Res {
      /** 规则id */
      ruleId?: number;
      /** 配置类型 */
      type?: string;
      /** 猜你想问是否开启 */
      guessQuestionEnable?: string;
      /** 猜你想问提示语 */
      guessQuestionTip?: string;
      /** 智能联想是否开启 */
      intelligentSuggestEnable?: string;
      /** 智能助理是否开启 */
      intelligentAssistantEnable?: string;
      /** 自动转人工配置 */
      autoCustomerService?: AutoCustomerServiceJO;
    }
  }

  /** get /route/rule/interact/detail */
  function getRouteRuleInteractDetail(req: ET<GetRouteRuleInteractDetail.Req>, options?: object): Promise<ET<GetRouteRuleInteractDetail.Res>>;

  export module GetRuleList {
    export type RoutePolicyJO = {
      /** 策略id */
      id?: number;
      /** 策略名称 */
      name?: string;
      /** 路由规则列表 */
      ruleList?: Array<RouteRuleJO>;
    };
    export type RouteRuleJO = {
      /** 规则id */
      id?: number;
      /** 路由策略id */
      policyId?: number;
      /** 规则名称 */
      name?: string;
      /** 备注 */
      remark?: string;
      /** 组id */
      groupId?: number;
      /** 组名称 */
      groupName?: string;
      /** 受理模式 */
      acceptanceMode?: string;
      /** 受理模式名称 */
      acceptanceModeName?: string;
      /** 排序 */
      orderNum?: number;
      /** 规则条件列表 */
      conditionList?: Array<RuleConditionJO>;
      /** 创建人 */
      creator?: string;
      /** 创建人姓名 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人姓名 */
      lastModifier?: string;
      /** 最后修改人 */
      lastModifierName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };
    export type RuleConditionJO = {
      /** id */
      id?: number;
      /** 规则id */
      ruleId?: number;
      /** 参数code */
      paramCode?: string;
      /** 参数名称 */
      paramName?: string;
      /** 运算类型, 0-等于；1-不等于；2-包含；3-不包含；4-符合任意项；5-不符合任意项 */
      operatorType?: string;
      /** 运算类型名称 */
      operatorTypeName?: string;
      /** 目标值, 多个值英文分号分隔 */
      targetValue?: string;
      /** 目标值名称, 多个值英文分号分隔 */
      targetValueName?: string;
    };

    export interface Req {
      /** 路由策略名称（模糊查询） */
      policyName?: string;
      /** 策略适用渠道 */
      channel?: string;
      /** 组id列表 */
      groupIdList?: Array<number>;
      /** 策略名称 */
      ruleName?: string;
      /** 受理模式 */
      acceptanceMode?: string;
      /** 自动转人工是否启用。Y-启用；N-不启用 */
      autoCustomerServiceEnable?: string;
      /** 智能助理是否启用。Y-启用；N-不启用 */
      intelligentAssistantEnable?: string;
    }
    export type Res = Array<RoutePolicyJO>;
  }

  /** 查询路由规则列表 get /route/rule/list */
  function getRuleList(req: ET<GetRuleList.Req>, options?: object): Promise<ET<GetRuleList.Res>>;

  export module PostRuleSave {
    export type RouteRuleConditionJO = {
      /** 参数code */
      paramCode?: string;
      /** 运算类型 */
      operatorType?: string;
      /** 目标值 */
      targetValue?: string;
    };

    export interface Req {
      /** 路由策略id */
      policyId?: number;
      /** 规则名称 */
      name?: string;
      /** 备注 */
      remark?: string;
      /** 组id */
      groupId?: number;
      /** 受理模式 */
      acceptanceMode?: string;
      /** 路由规则条件列表 */
      conditionList?: Array<RouteRuleConditionJO>;
    }
    export interface Res {
      /** 规则id */
      ruleId?: number;
    }
  }

  /** 保存路由规则 post /route/rule/save */
  function postRuleSave(req: ET<PostRuleSave.Req>, options?: object): Promise<ET<PostRuleSave.Res>>;

  export module PostRouteRuleChatTipSave {
    export type RouteRuleWaitingMessageSendConfigJO = {
      /** 消息发送条数 */
      sendNum?: string;
      /** 消息发送提示 */
      sendTip?: string;
    };

    export interface Req {
      /** 规则id */
      ruleId?: number;
      /** 配置类型 */
      type?: string;
      /** 对话接通前提示语 */
      beforeChatTip?: string;
      /** 欢迎语 */
      welcomeTip?: string;
      /** 排队提示语 */
      waitingTip?: string;
      /** 忙碌提示语 */
      busyTip?: string;
      /** 黑名单提示语 */
      blacklistTip?: string;
      /** 离线提示语 */
      offlineTip?: string;
      /** 访客长时未回复提示是否开启 */
      visitorNoReplyTipEnable?: string;
      /** 同步提醒坐席是否开启 */
      remindAgentEnable?: string;
      /** 访客未发送消息时间间隔 */
      visitorNoReplyInterval?: string;
      /** 访客未发送消息提示 */
      visitorNoReplyTip?: string;
      /** 访客未发送消息对话结束时间间隔 */
      visitorNoReplyEndInternal?: string;
      /** 访客未发送消息对话结束提示 */
      visitorNoReplyEndTip?: string;
      /** 排队发送消息是否开启 */
      waitingSendMessageEnable?: string;
      /** 排队消息发送条数及提示配置 */
      waitingMessageSendConfigList?: Array<RouteRuleWaitingMessageSendConfigJO>;
      /** 消息发送上限 */
      waitingMessageSendLimit?: string;
      /** 发送消息上限提示 */
      waitingMessageSendLimitTip?: string;
      /** 排队发送消息不开启提示语 */
      disableTip?: string;
      /** 机器人和人工都不启用提示 */
      noServiceTip?: string;
      /** 重连时间间隔 */
      reconnectInterval?: string;
    }
    export type Res = boolean;
  }

  /** post /route/rule/chatTip/save */
  function postRouteRuleChatTipSave(req: ET<PostRouteRuleChatTipSave.Req>, options?: object): Promise<ET<PostRouteRuleChatTipSave.Res>>;

  export module PostRouteRuleFeedbackSave {
    export type FeedbackEvaluationDTO = {
      /** 评价模块是否展示.Y/N */
      evaluationEnable?: string;
      /** 评价模块展示顺序.0-9 */
      evaluationOrder?: number;
      /** 满意度选项。每项最长20字 */
      feedbackOptionList?: Array<string>;
      /** 是否采集不满意用户信息。Y/N */
      userInfoEnable?: string;
      /** 用户信息项 */
      userInfoOptionList?: Array<string>;
      /** 用户不满意信息采集引导语。最长200字 */
      userInfoTip?: string;
      /** 是否采集不满意度原因。Y/N */
      dissatisfiedReasonEnable?: string;
      /** 是否支持访客多选。Y/N */
      dissatisfiedReasonMultipleEnable?: string;
      /** 采集不满意原因引导语.200字 */
      dissatisfiedReasonTip?: string;
      /** 不满意原因选项。每项最长20字 */
      dissatisfiedReasonOptionList?: Array<string>;
    };
    export type FeedbackSolutionDTO = {
      /** 解决模块是否展示.Y/N */
      solutionEnable?: string;
      /** 解决模块展示顺序.0-9 */
      solutionOrder?: number;
      /** 解决模块的引导语.最多200字 */
      solutionTip?: string;
      /** 解决项展示内容.最多20字 */
      solutionOptionYesContent?: string;
      /** 未解决项展示内容.最多20字 */
      solutionOptionNoContent?: string;
      /** 解决项是否必填.Y/N */
      solutionOptionRequired?: string;
    };
    export type FeedbackScoreDTO = {
      /** 打分模块是否开启.Y/N */
      scoreEnable?: string;
      /** 打分模块展示顺序.0-9 */
      scoreOrder?: number;
      /** 打分模块提示语,最多200字 */
      scoreTip?: string;
    };
    export type FeedbackCustomQuestionDTO = {
      /** 自定义问题模块是否开启，Y/N */
      customQuestionEnable?: string;
      /** 自定义问题模块展示顺序，0-9 */
      customQuestionOrder?: number;
      /** 展示问题数 */
      displayNum?: number;
      /** 自定义问题列表 */
      questionList?: Array<QuestionDTO>;
    };
    export type QuestionDTO = {
      /** 问题描述 */
      questionTip?: string;
      /** 问题选项 */
      questionOptionList?: Array<string>;
      /** 是否支持访客多选。Y/N */
      multipleEnable?: string;
      /** 是否必填.Y/N */
      solutionOptionRequired?: string;
    };

    export interface Req {
      /** 路由规则id */
      ruleId?: number;
      /** 配置类型，0-全局配置；1-差异化配置 */
      type?: string;
      /** 评价模块 */
      evaluation?: FeedbackEvaluationDTO;
      /** 解决模块 */
      solution?: FeedbackSolutionDTO;
      /** 打分模块 */
      score?: FeedbackScoreDTO;
      /** 自定义问题模块 */
      customQuestion?: FeedbackCustomQuestionDTO;
    }
    export type Res = boolean;
  }

  /** 保存路由规则满意度评价配置 post /route/rule/feedback/save */
  function postRouteRuleFeedbackSave(req: ET<PostRouteRuleFeedbackSave.Req>, options?: object): Promise<ET<PostRouteRuleFeedbackSave.Res>>;

  export module PostRouteRuleInteractSave {
    export type AutoCustomerServiceJO = {
      /** 自动转人工是否开启 */
      enable?: string;
      /** 多轮对话转人工开关 */
      multiRoundsEnable?: string;
      /** 多轮对话发言次数 */
      multiRoundsCount?: string;
      /** 多轮对话提示语 */
      multiRoundsTip?: string;
    };

    export interface Req {
      /** 规则id */
      ruleId?: number;
      /** 配置类型 */
      type?: string;
      /** 猜你想问是否开启 */
      guessQuestionEnable?: string;
      /** 猜你想问提示语 */
      guessQuestionTip?: string;
      /** 智能联想是否开启 */
      intelligentSuggestEnable?: string;
      /** 智能助理是否开启 */
      intelligentAssistantEnable?: string;
      /** 自动转人工配置 */
      autoCustomerService?: AutoCustomerServiceJO;
    }
    export type Res = boolean;
  }

  /** post /route/rule/interact/save */
  function postRouteRuleInteractSave(req: ET<PostRouteRuleInteractSave.Req>, options?: object): Promise<ET<PostRouteRuleInteractSave.Res>>;

  export module PostWindowSave {
    export interface Req {
      /** 规则id */
      ruleId?: number;
      /** 配置类型，0-全局配置；1—自定义配置 */
      type?: string;
      /** 窗口名称 */
      name?: string;
      /** 跑马灯 */
      carousel?: string;
      /** 跑马灯是否滚动显示 */
      carouselSlideEnable?: string;
      /** LOGO图片url，相对地址 */
      logoImageUrl?: string;
      /** 广告类型，0-图片；1-轮播图 */
      adType?: string;
      /** 广告地址，图片是相对地址；轮播图是完整地址 */
      adUrl?: string;
      /** 广告图跳转链接 */
      adJumpUrl?: string;
      /** 轮播图配置id */
      sliderImageId?: number;
      /** 转人工按钮是否显示 */
      customerServiceButtonEnable?: string;
      /** 工具栏配置项，0-字体，1-表情、2-截屏、3-文件发送、4-保存记录，5-声音 */
      toolbar?: Array<string>;
      /** 创建人 */
      creator?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改人名称 */
      lastModifierName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    }
    export type Res = boolean;
  }

  /** 保存路由规则窗口界面 post /route/rule/window/save */
  function postWindowSave(req: ET<PostWindowSave.Req>, options?: object): Promise<ET<PostWindowSave.Res>>;

  export module PostRuleSort {
    export interface Req {
      /** 路由规则id */
      id?: number;
      /** 调整后的排序值 */
      targetOrderNum?: number;
    }
    export type Res = boolean;
  }

  /** 调整路由规则排序 post /route/rule/sort */
  function postRuleSort(req: ET<PostRuleSort.Req>, options?: object): Promise<ET<PostRuleSort.Res>>;

  export module PostRuleUpdate {
    export type RouteRuleConditionDTO = {
      /** 参数code */
      paramCode?: string;
      /** 运算类型 */
      operatorType?: string;
      /** 目标值 */
      targetValue?: string;
    };

    export interface Req {
      /** 规则id */
      id?: number;
      /** 规则名称 */
      name?: string;
      /** 备注 */
      remark?: string;
      /** 组id */
      groupId?: number;
      /** 受理模式 */
      acceptanceMode?: string;
      /** 路由规则条件列表 */
      conditionList?: Array<RouteRuleConditionDTO>;
    }
    export type Res = boolean;
  }

  /** post /route/rule/update */
  function postRuleUpdate(req: ET<PostRuleUpdate.Req>, options?: object): Promise<ET<PostRuleUpdate.Res>>;

  export module GetRouteRuleWindowDetail {
    export interface Req {
      /** 路由规则id */
      ruleId: number;
    }
    export interface Res {
      /** 规则id */
      ruleId?: number;
      /** 配置类型，0-全局配置；1—自定义配置 */
      type?: string;
      /** 窗口名称 */
      name?: string;
      /** 跑马灯 */
      carousel?: string;
      /** 跑马灯是否滚动显示 */
      carouselSlideEnable?: string;
      /** LOGO图片url，相对地址 */
      logoImageUrl?: string;
      /** 广告类型，0-图片；1-轮播图 */
      adType?: string;
      /** 广告地址，图片是相对地址；轮播图是完整地址 */
      adUrl?: string;
      /** 广告图跳转链接 */
      adJumpUrl?: string;
      /** 轮播图配置id */
      sliderImageId?: number;
      /** 转人工按钮是否显示 */
      customerServiceButtonEnable?: string;
      /** 工具栏配置项，0-字体，1-表情、2-截屏、3-文件发送、4-保存记录，5-声音 */
      toolbar?: Array<string>;
      /** 创建人 */
      creator?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改人名称 */
      lastModifierName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    }
  }

  /** 查询路由规则窗口界面详情 get /route/rule/window/detail */
  function getRouteRuleWindowDetail(req: ET<GetRouteRuleWindowDetail.Req>, options?: object): Promise<ET<GetRouteRuleWindowDetail.Res>>;

  export module GetChatTipDetail {
    export type ChatTipAutoReplyDTO = {
      /** 类型 0-公司统一设置;1-客服自行设置 */
      type?: string;
    };
    export type ChatTipCustomerServiceDTO = {
      /** 机器人转人工排队提示是否开启 */
      waitingTipEnable?: string;
      /** 提示并确认是否转人工的转人工排队人数 */
      waitingTipCount?: string;
      /** 高排队请求人工限制提示是否开启 */
      busyLimitTipEnable?: string;
      /** 排队人数超过该值后请求人工时会提示 */
      busyLimitCount?: string;
      /** 高排队请求人工限制提示 */
      busyLimitTip?: string;
      /** 请求人工限制是否开启 */
      limitEnable?: string;
      /** 请求人工限制时间段 */
      limitInterval?: string;
      /** 请求人工限制次数 */
      limitCount?: string;
      /** 请求人工限制时长 */
      limitDuration?: string;
      /** 请求人工限制提示语 */
      limitTip?: string;
      /** 排队提示语 */
      waitingTip?: string;
      /** 忙碌提示语 */
      busyTip?: string;
      /** 欢迎语 */
      welcomeTip?: string;
      /** 对话接通前提示语 */
      beforeChatTip?: string;
      /** 黑名单提示语 */
      blacklistTip?: string;
      /** 非工作时间提示语 */
      nonWorkingTimeTip?: string;
      /** 离线提示语 */
      offlineTip?: string;
      /** 访问限制提示语 */
      visitLimitTip?: string;
      /** 排队发送消息 */
      waitingMessage?: ChatTipCustomerServiceWaitingMessageDTO;
      /** 重连时间 */
      reconnectInterval?: string;
    };
    export type ChatTipConfigDTO = {
      /** 刷屏配置 */
      spam?: ChatTipSpamDTO;
      /** 访客未回复配置 */
      visitorNoReply?: ChatTipVisitorNoReplyDTO;
      /** 关注提醒配置 */
      attention?: ChatTipAttentionDTO;
      /** 坐席超时配置 */
      agentTimeout?: ChatTipAgentTimeoutDTO;
      /** 对话时长配置 */
      chatDuration?: ChatTipChatDurationDTO;
    };
    export type ChatTipSensitiveWordDTO = {
      /** 访客敏感词配置 */
      visitor?: ChatTipSensitiveWordConfigDTO;
      /** 坐席敏感词配置 */
      agent?: ChatTipSensitiveWordConfigDTO;
    };
    export type ChatTipChatHoldDTO = {
      /** pc端对话保持配置 */
      pc?: ChatTipChatHoldConfigDTO;
      /** 手机端对话保持配置 */
      mobile?: ChatTipChatHoldConfigDTO;
    };
    export type ChatTipOperateTipDTO = {
      /** 对话转接提示语 */
      chatTransferTip?: string;
      /** 对话插入提示语 */
      chatInsertTip?: string;
      /** 对话拦截提示语 */
      chatHoldTip?: string;
      /** 对话协同提示语 */
      chatJoinTip?: string;
      /** 客服主动结束提示语 */
      agentCloseTip?: string;
    };
    export type ChatTipActiveMessageDTO = {
      /** 主动消息模板 */
      template?: string;
      /** 离线消息超时是否开启 */
      offlineMessageTimeoutEnable?: string;
      /** 离线消息时间间隔 */
      offlineMessageInterval?: string;
    };
    export type ChatTipCustomerServiceWaitingMessageDTO = {
      /** 对话保持是否开启 */
      enable?: string;
      /** 发送消息上限 */
      sendLimit?: string;
      /** 发送消息上限提示 */
      sendLimitTip?: string;
      /** 排队消息发送配置列表 */
      configList?: Array<ChatTipCustomerServiceWaitingMessageConfigDTO>;
      /** 排队发送消息不开启提示语 */
      disableTip?: string;
    };
    export type ChatTipSpamDTO = {
      /** 对话保持是否开启 */
      enable?: string;
      /** 一分钟内消息发送条数 */
      count?: string;
      /** 访客敏感词提示语 */
      tip?: string;
    };
    export type ChatTipVisitorNoReplyDTO = {
      /** 坐席超时提醒是否开启 */
      tipEnable?: string;
      /** 同步提醒坐席是否开启 */
      remindAgentEnable?: string;
      /** 坐席超时时间间隔 */
      interval?: string;
      /** 访客敏感词提示语 */
      tip?: string;
      /** 访客未发送消息对话结束时间间隔 */
      endInternal?: string;
      /** 访客未发送消息对话结束消息提示 */
      endTip?: string;
    };
    export type ChatTipAttentionDTO = {
      /** 关注提醒 */
      remindEnable?: string;
      /** 关注提醒的内容 */
      content?: string;
    };
    export type ChatTipAgentTimeoutDTO = {
      /** 坐席超时提醒是否开启 */
      tipEnable?: string;
      /** 坐席超时时间间隔 */
      interval?: string;
    };
    export type ChatTipChatDurationDTO = {
      /** 对话时长限制是否开启 */
      limitEnable?: string;
      /** 对话时长超出该值后触发 */
      threshold?: string;
      /** 对话限制时间间隔 */
      limitInterval?: string;
      /** 对话限制提示语 */
      limitTip?: string;
    };
    export type ChatTipSensitiveWordConfigDTO = {
      /** 对话保持是否开启 */
      enable?: string;
      /** 敏感词 */
      word?: string;
      /** 访客敏感词提示语 */
      tip?: string;
    };
    export type ChatTipChatHoldConfigDTO = {
      /** 对话保持是否开启 */
      enable?: string;
      /** 对话保持时长 */
      duration?: string;
    };
    export type ChatTipCustomerServiceWaitingMessageConfigDTO = {
      /** 消息发送条数 */
      sendNum?: string;
      /** 消息发送提示 */
      sendTip?: string;
    };

    export type Req = any;
    export interface Res {
      /** 自动应答 */
      autoReply?: ChatTipAutoReplyDTO;
      /** 人工服务配置 */
      customerService?: ChatTipCustomerServiceDTO;
      /** 对话提示 */
      chatTip?: ChatTipConfigDTO;
      /** 敏感词配置 */
      sensitiveWord?: ChatTipSensitiveWordDTO;
      /** 对话保持配置 */
      chatHold?: ChatTipChatHoldDTO;
      /** 操作提示配置 */
      operateTip?: ChatTipOperateTipDTO;
      /** 主动消息配置 */
      activeMessage?: ChatTipActiveMessageDTO;
    }
  }

  /** get /route/rule/global/chatTip/detail */
  function getChatTipDetail(req?: ET<GetChatTipDetail.Req>, options?: object): Promise<ET<GetChatTipDetail.Res>>;

  export module GetFeedbackDetail {
    export type FeedbackIndicatorSetDTO = {
      /** 评价模块 */
      evaluation?: FeedbackGlobalEvaluationDTO;
      /** 解决模块 */
      solution?: FeedbackGlobalSolutionDTO;
      /** 打分模块 */
      score?: FeedbackGlobalScoreDTO;
      /** 自定义问题模块 */
      customQuestion?: FeedbackGlobalCustomQuestionDTO;
    };
    export type FeedbackApplicationSetDTO = {
      /** 评价方式选项 */
      feedbackTypeOptionList?: Array<string>;
      /** 访客发送条数 */
      visitorSendNum?: number;
      /** 客服发送条数 */
      agentSendNum?: number;
      /** 评价结果选项 */
      feedbackResultOptionList?: Array<string>;
    };
    export type FeedbackGlobalEvaluationDTO = {
      /** 评价模块是否展示.Y/N */
      evaluationEnable?: string;
      /** 评价模块展示顺序.0-9 */
      evaluationOrder?: number;
      /** 评价引导语.200字 */
      feedbackTip?: string;
      /** 满意度选项。每项最长20字 */
      feedbackOptionList?: Array<string>;
      /** 是否采集不满意用户信息。Y/N */
      userInfoEnable?: string;
      /** 用户信息项 */
      userInfoOptionList?: Array<string>;
      /** 用户不满意信息采集引导语。最长200字 */
      userInfoTip?: string;
      /** 是否采集不满意度原因。Y/N */
      dissatisfiedReasonEnable?: string;
      /** 是否支持访客多选。Y/N */
      dissatisfiedReasonMultipleEnable?: string;
      /** 采集不满意原因引导语.200字 */
      dissatisfiedReasonTip?: string;
      /** 不满意原因选项。每项最长20字 */
      dissatisfiedReasonOptionList?: Array<string>;
    };
    export type FeedbackGlobalSolutionDTO = {
      /** 解决模块是否展示.Y/N */
      solutionEnable?: string;
      /** 解决模块展示顺序.0-9 */
      solutionOrder?: number;
      /** 解决模块的引导语.最多200字 */
      solutionTip?: string;
      /** 解决项展示内容.最多20字 */
      solutionOptionYesContent?: string;
      /** 未解决项展示内容.最多20字 */
      solutionOptionNoContent?: string;
      /** 解决项是否必填.Y/N */
      solutionOptionRequired?: string;
    };
    export type FeedbackGlobalScoreDTO = {
      /** 打分模块是否开启.Y/N */
      scoreEnable?: string;
      /** 打分模块展示顺序.0-9 */
      scoreOrder?: number;
      /** 打分模块提示语,最多200字 */
      scoreTip?: string;
    };
    export type FeedbackGlobalCustomQuestionDTO = {
      /** 自定义问题模块是否开启，Y/N */
      customQuestionEnable?: string;
      /** 自定义问题模块展示顺序，0-9 */
      customQuestionOrder?: number;
      /** 展示问题数 */
      displayNum: number;
      /** 自定义问题列表 */
      questionList: Array<QuestionDTO>;
    };
    export type QuestionDTO = {
      /** 问题描述 */
      questionTip?: string;
      /** 问题选项 */
      questionOptionList?: Array<string>;
      /** 是否支持访客多选。Y/N */
      multipleEnable?: string;
      /** 是否必填.Y/N */
      solutionOptionRequired?: string;
    };

    export type Req = any;
    export interface Res {
      /** 满意度指标设置 */
      indicatorSet?: FeedbackIndicatorSetDTO;
      /** 满意度应用设置 */
      applicationSet?: FeedbackApplicationSetDTO;
    }
  }

  /** 查询满意度设置全局配置 get /route/rule/global/feedback/detail */
  function getFeedbackDetail(req?: ET<GetFeedbackDetail.Req>, options?: object): Promise<ET<GetFeedbackDetail.Res>>;

  export module PostFeedbackSave {
    export type FeedbackIndicatorSetDTO = {
      /** 评价模块 */
      evaluation?: FeedbackGlobalEvaluationDTO;
      /** 解决模块 */
      solution?: FeedbackGlobalSolutionDTO;
      /** 打分模块 */
      score?: FeedbackGlobalScoreDTO;
      /** 自定义问题模块 */
      customQuestion?: FeedbackGlobalCustomQuestionDTO;
    };
    export type FeedbackApplicationSetDTO = {
      /** 评价方式选项 */
      feedbackTypeOptionList?: Array<string>;
      /** 访客发送条数 */
      visitorSendNum?: number;
      /** 客服发送条数 */
      agentSendNum?: number;
      /** 评价结果选项 */
      feedbackResultOptionList?: Array<string>;
    };
    export type FeedbackGlobalEvaluationDTO = {
      /** 评价模块是否展示.Y/N */
      evaluationEnable?: string;
      /** 评价模块展示顺序.0-9 */
      evaluationOrder?: number;
      /** 评价引导语.200字 */
      feedbackTip?: string;
      /** 满意度选项。每项最长20字 */
      feedbackOptionList?: Array<string>;
      /** 是否采集不满意用户信息。Y/N */
      userInfoEnable?: string;
      /** 用户信息项 */
      userInfoOptionList?: Array<string>;
      /** 用户不满意信息采集引导语。最长200字 */
      userInfoTip?: string;
      /** 是否采集不满意度原因。Y/N */
      dissatisfiedReasonEnable?: string;
      /** 是否支持访客多选。Y/N */
      dissatisfiedReasonMultipleEnable?: string;
      /** 采集不满意原因引导语.200字 */
      dissatisfiedReasonTip?: string;
      /** 不满意原因选项。每项最长20字 */
      dissatisfiedReasonOptionList?: Array<string>;
    };
    export type FeedbackGlobalSolutionDTO = {
      /** 解决模块是否展示.Y/N */
      solutionEnable?: string;
      /** 解决模块展示顺序.0-9 */
      solutionOrder?: number;
      /** 解决模块的引导语.最多200字 */
      solutionTip?: string;
      /** 解决项展示内容.最多20字 */
      solutionOptionYesContent?: string;
      /** 未解决项展示内容.最多20字 */
      solutionOptionNoContent?: string;
      /** 解决项是否必填.Y/N */
      solutionOptionRequired?: string;
    };
    export type FeedbackGlobalScoreDTO = {
      /** 打分模块是否开启.Y/N */
      scoreEnable?: string;
      /** 打分模块展示顺序.0-9 */
      scoreOrder?: number;
      /** 打分模块提示语,最多200字 */
      scoreTip?: string;
    };
    export type FeedbackGlobalCustomQuestionDTO = {
      /** 自定义问题模块是否开启，Y/N */
      customQuestionEnable?: string;
      /** 自定义问题模块展示顺序，0-9 */
      customQuestionOrder?: number;
      /** 展示问题数 */
      displayNum: number;
      /** 自定义问题列表 */
      questionList: Array<QuestionDTO>;
    };
    export type QuestionDTO = {
      /** 问题描述 */
      questionTip?: string;
      /** 问题选项 */
      questionOptionList?: Array<string>;
      /** 是否支持访客多选。Y/N */
      multipleEnable?: string;
      /** 是否必填.Y/N */
      solutionOptionRequired?: string;
    };

    export interface Req {
      /** 满意度指标设置 */
      indicatorSet?: FeedbackIndicatorSetDTO;
      /** 满意度应用设置 */
      applicationSet?: FeedbackApplicationSetDTO;
    }
    export type Res = boolean;
  }

  /** 保存满意度设置全局配置 post /route/rule/global/feedback/save */
  function postFeedbackSave(req: ET<PostFeedbackSave.Req>, options?: object): Promise<ET<PostFeedbackSave.Res>>;

  export module GetInteractDetail {
    export type InteractGuessQuestionDTO = {
      /** 智能助理是否开启 */
      enable?: string;
      /** 猜你想问提示语 */
      tip?: string;
    };
    export type IntelligentSuggestDTO = {
      /** 智能助理是否开启 */
      enable?: string;
      /** 智能联想提示问显示条数 */
      questionCount?: string;
    };
    export type InteractAutoCustomerServiceDTO = {
      /** 智能助理是否开启 */
      enable?: string;
      /** 多轮对话转人工开关 */
      multiRoundsEnable?: string;
      /** 多轮对话发言次数 */
      multiRoundsCount?: string;
      /** 多轮对话提示语 */
      multiRoundsTip?: string;
    };
    export type IntelligentAssistantDTO = {
      /** 智能助理是否开启 */
      enable?: string;
    };
    export type InteractRecommendQuestionDTO = {
      /** 知识推荐问题条数 */
      count?: string;
    };

    export type Req = any;
    export interface Res {
      /** 猜你想问配置 */
      guessQuestion?: InteractGuessQuestionDTO;
      /** 智能联想配置 */
      intelligentSuggest?: IntelligentSuggestDTO;
      /** 自动转人工配置 */
      autoCustomerService?: InteractAutoCustomerServiceDTO;
      /** 智能助理配置 */
      intelligentAssistant?: IntelligentAssistantDTO;
      /** 知识推荐配置 */
      recommendQuestion?: InteractRecommendQuestionDTO;
    }
  }

  /** 查询人机协作全局配置 get /route/rule/global/interact/detail */
  function getInteractDetail(req?: ET<GetInteractDetail.Req>, options?: object): Promise<ET<GetInteractDetail.Res>>;

  export module PostInteractSave {
    export type InteractGuessQuestionDTO = {
      /** 智能助理是否开启 */
      enable?: string;
      /** 猜你想问提示语 */
      tip?: string;
    };
    export type IntelligentSuggestDTO = {
      /** 智能助理是否开启 */
      enable?: string;
      /** 智能联想提示问显示条数 */
      questionCount?: string;
    };
    export type InteractAutoCustomerServiceDTO = {
      /** 智能助理是否开启 */
      enable?: string;
      /** 多轮对话转人工开关 */
      multiRoundsEnable?: string;
      /** 多轮对话发言次数 */
      multiRoundsCount?: string;
      /** 多轮对话提示语 */
      multiRoundsTip?: string;
    };
    export type IntelligentAssistantDTO = {
      /** 智能助理是否开启 */
      enable?: string;
    };
    export type InteractRecommendQuestionDTO = {
      /** 知识推荐问题条数 */
      count?: string;
    };

    export interface Req {
      /** 猜你想问配置 */
      guessQuestion?: InteractGuessQuestionDTO;
      /** 智能联想配置 */
      intelligentSuggest?: IntelligentSuggestDTO;
      /** 自动转人工配置 */
      autoCustomerService?: InteractAutoCustomerServiceDTO;
      /** 智能助理配置 */
      intelligentAssistant?: IntelligentAssistantDTO;
      /** 知识推荐配置 */
      recommendQuestion?: InteractRecommendQuestionDTO;
    }
    export type Res = boolean;
  }

  /** 保存人机协作全局配置 post /route/rule/global/interact/save */
  function postInteractSave(req: ET<PostInteractSave.Req>, options?: object): Promise<ET<PostInteractSave.Res>>;

  export module PostChatTipSave {
    export type ChatTipAutoReplyDTO = {
      /** 类型 0-公司统一设置;1-客服自行设置 */
      type?: string;
    };
    export type ChatTipCustomerServiceDTO = {
      /** 机器人转人工排队提示是否开启 */
      waitingTipEnable?: string;
      /** 提示并确认是否转人工的转人工排队人数 */
      waitingTipCount?: string;
      /** 高排队请求人工限制提示是否开启 */
      busyLimitTipEnable?: string;
      /** 排队人数超过该值后请求人工时会提示 */
      busyLimitCount?: string;
      /** 高排队请求人工限制提示 */
      busyLimitTip?: string;
      /** 请求人工限制是否开启 */
      limitEnable?: string;
      /** 请求人工限制时间段 */
      limitInterval?: string;
      /** 请求人工限制次数 */
      limitCount?: string;
      /** 请求人工限制时长 */
      limitDuration?: string;
      /** 请求人工限制提示语 */
      limitTip?: string;
      /** 排队提示语 */
      waitingTip?: string;
      /** 忙碌提示语 */
      busyTip?: string;
      /** 欢迎语 */
      welcomeTip?: string;
      /** 对话接通前提示语 */
      beforeChatTip?: string;
      /** 黑名单提示语 */
      blacklistTip?: string;
      /** 非工作时间提示语 */
      nonWorkingTimeTip?: string;
      /** 离线提示语 */
      offlineTip?: string;
      /** 访问限制提示语 */
      visitLimitTip?: string;
      /** 排队发送消息 */
      waitingMessage?: ChatTipCustomerServiceWaitingMessageDTO;
      /** 重连时间 */
      reconnectInterval?: string;
    };
    export type ChatTipConfigDTO = {
      /** 刷屏配置 */
      spam?: ChatTipSpamDTO;
      /** 访客未回复配置 */
      visitorNoReply?: ChatTipVisitorNoReplyDTO;
      /** 关注提醒配置 */
      attention?: ChatTipAttentionDTO;
      /** 坐席超时配置 */
      agentTimeout?: ChatTipAgentTimeoutDTO;
      /** 对话时长配置 */
      chatDuration?: ChatTipChatDurationDTO;
    };
    export type ChatTipSensitiveWordDTO = {
      /** 访客敏感词配置 */
      visitor?: ChatTipSensitiveWordConfigDTO;
      /** 坐席敏感词配置 */
      agent?: ChatTipSensitiveWordConfigDTO;
    };
    export type ChatTipChatHoldDTO = {
      /** pc端对话保持配置 */
      pc?: ChatTipChatHoldConfigDTO;
      /** 手机端对话保持配置 */
      mobile?: ChatTipChatHoldConfigDTO;
    };
    export type ChatTipOperateTipDTO = {
      /** 对话转接提示语 */
      chatTransferTip?: string;
      /** 对话插入提示语 */
      chatInsertTip?: string;
      /** 对话拦截提示语 */
      chatHoldTip?: string;
      /** 对话协同提示语 */
      chatJoinTip?: string;
      /** 客服主动结束提示语 */
      agentCloseTip?: string;
    };
    export type ChatTipActiveMessageDTO = {
      /** 主动消息模板 */
      template?: string;
      /** 离线消息超时是否开启 */
      offlineMessageTimeoutEnable?: string;
      /** 离线消息时间间隔 */
      offlineMessageInterval?: string;
    };
    export type ChatTipCustomerServiceWaitingMessageDTO = {
      /** 对话保持是否开启 */
      enable?: string;
      /** 发送消息上限 */
      sendLimit?: string;
      /** 发送消息上限提示 */
      sendLimitTip?: string;
      /** 排队消息发送配置列表 */
      configList?: Array<ChatTipCustomerServiceWaitingMessageConfigDTO>;
      /** 排队发送消息不开启提示语 */
      disableTip?: string;
    };
    export type ChatTipSpamDTO = {
      /** 对话保持是否开启 */
      enable?: string;
      /** 一分钟内消息发送条数 */
      count?: string;
      /** 访客敏感词提示语 */
      tip?: string;
    };
    export type ChatTipVisitorNoReplyDTO = {
      /** 坐席超时提醒是否开启 */
      tipEnable?: string;
      /** 同步提醒坐席是否开启 */
      remindAgentEnable?: string;
      /** 坐席超时时间间隔 */
      interval?: string;
      /** 访客敏感词提示语 */
      tip?: string;
      /** 访客未发送消息对话结束时间间隔 */
      endInternal?: string;
      /** 访客未发送消息对话结束消息提示 */
      endTip?: string;
    };
    export type ChatTipAttentionDTO = {
      /** 关注提醒 */
      remindEnable?: string;
      /** 关注提醒的内容 */
      content?: string;
    };
    export type ChatTipAgentTimeoutDTO = {
      /** 坐席超时提醒是否开启 */
      tipEnable?: string;
      /** 坐席超时时间间隔 */
      interval?: string;
    };
    export type ChatTipChatDurationDTO = {
      /** 对话时长限制是否开启 */
      limitEnable?: string;
      /** 对话时长超出该值后触发 */
      threshold?: string;
      /** 对话限制时间间隔 */
      limitInterval?: string;
      /** 对话限制提示语 */
      limitTip?: string;
    };
    export type ChatTipSensitiveWordConfigDTO = {
      /** 对话保持是否开启 */
      enable?: string;
      /** 敏感词 */
      word?: string;
      /** 访客敏感词提示语 */
      tip?: string;
    };
    export type ChatTipChatHoldConfigDTO = {
      /** 对话保持是否开启 */
      enable?: string;
      /** 对话保持时长 */
      duration?: string;
    };
    export type ChatTipCustomerServiceWaitingMessageConfigDTO = {
      /** 消息发送条数 */
      sendNum?: string;
      /** 消息发送提示 */
      sendTip?: string;
    };

    export interface Req {
      /** 自动应答 */
      autoReply?: ChatTipAutoReplyDTO;
      /** 人工服务配置 */
      customerService?: ChatTipCustomerServiceDTO;
      /** 对话提示 */
      chatTip?: ChatTipConfigDTO;
      /** 敏感词配置 */
      sensitiveWord?: ChatTipSensitiveWordDTO;
      /** 对话保持配置 */
      chatHold?: ChatTipChatHoldDTO;
      /** 操作提示配置 */
      operateTip?: ChatTipOperateTipDTO;
      /** 主动消息配置 */
      activeMessage?: ChatTipActiveMessageDTO;
    }
    export type Res = boolean;
  }

  /** post /route/rule/global/chatTip/save */
  function postChatTipSave(req: ET<PostChatTipSave.Req>, options?: object): Promise<ET<PostChatTipSave.Res>>;

  export module GetWindowDetail {
    export type WindowPcConfigDTO = {
      /** 窗口名称 */
      name?: string;
      /** 跑马灯 */
      carousel?: string;
      /** 跑马灯是否滚动显示，Y-开启，N-关闭 */
      carouselSlideEnable?: string;
      /** LOGO图片url */
      logoImageUrl?: string;
      /** 广告类型，0-广告图片，1-轮播图 */
      adType?: string;
      /** 广告地址 */
      adUrl?: string;
      /** 广告图跳转链接 */
      adJumpUrl?: string;
      /** 轮播图配置id */
      sliderImageId?: number;
      /** 转人工按钮是否显示，Y-显示，N-不显示 */
      customerServiceButtonEnable?: string;
      /** 气泡模式开关，Y-开启，N-关闭 */
      bubbleEnable?: string;
      /** 显示头像开关，Y-开启，N-关闭 */
      avatarEnable?: string;
      /** 机器人头像url */
      robotAvatar?: string;
      /** 客服头像url */
      agentAvatar?: string;
      /** 访客头像url */
      visitorAvatar?: string;
      /** 工具栏配置项，0-字体，1-表情、2-截屏、3-文件发送、4-保存记录，5-声音，6-结束对话，7-图片 */
      toolbar?: Array<string>;
    };
    export type WindowMobileConfigDTO = {
      /** 显示头像开关，Y-开启，N-关闭 */
      avatarEnable?: string;
      /** 机器人头像url */
      robotAvatar?: string;
      /** 客服头像url */
      agentAvatar?: string;
      /** 访客头像url */
      visitorAvatar?: string;
      /** 工具栏配置项，0-字体，1-表情、2-截屏、3-文件发送、4-保存记录，5-声音，6-结束对话，7-图片 */
      toolbar?: Array<string>;
      /** 对话结束跳转文本 */
      jumpUrlAfterFinished?: string;
    };

    export type Req = any;
    export interface Res {
      /** 窗口界面PC配置DTO */
      pcConfig?: WindowPcConfigDTO;
      /** 窗口界面手机端配置DTO */
      mobileConfig?: WindowMobileConfigDTO;
    }
  }

  /** 查询窗口界面全局配置 get /route/rule/global/window/detail */
  function getWindowDetail(req?: ET<GetWindowDetail.Req>, options?: object): Promise<ET<GetWindowDetail.Res>>;

  export module PostRouteRuleGlobalWindowSave {
    export type WindowPcConfigDTO = {
      /** 窗口名称 */
      name?: string;
      /** 跑马灯 */
      carousel?: string;
      /** 跑马灯是否滚动显示，Y-开启，N-关闭 */
      carouselSlideEnable?: string;
      /** LOGO图片url */
      logoImageUrl?: string;
      /** 广告类型，0-广告图片，1-轮播图 */
      adType?: string;
      /** 广告地址 */
      adUrl?: string;
      /** 广告图跳转链接 */
      adJumpUrl?: string;
      /** 轮播图配置id */
      sliderImageId?: number;
      /** 转人工按钮是否显示，Y-显示，N-不显示 */
      customerServiceButtonEnable?: string;
      /** 气泡模式开关，Y-开启，N-关闭 */
      bubbleEnable?: string;
      /** 显示头像开关，Y-开启，N-关闭 */
      avatarEnable?: string;
      /** 机器人头像url */
      robotAvatar?: string;
      /** 客服头像url */
      agentAvatar?: string;
      /** 访客头像url */
      visitorAvatar?: string;
      /** 工具栏配置项，0-字体，1-表情、2-截屏、3-文件发送、4-保存记录，5-声音，6-结束对话，7-图片 */
      toolbar?: Array<string>;
    };
    export type WindowMobileConfigDTO = {
      /** 显示头像开关，Y-开启，N-关闭 */
      avatarEnable?: string;
      /** 机器人头像url */
      robotAvatar?: string;
      /** 客服头像url */
      agentAvatar?: string;
      /** 访客头像url */
      visitorAvatar?: string;
      /** 工具栏配置项，0-字体，1-表情、2-截屏、3-文件发送、4-保存记录，5-声音，6-结束对话，7-图片 */
      toolbar?: Array<string>;
      /** 对话结束跳转文本 */
      jumpUrlAfterFinished?: string;
    };

    export interface Req {
      /** 窗口界面PC配置DTO */
      pcConfig?: WindowPcConfigDTO;
      /** 窗口界面手机端配置DTO */
      mobileConfig?: WindowMobileConfigDTO;
    }
    export type Res = boolean;
  }

  /** 保存人机协作全局配置 post /route/rule/global/window/save */
  function postRouteRuleGlobalWindowSave(req: ET<PostRouteRuleGlobalWindowSave.Req>, options?: object): Promise<ET<PostRouteRuleGlobalWindowSave.Res>>;

  export module PostSliderImageDelete {
    export type SliderImageDTO = {
      /** id */
      id?: number;
      /** 图片名称 */
      name?: string;
      /** 跳转链接 */
      clickUrl?: string;
      /** 图片顺序 */
      orderNo?: number;
      /** 图片相对路径 */
      imageUrl?: string;
    };

    export interface Req {
      /** id */
      id?: number;
      /** 图片名称 */
      name?: string;
      /** 地区代码 */
      regionCode?: string;
      /** 轮播间隔时间 */
      loopInterval?: number;
      /** 最后修改人 */
      lastModifyTrueId?: string;
      /** 最后修改人名称 */
      lastModifyName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 轮播图信息列表 */
      imageInfoList?: Array<SliderImageDTO>;
    }
    export type Res = boolean;
  }

  /** 删除宣传轮播图组配置列表 post /sliderImage/delete */
  function postSliderImageDelete(req: ET<PostSliderImageDelete.Req>, options?: object): Promise<ET<PostSliderImageDelete.Res>>;

  export module GetSliderImageGet {
    export type SliderImageDTO = {
      /** id */
      id?: number;
      /** 图片名称 */
      name?: string;
      /** 跳转链接 */
      clickUrl?: string;
      /** 图片顺序 */
      orderNo?: number;
      /** 图片相对路径 */
      imageUrl?: string;
    };

    export interface Req {
      /** 宣传轮播图id */
      id: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 图片名称 */
      name?: string;
      /** 地区代码 */
      regionCode?: string;
      /** 轮播间隔时间 */
      loopInterval?: number;
      /** 最后修改人 */
      lastModifyTrueId?: string;
      /** 最后修改人名称 */
      lastModifyName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 轮播图信息列表 */
      imageInfoList?: Array<SliderImageDTO>;
    }
  }

  /** 查询宣传轮播图组配置详细信息 get /sliderImage/get */
  function getSliderImageGet(req: ET<GetSliderImageGet.Req>, options?: object): Promise<ET<GetSliderImageGet.Res>>;

  export module PostSliderImageSave {
    export type SliderImageDTO = {
      /** id */
      id?: number;
      /** 图片名称 */
      name?: string;
      /** 跳转链接 */
      clickUrl?: string;
      /** 图片顺序 */
      orderNo?: number;
      /** 图片相对路径 */
      imageUrl?: string;
    };

    export interface Req {
      /** 图片名称 */
      name?: string;
      /** 地区代码 */
      regionCode?: string;
      /** 轮播间隔时间 */
      loopInterval?: number;
      /** 轮播图信息列表 */
      imageInfoList?: Array<SliderImageDTO>;
    }
    export type Res = boolean;
  }

  /** 保存宣传轮播图配置 post /sliderImage/save */
  function postSliderImageSave(req: ET<PostSliderImageSave.Req>, options?: object): Promise<ET<PostSliderImageSave.Res>>;

  export module GetSliderImageSearch {
    export type SliderImageBaseJO = {
      /** id */
      id?: number;
      /** 图片名称 */
      name?: string;
      /** 地区代码 */
      regionCode?: string;
      /** 轮播间隔时间 */
      loopInterval?: number;
      /** 最后修改人 */
      lastModifyTrueId?: string;
      /** 最后修改人名称 */
      lastModifyName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 轮播图信息列表 */
      imageInfoList?: Array<SliderImageDTO>;
    };
    export type SliderImageDTO = {
      /** id */
      id?: number;
      /** 图片名称 */
      name?: string;
      /** 跳转链接 */
      clickUrl?: string;
      /** 图片顺序 */
      orderNo?: number;
      /** 图片相对路径 */
      imageUrl?: string;
    };

    export interface Req {
      /** 地区代码列表 */
      regionCodes?: Array<string>;
      /** 业务名称 */
      name?: string;
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SliderImageBaseJO>;
    }
  }

  /** 按名称模糊查询宣传轮播图组配置列表注意：宣传图查询JO中name的值很可能为中文，默认情况下会产生乱码，需要在tomcat配置文件中设置编码为UTF-8 get /sliderImage/search */
  function getSliderImageSearch(req: ET<GetSliderImageSearch.Req>, options?: object): Promise<ET<GetSliderImageSearch.Res>>;

  export module PostSliderImageUpdate {
    export type SliderImageDTO = {
      /** id */
      id?: number;
      /** 图片名称 */
      name?: string;
      /** 跳转链接 */
      clickUrl?: string;
      /** 图片顺序 */
      orderNo?: number;
      /** 图片相对路径 */
      imageUrl?: string;
    };

    export interface Req {
      /** 图片名称 */
      name?: string;
      /** 地区代码 */
      regionCode?: string;
      /** 轮播间隔时间 */
      loopInterval?: number;
      /** 轮播图信息列表 */
      imageInfoList?: Array<SliderImageDTO>;
      /** id */
      id?: number;
    }
    export type Res = boolean;
  }

  /** 修改宣传轮播图配置 post /sliderImage/update */
  function postSliderImageUpdate(req: ET<PostSliderImageUpdate.Req>, options?: object): Promise<ET<PostSliderImageUpdate.Res>>;

  export module GetStatsFeedback {
    export type FeedbackStatsResultDTO = {
      /** 产品维度所属业务类型 */
      brandType?: string;
      /** 国税维度统计数据 */
      statsList?: Array<FeedbackStatsInfoDTO>;
    };
    export type FeedbackStatsInfoDTO = {
      /** 地区维度 */
      location?: string;
      /** 地区维度名称 */
      locationName?: string;
      /** 指定时间段：分 */
      interval?: number;
      /** 是否告警 */
      alarm?: string;
      /** 指定时间段的统计数据 */
      intervalData?: FeedbackStatsDTO;
      /** 当日的统计数据 */
      dailyData?: FeedbackStatsDTO;
      brandType?: string;
    };
    export type FeedbackStatsDTO = {
      /** 非常满意的评价数量 */
      verySatisfiedCount?: number;
      /** 满意的评价数量 */
      satisfiedCount?: number;
      /** 不满意的评价数量 */
      notSatisfiedCount?: number;
      /** 评价总量 */
      total?: number;
    };

    export interface Req {
      /** 业务类型,已废弃,新版本接口请使用brandTypeId */
      brandType?: string;
      /** 业务类型id */
      brandTypeId?: number;
      /** 产品维度值 */
      brandValues?: Array<string>;
      /** 会员等级 */
      usertypes?: Array<string>;
      /** 地区 */
      locations?: Array<string>;
    }
    export type Res = Array<FeedbackStatsResultDTO>;
  }

  /** 获取满意度统计数据 get /stats/feedback */
  function getStatsFeedback(req: ET<GetStatsFeedback.Req>, options?: object): Promise<ET<GetStatsFeedback.Res>>;

  export module PostLandingPageClone {
    export interface Req {
      /** id */
      id?: number;
    }
    export interface Res {
      /** id */
      id?: number;
    }
  }

  /** 复制落地页配置信息 post /landingPage/clone */
  function postLandingPageClone(req: ET<PostLandingPageClone.Req>, options?: object): Promise<ET<PostLandingPageClone.Res>>;

  export module GetForbidList {
    export type ForbidResponseJO = {
      /** 配置id */
      id?: number;
      /** 手机号 */
      mobile?: string;
      /** 是否有效，Y/N */
      status?: string;
      /** 失效日期 */
      expireDate?: string;
      /** 分子公司代码 */
      branchCode?: string;
      /** 分子公司名称 */
      branchName?: string;
      /** 创建人id */
      creatorId?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 创建时间 */
      createDate?: string;
      /** 修改人id */
      modifierId?: string;
      /** 修改人名称 */
      modifierName?: string;
      /** 修改时间 */
      modifyDate?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 手机号 */
      mobile?: string;
      /** 分子公司代码 */
      branchCode?: string;
      /** 创建人id */
      creatorId?: string;
      /** 修改人id */
      modifierId?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ForbidResponseJO>;
    }
  }

  /** 查询手机号禁入配置列表+ get /forbid/list */
  function getForbidList(req: ET<GetForbidList.Req>, options?: object): Promise<ET<GetForbidList.Res>>;

  export module PostForbidInsert {
    export interface Req {
      /** 手机号 */
      mobile?: string;
      /** 失效日期 */
      expireDate?: string;
    }
    export type Res = boolean;
  }

  /** 新增手机号禁入配置配置 post /forbid/insert */
  function postForbidInsert(req: ET<PostForbidInsert.Req>, options?: object): Promise<ET<PostForbidInsert.Res>>;

  export module PostForbidUpdate {
    export interface Req {
      /** 配置id */
      id?: number;
      /** 失效日期 */
      expireDate?: string;
    }
    export type Res = boolean;
  }

  /** 修改手机号禁入配置配置 post /forbid/update */
  function postForbidUpdate(req: ET<PostForbidUpdate.Req>, options?: object): Promise<ET<PostForbidUpdate.Res>>;

  export module PostForbidStatus {
    export interface Req {
      /** 配置id */
      id?: number;
      /** 状态Y-有效/N-失效 */
      status?: string;
    }
    export type Res = boolean;
  }

  /** 修改手机号禁入配置状态 post /forbid/status */
  function postForbidStatus(req: ET<PostForbidStatus.Req>, options?: object): Promise<ET<PostForbidStatus.Res>>;

  export module PostToolConsultUrl {
    export type ConsultUserInfoDTO = {
      /** 用户名称 */
      yhmc?: string;
      /** 用户代码 */
      yhdm?: string;
      /** 个人姓名/昵称 */
      personalmc?: string;
      /** 个人手机号/账号 */
      personaldm?: string;
      /** 中介机构名称 */
      agencymc?: string;
      /** 中介机构代码 */
      agencydm?: string;
    };
    export type SceneInfoDTO = {
      /** 打开方式 0：安全U盾 1：PC电脑 2：微信 3：手机APP */
      openMode?: string;
      /** 产品版本号 */
      systemVersion?: string;
      /** 频道名称 */
      moduleName?: string;
      /** 页面路径 */
      position?: string;
      /** 错误信息 */
      errorMsg?: string;
    };

    export interface Req {
      /** 行政区划 */
      areaCode?: string;
      /** 来源渠道 */
      channel?: string;
      /** 产品代码 */
      systemCode?: string;
      /** 产品模块 */
      moduleCode?: string;
      /** 按钮 */
      buttonCode?: string;
      /** 用户信息 */
      consultUserInfo?: ConsultUserInfoDTO;
      /** 场景信息 */
      sceneInfo?: SceneInfoDTO;
      /** 其他参数（json） */
      extra?: string;
      /** 产品维度 */
      brand?: string;
    }
    export type Res = string;
  }

  /** post /tool/consultUrl */
  function postToolConsultUrl(req: ET<PostToolConsultUrl.Req>, options?: object): Promise<ET<PostToolConsultUrl.Res>>;

  export module GetCommonOrgList {
    export type OrgResponseDTO = {
      /** 分子公司代码 */
      code?: string;
      /** 分子公司全称 */
      fullName?: string;
      /** 分子公司简称 */
      shortName?: string;
    };

    export interface Req {
      /** 机构类型，01-总公司，02-呼叫中心管理部门，03-分子公司，04-呼叫中心，05-服务中心，08-团队，09-工作组，10-部门 */
      typeList?: Array<string>;
      /** 分子公司代码 */
      parentCode?: string;
    }
    export type Res = Array<OrgResponseDTO>;
  }

  /** 查询组织结构列表 get /common/orgList */
  function getCommonOrgList(req: ET<GetCommonOrgList.Req>, options?: object): Promise<ET<GetCommonOrgList.Res>>;

  export module GetUserCurrent {
    export type Req = any;
    export interface Res {
      /** 员工trueId */
      id?: string;
      /** 员工账号，username */
      userId?: string;
      /** 员工姓名 */
      name?: string;
      /** 组织机构代码 */
      departCode?: string;
      /** 分子公司代码，总公司本部人员所在分子公司转换为001080后返回 */
      branchCode?: string;
      /** 单点登录令牌 */
      token?: string;
    }
  }

  /** 查询当前登录用户信息 get /user/current */
  function getUserCurrent(req?: ET<GetUserCurrent.Req>, options?: object): Promise<ET<GetUserCurrent.Res>>;

  export module GetUserFuzzy {
    export type EmployeeJO = {
      /** 权限ID，相当于trueId */
      id?: string;
      /** 人员ID，登录账号 */
      userId?: string;
      /** 人员名称 */
      name?: string;
    };

    export interface Req {
      /** 人员姓名 */
      keyword: string;
    }
    export type Res = Array<EmployeeJO>;
  }

  /** 渐进式查询人员信息按条件模糊查询员工列表。查询参数content中可填入 姓名、姓名简拼、用户名、手机、邮箱 五个字段，其中只有手机为精确查询 get /user/fuzzy */
  function getUserFuzzy(req: ET<GetUserFuzzy.Req>, options?: object): Promise<ET<GetUserFuzzy.Res>>;

  export module PostSpecialConsultBatchDelete {
    export interface Req {
      /** 专项咨询列表 */
      idList: Array<number>;
    }
    export type Res = boolean;
  }

  /** 批量删除专项咨询信息 post /specialConsult/batchDelete */
  function postSpecialConsultBatchDelete(req: ET<PostSpecialConsultBatchDelete.Req>, options?: object): Promise<ET<PostSpecialConsultBatchDelete.Res>>;

  export module GetSpecialConsultDetail {
    export type AdImageDTO = {
      /** 宣传图URl */
      imageUrl: string;
      /** 跳转url */
      jumpUrl?: string;
    };

    export interface Req {
      /** 专项咨询id */
      id: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 专项咨询名称 */
      name?: string;
      /** 专项咨询场景 */
      scene?: string;
      /** 构件id 多个逗号分隔 */
      componentIds?: string;
      /** 封面图url */
      coverImageUrl?: string;
      /** 手机封面图url */
      mobileCoverImageUrl?: string;
      /** 简介图片url */
      descriptionImageUrl?: string;
      /** 手机简介图片url */
      mobileDescriptionImageUrl?: string;
      /** 描述 */
      description?: string;
      /** 排序 */
      order?: number;
      /** 宣传图列表 */
      adImageList?: Array<AdImageDTO>;
      /** 咨询范围id列表 */
      consultScopeList?: Array<number>;
      /** 创建人id */
      creatorId?: string;
      /** 修改人id */
      modifierId?: string;
    }
  }

  /** 查询专项咨询信息详情 get /specialConsult/detail */
  function getSpecialConsultDetail(req: ET<GetSpecialConsultDetail.Req>, options?: object): Promise<ET<GetSpecialConsultDetail.Res>>;

  export module GetSpecialConsultList {
    export type SpecialConsultResultJO = {
      /** id */
      id?: number;
      /** 专项咨询名称 */
      name?: string;
      /** 专项咨询场景 */
      scene?: string;
      /** 构件id 多个逗号分隔 */
      componentIds?: string;
      /** 封面图url */
      coverImageUrl?: string;
      /** 手机封面图url */
      mobileCoverImageUrl?: string;
      /** 简介图片url */
      descriptionImageUrl?: string;
      /** 手机简介图片url */
      mobileDescriptionImageUrl?: string;
      /** 描述 */
      description?: string;
      /** 排序 */
      order?: number;
      /** 宣传图列表 */
      adImageList?: Array<AdImageDTO>;
      /** 咨询范围id列表 */
      consultScopeList?: Array<number>;
      /** 创建人id */
      creatorId?: string;
      /** 修改人id */
      modifierId?: string;
    };
    export type AdImageDTO = {
      /** 宣传图URl */
      imageUrl: string;
      /** 跳转url */
      jumpUrl?: string;
    };

    export interface Req {
      /** 名称 */
      name?: string;
      /** 场景 */
      scene?: string;
    }
    export type Res = Array<SpecialConsultResultJO>;
  }

  /** 查询专项咨询信息列表 get /specialConsult/list */
  function getSpecialConsultList(req: ET<GetSpecialConsultList.Req>, options?: object): Promise<ET<GetSpecialConsultList.Res>>;

  export module PostSpecialConsultSave {
    export type AdImageDTO = {
      /** 宣传图URl */
      imageUrl: string;
      /** 跳转url */
      jumpUrl?: string;
    };

    export interface Req {
      /** 专项咨询名称 */
      name: string;
      /** 构件id 多个逗号分隔     * 最长500 */
      componentIds: string;
      /** 封面图url */
      coverImageUrl: string;
      /** 简介图片url */
      descriptionImageUrl: string;
      /** 描述 */
      description?: string;
      /** 排序 */
      order: number;
      /** 宣传图列表 */
      adImageList: Array<AdImageDTO>;
      /** 咨询范围id列表 */
      consultScopeList: Array<number>;
      /** 专项咨询场景 */
      scene: string;
    }
    export type Res = number;
  }

  /** 保存专项咨询 post /specialConsult/save */
  function postSpecialConsultSave(req: ET<PostSpecialConsultSave.Req>, options?: object): Promise<ET<PostSpecialConsultSave.Res>>;

  export module PostSpecialConsultUpdate {
    export type AdImageDTO = {
      /** 宣传图URl */
      imageUrl: string;
      /** 跳转url */
      jumpUrl?: string;
    };

    export interface Req {
      /** 专项咨询名称 */
      name: string;
      /** 构件id 多个逗号分隔     * 最长500 */
      componentIds: string;
      /** 封面图url */
      coverImageUrl: string;
      /** 简介图片url */
      descriptionImageUrl: string;
      /** 描述 */
      description?: string;
      /** 排序 */
      order: number;
      /** 宣传图列表 */
      adImageList: Array<AdImageDTO>;
      /** 咨询范围id列表 */
      consultScopeList: Array<number>;
      /** id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 修改专项咨询 post /specialConsult/update */
  function postSpecialConsultUpdate(req: ET<PostSpecialConsultUpdate.Req>, options?: object): Promise<ET<PostSpecialConsultUpdate.Res>>;

  export module PostSpecialLocationDelete {
    export interface Req {
      /** id */
      id?: number;
    }
    export type Res = boolean;
  }

  /** 删除特殊地区 post /specialLocation/delete */
  function postSpecialLocationDelete(req: ET<PostSpecialLocationDelete.Req>, options?: object): Promise<ET<PostSpecialLocationDelete.Res>>;

  export module GetSpecialLocationDetail {
    export interface Req {
      /** 特殊地区ID */
      id: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 来源渠道 */
      channel?: string;
      /** 来源渠道名称 */
      channelName?: string;
      /** 地区代码 */
      code?: string;
      /** 地区名称 */
      name?: string;
      /** 地区类型 0:普通地区 1：统购地区 */
      type?: string;
      /** 创建人id */
      creatorId?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 修改人id */
      modifierId?: string;
      /** 修改人名称 */
      modifierName?: string;
      /** 创建时间 */
      createDate?: string;
      /** 更新时间 */
      modifyDate?: string;
    }
  }

  /** 特殊地区详情查询 get /specialLocation/detail */
  function getSpecialLocationDetail(req: ET<GetSpecialLocationDetail.Req>, options?: object): Promise<ET<GetSpecialLocationDetail.Res>>;

  export module GetSpecialLocationList {
    export type SpecialLocationResponseJO = {
      /** id */
      id?: number;
      /** 来源渠道 */
      channel?: string;
      /** 来源渠道名称 */
      channelName?: string;
      /** 地区代码 */
      code?: string;
      /** 地区名称 */
      name?: string;
      /** 地区类型 0:普通地区 1：统购地区 */
      type?: string;
      /** 创建人id */
      creatorId?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 修改人id */
      modifierId?: string;
      /** 修改人名称 */
      modifierName?: string;
      /** 创建时间 */
      createDate?: string;
      /** 更新时间 */
      modifyDate?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 地区代码 */
      code?: string;
      /** 地区名称 */
      name?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SpecialLocationResponseJO>;
    }
  }

  /** 特殊地区列表查询 get /specialLocation/list */
  function getSpecialLocationList(req: ET<GetSpecialLocationList.Req>, options?: object): Promise<ET<GetSpecialLocationList.Res>>;

  export module PostSpecialLocationSave {
    export interface Req {
      /** 地区代码 */
      code?: string;
      /** 地区名称 */
      name?: string;
      /** 来源渠道列表，为空表示全部渠道 */
      channelList?: Array<string>;
    }
    export type Res = boolean;
  }

  /** 新增特殊地区 post /specialLocation/save */
  function postSpecialLocationSave(req: ET<PostSpecialLocationSave.Req>, options?: object): Promise<ET<PostSpecialLocationSave.Res>>;

  export module PostSpecialLocationUpdate {
    export interface Req {
      /** id */
      id?: number;
      /** 地区代码 */
      code?: string;
      /** 地区名称 */
      name?: string;
      /** 来源渠道列表，为空表示全部渠道 */
      channelList?: Array<string>;
    }
    export type Res = boolean;
  }

  /** 修改特殊地区 post /specialLocation/update */
  function postSpecialLocationUpdate(req: ET<PostSpecialLocationUpdate.Req>, options?: object): Promise<ET<PostSpecialLocationUpdate.Res>>;

  export module GetModuleList {
    export type ConsultModuleResultJO = {
      /** 记录id */
      id?: number;
      /** 产品配置id */
      systemId?: number;
      /** 模块代码 最多20 */
      moduleCode?: string;
      /** 模块名称 最多20 */
      moduleName?: string;
      /** 描述 最多200 */
      description?: string;
      /** 创建时间 */
      createDate?: string;
      /** 修改时间 */
      modifyDate?: string;
    };

    export interface Req {
      /** 产品配置id */
      systemId: number;
      /** 模块名称 */
      moduleName?: string;
      /** 开始日期 */
      startDate?: string;
      /** 结束日期 */
      endDate?: string;
    }
    export type Res = Array<ConsultModuleResultJO>;
  }

  /** 查询模块配置列表 get /consult/module/list */
  function getModuleList(req: ET<GetModuleList.Req>, options?: object): Promise<ET<GetModuleList.Res>>;

  export module GetSystemList {
    export type ConsultSystemResultJO = {
      /** 记录id */
      id?: number;
      /** 来源渠道 最多3位 */
      channel?: string;
      /** 系列代码 最多20 */
      seriesCode?: string;
      /** 系列名称 最多20 */
      seriesName?: string;
      /** 产品代码 最多20 */
      systemCode?: string;
      /** 产品名称 最多20 */
      systemName?: string;
      /** 描述 */
      description?: string;
      /** 创建时间 */
      createDate?: string;
      /** 修改时间 */
      modifyDate?: string;
    };

    export interface Req {
      /** 来源渠道 */
      channel: string;
      /** 系列名称 */
      seriesName?: string;
      /** 产品名称 */
      systemName?: string;
      /** 开始日期 */
      startDate?: string;
      /** 结束日期 */
      endDate?: string;
    }
    export type Res = Array<ConsultSystemResultJO>;
  }

  /** 查询产品配置列表 get /consult/system/list */
  function getSystemList(req: ET<GetSystemList.Req>, options?: object): Promise<ET<GetSystemList.Res>>;

  export module PostModuleSave {
    export interface Req {
      /** 模块代码 最多20 */
      moduleCode: string;
      /** 模块名称 最多20 */
      moduleName: string;
      /** 描述 最多200 */
      description?: string;
      /** 产品配置id */
      systemId: number;
    }
    export type Res = number;
  }

  /** 新增模块配置 post /consult/module/save */
  function postModuleSave(req: ET<PostModuleSave.Req>, options?: object): Promise<ET<PostModuleSave.Res>>;

  export module PostSystemSave {
    export interface Req {
      /** 系列代码 最多20 */
      seriesCode?: string;
      /** 系列名称 最多20 */
      seriesName?: string;
      /** 产品代码 最多20 */
      systemCode: string;
      /** 产品名称 最多20 */
      systemName: string;
      /** 描述 最多200 */
      description?: string;
      /** 来源渠道 最多3位 */
      channel: string;
    }
    export type Res = number;
  }

  /** 新增产品配置 post /consult/system/save */
  function postSystemSave(req: ET<PostSystemSave.Req>, options?: object): Promise<ET<PostSystemSave.Res>>;

  export module PostModuleUpdate {
    export interface Req {
      /** 模块代码 最多20 */
      moduleCode: string;
      /** 模块名称 最多20 */
      moduleName: string;
      /** 描述 最多200 */
      description?: string;
      /** 记录id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 修改模块配置 post /consult/module/update */
  function postModuleUpdate(req: ET<PostModuleUpdate.Req>, options?: object): Promise<ET<PostModuleUpdate.Res>>;

  export module PostModuleDelete {
    export interface Req {
      /** id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除模块配置 post /consult/module/delete */
  function postModuleDelete(req: ET<PostModuleDelete.Req>, options?: object): Promise<ET<PostModuleDelete.Res>>;

  export module PostSystemUpdate {
    export interface Req {
      /** 系列代码 最多20 */
      seriesCode?: string;
      /** 系列名称 最多20 */
      seriesName?: string;
      /** 产品代码 最多20 */
      systemCode: string;
      /** 产品名称 最多20 */
      systemName: string;
      /** 描述 最多200 */
      description?: string;
      /** 记录id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 修改产品配置 post /consult/system/update */
  function postSystemUpdate(req: ET<PostSystemUpdate.Req>, options?: object): Promise<ET<PostSystemUpdate.Res>>;

  export module PostSystemDelete {
    export interface Req {
      /** id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除产品配置 post /consult/system/delete */
  function postSystemDelete(req: ET<PostSystemDelete.Req>, options?: object): Promise<ET<PostSystemDelete.Res>>;

  export module PostLocationCopy {
    export interface Req {
      /** 地区代码 */
      location?: string;
      /** 样式 最多20 */
      style: string;
      /** 描述 最多200 */
      description?: string;
      /** 被复制的记录id */
      oldId: number;
      /** 模块配置id */
      moduleId: number;
    }
    export type Res = number;
  }

  /** 复制地区配置 post /consult/location/copy */
  function postLocationCopy(req: ET<PostLocationCopy.Req>, options?: object): Promise<ET<PostLocationCopy.Res>>;

  export module PostButtonDelete {
    export interface Req {
      /** id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除按钮配置 post /consult/button/delete */
  function postButtonDelete(req: ET<PostButtonDelete.Req>, options?: object): Promise<ET<PostButtonDelete.Res>>;

  export module PostLocationDelete {
    export interface Req {
      /** id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除地区配置 post /consult/location/delete */
  function postLocationDelete(req: ET<PostLocationDelete.Req>, options?: object): Promise<ET<PostLocationDelete.Res>>;

  export module GetButtonDetail {
    export interface Req {
      /** 按钮配置id */
      id: number;
    }
    export interface Res {
      /** 记录id */
      id?: number;
      /** 地区配置id */
      locationId?: number;
      /** 按钮代码 最多20 */
      buttonCode?: string;
      /** 按钮名称 最多20 */
      buttonName?: string;
      /** 图标 最多200 */
      icon?: string;
      /** 排序字段 1-50 */
      orderNum?: number;
      /** 页面类型 landing-落地页；external-外部链接 */
      pageType?: string;
      /** 页面打开方式 pop-弹窗；tag-页签 */
      pageOpenType?: string;
      /** 页面弹窗宽度 */
      pageWindowWidth?: number;
      /** 页面弹窗高度 */
      pageWindowHeight?: number;
      /** 咨询弹框宽度 */
      consultWindowWidth?: number;
      /** 咨询弹框高度 */
      consultWindowHeight?: number;
      /** 咨询打开方式 pop-弹窗；tag-页签 */
      consultOpenType?: string;
      /** 落地页地址 */
      landingPageId?: number;
      /** 外部链接地址 最多200 */
      externalUrl?: string;
      /** 描述 最多200 */
      description?: string;
      /** 创建时间 */
      createDate?: string;
      /** 修改时间 */
      modifyDate?: string;
    }
  }

  /** 查询按钮配置详情 get /consult/button/detail */
  function getButtonDetail(req: ET<GetButtonDetail.Req>, options?: object): Promise<ET<GetButtonDetail.Res>>;

  export module GetButtonList {
    export type ConsultButtonResultJO = {
      /** 记录id */
      id?: number;
      /** 地区配置id */
      locationId?: number;
      /** 按钮代码 最多20 */
      buttonCode?: string;
      /** 按钮名称 最多20 */
      buttonName?: string;
      /** 图标 最多200 */
      icon?: string;
      /** 排序字段 1-50 */
      orderNum?: number;
      /** 页面类型 landing-落地页；external-外部链接 */
      pageType?: string;
      /** 页面打开方式 pop-弹窗；tag-页签 */
      pageOpenType?: string;
      /** 页面弹窗宽度 */
      pageWindowWidth?: number;
      /** 页面弹窗高度 */
      pageWindowHeight?: number;
      /** 咨询弹框宽度 */
      consultWindowWidth?: number;
      /** 咨询弹框高度 */
      consultWindowHeight?: number;
      /** 咨询打开方式 pop-弹窗；tag-页签 */
      consultOpenType?: string;
      /** 落地页地址 */
      landingPageId?: number;
      /** 外部链接地址 最多200 */
      externalUrl?: string;
      /** 描述 最多200 */
      description?: string;
      /** 创建时间 */
      createDate?: string;
      /** 修改时间 */
      modifyDate?: string;
    };

    export interface Req {
      /** 地区配置id */
      locationId: number;
    }
    export type Res = Array<ConsultButtonResultJO>;
  }

  /** 查询按钮配置列表 get /consult/button/list */
  function getButtonList(req: ET<GetButtonList.Req>, options?: object): Promise<ET<GetButtonList.Res>>;

  export module GetLocationDetail {
    export interface Req {
      /** 地区配置id */
      id: number;
    }
    export interface Res {
      /** 记录id */
      id?: number;
      /** 模块配置id */
      moduleId?: number;
      /** 地区代码 */
      location?: string;
      /** 样式 最多2位 */
      style?: string;
      /** 描述 最多200 */
      description?: string;
      /** 创建时间 */
      createDate?: string;
      /** 修改时间 */
      modifyDate?: string;
    }
  }

  /** 查询地区配置详情 get /consult/location/detail */
  function getLocationDetail(req: ET<GetLocationDetail.Req>, options?: object): Promise<ET<GetLocationDetail.Res>>;

  export module GetLocationList {
    export type ConsultLocationResultJO = {
      /** 记录id */
      id?: number;
      /** 模块配置id */
      moduleId?: number;
      /** 地区代码 */
      location?: string;
      /** 样式 最多2位 */
      style?: string;
      /** 描述 最多200 */
      description?: string;
      /** 创建时间 */
      createDate?: string;
      /** 修改时间 */
      modifyDate?: string;
    };

    export interface Req {
      /** 模块配置id */
      moduleId: number;
      /** 地区代码 */
      location?: string;
      /** 开始日期 */
      startDate?: string;
      /** 结束日期 */
      endDate?: string;
    }
    export type Res = Array<ConsultLocationResultJO>;
  }

  /** 查询地区配置列表 get /consult/location/list */
  function getLocationList(req: ET<GetLocationList.Req>, options?: object): Promise<ET<GetLocationList.Res>>;

  export module GetModuleDetail {
    export interface Req {
      /** 模块配置id */
      id: number;
    }
    export interface Res {
      /** 记录id */
      id?: number;
      /** 产品配置id */
      systemId?: number;
      /** 模块代码 最多20 */
      moduleCode?: string;
      /** 模块名称 最多20 */
      moduleName?: string;
      /** 描述 最多200 */
      description?: string;
      /** 创建时间 */
      createDate?: string;
      /** 修改时间 */
      modifyDate?: string;
    }
  }

  /** 查询模块配置详情 get /consult/module/detail */
  function getModuleDetail(req: ET<GetModuleDetail.Req>, options?: object): Promise<ET<GetModuleDetail.Res>>;

  export module GetSystemDetail {
    export interface Req {
      /** 产品配置id */
      id: number;
    }
    export interface Res {
      /** 记录id */
      id?: number;
      /** 来源渠道 最多3位 */
      channel?: string;
      /** 系列代码 最多20 */
      seriesCode?: string;
      /** 系列名称 最多20 */
      seriesName?: string;
      /** 产品代码 最多20 */
      systemCode?: string;
      /** 产品名称 最多20 */
      systemName?: string;
      /** 描述 */
      description?: string;
      /** 创建时间 */
      createDate?: string;
      /** 修改时间 */
      modifyDate?: string;
    }
  }

  /** 查询产品配置详情 get /consult/system/detail */
  function getSystemDetail(req: ET<GetSystemDetail.Req>, options?: object): Promise<ET<GetSystemDetail.Res>>;

  export module PostButtonSave {
    export interface Req {
      /** 按钮代码 最多20 */
      buttonCode: string;
      /** 按钮名称 最多20 */
      buttonName: string;
      /** 图标 最多2000 */
      icon: string;
      /** 排序字段 1-50 */
      orderNum: number;
      /** 页面类型 landing-落地页；external-外部链接 */
      pageType: string;
      /** 页面打开方式 pop-弹窗；tag-页签；current-当前页 */
      pageOpenType: string;
      /** 弹窗宽度 */
      pageWindowWidth?: number;
      /** 弹窗高度 */
      pageWindowHeight?: number;
      /** 咨询打开方式 pop-弹窗；tag-页签；current-当前页 */
      consultOpenType: string;
      /** 咨询弹框宽度 */
      consultWindowWidth?: number;
      /** 咨询弹框高度 */
      consultWindowHeight?: number;
      /** 落地页地址（只有跳转类型是落地页时才必填） */
      landingPageId: number;
      /** 外部链接地址 最多2000 */
      externalUrl: string;
      /** 描述 最多200 */
      description?: string;
      /** 地区配置id */
      locationId: number;
    }
    export type Res = number;
  }

  /** 新增按钮配置 post /consult/button/save */
  function postButtonSave(req: ET<PostButtonSave.Req>, options?: object): Promise<ET<PostButtonSave.Res>>;

  export module PostLocationSave {
    export interface Req {
      /** 地区代码 */
      location?: string;
      /** 样式 最多20 */
      style: string;
      /** 描述 最多200 */
      description?: string;
      /** 模块配置id */
      moduleId: number;
    }
    export type Res = number;
  }

  /** 新增地区配置 post /consult/location/save */
  function postLocationSave(req: ET<PostLocationSave.Req>, options?: object): Promise<ET<PostLocationSave.Res>>;

  export module PostButtonUpdate {
    export interface Req {
      /** 按钮代码 最多20 */
      buttonCode: string;
      /** 按钮名称 最多20 */
      buttonName: string;
      /** 图标 最多2000 */
      icon: string;
      /** 排序字段 1-50 */
      orderNum: number;
      /** 页面类型 landing-落地页；external-外部链接 */
      pageType: string;
      /** 页面打开方式 pop-弹窗；tag-页签；current-当前页 */
      pageOpenType: string;
      /** 弹窗宽度 */
      pageWindowWidth?: number;
      /** 弹窗高度 */
      pageWindowHeight?: number;
      /** 咨询打开方式 pop-弹窗；tag-页签；current-当前页 */
      consultOpenType: string;
      /** 咨询弹框宽度 */
      consultWindowWidth?: number;
      /** 咨询弹框高度 */
      consultWindowHeight?: number;
      /** 落地页地址（只有跳转类型是落地页时才必填） */
      landingPageId: number;
      /** 外部链接地址 最多2000 */
      externalUrl: string;
      /** 描述 最多200 */
      description?: string;
      /** 记录id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 修改按钮配置 post /consult/button/update */
  function postButtonUpdate(req: ET<PostButtonUpdate.Req>, options?: object): Promise<ET<PostButtonUpdate.Res>>;

  export module PostLocationUpdate {
    export interface Req {
      /** 地区代码 */
      location?: string;
      /** 样式 最多20 */
      style: string;
      /** 描述 最多200 */
      description?: string;
      /** 记录id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 修改地区配置 post /consult/location/update */
  function postLocationUpdate(req: ET<PostLocationUpdate.Req>, options?: object): Promise<ET<PostLocationUpdate.Res>>;

  export module GetCommonQueryTag {
    export type OptionResultDTO = {
      /** 选项组 */
      options?: Array<Options>;
      /** 组名 */
      groupName?: string;
    };
    export type Options = {
      /** 猜您想问系统ID */
      id?: string;
      /** 名称 */
      name?: string;
    };

    export interface Req {
      /** 标签类型，person-个人标签，company-企业标签 */
      tagType: string;
    }
    export type Res = Array<OptionResultDTO>;
  }

  /** 查询路由优先级标签配置列表 get /common/queryTag */
  function getCommonQueryTag(req: ET<GetCommonQueryTag.Req>, options?: object): Promise<ET<GetCommonQueryTag.Res>>;

  export module PostPriorityDelete {
    export interface Req {
      /** 路由优先级配置id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除路由优先级配置 post /route/priority/delete */
  function postPriorityDelete(req: ET<PostPriorityDelete.Req>, options?: object): Promise<ET<PostPriorityDelete.Res>>;

  export module GetPriorityDetail {
    export interface Req {
      /** 路由地区优先级配置id */
      id: number;
    }
    export interface Res {
      /** 配置id */
      id?: number;
      /** 地区 */
      location?: string;
      /** 地区名称 */
      locationName?: string;
      /** 来源渠道 */
      channel?: string;
      /** 渠道名称 */
      channelName?: string;
      /** 模块 */
      module?: string;
      /** 配置类型 */
      configType?: string;
      /** 标签code */
      tagCode?: string;
      /** 标签值 */
      tagValue?: string;
      /** 标签名称 */
      tagName?: string;
      /** 标签类型 */
      tagType?: string;
      /** 标签类型名称 */
      tagTypeName?: string;
      /** 服务授权 */
      serviceEmpower?: string;
      /** 服务授权名称 */
      serviceEmpowerName?: string;
      /** 国地类型 */
      taxType?: string;
      /** 国地类型名称 */
      taxTypeName?: string;
      /** VIP等级 */
      vip?: number;
      /** 受理优先级 */
      grade?: number;
      /** 备注 */
      remark?: string;
      /** 修改人id */
      modifierId?: string;
      /** 修改人名称 */
      modifierName?: string;
      /** 修改时间 */
      modifyDate?: string;
    }
  }

  /** 查询路由优先级配置 get /route/priority/detail */
  function getPriorityDetail(req: ET<GetPriorityDetail.Req>, options?: object): Promise<ET<GetPriorityDetail.Res>>;

  export module GetPriorityList {
    export type RoutePriorityResponse = {
      /** 配置id */
      id?: number;
      /** 地区 */
      location?: string;
      /** 地区名称 */
      locationName?: string;
      /** 来源渠道 */
      channel?: string;
      /** 渠道名称 */
      channelName?: string;
      /** 模块 */
      module?: string;
      /** 配置类型 */
      configType?: string;
      /** 标签code */
      tagCode?: string;
      /** 标签值 */
      tagValue?: string;
      /** 标签名称 */
      tagName?: string;
      /** 标签类型 */
      tagType?: string;
      /** 标签类型名称 */
      tagTypeName?: string;
      /** 服务授权 */
      serviceEmpower?: string;
      /** 服务授权名称 */
      serviceEmpowerName?: string;
      /** 国地类型 */
      taxType?: string;
      /** 国地类型名称 */
      taxTypeName?: string;
      /** VIP等级 */
      vip?: number;
      /** 受理优先级 */
      grade?: number;
      /** 备注 */
      remark?: string;
      /** 修改人id */
      modifierId?: string;
      /** 修改人名称 */
      modifierName?: string;
      /** 修改时间 */
      modifyDate?: string;
    };

    export interface Req {
      /** 地区 */
      location?: string;
      /** 来源渠道 */
      channel?: string;
      /** 最后修改人id */
      modifierId?: string;
      /** 每页显示条数 */
      pageSize?: number;
      /** 当前页码 */
      pageIndex?: number;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<RoutePriorityResponse>;
    }
  }

  /** 查询路由优先级配置列表 get /route/priority/list */
  function getPriorityList(req: ET<GetPriorityList.Req>, options?: object): Promise<ET<GetPriorityList.Res>>;

  export module PostPrioritySave {
    export interface Req {
      /** 地区 */
      locationList: Array<string>;
      /** 来源渠道 */
      channelList?: Array<string>;
      /** 模块 */
      module?: string;
      /** 配置类型,tag-按标签配置，empower-按服务构件配置，special-按特殊地区配置 */
      configType: string;
      /** 标签列表 */
      tagList?: Array<string>;
      /** 标签类型：company-公司，person-个人,agency-中介,companyGroup-观星阁企业分群,agencyGroup观星阁机构分群 */
      tagType?: string;
      /** 服务授权列表 */
      serviceEmpowerList?: Array<string>;
      /** 国地类型，local-地税，nation-国税 */
      taxType?: string;
      /** VIP等级 */
      vip: number;
      /** 受理优先级 */
      grade: number;
      /** 备注 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 保存路由优先级配置 post /route/priority/save */
  function postPrioritySave(req: ET<PostPrioritySave.Req>, options?: object): Promise<ET<PostPrioritySave.Res>>;

  export module PostPriorityUpdate {
    export interface Req {
      /** 配置id */
      id: number;
      /** 地区 */
      location: string;
      /** 来源渠道 */
      channel?: string;
      /** 模块 */
      module?: string;
      /** 配置类型,tag-按标签配置，empower-按服务构件配置，special-按特殊地区配置 */
      configType: string;
      /** 标签code */
      tagCode?: string;
      /** 标签类型：company-公司，person-个人,agency-中介,companyGroup-观星阁分群,agencyGroup观星阁机构分群 */
      tagType?: string;
      /** 服务授权 */
      serviceEmpower?: string;
      /** 国地类型，local-地税，nation-国税 */
      taxType?: string;
      /** VIP等级 */
      vip: number;
      /** 受理优先级 */
      grade: number;
      /** 备注 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 修改路由优先级配置 post /route/priority/update */
  function postPriorityUpdate(req: ET<PostPriorityUpdate.Req>, options?: object): Promise<ET<PostPriorityUpdate.Res>>;

  export module GetConfigDetail {
    export type AppointmentTimeConfigResultDTO = {
      /** 主键 */
      id?: number;
      /** 服务日期 */
      serviceDate?: string;
      /** 开始时间，格式：hh:mm */
      startTime?: string;
      /** 结束时间，格式：hh:mm */
      endTime?: string;
      /** 服务人数,0-10000 */
      serviceCount?: number;
    };

    export interface Req {
      /** 专家id */
      expertId: number;
      /** 地区代码 */
      location: string;
      /** 预约方式。ONLINE-线上；OFFLINE-线下 */
      type: string;
    }
    export interface Res {
      /** 主键 */
      id?: number;
      /** 专家id */
      expertId?: number;
      /** 地区代码 */
      location?: string;
      /** 是否开启。Y/N */
      status?: string;
      /** 预约方式。online-线上；offline-线下 */
      type?: string;
      /** 预约的途径（线下-网点；线上-通讯工具） */
      ways?: Array<string>;
      /** 预约时间配置 */
      timeConfigList?: Array<AppointmentTimeConfigResultDTO>;
    }
  }

  /** 查询预约配置 get /appointment/config/detail */
  function getConfigDetail(req: ET<GetConfigDetail.Req>, options?: object): Promise<ET<GetConfigDetail.Res>>;

  export module PostConfigSave {
    export type AppointmentTimeConfigDTO = {
      /** 服务日期 */
      serviceDate: string;
      /** 开始时间，格式：hh:mm */
      startTime: string;
      /** 结束时间，格式：hh:mm */
      endTime: string;
      /** 服务人数,0-10000 */
      serviceCount: number;
    };

    export interface Req {
      /** 专家id */
      expertId: number;
      /** 地区代码 */
      location: string;
      /** 是否开启。Y/N */
      status: string;
      /** 预约方式。ONLINE-线上；OFFLINE-线下 */
      type: string;
      /** 预约的途径（线下-网点；线上-通讯工具）,预约开启时必填 */
      ways: Array<string>;
      /** 预约时间配置,预约开启时必填 */
      timeConfigList: Array<AppointmentTimeConfigDTO>;
    }
    export type Res = number;
  }

  /** 新增预约配置 post /appointment/config/save */
  function postConfigSave(req: ET<PostConfigSave.Req>, options?: object): Promise<ET<PostConfigSave.Res>>;

  export module GetCommonOrgTree {
    export type OrgTreeResponseDTO = {
      /** 分子公司代码 */
      code?: string;
      /** 分子公司全称 */
      fullName?: string;
      /** 分子公司简称 */
      shortName?: string;
      /** 子级组织机构 */
      children?: Array<OrgTreeResponseDTO>;
    };

    export interface Req {
      /** 父级组织机构代码 */
      parentCode: string;
    }
    export type Res = Array<OrgTreeResponseDTO>;
  }

  /** 查询组织机构树 get /common/orgTree */
  function getCommonOrgTree(req: ET<GetCommonOrgTree.Req>, options?: object): Promise<ET<GetCommonOrgTree.Res>>;

  export module PostChannelDelete {
    export interface Req {
      /** 配置id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除渠道埋点 post /promotion/channel/delete */
  function postChannelDelete(req: ET<PostChannelDelete.Req>, options?: object): Promise<ET<PostChannelDelete.Res>>;

  export module GetChannelDetail {
    export interface Req {
      /** 主键id */
      id: number;
    }
    export interface Res {
      /** ID */
      id?: number;
      /** 渠道名称 */
      name?: string;
      /** 原始链接 */
      originalUrl?: string;
      /** sourceId */
      promotionId?: string;
      /** 备注 */
      remark?: string;
      /** 更新时间 */
      modifyDate?: string;
      /** 配置人id */
      modifierId?: string;
      /** 配置人姓名 */
      modifierName?: string;
    }
  }

  /** 查询渠道埋点详情 get /promotion/channel/detail */
  function getChannelDetail(req: ET<GetChannelDetail.Req>, options?: object): Promise<ET<GetChannelDetail.Res>>;

  export module GetChannelList {
    export type PromotionChannelJO = {
      /** ID */
      id?: number;
      /** 渠道名称 */
      name?: string;
      /** 原始链接 */
      originalUrl?: string;
      /** sourceId */
      promotionId?: string;
      /** 备注 */
      remark?: string;
      /** 更新时间 */
      modifyDate?: string;
      /** 配置人id */
      modifierId?: string;
      /** 配置人姓名 */
      modifierName?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 渠道名称 */
      nameKeyword?: string;
      /** 原始链接 */
      originalUrlKeyword?: string;
      /** 修改时间起 */
      modifyDateBegin?: string;
      /** 修改时间止 */
      modifyDateEnd?: string;
      /** 配置人id */
      modifierId?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<PromotionChannelJO>;
    }
  }

  /** 查询渠道埋点列表 get /promotion/channel/list */
  function getChannelList(req: ET<GetChannelList.Req>, options?: object): Promise<ET<GetChannelList.Res>>;

  export module PostChannelSave {
    export interface Req {
      /** 渠道名称 */
      name: string;
      /** 原始链接 */
      originalUrl: string;
      /** 备注 */
      remark?: string;
    }
    export interface Res {
      /** ID */
      id?: number;
      /** sourceId */
      promotionId?: string;
    }
  }

  /** 新增渠道埋点 post /promotion/channel/save */
  function postChannelSave(req: ET<PostChannelSave.Req>, options?: object): Promise<ET<PostChannelSave.Res>>;

  export module PostChannelUpdate {
    export interface Req {
      /** ID */
      id: number;
      /** 渠道名称 */
      name: string;
      /** 原始链接 */
      originalUrl: string;
      /** 备注 */
      remark?: string;
    }
    export interface Res {
      /** ID */
      id?: number;
      /** sourceId */
      promotionId?: string;
    }
  }

  /** 修改渠道埋点 post /promotion/channel/update */
  function postChannelUpdate(req: ET<PostChannelUpdate.Req>, options?: object): Promise<ET<PostChannelUpdate.Res>>;

  export module GetPromotionchannelDetail {
    export interface Req {
      /** 主键id */
      id: number;
    }
    export interface Res {
      /** ID */
      id?: number;
      /** 渠道名称 */
      name?: string;
      /** 原始链接 */
      originalUrl?: string;
      /** 推广ID */
      promotionId?: string;
      /** 备注 */
      remark?: string;
      /** 逻辑删除 */
      isDelete?: number;
      /** 创建人id */
      creatorId?: string;
      /** 更新人id */
      modifierId?: string;
      /** 创建时间 */
      createDate?: string;
      /** 更新时间 */
      modifyDate?: string;
    }
  }

  /** 查询渠道埋点详情 get /promotionchannel/detail */
  function getPromotionchannelDetail(req: ET<GetPromotionchannelDetail.Req>, options?: object): Promise<ET<GetPromotionchannelDetail.Res>>;

  export module PostPromotionchannelUpdate {
    export interface Req {
      /** ID */
      id: number;
      /** 渠道名称 */
      name: string;
      /** 原始链接 */
      originalUrl: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = void;
  }

  /** 修改渠道埋点 post /promotionchannel/update */
  function postPromotionchannelUpdate(req: ET<PostPromotionchannelUpdate.Req>, options?: object): Promise<ET<PostPromotionchannelUpdate.Res>>;

  export module PostPromotionchannelSave {
    export interface Req {
      /** 渠道名称 */
      name: string;
      /** 原始链接 */
      originalUrl: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = number;
  }

  /** 新增渠道埋点 post /promotionchannel/save */
  function postPromotionchannelSave(req: ET<PostPromotionchannelSave.Req>, options?: object): Promise<ET<PostPromotionchannelSave.Res>>;

  export module PostPromotionchannelDelete {
    export interface Req {
      /** 配置id */
      id: number;
    }
    export type Res = void;
  }

  /** 删除渠道埋点 post /promotionchannel/delete */
  function postPromotionchannelDelete(req: ET<PostPromotionchannelDelete.Req>, options?: object): Promise<ET<PostPromotionchannelDelete.Res>>;

  export module GetPromotionchannelList {
    export interface Req {
      /** 渠道名称 */
      nameKeyWord?: string;
      /** 原始链接 */
      originalUrlKeyWord?: string;
      /** 修改时间起 */
      modifyDateBegin?: string;
      /** 修改时间止 */
      modifyDateEnd?: string;
    }
    export type Res = number;
  }

  /** 查询渠道埋点列表 get /promotionchannel/list */
  function getPromotionchannelList(req: ET<GetPromotionchannelList.Req>, options?: object): Promise<ET<GetPromotionchannelList.Res>>;

  export module PostModuleCopy {
    export interface Req {
      /** 模块代码 最多20 */
      moduleCode: string;
      /** 模块名称 最多20 */
      moduleName: string;
      /** 描述 最多200 */
      description?: string;
      /** 要复制模块配置的id */
      moduleId: number;
    }
    export type Res = number;
  }

  /** 复制模块配置 post /consult/module/copy */
  function postModuleCopy(req: ET<PostModuleCopy.Req>, options?: object): Promise<ET<PostModuleCopy.Res>>;

  export module GetCommonTest {
    export interface Req {
      id: string;
    }
    export interface Res {
      /** ID */
      trueid?: string;
      /** 邮箱前缀 */
      userid?: string;
      /** 用户名 */
      username?: string;
      /** 分支机构代码 */
      fzjgdm?: string;
      /** 代码 */
      fzgsdm?: string;
    }
  }

  /** get /common/test */
  function getCommonTest(req: ET<GetCommonTest.Req>, options?: object): Promise<ET<GetCommonTest.Res>>;

  export module GetChannelExport {
    export type Object = any;
    export type ModelMap = {
      head?: Record<string, any>;
      tail?: Record<string, any>;
      accessOrder?: boolean;
      table?: Array<NodeKV>;
      entrySet?: Array<EntryKV>;
      size?: number;
      modCount?: number;
      threshold?: number;
      loadFactor?: number;
      keySet?: Array<K>;
      values?: Array<V>;
    };
    export type NodeKV = any;
    export type EntryKV = any;
    export type K = any;
    export type V = any;

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 渠道名称 */
      nameKeyword?: string;
      /** 原始链接 */
      originalUrlKeyword?: string;
      /** 修改时间起 */
      modifyDateBegin?: string;
      /** 修改时间止 */
      modifyDateEnd?: string;
      /** 配置人id */
      modifierId?: string;
    }
    export interface Res {
      view?: Object;
      model?: ModelMap;
      cleared?: boolean;
    }
  }

  /** 导出埋点信息 get /promotion/channel/export */
  function getChannelExport(req: ET<GetChannelExport.Req>, options?: object): Promise<ET<GetChannelExport.Res>>;

  export module GetAuditList {
    export type QuestionAuditDTO = {
      /** 问题id */
      questionId?: number;
      /** 问题标签 */
      labelList?: Array<string>;
      /** 问题状态,ANSWERED-已回答，NOT_ANSWER-未回答，DELETE-已删除 */
      questionStatus?: string;
      /** 问题是否公开,Y-是，N-否 */
      openStatus?: string;
      /** 是否推荐，Y-是，N-否 */
      recommendStatus: string;
      /** 提问时间 */
      askTime?: string;
      /** 回答信息 */
      reply?: ReplyConfigDTO;
    };
    export type ReplyConfigDTO = {
      /** 答案id */
      replyId?: number;
      /** 问题id */
      questionId?: number;
      /** 回答内容 */
      reply?: string;
      /** 适用地区 */
      locationList?: Array<LocationDTO>;
      /** 审核状态，UN_COMMIT_AUDIT-未提交，UN_AUDIT-未审核，AUDIT_PASS-审核通过，AUDIT_UN_PASS-审核未通过 */
      replyAuditStatus?: string;
      /** 审核不通过描述 */
      auditUnPassReason?: string;
      /** 审核人 */
      auditor?: string;
      /** 回答人署名，默认财税小管家 */
      replyName?: string;
      /** 回答人 */
      replyRealName?: string;
      /** 逻辑删除 */
      isDelete?: number;
      /** 回答时间 */
      replyTime?: string;
      /** 审核时间 */
      auditTime?: string;
      /** 回答人头像地址 */
      replyHeaderUrl?: string;
      /** 是否采纳，Y-已采纳，N-没采纳 */
      isSolve?: string;
      /** 顶的数量 */
      vote?: number;
      /** 踩的数量 */
      voteDown?: number;
    };
    export type LocationDTO = {
      /** 地区code */
      code?: string;
      /** 地区名称 */
      name?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      /** 用户问题 */
      question?: string;
      /** 问题标签 */
      labelId?: string;
      /** 审核日期起 */
      auditDateBegin?: string;
      /** 审核日期止 */
      auditDateEnd?: string;
      /** 回答日期起 */
      replyDateBegin?: string;
      /** 回答日期止 */
      replyDateEnd?: string;
      /** 审核人 */
      auditor?: string;
      /** 回答人 */
      replyTrueId?: string;
      /** 审核状态UN_COMMIT_AUDIT-未提交，UN_AUDIT-未审核，AUDIT_PASS-审核通过，AUDIT_UN_PASS-审核未通过 */
      replyAuditStatus?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<QuestionAuditDTO>;
    }
  }

  /** 问题审核列表 get /ask/question/audit/list */
  function getAuditList(req: ET<GetAuditList.Req>, options?: object): Promise<ET<GetAuditList.Res>>;

  export module PostReplyAudit {
    export interface Req {
      /** 回答id */
      replyId: number;
      /** 审核状态，UN_COMMIT_AUDIT-未提交，UN_AUDIT-未审核，AUDIT_PASS-审核通过，AUDIT_UN_PASS-审核未通过 */
      replyAuditStatus: string;
      /** 审核不通过描述,当审核状态是审核不通过时必填 */
      auditUnPassReason?: string;
    }
    export type Res = boolean;
  }

  /** 审核回答 post /ask/reply/audit */
  function postReplyAudit(req: ET<PostReplyAudit.Req>, options?: object): Promise<ET<PostReplyAudit.Res>>;

  export module PostReplyDelete {
    export interface Req {
      /** 回答id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除回答 post /ask/reply/delete */
  function postReplyDelete(req: ET<PostReplyDelete.Req>, options?: object): Promise<ET<PostReplyDelete.Res>>;

  export module GetQuestionReply {
    export type ReplyConfigDTO = {
      /** 答案id */
      replyId?: number;
      /** 问题id */
      questionId?: number;
      /** 回答内容 */
      reply?: string;
      /** 适用地区 */
      locationList?: Array<LocationDTO>;
      /** 审核状态，UN_COMMIT_AUDIT-未提交，UN_AUDIT-未审核，AUDIT_PASS-审核通过，AUDIT_UN_PASS-审核未通过 */
      replyAuditStatus?: string;
      /** 审核不通过描述 */
      auditUnPassReason?: string;
      /** 审核人 */
      auditor?: string;
      /** 回答人署名，默认财税小管家 */
      replyName?: string;
      /** 回答人 */
      replyRealName?: string;
      /** 逻辑删除 */
      isDelete?: number;
      /** 回答时间 */
      replyTime?: string;
      /** 审核时间 */
      auditTime?: string;
      /** 回答人头像地址 */
      replyHeaderUrl?: string;
      /** 是否采纳，Y-已采纳，N-没采纳 */
      isSolve?: string;
      /** 顶的数量 */
      vote?: number;
      /** 踩的数量 */
      voteDown?: number;
    };
    export type LocationDTO = {
      /** 地区code */
      code?: string;
      /** 地区名称 */
      name?: string;
    };

    export interface Req {
      /** 回答id */
      replyId: number;
    }
    export interface Res {
      /** 问题id */
      questionId?: number;
      /** 用户问题 */
      question?: string;
      /** 补充描述 */
      description?: string;
      /** 提问次数 */
      askTimes?: number;
      /** 是否有权益 */
      rightFlag?: boolean;
      /** 追问的回答id */
      sourceReplyId?: number;
      /** 问题标签 */
      labelIdList?: Array<string>;
      /** 问题状态，ANSWERED-已回答，NOT_ANSWER-未回答，DELETE-已删除 */
      questionStatus?: string;
      /** 是否推荐，Y-是，N-否 */
      recommendStatus?: string;
      /** 问题是否公开,Y-是，N-否 */
      openStatus?: string;
      /** 提问时间 */
      askTime?: string;
      /** 提问用户手机号 */
      mobile?: string;
      /** 图片url列表 */
      imageUrlList?: Array<string>;
      /** 回答信息 */
      reply?: ReplyConfigDTO;
    }
  }

  /** 问题详情——1对1问答 get /ask/question/reply */
  function getQuestionReply(req: ET<GetQuestionReply.Req>, options?: object): Promise<ET<GetQuestionReply.Res>>;

  export module GetQuestionList {
    export type QuestionConfigDTO = {
      /** 问题id */
      questionId?: number;
      /** 用户问题 */
      question?: string;
      /** 补充描述 */
      description?: string;
      /** 问题标签 */
      labelList?: Array<string>;
      /** 问题标签id列表 */
      labelIdList?: Array<string>;
      /** 问题状态，ANSWERED-已回答，NOT_ANSWER-未回答，DELETE-已删除 */
      questionStatus?: string;
      /** 是否推荐，Y-是，N-否 */
      recommendStatus?: string;
      /** 问题是否公开,Y-是，N-否 */
      openStatus?: string;
      /** 提问时间 */
      askTime?: string;
      /** 提问用户手机号 */
      mobile?: string;
      /** 图片url列表 */
      imageUrlList?: Array<string>;
      /** 回答列表 */
      replyList?: Array<ReplyConfigDTO>;
    };
    export type ReplyConfigDTO = {
      /** 答案id */
      replyId?: number;
      /** 问题id */
      questionId?: number;
      /** 回答内容 */
      reply?: string;
      /** 适用地区 */
      locationList?: Array<LocationDTO>;
      /** 审核状态，UN_COMMIT_AUDIT-未提交，UN_AUDIT-未审核，AUDIT_PASS-审核通过，AUDIT_UN_PASS-审核未通过 */
      replyAuditStatus?: string;
      /** 审核不通过描述 */
      auditUnPassReason?: string;
      /** 审核人 */
      auditor?: string;
      /** 回答人署名，默认财税小管家 */
      replyName?: string;
      /** 回答人 */
      replyRealName?: string;
      /** 逻辑删除 */
      isDelete?: number;
      /** 回答时间 */
      replyTime?: string;
      /** 审核时间 */
      auditTime?: string;
      /** 回答人头像地址 */
      replyHeaderUrl?: string;
      /** 是否采纳，Y-已采纳，N-没采纳 */
      isSolve?: string;
      /** 顶的数量 */
      vote?: number;
      /** 踩的数量 */
      voteDown?: number;
    };
    export type LocationDTO = {
      /** 地区code */
      code?: string;
      /** 地区名称 */
      name?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 用户问题 */
      question?: string;
      /** 用户手机号 */
      mobile?: string;
      /** 问题标签 */
      labelId?: string;
      /** 提问时间起 */
      askDateBegin?: string;
      /** 提问时间止 */
      askDateEnd?: string;
      /** 回答日期起 */
      replyDateBegin?: string;
      /** 回答日期止 */
      replyDateEnd?: string;
      /** 回答人 */
      replyTrueId?: string;
      /** 问题状态，ANSWERED-已回答，NOT_ANSWER-未回答，DELETE-已删除 */
      questionStatus?: string;
      /** UN_COMMIT_AUDIT-未提交，UN_AUDIT-未审核，AUDIT_PASS-审核通过，AUDIT_UN_PASS-审核未通过 */
      replyAuditStatus?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<QuestionConfigDTO>;
    }
  }

  /** 问题列表 get /ask/question/list */
  function getQuestionList(req: ET<GetQuestionList.Req>, options?: object): Promise<ET<GetQuestionList.Res>>;

  export module PostReplySave {
    export interface Req {
      /** 问题id */
      questionId: number;
      /** 问题标签 */
      labelIdList: Array<string>;
      /** 回答内容 */
      reply: string;
      /** 回答人，默认财税小管家 */
      replyName?: string;
      /** 回答人头像地址 */
      replyHeaderUrl?: string;
      /** 操作状态,SAVE-保存回答，AUDIT-审核状态 */
      replyOperatorEnum: string;
      /** 适用地区 */
      locationList: Array<string>;
    }
    export type Res = number;
  }

  /** 新增回答 post /ask/reply/save */
  function postReplySave(req: ET<PostReplySave.Req>, options?: object): Promise<ET<PostReplySave.Res>>;

  export module PostRecommendUpdate {
    export interface Req {
      /** 用户问题id */
      questionId: number;
      /** 是否推荐，Y-是，N-否 */
      recommendStatus: string;
    }
    export type Res = boolean;
  }

  /** 修改问题的是否推荐字段 post /ask/question/recommend/update */
  function postRecommendUpdate(req: ET<PostRecommendUpdate.Req>, options?: object): Promise<ET<PostRecommendUpdate.Res>>;

  export module PostReplyUpdate {
    export interface Req {
      /** 回答id */
      replyId: number;
      /** 回答内容 */
      reply: string;
      /** 回答人署名，默认财税小管家 */
      replyName?: string;
      /** 回答人头像地址 */
      replyHeaderUrl?: string;
      /** 适用地区 */
      locationList: Array<string>;
      /** 问题id */
      questionId: number;
      /** 问题标签 */
      labelIdList: Array<string>;
      /** 操作状态,SAVE-保存回答，AUDIT-审核状态 */
      replyOperatorEnum: string;
    }
    export type Res = boolean;
  }

  /** 编辑回答 post /ask/reply/update */
  function postReplyUpdate(req: ET<PostReplyUpdate.Req>, options?: object): Promise<ET<PostReplyUpdate.Res>>;

  export module GetTagTree {
    export type LabelDetailDTO = {
      /** 标签id */
      labelId?: string;
      /** 标签名称 */
      labelName?: string;
      /** 标签父id */
      labelParentId?: string;
      /** 子标签列表 */
      children?: Array<LabelDetailDTO>;
    };

    export type Req = any;
    export type Res = Array<LabelDetailDTO>;
  }

  /** 机器人标签树 get /common/tag/tree */
  function getTagTree(req?: ET<GetTagTree.Req>, options?: object): Promise<ET<GetTagTree.Res>>;

  export module GetQuestionDetail {
    export interface Req {
      /** 问题id */
      questionId: number;
    }
    export interface Res {
      /** 问题id */
      questionId?: number;
      /** 用户问题 */
      question?: string;
      /** 补充描述 */
      description?: string;
      /** 问题标签 */
      labelIdList?: Array<string>;
      /** 提问次数 */
      askTimes?: number;
      /** 是否有权益 */
      rightFlag?: boolean;
      /** 追问的回答id */
      sourceReplyId?: number;
      /** 问题状态，ANSWERED-已回答，NOT_ANSWER-未回答，DELETE-已删除 */
      questionStatus?: string;
      /** 是否推荐，Y-是，N-否 */
      recommendStatus?: string;
      /** 问题是否公开,Y-是，N-否 */
      openStatus?: string;
      /** 提问时间 */
      askTime?: string;
      /** 提问用户手机号 */
      mobile?: string;
      /** 图片url列表 */
      imageUrlList?: Array<string>;
    }
  }

  /** 问题详情 get /ask/question/detail */
  function getQuestionDetail(req: ET<GetQuestionDetail.Req>, options?: object): Promise<ET<GetQuestionDetail.Res>>;

  export module PostEmpowerlevelDelete {
    export interface Req {
      /** 会员等级id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除 post /empowerlevel/delete */
  function postEmpowerlevelDelete(req: ET<PostEmpowerlevelDelete.Req>, options?: object): Promise<ET<PostEmpowerlevelDelete.Res>>;

  export module GetEmpowerlevelDetail {
    export interface Req {
      /** 会员等级id */
      empowerId: number;
    }
    export interface Res {
      /** 会员等级id */
      empowerId?: number;
      /** 服务授权代码 */
      empowerCode?: string;
      /** 服务授权名称 */
      empowerName?: string;
      /** 会员等级，15-普通会员，20-低端会员，25-高端会员 */
      userLevel?: string;
      /** 会员等级名称 */
      userLevelName?: string;
      /** 备注 */
      remark?: string;
    }
  }

  /** 详情 get /empowerlevel/detail */
  function getEmpowerlevelDetail(req: ET<GetEmpowerlevelDetail.Req>, options?: object): Promise<ET<GetEmpowerlevelDetail.Res>>;

  export module GetEmpowerlevelList {
    export type T = {
      /** 会员等级id */
      empowerId?: number;
      /** 服务授权代码 */
      empowerCode?: string;
      /** 服务授权名称 */
      empowerName?: string;
      /** 会员等级，15-普通会员，20-低端会员，25-高端会员 */
      userLevel?: string;
      /** 会员等级名称 */
      userLevelName?: string;
      /** 备注 */
      remark?: string;
      /** 创建人id */
      creatorId?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 创建时间 */
      createDate?: string;
      /** 修改人id */
      modifierId?: string;
      /** 修改人名称 */
      modifierName?: string;
      /** 修改时间 */
      modifyDate?: string;
    };

    export interface Req {
      /** 每页显示条数 */
      pageSize?: number;
      /** 当前页码 */
      pageIndex?: number;
      /** 服务授权代码 */
      empowerCode?: string;
      /** 会员等级，15-普通会员，20-低端会员，25-高端会员 */
      userLevel?: string;
      /** 修改人id */
      modifierId?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<T>;
    }
  }

  /** 列表 get /empowerlevel/list */
  function getEmpowerlevelList(req: ET<GetEmpowerlevelList.Req>, options?: object): Promise<ET<GetEmpowerlevelList.Res>>;

  export module PostEmpowerlevelSave {
    export interface Req {
      /** 服务授权代码 */
      empowerCode?: string;
      /** 服务授权名称 */
      empowerName?: string;
      /** 会员等级，15-普通会员，20-低端会员，25-高端会员 */
      userLevel?: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = number;
  }

  /** 新增 post /empowerlevel/save */
  function postEmpowerlevelSave(req: ET<PostEmpowerlevelSave.Req>, options?: object): Promise<ET<PostEmpowerlevelSave.Res>>;

  export module PostEmpowerlevelUpdate {
    export interface Req {
      /** 会员等级id */
      empowerId: number;
      /** 服务授权代码 */
      empowerCode?: string;
      /** 服务授权名称 */
      empowerName?: string;
      /** 会员等级，15-普通会员，20-低端会员，25-高端会员 */
      userLevel?: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 编辑 post /empowerlevel/update */
  function postEmpowerlevelUpdate(req: ET<PostEmpowerlevelUpdate.Req>, options?: object): Promise<ET<PostEmpowerlevelUpdate.Res>>;

  export module PostUsertypeDelete {
    export interface Req {
      /** 排期id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除 post /usertype/delete */
  function postUsertypeDelete(req: ET<PostUsertypeDelete.Req>, options?: object): Promise<ET<PostUsertypeDelete.Res>>;

  export module GetUsertypeDetail {
    export interface Req {
      /** 会员等级id */
      id: number;
    }
    export interface Res {
      /** 会员等级id */
      id?: number;
      /** 服务授权代码 */
      empowerCode?: string;
      /** 服务授权名称 */
      empowerName?: string;
      /** 会员等级，15-普通会员，20-低端会员，25-高端会员 */
      usertype?: string;
      /** 会员等级名称 */
      usertypeName?: string;
      /** 备注 */
      remark?: string;
    }
  }

  /** 详情 get /usertype/detail */
  function getUsertypeDetail(req: ET<GetUsertypeDetail.Req>, options?: object): Promise<ET<GetUsertypeDetail.Res>>;

  export module GetUsertypeList {
    export type OlhelpEmpowerUsertypeDTO = {
      /** 会员等级id */
      id?: number;
      /** 服务授权代码 */
      empowerCode?: string;
      /** 服务授权名称 */
      empowerName?: string;
      /** 会员等级，15-普通会员，20-低端会员，25-高端会员 */
      usertype?: string;
      /** 会员等级名称 */
      usertypeName?: string;
      /** 备注 */
      remark?: string;
      /** 创建人id */
      creatorId?: string;
      /** 修改人id */
      modifierId?: string;
      /** 修改人名称 */
      modifierName?: string;
      /** 修改时间 yyyy-MM-dd HH:mm:ss */
      modifyDate?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 服务授权代码 */
      empowerCode?: string;
      /** 会员等级，15-普通会员，20-低端会员，25-高端会员 */
      usertype?: string;
      /** 修改人id */
      modifierId?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<OlhelpEmpowerUsertypeDTO>;
    }
  }

  /** 列表 get /usertype/list */
  function getUsertypeList(req: ET<GetUsertypeList.Req>, options?: object): Promise<ET<GetUsertypeList.Res>>;

  export module PostUsertypeSave {
    export interface Req {
      /** 服务授权代码 */
      empowerCode: string;
      /** 会员等级，15-普通会员，20-低端会员，25-高端会员 */
      usertype: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = number;
  }

  /** 新增 post /usertype/save */
  function postUsertypeSave(req: ET<PostUsertypeSave.Req>, options?: object): Promise<ET<PostUsertypeSave.Res>>;

  export module PostUsertypeUpdate {
    export interface Req {
      /** 会员等级id */
      id: number;
      /** 会员等级，15-普通会员，20-低端会员，25-高端会员 */
      usertype: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 编辑 post /usertype/update */
  function postUsertypeUpdate(req: ET<PostUsertypeUpdate.Req>, options?: object): Promise<ET<PostUsertypeUpdate.Res>>;

  export module PostUploadFile {
    export interface Req {
      /** 上传的文件 */
      file: any;
      /** 文件类型，file-文件，image-图片 */
      type: string;
    }
    export interface Res {
      /** 文件路径 */
      filePath?: string;
      /** 文件名称 */
      name?: string;
      /** 文件大小 */
      fileSize?: number;
    }
  }

  /** 上传文件接口 post /common/upload/file */
  function postUploadFile(req: ET<PostUploadFile.Req>, options?: object): Promise<ET<PostUploadFile.Res>>;

  export module GetRecordList {
    export type QuestionConfigDTO = {
      /** 问题id */
      questionId?: number;
      /** 用户问题 */
      question?: string;
      /** 补充描述 */
      description?: string;
      /** 问题标签 */
      labelList?: Array<string>;
      /** 问题标签id列表 */
      labelIdList?: Array<string>;
      /** 问题状态，ANSWERED-已回答，NOT_ANSWER-未回答，DELETE-已删除 */
      questionStatus?: string;
      /** 是否推荐，Y-是，N-否 */
      recommendStatus?: string;
      /** 问题是否公开,Y-是，N-否 */
      openStatus?: string;
      /** 提问时间 */
      askTime?: string;
      /** 提问用户手机号 */
      mobile?: string;
      /** 图片url列表 */
      imageUrlList?: Array<string>;
      /** 回答列表 */
      replyList?: Array<ReplyConfigDTO>;
    };
    export type ReplyConfigDTO = {
      /** 答案id */
      replyId?: number;
      /** 问题id */
      questionId?: number;
      /** 回答内容 */
      reply?: string;
      /** 适用地区 */
      locationList?: Array<LocationDTO>;
      /** 审核状态，UN_COMMIT_AUDIT-未提交，UN_AUDIT-未审核，AUDIT_PASS-审核通过，AUDIT_UN_PASS-审核未通过 */
      replyAuditStatus?: string;
      /** 审核不通过描述 */
      auditUnPassReason?: string;
      /** 审核人 */
      auditor?: string;
      /** 回答人署名，默认财税小管家 */
      replyName?: string;
      /** 回答人 */
      replyRealName?: string;
      /** 逻辑删除 */
      isDelete?: number;
      /** 回答时间 */
      replyTime?: string;
      /** 审核时间 */
      auditTime?: string;
      /** 回答人头像地址 */
      replyHeaderUrl?: string;
      /** 是否采纳，Y-已采纳，N-没采纳 */
      isSolve?: string;
      /** 顶的数量 */
      vote?: number;
      /** 踩的数量 */
      voteDown?: number;
    };
    export type LocationDTO = {
      /** 地区code */
      code?: string;
      /** 地区名称 */
      name?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 用户手机号 */
      mobile?: string;
      /** 回答人 */
      replyTrueId?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<QuestionConfigDTO>;
    }
  }

  /** 根据手机号查询咨询记录接口 get /ask/question/record/list */
  function getRecordList(req: ET<GetRecordList.Req>, options?: object): Promise<ET<GetRecordList.Res>>;

  export module GetToolQueryLogList {
    export type ConsultLogListResponse = {
      fieldLogObjDTO?: Array<FieldLogObjDTO>;
    };
    export type FieldLogObjDTO = {
      /** 字段中文名称 */
      name?: string;
      /** 字段名称 */
      key?: string;
      /** 字段值 */
      value?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 咨询接入日志ID */
      logId?: string;
      /** 起始时间 */
      startTime: string;
      /** 终止时间 */
      endTime: string;
      /** 地区维度 */
      location?: string;
      /** 来源渠道 */
      channel?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ConsultLogListResponse>;
    }
  }

  /** get /tool/queryLogList */
  function getToolQueryLogList(req: ET<GetToolQueryLogList.Req>, options?: object): Promise<ET<GetToolQueryLogList.Res>>;

  export module GetCustomerList {
    export type CustomerJO = {
      /** 企业bizId */
      id?: string;
      /** 名称，如果类型是个人，这里是手机号 */
      name?: string;
      /** 类型。0-企业用户 1-机构 4-个人 */
      type?: string;
      /** 税号 */
      taxNo?: string;
      /** 权益列表 */
      rights?: AllTypeRightsJO;
      /** 绑定时间 */
      businessTime?: string;
    };
    export type AllTypeRightsJO = {
      /** 会员权益 */
      memberRights?: Array<RightsJO>;
      /** 专项权益 */
      specialRights?: Array<RightsJO>;
    };
    export type RightsJO = {
      /** 会员权益，权益类型：1，2，3专项权益，该值为空 */
      rightsType?: string;
      /** 会员权益，权益名称：办税操作咨询，财税实务咨询，财税专家咨询专项权益，配置的专项权益名称 */
      rightsName?: string;
      /** 权益总数，如果为-1表示不限次数 */
      total?: number;
      /** 最近要过期的权益信息 */
      firstEffect?: RightsDetailJO;
    };
    export type RightsDetailJO = {
      /** 授权数 */
      serviceValue?: number;
      /** 剩余天数 */
      remainingDays?: number;
      /** 有效期截至时间 */
      endDate?: string;
    };

    export interface Req {
      /** 用户手机号,不能为空 */
      mobile: string;
    }
    export type Res = Array<CustomerJO>;
  }

  /** get /customer/list */
  function getCustomerList(req: ET<GetCustomerList.Req>, options?: object): Promise<ET<GetCustomerList.Res>>;

  export module GetProductdimensionList {
    export type T = {
      /** 产品维度id */
      productDimensionId?: number;
      /** 业务类型id */
      businessTypeId?: number;
      /** 业务类型名称 */
      businessTypeName?: string;
      /** 产品维度名称 */
      productDimensionName?: string;
      /** 产品维度值 */
      productDimensionValue?: string;
      /** 产品维度状态。 0： 无效  1： 有效 */
      productDimensionStatus?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };

    export interface Req {
      /** 产品维度id */
      productDimensionId?: number;
      /** 业务类型id */
      businessTypeId?: number;
      /** 产品维度状态。 0： 无效  1： 有效 */
      productDimensionStatus?: string;
      /** 是否我是最后修改人 0： 不是   1：是 */
      lastModifierMe?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<T>;
    }
  }

  /** get /productdimension/list */
  function getProductdimensionList(req: ET<GetProductdimensionList.Req>, options?: object): Promise<ET<GetProductdimensionList.Res>>;

  export module PostProductdimensionUpdate {
    export interface Req {
      /** 产品维度id */
      productDimensionId: number;
      /** 业务类型id */
      businessTypeId: number;
    }
    export type Res = boolean;
  }

  /** post /productdimension/update */
  function postProductdimensionUpdate(req: ET<PostProductdimensionUpdate.Req>, options?: object): Promise<ET<PostProductdimensionUpdate.Res>>;

  export module GetBrandListWalle {
    export type BrandListResJO = {
      /** 产品维度id */
      id?: number;
      /** 业务类型id */
      brandTypeId?: number;
      /** 业务类型名称 */
      brandTypeName?: string;
      /** 产品维度名称 */
      name?: string;
      /** 产品维度值 */
      value?: string;
      /** 产品维度状态。 Y：有效 N：无效 */
      status?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: any;
      /** 产品维度id */
      ids?: Array<number>;
      /** 产品维度值列表 */
      values?: Array<string>;
      /** 业务类型id */
      brandTypeIds?: Array<number>;
      /** 产品维度状态。 Y：有效 N：无效 */
      status?: string;
      /** 修改人id */
      modifierId?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<BrandListResJO>;
    }
  }

  /** get /brand/list */
  function getBrandListWalle(req: ET<GetBrandListWalle.Req>, options?: object): Promise<ET<GetBrandListWalle.Res>>;

  export module PostBrandUpdate {
    export interface Req {
      /** 产品维度id */
      id: number;
      /** 业务类型id */
      brandTypeId: number;
    }
    export type Res = boolean;
  }

  /** post /brand/update */
  function postBrandUpdate(req: ET<PostBrandUpdate.Req>, options?: object): Promise<ET<PostBrandUpdate.Res>>;

  export module GetBrandtypeList {
    export type BrandTypeResDTO = {
      /** 业务类型id */
      id?: number;
      /** 业务类型名称 */
      name?: string;
      /** 是否默认业务类型 ： N： 默认  Y：非默认 */
      defaultFlag?: string;
    };

    export interface Req {
      /** 每页显示条数 */
      pageSize?: number;
      /** 当前页码 */
      pageIndex?: number;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<BrandTypeResDTO>;
    }
  }

  /** 查询业务类型列表 get /brandtype/list */
  function getBrandtypeList(req: ET<GetBrandtypeList.Req>, options?: object): Promise<ET<GetBrandtypeList.Res>>;

  export module PostBrandtypeSave {
    export interface Req {
      /** 业务类型名称 */
      name: string;
      /** 是否默认业务类型 ： N： 默认  Y：非默认 */
      defaultFlag?: string;
    }
    export interface Res {
      /** id */
      id?: number;
    }
  }

  /** 新增业务类型 post /brandtype/save */
  function postBrandtypeSave(req: ET<PostBrandtypeSave.Req>, options?: object): Promise<ET<PostBrandtypeSave.Res>>;

  export module PostBrandtypeUpdate {
    export interface Req {
      /** 业务类型id */
      id: number;
      /** 业务类型名称 */
      name: string;
      /** 是否默认业务类型 ： Y： 默认  N：非默认 */
      defaultFlag?: string;
    }
    export type Res = boolean;
  }

  /** 更新业务类型 post /brandtype/update */
  function postBrandtypeUpdate(req: ET<PostBrandtypeUpdate.Req>, options?: object): Promise<ET<PostBrandtypeUpdate.Res>>;

  export module PostBusinesstypeDelete {
    export interface Req {
      /** 业务类型id */
      businessTypeId: number;
    }
    export type Res = boolean;
  }

  /** post /businesstype/delete */
  function postBusinesstypeDelete(req: ET<PostBusinesstypeDelete.Req>, options?: object): Promise<ET<PostBusinesstypeDelete.Res>>;

  export module GetBusinesstypeList {
    export type T = {
      /** 业务类型id */
      businessTypeId?: number;
      /** 业务类型名称 */
      businessTypeName?: string;
      /** 业务类型标识。 0： 非默认  1:  默认 */
      businessTypeDefaultFlag?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<T>;
    }
  }

  /** get /businesstype/list */
  function getBusinesstypeList(req: ET<GetBusinesstypeList.Req>, options?: object): Promise<ET<GetBusinesstypeList.Res>>;

  export module GetBusinesstypeSave {
    export interface Req {
      /** 业务类型id */
      businessTypeId: number;
      /** 业务类型名称 */
      businessTypeName: string;
      /** 业务类型标识。 0： 非默认  1:  默认 */
      businessTypeDefaultFlag: string;
    }
    export interface Res {
      /** id */
      id?: number;
    }
  }

  /** get /businesstype/save */
  function getBusinesstypeSave(req: ET<GetBusinesstypeSave.Req>, options?: object): Promise<ET<GetBusinesstypeSave.Res>>;

  export module PostBrandtypeDelete {
    export interface Req {
      /** id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除业务类型 post /brandtype/delete */
  function postBrandtypeDelete(req: ET<PostBrandtypeDelete.Req>, options?: object): Promise<ET<PostBrandtypeDelete.Res>>;

  export module GetActionList {
    export type OperateActionResponseDTO = {
      /** id序号 */
      id?: number;
      /** 运营动作code */
      code?: string;
      /** 运营动作名称 */
      operateActionName?: string;
      /** 事项code和name */
      matterList?: Array<MatterDTO>;
      /** 在线技能组 */
      onlineGroupsList?: Array<SkillGroupDTO>;
      /** 来电技能组 */
      incallGroupsList?: Array<SkillGroupDTO>;
      /** 在线组是否显示: Y 是，N否 默认N */
      isShowOnline?: string;
      /** 来电组是否显示: Y 是，N否 默认N */
      isShowIncall?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };
    export type MatterDTO = {
      /** 事项code */
      matterCode?: string;
      /** 事项名称 */
      matterName?: string;
    };
    export type SkillGroupDTO = {
      /** 技能组id */
      skillGroupId?: number;
      /** 技能组名称 */
      skillGroupName?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 运营动作code */
      actionCodeList?: Array<string>;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<OperateActionResponseDTO>;
    }
  }

  /** 查询运营动作列表接口 get /operate/action/list */
  function getActionList(req: ET<GetActionList.Req>, options?: object): Promise<ET<GetActionList.Res>>;

  export module PostActionSave {
    export interface Req {
      /** 运营动作code列表 */
      operateActionCodeList: Array<string>;
      /** 事项code列表 */
      matterCodeList?: Array<string>;
      /** 在线业务组的id列表 */
      onlineGroupIdList?: Array<number>;
      /** 来电业务组的id列表 */
      incallGroupIdList?: Array<number>;
      /** 在线组是否显示: Y 是，N否 默认N */
      isShowOnline?: string;
      /** 来电组是否显示: Y 是，N否 默认N */
      isShowIncall?: string;
    }
    export type Res = boolean;
  }

  /** 保存运营动作事项接口 post /operate/action/save */
  function postActionSave(req: ET<PostActionSave.Req>, options?: object): Promise<ET<PostActionSave.Res>>;

  export module PostActionUpdate {
    export interface Req {
      /** id */
      id: number;
      /** 事项code列表 */
      matterCodeList?: Array<string>;
      /** 在线业务组的id列表 */
      onlineGroupIdList?: Array<number>;
      /** 来电业务组的id列表 */
      incallGroupIdList?: Array<number>;
      /** 在线组是否显示: Y 是，N否 默认N */
      isShowOnline?: string;
      /** 来电组是否显示: Y 是，N否 默认N */
      isShowIncall?: string;
    }
    export type Res = boolean;
  }

  /** 修改运营动作事项接口 post /operate/action/update */
  function postActionUpdate(req: ET<PostActionUpdate.Req>, options?: object): Promise<ET<PostActionUpdate.Res>>;

  export module PostActionDelete {
    export interface Req {
      /** 运营动作关联事项技能组表id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除运营动作事项接口 post /operate/action/delete */
  function postActionDelete(req: ET<PostActionDelete.Req>, options?: object): Promise<ET<PostActionDelete.Res>>;

  export module GetActionMatterList {
    export type OperateActionMatterResponseDTO = {
      /** 运营动作列表 */
      operateActionList?: Array<OperateActionDTO>;
      /** 事项列表 */
      matterDTOList?: Array<MatterDTO>;
    };
    export type OperateActionDTO = {
      /** 运营动作code */
      operateActionCode?: string;
      /** 运营动作名称 */
      operateActionName?: string;
    };
    export type MatterDTO = {
      /** 事项code */
      matterCode?: number;
      /** 事项名称 */
      matterName?: string;
    };

    export type Req = any;
    export type Res = Array<OperateActionMatterResponseDTO>;
  }

  /** 查询运营动作事项列表接口 get /operate/action/matterList */
  function getActionMatterList(req?: ET<GetActionMatterList.Req>, options?: object): Promise<ET<GetActionMatterList.Res>>;

  export module GetRightDeductQuery {
    export type ConsultRightDeductDTO = {
      /** ID */
      id?: number;
      /** 咨询受理ID */
      msgId?: number;
      /** 咨询日志ID */
      accessLogId?: string;
      /** 咨询用户信息ID */
      consultUserInfoId?: number;
      /** 权益类型：2-财税实务咨询、3-财税专家咨询 */
      rightType?: string;
      /** 权益类型名称 */
      rightTypeName?: string;
      /** 扣除前权益次数 */
      beforeDeductNumber?: number;
      /** 应扣减次数 */
      needDeductNumber?: number;
      /** 扣减成功次数 */
      successNumber?: number;
      /** 咨询时长 */
      consultInterval?: number;
      /** 是否转接: Y 是，N否 默认N */
      isTransfer?: string;
      /** 备注(有转接则多个msgId逗号分隔) */
      describe?: string;
      /** 逻辑删除 */
      isDelete?: number;
      /** 创建时间 */
      createDate?: string;
      /** 用户类型:0-企业, 1-机构, 4-个人用户 */
      customerType?: string;
      /** 客户名称 */
      userName?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      /** 咨询受理ID */
      msgId?: number;
      /** 咨询日志ID */
      accessLogId?: string;
      /** 开始时间 */
      startDate: string;
      /** 结束时间 */
      endDate: string;
      /** 权益类型：2-财税实务咨询、3-财税专家咨询 */
      rightType?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ConsultRightDeductDTO>;
    }
  }

  /** 列表 get /rightDeduct/query */
  function getRightDeductQuery(req: ET<GetRightDeductQuery.Req>, options?: object): Promise<ET<GetRightDeductQuery.Res>>;

  export module GetRightDeductDetail {
    export type ConsultRightDeductInfoLogDTO = {
      /** 权益接口日志 */
      infoLogList?: Array<DeductInfoLogDTO>;
    };
    export type ConsultRightDeductFailLogDTO = {
      /** lie800接口日志 */
      failLogList?: Array<DeductFailLogDTO>;
    };
    export type DeductInfoLogDTO = {
      /** 字段名称 */
      name?: string;
      /** 字段key */
      key?: string;
      /** 字段值 */
      value?: string;
    };
    export type DeductFailLogDTO = {
      /** 字段名称 */
      name?: string;
      /** 字段key */
      key?: string;
      /** 字段值 */
      value?: string;
    };

    export interface Req {
      /** 扣减记录id */
      id: number;
    }
    export interface Res {
      /** 权益接口日志 */
      deductInfoList?: Array<ConsultRightDeductInfoLogDTO>;
      /** lie800接口日志 */
      deductFailList?: Array<ConsultRightDeductFailLogDTO>;
    }
  }

  /** 详情 get /rightDeduct/detail */
  function getRightDeductDetail(req: ET<GetRightDeductDetail.Req>, options?: object): Promise<ET<GetRightDeductDetail.Res>>;

  export module GetDataList {
    export type QuestionVoteDataDTO = {
      /** 问题id */
      questionId?: number;
      /** 问题标签 */
      labelList?: Array<string>;
      /** 问题是否公开,Y-是，N-否 */
      openStatus?: string;
      /** 提问时间 */
      askTime?: string;
      /** 提问手机号 */
      mobile?: string;
      /** 回答信息 */
      reply?: ReplyConfigDTO;
    };
    export type ReplyConfigDTO = {
      /** 答案id */
      replyId?: number;
      /** 问题id */
      questionId?: number;
      /** 回答内容 */
      reply?: string;
      /** 适用地区 */
      locationList?: Array<LocationDTO>;
      /** 审核状态，UN_COMMIT_AUDIT-未提交，UN_AUDIT-未审核，AUDIT_PASS-审核通过，AUDIT_UN_PASS-审核未通过 */
      replyAuditStatus?: string;
      /** 审核不通过描述 */
      auditUnPassReason?: string;
      /** 审核人 */
      auditor?: string;
      /** 回答人署名，默认财税小管家 */
      replyName?: string;
      /** 回答人 */
      replyRealName?: string;
      /** 逻辑删除 */
      isDelete?: number;
      /** 回答时间 */
      replyTime?: string;
      /** 审核时间 */
      auditTime?: string;
      /** 回答人头像地址 */
      replyHeaderUrl?: string;
      /** 是否采纳，Y-已采纳，N-没采纳 */
      isSolve?: string;
      /** 顶的数量 */
      vote?: number;
      /** 踩的数量 */
      voteDown?: number;
    };
    export type LocationDTO = {
      /** 地区code */
      code?: string;
      /** 地区名称 */
      name?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      /** 用户问题 */
      question?: string;
      /** 提问人 */
      mobile?: string;
      /** 问题标签 */
      labelId?: string;
      /** 提问时间起 */
      askDateBegin?: string;
      /** 提问时间止 */
      askDateEnd?: string;
      /** 回答日期起 */
      replyDateBegin?: string;
      /** 回答日期止 */
      replyDateEnd?: string;
      /** 回答人 */
      replyTrueId?: string;
      /** 是否解决,Y解决，N未解决 */
      isSolve?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<QuestionVoteDataDTO>;
    }
  }

  /** 数据统计接口 get /ask/question/data/list */
  function getDataList(req: ET<GetDataList.Req>, options?: object): Promise<ET<GetDataList.Res>>;

  export module GetVoteDownDetail {
    export type VoteDownDetailDTO = {
      /** 手机号 */
      mobile?: string;
      /** 点踩原因 */
      reason?: string;
    };

    export interface Req {
      replyId: number;
    }
    export type Res = Array<VoteDownDetailDTO>;
  }

  /** 点踩详情接口 get /ask/question/voteDown/detail */
  function getVoteDownDetail(req: ET<GetVoteDownDetail.Req>, options?: object): Promise<ET<GetVoteDownDetail.Res>>;

  export module GetQueueabandonLogExport {
    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: any;
      /** 排队时间-开始 */
      queueTimeStart: string;
      /** 排队时间-结束 */
      queueTimeEnd: string;
      /** 放弃时间-开始 */
      abandonTimeStart: string;
      /** 放弃时间-结束 */
      abandonTimeEnd: string;
      /** 地区 */
      locations?: Array<string>;
      /** 渠道 */
      channels?: Array<string>;
      /** 接待组 */
      groupIds?: Array<number>;
    }
    export type Res = void;
  }

  /** 导出排队放弃列表 get /queueabandon/log/export */
  function getQueueabandonLogExport(req: ET<GetQueueabandonLogExport.Req>, options?: object): Promise<ET<GetQueueabandonLogExport.Res>>;

  export module GetQueueabandonLogList {
    export type QueueAbandonLogQueryResJO = {
      id?: number;
      /** 日志id */
      logId?: string;
      /** 开始排队时间 */
      startQueueTime?: string;
      /** 结束排队时间 */
      endQueueTime?: string;
      /** 会话保持时间 */
      durationTime?: string;
      /** 误差时间 */
      differencesTime?: string;
      /** 排队时长：秒数 */
      queueInterval?: number;
      /** 是否转接：Y-是 N-否 */
      hasTransfer?: string;
      /** 用户发的消息 */
      messages?: string;
      /** 放弃原因：0-默认放弃；1-点击机器人服务；2-点击对话输入框关闭按钮；3-点击浏览器关闭按钮； */
      cancelReason?: string;
      /** 机构名称 */
      agencyName?: string;
      /** 机构代码 */
      agencyCode?: string;
      /** 企业名称 */
      enterpriseName?: string;
      /** 企业税号 */
      enterpriseIrd?: string;
      /** 个人账号 */
      personalAccount?: string;
      /** 个人名称 */
      personalName?: string;
      /** 地区代码 */
      locationCode?: string;
      /** 地区名称 */
      locationName?: string;
      /** 接待组名称 */
      receptionGroupName?: string;
      /** 接待组id */
      receptionGroupId?: number;
      /** 渠道代码 */
      channelCode?: string;
      /** 渠道名称 */
      channelName?: string;
      /** 转接对话链路：多个按逗号分隔 */
      transferChain?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: any;
      /** 排队时间-开始 */
      queueTimeStart: string;
      /** 排队时间-结束 */
      queueTimeEnd: string;
      /** 放弃时间-开始 */
      abandonTimeStart: string;
      /** 放弃时间-结束 */
      abandonTimeEnd: string;
      /** 地区 */
      locations?: Array<string>;
      /** 渠道 */
      channels?: Array<string>;
      /** 接待组 */
      groupIds?: Array<number>;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<QueueAbandonLogQueryResJO>;
    }
  }

  /** 查询排队放弃列表 get /queueabandon/log/list */
  function getQueueabandonLogList(req: ET<GetQueueabandonLogList.Req>, options?: object): Promise<ET<GetQueueabandonLogList.Res>>;

  export module GetActionOption {
    export type OperateActionDTO = {
      /** 运营动作code */
      code?: string;
      /** 运营动作名称 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<OperateActionDTO>;
  }

  /** 查询运营动作接口 get /operate/action/option */
  function getActionOption(req?: ET<GetActionOption.Req>, options?: object): Promise<ET<GetActionOption.Res>>;

  export module GetPersonaConsultList {
    export type PersonaConsultListJO = {
      /** 咨询时间 */
      consultDate?: string;
      /** 地区 */
      location?: string;
      /** 公司 */
      companyName?: string;
      /** 机构 */
      agencyName?: string;
      /** 用户问 */
      userQuestion?: string;
      /** 问题类型 */
      questionType?: string;
      /** 业务 */
      business?: string;
      /** 场景 */
      scene?: string;
      /** 职位 */
      position?: string;
      /** 渠道 */
      channel?: string;
      /** 满意度 */
      satisfied?: string;
      /** 解决情况 */
      solution?: string;
      /** 企业所属行业 */
      industry?: string;
      /** 纳税人类型 */
      taxpayerType?: string;
      /** 受理人 */
      agentName?: string;
      /** 受理组 */
      groupName?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: any;
      /** 必填，手机号 */
      mobile: string;
      /** 查询开始的时间 */
      startDate: string;
      /** 查询结束的时间 */
      endDate: string;
      /** 查询标识，Y-只查询有标签数据，N-只查询无标签数据。不传或传其他，查全部数据 */
      onlyQueryFlag?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<PersonaConsultListJO>;
    }
  }

  /** 用户咨询列表 get /dm/persona/consultList */
  function getPersonaConsultList(req: ET<GetPersonaConsultList.Req>, options?: object): Promise<ET<GetPersonaConsultList.Res>>;

  export module GetPersonaList {
    export type PersonaListJO = {
      /** 用户手机号 */
      mobile?: string;
      /** 用户名称 */
      name?: string;
      /** 地区 */
      location?: Array<string>;
      /** 来源渠道 */
      channel?: Array<string>;
      /** 最后一次咨询时间 */
      lastConsultTime?: string;
      /** 近一年咨询总数 */
      consultNum?: number;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: any;
      /** 手机号 */
      mobile?: string;
      /** 地区code */
      location?: Array<string>;
      /** 来源渠道 */
      channel?: Array<string>;
      /** 查询开始的时间 */
      startDate: string;
      /** 查询结束的时间 */
      endDate: string;
      /** 企业名称 */
      companyName?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<PersonaListJO>;
    }
  }

  /** 用户画像列表 get /dm/persona/list */
  function getPersonaList(req: ET<GetPersonaList.Req>, options?: object): Promise<ET<GetPersonaList.Res>>;

  export module GetPersonaDetail {
    export type PersonaTagJO = {
      /** 标签 */
      name?: string;
      /** 数量 */
      count?: number;
    };
    export type CompanyDetailJO = {
      /** 企业名称 */
      companyName?: string;
      /** 企业所在行政区划 */
      areaName?: string;
    };

    export interface Req {
      /** 必填，手机号 */
      mobile: string;
      /** 查询开始的时间 */
      startDate: string;
      /** 查询结束的时间 */
      endDate: string;
    }
    export interface Res {
      /** 用户名称 */
      name?: string;
      /** 用户头像地址 */
      imageUrl?: string;
      /** 手机号 */
      mobile?: string;
      /** qq号 */
      qq?: string;
      /** 性别：男，女 */
      male?: string;
      /** 行业类型，按数量大到小排序返回 */
      business?: Array<PersonaTagJO>;
      /** 用户职位，按数量大到小排序返回 */
      position?: Array<PersonaTagJO>;
      /** 用户类型，按数量大到小排序返回 */
      accountType?: Array<PersonaTagJO>;
      /** 渠道，按数量大到小排序返回 */
      channel?: Array<PersonaTagJO>;
      /** 地区，按数量大到小排序返回 */
      location?: Array<PersonaTagJO>;
      /** 纳税人类型名称，按数量大到小排序返回 */
      taxpayerType?: Array<PersonaTagJO>;
      /** 机构名称列表 */
      agencyList?: Array<string>;
      /** 企业名称列表 */
      companyList?: Array<CompanyDetailJO>;
      /** 财税咨询总量 */
      totalConsultCount?: number;
      /** 财税咨询总量均值 */
      totalConsultCountAverage?: number;
      /** 基础财税咨询次数 */
      basicConsultCount?: number;
      /** 基础财税咨询次数均值 */
      basicConsultCountAverage?: number;
      /** 专家财税咨询次数 */
      expertConsultCount?: number;
      /** 专家财税咨询次数均值 */
      expertConsultCountAverage?: number;
      /** 总咨询时长，单位：秒 */
      totalConsultTime?: number;
      /** 总咨询时长均值，单位：秒 */
      totalConsultTimeAverage?: number;
      /** 平均咨询时长，单位：秒 */
      averageConsultTime?: number;
      /** 平均咨询时长均值，单位：秒 */
      averageConsultTimeAverage?: number;
      /** 最长咨询时长，单位：秒 */
      maxConsultTime?: number;
      /** 最长咨询时长均值，单位：秒 */
      maxConsultTimeAverage?: number;
      /** 满意次数 */
      satisfiedCount?: number;
      /** 不满意数量 */
      notSatisfiedCount?: number;
      /** 满意率均值,百分数 */
      satisfiedAverage?: number;
      /** 问题解决数量 */
      solutionCount?: number;
      /** 问题未解决数量 */
      unsolutionCount?: number;
      /** 解决率均值,百分数 */
      solutionAverage?: number;
      /** 咨询频率标签 */
      frequencyLabel?: string;
      /** 咨询程度标签 */
      heavyLabel?: string;
    }
  }

  /** 用户画像，用户信息详情 get /dm/persona/detail */
  function getPersonaDetail(req: ET<GetPersonaDetail.Req>, options?: object): Promise<ET<GetPersonaDetail.Res>>;

  export module GetConsultLastTagStatistics {
    export type ChartDataJO = {
      /** 数据名称 */
      name?: string;
      /** 数据值 */
      count?: number;
      /** 子项图数据 */
      chartData?: Array<ChartDataJO>;
    };

    export interface Req {
      /** 查询开始的时间 */
      startDate: string;
      /** 查询结束的时间 */
      endDate: string;
      /** 地区code。不传地区，统计全国 */
      location?: string;
      /** 统计的标签类型：问题-QUESTION */
      tagType: string;
    }
    export type Res = Array<ChartDataJO>;
  }

  /** 按地区统计咨询末级标签 get /dm/consult/lastTagStatistics */
  function getConsultLastTagStatistics(req: ET<GetConsultLastTagStatistics.Req>, options?: object): Promise<ET<GetConsultLastTagStatistics.Res>>;

  export module GetConsultLocationStatistics {
    export type LocationStatisticsJO = {
      /** 名称 */
      name?: string;
      /** 地区 */
      location?: string;
      /** 数量 */
      count?: number;
      /** 当月新增数量 */
      monthCount?: number;
    };

    export interface Req {
      /** 查询开始的时间 */
      startDate: string;
      /** 查询结束的时间 */
      endDate: string;
      /** 统计的标签类型：问题-QUESTION */
      tagType: string;
    }
    export type Res = Array<LocationStatisticsJO>;
  }

  /** 地区数据统计 get /dm/consult/locationStatistics */
  function getConsultLocationStatistics(req: ET<GetConsultLocationStatistics.Req>, options?: object): Promise<ET<GetConsultLocationStatistics.Res>>;

  export module GetConsultMonthStatistics {
    export type ChartDataJO = {
      /** 数据名称 */
      name?: string;
      /** 数据值 */
      count?: number;
      /** 子项图数据 */
      chartData?: Array<ChartDataJO>;
    };

    export interface Req {
      /** 查询开始的时间 */
      startDate: string;
      /** 查询结束的时间 */
      endDate: string;
      /** 标签code。不传code统计全部标签 */
      tagCode?: string;
      /** 统计的标签类型：问题-QUESTION */
      tagType: string;
    }
    export type Res = Array<ChartDataJO>;
  }

  /** 按月统计咨询问题 get /dm/consult/monthStatistics */
  function getConsultMonthStatistics(req: ET<GetConsultMonthStatistics.Req>, options?: object): Promise<ET<GetConsultMonthStatistics.Res>>;

  export module GetConsultTagStatistics {
    export type TagStatisticsJO = {
      /** 名称 */
      name?: string;
      /** 标签code */
      tagCode?: string;
      /** 数量 */
      count?: number;
      /** 当月新增数量 */
      monthCount?: number;
    };

    export interface Req {
      /** 查询开始的时间 */
      startDate: string;
      /** 查询结束的时间 */
      endDate: string;
      /** 统计的标签类型：问题-QUESTION */
      tagType: string;
    }
    export type Res = Array<TagStatisticsJO>;
  }

  /** 标签数据统计 get /dm/consult/tagStatistics */
  function getConsultTagStatistics(req: ET<GetConsultTagStatistics.Req>, options?: object): Promise<ET<GetConsultTagStatistics.Res>>;

  export module GetPersonaTagStatistics {
    export type ChartDataJO = {
      /** 数据名称 */
      name?: string;
      /** 数据值 */
      count?: number;
      /** 子项图数据 */
      chartData?: Array<ChartDataJO>;
    };

    export interface Req {
      /** 必填，手机号 */
      mobile: string;
      /** 查询开始的时间 */
      startDate: string;
      /** 查询结束的时间 */
      endDate: string;
      /** 统计的标签类型：问题-QUESTION */
      tagType: string;
    }
    export type Res = Array<ChartDataJO>;
  }

  /** 用户画像，标签统计 get /dm/persona/tagStatistics */
  function getPersonaTagStatistics(req: ET<GetPersonaTagStatistics.Req>, options?: object): Promise<ET<GetPersonaTagStatistics.Res>>;

  export module GetConsultGetYearTag {
    export type YearTagJO = {
      /** 年份 */
      year?: number;
    };

    export type Req = any;
    export type Res = Array<YearTagJO>;
  }

  /** 年份标签 get /dm/consult/getYearTag */
  function getConsultGetYearTag(req?: ET<GetConsultGetYearTag.Req>, options?: object): Promise<ET<GetConsultGetYearTag.Res>>;

  export module GetExpertScheduleDetail {
    export interface Req {
      /** 专家id */
      expertId: number;
      /** 问诊方式 */
      serviceMode: string;
      /** 开始服务时间 */
      startServiceDate: any;
      /** 结束服务时间 */
      endServiceDate: any;
    }
    export interface Res {
      /** 排期时间列表 */
      dateStrList?: Array<string>;
    }
  }

  /** 查询专家问诊排期详情 get /expertSchedule/detail */
  function getExpertScheduleDetail(req: ET<GetExpertScheduleDetail.Req>, options?: object): Promise<ET<GetExpertScheduleDetail.Res>>;

  export module PostExpertScheduleImport {
    export interface Req {
      /** 导入文件 */
      file: any;
    }
    export interface Res {
      /** 导入错误集 */
      errorList?: Array<string>;
    }
  }

  /** 导入专家问诊排期 post /expertSchedule/import */
  function postExpertScheduleImport(req: ET<PostExpertScheduleImport.Req>, options?: object): Promise<ET<PostExpertScheduleImport.Res>>;

  export module GetExpertScheduleListByPage {
    export type ExpertInquirySchedulePageDTO = {
      /** 专家id */
      expertId?: number;
      /** 专家名称 */
      expertName?: string;
      /** 所属地区名称 */
      locationNameList?: Array<string>;
      /** 擅长行业 */
      skilledTradeNameList?: Array<string>;
      /** 问诊方式 */
      serviceModeList?: Array<ServiceModeDTO>;
      /** 问诊地区名称 */
      serviceLocationNameList?: Array<string>;
    };
    export type ServiceModeDTO = {
      /** 问诊名称 */
      name?: string;
      /** 问诊code */
      code?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 专家名称 */
      expertName?: string;
      /** 问诊方式 */
      serviceMode?: string;
      /** 问诊地区 */
      serviceLocation?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ExpertInquirySchedulePageDTO>;
    }
  }

  /** 分页查询专家问诊排期列表 get /expertSchedule/listByPage */
  function getExpertScheduleListByPage(req: ET<GetExpertScheduleListByPage.Req>, options?: object): Promise<ET<GetExpertScheduleListByPage.Res>>;

  export module GetV2GetById {
    export type GuidePageDataDTO = {
      /** 主键ID */
      id?: number;
      /** 元数据ID */
      metaId?: number;
      /** 入口顺序 */
      indexNum?: number;
      /** 默认图片地址 */
      defaultImgPath?: string;
      /** 默认图片名称 */
      defaultImgName?: string;
      /** 悬浮图片地址 */
      hoverImgPath?: string;
      /** 悬浮图片名称 */
      hoverImgName?: string;
      /** 是否是会员通道（Y：是，N：否） */
      vipEntranceFlag?: string;
      /** 咨询服务对应字典consultService */
      consultService?: string;
      /** 构件类型（0：服务构件，1：软件构件） */
      gjlx?: string;
      /** 构件ID */
      gjid?: string;
      /** 无构件处理类型（0：弹出宣传图，1：禁用图片） */
      extraDealType?: number;
      /** 特殊处理图片地址 */
      extraImgPath?: string;
      /** 特殊处理图片名称 */
      extraImgName?: string;
      /** 跳转网页链接 */
      jumpPageUrl?: string;
      /** 产品维度 */
      cpwd?: string;
    };

    export interface Req {
      /** 元数据主键ID */
      id: number;
    }
    export interface Res {
      /** 元数据表主键ID */
      id?: number;
      /** 入口类型 */
      entryType?: string;
      /** 地区代码 */
      location?: string;
      /** 产品代码 */
      cpdm?: string;
      /** 来源渠道 */
      channel?: string;
      /** 模块名称 */
      module?: string;
      /** 入口数量 */
      entryAmount?: number;
      /** 入口页配置信息列表 */
      entryList?: Array<GuidePageDataDTO>;
    }
  }

  /** 根据主键ID查询咨引导页配置信息详情 get /guidePage/v2/getById */
  function getV2GetById(req: ET<GetV2GetById.Req>, options?: object): Promise<ET<GetV2GetById.Res>>;

  export module PostV2Save {
    export type SaveGuidePageDataDTORequest = {
      /** 入口顺序 */
      indexNum?: number;
      /** 默认图片地址 */
      defaultImgPath?: string;
      /** 默认图片名称 */
      defaultImgName?: string;
      /** 悬浮图片地址 */
      hoverImgPath?: string;
      /** 悬浮图片名称 */
      hoverImgName?: string;
      /** 是否是会员通道（Y：是，N：否） */
      vipEntranceFlag?: string;
      /** 咨询服务，对应字典consultService */
      consultService?: string;
      /** 构件类型（0：服务构件，1：软件构件） */
      gjlx?: string;
      /** 构件ID */
      gjid?: string;
      /** 无构件处理类型（0：弹出宣传图，1：禁用图片） */
      extraDealType?: number;
      /** 特殊处理图片地址 */
      extraImgPath?: string;
      /** 特殊处理图片名称 */
      extraImgName?: string;
      /** 跳转网页链接 */
      jumpPageUrl?: string;
      /** 产品维度 */
      cpwd?: string;
    };

    export interface Req {
      /** 主键ID */
      id?: number;
      /** 入口类型 */
      entryType?: string;
      /** 地区代码 */
      location?: string;
      /** 产品代码 */
      cpdm?: string;
      /** 来源渠道 */
      channel?: string;
      /** 模块名称 */
      module?: string;
      /** 入口数量 */
      entryAmount?: number;
      /** 新增引导页入口数据请求参数列表 */
      entryList?: Array<SaveGuidePageDataDTORequest>;
    }
    export type Res = number;
  }

  /** 新增引导页配置信息 post /guidePage/v2/save */
  function postV2Save(req: ET<PostV2Save.Req>, options?: object): Promise<ET<PostV2Save.Res>>;

  export module PostV2Update {
    export type SaveGuidePageDataDTORequest = {
      /** 入口顺序 */
      indexNum?: number;
      /** 默认图片地址 */
      defaultImgPath?: string;
      /** 默认图片名称 */
      defaultImgName?: string;
      /** 悬浮图片地址 */
      hoverImgPath?: string;
      /** 悬浮图片名称 */
      hoverImgName?: string;
      /** 是否是会员通道（Y：是，N：否） */
      vipEntranceFlag?: string;
      /** 咨询服务，对应字典consultService */
      consultService?: string;
      /** 构件类型（0：服务构件，1：软件构件） */
      gjlx?: string;
      /** 构件ID */
      gjid?: string;
      /** 无构件处理类型（0：弹出宣传图，1：禁用图片） */
      extraDealType?: number;
      /** 特殊处理图片地址 */
      extraImgPath?: string;
      /** 特殊处理图片名称 */
      extraImgName?: string;
      /** 跳转网页链接 */
      jumpPageUrl?: string;
      /** 产品维度 */
      cpwd?: string;
    };

    export interface Req {
      /** 主键ID */
      id?: number;
      /** 入口类型 */
      entryType?: string;
      /** 地区代码 */
      location?: string;
      /** 产品代码 */
      cpdm?: string;
      /** 来源渠道 */
      channel?: string;
      /** 模块名称 */
      module?: string;
      /** 入口数量 */
      entryAmount?: number;
      /** 新增引导页入口数据请求参数列表 */
      entryList?: Array<SaveGuidePageDataDTORequest>;
    }
    export type Res = number;
  }

  /** 更新引导页数据 post /guidePage/v2/update */
  function postV2Update(req: ET<PostV2Update.Req>, options?: object): Promise<ET<PostV2Update.Res>>;

  export module GetExpertInquiryRecordList {
    export type T = {
      /** 问诊id */
      id?: number;
      /** 问诊专家 */
      expertName?: string;
      /** 问诊时间 */
      inquiryTime?: string;
      /** 问诊方式 */
      serviceMode?: string;
      /** 问诊地区 */
      serviceLocation?: string;
      /** 问诊身份 */
      customerType?: string;
      /** 身份名称 */
      customerName?: string;
      /** 手机号 */
      phone?: string;
      /** 用户岗位 */
      customerWork?: string;
      /** 自主预约状态;Y：自主预约；N：非自主 */
      independentAppointment?: string;
      /** 问诊状态;0:待问诊；1:已问诊； */
      status?: string;
      /** 记录内容 */
      recordContent?: string;
      /** 线索状态 */
      clueStatus?: string;
    };

    export interface Req {
      /** 身份名称 */
      customerName?: string;
      /** 服务地区 */
      serviceLocation?: string;
      /** 自助预约 */
      independentAppointment?: string;
      /** 问诊状态 */
      status?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<T>;
    }
  }

  /** 专家问诊记录列表 get /expertInquiryRecord/list */
  function getExpertInquiryRecordList(req: ET<GetExpertInquiryRecordList.Req>, options?: object): Promise<ET<GetExpertInquiryRecordList.Res>>;

  export module PostExpertInquiryRecordComplete {
    export interface Req {
      id: number;
    }
    export type Res = boolean;
  }

  /** 完成问诊 post /expertInquiryRecord/complete */
  function postExpertInquiryRecordComplete(req: ET<PostExpertInquiryRecordComplete.Req>, options?: object): Promise<ET<PostExpertInquiryRecordComplete.Res>>;

  export module PostExpertInquiryRecordUpdateRecordContent {
    export interface Req {
      /** id */
      id: number;
      /** 服务记录 */
      content?: string;
    }
    export type Res = boolean;
  }

  /** 更新问诊服务记录 post /expertInquiryRecord/updateRecordContent */
  function postExpertInquiryRecordUpdateRecordContent(req: ET<PostExpertInquiryRecordUpdateRecordContent.Req>, options?: object): Promise<ET<PostExpertInquiryRecordUpdateRecordContent.Res>>;

  export module PostCommonQueryClueRecord {
    export interface Req {
      /** 业务id */
      businessId: string;
      /** 业务类型 EXPERT_INQUIRY:专家问诊 */
      businessType: number;
    }
    export interface Res {
      /** 业务id */
      businessId?: string;
      /** 业务类型 */
      businessType?: number;
      /** 线索内容 json格式 */
      content?: string;
    }
  }

  /** 根据业务ID查询线索 post /common/queryClueRecord */
  function postCommonQueryClueRecord(req: ET<PostCommonQueryClueRecord.Req>, options?: object): Promise<ET<PostCommonQueryClueRecord.Res>>;

  export module PostCommonSaveClueRecord {
    export interface Req {
      /** 业务主键Id,目前是业务表的自增主键id */
      businessId: string;
      /** 线索名称 */
      clueName?: string;
      /** 用户姓名 */
      name?: string;
      /** 用户手机号码 */
      mobile?: string;
      /** 线索来源 1:亿企咨询专家问诊服务 */
      businessType: number;
      /** 地区（code） */
      location?: string;
      /** 线索描述 */
      question?: string;
      /** 咨询用户id */
      customerId?: string;
    }
    export type Res = boolean;
  }

  /** 生成线索 post /common/saveClueRecord */
  function postCommonSaveClueRecord(req: ET<PostCommonSaveClueRecord.Req>, options?: object): Promise<ET<PostCommonSaveClueRecord.Res>>;

  export module GetCommonQueryClueRecord {
    export interface Req {
      /** 业务id */
      businessId: string;
      /** 业务类型 1:专家问诊 */
      businessType: number;
      /** 是否展示线索内容 */
      showContent?: boolean;
    }
    export interface Res {
      /** 业务id */
      businessId?: string;
      /** 业务类型 */
      businessType?: number;
      /** 线索内容 json格式 */
      content?: string;
    }
  }

  /** 根据业务ID查询线索 get /common/queryClueRecord */
  function getCommonQueryClueRecord(req: ET<GetCommonQueryClueRecord.Req>, options?: object): Promise<ET<GetCommonQueryClueRecord.Res>>;

  export module PostExpertScheduleDetail {
    export type LocalDate = any;

    export interface Req {
      /** 专家id */
      expertId: number;
      /** 问诊方式 */
      serviceMode: string;
      /** 开始服务时间 */
      startServiceDate: LocalDate;
      /** 结束服务时间 */
      endServiceDate: LocalDate;
    }
    export interface Res {
      /** 排期时间列表 */
      dateStrList?: Array<string>;
    }
  }

  /** 查询专家问诊排期详情 post /expertSchedule/detail */
  function postExpertScheduleDetail(req: ET<PostExpertScheduleDetail.Req>, options?: object): Promise<ET<PostExpertScheduleDetail.Res>>;

  export module PostExpertScheduleListByPage {
    export type T = {
      /** 专家id */
      expertId?: number;
      /** 专家名称 */
      expertName?: string;
      /** 所属地区名称 */
      locationName?: string;
      /** 擅长行业 */
      skilledTradeName?: string;
      /** 问诊方式名称 */
      serviceModeName?: string;
      /** 问诊地区名称 */
      serviceLocationName?: string;
    };

    export interface Req {
      /** 每页显示条数 */
      pageSize?: number;
      /** 当前页码 */
      pageIndex?: number;
      /** 专家名称 */
      expertName?: string;
      /** 问诊方式 */
      serviceMode?: string;
      /** 问诊地区 */
      serviceLocation?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<T>;
    }
  }

  /** 分页查询专家问诊排期列表 post /expertSchedule/listByPage */
  function postExpertScheduleListByPage(req: ET<PostExpertScheduleListByPage.Req>, options?: object): Promise<ET<PostExpertScheduleListByPage.Res>>;

  export module PostExpertInquiryRecordDealInquiryRecord {
    export interface Req {
      /** id */
      id: number;
      /** 操作 1：完成 0：取消 */
      operate: string;
    }
    export type Res = boolean;
  }

  /** 完成/取消问诊 post /expertInquiryRecord/dealInquiryRecord */
  function postExpertInquiryRecordDealInquiryRecord(req: ET<PostExpertInquiryRecordDealInquiryRecord.Req>, options?: object): Promise<ET<PostExpertInquiryRecordDealInquiryRecord.Res>>;

  export module GetExpertInquiryRecordListPage {
    export type ExpertInquiryRecordResponse = {
      /** 问诊id */
      id?: number;
      /** 问诊专家 */
      expertName?: string;
      /** 问诊日期 */
      serviceDate?: LocalDate;
      /** 问诊时间 */
      inquiryTime?: string;
      /** 问诊方式 */
      serviceMode?: string;
      /** 问诊地区 */
      serviceLocation?: string;
      /** 问诊地区code */
      serviceLocationCode?: string;
      /** 客户id */
      customerId?: number;
      /** 问诊身份 */
      customerType?: string;
      /** 身份名称 */
      customerName?: string;
      /** 用户地区 */
      customerArea?: string;
      /** 手机号 */
      phone?: string;
      /** 用户岗位 */
      customerWork?: string;
      /** 自主预约状态;Y：自主预约；N：非自主 */
      independentAppointment?: string;
      /** 问诊状态;0:待问诊；1:已问诊 2:已取消； */
      status?: string;
      /** 记录内容 */
      recordContent?: string;
      /** 线索状态；0：未生成；1：已生成 */
      clueStatus?: string;
      /** 问诊问题一 */
      questionFirst?: string;
      /** 问诊问题二 */
      questionSecond?: string;
      /** 问诊问题三 */
      questionThree?: string;
      /** 用户名称 */
      name?: string;
      /** 用户id */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
    };
    export type LocalDate = any;

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 问诊id */
      id?: number;
      /** 预约记录查询开始创建时间 */
      startCreateDate?: any;
      /** 预约记录查询结束创建时间 */
      endCreateDate?: any;
      /** 预约记录查询开始问诊时间 */
      startInquiryDate?: any;
      /** 预约记录查询结束问诊时间 */
      endInquiryDate?: any;
      /** 服务地区 */
      location?: string;
      /** 身份名称 */
      customerName?: string;
      /** 问诊状态;0:待问诊；1:已问诊 2:已取消； */
      status?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ExpertInquiryRecordResponse>;
    }
  }

  /** 专家问诊记录分页列表 get /expertInquiryRecord/listPage */
  function getExpertInquiryRecordListPage(req: ET<GetExpertInquiryRecordListPage.Req>, options?: object): Promise<ET<GetExpertInquiryRecordListPage.Res>>;

  export module GetClueQueryClueRecord {
    export interface Req {
      /** 业务id */
      businessId: string;
      /** 业务类型 1:专家问诊 */
      businessType: number;
      /** 是否展示线索内容 */
      showContent?: boolean;
    }
    export interface Res {
      id?: number;
      clueName?: string;
      name?: string;
      mobile?: string;
      businessId?: string;
      businessType?: number;
      source?: string;
      location?: string;
      question?: string;
      customerId?: string;
      isDeleted?: number;
    }
  }

  /** 根据业务ID查询线索 get /clue/queryClueRecord */
  function getClueQueryClueRecord(req: ET<GetClueQueryClueRecord.Req>, options?: object): Promise<ET<GetClueQueryClueRecord.Res>>;

  export module PostClueSaveClueRecord {
    export interface Req {
      /** 业务主键Id,目前是业务表的自增主键id */
      businessId: string;
      /** 线索名称 */
      clueName?: string;
      /** 用户姓名 */
      name?: string;
      /** 用户手机号码 */
      mobile?: string;
      /** 线索来源 1:亿企咨询专家问诊服务 */
      businessType: number;
      /** 地区（code） */
      location?: string;
      /** 线索描述 */
      question?: string;
      /** 咨询用户id (根据用户类型传不同的值，客户ID（用户类型为单位用户时填写（32位）客户中心ID），其他用户类型参考案例) */
      customerId?: string;
    }
    export type Res = number;
  }

  /** 生成线索 post /clue/saveClueRecord */
  function postClueSaveClueRecord(req: ET<PostClueSaveClueRecord.Req>, options?: object): Promise<ET<PostClueSaveClueRecord.Res>>;

  export module GetCommonDictValid {
    export type OptionResultDTO = {
      /** 选项组 */
      options?: Array<Options>;
      /** 组名 */
      groupName?: string;
    };
    export type Options = {
      /** 猜您想问系统ID */
      id?: string;
      /** 名称 */
      name?: string;
    };

    export interface Req {
      /** 选项组名称，多个用英文逗号分隔 */
      groupNames: string;
    }
    export type Res = Array<OptionResultDTO>;
  }

  /** 批量获取字典项接口（valid：'Y'） get /common/dictValid */
  function getCommonDictValid(req: ET<GetCommonDictValid.Req>, options?: object): Promise<ET<GetCommonDictValid.Res>>;

  export module GetCustomerFuzzyQueryCompany {
    export type CompanyJO = {
      /** 云上标准id */
      customerId?: number;
      /** 云下id */
      bizId?: string;
      /** 客户名称 */
      name?: string;
      /** 税号 */
      taxNo?: string;
    };

    export interface Req {
      /** 客户名称 */
      name: string;
      /** 地区code */
      location: string;
    }
    export type Res = Array<CompanyJO>;
  }

  /** 模糊查询企业信息 get /customer/fuzzyQueryCompany */
  function getCustomerFuzzyQueryCompany(req: ET<GetCustomerFuzzyQueryCompany.Req>, options?: object): Promise<ET<GetCustomerFuzzyQueryCompany.Res>>;

  export module GetExpertInquiryRecordExport {
    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 问诊id */
      id?: number;
      /** 预约记录查询开始创建时间 */
      startCreateDate?: any;
      /** 预约记录查询结束创建时间 */
      endCreateDate?: any;
      /** 预约记录查询开始问诊时间 */
      startInquiryDate?: any;
      /** 预约记录查询结束问诊时间 */
      endInquiryDate?: any;
      /** 服务地区 */
      location?: string;
      /** 身份名称 */
      customerName?: string;
      /** 问诊状态;0:待问诊；1:已问诊 2:已取消； */
      status?: string;
    }
    export type Res = void;
  }

  /** 问诊预约记录导出 get /expertInquiryRecord/export */
  function getExpertInquiryRecordExport(req: ET<GetExpertInquiryRecordExport.Req>, options?: object): Promise<ET<GetExpertInquiryRecordExport.Res>>;

  export module GetExpertInquiryRecordExpertList {
    export type InquiryExpertDTO = {
      /** 专家服务id */
      id?: number;
      /** 专家账号 */
      account?: string;
      /** 专家名称 */
      name?: string;
    };

    export interface Req {
      /** 问诊地区 */
      location: string;
    }
    export type Res = Array<InquiryExpertDTO>;
  }

  /** 查询问诊专家列表 get /expertInquiryRecord/expertList */
  function getExpertInquiryRecordExpertList(req: ET<GetExpertInquiryRecordExpertList.Req>, options?: object): Promise<ET<GetExpertInquiryRecordExpertList.Res>>;

  export module GetExpertInquiryRecordQueryExpertScheduleList {
    export type ExpertInquiryScheduleListDTO = {
      /** 专家id */
      expertId?: number;
      /** 专家名称 */
      expertName?: string;
      /** 排期信息 */
      expertInquiryScheduleList?: Array<ExpertInquiryScheduleMessageDTO>;
    };
    export type ExpertInquiryScheduleMessageDTO = {
      /** 排期id */
      id?: number;
      /** 服务方式;inquiry_online：线上专家问诊，inquiry_offline：线下专家问诊; */
      serviceMode?: string;
      /** 服务地区; */
      serviceLocation?: Array<string>;
      /** 线下地址 */
      offlineAddress?: string;
      /** 开始时间。格式：HH:mm */
      startTime?: LocalTime;
      /** 结束时间。格式：HH:mm */
      endTime?: LocalTime;
      /** 服务日期，格式：yyyy-MM-dd */
      serviceDate?: LocalDate;
      /** 预约状态。0-可预约，1-已预约 */
      inquiryStatus?: string;
    };
    export type LocalTime = any;
    export type LocalDate = any;

    export interface Req {
      /** 专家id */
      expertId: number;
    }
    export type Res = Array<ExpertInquiryScheduleListDTO>;
  }

  /** 根据问诊专家查询对应的排期列表 get /expertInquiryRecord/queryExpertScheduleList */
  function getExpertInquiryRecordQueryExpertScheduleList(req: ET<GetExpertInquiryRecordQueryExpertScheduleList.Req>, options?: object): Promise<ET<GetExpertInquiryRecordQueryExpertScheduleList.Res>>;

  export module PostExpertInquiryRecordSaveInquiryRecord {
    export type LocalTime = any;
    export type LocalDate = any;

    export interface Req {
      /** 专家id */
      expertId: number;
      /** 排期id */
      scheduleId: number;
      /** 代预约人名称 */
      insteadAppointmentName?: string;
      /** 服务方式;inquiry_online：线上专家问诊，inquiry_offline：线下专家问诊; */
      serviceMode: string;
      /** 问诊地区 */
      serviceLocation: string;
      /** 线下地址 */
      offlineAddress?: string;
      /** 开始时间。格式：HH:mm */
      startTime: LocalTime;
      /** 结束时间。格式：HH:mm */
      endTime: LocalTime;
      /** 服务日期，格式：yyyy-MM-dd */
      serviceDate: LocalDate;
      /** 客户id */
      customerId: number;
      /** 客户名称 */
      customerName: string;
      /** 客户类型: 0：单位客户；1：机构；4：个人用户 */
      customerType: string;
      /** 姓名 */
      name: string;
      /** 身份岗位编码列表 */
      customerWorkList?: Array<string>;
      /** 手机号 */
      mobile: string;
      /** 问诊问题列表 */
      questionList: Array<string>;
    }
    export type Res = number;
  }

  /** 保存代预约问诊记录 post /expertInquiryRecord/saveInquiryRecord */
  function postExpertInquiryRecordSaveInquiryRecord(req: ET<PostExpertInquiryRecordSaveInquiryRecord.Req>, options?: object): Promise<ET<PostExpertInquiryRecordSaveInquiryRecord.Res>>;

  export module PostExpertScheduleDeleteInquirySchedule {
    export interface Req {
      /** 排期id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除排期 post /expertSchedule/deleteInquirySchedule */
  function postExpertScheduleDeleteInquirySchedule(req: ET<PostExpertScheduleDeleteInquirySchedule.Req>, options?: object): Promise<ET<PostExpertScheduleDeleteInquirySchedule.Res>>;

  export module GetExpertScheduleQueryScheduleList {
    export type ExpertInquiryScheduleResultDTO = {
      /** 排期id */
      id?: number;
      /** 服务方式;inquiry_online：线上，inquiry_offline：线下; */
      serviceMode?: string;
      /** 服务地区; */
      serviceLocation?: Array<ExpertInquiryDictDTO>;
      /** 线下地址 */
      offlineAddress?: string;
      /** 开始时间。格式：HH:mm */
      startTime?: LocalTime;
      /** 结束时间。格式：HH:mm */
      endTime?: LocalTime;
      /** 服务日期，格式：yyyy-MM-dd */
      serviceDate?: LocalDate;
      /** 预约状态。0-可预约，1-已预约 */
      inquiryStatus?: string;
    };
    export type ExpertInquiryDictDTO = {
      /** 数据code码 */
      code?: string;
      /** 数据值 */
      name?: string;
    };
    export type LocalTime = any;
    export type LocalDate = any;

    export interface Req {
      /** 专家id */
      expertId: number;
      /** 问诊日期 */
      serviceDate: any;
    }
    export type Res = Array<ExpertInquiryScheduleResultDTO>;
  }

  /** 根据问诊专家和日期查询对应的排期列表 get /expertSchedule/queryScheduleList */
  function getExpertScheduleQueryScheduleList(req: ET<GetExpertScheduleQueryScheduleList.Req>, options?: object): Promise<ET<GetExpertScheduleQueryScheduleList.Res>>;

  export module GetExpertScheduleQueryScheduleStatusList {
    export type ExpertInquiryScheduleStatusDTO = {
      /** 问诊日期 */
      serviceDate?: string;
      /** 排期状态。0-未排期，1-已排期 */
      scheduleStatus?: string;
    };

    export interface Req {
      /** 专家id */
      expertId: number;
      /** 开始时间 */
      startServiceDate: any;
      /** 结束时间 */
      endServiceDate: any;
    }
    export type Res = Array<ExpertInquiryScheduleStatusDTO>;
  }

  /** 查询排期状态 get /expertSchedule/queryScheduleStatusList */
  function getExpertScheduleQueryScheduleStatusList(req: ET<GetExpertScheduleQueryScheduleStatusList.Req>, options?: object): Promise<ET<GetExpertScheduleQueryScheduleStatusList.Res>>;

  export module PostExpertScheduleSaveInquirySchedule {
    export type LocalTime = any;
    export type LocalDate = any;

    export interface Req {
      /** 专家id */
      expertId: number;
      /** 所属大区 */
      locationCode: string;
      /** 服务方式;inquiry_online：线上专家问诊，inquiry_offline：线下专家问诊; */
      serviceMode: string;
      /** 服务地区 */
      serviceLocation: Array<string>;
      /** 线下地址 */
      offlineAddress?: string;
      /** 开始时间。格式：HH:mm */
      startTime: LocalTime;
      /** 结束时间。格式：HH:mm */
      endTime: LocalTime;
      /** 服务日期，格式：yyyy-MM-dd */
      serviceDate: LocalDate;
    }
    export type Res = number;
  }

  /** 新增排期 post /expertSchedule/saveInquirySchedule */
  function postExpertScheduleSaveInquirySchedule(req: ET<PostExpertScheduleSaveInquirySchedule.Req>, options?: object): Promise<ET<PostExpertScheduleSaveInquirySchedule.Res>>;

  export module GetProductPackageList {
    export type ProductPackageResponseDTO = {
      /** 主键id */
      id?: number;
      /** 内管产品包id */
      productId?: string;
      /** 加油包名称 */
      packageName?: string;
      /** 适用服务编码 1:办税咨询 2:财税实务咨询 3:财税专家咨询 4:专项服务咨询 5:人资咨询 6:专家问诊 7:专项咨询 */
      consultService?: string;
      /** 适用服务名称 1:办税咨询 2:财税实务咨询 3:财税专家咨询 4:专项服务咨询 5:人资咨询 6:专家问诊 7:专项咨询 */
      consultServiceName?: string;
      /** 产品包次数 */
      amount?: number;
      /** 产品包类型  1:普通包  2:试用包 */
      type?: number;
      /** 产品包类型名称  1:普通包  2：试用包 */
      typeName?: string;
      /** 加油包适用地区，空表示适用全部地区 */
      areaRegionList?: Array<ProductPackageAreaRegion>;
      /** 加油包上架位置编码，空表示适用全部位置 */
      shelfRegionList?: Array<ProductPackageShelfRegion>;
      /** 产品包备注 */
      note?: string;
      /** 上下架状态 0 待上架  1 上架 2 下架 */
      onShelfStatus?: string;
      /** 上下架状态名称  0 待上架  1 上架 2 下架 */
      onShelfStatusName?: string;
      /** 创建人id */
      creatorId?: string;
      /** 修改人id */
      modifierId?: string;
      /** 修改人名字 */
      modifier?: string;
      /** 更新时间 */
      modifyDate?: string;
    };
    export type ProductPackageAreaRegion = {
      /** 适用地区编码 e.g 1300 为空表示适用全部地区 */
      areaCode?: string;
      /** 适用地区名称 e.g 浙江，河北 */
      areaName?: string;
    };
    export type ProductPackageShelfRegion = {
      /** 产品上架位置编码 1:亿企咨询网站 2:落地页,为空表示全部上架位置 */
      shelfCode?: string;
      /** 产品上架位置名称 1:亿企咨询网站 2:落地页,为空表示全部上架位置 */
      shelfRegionName?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 加油包名称 */
      name?: string;
      /** 服务类型列表 1:办税咨询 2:财税实务咨询 3:财税专家咨询 4:专项服务咨询 5:人资咨询 6:专家问诊 7:专项咨询类型列表取字典类型[consult_service]的字典项代码 */
      consultService?: string;
      /** 上下架状态 0:待上架 1:上架  2:下架 */
      shelfStatus?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ProductPackageResponseDTO>;
    }
  }

  /** 查询加油包列表 get /productPackage/list */
  function getProductPackageList(req: ET<GetProductPackageList.Req>, options?: object): Promise<ET<GetProductPackageList.Res>>;

  export module GetProductPackageDetail {
    export type ProductPackageAreaRegion = {
      /** 适用地区编码 e.g 1300 为空表示适用全部地区 */
      areaCode?: string;
      /** 适用地区名称 e.g 浙江，河北 */
      areaName?: string;
    };
    export type ProductPackageShelfRegion = {
      /** 产品上架位置编码 1:亿企咨询网站 2:落地页,为空表示全部上架位置 */
      shelfCode?: string;
      /** 产品上架位置名称 1:亿企咨询网站 2:落地页,为空表示全部上架位置 */
      shelfRegionName?: string;
    };

    export interface Req {
      /** 加油包表主键id */
      id: number;
    }
    export interface Res {
      /** 主键id */
      id?: number;
      /** 内管产品包id */
      productId?: string;
      /** 加油包名称 */
      packageName?: string;
      /** 适用服务编码 1:办税咨询 2:财税实务咨询 3:财税专家咨询 4:专项服务咨询 5:人资咨询 6:专家问诊 7:专项咨询 */
      consultService?: string;
      /** 适用服务名称 1:办税咨询 2:财税实务咨询 3:财税专家咨询 4:专项服务咨询 5:人资咨询 6:专家问诊 7:专项咨询 */
      consultServiceName?: string;
      /** 产品包次数 */
      amount?: number;
      /** 产品包类型  1:普通包  2:试用包 */
      type?: number;
      /** 产品包类型名称  1:普通包  2：试用包 */
      typeName?: string;
      /** 加油包适用地区，空表示适用全部地区 */
      areaRegionList?: Array<ProductPackageAreaRegion>;
      /** 加油包上架位置编码，空表示适用全部位置 */
      shelfRegionList?: Array<ProductPackageShelfRegion>;
      /** 产品包备注 */
      note?: string;
      /** 上下架状态 0 待上架  1 上架 2 下架 */
      onShelfStatus?: string;
      /** 上下架状态名称  0 待上架  1 上架 2 下架 */
      onShelfStatusName?: string;
      /** 创建人id */
      creatorId?: string;
      /** 修改人id */
      modifierId?: string;
      /** 修改人名字 */
      modifier?: string;
      /** 更新时间 */
      modifyDate?: string;
    }
  }

  /** 加油包详情 get /productPackage/detail */
  function getProductPackageDetail(req: ET<GetProductPackageDetail.Req>, options?: object): Promise<ET<GetProductPackageDetail.Res>>;

  export module PostProductPackageOnShelf {
    export interface Req {
      /** 主键id */
      id: number;
      /** 上下架状态  1 上架 2 下架 */
      onShelfStatus: string;
    }
    export type Res = boolean;
  }

  /** 上下架加油包 post /productPackage/onShelf */
  function postProductPackageOnShelf(req: ET<PostProductPackageOnShelf.Req>, options?: object): Promise<ET<PostProductPackageOnShelf.Res>>;

  export module PostProductPackageSave {
    export interface Req {
      /** 内管产品包id */
      productId: string;
      /** 产品包名称 */
      packageName: string;
      /** 适用服务编码 1:办税咨询 2:财税实务咨询 3:财税专家咨询 4:专项服务咨询 5:人资咨询 6:专家问诊 7:专项咨询 */
      consultService: string;
      /** 产品包类型  1:普通包  2:试用包 */
      type: number;
      /** 产品包次数 */
      amount: number;
      /** 适用地区编码 e.g 1300,不传表示适用全部地区 */
      areaCodeList?: Array<string>;
      /** 产品上架位置  1:亿企咨询网站 2:落地页,不传表示适用全部位置 */
      shelfRegionList?: Array<string>;
      /** 备注 */
      note?: string;
    }
    export type Res = boolean;
  }

  /** 保存加油包 post /productPackage/save */
  function postProductPackageSave(req: ET<PostProductPackageSave.Req>, options?: object): Promise<ET<PostProductPackageSave.Res>>;

  export module PostProductPackageUpdate {
    export interface Req {
      /** 主键id */
      id: number;
      /** 内管产品包id */
      productId: string;
      /** 产品包名称 */
      packageName: string;
      /** 适用服务编码 1:办税咨询 2:财税实务咨询 3:财税专家咨询 4:专项服务咨询 5:人资咨询 6:专家问诊 7:专项咨询 */
      consultService: string;
      /** 产品包类型  1:普通包  2:试用包 */
      type: number;
      /** 产品包次数 */
      amount: number;
      /** 适用地区编码 e.g 1300,不传表示适用全部地区 */
      areaCodeList?: Array<string>;
      /** 产品上架位置  1:亿企咨询网站 2:落地页,不传表示适用全部位置 */
      shelfRegionList?: Array<string>;
      /** 备注 */
      note?: string;
    }
    export type Res = boolean;
  }

  /** 修改加油包 post /productPackage/update */
  function postProductPackageUpdate(req: ET<PostProductPackageUpdate.Req>, options?: object): Promise<ET<PostProductPackageUpdate.Res>>;

  export module GetExpertScheduleQueryExpertScheduleList {
    export type ExpertInquiryScheduleMessageDTO = {
      /** 排期id */
      id?: number;
      /** 服务方式;inquiry_online：线上专家问诊，inquiry_offline：线下专家问诊; */
      serviceMode?: string;
      /** 服务地区; */
      serviceLocation?: Array<string>;
      /** 线下地址 */
      offlineAddress?: string;
      /** 开始时间。格式：HH:mm */
      startTime?: LocalTime;
      /** 结束时间。格式：HH:mm */
      endTime?: LocalTime;
      /** 服务日期，格式：yyyy-MM-dd */
      serviceDate?: LocalDate;
      /** 预约状态。0-可预约，1-已预约 */
      inquiryStatus?: string;
    };
    export type LocalTime = any;
    export type LocalDate = any;

    export interface Req {
      /** 专家id */
      expertId: number;
    }
    export type Res = Array<ExpertInquiryScheduleMessageDTO>;
  }

  /** 根据问诊专家查询对应的排期列表 get /expertSchedule/queryExpertScheduleList */
  function getExpertScheduleQueryExpertScheduleList(req: ET<GetExpertScheduleQueryExpertScheduleList.Req>, options?: object): Promise<ET<GetExpertScheduleQueryExpertScheduleList.Res>>;

  export module GetRightQueryCompanyRight {
    export type CustomerRightJO = {
      /** 云上客户id */
      customerId?: number;
      /** 权益 */
      rightList?: Array<RightJO>;
    };
    export type RightJO = {
      /** 咨询服务 */
      consultService?: string;
      /** 剩余有权益次数，-1为不限次 */
      total?: number;
    };

    export interface Req {
      /** 咨询服务 */
      consultService: Array<string>;
      /** 客户id */
      customerId: Array<number>;
    }
    export type Res = Array<CustomerRightJO>;
  }

  /** 查询企业权益 get /right/queryCompanyRight */
  function getRightQueryCompanyRight(req: ET<GetRightQueryCompanyRight.Req>, options?: object): Promise<ET<GetRightQueryCompanyRight.Res>>;

  export module GetExpertScheduleGetScheduleByCodeList {
    export type ExpertInquiryScheduleDateListDTO = {
      /** 服务日期，格式：yyyy-MM-dd */
      serviceDate?: LocalDate;
      /** 问诊状态。0：可约；1：已约满；2:未排期；3:已截止； */
      serviceDateStatus?: string;
      /** 排期时间列表信息 */
      scheduleTimeList?: Array<ExpertInquiryScheduleTimeListDTO>;
    };
    export type LocalDate = any;
    export type ExpertInquiryScheduleTimeListDTO = {
      /** 开始时间。格式：HH:mm */
      startTime?: LocalTime;
      /** 结束时间。格式：HH:mm */
      endTime?: LocalTime;
      /** 问诊状态。0：可约；1：已约满；2:未排期；3:已截止； */
      inquiryStatus?: string;
      /** 专家信息 */
      expertList?: Array<InquiryScheduleExpertListDTO>;
    };
    export type LocalTime = any;
    export type InquiryScheduleExpertListDTO = {
      /** 排期id */
      id?: number;
      /** 服务方式;inquiry_online：线上专家问诊，inquiry_offline：线下专家问诊; */
      serviceMode?: string;
      /** 服务地区; */
      serviceLocation?: Array<string>;
      /** 线下地址 */
      offlineAddress?: string;
      /** 开始时间。格式：HH:mm */
      startTime?: LocalTime;
      /** 结束时间。格式：HH:mm */
      endTime?: LocalTime;
      /** 服务日期，格式：yyyy-MM-dd */
      serviceDate?: LocalDate;
      /** 专家服务id */
      expertId?: number;
      /** 专家账号 */
      account?: string;
      /** 专家名称 */
      name?: string;
      /** 问诊状态。0：可约；1：已约满；2:未排期；3:已截止； */
      inquiryStatus?: string;
      /** 擅长领域 */
      classifyRealmList?: Array<string>;
    };

    export interface Req {
      /** 用户地区 */
      location: string;
    }
    export type Res = Array<ExpertInquiryScheduleDateListDTO>;
  }

  /** 代预约：根据地区查询对应的排期列表 get /expertSchedule/getScheduleByCodeList */
  function getExpertScheduleGetScheduleByCodeList(req: ET<GetExpertScheduleGetScheduleByCodeList.Req>, options?: object): Promise<ET<GetExpertScheduleGetScheduleByCodeList.Res>>;

  export module GetExpertPoolDetail {
    export type Expert = {
      /** 名称 */
      name?: string;
      /** 编码 */
      code?: string;
    };

    export interface Req {
      /** 专家池id */
      id: number;
    }
    export interface Res {
      /** 专家池id */
      expertPoolId?: string;
      /** 专家池名称 */
      expertPoolName?: string;
      /** 专家列表 */
      experts?: Array<Expert>;
      /** partCode列表 */
      partCodes?: Array<string>;
    }
  }

  /** 查询专家池详情 get /expertPool/detail */
  function getExpertPoolDetail(req: ET<GetExpertPoolDetail.Req>, options?: object): Promise<ET<GetExpertPoolDetail.Res>>;

  export module GetExpertPoolQuery {
    export type ExpertPoolQueryResJO = {
      /** 专家池名称 */
      expertPoolName?: string;
      /** 渠道列表 */
      channels?: Array<Channel>;
      /** 产品列表 */
      systems?: Array<System>;
      /** 创建人名称 */
      creatorName?: string;
      /** 配置时间 */
      createDate?: string;
      /** 最后修改时间 */
      modifyDate?: string;
      /** 配置状态名称 */
      statusName?: string;
      /** 配置状态编码。01：已生效；02：已失效；03：未生效； */
      status?: string;
    };
    export type Channel = {
      /** 名称 */
      name?: string;
      /** 编码 */
      code?: string;
    };
    export type System = {
      /** 名称 */
      name?: string;
      /** 编码 */
      code?: string;
    };

    export interface Req {
      /** 专家池名称 */
      expertPoolName?: string;
      /** 适用产品列表 */
      systemCodes?: Array<string>;
      /** 开始配置时间 */
      beginConfigTime?: string;
      /** 结束配置时间 */
      endConfigTime?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ExpertPoolQueryResJO>;
    }
  }

  /** 查询专家池列表 get /expertPool/query */
  function getExpertPoolQuery(req: ET<GetExpertPoolQuery.Req>, options?: object): Promise<ET<GetExpertPoolQuery.Res>>;

  export module PostExpertPoolSave {
    export interface Req {
      /** 专家池名称 */
      expertPoolName: string;
      /** 专家id列表 */
      expertIds: Array<string>;
      /** partCode列表 */
      partCodes: Array<string>;
    }
    export type Res = boolean;
  }

  /** 新增专家池 post /expertPool/save */
  function postExpertPoolSave(req: ET<PostExpertPoolSave.Req>, options?: object): Promise<ET<PostExpertPoolSave.Res>>;

  export module PostExpertPoolUpdate {
    export interface Req {
      /** 专家池名称 */
      expertPoolName: string;
      /** 专家id列表 */
      expertIds: Array<string>;
      /** partCode列表 */
      partCodes: Array<string>;
    }
    export type Res = boolean;
  }

  /** 修改专家池 post /expertPool/update */
  function postExpertPoolUpdate(req: ET<PostExpertPoolUpdate.Req>, options?: object): Promise<ET<PostExpertPoolUpdate.Res>>;

  export module GetConfigQuery {
    export type PartCodeConfigQueryResJO = {
      /** 渠道名称 */
      channelName?: string;
      /** 产品列表 */
      Systems?: Array<System>;
    };
    export type System = {
      /** 产品名称 */
      name?: string;
      /** 模块列表 */
      moduels?: Array<Moduel>;
    };
    export type Moduel = {
      /** 模块名称 */
      name?: string;
      /** partcode列表 */
      partCodes?: Array<string>;
    };

    export type Req = any;
    export type Res = Array<PartCodeConfigQueryResJO>;
  }

  /** 查询配置 get /partCode/config/query */
  function getConfigQuery(req?: ET<GetConfigQuery.Req>, options?: object): Promise<ET<GetConfigQuery.Res>>;

  export module PostExpertPoolUpdateStatus {
    export interface Req {
      /** 专家池id */
      id: string;
      /** 专家池状态：01：已生效；02：已失效；03：未生效； */
      status: string;
    }
    export type Res = boolean;
  }

  /** 修改专家池状态 post /expertPool/updateStatus */
  function postExpertPoolUpdateStatus(req: ET<PostExpertPoolUpdateStatus.Req>, options?: object): Promise<ET<PostExpertPoolUpdateStatus.Res>>;

  export module GetExpertPoolConfigQuery {
    export type ExpertPoolConfigQueryResJO = {
      /** 值 */
      value?: string;
      /** 展示的内容 */
      label?: string;
      /** 子级 */
      children?: Array<ExpertPoolConfigQueryResJO>;
    };

    export interface Req {
      /** 关联业务类型。01：新架构 */
      relationBizType: string;
    }
    export type Res = Array<ExpertPoolConfigQueryResJO>;
  }

  /** 查询专家池级联配置 get /expertPool/config/query */
  function getExpertPoolConfigQuery(req: ET<GetExpertPoolConfigQuery.Req>, options?: object): Promise<ET<GetExpertPoolConfigQuery.Res>>;

  export module GetExpertInquiryImportList {
    export type ExpertInquiryImportResponse = {
      id?: number;
      /** 问诊日期 */
      serviceDate?: LocalDate;
      /** 问诊时间 */
      inquiryTime?: string;
      /** 专家名称 */
      expertName?: string;
      /** 专家所属地区 */
      expertLocation?: string;
      /** 企业所属地区 */
      customerLocation?: string;
      /** 企业名称 */
      customerName?: string;
      /** 预约人 */
      clientName?: string;
      /** 预约人手机号 */
      clientMobile?: string;
      /** 预约方式 */
      bookMode?: string;
      /** 权益状态code */
      deductStatus?: string;
      /** 权益状态 */
      deductStatusName?: string;
    };
    export type LocalDate = any;

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 企业所属地区 */
      customerLocationList?: Array<string>;
      /** 开始问诊日期 */
      startServiceDate?: any;
      /** 结束问诊日期 */
      endServiceDate?: any;
      /** 预约方式，00-导入，10-体验导入 */
      bookMode?: string;
      /** 权益状态：00-未扣次，01-扣次成功，02-扣次失败，99-无需扣 */
      status?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ExpertInquiryImportResponse>;
    }
  }

  /** 导入记录查询列表 get /expertInquiryImport/list */
  function getExpertInquiryImportList(req: ET<GetExpertInquiryImportList.Req>, options?: object): Promise<ET<GetExpertInquiryImportList.Res>>;

  export module GetExpertInquiryImportGetImportTemplateUrl {
    export type Req = any;
    export type Res = string;
  }

  /** get /expertInquiryImport/getImportTemplateUrl */
  function getExpertInquiryImportGetImportTemplateUrl(req?: ET<GetExpertInquiryImportGetImportTemplateUrl.Req>, options?: object): Promise<ET<GetExpertInquiryImportGetImportTemplateUrl.Res>>;

  export module PostExpertInquiryImportBatchDeductRecord {
    export interface Req {
      /** 记录id列表 */
      idList?: Array<number>;
    }
    export type Res = boolean;
  }

  /** 批量扣次 post /expertInquiryImport/batchDeductRecord */
  function postExpertInquiryImportBatchDeductRecord(req: ET<PostExpertInquiryImportBatchDeductRecord.Req>, options?: object): Promise<ET<PostExpertInquiryImportBatchDeductRecord.Res>>;

  export module PostExpertInquiryImportNotDeductRecord {
    export interface Req {
      /** 记录id */
      id: number;
      /** 无需扣减原因 */
      noneDeductReason: string;
    }
    export type Res = boolean;
  }

  /** 不扣次 post /expertInquiryImport/notDeductRecord */
  function postExpertInquiryImportNotDeductRecord(req: ET<PostExpertInquiryImportNotDeductRecord.Req>, options?: object): Promise<ET<PostExpertInquiryImportNotDeductRecord.Res>>;

  export module PostExpertInquiryImportImport {
    export interface Req {
      file: any;
    }
    export interface Res {
      failMessageList?: Array<string>;
    }
  }

  /** post /expertInquiryImport/import */
  function postExpertInquiryImportImport(req: ET<PostExpertInquiryImportImport.Req>, options?: object): Promise<ET<PostExpertInquiryImportImport.Res>>;

  export module GetCommonProperty {
    export type Head = {
      code?: string;
      description?: string;
      msg?: string;
      time?: string;
      status?: string;
    };

    export interface Req {
      /** 配置key */
      name: string;
    }
    export interface Res {
      head?: Head;
      body?: string;
    }
  }

  /** 配置获取接口 get /common/property */
  function getCommonProperty(req: ET<GetCommonProperty.Req>, options?: object): Promise<ET<GetCommonProperty.Res>>;

  export module PostExpertInquiryRecordUpdateCancelReason {
    export interface Req {
      /** id */
      id: number;
      /** 取消原因选项 */
      cancelOption: string;
      /** 取消原因 */
      cancelReason: string;
    }
    export type Res = boolean;
  }

  /** 取消问诊原因修改 post /expertInquiryRecord/updateCancelReason */
  function postExpertInquiryRecordUpdateCancelReason(req: ET<PostExpertInquiryRecordUpdateCancelReason.Req>, options?: object): Promise<ET<PostExpertInquiryRecordUpdateCancelReason.Res>>;

  export module PostMarketActivityDelete {
    export interface Req {
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除营销活动 post /marketActivity/delete */
  function postMarketActivityDelete(req: ET<PostMarketActivityDelete.Req>, options?: object): Promise<ET<PostMarketActivityDelete.Res>>;

  export module GetMarketActivityList {
    export type MarketActivityListJO = {
      /** 活动名称 */
      name?: string;
      /** 展示位类型：1-会员咨询页-实务咨询营销位 2-会员咨询页-专家咨询营销位 3-会员-顶部营销位 4-h5会员-顶部营销位 */
      displayType?: number;
      /** 是否分群：0-不分群 1-分群 */
      isGroup?: number;
      /** 分群code */
      groupCode?: string;
      /** 分群名称 */
      groupName?: string;
      /** 官方服务id */
      serviceId?: number;
      /** 权重 */
      weight?: number;
      /** 生效开始时间 */
      startTime?: string;
      /** 生效结束时间 */
      endTime?: string;
      /** 营销活动图片链接 */
      imageUrl?: string;
      /** 跳转链接 */
      redirectUrl?: string;
      /** 状态：0-未开始 1-已过期 2-使用中 3-已结束 4-已下架 */
      status?: number;
      /** 上下架：1-上架 0-下架 */
      isOnShelf?: number;
      /** 创建人id */
      creatorId?: string;
      /** 更新人id */
      updaterId?: string;
      /** 更新人姓名 */
      updaterName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 更新时间 */
      updateTime?: string;
    };

    export interface Req {
      /** 活动名称 */
      name?: string;
      /** 展示位类型：1-会员咨询页-实务咨询营销位 2-会员咨询页-专家咨询营销位 3-会员-顶部营销位 4-h5会员-顶部营销位 */
      displayType?: number;
    }
    export type Res = Array<MarketActivityListJO>;
  }

  /** 查询营销活动列表 get /marketActivity/list */
  function getMarketActivityList(req: ET<GetMarketActivityList.Req>, options?: object): Promise<ET<GetMarketActivityList.Res>>;

  export module PostMarketActivityOnShelf {
    export interface Req {
      id: number;
      isOneShelf: number;
    }
    export type Res = boolean;
  }

  /** 营销活动上下架 post /marketActivity/onShelf */
  function postMarketActivityOnShelf(req: ET<PostMarketActivityOnShelf.Req>, options?: object): Promise<ET<PostMarketActivityOnShelf.Res>>;

  export module GetMarketActivityLogList {
    export type MarketActivityLogListJO = {
      /** 编辑人id */
      updaterId?: number;
      /** 编辑人姓名 */
      updaterName?: number;
      /** 操作日志 */
      operateLog?: string;
      /** 生成时间 */
      createTime?: string;
    };

    export interface Req {
      updaterId: number;
      marketActivityId: number;
    }
    export type Res = Array<MarketActivityLogListJO>;
  }

  /** get /marketActivityLog/list */
  function getMarketActivityLogList(req: ET<GetMarketActivityLogList.Req>, options?: object): Promise<ET<GetMarketActivityLogList.Res>>;

  export module PostMarketActivitySave {
    export interface Req {
      /** 活动名称 */
      name: string;
      /** 展示位类型：1-会员咨询页-实务咨询营销位 2-会员咨询页-专家咨询营销位 3-会员-顶部营销位 4-h5会员-顶部营销位 */
      displayType: string;
      /** 是否分群：N-不分群 Y-分群 */
      isGroup: string;
      /** 分群code */
      groupCode?: string;
      /** 官方服务id */
      officialServiceId?: number;
      /** 权重 */
      weight: number;
      /** 生效开始时间 */
      startTime: string;
      /** 生效结束时间 */
      endTime: string;
      /** 营销活动图片链接 */
      imageUrl: string;
      /** 图片名称 */
      imageName: string;
      /** 跳转链接 */
      redirectUrl: string;
    }
    export type Res = boolean;
  }

  /** 新增营销活动 post /marketActivity/save */
  function postMarketActivitySave(req: ET<PostMarketActivitySave.Req>, options?: object): Promise<ET<PostMarketActivitySave.Res>>;

  export module GetTest {
    export interface Req {
      name: string;
    }
    export type Res = string;
  }

  /** get /test */
  function getTest(req: ET<GetTest.Req>, options?: object): Promise<ET<GetTest.Res>>;

  export module GetGroupInfoList {
    export type MarketActivityGroupInfoJO = {
      /** 分群名称 */
      groupName?: string;
      /** 分群code */
      groupCode?: string;
    };

    export type Req = any;
    export type Res = Array<MarketActivityGroupInfoJO>;
  }

  /** 查询亿企咨询营销位下分群信息列表 get /marketActivity/groupInfo/list */
  function getGroupInfoList(req?: ET<GetGroupInfoList.Req>, options?: object): Promise<ET<GetGroupInfoList.Res>>;

  export module GetTestUploadFile {
    export type Req = any;
    export type Res = any;
  }

  /** get /test/uploadFile */
  function getTestUploadFile(req?: ET<GetTestUploadFile.Req>, options?: object): Promise<ET<GetTestUploadFile.Res>>;

  export module PostServiceConfigSave {
    export interface Req {
      /** 咨询产品类型ID */
      consultServiceId: string;
      /** 咨询产品类型名称 */
      consultServiceName: string;
      /** 咨询产品大类:字典服务consult_service_category的code码 */
      category: string;
      /** 判断授权标识: 1:判断授权;2:不判断授权 */
      checkRightsFlag: string;
      /** 授权判断优先级类型: 1:优先判断限次授权;2:优先判断不限次授权 */
      priorityType?: string;
      /** 适用卡片类型多个以逗号分隔: 1:专家机构卡片;2:官方服务卡片 */
      cardType?: string;
      /** 备注 */
      remarks?: string;
    }
    export type Res = number;
  }

  /** 新增咨询产品配置表记录 post /serviceConfig/save */
  function postServiceConfigSave(req: ET<PostServiceConfigSave.Req>, options?: object): Promise<ET<PostServiceConfigSave.Res>>;

  export module PostServiceConfigUpdate {
    export interface Req {
      /** 自增主键 */
      id: number;
      /** 咨询产品类型ID */
      consultServiceId: string;
      /** 咨询产品类型名称 */
      consultServiceName: string;
      /** 咨询产品大类:字典服务consult_service_category的code码 */
      category: string;
      /** 判断授权标识: 1:判断授权;2:不判断授权 */
      checkRightsFlag: string;
      /** 授权判断优先级类型: 1:优先判断限次授权;2:优先判断不限次授权 */
      priorityType?: string;
      /** 适用卡片类型多个以逗号分隔: 1:专家机构卡片;2:官方服务卡片 */
      cardType?: string;
      /** 备注 */
      remarks?: string;
    }
    export type Res = boolean;
  }

  /** 修改咨询产品配置表记录 post /serviceConfig/update */
  function postServiceConfigUpdate(req: ET<PostServiceConfigUpdate.Req>, options?: object): Promise<ET<PostServiceConfigUpdate.Res>>;

  export module PostServiceConfigDisable {
    export interface Req {
      /** 自增主键 */
      id: number;
      /** 产品配置状态: 1：有效; 2：禁用 */
      status: string;
    }
    export type Res = boolean;
  }

  /** 禁用咨询产品配置表记录 post /serviceConfig/disable */
  function postServiceConfigDisable(req: ET<PostServiceConfigDisable.Req>, options?: object): Promise<ET<PostServiceConfigDisable.Res>>;

  export module GetServiceConfigQuery {
    export type ConsultServiceConfigPageVO = {
      /** 自增主键 */
      id?: number;
      /** 咨询产品类型ID */
      consultServiceId?: string;
      /** 咨询产品类型名称 */
      consultServiceName?: string;
      /** 咨询产品大类:字典服务consult_service_category的code码 */
      category?: string;
      /** 咨询产品大类名称:字典服务consult_service_category的值 名称 */
      categoryName?: string;
      /** 判断授权标识： 1:判断授权;2:不判断授权 */
      checkRightsFlag?: string;
      /** 授权判断优先级类型： 1:优先判断限次授权;2:优先判断不限次授权 */
      priorityType?: string;
      /** 适用卡片类型多个以逗号分隔： 1:专家机构卡片;2:官方服务卡片 */
      cardType?: string;
      /** 产品配置状态： 1：有效; 2：禁用 */
      status?: string;
      /** 备注 */
      remarks?: string;
      /** 更新人名称 */
      modifierName?: string;
      /** 更新时间 */
      modifyDate?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: any;
      sortRuleList?: Array<string>;
      /** 咨询产品类型名称 */
      consultServiceName?: string;
      /** 产品配置状态: 1：有效; 2：禁用 */
      status?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<ConsultServiceConfigPageVO>;
    }
  }

  /** 分页查询咨询产品配置信息 get /serviceConfig/query */
  function getServiceConfigQuery(req: ET<GetServiceConfigQuery.Req>, options?: object): Promise<ET<GetServiceConfigQuery.Res>>;

  export module GetServiceConfigQueryScheduleStatusList {
    export type ConsultServiceConfigVO = {
      /** 自增主键 */
      id?: number;
      /** 咨询产品类型ID */
      consultServiceId?: string;
      /** 咨询产品类型名称 */
      consultServiceName?: string;
    };

    export interface Req {
      /** 适用卡片类型: 1:专家机构卡片;2:官方服务卡片 */
      cardType?: string;
    }
    export type Res = Array<ConsultServiceConfigVO>;
  }

  /** 查询咨询产品配置列表 get /serviceConfig/queryServiceConfigList */
  function getServiceConfigQueryScheduleStatusList(req: ET<GetServiceConfigQueryScheduleStatusList.Req>, options?: object): Promise<ET<GetServiceConfigQueryScheduleStatusList.Res>>;

  export module PostAdd {
    export interface Req {
      /** 控制类型：1-saas构件 2-标签，控制类型字典：consult_service_control_type */
      controlType: string;
      /** 咨询方式||incall:来电;online:在线 */
      consultType?: string;
      /** 构件id */
      componentId?: string;
      /** code：saasCode或标签，标签字典：consult_service_qqt_label */
      code: string;
      /** 名称：构件名称或标签名称 */
      name: string;
      /** 咨询产品类型 */
      consultService: string;
      /** 限次标志：Y-限次 N-不限次（控制类型为标签时传不限次） */
      limitFlag: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 新增授权服务配置 post /consultRightConfig/add */
  function postAdd(req: ET<PostAdd.Req>, options?: object): Promise<ET<PostAdd.Res>>;

  export module PostDelete {
    export interface Req {
      /** id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 删除授权服务配置 post /consultRightConfig/delete */
  function postDelete(req: ET<PostDelete.Req>, options?: object): Promise<ET<PostDelete.Res>>;

  export module PostUpdate {
    export interface Req {
      /** id */
      id: number;
      /** 控制类型：1-saas构件 2-标签，控制类型字典：consult_service_control_type */
      controlType: string;
      /** 咨询方式||incall:来电;online:在线当咨询产品分类是会员咨询是不能为空 */
      consultType?: string;
      /** code：saasCode或标签，标签字典：consult_service_qqt_label */
      code: string;
      /** 构件id */
      componentId?: string;
      /** 咨询产品类型 */
      consultService: string;
      /** 限次标志：Y-限次 N-不限次（控制类型为标签时传不限次） */
      limitFlag: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 更新授权服务配置 post /consultRightConfig/update */
  function postUpdate(req: ET<PostUpdate.Req>, options?: object): Promise<ET<PostUpdate.Res>>;

  export module GetDetail {
    export interface Req {
      /** 主键id */
      id: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 控制类型：1-saas构件 2-标签，控制类型字典：consult_service_control_type */
      controlType?: string;
      /** 咨询方式||incall:来电;online:在线 */
      consultType?: string;
      /** 控制类型名称 */
      controlTypeName?: string;
      /** 构件id */
      componentId?: string;
      /** code：saasCode或标签，标签字典：consult_service_qqt_label */
      code?: string;
      /** 名称：构件名称或标签名称 */
      name?: string;
      /** 咨询产品类型 */
      consultService?: string;
      /** 咨询产品类型名称 */
      consultServiceName?: string;
      /** 限次标志：Y-限次 N-不限次（控制类型为标签时传不限次） */
      limitFlag?: string;
      /** 备注 */
      remark?: string;
    }
  }

  /** 查询授权服务配置详情 get /consultRightConfig/detail */
  function getDetail(req: ET<GetDetail.Req>, options?: object): Promise<ET<GetDetail.Res>>;

  export module GetListByPage {
    export type ConsultRightConfigListVO = {
      /** id */
      id?: number;
      /** 控制类型：1-saas构件 2-标签，控制类型字典：consult_service_control_type */
      controlType?: string;
      /** 控制类型名称 */
      controlTypeName?: string;
      /** 构件id */
      componentId?: string;
      /** code：saasCode或标签，标签字典：consult_service_qqt_label */
      code?: string;
      /** 名称：构件名称或标签名称 */
      name?: string;
      /** 咨询产品类型 */
      consultService?: string;
      /** 咨询产品类型名称 */
      consultServiceName?: string;
      /** 限次标志：Y-限次 N-不限次（控制类型为标签时传不限次） */
      limitFlag?: string;
      /** 备注 */
      remark?: string;
      /** 修改人姓名 */
      modifierName?: string;
      /** 修改时间 */
      modifyDate?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: any;
      sortRuleList?: Array<string>;
      /** 名称：构件名称或标签名称 */
      name?: string;
      /** 咨询产品类型，多个以逗号分割 */
      consultService?: string;
      /** 控制类型：1-saas构件 2-标签，标签字典：consult_service_control_type */
      controlType?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<ConsultRightConfigListVO>;
    }
  }

  /** 分页查询授权服务配置列表 get /consultRightConfig/listByPage */
  function getListByPage(req: ET<GetListByPage.Req>, options?: object): Promise<ET<GetListByPage.Res>>;

  export module GetTestGetLoginUser {
    export type Req = any;
    export interface Res {
      /** 员工trueId */
      id?: string;
      /** 员工账号，username */
      userId?: string;
      /** 员工姓名 */
      name?: string;
      /** 组织机构代码 */
      departCode?: string;
      /** 分子公司代码，总公司本部人员所在分子公司转换为001080后返回 */
      branchCode?: string;
      /** 单点登录令牌 */
      token?: string;
    }
  }

  /** get /test/getLoginUser */
  function getTestGetLoginUser(req?: ET<GetTestGetLoginUser.Req>, options?: object): Promise<ET<GetTestGetLoginUser.Res>>;

  export module GetTestListByUserId {
    export type EmployeeDTO = {
      /** 员工Id,   注意:这是通常说的trueId */
      id?: string;
      /** 用户名,其实就是 userName,为了兼容登录返回的 name 字段 */
      name?: string;
      /** 用户名 */
      userName?: string;
      fullName?: string;
      /** 带有名字拼音缩写的简称,即xxx@servyou.com.cn,xxx部分 */
      userId?: string;
      /** 性别 M为男,F为女 */
      sex?: string;
      /** 手机号 */
      mobile?: string;
      /** 手机号 */
      phone?: string;
      fax?: string;
      officeAddr?: string;
      officeZip?: string;
      /** 部门ID */
      departCode?: string;
      /** 职位名 */
      positionName?: string;
      /** 邮箱 */
      email?: string;
      /** 1有效,0离职 */
      status?: string;
      /** 用户简拼 */
      yhjp?: string;
      /** 部门ID */
      departId?: number;
      /** 组织机构链 */
      orgChain?: Array<OrgChain>;
      /** token */
      token?: string;
      /** cti工号 */
      workId?: string;
    };
    export type OrgChain = {
      code?: string;
      fullName?: string;
      id?: number;
      principal?: string;
      shortName?: string;
      status?: string;
      type?: string;
    };

    export interface Req {
      trueIds: string;
    }
    export type Res = Array<EmployeeDTO>;
  }

  /** get /test/listByUserId */
  function getTestListByUserId(req: ET<GetTestListByUserId.Req>, options?: object): Promise<ET<GetTestListByUserId.Res>>;

  export module PostServiceTimeBatchUpdate {
    export type ExpertServiceTimeBatchUpdateVO = {
      /** 专家主键id */
      id: number;
      /** 服务方式：online_chat：线上咨询 online_video：线上视频  offline：线下 inquiry_online：线上专家问诊 inquiry_offline：线下专家问诊 */
      serviceWay: string;
      /** 专家服务配置列表 */
      expertServiceTimeConfigVOList?: Array<ExpertServiceTimeConfigVO>;
    };
    export type ExpertServiceTimeConfigVO = {
      /** 服务开始日期，格式yyyy-MM-dd */
      serviceStartDate: LocalDate;
      /** 服务结束日期，格式yyyy-MM-dd */
      serviceEndDate: LocalDate;
      /** 服务开始时间，格式HH:mm */
      serviceStartTime: string;
      /** 服务结束时间，格式HH:mm */
      serviceEndTime: string;
      /** 服务地区，四位行政区划代码 */
      serviceLocationList: Array<string>;
    };
    export type LocalDate = any;

    export type Req = Array<ExpertServiceTimeBatchUpdateVO>;
    export type Res = boolean;
  }

  /** 批量修改专家服务时间 post /expertService/serviceTime/batchUpdate */
  function postServiceTimeBatchUpdate(req: ET<PostServiceTimeBatchUpdate.Req>, options?: object): Promise<ET<PostServiceTimeBatchUpdate.Res>>;

  export module PostServicelocationCheck {
    export type ExpertServiceLocationCheckVO = {
      /** 专家主键id */
      id?: number;
      /** 服务地区列表 */
      serviceLocationList?: Array<string>;
    };
    export type ExpertServiceVO = {
      /** 专家主键id */
      id?: number;
      /** 专家名称 */
      expertName?: string;
    };

    export type Req = Array<ExpertServiceLocationCheckVO>;
    export interface Res {
      /** 是否需要过滤，true需要过滤 false不需要过滤 */
      needFilter?: boolean;
      /** 要过滤的专家名单 */
      expertServiceVOList?: Array<ExpertServiceVO>;
    }
  }

  /** post /expertService/serviceLocation/check */
  function postServicelocationCheck(req: ET<PostServicelocationCheck.Req>, options?: object): Promise<ET<PostServicelocationCheck.Res>>;

  export module GetSelfserviceNoAnswerList {
    export type NoAnswerListResVO = {
      /** id */
      id?: number;
      /** 渠道 */
      channel?: string;
      /** 渠道名称 */
      channelName?: string;
      /** 地区 */
      locationName?: string;
      /** 产品维度 */
      brandName?: string;
      /** 用户名称 */
      userName?: string;
      /** 登录手机号 */
      mobile?: string;
      /** 企业id，云下 */
      companyBizId?: string;
      /** 企业名称 */
      companyName?: string;
      /** 企业税号 */
      companyTaxNo?: string;
      /** 错误信息 */
      errorMessage?: string;
      /** 清洗后的错误信息 */
      cleanErrorMessage?: string;
      /** 报错时间，时间格式：yyyy-MM-dd HH:mm:ss */
      errorTime?: string;
      /** 菜单名称 */
      menuName?: string;
      /** 模块名称 */
      moduleName?: string;
      /** 报错时停留页面的url */
      pageUrl?: string;
      /** 场景路径(场景名称) */
      scenePath?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      queryCount?: boolean;
      sortRuleList?: Array<string>;
      /** 来源渠道 */
      channelList?: Array<string>;
      /** 错误信息 */
      errorMessage?: string;
      /** 报错开始时间，时间格式：yyyy-MM-dd HH:mm */
      startErrorTime?: string;
      /** 报错结束时间，时间格式：yyyy-MM-dd HH:mm */
      endErrorTime?: string;
      /** 报错时停留的菜单名称 */
      menuName?: string;
      /** 报错时停留的模块名称（在助手中叫业务） */
      moduleName?: string;
      /** 地区code */
      locationList?: Array<string>;
      /** 企业id列表 */
      companyIdList?: Array<string>;
      /** 产品维度 */
      brandList?: Array<string>;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<NoAnswerListResVO>;
    }
  }

  /** 查询错误提示无答案日志，分页大小默认20 get /selfservice/noAnswerList */
  function getSelfserviceNoAnswerList(req: ET<GetSelfserviceNoAnswerList.Req>, options?: object): Promise<ET<GetSelfserviceNoAnswerList.Res>>;

  export module PostBatchOperateCheckConfig {
    export type RouteRuleConditionJO = {
      /** 参数code */
      paramCode?: string;
      /** 运算类型 */
      operatorType?: string;
      /** 目标值 */
      targetValue?: string;
    };
    export type AutoCustomerServiceJO = {
      /** 多轮对话转人工开关 */
      multiRoundsEnable?: string;
      /** 多轮对话发言次数 */
      multiRoundsCount?: string;
      /** 多轮对话提示语 */
      multiRoundsTip?: string;
    };
    export type FeedbackCustomQuestionDTO = {
      /** 自定义问题模块是否开启，Y/N */
      customQuestionEnable?: string;
      /** 自定义问题模块展示顺序，0-9 */
      customQuestionOrder?: number;
      /** 展示问题数 */
      displayNum?: number;
      /** 自定义问题列表 */
      questionList?: Array<QuestionDTO>;
    };
    export type QuestionDTO = {
      /** 问题描述 */
      questionTip?: string;
      /** 问题选项 */
      questionOptionList?: Array<string>;
      /** 是否支持访客多选。Y/N */
      multipleEnable?: string;
      /** 是否必填.Y/N */
      solutionOptionRequired?: string;
    };

    export interface Req {
      /** 批量操作类型 1:批量新增条件；2：批量删除条件；3：批量修改受理模式；4：批量修改分配组；5：批量修改窗口界面Logo图6：批量修改欢迎语；7：批量修改排队提示语；8：批量修改机器人多次对话转人工配置；9：批量配置满意度评价自定义问题 */
      operateType: string;
      /** 批量修改规则id列表 */
      ruleIdList: Array<string>;
      /** 新增/删除路由规则条件列表,operateType=1或者operateType=2时不为空 */
      conditionList?: Array<RouteRuleConditionJO>;
      /** 受理模式,operateType=3时不为空 */
      acceptanceMode: string;
      /** 组id ，相对地址,operateType=4时不为空 */
      groupId: number;
      /** LOGO图片url，相对地址,operateType=5时不为空 */
      logoImageUrl: string;
      /** 欢迎语,operateType=6时不为空 */
      welcomeTip: string;
      /** 排队提示语,operateType=7时不为空 */
      waitingTip: string;
      /** 自动转人工配置,operateType=8时不为空 */
      autoCustomerService: AutoCustomerServiceJO;
      /** 自定义问题模块,operateType=9时不为空 */
      customQuestion: FeedbackCustomQuestionDTO;
    }
    export interface Res {
      /** 提示语句 */
      tip?: string;
    }
  }

  /** 校验是否在全局设置中 post /route/rule/batchOperate/checkConfig */
  function postBatchOperateCheckConfig(req: ET<PostBatchOperateCheckConfig.Req>, options?: object): Promise<ET<PostBatchOperateCheckConfig.Res>>;

  export module PostBatchOperateCopy {
    export type RouteRuleBaseCopyJO = {
      /** 规则id */
      ruleId?: number;
      /** 路由策略id */
      policyId?: number;
      /** 规则名称 */
      name?: string;
      /** 备注 */
      remark?: string;
      /** 组id */
      groupId?: number;
      /** 受理模式 */
      acceptanceMode?: string;
      /** 路由规则条件列表 */
      conditionList?: Array<RouteRuleConditionJO>;
    };
    export type RouteRuleConditionJO = {
      /** 参数code */
      paramCode?: string;
      /** 运算类型 */
      operatorType?: string;
      /** 目标值 */
      targetValue?: string;
    };

    export interface Req {
      /** 复制到该路由策略，为空则复制到自身路由策略下 */
      policyId?: string;
      /** 复制路由列表 */
      routeRuleBaseCopyJOList?: Array<RouteRuleBaseCopyJO>;
    }
    export type Res = boolean;
  }

  /** 批量复制路由 post /route/rule/batchOperate/copy */
  function postBatchOperateCopy(req: ET<PostBatchOperateCopy.Req>, options?: object): Promise<ET<PostBatchOperateCopy.Res>>;

  export module PostBatchOperateUpdate {
    export type RouteRuleConditionJO = {
      /** 参数code */
      paramCode?: string;
      /** 运算类型 */
      operatorType?: string;
      /** 目标值 */
      targetValue?: string;
    };
    export type AutoCustomerServiceJO = {
      /** 多轮对话转人工开关 */
      multiRoundsEnable?: string;
      /** 多轮对话发言次数 */
      multiRoundsCount?: string;
      /** 多轮对话提示语 */
      multiRoundsTip?: string;
    };
    export type FeedbackCustomQuestionDTO = {
      /** 自定义问题模块是否开启，Y/N */
      customQuestionEnable?: string;
      /** 自定义问题模块展示顺序，0-9 */
      customQuestionOrder?: number;
      /** 展示问题数 */
      displayNum?: number;
      /** 自定义问题列表 */
      questionList?: Array<QuestionDTO>;
    };
    export type QuestionDTO = {
      /** 问题描述 */
      questionTip?: string;
      /** 问题选项 */
      questionOptionList?: Array<string>;
      /** 是否支持访客多选。Y/N */
      multipleEnable?: string;
      /** 是否必填.Y/N */
      solutionOptionRequired?: string;
    };

    export interface Req {
      /** 批量操作类型 1:批量新增条件；2：批量删除条件；3：批量修改受理模式；4：批量修改分配组；5：批量修改窗口界面Logo图6：批量修改欢迎语；7：批量修改排队提示语；8：批量修改机器人多次对话转人工配置；9：批量配置满意度评价自定义问题 */
      operateType: string;
      /** 批量修改规则id列表 */
      ruleIdList: Array<string>;
      /** 新增/删除路由规则条件列表,operateType=1或者operateType=2时不为空 */
      conditionList?: Array<RouteRuleConditionJO>;
      /** 受理模式,operateType=3时不为空 */
      acceptanceMode: string;
      /** 组id ，相对地址,operateType=4时不为空 */
      groupId: number;
      /** LOGO图片url，相对地址,operateType=5时不为空 */
      logoImageUrl: string;
      /** 欢迎语,operateType=6时不为空 */
      welcomeTip: string;
      /** 排队提示语,operateType=7时不为空 */
      waitingTip: string;
      /** 自动转人工配置,operateType=8时不为空 */
      autoCustomerService: AutoCustomerServiceJO;
      /** 自定义问题模块,operateType=9时不为空 */
      customQuestion: FeedbackCustomQuestionDTO;
    }
    export type Res = boolean;
  }

  /** 批量修改路由 post /route/rule/batchOperate/update */
  function postBatchOperateUpdate(req: ET<PostBatchOperateUpdate.Req>, options?: object): Promise<ET<PostBatchOperateUpdate.Res>>;

  export module GetRuleCopy {
    export type RoutePolicyJO = {
      /** 策略id */
      id?: number;
      /** 策略名称 */
      name?: string;
      /** 路由规则列表 */
      ruleList?: Array<RouteRuleJO>;
    };
    export type RouteRuleJO = {
      /** 规则id */
      id?: number;
      /** 路由策略id */
      policyId?: number;
      /** 规则名称 */
      name?: string;
      /** 备注 */
      remark?: string;
      /** 组id */
      groupId?: number;
      /** 组名称 */
      groupName?: string;
      /** 受理模式 */
      acceptanceMode?: string;
      /** 受理模式名称 */
      acceptanceModeName?: string;
      /** 排序 */
      orderNum?: number;
      /** 规则条件列表 */
      conditionList?: Array<RuleConditionJO>;
      /** 创建人 */
      creator?: string;
      /** 创建人姓名 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人姓名 */
      lastModifier?: string;
      /** 最后修改人 */
      lastModifierName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };
    export type RuleConditionJO = {
      /** id */
      id?: number;
      /** 规则id */
      ruleId?: number;
      /** 参数code */
      paramCode?: string;
      /** 参数名称 */
      paramName?: string;
      /** 运算类型, 0-等于；1-不等于；2-包含；3-不包含；4-符合任意项；5-不符合任意项 */
      operatorType?: string;
      /** 运算类型名称 */
      operatorTypeName?: string;
      /** 目标值, 多个值英文分号分隔 */
      targetValue?: string;
      /** 目标值名称, 多个值英文分号分隔 */
      targetValueName?: string;
    };

    export interface Req {
      /** 路由策略名称（模糊查询） */
      policyName?: string;
      /** 策略适用渠道 */
      channel?: string;
      /** 组id列表 */
      groupIdList?: Array<number>;
      /** 策略名称 */
      ruleName?: string;
      /** 受理模式 */
      acceptanceMode?: string;
      /** 自动转人工是否启用。Y-启用；N-不启用 */
      autoCustomerServiceEnable?: string;
      /** 智能助理是否启用。Y-启用；N-不启用 */
      intelligentAssistantEnable?: string;
      /** 规则条件查询 */
      ruleConditionParamJO?: any;
      /** 规则id列表 */
      ruleIdList?: Array<string>;
    }
    export type Res = Array<RoutePolicyJO>;
  }

  /** 路由规则列表复制 get /route/rule/copy */
  function getRuleCopy(req: ET<GetRuleCopy.Req>, options?: object): Promise<ET<GetRuleCopy.Res>>;

  export module PostRuleList {
    export type RuleConditionParamJO = {
      /** 条件规则code */
      paramCode?: string;
      /** 条件规则值 */
      targetValueList?: Array<string>;
      /** 条件查询类型 1：精准匹配 2：模糊查询 */
      queryType?: string;
    };
    export type RoutePolicyJO = {
      /** 策略id */
      id?: number;
      /** 策略名称 */
      name?: string;
      /** 路由规则列表 */
      ruleList?: Array<RouteRuleJO>;
    };
    export type RouteRuleJO = {
      /** 规则id */
      id?: number;
      /** 路由策略id */
      policyId?: number;
      /** 规则名称 */
      name?: string;
      /** 备注 */
      remark?: string;
      /** 组id */
      groupId?: number;
      /** 组名称 */
      groupName?: string;
      /** 受理模式 */
      acceptanceMode?: string;
      /** 受理模式名称 */
      acceptanceModeName?: string;
      /** 排序 */
      orderNum?: number;
      /** 规则条件列表 */
      conditionList?: Array<RuleConditionJO>;
      /** 创建人 */
      creator?: string;
      /** 创建人姓名 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人姓名 */
      lastModifier?: string;
      /** 最后修改人 */
      lastModifierName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };
    export type RuleConditionJO = {
      /** id */
      id?: number;
      /** 规则id */
      ruleId?: number;
      /** 参数code */
      paramCode?: string;
      /** 参数名称 */
      paramName?: string;
      /** 运算类型, 0-等于；1-不等于；2-包含；3-不包含；4-符合任意项；5-不符合任意项 */
      operatorType?: string;
      /** 运算类型名称 */
      operatorTypeName?: string;
      /** 目标值, 多个值英文分号分隔 */
      targetValue?: string;
      /** 目标值名称, 多个值英文分号分隔 */
      targetValueName?: string;
    };

    export interface Req {
      /** 路由策略名称（模糊查询） */
      policyName?: string;
      /** 策略适用渠道 */
      channel?: string;
      /** 组id列表 */
      groupIdList?: Array<number>;
      /** 策略名称 */
      ruleName?: string;
      /** 受理模式 */
      acceptanceMode?: string;
      /** 自动转人工是否启用。Y-启用；N-不启用 */
      autoCustomerServiceEnable?: string;
      /** 智能助理是否启用。Y-启用；N-不启用 */
      intelligentAssistantEnable?: string;
      /** 规则条件查询 */
      ruleConditionParamJO?: RuleConditionParamJO;
      /** 规则id列表 */
      ruleIdList?: Array<string>;
    }
    export type Res = Array<RoutePolicyJO>;
  }

  /** 查询路由规则列表 post /route/rule/list */
  function postRuleList(req: ET<PostRuleList.Req>, options?: object): Promise<ET<PostRuleList.Res>>;

  export module GetExpertServiceExpertList {
    export type ExpertQueryResVO = {
      id?: number;
      /** 专家姓名 */
      name?: string;
      /** 场景 web-亿企咨询，tool-工具场景，h5-h5专用，all-通用 */
      scene?: string;
      /** 子场景 member-会员咨询，special-专项咨询，inquiry-专家问诊，zsgs-管税专家咨询 */
      subScene?: string;
    };

    export interface Req {
      /** 专家模糊名称 */
      fuzzyName?: string;
    }
    export type Res = Array<ExpertQueryResVO>;
  }

  /** 根据专家名称模糊查询专家 get /expertService/expert/list */
  function getExpertServiceExpertList(req: ET<GetExpertServiceExpertList.Req>, options?: object): Promise<ET<GetExpertServiceExpertList.Res>>;

  export module GetCustomerQueryCompanyByName {
    export type CompanyVO = {
      /** 企业云下id */
      bizId?: string;
      /** 企业名称 */
      name?: string;
    };

    export interface Req {
      companyName: string;
    }
    export type Res = Array<CompanyVO>;
  }

  /** 通过企业名称查询企业 get /customer/queryCompanyByName */
  function getCustomerQueryCompanyByName(req: ET<GetCustomerQueryCompanyByName.Req>, options?: object): Promise<ET<GetCustomerQueryCompanyByName.Res>>;

  export module GetServiceConfigQueryIntentionServiceConfigList {
    export type ConsultServiceConfigVO = {
      /** 自增主键 */
      id?: number;
      /** 咨询产品类型 */
      consultService?: string;
      /** 咨询产品类型名称 */
      consultServiceName?: string;
    };

    export interface Req {
      /** 适用卡片类型: 1:专家机构卡片;2:官方服务卡片 */
      cardTypes?: string;
      /** 咨询产品大类列表：字典服务consult_service_category的code码 */
      categoryList?: Array<string>;
    }
    export type Res = Array<ConsultServiceConfigVO>;
  }

  /** 查询意向咨询产品列表 get /serviceConfig/queryIntentionServiceConfigList */
  function getServiceConfigQueryIntentionServiceConfigList(req: ET<GetServiceConfigQueryIntentionServiceConfigList.Req>, options?: object): Promise<ET<GetServiceConfigQueryIntentionServiceConfigList.Res>>;

  export module GetSelfserviceErrorWarnList {
    export type ErrorWarnListResVO = {
      /** 异常信息 */
      errorMessage?: string;
      /** 地区code */
      locationCode?: string;
      /** 地区 */
      locationName?: string;
      /** 产品维度 */
      brandCode?: string;
      /** 产品维度 */
      brandName?: string;
      /** 影响用户数 */
      affectUserNum?: number;
      /** 人工服务次数，八月不上线，预留 */
      humanServiceNum?: number;
      /** 最近报错时间，时间格式：HH:mm:ss */
      lastErrorTime?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      queryCount?: boolean;
      sortRuleList?: Array<string>;
      /** 产品维度列表 */
      brandList?: Array<string>;
      /** 地区code列表 */
      locationList?: Array<string>;
      /** 错误信息 */
      errorMessage?: string;
      /** 影响用户数，取大于该值的记录 */
      affectUserNum?: number;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<ErrorWarnListResVO>;
    }
  }

  /** 错误告警列表 get /selfservice/errorWarnList */
  function getSelfserviceErrorWarnList(req: ET<GetSelfserviceErrorWarnList.Req>, options?: object): Promise<ET<GetSelfserviceErrorWarnList.Res>>;

  export module PostSelfserviceIgnoreErrorWarn {
    export interface Req {
      /** 异常信息 */
      errorMessage: string;
      /** 地区code */
      locationCode?: string;
      /** 产品维度code */
      brandCode?: string;
    }
    export type Res = boolean;
  }

  /** 忽略告警信息 post /selfservice/ignoreErrorWarn */
  function postSelfserviceIgnoreErrorWarn(req: ET<PostSelfserviceIgnoreErrorWarn.Req>, options?: object): Promise<ET<PostSelfserviceIgnoreErrorWarn.Res>>;

  export module PostSelfserviceRemoveIgnoreErrorWarn {
    export interface Req {
      /** 异常信息 */
      errorMessage: string;
      /** 地区code */
      locationCode?: string;
      /** 产品维度code */
      brandCode?: string;
    }
    export type Res = boolean;
  }

  /** 移除忽略告警信息 post /selfservice/removeIgnoreErrorWarn */
  function postSelfserviceRemoveIgnoreErrorWarn(req: ET<PostSelfserviceRemoveIgnoreErrorWarn.Req>, options?: object): Promise<ET<PostSelfserviceRemoveIgnoreErrorWarn.Res>>;

  export module PostFinancialTaxConfigAdd {
    export interface Req {
      /** 主题代码 */
      businessTopicCode: string;
      /** 主题名称 */
      businessTopicName: string;
      /** 主题类型||1:业务类;2:工具类 */
      topicType: string;
      /** 生效月份,按逗号分割保存 */
      effectMonth: string;
      /** 地区编码。省直单4位编码 */
      locationCode: string;
      /** 主题展示顺序 */
      topicOrder: number;
      /** 业务范围列表，多个业务范围按逗号分隔 */
      scopeNames: string;
      /** 问题录入框提示文案 */
      inputTip: string;
      /** 财税自助模型2-问答机器人模型相似度阈值 */
      qaRobotQuestionModelSimilarityThreshold: number;
      /** 模型3-chatgpt开关||0:关闭;1:打开 */
      chatgptSwitchFlag: string;
      /** 财税自助模型3-chatgpt模型相似度阈值 */
      chatgptModelSimilarityThreshold: number;
      /** 财税自助模型3-chatgpt模型参考资料相似度阈值 */
      chatgptModelRetrieveThreshold: number;
      /** 财税自助模型3-chatgpt模型参考资料最大数量 */
      chatgptModelRetrieveTopkThreshold: number;
      /** 财税自助模型4-搜索算法模型相似度阈值 */
      qaSearchModelSimilarityThreshold: number;
      /** 财税自助模型5-搜索算法模型相似度阈值 */
      toolModelSimilarityThreshold: number;
    }
    export type Res = boolean;
  }

  /** 新增财税智能助理主题配置 post /financialTaxConfig/add */
  function postFinancialTaxConfigAdd(req: ET<PostFinancialTaxConfigAdd.Req>, options?: object): Promise<ET<PostFinancialTaxConfigAdd.Res>>;

  export module PostFinancialTaxConfigDelete {
    export interface Req {
      /** 财税智能助理主题配置表(consult_financial_tax_config)主键id */
      id: string;
    }
    export type Res = boolean;
  }

  /** 删除财税智能助理主题配置 post /financialTaxConfig/delete */
  function postFinancialTaxConfigDelete(req: ET<PostFinancialTaxConfigDelete.Req>, options?: object): Promise<ET<PostFinancialTaxConfigDelete.Res>>;

  export module PostFinancialTaxConfigUpdate {
    export interface Req {
      /** 财税智能助理主题配置表(consult_financial_tax_config)主键id */
      id: string;
      /** 主题代码 */
      businessTopicCode: string;
      /** 主题名称 */
      businessTopicName: string;
      /** 主题类型||1:业务类;2:工具类 */
      topicType: string;
      /** 生效月份,按逗号分割保存 */
      effectMonth: string;
      /** 地区编码。省直单4位编码 */
      locationCode: string;
      /** 主题展示顺序 */
      topicOrder: number;
      /** 业务范围列表，多个业务范围按逗号分隔 */
      scopeNames: string;
      /** 问题录入框提示文案 */
      inputTip: string;
      /** 财税自助模型2-问答机器人模型相似度阈值 */
      qaRobotQuestionModelSimilarityThreshold: number;
      /** 模型3-chatgpt开关||0:关闭;1:打开 */
      chatgptSwitchFlag: string;
      /** 财税自助模型3-chatgpt模型相似度阈值 */
      chatgptModelSimilarityThreshold: number;
      /** 财税自助模型3-chatgpt模型参考资料相似度阈值 */
      chatgptModelRetrieveThreshold: number;
      /** 财税自助模型3-chatgpt模型参考资料最大数量 */
      chatgptModelRetrieveTopkThreshold: number;
      /** 财税自助模型4-搜索算法模型相似度阈值 */
      qaSearchModelSimilarityThreshold: number;
      /** 财税自助模型5-搜索算法模型相似度阈值 */
      toolModelSimilarityThreshold: number;
    }
    export type Res = boolean;
  }

  /** 更新财税智能助理主题配置 post /financialTaxConfig/update */
  function postFinancialTaxConfigUpdate(req: ET<PostFinancialTaxConfigUpdate.Req>, options?: object): Promise<ET<PostFinancialTaxConfigUpdate.Res>>;

  export module GetFinancialTaxConfigDetail {
    export interface Req {
      /** 主键id */
      id: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 控制类型：1-saas构件 2-标签，控制类型字典：consult_service_control_type */
      controlType?: string;
      /** 控制类型名称 */
      controlTypeName?: string;
      /** 构件id */
      componentId?: string;
      /** code：saasCode或标签，标签字典：consult_service_qqt_label */
      code?: string;
      /** 名称：构件名称或标签名称 */
      name?: string;
      /** 咨询产品类型 */
      consultService?: string;
      /** 咨询产品类型名称 */
      consultServiceName?: string;
      /** 限次标志：Y-限次 N-不限次（控制类型为标签时传不限次） */
      limitFlag?: string;
      /** 备注 */
      remark?: string;
    }
  }

  /** 查询财税智能助理主题配置详情 get /financialTaxConfig/detail */
  function getFinancialTaxConfigDetail(req: ET<GetFinancialTaxConfigDetail.Req>, options?: object): Promise<ET<GetFinancialTaxConfigDetail.Res>>;

  export module GetFinancialTaxConfigListByPage {
    export type ConsultRightConfigListVO = {
      /** id */
      id?: number;
      /** 控制类型：1-saas构件 2-标签，控制类型字典：consult_service_control_type */
      controlType?: string;
      /** 控制类型名称 */
      controlTypeName?: string;
      /** 构件id */
      componentId?: string;
      /** code：saasCode或标签，标签字典：consult_service_qqt_label */
      code?: string;
      /** 名称：构件名称或标签名称 */
      name?: string;
      /** 咨询产品类型 */
      consultService?: string;
      /** 咨询产品类型名称 */
      consultServiceName?: string;
      /** 限次标志：Y-限次 N-不限次（控制类型为标签时传不限次） */
      limitFlag?: string;
      /** 备注 */
      remark?: string;
      /** 修改人姓名 */
      modifierName?: string;
      /** 修改时间 */
      modifyDate?: string;
    };

    export interface Req {
      /** 主题代码 */
      businessTopicCode?: string;
      /** 主题名称 */
      businessTopicName?: string;
      /** 主题类型||1:业务类;2:工具类 */
      topicType?: string;
      /** 生效月份列表 */
      effectMonthList?: Array<string>;
      /** 地区编码列表 */
      locationCodeList?: Array<string>;
      /** 展示顺序 */
      topicOrder?: number;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<ConsultRightConfigListVO>;
    }
  }

  /** 分页查询财税智能助理主题配置列表 get /financialTaxConfig/listByPage */
  function getFinancialTaxConfigListByPage(req: ET<GetFinancialTaxConfigListByPage.Req>, options?: object): Promise<ET<GetFinancialTaxConfigListByPage.Res>>;

  export module GetFinancialTaxConfigSummary {
    export type ConsultFinancialTaxConfigSummaryVO = {
      /** 月份 */
      effectMonth?: number;
      /** 财税智能助理主题配置基础信息列表 */
      consultFinancialTaxConfigBaseVOList?: Array<ConsultFinancialTaxConfigBaseVO>;
    };
    export type ConsultFinancialTaxConfigBaseVO = {
      /** 财税智能助理主题配置表(consult_financial_tax_config)主键id */
      id?: string;
      /** 主题代码 */
      businessTopicCode?: string;
      /** 主题名称 */
      businessTopicName?: string;
      /** 主题类型||1:业务类;2:工具类 */
      topicType?: string;
      /** 生效月份列表 */
      effectMonthList?: Array<number>;
      /** 地区编码。省直单4位编码 */
      locationCode?: string;
      /** 主题展示顺序 */
      topicOrder?: number;
    };

    export type Req = any;
    export type Res = Array<ConsultFinancialTaxConfigSummaryVO>;
  }

  /** 年度预览查询 get /financialTaxConfig/summary */
  function getFinancialTaxConfigSummary(req?: ET<GetFinancialTaxConfigSummary.Req>, options?: object): Promise<ET<GetFinancialTaxConfigSummary.Res>>;

  export module PostWarnConfigAdd {
    export interface Req {
      /** 配置id */
      id: number;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询;06:其他 */
      consultBusinessTypeList?: Array<string>;
      /** 咨询方式||1:来电;2:在线; */
      typeList?: Array<string>;
      /** 经营中心 */
      businessCenterCodeList?: Array<string>;
      /** 所属地区id，000000代表所有地区 */
      areaIdList?: Array<string>;
      /** 是否特别关注组｜｜Y：是；N：否； */
      specialFollowFlag: string;
      /** 特别关注组名称 */
      specialFollowName?: string;
      /** 告警周期 */
      warnPeriod: number;
      /** 接通率下限阈值 */
      callCompletingRateLower: number;
      /** 接通率上限阈值 */
      callCompletingRateUpper: number;
      /** 组id列表，多个用逗号分隔 */
      groupIdList?: Array<string>;
    }
    export type Res = boolean;
  }

  /** 新增告警配置 post /warnConfig/add */
  function postWarnConfigAdd(req: ET<PostWarnConfigAdd.Req>, options?: object): Promise<ET<PostWarnConfigAdd.Res>>;

  export module PostWarnConfigUpdate {
    export interface Req {
      /** 配置id */
      id: number;
      /** 告警周期 */
      warnPeriod: number;
      /** 接通率下限阈值 */
      callCompletingRateLower: number;
      /** 接通率上限阈值 */
      callCompletingRateUpper: number;
      /** 组id列表，多个用逗号分隔 */
      groupIds?: string;
    }
    export type Res = boolean;
  }

  /** 修改告警配置 post /warnConfig/update */
  function postWarnConfigUpdate(req: ET<PostWarnConfigUpdate.Req>, options?: object): Promise<ET<PostWarnConfigUpdate.Res>>;

  export module PostWarnConfigBatchUpdateStatus {
    export interface Req {
      /** 配置id列表 */
      idList?: Array<number>;
      /** 状态||0:正常;1:停用; */
      status: string;
    }
    export type Res = boolean;
  }

  /** 批量修改告警配置状态 post /warnConfig/batchUpdateStatus */
  function postWarnConfigBatchUpdateStatus(req: ET<PostWarnConfigBatchUpdateStatus.Req>, options?: object): Promise<ET<PostWarnConfigBatchUpdateStatus.Res>>;

  export module PostWarnConfigBatchUpdate {
    export interface Req {
      /** 配置id列表 */
      idList?: Array<number>;
      /** 操作类型||1:批量修改告警周期;2:批量修改阈值; */
      controlType: string;
      /** 告警周期 */
      warnPeriod?: number;
      /** 接通率下限阈值 */
      callCompletingRateLower?: number;
      /** 接通率上限阈值 */
      callCompletingRateUpper?: number;
    }
    export type Res = boolean;
  }

  /** 批量修改告警配置 post /warnConfig/batchUpdate */
  function postWarnConfigBatchUpdate(req: ET<PostWarnConfigBatchUpdate.Req>, options?: object): Promise<ET<PostWarnConfigBatchUpdate.Res>>;

  export module GetWarnConfigDetail {
    export type GroupVO = {
      /** 组id */
      groupId?: string;
      /** 组名称 */
      groupName?: string;
    };

    export interface Req {
      /** 主键id */
      id: number;
    }
    export interface Res {
      /** 配置id */
      id?: number;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询;06:其他 */
      consultBusinessType?: string;
      /** 咨询业务类型名称 */
      consultBusinessTypeName?: string;
      /** 咨询方式||1:来电;2:在线; */
      type?: string;
      /** 咨询方式名称 */
      typeName?: string;
      /** 经营中心 */
      businessCenterCode?: string;
      /** 经营中心名称 */
      businessCenterCodeName?: string;
      /** 所属地区id，000000代表所有地区 */
      areaId?: string;
      /** 所属地区名称 */
      areaIdName?: string;
      /** 是否特别关注组｜｜Y：是；N：否； */
      specialFollowFlag?: string;
      /** 特别关注组名称 */
      specialFollowName?: string;
      /** 告警周期 */
      warnPeriod?: number;
      /** 接通率下限阈值 */
      callCompletingRateLower?: number;
      /** 接通率上限阈值 */
      callCompletingRateUpper?: number;
      /** 状态||0:正常;1:停用; */
      status?: string;
      /** 组列表 */
      groupList?: Array<GroupVO>;
    }
  }

  /** 查询告警配置详情 get /warnConfig/detail */
  function getWarnConfigDetail(req: ET<GetWarnConfigDetail.Req>, options?: object): Promise<ET<GetWarnConfigDetail.Res>>;

  export module GetWarnConfigListByPage {
    export type WarnConfigListVO = {
      /** 配置id */
      id?: number;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询;06:其他 */
      consultBusinessType?: string;
      /** 咨询业务类型名称 */
      consultBusinessTypeName?: string;
      /** 咨询方式||1:来电;2:在线; */
      type?: string;
      /** 咨询方式名称 */
      typeName?: string;
      /** 经营中心 */
      businessCenterCode?: string;
      /** 经营中心名称 */
      businessCenterCodeName?: string;
      /** 所属地区id，000000代表所有地区 */
      areaId?: string;
      /** 所属地区名称 */
      areaIdName?: string;
      /** 是否特别关注组｜｜Y：是；N：否； */
      specialFollowFlag?: string;
      /** 特别关注组名称 */
      specialFollowName?: string;
      /** 状态||0:正常;1:停用; */
      status?: string;
      /** 接待组数量 */
      groupCount?: string;
      /** 修改人姓名 */
      modifierName?: string;
      /** 修改时间 */
      modifyDate?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: any;
      sortRuleList?: Array<string>;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询;06:其他 */
      consultBusinessTypeList?: Array<string>;
      /** 咨询方式||1:来电;2:在线; */
      typeList?: Array<string>;
      /** 经营中心 */
      businessCenterCodeList?: Array<string>;
      /** 所属地区id，000000代表所有地区 */
      areaIdList?: Array<string>;
      /** 是否特别关注组｜｜Y：是；N：否； */
      specialFollowFlag?: string;
      /** 状态||0:正常;1:停用; */
      status?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<WarnConfigListVO>;
    }
  }

  /** 分页查询告警配置列表 get /warnConfig/listByPage */
  function getWarnConfigListByPage(req: ET<GetWarnConfigListByPage.Req>, options?: object): Promise<ET<GetWarnConfigListByPage.Res>>;

  export module GetCommonQueryGroupList {
    export type GroupDTO = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
    };

    export interface Req {
      /** 组id */
      groupId?: string;
      /** 状态||0:正常;1:停用; */
      status?: string;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询;06:其他 */
      consultBusinessTypeList?: Array<string>;
      /** 咨询方式||1:来电;2:在线; */
      typeList?: Array<string>;
      /** 经营中心 */
      businessCenterCodeList?: Array<string>;
      /** 所属地区id，000000代表所有地区 */
      areaIdList?: Array<string>;
    }
    export type Res = Array<GroupDTO>;
  }

  /** 根据条件查询坐席组信息列表 get /common/queryGroupList */
  function getCommonQueryGroupList(req: ET<GetCommonQueryGroupList.Req>, options?: object): Promise<ET<GetCommonQueryGroupList.Res>>;

  export module PostPriorityBatchUpdate {
    export interface Req {
      /** 批量修改优先级id列表 */
      idList: Array<number>;
      /** VIP等级 */
      vip: number;
      /** 受理优先级 */
      grade: number;
      /** 备注 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 批量修改路由优先级配置 post /route/priority/batchUpdate */
  function postPriorityBatchUpdate(req: ET<PostPriorityBatchUpdate.Req>, options?: object): Promise<ET<PostPriorityBatchUpdate.Res>>;

  export module PostFeedbackBatchUpdate {
    export type RouteRuleFeedbackSaveJO = {
      /** 路由规则id */
      ruleId?: number;
      /** 配置类型，0-全局配置；1-差异化配置 */
      type?: string;
      /** 满意度评价应用设置 */
      applicationSet?: FeedbackApplicationSetDTO;
      /** 满意度评价指标设置 */
      indicatorSet?: FeedbackIndicatorSetDTO;
    };
    export type FeedbackApplicationSetDTO = {
      /** 评价方式选项||1:允许访客主动评价;2:对话结束后系统自动推送满意度窗口;3:对话中系统自动推送满意度评价窗口;4:必须评价后才能关闭窗口 */
      feedbackTypeOptionList?: Array<string>;
    };
    export type FeedbackIndicatorSetDTO = {
      /** 评价模块 */
      evaluation?: FeedbackEvaluationDTO;
      /** 解决模块 */
      solution?: FeedbackSolutionDTO;
      /** 打分模块 */
      score?: FeedbackScoreDTO;
      /** 自定义问题模块 */
      customQuestion?: FeedbackCustomQuestionDTO;
      /** 不满意/未解决信息采集项 */
      evaluationAndSolutionCollection?: EvaluationAndSolutionCollectionDTO;
    };
    export type FeedbackEvaluationDTO = {
      /** 评价模块是否展示.Y/N */
      evaluationEnable?: string;
      /** 评价模块展示顺序.0-9 */
      evaluationOrder?: number;
      /** 满意度选项。每项最长20字 */
      feedbackOptionList?: Array<string>;
      /** 默认满意度选项，1：非常满意；2：满意；3：一般；4：不满意 */
      feedbackDefaultOption?: string;
      /** 是否采集不满意用户信息。Y/N */
      userInfoEnable?: string;
      /** 用户信息项 */
      userInfoOptionList?: Array<string>;
      /** 用户信息是否必填，Y：是，N：否 */
      userInfoRequired?: string;
      /** 用户不满意信息采集引导语。最长200字 */
      userInfoTip?: string;
      /** 是否采集不满意度原因。Y/N */
      dissatisfiedReasonEnable?: string;
      /** 是否支持访客多选。Y/N */
      dissatisfiedReasonMultipleEnable?: string;
      /** 不满意原因是否必填，Y：是，N：否 */
      dissatisfiedReasonRequired?: string;
      /** 采集不满意原因引导语.200字 */
      dissatisfiedReasonTip?: string;
      /** 不满意原因选项。每项最长20字 */
      dissatisfiedReasonOptionList?: Array<string>;
    };
    export type FeedbackSolutionDTO = {
      /** 解决模块是否展示.Y/N */
      solutionEnable?: string;
      /** 解决模块展示顺序.0-9 */
      solutionOrder?: number;
      /** 解决模块的引导语.最多200字 */
      solutionTip?: string;
      /** 解决项展示内容.最多20字 */
      solutionOptionYesContent?: string;
      /** 未解决项展示内容.最多20字 */
      solutionOptionNoContent?: string;
      /** 解决项是否必填.Y/N */
      solutionOptionRequired?: string;
      /** 解决默认项，1：解决 0：未解决 2：不确定 */
      solvedDefaultOption?: string;
      /** 未解决用户信息 */
      unsolvedUserInfo?: FeedbackUnsolvedUserInfoDTO;
      /** 未解决原因 */
      unsolvedReason?: FeedbackUnsolvedReasonDTO;
    };
    export type FeedbackScoreDTO = {
      /** 打分模块是否开启.Y/N */
      scoreEnable?: string;
      /** 打分模块展示顺序.0-9 */
      scoreOrder?: number;
      /** 打分模块提示语,最多200字 */
      scoreTip?: string;
    };
    export type FeedbackCustomQuestionDTO = {
      /** 自定义问题模块是否开启，Y/N */
      customQuestionEnable?: string;
      /** 自定义问题模块展示顺序，0-9 */
      customQuestionOrder?: number;
      /** 展示问题数 */
      displayNum?: number;
      /** 自定义问题列表 */
      questionList?: Array<QuestionDTO>;
    };
    export type EvaluationAndSolutionCollectionDTO = {
      /** 采集模块是否开启||Y:展示;N:不展示 */
      collectionEnable?: string;
      /** 展示顺序.0-9 */
      order?: number;
      /** 用户信息采集模块 */
      evaluationAndSolutionUserInfoCollection?: EvaluationAndSolutionUserInfoCollectionDTO;
      /** 原因采集模块 */
      evaluationAndSolutionReasonCollection?: EvaluationAndSolutionReasonCollectionDTO;
    };
    export type FeedbackUnsolvedUserInfoDTO = {
      /** 是否采集未解决用户信息。Y：是，N：否 */
      userInfoEnable?: string;
      /** 未解决用户信息项。0：称呼，1：电话号码 */
      userInfoOptionList?: Array<string>;
      /** 未解决用户信息是否必填。Y：是，N：否 */
      userInfoRequired?: string;
      /** 未解决用户信息引导语。最长200个字 */
      userInfoTip?: string;
    };
    export type FeedbackUnsolvedReasonDTO = {
      /** 是否采集未解决原因。Y：是，N：否 */
      unsolvedReasonEnable?: string;
      /** 是否支持访客多选。Y：是，N：否 */
      unsolvedReasonMultipleEnable?: string;
      /** 未解决原因是否必填。Y：是，N：否 */
      unsolvedReasonRequired?: string;
      /** 采集未解决原因引导语.200字 */
      unsolvedReasonTip?: string;
      /** 未解决原因选项。每项最长20字 */
      unsolvedReasonOptionList?: Array<string>;
    };
    export type QuestionDTO = {
      /** 问题描述 */
      questionTip?: string;
      /** 问题选项 */
      questionOptionList?: Array<string>;
      /** 是否支持访客多选。Y/N */
      multipleEnable?: string;
      /** 是否必填.Y/N */
      solutionOptionRequired?: string;
    };
    export type EvaluationAndSolutionUserInfoCollectionDTO = {
      /** 是否采集用户信息。Y：是，N：否 */
      userInfoEnable?: string;
      /** 采集用户信息项。0：称呼，1：电话号码 */
      userInfoOptionList?: Array<string>;
      /** 采集用户信息是否必填。Y：是，N：否 */
      userInfoRequired?: string;
      /** 采集用户信息引导语。最长200个字 */
      userInfoTip?: string;
    };
    export type EvaluationAndSolutionReasonCollectionDTO = {
      /** 是否采集原因。Y：是，N：否 */
      reasonEnable?: string;
      /** 是否支持访客多选。Y：是，N：否 */
      reasonMultipleEnable?: string;
      /** 采集原因是否必填。Y：是，N：否 */
      reasonRequired?: string;
      /** 采集原因引导语，最多200字 */
      reasonTip?: string;
      /** 未解决原因选项，用户手输，每项最长20字 */
      reasonOptionList?: Array<string>;
    };

    export interface Req {
      /** 路由规则id列表 */
      ruleIdList: Array<number>;
      /** 批量修改的字段列表 */
      fieldList: Array<string>;
      /** 满意度评价页面对象 */
      routeRuleFeedback: RouteRuleFeedbackSaveJO;
    }
    export type Res = boolean;
  }

  /** 批量更新满意度评价配置 post /route/rule/feedback/batchUpdate */
  function postFeedbackBatchUpdate(req: ET<PostFeedbackBatchUpdate.Req>, options?: object): Promise<ET<PostFeedbackBatchUpdate.Res>>;

  export module PostChatTipBatchUpdate {
    export type RouteRuleChatTipJO = {
      /** 规则id */
      ruleId?: number;
      /** 配置类型 */
      type?: string;
      /** 对话接通前提示语 */
      beforeChatTip?: string;
      /** 欢迎语 */
      welcomeTip?: string;
      /** 排队提示语 */
      waitingTip?: string;
      /** 忙碌提示语 */
      busyTip?: string;
      /** 黑名单提示语 */
      blacklistTip?: string;
      /** 离线提示语 */
      offlineTip?: string;
      /** 访客长时未回复提示是否开启 */
      visitorNoReplyTipEnable?: string;
      /** 同步提醒坐席是否开启 */
      remindAgentEnable?: string;
      /** 访客未发送消息时间间隔 */
      visitorNoReplyInterval?: string;
      /** 访客未发送消息提示 */
      visitorNoReplyTip?: string;
      /** 访客未发送消息对话结束时间间隔 */
      visitorNoReplyEndInternal?: string;
      /** 访客未发送消息对话结束提示 */
      visitorNoReplyEndTip?: string;
      /** 排队发送消息是否开启 */
      waitingSendMessageEnable?: string;
      /** 排队消息发送条数及提示配置 */
      waitingMessageSendConfigList?: Array<RouteRuleWaitingMessageSendConfigJO>;
      /** 消息发送上限 */
      waitingMessageSendLimit?: string;
      /** 发送消息上限提示 */
      waitingMessageSendLimitTip?: string;
      /** 排队发送消息不开启提示语 */
      disableTip?: string;
      /** 机器人和人工都不启用提示 */
      noServiceTip?: string;
      /** 重连时间间隔 */
      reconnectInterval?: string;
      /** 转接超限配置 */
      chatTransferLimit?: ChatTransferLimitDTO;
      /** 收藏对话配置 */
      chatCollect?: ChatCollectDTO;
      /** 排队超时优先接入配置 */
      waitTimeoutPriority?: WaitTimeoutPriorityDTO;
    };
    export type RouteRuleWaitingMessageSendConfigJO = {
      /** 消息发送条数 */
      sendNum?: string;
      /** 消息发送提示 */
      sendTip?: string;
    };
    export type ChatTransferLimitDTO = {
      /** 转接超限提醒是否打开 Y:打开 N:关闭 */
      enable?: string;
      /** 超限次数 */
      limitNum?: number;
      /** 超限提示语 */
      limitTip?: string;
    };
    export type ChatCollectDTO = {
      /** 收藏开关是否打开 Y:打开 N:关闭 */
      enable?: string;
      /** 收藏提示语 */
      collectTip?: string;
    };
    export type WaitTimeoutPriorityDTO = {
      /** 是否开启 */
      enable: string;
      /** 超时时间，单位秒 */
      timeout?: number;
      /** 优先级 */
      priority?: number;
    };

    export interface Req {
      /** 路由规则id列表 */
      ruleIdList: Array<number>;
      /** 批量修改的字段列表 */
      fieldList: Array<string>;
      /** 对话提示页面对象 */
      routeRuleChatTip: RouteRuleChatTipJO;
    }
    export type Res = boolean;
  }

  /** 批量更新对话提示页面配置 post /route/rule/chatTip/batchUpdate */
  function postChatTipBatchUpdate(req: ET<PostChatTipBatchUpdate.Req>, options?: object): Promise<ET<PostChatTipBatchUpdate.Res>>;

  export module PostWindowBatchUpdate {
    export type RouteRuleWindowJO = {
      /** 规则id */
      ruleId?: number;
      /** 配置类型，0-全局配置；1—自定义配置 */
      type?: string;
      /** 窗口名称 */
      name?: string;
      /** 跑马灯 */
      carousel?: string;
      /** 跑马灯是否滚动显示 */
      carouselSlideEnable?: string;
      /** LOGO图片url，相对地址 */
      logoImageUrl?: string;
      /** 广告类型，0-图片；1-轮播图 */
      adType?: string;
      /** 广告地址，图片是相对地址；轮播图是完整地址 */
      adUrl?: string;
      /** 广告图跳转链接 */
      adJumpUrl?: string;
      /** 轮播图配置id */
      sliderImageId?: number;
      /** 转人工按钮是否显示 */
      customerServiceButtonEnable?: string;
      /** 工具栏配置项，0-字体，1-表情、2-截屏、3-文件发送、4-保存记录，5-声音 */
      toolbar?: Array<string>;
      /** 创建人 */
      creator?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改人名称 */
      lastModifierName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };

    export interface Req {
      /** 路由规则id列表 */
      ruleIdList: Array<number>;
      /** 批量修改的字段列表 */
      fieldList: Array<string>;
      /** 窗口页面对象 */
      routeRuleWindow: RouteRuleWindowJO;
    }
    export type Res = boolean;
  }

  /** 保存路由规则窗口界面 post /route/rule/window/batchUpdate */
  function postWindowBatchUpdate(req: ET<PostWindowBatchUpdate.Req>, options?: object): Promise<ET<PostWindowBatchUpdate.Res>>;

  export module PostBatchUpdateCheckGlobalConfig {
    export interface Req {
      /** 全局校验类型<br><p><li>feedback:满意度</li><li>chatTip:对话提示</li><li>window:窗口页面</li></p> */
      checkType: string;
      /** 批量修改规则id列表 */
      ruleIdList: Array<number>;
    }
    export interface Res {
      /** 是否校验成功 */
      checkSuccess?: boolean;
      /** 校验失败提示列表 */
      failureMsgList?: Array<string>;
    }
  }

  /** 校验是否在已经存在 post /route/rule/batchUpdate/checkGlobalConfig */
  function postBatchUpdateCheckGlobalConfig(req: ET<PostBatchUpdateCheckGlobalConfig.Req>, options?: object): Promise<ET<PostBatchUpdateCheckGlobalConfig.Res>>;

  export module GetRuleGetRouteRuleOptionConfigList {
    export type RouteRuleOptionConfigJO = {
      /** 选项类型<p><li>feedback:表示满意度评价选项</li><li>solution:表示解决情况选项</li></p> */
      optionType?: string;
      /** 选项列表 */
      optionConfigList?: Array<RouteRuleOptionJO>;
    };
    export type RouteRuleOptionJO = {
      /** 选项Code<p>{optionCode: 1,optionName: 非常满意选项}</p> */
      optionCode?: string;
      /** 选项名称{optionCode: 1,optionName: 非常满意选项} */
      optionName?: string;
    };

    export interface Req {
      /** 选项类型<p><li>feedback:表示满意度评价选项</li><li>solution:表示解决情况选项</li></p> */
      optionTypeList?: Array<string>;
    }
    export type Res = Array<RouteRuleOptionConfigJO>;
  }

  /** get /route/rule/getRouteRuleOptionConfigList */
  function getRuleGetRouteRuleOptionConfigList(req: ET<GetRuleGetRouteRuleOptionConfigList.Req>, options?: object): Promise<ET<GetRuleGetRouteRuleOptionConfigList.Res>>;

  export module PostSelfserviceImportExceptionTips {
    export interface Req {
      file: any;
    }
    export interface Res {
      failMessageList?: Array<string>;
    }
  }

  /** 导入异常提示语 post /selfservice/importExceptionTips */
  function postSelfserviceImportExceptionTips(req: ET<PostSelfserviceImportExceptionTips.Req>, options?: object): Promise<ET<PostSelfserviceImportExceptionTips.Res>>;

  export module PostSelfserviceImportHelpTips {
    export interface Req {
      file: any;
    }
    export interface Res {
      failMessageList?: Array<string>;
    }
  }

  /** 导入沉侵式帮助 post /selfservice/importHelpTips */
  function postSelfserviceImportHelpTips(req: ET<PostSelfserviceImportHelpTips.Req>, options?: object): Promise<ET<PostSelfserviceImportHelpTips.Res>>;

  export module GetSelfserviceGetImportHelpTipsTemplateUrl {
    export type Req = any;
    export type Res = string;
  }

  /** 导入沉侵式帮助模板链接 get /selfservice/getImportHelpTipsTemplateUrl */
  function getSelfserviceGetImportHelpTipsTemplateUrl(req?: ET<GetSelfserviceGetImportHelpTipsTemplateUrl.Req>, options?: object): Promise<ET<GetSelfserviceGetImportHelpTipsTemplateUrl.Res>>;

  export module GetSelfserviceGetImportExceptionTipsTemplateUrl {
    export type Req = any;
    export type Res = string;
  }

  /** 导入异常提示语模板链接 get /selfservice/getImportExceptionTipsTemplateUrl */
  function getSelfserviceGetImportExceptionTipsTemplateUrl(req?: ET<GetSelfserviceGetImportExceptionTipsTemplateUrl.Req>, options?: object): Promise<ET<GetSelfserviceGetImportExceptionTipsTemplateUrl.Res>>;

  export module PostForbidList {
    export type ForbidResponseJO = {
      /** 配置id */
      id?: number;
      /** 手机号 */
      mobile?: string;
      /** 是否有效，Y/N */
      status?: string;
      /** 失效日期 */
      expireDate?: string;
      /** 分子公司代码 */
      branchCode?: string;
      /** 分子公司名称 */
      branchName?: string;
      /** 创建人id */
      creatorId?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 创建时间 */
      createDate?: string;
      /** 修改人id */
      modifierId?: string;
      /** 修改人名称 */
      modifierName?: string;
      /** 修改时间 */
      modifyDate?: string;
      /** 所属经营中心代码 */
      businessCenterCode?: string;
      /** 所属经营中心名称 */
      businessCenterName?: string;
      /** 大区代码 */
      bigRegionCode?: string;
      /** 大区名称 */
      bigRegionName?: string;
    };

    export interface Req {
      /** 每页显示条数,默认20条 */
      pageSize?: number;
      /** 当前页码,默认pageIndex=1 */
      pageIndex?: number;
      /** 手机号 */
      mobile?: string;
      /** 分子公司代码 */
      branchCode?: string;
      /** 创建人id */
      creatorId?: string;
      /** 修改人id */
      modifierId?: string;
      /** 大区组织代码 */
      bigRegionCodeList?: Array<string>;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ForbidResponseJO>;
    }
  }

  /** 查询手机号禁入配置列表 post /forbid/list */
  function postForbidList(req: ET<PostForbidList.Req>, options?: object): Promise<ET<PostForbidList.Res>>;

  export module PostWarnConfigListByPage {
    export type Sort = {
      fieldNameList?: Array<string>;
      desc?: boolean;
    };
    export type SortRule = {
      field?: string;
      order?: string;
    };
    export type WarnConfigListVO = {
      /** 配置id */
      id?: number;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询;06:其他 */
      consultBusinessType?: string;
      /** 咨询业务类型名称 */
      consultBusinessTypeName?: string;
      /** 咨询方式||1:来电;2:在线; */
      type?: string;
      /** 咨询方式名称 */
      typeName?: string;
      /** 经营中心 */
      businessCenterCode?: string;
      /** 经营中心名称 */
      businessCenterCodeName?: string;
      /** 所属地区id，000000代表所有地区 */
      areaId?: string;
      /** 所属地区名称 */
      areaIdName?: string;
      /** 是否特别关注组｜｜Y：是；N：否； */
      specialFollowGroupFlag?: string;
      /** 特别关注组名称 */
      specialFollowGroupName?: string;
      /** 状态||0:正常;1:停用; */
      status?: string;
      /** 接待组数量 */
      groupCount?: string;
      /** 修改人姓名 */
      modifierName?: string;
      /** 修改时间 */
      modifyDate?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: Sort;
      sortRuleList?: Array<SortRule>;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询;06:其他 */
      consultBusinessTypeList?: Array<string>;
      /** 咨询方式||1:来电;2:在线; */
      typeList?: Array<string>;
      /** 经营中心 */
      businessCenterCodeList?: Array<string>;
      /** 所属地区id，000000代表所有地区 */
      areaIdList?: Array<string>;
      /** 是否特别关注组｜｜Y：是；N：否； */
      specialFollowGroupFlag?: string;
      /** 状态||0:正常;1:停用; */
      status?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<WarnConfigListVO>;
    }
  }

  /** 分页查询告警配置列表 post /warnConfig/listByPage */
  function postWarnConfigListByPage(req: ET<PostWarnConfigListByPage.Req>, options?: object): Promise<ET<PostWarnConfigListByPage.Res>>;
}
export default API;
