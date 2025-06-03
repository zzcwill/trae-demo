// 该文件自动生成，请勿修改(除非知道自己在做什么)
/* eslint-disable */
declare namespace API {
  export type ET<T> = T extends object ? (T extends infer O ? { [K in keyof O]: ET<O[K]> } : never) : T;

  export module PostAgentBatchDeleteGroupRelation {
    export interface Req {
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 坐席id列表 */
      idList?: Array<number>;
      /** 组类型 */
      groupTypeList?: Array<string>;
      /** 电话组id列表 */
      incallGroupIdList?: Array<number>;
      /** 在线组id列表 */
      onlineGroupIdList?: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量删除坐席组接口 post /agent/batchDeleteGroupRelation */
  function postAgentBatchDeleteGroupRelation(req: ET<PostAgentBatchDeleteGroupRelation.Req>, options?: object): Promise<ET<PostAgentBatchDeleteGroupRelation.Res>>;

  export module PostAgentBatchSaveGroupRelation {
    export interface Req {
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 坐席id列表 */
      idList?: Array<number>;
      /** 组类型 */
      groupTypeList?: Array<string>;
      /** 电话组id列表 */
      incallGroupIdList?: Array<number>;
      /** 在线组id列表 */
      onlineGroupIdList?: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量新增坐席组接口 post /agent/batchSaveGroupRelation */
  function postAgentBatchSaveGroupRelation(req: ET<PostAgentBatchSaveGroupRelation.Req>, options?: object): Promise<ET<PostAgentBatchSaveGroupRelation.Res>>;

  export module PostAgentBatchUpdateGroupPriority {
    export type GroupPriorityRequest = {
      /** 组id */
      groupId?: number;
      /** 组优先级 */
      priority?: number;
    };

    export interface Req {
      /** 坐席id列表 */
      idList?: Array<number>;
      /** 组优先级列表 */
      groupPriorityList?: Array<GroupPriorityRequest>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量修改组优先级接口 post /agent/batchUpdateGroupPriority */
  function postAgentBatchUpdateGroupPriority(req: ET<PostAgentBatchUpdateGroupPriority.Req>, options?: object): Promise<ET<PostAgentBatchUpdateGroupPriority.Res>>;

  export module PostAgentBatchUpdateGroupRelation {
    export interface Req {
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 坐席id列表 */
      idList?: Array<number>;
      /** 组类型 */
      groupTypeList?: Array<string>;
      /** 电话组id列表 */
      incallGroupIdList?: Array<number>;
      /** 在线组id列表 */
      onlineGroupIdList?: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量修改坐席组接口 post /agent/batchUpdateGroupRelation */
  function postAgentBatchUpdateGroupRelation(req: ET<PostAgentBatchUpdateGroupRelation.Req>, options?: object): Promise<ET<PostAgentBatchUpdateGroupRelation.Res>>;

  export module PostAgentBatchUpdateMainGroup {
    export interface Req {
      /** 坐席id列表 */
      idList?: Array<number>;
      /** 组id */
      groupId?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量修改主要业务组接口 post /agent/batchUpdateMainGroup */
  function postAgentBatchUpdateMainGroup(req: ET<PostAgentBatchUpdateMainGroup.Req>, options?: object): Promise<ET<PostAgentBatchUpdateMainGroup.Res>>;

  export module PostAgentBatchUpdateMaxReception {
    export interface Req {
      /** 坐席id列表 */
      idList?: Array<number>;
      /** 接待上限 */
      maxReception?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量修改在线坐席接待上限接口 post /agent/batchUpdateMaxReception */
  function postAgentBatchUpdateMaxReception(req: ET<PostAgentBatchUpdateMaxReception.Req>, options?: object): Promise<ET<PostAgentBatchUpdateMaxReception.Res>>;

  export module GetAgentDetail {
    export type AgentDetailResponse = {
      /** 坐席id */
      id?: number;
      /** 坐席trueId，可以用来和员工账户中心关联 */
      trueId?: string;
      /** 坐席账号 */
      userId?: string;
      /** 坐席工号 */
      workId?: string;
      /** 坐席名称 */
      name?: string;
      /** 受理机构id */
      companyId?: string;
      /** 受理机构名称 */
      companyName?: string;
      /** 坐席类型||1:外包;2:众筹;3:自有一线;4:自有自助;5:大区/总部 */
      type?: string;
      /** 坐席类型名称||1:外包;2:众筹;3:自有一线;4:自有自助;5:大区/总部 */
      typeName?: string;
      /** 受理渠道，1：电话咨询，2：在线咨询 */
      acceptanceChannelList?: Array<string>;
      /** 状态，0：正常，1：注销-对应员工账户中心的注销 */
      status?: string;
      /** 来电配置信息 */
      incallConfig?: AgentIncallConfigDetailResponse;
      /** 在线配置信息 */
      onlineConfig?: AgentOnlineConfigDetailResponse;
    };
    export type AgentIncallConfigDetailResponse = {
      /** 主要业务组 */
      mainGroup?: GroupDetailBO;
      /** 值班职务 */
      onDutyPosition?: string;
      /** 录音标识，0：不录音，1：录音 */
      recordSoundFlag?: string;
      /** 岗位,1-坐席，2-班长席 */
      postList?: Array<string>;
      /** 坐席业务组id列表 */
      agentGroupList?: Array<GroupDetailBO>;
      /** 班长业务组id列表 */
      monitorGroupList?: Array<GroupDetailBO>;
    };
    export type AgentOnlineConfigDetailResponse = {
      /** 头像 */
      headImageUrl?: string;
      /** 昵称 */
      nickname?: string;
      /** 接待上限 */
      maxReception?: number;
      /** 自动分配 */
      autoAllocation?: string;
      /** 岗位 */
      postList?: Array<string>;
      /** 坐席业务组id列表 */
      agentGroupList?: Array<GroupDetailBO>;
      /** 班长业务组id列表 */
      monitorGroupList?: Array<GroupDetailBO>;
    };
    export type GroupDetailBO = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 重要性，0：重要业务组，1：次要业务组 */
      importance?: string;
      /** 组优先级 */
      priority?: number;
    };

    export interface Req {
      /** 坐席trueId */
      trueId: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: AgentDetailResponse;
    }
  }

  /** 根据坐席id查询坐席详情 get /agent/detail */
  function getAgentDetail(req: ET<GetAgentDetail.Req>, options?: object): Promise<ET<GetAgentDetail.Res>>;

  export module GetAgentList {
    export type PageResponseAgentListResponse = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<AgentListResponse>;
    };
    export type AgentListResponse = {
      /** 坐席id */
      id?: number;
      /** 坐席trueId，可以用来和员工账户中心关联 */
      trueId?: string;
      /** 坐席账号 */
      userId?: string;
      /** 坐席名称 */
      name?: string;
      /** 坐席工号 */
      workId?: string;
      /** 受理机构 */
      companyName?: string;
      /** 大区代码 */
      bigRegionCode?: string;
      /** 大区名称 */
      bigRegionName?: string;
      /** 经营中心代码 */
      businessCenterCode?: string;
      /** 经营中心名称 */
      businessCenterName?: string;
      /** 部门代码 */
      departCode?: string;
      /** 部门名称 */
      departName?: string;
      /** 状态，0：正常，1：注销-对应员工账户中心的注销 */
      status?: string;
      /** 状态名称 */
      statusName?: string;
      /** 来电配置信息 */
      incallConfig?: AgentIncallConfigDetailResponse;
      /** 在线配置信息 */
      onlineConfig?: AgentOnlineConfigDetailResponse;
    };
    export type AgentIncallConfigDetailResponse = {
      /** 主要业务组 */
      mainGroup?: GroupDetailBO;
      /** 值班职务 */
      onDutyPosition?: string;
      /** 录音标识，0：不录音，1：录音 */
      recordSoundFlag?: string;
      /** 岗位,1-坐席，2-班长席 */
      postList?: Array<string>;
      /** 坐席业务组id列表 */
      agentGroupList?: Array<GroupDetailBO>;
      /** 班长业务组id列表 */
      monitorGroupList?: Array<GroupDetailBO>;
    };
    export type AgentOnlineConfigDetailResponse = {
      /** 头像 */
      headImageUrl?: string;
      /** 昵称 */
      nickname?: string;
      /** 接待上限 */
      maxReception?: number;
      /** 自动分配 */
      autoAllocation?: string;
      /** 岗位 */
      postList?: Array<string>;
      /** 坐席业务组id列表 */
      agentGroupList?: Array<GroupDetailBO>;
      /** 班长业务组id列表 */
      monitorGroupList?: Array<GroupDetailBO>;
    };
    export type GroupDetailBO = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 重要性，0：重要业务组，1：次要业务组 */
      importance?: string;
      /** 组优先级 */
      priority?: number;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 排序条件 */
      sort?: any;
      /** 排序列表 */
      sortRuleList?: Array<string>;
      /** trueId列表 */
      trueIdList?: Array<string>;
      /** 机构id */
      companyId?: string;
      /** 大区组织机构代码列表 */
      regionOrgCodeList?: Array<string>;
      /** 电话业务组id */
      incallGroupId?: number;
      /** 在线业务组id */
      onlineGroupId?: number;
      /** 受理渠道：1-电话，2-在线，空-全部 */
      acceptanceChannel?: string;
      /** 岗位：1-坐席，2-班长席，空-全部 */
      post?: string;
      /** 坐席状态 */
      status?: string;
      /** 主要业务组id */
      mainGroupId?: number;
      /** 电话组优先级 */
      groupPriority?: number;
      /** 开始时间 */
      startDate?: string;
      /** 结束时间 */
      endDate?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageResponseAgentListResponse;
    }
  }

  /** 根据条件查询坐席列表 get /agent/list */
  function getAgentList(req: ET<GetAgentList.Req>, options?: object): Promise<ET<GetAgentList.Res>>;

  export module GetAgentListGroupRalation {
    export type OptionResponse = {
      /** ID */
      id?: string;
      /** 名称 */
      name?: string;
    };

    export interface Req {
      /** 坐席id列表 */
      idList?: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<OptionResponse>;
    }
  }

  /** 查询坐席电话组列表接口 get /agent/listGroupRalation */
  function getAgentListGroupRalation(req: ET<GetAgentListGroupRalation.Req>, options?: object): Promise<ET<GetAgentListGroupRalation.Res>>;

  export module GetAgentListGroupPriority {
    export type GroupPriorityResponse = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 组优先级 */
      priority?: number;
    };

    export interface Req {
      /** 坐席id */
      id: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<GroupPriorityResponse>;
    }
  }

  /** 根据坐席id 查询坐席所有来电组的优先级 get /agent/listGroupPriority */
  function getAgentListGroupPriority(req: ET<GetAgentListGroupPriority.Req>, options?: object): Promise<ET<GetAgentListGroupPriority.Res>>;

  export module GetAgentListMainGroup {
    export type OptionResponse = {
      /** ID */
      id?: string;
      /** 名称 */
      name?: string;
    };

    export interface Req {
      /** 坐席id列表 */
      idList?: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<OptionResponse>;
    }
  }

  /** 查询坐席的组关系中重要性为主要业务组的组列表 get /agent/listMainGroup */
  function getAgentListMainGroup(req: ET<GetAgentListMainGroup.Req>, options?: object): Promise<ET<GetAgentListMainGroup.Res>>;

  export module PostAgentUpdate {
    export type UpdateAgentOnlineConfigRequest = {
      /** 头像 */
      headImageUrl?: string;
      /** 昵称 */
      nickname?: string;
      /** 接待上限 */
      maxReception?: number;
      /** 自动分配 */
      autoAllocation?: string;
      /** 岗位 */
      postList?: Array<string>;
      /** 坐席业务组id列表 */
      agentGroupIdList?: Array<number>;
      /** 班长业务组id列表 */
      monitorGroupIdList?: Array<number>;
    };
    export type UpdateAgentIncallConfigRequest = {
      /** 主要业务组 */
      mainGroup?: number;
      /** 值班职务 */
      onDutyPosition?: string;
      /** 录音标识，0：不录音，1：录音 */
      recordSoundFlag?: string;
      /** 岗位,1-坐席，2-班长席 */
      postList?: Array<string>;
      /** 坐席业务组id列表 */
      agentGroupIdList?: Array<number>;
      /** 班长业务组id列表 */
      monitorGroupIdList?: Array<number>;
    };
    export type UpdateAgentResponse = {
      /** 坐席id */
      id?: number;
    };

    export interface Req {
      /** 坐席id */
      id?: number;
      /** 坐席trueId */
      trueId?: string;
      /** 坐席类型||1:外包;2:众筹;3:自有一线;4:自有自助;5:大区/总部 */
      type?: string;
      /** 受理渠道 */
      acceptanceChannelList?: Array<string>;
      /** 受理在线咨询相关的配置 */
      onlineConfig?: UpdateAgentOnlineConfigRequest;
      /** 受理来电咨询相关的配置 */
      incallConfig?: UpdateAgentIncallConfigRequest;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: UpdateAgentResponse;
    }
  }

  /** 修改坐席 post /agent/update */
  function postAgentUpdate(req: ET<PostAgentUpdate.Req>, options?: object): Promise<ET<PostAgentUpdate.Res>>;

  export module PostAgentUpdateGroupPriority {
    export type GroupPriorityRequest = {
      /** 组id */
      groupId?: number;
      /** 组优先级 */
      priority?: number;
    };

    export interface Req {
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 坐席id */
      id?: number;
      /** 组优先级列表项 */
      groupPriorityList?: Array<GroupPriorityRequest>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 设置坐席组优先级接口 post /agent/updateGroupPriority */
  function postAgentUpdateGroupPriority(req: ET<PostAgentUpdateGroupPriority.Req>, options?: object): Promise<ET<PostAgentUpdateGroupPriority.Res>>;

  export module PostBlackListBatchDelete {
    export interface Req {
      /** id列表 */
      idList?: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 修改黑名单记录 post /blackList/batchDelete */
  function postBlackListBatchDelete(req: ET<PostBlackListBatchDelete.Req>, options?: object): Promise<ET<PostBlackListBatchDelete.Res>>;

  export module GetBlackListList {
    export type PageResponseBlackListListResponse = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<BlackListListResponse>;
    };
    export type BlackListListResponse = {
      /** 主键id */
      id?: string;
      /** 电话号码 */
      telephone?: string;
      /** 创建时间(yyyy-MM-dd) */
      createTime?: string;
      /** 上榜原因 */
      reason?: string;
      /** 创建人 */
      creator?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 排序条件 */
      sort?: any;
      /** 排序列表 */
      sortRuleList?: Array<string>;
      /** 分子公司代码，默认查全部 */
      companyId?: number;
      /** 电话号码 */
      telephone?: string;
      /** 创建时间起(yyyy-MM-dd) */
      createTimeBegin?: string;
      /** 创建时间止(yyyy-MM-dd) */
      createTimeEnd?: string;
      /** 上榜原因 */
      reason?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageResponseBlackListListResponse;
    }
  }

  /** 查询黑名单记录列表 get /blackList/list */
  function getBlackListList(req: ET<GetBlackListList.Req>, options?: object): Promise<ET<GetBlackListList.Res>>;

  export module PostBlackListSave {
    export type IdResponse = {
      /** 业务ID */
      id?: number;
    };

    export interface Req {
      /** 电话号码 */
      telephone?: string;
      /** 上榜原因 */
      reason?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: IdResponse;
    }
  }

  /** 添加黑名单记录 post /blackList/save */
  function postBlackListSave(req: ET<PostBlackListSave.Req>, options?: object): Promise<ET<PostBlackListSave.Res>>;

  export module PostBlackListUpdate {
    export interface Req {
      /** 黑名单记录id */
      id?: number;
      /** 上榜原因 */
      reason?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 修改黑名单记录 post /blackList/update */
  function postBlackListUpdate(req: ET<PostBlackListUpdate.Req>, options?: object): Promise<ET<PostBlackListUpdate.Res>>;

  export module GetFileDownload {
    export interface Req {
      /** 文件在阿里云上的绝对路径 */
      path: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 文件下载 get /common/file/download */
  function getFileDownload(req: ET<GetFileDownload.Req>, options?: object): Promise<ET<GetFileDownload.Res>>;

  export module GetCommonGetSkillGroupList {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<DmEnumResponse>;
    }
  }

  /** 查询技能组列表 get /common/getSkillGroupList */
  function getCommonGetSkillGroupList(req?: ET<GetCommonGetSkillGroupList.Req>, options?: object): Promise<ET<GetCommonGetSkillGroupList.Res>>;

  export module GetCommonGetWorkGroupList {
    export type WorkGroupResponse = {
      /** 工作组ID */
      code?: string;
      /** 名称 */
      name?: string;
      /** 子组织机构 */
      children?: Array<WorkGroupResponse>;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<WorkGroupResponse>;
    }
  }

  /** 查询石家庄和扬州远程中心组织机构树 get /common/getWorkGroupList */
  function getCommonGetWorkGroupList(req?: ET<GetCommonGetWorkGroupList.Req>, options?: object): Promise<ET<GetCommonGetWorkGroupList.Res>>;

  export module GetCommonListGroup {
    export type SimpleGroupResponse = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 重要性 */
      importance?: string;
    };

    export interface Req {
      /** 类型 */
      type: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<SimpleGroupResponse>;
    }
  }

  /** 根据类型选取未停用的业务组列表 get /common/listGroup */
  function getCommonListGroup(req: ET<GetCommonListGroup.Req>, options?: object): Promise<ET<GetCommonListGroup.Res>>;

  export module GetCommonAreaList {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<DmEnumResponse>;
    }
  }

  /** 查询地区列表 get /common/areaList */
  function getCommonAreaList(req?: ET<GetCommonAreaList.Req>, options?: object): Promise<ET<GetCommonAreaList.Res>>;

  export module GetCommonOptions {
    export type OptionResultResponse = {
      /** 选项组 */
      options?: Array<OptionResponse>;
      /** 组名 */
      groupName?: string;
    };
    export type OptionResponse = {
      /** ID */
      id?: string;
      /** 名称 */
      name?: string;
    };

    export interface Req {
      /** 选项组名称，多个用英文逗号分隔 */
      groupNames: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<OptionResultResponse>;
    }
  }

  /** 批量获取枚举选项信息接口 get /common/options */
  function getCommonOptions(req: ET<GetCommonOptions.Req>, options?: object): Promise<ET<GetCommonOptions.Res>>;

  export module GetCommonReloadCache {
    export interface Req {
      /** 缓存类 */
      type: string;
    }
    export type Res = boolean;
  }

  /** 重新加载缓存 get /common/reloadCache */
  function getCommonReloadCache(req: ET<GetCommonReloadCache.Req>, options?: object): Promise<ET<GetCommonReloadCache.Res>>;

  export module PostUploadFile {
    export type UploadFileResponse = {
      /** 文件路径 */
      filePath?: string;
      /** 文件名称 */
      name?: string;
      /** 文件大小 */
      fileSize?: number;
    };

    export interface Req {
      /** 文件 */
      file: any;
      /** 文件类型（图片传：picture，邮件附件传：email） */
      type: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: UploadFileResponse;
    }
  }

  /** 上传文件 post /common/upload/file */
  function postUploadFile(req: ET<PostUploadFile.Req>, options?: object): Promise<ET<PostUploadFile.Res>>;

  export module PostContentDelete {
    export interface Req {
      /** 咨询事项id */
      id?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** post /consultMatter/content/delete */
  function postContentDelete(req: ET<PostContentDelete.Req>, options?: object): Promise<ET<PostContentDelete.Res>>;

  export module PostConsultMatterGroupDelete {
    export interface Req {
      /** 咨询事项id */
      id?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** post /consultMatter/group/delete */
  function postConsultMatterGroupDelete(req: ET<PostConsultMatterGroupDelete.Req>, options?: object): Promise<ET<PostConsultMatterGroupDelete.Res>>;

  export module PostPersonalDelete {
    export interface Req {
      /** 个人咨询事项id */
      id?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** post /consultMatter/personal/delete */
  function postPersonalDelete(req: ET<PostPersonalDelete.Req>, options?: object): Promise<ET<PostPersonalDelete.Res>>;

  export module GetGroupList {
    export type ConsultMatterGroupCompleteResponse = {
      /** 咨询事项分组id */
      id?: number;
      /** 分组名称 */
      groupName?: string;
      /** 地区列表 */
      areaList?: Array<DmEnumResponse>;
      /** 咨询事项列表 */
      consultMatterList?: Array<ConsultMatterContentResponse>;
      /** 来电技能组 */
      incallGroupsList?: Array<SkillGroupResponse>;
      /** 来电组是否显示: Y 是，N否 */
      isShowIncall?: string;
      /** 排序 */
      orderNum?: number;
    };
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };
    export type ConsultMatterContentResponse = {
      /** 咨询事项id */
      id?: number;
      /** 咨询事项内容 */
      content?: string;
      /** 咨询事项分组id */
      groupId?: number;
      /** 排序 */
      orderNum?: number;
    };
    export type SkillGroupResponse = {
      /** 技能组id */
      skillGroupId?: number;
      /** 技能组名称 */
      skillGroupName?: string;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<ConsultMatterGroupCompleteResponse>;
    }
  }

  /** get /consultMatter/group/list */
  function getGroupList(req?: ET<GetGroupList.Req>, options?: object): Promise<ET<GetGroupList.Res>>;

  export module GetPersonalList {
    export type PersonalConsultMatterContentResponse = {
      /** 个人咨询事项id */
      id?: number;
      /** 个人咨询事项 */
      content?: string;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<PersonalConsultMatterContentResponse>;
    }
  }

  /** get /consultMatter/personal/list */
  function getPersonalList(req?: ET<GetPersonalList.Req>, options?: object): Promise<ET<GetPersonalList.Res>>;

  export module PostContentSave {
    export type ConsultMatterContentSaveResponse = {
      /** 咨询事项id */
      id?: number;
    };

    export interface Req {
      /** 咨询事项内容 */
      content: string;
      /** 咨询事项分组id */
      groupId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: ConsultMatterContentSaveResponse;
    }
  }

  /** post /consultMatter/content/save */
  function postContentSave(req: ET<PostContentSave.Req>, options?: object): Promise<ET<PostContentSave.Res>>;

  export module PostConsultMatterGroupSave {
    export type ConsultMatterGroupSaveResponse = {
      /** 咨询事项分组id */
      id?: number;
    };

    export interface Req {
      /** 咨询事项分组名称 */
      groupName: string;
      /** 咨询事项分组地区列表 */
      areaCodeList?: Array<string>;
      /** 来电业务组的id列表 */
      incallGroupIdList?: Array<number>;
      /** 来电组是否显示: Y 是，N否 */
      isShowIncall?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: ConsultMatterGroupSaveResponse;
    }
  }

  /** post /consultMatter/group/save */
  function postConsultMatterGroupSave(req: ET<PostConsultMatterGroupSave.Req>, options?: object): Promise<ET<PostConsultMatterGroupSave.Res>>;

  export module PostContentUpdate {
    export interface Req {
      /** 咨询事项id */
      id: number;
      /** 咨询事项内容 */
      content: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** post /consultMatter/content/update */
  function postContentUpdate(req: ET<PostContentUpdate.Req>, options?: object): Promise<ET<PostContentUpdate.Res>>;

  export module PostConsultMatterGroupUpdate {
    export interface Req {
      /** 咨询事项分组id */
      id?: number;
      /** 咨询事项分组名称 */
      groupName?: string;
      /** 咨询事项分组地区列表 */
      areaCodeList?: Array<string>;
      /** 来电业务组的id列表 */
      incallGroupIdList?: Array<number>;
      /** 来电组是否显示: Y 是，N否 */
      isShowIncall?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** post /consultMatter/group/update */
  function postConsultMatterGroupUpdate(req: ET<PostConsultMatterGroupUpdate.Req>, options?: object): Promise<ET<PostConsultMatterGroupUpdate.Res>>;

  export module PostTemplateDelete {
    export interface Req {
      /** 业务ID */
      id?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 删除邮件模板 post /email/template/delete */
  function postTemplateDelete(req: ET<PostTemplateDelete.Req>, options?: object): Promise<ET<PostTemplateDelete.Res>>;

  export module GetTemplateDetail {
    export type EmailTemplateDetailResponse = {
      /** 邮件模板ID */
      id?: number;
      /** 邮件模板名称 */
      templateName?: string;
      /** 地区代码列表 */
      areaCodeList?: Array<string>;
      /** 地区名称列表 */
      areaCodeNameList?: Array<string>;
      /** 邮件类型编码 */
      emailTypeCode?: string;
      /** 邮件类型名称 */
      emailTypeName?: string;
      /** 模板正文 */
      emailContent?: string;
      /** 附件列表 */
      attachmentList?: Array<AttachmentResponse>;
    };
    export type AttachmentResponse = {
      /** 主键ID */
      id?: number;
      /** 附件名称 */
      name?: string;
      /** 附件路径 */
      filePath?: string;
      /** 附件大小 */
      fileSize?: string;
    };

    export interface Req {
      /** 模板ID */
      id: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: EmailTemplateDetailResponse;
    }
  }

  /** 查询邮件模板详情 get /email/template/detail */
  function getTemplateDetail(req: ET<GetTemplateDetail.Req>, options?: object): Promise<ET<GetTemplateDetail.Res>>;

  export module GetTemplateList {
    export type PageResponseEmailTemplateSimpleResponse = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<EmailTemplateSimpleResponse>;
    };
    export type EmailTemplateSimpleResponse = {
      /** 邮件模板ID */
      id?: number;
      /** 邮件模板名称 */
      templateName?: string;
      /** 地区代码 */
      areaCodeList?: Array<string>;
      /** 地区名称 */
      areaCodeNameList?: Array<string>;
      /** 邮件类型编码 */
      emailTypeCode?: string;
      /** 邮件类型名称 */
      emailTypeName?: string;
      /** 附件列表 */
      attachmentList?: Array<AttachmentResponse>;
    };
    export type AttachmentResponse = {
      /** 主键ID */
      id?: number;
      /** 附件名称 */
      name?: string;
      /** 附件路径 */
      filePath?: string;
      /** 附件大小 */
      fileSize?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 排序条件 */
      sort?: any;
      /** 排序列表 */
      sortRuleList?: Array<string>;
      /** 地区代码 */
      areaCode?: string;
      /** 邮件类型编码 */
      emailTypeCode?: string;
      /** 邮件模板名称（模糊查询） */
      templateName?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageResponseEmailTemplateSimpleResponse;
    }
  }

  /** 分页查询邮件模板列表 get /email/template/list */
  function getTemplateList(req: ET<GetTemplateList.Req>, options?: object): Promise<ET<GetTemplateList.Res>>;

  export module PostTemplateSave {
    export type AttachmentRequest = {
      /** 附件名称 */
      name?: string;
      /** 附件路径 */
      filePath?: string;
      /** 附件大小 */
      fileSize?: string;
    };
    export type IdResponse = {
      /** 业务ID */
      id?: number;
    };

    export interface Req {
      /** 邮件模板ID */
      id?: number;
      /** 地区代码列表 */
      areaCodeList?: Array<string>;
      /** 邮件类型编码 */
      emailTypeCode?: string;
      /** 邮件模板名称 */
      templateName?: string;
      /** 模板正文 */
      content?: string;
      /** 附件列表 */
      attachmentList?: Array<AttachmentRequest>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: IdResponse;
    }
  }

  /** 新增邮件模板 post /email/template/save */
  function postTemplateSave(req: ET<PostTemplateSave.Req>, options?: object): Promise<ET<PostTemplateSave.Res>>;

  export module PostTemplateUpdate {
    export type AttachmentRequest = {
      /** 附件名称 */
      name?: string;
      /** 附件路径 */
      filePath?: string;
      /** 附件大小 */
      fileSize?: string;
    };

    export interface Req {
      /** 邮件模板ID */
      id?: number;
      /** 地区代码列表 */
      areaCodeList?: Array<string>;
      /** 邮件类型编码 */
      emailTypeCode?: string;
      /** 邮件模板名称 */
      templateName?: string;
      /** 模板正文 */
      content?: string;
      /** 附件列表 */
      attachmentList?: Array<AttachmentRequest>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 更新邮件模板 post /email/template/update */
  function postTemplateUpdate(req: ET<PostTemplateUpdate.Req>, options?: object): Promise<ET<PostTemplateUpdate.Res>>;

  export module PostExtNumberBatchDelete {
    export interface Req {
      /** id列表 */
      idList?: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 修改分机 post /extNumber/batchDelete */
  function postExtNumberBatchDelete(req: ET<PostExtNumberBatchDelete.Req>, options?: object): Promise<ET<PostExtNumberBatchDelete.Res>>;

  export module GetExtNumberList {
    export type PageResponseExtNumberListResponse = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ExtNumberListResponse>;
    };
    export type ExtNumberListResponse = {
      /** 黑名单id */
      id?: string;
      /** 分子公司代码 */
      companyId?: string;
      /** 电话号码 */
      telephone?: string;
      /** 电话类型 */
      type?: string;
      /** 电话类型名称（0：固定电话；1：移动电话） */
      typeName?: string;
      /** 绑定状态 */
      bindState?: string;
      /** 绑定状态名称（0：未绑定；1：坐席绑定；2：班长绑定） */
      bindStateName?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 排序条件 */
      sort?: any;
      /** 排序列表 */
      sortRuleList?: Array<string>;
      /** 电话号码 */
      telephone?: string;
      /** 电话类型（0：固定电话；1：移动电话） */
      type?: number;
      /** 绑定状态（0：未绑定；1：坐席绑定；2：班长绑定） */
      bindState?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageResponseExtNumberListResponse;
    }
  }

  /** 查询分机列表 get /extNumber/list */
  function getExtNumberList(req: ET<GetExtNumberList.Req>, options?: object): Promise<ET<GetExtNumberList.Res>>;

  export module PostExtNumberSave {
    export type IdResponse = {
      /** 业务ID */
      id?: number;
    };

    export interface Req {
      /** 电话号码 */
      telephone?: string;
      /** 电话类型（0：固定电话；1：移动电话） */
      type?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: IdResponse;
    }
  }

  /** 添加分机 post /extNumber/save */
  function postExtNumberSave(req: ET<PostExtNumberSave.Req>, options?: object): Promise<ET<PostExtNumberSave.Res>>;

  export module PostExtNumberUpdate {
    export interface Req {
      /** 分机id */
      id?: number;
      /** 电话类型（0：固定电话；1：移动电话） */
      type?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 修改分机 post /extNumber/update */
  function postExtNumberUpdate(req: ET<PostExtNumberUpdate.Req>, options?: object): Promise<ET<PostExtNumberUpdate.Res>>;

  export module PostGroupDelete {
    export interface Req {
      /** 组id */
      id?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 组管理删除接口 post /group/delete */
  function postGroupDelete(req: ET<PostGroupDelete.Req>, options?: object): Promise<ET<PostGroupDelete.Res>>;

  export module PostGroupEnable {
    export interface Req {
      /** 组id */
      id?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 组管理启用接口 post /group/enable */
  function postGroupEnable(req: ET<PostGroupEnable.Req>, options?: object): Promise<ET<PostGroupEnable.Res>>;

  export module GetIncallDetail {
    export type IncallGroupDetailResponse = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 受理机构 */
      companyId?: string;
      /** 地区id */
      areaId?: string;
      /** 是否投诉组 */
      complaintGroupFlag?: string;
      /** 重要性 */
      importance?: string;
      /** 允许排队长度 */
      maxQueueSize?: number;
      /** 成员分配策略 */
      allocationStrategy?: string;
      /** 排队满时处理 */
      fullQueueStrategy?: string;
      /** 备用组列表 */
      assistGroupList?: Array<AssistGroup>;
      /** 繁忙阈值开关，0：不启用，1：启用 */
      busyThresholdSwitch?: string;
      /** 繁忙阈值 */
      busyThreshold?: number;
      /** 代客排队开关 0：不启用，1：启用' */
      helpQueueSwitch?: string;
      /** 代客排队启用值 */
      helpQueueStartNum?: number;
      /** 代客排队最大值 */
      helpQueueMaxNum?: number;
      /** 代客排队通知值 */
      helpQueueNotifyNum?: number;
      /** 来电组类型code。00:国税操作组；01:个税操作组; 02:财税实务组;03:财税专家组; */
      groupType?: string;
      /** 告警开关 0:不启用  1:启用 */
      alertSwitch?: string;
      /** 经营中心代码 */
      businessCenterCode?: string;
      /** 经营中心名称 */
      businessCenterName?: string;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:记账咨询;03:财税专家组;04:BC联动;05:人资实务咨询 */
      consultBusinessType?: string;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:记账咨询;03:财税专家组;04:BC联动;05:人资实务咨询 */
      consultBusinessTypeName?: string;
      /** 会员类型||1:买断（接通率）;2:买断（人数）;3:VIP;4:非VIP */
      memberType?: string;
      /** 会员类型||1:买断（接通率）;2:买断（人数）;3:VIP;4:非VIP */
      memberTypeName?: string;
      /** 产品大类||01:国税;02:个税;03:记账;04:代账;05:出口退税;06:财税;07:其他 */
      productCategory?: string;
      /** 产品大类||01:国税;02:个税;03:记账;04:代账;05:出口退税;06:财税;07:其他 */
      productCategoryName?: string;
      /** 场景 */
      scene?: Array<string>;
      /** 备注 */
      remark?: string;
      /** 组接通率下限阈值 */
      groupCallCompletingRateLowerThreshold?: string;
      /** 组接通率上限阈值 */
      groupCallCompletingRateUpperThreshold?: string;
    };
    export type AssistGroup = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
    };

    export interface Req {
      id: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: IncallGroupDetailResponse;
    }
  }

  /** 查询电话组详情接口 get /group/incall/detail */
  function getIncallDetail(req: ET<GetIncallDetail.Req>, options?: object): Promise<ET<GetIncallDetail.Res>>;

  export module GetIncallList {
    export type PageResponseIncallGroupListResponse = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<IncallGroupListResponse>;
    };
    export type IncallGroupListResponse = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 成员数 */
      memberCount?: number;
      /** 成员分配策略 */
      allocationStrategyName?: string;
      /** 允许排队长度 */
      maxQueueSize?: number;
      /** 排队满时处理 */
      fullQueueStrategyName?: string;
      /** 繁忙阈值 */
      busyThreshold?: number;
      /** 代客排队 */
      helpQueueSwitchName?: string;
      /** 受理机构 */
      companyName?: string;
      /** 状态 */
      status?: string;
      /** 状态名称 */
      statusName?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 排序条件 */
      sort?: any;
      /** 排序列表 */
      sortRuleList?: Array<string>;
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 队列满时处理策略 */
      fullQueueStrategy?: string;
      /** 成员分配策略 */
      allocationStrategy?: string;
      /** 组状态 */
      status?: string;
      /** 所属地区id */
      areaId?: string;
      /** 受理机构id */
      companyId?: string;
      /** 受理机构代码列表 */
      bigRegionCodeList?: Array<string>;
      /** 经营中心代码 */
      businessCenterCode?: string;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询 */
      consultBusinessType?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageResponseIncallGroupListResponse;
    }
  }

  /** 查询电话组列表接口 get /group/incall/list */
  function getIncallList(req: ET<GetIncallList.Req>, options?: object): Promise<ET<GetIncallList.Res>>;

  export module GetOnlineDetail {
    export type OnlineGroupDetailResponse = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 受理机构 */
      companyId?: string;
      /** 地区id */
      areaId?: string;
      /** 告警开关 0:不启用  1:启用 */
      alertSwitch?: string;
      /** 辅助组列表 */
      assistGroupList?: Array<AssistGroup>;
      /** 经营中心代码 */
      businessCenterCode?: string;
      /** 经营中心名称 */
      businessCenterName?: string;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:记账咨询;03:财税专家组;04:BC联动;05:人资实务咨询 */
      consultBusinessType?: string;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:记账咨询;03:财税专家组;04:BC联动;05:人资实务咨询 */
      consultBusinessTypeName?: string;
      /** 会员类型||1:买断（接通率）;2:买断（人数）;3:VIP;4:非VIP */
      memberType?: string;
      /** 会员类型||1:买断（接通率）;2:买断（人数）;3:VIP;4:非VIP */
      memberTypeName?: string;
      /** 产品大类||01:国税;02:个税;03:记账;04:代账;05:出口退税;06:财税;07:其他 */
      productCategory?: string;
      /** 产品大类||01:国税;02:个税;03:记账;04:代账;05:出口退税;06:财税;07:其他 */
      productCategoryName?: string;
      /** 场景 */
      scene?: Array<string>;
      /** 备注 */
      remark?: string;
      /** 组接通率下限阈值 */
      groupCallCompletingRateLowerThreshold?: string;
      /** 组接通率上限阈值 */
      groupCallCompletingRateUpperThreshold?: string;
    };
    export type AssistGroup = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
    };

    export interface Req {
      id: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: OnlineGroupDetailResponse;
    }
  }

  /** 查询在线组详情接口 get /group/online/detail */
  function getOnlineDetail(req: ET<GetOnlineDetail.Req>, options?: object): Promise<ET<GetOnlineDetail.Res>>;

  export module GetOnlineList {
    export type PageResponseOnlineGroupListResponse = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<OnlineGroupListResponse>;
    };
    export type OnlineGroupListResponse = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 成员数 */
      memberCount?: number;
      /** 备用组列表 */
      assistGroupList?: Array<AssistGroup>;
      /** 状态 */
      status?: string;
      /** 状态名称 */
      statusName?: string;
    };
    export type AssistGroup = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 排序条件 */
      sort?: any;
      /** 排序列表 */
      sortRuleList?: Array<string>;
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 组状态 */
      status?: string;
      /** 所属地区id */
      areaId?: string;
      /** 受理机构id */
      companyId?: string;
      /** 受理机构代码列表 */
      bigRegionCodeList?: Array<string>;
      /** 经营中心代码 */
      businessCenterCode?: string;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询 */
      consultBusinessType?: string;
      /** 产品大类||01:国税;02:个税;03:记账;04:代账;05:出口退税;06:财税;07:其他 */
      productCategory?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageResponseOnlineGroupListResponse;
    }
  }

  /** 查询在线组列表接口 get /group/online/list */
  function getOnlineList(req: ET<GetOnlineList.Req>, options?: object): Promise<ET<GetOnlineList.Res>>;

  export module PostGroupSave {
    export type GroupIncallConfigBO = {
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 自增主键 */
      id?: number;
      /** 组id */
      groupId?: number;
      /** 重要性，0：重要业务组，1：次要业务组 */
      importance?: string;
      /** 投诉组标识，0：非投诉组，1：投诉组 */
      complaintGroupFlag?: string;
      /** 成员分配策略 */
      allocationStrategy?: string;
      /** 允许排队长度 */
      maxQueueSize?: number;
      /** 排队满时处理策略，0：提示后挂断，1：转接至备用组 */
      fullQueueStrategy?: string;
      /** 备用组id列表 */
      assistGroupIdList?: Array<number>;
      /** 繁忙阈值开关，0：不启用，1：启用 */
      busyThresholdSwitch?: string;
      /** 繁忙阈值 */
      busyThreshold?: number;
      /** 代客排队开关 0：不启用，1：启用' */
      helpQueueSwitch?: string;
      /** 代客排队启用值 */
      helpQueueStartNum?: number;
      /** 代客排队最大值 */
      helpQueueMaxNum?: number;
      /** 代客排队通知值 */
      helpQueueNotifyNum?: number;
      /** 来电组类型code。00:国税操作组；01:个税操作组; 02:财税实务组;03:财税专家组; */
      groupType?: string;
    };
    export type GroupOnlineConfigBO = {
      /** 在线组id列表 */
      assistGroupIdList?: Array<number>;
    };
    export type GroupIdResponse = {
      /** 组id */
      id?: number;
    };

    export interface Req {
      /** 组id */
      id?: number;
      /** 组类型 */
      type?: string;
      /** 组名称 */
      name?: string;
      /** 受理机构id */
      companyId?: string;
      /** 受理部门id */
      departId?: string;
      /** 地区id */
      areaId?: string;
      /** 告警开关 0:不启用  1:启用 */
      alertSwitch?: string;
      /** 场景 */
      scene?: Array<string>;
      /** 备注 */
      remark?: string;
      /** 来电配置信息结构 */
      incallConfig?: GroupIncallConfigBO;
      /** 在线配置信息结构 */
      onlineConfig?: GroupOnlineConfigBO;
      /** 经营中心代码 */
      businessCenterCode: string;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询 */
      consultBusinessType: string;
      /** 会员类型||01:买断（接通率）;02:买断（人数）;03:VIP;04:非VIP */
      memberType: string;
      /** 产品大类||01:国税;02:个税;03:记账;04:代账;05:出口退税;06:财税;07:其他 */
      productCategory: string;
      /** 组接通率下限阈值 */
      groupCallCompletingRateLowerThreshold?: string;
      /** 组接通率上限阈值 */
      groupCallCompletingRateUpperThreshold?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: GroupIdResponse;
    }
  }

  /** 组管理新增接口 post /group/save */
  function postGroupSave(req: ET<PostGroupSave.Req>, options?: object): Promise<ET<PostGroupSave.Res>>;

  export module PostGroupUpdate {
    export type GroupIncallConfigBO = {
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 自增主键 */
      id?: number;
      /** 组id */
      groupId?: number;
      /** 重要性，0：重要业务组，1：次要业务组 */
      importance?: string;
      /** 投诉组标识，0：非投诉组，1：投诉组 */
      complaintGroupFlag?: string;
      /** 成员分配策略 */
      allocationStrategy?: string;
      /** 允许排队长度 */
      maxQueueSize?: number;
      /** 排队满时处理策略，0：提示后挂断，1：转接至备用组 */
      fullQueueStrategy?: string;
      /** 备用组id列表 */
      assistGroupIdList?: Array<number>;
      /** 繁忙阈值开关，0：不启用，1：启用 */
      busyThresholdSwitch?: string;
      /** 繁忙阈值 */
      busyThreshold?: number;
      /** 代客排队开关 0：不启用，1：启用' */
      helpQueueSwitch?: string;
      /** 代客排队启用值 */
      helpQueueStartNum?: number;
      /** 代客排队最大值 */
      helpQueueMaxNum?: number;
      /** 代客排队通知值 */
      helpQueueNotifyNum?: number;
      /** 来电组类型code。00:国税操作组；01:个税操作组; 02:财税实务组;03:财税专家组; */
      groupType?: string;
    };
    export type GroupOnlineConfigBO = {
      /** 在线组id列表 */
      assistGroupIdList?: Array<number>;
    };

    export interface Req {
      /** 组id */
      id?: number;
      /** 组类型 */
      type?: string;
      /** 组名称 */
      name?: string;
      /** 受理机构id */
      companyId?: string;
      /** 受理部门id */
      departId?: string;
      /** 地区id */
      areaId?: string;
      /** 告警开关 0:不启用  1:启用 */
      alertSwitch?: string;
      /** 场景 */
      scene?: Array<string>;
      /** 备注 */
      remark?: string;
      /** 来电配置信息结构 */
      incallConfig?: GroupIncallConfigBO;
      /** 在线配置信息结构 */
      onlineConfig?: GroupOnlineConfigBO;
      /** 经营中心代码 */
      businessCenterCode: string;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询 */
      consultBusinessType: string;
      /** 会员类型||01:买断（接通率）;02:买断（人数）;03:VIP;04:非VIP */
      memberType: string;
      /** 产品大类||01:国税;02:个税;03:记账;04:代账;05:出口退税;06:财税;07:其他 */
      productCategory: string;
      /** 组接通率下限阈值 */
      groupCallCompletingRateLowerThreshold?: string;
      /** 组接通率上限阈值 */
      groupCallCompletingRateUpperThreshold?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 组管理修改接口 post /group/update */
  function postGroupUpdate(req: ET<PostGroupUpdate.Req>, options?: object): Promise<ET<PostGroupUpdate.Res>>;

  export module PostInternalDataDelete {
    export interface Req {
      /** 内部资料id */
      id?: number;
    }
    export type Res = boolean;
  }

  /** 删除内部资料 post /internalData/delete */
  function postInternalDataDelete(req: ET<PostInternalDataDelete.Req>, options?: object): Promise<ET<PostInternalDataDelete.Res>>;

  export module GetInternalDataDetail {
    export type InternalDataDepartResponse = {
      /** 适用机构id */
      id?: string;
      /** 适用机构名称 */
      name?: string;
    };

    export interface Req {
      id: number;
    }
    export interface Res {
      /** 资料id */
      id?: number;
      /** 资料类别 */
      type?: string;
      /** 发布方式 */
      publishType?: string;
      /** 发布时间 */
      publishTime?: string;
      /** 适用机构列表 */
      departList?: Array<InternalDataDepartResponse>;
      /** 资料标题 */
      title?: string;
      /** 资料内容 */
      content?: string;
    }
  }

  /** get /internalData/detail */
  function getInternalDataDetail(req: ET<GetInternalDataDetail.Req>, options?: object): Promise<ET<GetInternalDataDetail.Res>>;

  export module GetInternalDataList {
    export type T = {
      /** 资料id */
      id?: string;
      /** 资料类别名称 */
      type?: string;
      /** 资料标题 */
      title?: string;
      /** 创建人 */
      publisherName?: string;
      /** 发布时间 */
      publishTime?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: any;
      /** 资料类型，01：价格政策及定义，02：协作规则，03：技能组信息，04：培训计划 */
      type?: string;
      /** 发布时间起 */
      publishTimeBegin?: string;
      /** 发布时间止 */
      publishTimeEnd?: string;
      /** 仅查询自己发布的，true：只查自己发布的，false：查所有，默认false */
      selfPublish?: boolean;
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

  /** get /internalData/list */
  function getInternalDataList(req: ET<GetInternalDataList.Req>, options?: object): Promise<ET<GetInternalDataList.Res>>;

  export module PostInternalDataSave {
    export interface Req {
      /** 资料类型，可通过枚举列表接口groupName=INTERNAL_DATA_TYPE获取到 */
      type?: string;
      /** 发布方式，0：立即发布，1：定时发布 */
      publishType?: string;
      /** 发布时间，发布方式为定时发布时必填 */
      publishTime?: string;
      /** 适用机构id列表 */
      departIdList?: Array<string>;
      /** 资料标题 */
      title?: string;
      /** 资料内容 */
      content?: string;
    }
    export interface Res {
      /** 内部资料id */
      id?: number;
    }
  }

  /** 新增内部资料 post /internalData/save */
  function postInternalDataSave(req: ET<PostInternalDataSave.Req>, options?: object): Promise<ET<PostInternalDataSave.Res>>;

  export module GetCallGetOperatorCallDetail {
    export type AggregateOperatorDataBO = {
      /** 坐席通话监控汇总数据 */
      summarizedData?: SummarizedOperatorData;
      /** 坐席通话监控信息列表 */
      monitorInfoList?: Array<SingleOperatorData>;
    };
    export type SummarizedOperatorData = {
      /** 登录数 */
      onlineNum?: number;
      /** 实时振铃数 */
      offlineNum?: number;
      /** 实时通话数 */
      unCallNum?: number;
      /** 实时总呼入数 */
      onCallNum?: number;
      /** 示忙数 */
      busyNum?: number;
      /** 话后处理数 */
      afterCallNum?: number;
      /** 外呼数 */
      outCallNum?: number;
      /** 就绪数 */
      freeNum?: number;
      /** 考试数 */
      examingNum?: number;
      /** 培训数 */
      trainingNum?: number;
      /** 休息数 */
      leaveNum?: number;
      /** 通话中受理数 */
      inSpeakingNum?: number;
      /** 通话中呼出数 */
      outSpeakingNum?: number;
    };
    export type SingleOperatorData = {
      /** 单个坐席通话监控基本信息 */
      baseInfo?: SingleOperatorBaseInfo;
      /** 单个坐席通话监控的今日累计信息 */
      todayStatistics?: SingleOperatorTodayStatisticsInfo;
    };
    export type SingleOperatorBaseInfo = {
      /** 工号 */
      jobNumber?: string;
      /** 姓名 */
      username?: string;
      /** 工作组 */
      workGroup?: string;
      /** 部门名称 */
      departmentName?: string;
      /** cti状态 */
      ctiStatus?: string;
      /** 技能组 */
      skillGroup?: string;
    };
    export type SingleOperatorTodayStatisticsInfo = {
      /** 在岗时长 */
      dutyTime?: string;
      /** 话后处理累计时长 */
      afterCallTotalTime?: string;
      /** 话后处理平均时长 */
      afterCallAverageTime?: string;
      /** 呼入受理累计时长 */
      inCallTime?: string;
      /** 呼入受理次数 */
      inCallNum?: number;
      /** 外呼情况累计时长 */
      outCallTime?: string;
      /** 外呼情况次数 */
      outCallNum?: number;
      /** 休息时长 */
      leaveTime?: string;
    };

    export interface Req {
      /** 表示是否需要下方的坐席列表数据 */
      showFlag?: boolean;
      /** 工作组 */
      workGroup?: Array<string>;
      /** 部门列表 */
      departments?: Array<string>;
      /** 技能组 */
      skillGroup?: Array<number>;
      /** 工号或姓名 */
      keyword?: string;
      /** 登陆状态 */
      loginState?: string;
      /** 呼叫状态 */
      callState?: string;
      /** cti状态 */
      ctiState?: string;
      /** 是否通话中 */
      onCallState?: boolean;
      /** 权限ID */
      trueId?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: AggregateOperatorDataBO;
    }
  }

  /** 查询坐席电话监控信息 get /monitor/call/getOperatorCallDetail */
  function getCallGetOperatorCallDetail(req: ET<GetCallGetOperatorCallDetail.Req>, options?: object): Promise<ET<GetCallGetOperatorCallDetail.Res>>;

  export module GetCallGetSkillGroupResourceDetail {
    export type SummarizedGroupData = {
      /** 实时排队数 */
      queuingNum?: number;
      /** 实时振铃数 */
      ringingNum?: number;
      /** 实时通话数 */
      callingNum?: number;
      /** 实时总呼入数 */
      totalNum?: number;
    };
    export type SingleGroupData = {
      /** 技能组资源监控基本信息 */
      baseInfo?: SingleGroupBaseInfo;
      /** 单个技能组资源的实时统计信息 */
      realTimeStatistics?: SingleGroupRealTimeStatisticsInfo;
      /** 单个技能组资源的今日累计信息 */
      todayStatistics?: SingleGroupTodayStatisticsInfo;
    };
    export type SingleGroupBaseInfo = {
      /** 技能组ID */
      skillGroupId?: string;
      /** 技能组名称 */
      skillGroupName?: string;
      /** 繁忙阈值 */
      busyThreshold?: number;
    };
    export type SingleGroupRealTimeStatisticsInfo = {
      /** 今日累计呼入总数 */
      totalNum?: number;
      /** 实时排队数 */
      queuingNum?: number;
      /** 实时振铃数 */
      ringingNum?: number;
      /** 实时通话数 */
      callingNum?: number;
      /** 实时排队资源占比，带% */
      queuingResourceRatio?: string;
      /** 实时最长等待时长 */
      maxWaitingTime?: string;
    };
    export type SingleGroupTodayStatisticsInfo = {
      /** 今日累计呼入总数 */
      totalNum?: number;
      /** 今日累计接通总数 */
      successNum?: number;
      /** 今日累计放弃总数 */
      failNum?: number;
      /** 今日累计接通率，带% */
      connectRatio?: string;
    };

    export type Req = any;
    export interface Res {
      /** 组资源实时汇总数据 */
      summarizedData?: SummarizedGroupData;
      /** 技能组资源信息列表 */
      monitorInfoList?: Array<SingleGroupData>;
    }
  }

  /** 查询组资源监控信息 get /monitor/call/getSkillGroupResourceDetail */
  function getCallGetSkillGroupResourceDetail(req?: ET<GetCallGetSkillGroupResourceDetail.Req>, options?: object): Promise<ET<GetCallGetSkillGroupResourceDetail.Res>>;

  export module GetOrgCompanyList {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<DmEnumResponse>;
    }
  }

  /** 查询分公司列表（邮件管理） get /org/companyList */
  function getOrgCompanyList(req?: ET<GetOrgCompanyList.Req>, options?: object): Promise<ET<GetOrgCompanyList.Res>>;

  export module GetOrgDepartmentList {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export interface Req {
      /** 分子公司代码前缀 */
      companyId: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<DmEnumResponse>;
    }
  }

  /** 查询分子公司部门列表接口 get /org/departmentList */
  function getOrgDepartmentList(req: ET<GetOrgDepartmentList.Req>, options?: object): Promise<ET<GetOrgDepartmentList.Res>>;

  export module GetOrgTree {
    export type TreeResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
      /** 子节点集合 */
      childrens?: Array<TreeResponse>;
    };

    export type Req = any;
    export type Res = Array<TreeResponse>;
  }

  /** 组织机构树（内部资料管理用） get /org/tree */
  function getOrgTree(req?: ET<GetOrgTree.Req>, options?: object): Promise<ET<GetOrgTree.Res>>;

  export module PostSpecialDayBatchDelete {
    export interface Req {
      /** 主键id列表 */
      idList?: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量删除特殊日 post /specialDay/batchDelete */
  function postSpecialDayBatchDelete(req: ET<PostSpecialDayBatchDelete.Req>, options?: object): Promise<ET<PostSpecialDayBatchDelete.Res>>;

  export module PostSpecialDayBatchUpdate {
    export type WorkTimeRequest = {
      /** 上班开始时间,格式：HH:mm */
      beginTime?: string;
      /** 上班结束时间,格式：HH:mm */
      endTime?: string;
    };

    export interface Req {
      /** 组类型：1-电话组，2-在线组 */
      type?: string;
      /** id列表 */
      idList?: Array<number>;
      /** 是否上班 0-是,1-否 */
      workFlag?: string;
      /** 上班起止时间 */
      workTime?: Array<WorkTimeRequest>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量修改特殊日 post /specialDay/batchUpdate */
  function postSpecialDayBatchUpdate(req: ET<PostSpecialDayBatchUpdate.Req>, options?: object): Promise<ET<PostSpecialDayBatchUpdate.Res>>;

  export module GetSpecialDayList {
    export type T = {
      /** id */
      id?: number;
      /** 业务组id */
      groupId?: number;
      /** 业务组名称 */
      groupName?: string;
      /** 业务组类型,1-电话组,2-在线组 */
      type?: string;
      /** 特殊日 */
      specialDay?: string;
      /** 是否上班，0上班，1不上班 */
      workFlag?: string;
      /** 上班时间 */
      workTime?: Array<WorkTimeResponse>;
    };
    export type WorkTimeResponse = {
      /** 上班开始时间,格式：HH:mm */
      beginTime?: string;
      /** 上班结束时间,格式：HH:mm */
      endTime?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: any;
      /** 组类型，1电话组，2在线组 */
      type?: string;
      /** 业务组id列表 */
      groupIdList?: Array<number>;
      /** 最后修改人是我，1是，0不是 */
      lastModifierFlag?: string;
      /** 业务组所属机构代码 */
      companyId?: string;
      /** 业务组所属部门代码 */
      departId?: string;
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

  /** 查询特殊日列表 get /specialDay/list */
  function getSpecialDayList(req: ET<GetSpecialDayList.Req>, options?: object): Promise<ET<GetSpecialDayList.Res>>;

  export module PostSpecialDaySave {
    export type SpecialDateRequest = {
      /** 特殊日开始日 */
      beginDay?: string;
      /** 特殊日结束日 */
      endDay?: string;
      /** 是否上班，0上班，1不上班 */
      workFlag?: string;
      /** 上班起止时间 */
      workTime?: Array<WorkTimeRequest>;
    };
    export type WorkTimeRequest = {
      /** 上班开始时间,格式：HH:mm */
      beginTime?: string;
      /** 上班结束时间,格式：HH:mm */
      endTime?: string;
    };

    export interface Req {
      /** 组类型：1-电话组，2-在线组 */
      type?: string;
      /** 业务组id列表 */
      groupIdList?: Array<number>;
      /** 特殊日期 */
      specialDate?: Array<SpecialDateRequest>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 新增特殊日 post /specialDay/save */
  function postSpecialDaySave(req: ET<PostSpecialDaySave.Req>, options?: object): Promise<ET<PostSpecialDaySave.Res>>;

  export module GetUserCurrentUser {
    export type LoginUserResponse = {
      /** 员工trueId */
      id?: string;
      /** 员工账号，即参数中的 usermanage */
      userId?: string;
      /** 员工姓名 */
      name?: string;
      /** 员工性别，'M'男，'F'女 */
      sex?: string;
      /** 组织机构代码 */
      departCode?: string;
      /** 单点登录令牌 */
      token?: string;
      /** 机构类型，0:远程中心，1:非远程中心 */
      orgType?: string;
      /** 经营中心代码 */
      businessCenterCode?: string;
      /** 大区经营中心 */
      regionCompanyCode?: string;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: LoginUserResponse;
    }
  }

  /** 查询当前登录用户信息 get /user/currentUser */
  function getUserCurrentUser(req?: ET<GetUserCurrentUser.Req>, options?: object): Promise<ET<GetUserCurrentUser.Res>>;

  export module GetUserFuzzyQuery {
    export type EmployeeResponse = {
      /** 权限ID，相当于trueId */
      id?: string;
      /** trueId */
      trueId?: string;
      /** 人员ID，登录账号 */
      userId?: string;
      /** 人员名称 */
      userName?: string;
      /** 性别 */
      sex?: string;
      /** 在职状态，0：离职，1：在职 */
      status?: string;
      /** 邮箱 */
      email?: string;
      /** 部门代码 */
      departCode?: string;
      /** 部门ID */
      departId?: string;
      /** 手机号 */
      mobile?: string;
      /** 电话号码 */
      phone?: string;
    };

    export interface Req {
      /** 人员姓名 */
      keyword: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<EmployeeResponse>;
    }
  }

  /** 渐进式查询人员信息 get /user/fuzzyQuery */
  function getUserFuzzyQuery(req: ET<GetUserFuzzyQuery.Req>, options?: object): Promise<ET<GetUserFuzzyQuery.Res>>;

  export module PostWorkTimeBatchDelete {
    export interface Req {
      /** 业务组id列表 */
      groupIdList?: Array<number>;
      /** 组类型 */
      type?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量删除工作时间 post /workTime/batchDelete */
  function postWorkTimeBatchDelete(req: ET<PostWorkTimeBatchDelete.Req>, options?: object): Promise<ET<PostWorkTimeBatchDelete.Res>>;

  export module PostWorkTimeBatchUpdate {
    export type WorkTimeConfig = {
      /** 生效日期起止日,格式：MM.dd */
      effectiveDateBegin?: string;
      /** 生效日期结束日,格式：MM:dd */
      effectiveDateEnd?: string;
      /** 周一到周日的上下班时间安排列表 */
      weekConfig?: Array<WeekConfig>;
    };
    export type WeekConfig = {
      /** 类型，0周日，1-6周一到周六 */
      type?: string;
      /** 是否上班，0上班，1不上班 */
      workFlag?: string;
      /** 日工作时间列表 */
      dayTime?: Array<DayTimeConfig>;
    };
    export type DayTimeConfig = {
      /** 上班开始时间,格式：HH:mm */
      beginTime?: string;
      /** 上班结束时间,格式：HH:mm */
      endTime?: string;
    };

    export interface Req {
      /** 组类型：1-电话组，2-在线组 */
      type?: string;
      /** 业务组id列表 */
      groupIdList?: Array<number>;
      /** 工作日期 */
      workTime?: Array<WorkTimeConfig>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量修改工作时间 post /workTime/batchUpdate */
  function postWorkTimeBatchUpdate(req: ET<PostWorkTimeBatchUpdate.Req>, options?: object): Promise<ET<PostWorkTimeBatchUpdate.Res>>;

  export module GetWorkTimeList {
    export type T = {
      /** 组id */
      groupId?: number;
      /** 组名称 */
      name?: string;
      /** 组类型，1电话组，2在线组 */
      type?: string;
      /** 工作日期 */
      workTime?: Array<WorkTimeConfig>;
    };
    export type WorkTimeConfig = {
      /** 生效日期起止日,格式：MM.dd */
      effectiveDateBegin?: string;
      /** 生效日期结束日,格式：MM:dd */
      effectiveDateEnd?: string;
      /** 周一到周日的上下班时间安排列表 */
      weekConfig?: Array<WeekConfig>;
    };
    export type WeekConfig = {
      /** 类型，0周日，1-6周一到周六 */
      type?: string;
      /** 是否上班，0上班，1不上班 */
      workFlag?: string;
      /** 日工作时间列表 */
      dayTime?: Array<DayTimeConfig>;
    };
    export type DayTimeConfig = any;

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: any;
      /** 组类型，1电话组，2在线组 */
      type?: string;
      /** 业务组id列表 */
      groupIdList?: Array<number>;
      /** 最后修改人是我，1是，0不是 */
      lastModifierFlag?: string;
      /** 业务组所属机构代码 */
      companyId?: string;
      /** 业务组所属部门代码 */
      departId?: string;
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

  /** 查询工作时间列表 get /workTime/list */
  function getWorkTimeList(req: ET<GetWorkTimeList.Req>, options?: object): Promise<ET<GetWorkTimeList.Res>>;

  export module PostWorkTimeSave {
    export type WorkTimeConfig = {
      /** 生效日期起止日,格式：MM.dd */
      effectiveDateBegin?: string;
      /** 生效日期结束日,格式：MM:dd */
      effectiveDateEnd?: string;
      /** 周一到周日的上下班时间安排列表 */
      weekConfig?: Array<WeekConfig>;
    };
    export type WeekConfig = {
      /** 类型，0周日，1-6周一到周六 */
      type?: string;
      /** 是否上班，0上班，1不上班 */
      workFlag?: string;
      /** 日工作时间列表 */
      dayTime?: Array<DayTimeConfig>;
    };
    export type DayTimeConfig = {
      /** 上班开始时间,格式：HH:mm */
      beginTime?: string;
      /** 上班结束时间,格式：HH:mm */
      endTime?: string;
    };

    export interface Req {
      /** 组类型：1-电话组，2-在线组 */
      type?: string;
      /** 业务组id列表 */
      groupIdList?: Array<number>;
      /** 工作日期 */
      workTime?: Array<WorkTimeConfig>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 新增工作时间 post /workTime/save */
  function postWorkTimeSave(req: ET<PostWorkTimeSave.Req>, options?: object): Promise<ET<PostWorkTimeSave.Res>>;

  export module PostContentSort {
    export interface Req {
      /** 咨询事项id */
      id: number;
      /** 调整后的排序值 */
      targetOrderNum: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 咨询事项排序 post /consultMatter/content/sort */
  function postContentSort(req: ET<PostContentSort.Req>, options?: object): Promise<ET<PostContentSort.Res>>;

  export module PostGroupSort {
    export interface Req {
      /** 事项分组id */
      id: number;
      /** 调整后的排序值 */
      targetOrderNum: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 事项分组排序 post /consultMatter/group/sort */
  function postGroupSort(req: ET<PostGroupSort.Req>, options?: object): Promise<ET<PostGroupSort.Res>>;

  export module GetGroupList1 {
    export type ConsultMatterGroupCompleteResponse = {
      /** 咨询事项分组id */
      id?: number;
      /** 分组名称 */
      groupName?: string;
      /** 地区列表 */
      areaList?: Array<DmEnumResponse>;
      /** 咨询事项列表 */
      consultMatterList?: Array<DmEnumResponse>;
    };
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<ConsultMatterGroupCompleteResponse>;
  }

  /** get /consultMatter/group/list1 */
  function getGroupList1(req?: ET<GetGroupList1.Req>, options?: object): Promise<ET<GetGroupList1.Res>>;

  export module GetGroupList2 {
    export type ConsultMatterGroupCompleteResponse = {
      /** 咨询事项分组id */
      id?: number;
      /** 分组名称 */
      groupName?: string;
      /** 地区列表 */
      areaList?: Array<DmEnumResponse>;
      /** 咨询事项列表 */
      consultMatterList?: Array<DmEnumResponse>;
    };
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<ConsultMatterGroupCompleteResponse>;
  }

  /** get /consultMatter/group/list2 */
  function getGroupList2(req?: ET<GetGroupList2.Req>, options?: object): Promise<ET<GetGroupList2.Res>>;

  export module GetConfigDetail {
    export type SpecialServiceConfigResponse = {
      /** 自增主键 */
      id?: number;
      /** 名称 */
      name?: string;
      /** 适用渠道 */
      channelList?: Array<DictEnumResponse>;
      /** 专项类型:字典服务XX code码 */
      type?: DictEnumResponse;
      /** 专项服务状态: NEVER_SALE 未上架; ON_SALE 已上架; OFF_SALE 已下架 */
      status?: string;
      /** 简介 */
      description?: string;
      /** 详情描述 */
      remarks?: string;
      /** 是否确认所属期: Y 是; N 否; */
      dateLimit?: string;
      /** 专项资料附件 */
      attachmentList?: Array<AttachmentFileResponse>;
      /** 专项服务权益 */
      serviceRightsList?: Array<DictEnumResponse>;
      /** 专项服务流程 */
      processConfigList?: Array<SpecialServiceProcessConfigResponse>;
      /** 逻辑删除 */
      isDelete?: number;
      /** 创建人id */
      creatorId?: string;
      /** 创建时间 */
      createDate?: string;
      /** 更新人id */
      modifierId?: string;
      /** 更新时间 */
      modifyDate?: string;
    };
    export type DictEnumResponse = {
      /** 字典数据code码 */
      code?: string;
      /** 字典数据值 */
      name?: string;
    };
    export type AttachmentFileResponse = {
      /** 附件id */
      id?: number;
      /** 文件路径 */
      filePath?: string;
      /** 文件名称 */
      name?: string;
      /** 文件大小 */
      fileSize?: number;
    };
    export type SpecialServiceProcessConfigResponse = {
      /** 专项服务流程id */
      id?: number;
      /** 专项服务配置id */
      serviceConfigId?: number;
      /** 流程定义表id */
      processDefineId?: number;
      /** 流程别名 */
      processAlias?: string;
      /** 流程配置内容 */
      config?: string;
    };

    export interface Req {
      /** 主键 */
      id: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: SpecialServiceConfigResponse;
    }
  }

  /** 查询专项服务详情 get /specialservice/config/detail */
  function getConfigDetail(req: ET<GetConfigDetail.Req>, options?: object): Promise<ET<GetConfigDetail.Res>>;

  export module PostConfigSave {
    export type SpecialServiceProcessConfigRequest = {
      /** 流程定义表id */
      processDefineId?: number;
      /** 流程别名 */
      processAlias?: string;
      /** 流程配置内容 */
      config?: string;
    };
    export type SpecialServiceConfigSaveResponse = {
      /** 专项服务id */
      id?: number;
    };

    export interface Req {
      /** 名称  最多可输入50 */
      name: string;
      /** 适用渠道,code码多个逗号分隔 */
      channel: string;
      /** 专项类型:字典服务XX code码 */
      type: string;
      /** 简介  最多可输入1000 */
      description?: string;
      /** 详情描述 */
      remarks?: string;
      /** 是否确认所属期: Y 是; N 否; */
      dateLimit?: string;
      /** 专项服务权益,code码多个逗号分隔 */
      serviceRights: Array<string>;
      /** 专项资料附件id: 多个逗号分隔 */
      attachment?: string;
      /** 专项服务流程 */
      processConfigList: Array<SpecialServiceProcessConfigRequest>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: SpecialServiceConfigSaveResponse;
    }
  }

  /** 新增专项服务配置 post /specialservice/config/save */
  function postConfigSave(req: ET<PostConfigSave.Req>, options?: object): Promise<ET<PostConfigSave.Res>>;

  export module PostConfigUpdate {
    export type SpecialServiceProcessConfigRequest = {
      /** 流程定义表id */
      processDefineId?: number;
      /** 流程别名 */
      processAlias?: string;
      /** 流程配置内容 */
      config?: string;
    };

    export interface Req {
      /** 自增主键 */
      id?: number;
      /** 名称  最多可输入50 */
      name: string;
      /** 适用渠道,code码多个逗号分隔 */
      channel: string;
      /** 专项类型:字典服务XX code码 */
      type: string;
      /** 简介  最多可输入1000 */
      description?: string;
      /** 详情描述 */
      remarks?: string;
      /** 是否确认所属期: Y 是; N 否; */
      dateLimit?: string;
      /** 专项服务权益,code码多个逗号分隔 */
      serviceRights: Array<string>;
      /** 专项资料附件id: 多个逗号分隔 */
      attachment?: string;
      /** 专项服务流程 */
      processConfigList: Array<SpecialServiceProcessConfigRequest>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 修改专项服务配置 post /specialservice/config/update */
  function postConfigUpdate(req: ET<PostConfigUpdate.Req>, options?: object): Promise<ET<PostConfigUpdate.Res>>;

  export module GetConfigList {
    export type T = {
      /** id */
      id?: number;
      /** 名称 */
      name?: string;
      /** 适用渠道 */
      channelList?: Array<string>;
      /** 专项类型名称 */
      type?: string;
      /** 专项服务状态;0 未上架; 1 已上架; 2 已下架 */
      status?: string;
      /** 专项服务状态名称 */
      statusName?: string;
      /** 创建人id */
      creatorName?: string;
      /** 创建时间 */
      createDate?: string;
      /** 更新人 */
      modifierName?: string;
      /** 更新时间 */
      modifyDate?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      /** 专项名称 */
      name?: string;
      /** 最近修改的开始时间，格式：yyyy-MM-dd */
      startDate?: any;
      /** 最近修改的结束时间，格式：yyyy-MM-dd */
      endDate?: any;
      /** 创建人id */
      createId?: string;
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

  /** get /special/service/config/list */
  function getConfigList(req: ET<GetConfigList.Req>, options?: object): Promise<ET<GetConfigList.Res>>;

  export module GetSpecialserviceConfigList {
    export type PageResponseSpecialServiceConfigListResponse = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SpecialServiceConfigListResponse>;
    };
    export type SpecialServiceConfigListResponse = {
      /** id */
      id?: number;
      /** 名称 */
      name?: string;
      /** 适用渠道 */
      channelList?: Array<DictEnumResponse>;
      /** 简介 */
      description?: string;
      /** 专项类型 */
      type?: DictEnumResponse;
      /** 专项服务状态: NEVER_SALE 未上架; ON_SALE 已上架; OFF_SALE 已下架 */
      status?: string;
      /** 创建人id */
      creatorName?: string;
      /** 创建时间 */
      createDate?: string;
      /** 更新人 */
      modifierName?: string;
      /** 更新时间 */
      modifyDate?: string;
    };
    export type DictEnumResponse = {
      /** 字典数据code码 */
      code?: string;
      /** 字典数据值 */
      name?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 排序条件 */
      sort?: any;
      /** 排序列表 */
      sortRuleList?: Array<string>;
      /** 专项名称 */
      name?: string;
      /** 最近修改的开始时间，格式：yyyy-MM-dd */
      startDate?: string;
      /** 最近修改的结束时间，格式：yyyy-MM-dd */
      endDate?: string;
      /** 创建人id */
      creatorId?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageResponseSpecialServiceConfigListResponse;
    }
  }

  /** 专项服务配置列表查询 get /specialservice/config/list */
  function getSpecialserviceConfigList(req: ET<GetSpecialserviceConfigList.Req>, options?: object): Promise<ET<GetSpecialserviceConfigList.Res>>;

  export module GetProcessDefine {
    export type SpecialServiceConfigProcessDefineResponse = {
      /** id */
      id?: number;
      /** 流程名称 */
      name?: string;
      /** 排序字段 */
      indexNum?: number;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<SpecialServiceConfigProcessDefineResponse>;
    }
  }

  /** 流程定义 get /specialservice/config/process/define */
  function getProcessDefine(req?: ET<GetProcessDefine.Req>, options?: object): Promise<ET<GetProcessDefine.Res>>;

  export module PostAttachmentUpload {
    export type AttachmentFileResponse = {
      /** 附件id */
      id?: number;
      /** 文件路径 */
      filePath?: string;
      /** 文件名称 */
      name?: string;
      /** 文件大小 */
      fileSize?: number;
    };

    export interface Req {
      /** 附件 */
      file: any;
      /** 附件业务含义 {@link cn.com.servyou.consultcore.facade.specialservice.enums.AttachmentBusinessTypeEnum} */
      type: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: AttachmentFileResponse;
    }
  }

  /** 附件上传 post /specialservice/config/attachment/upload */
  function postAttachmentUpload(req: ET<PostAttachmentUpload.Req>, options?: object): Promise<ET<PostAttachmentUpload.Res>>;

  export module PostConfigUpdateStatus {
    export interface Req {
      /** 主键 */
      id: number;
      /** 专项服务状态；NEVER_SALE-未上架; ON_SALE-已上架; OFF_SALE-已下架 */
      status: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 专项服务配置状态更新 post /specialservice/config/updateStatus */
  function postConfigUpdateStatus(req: ET<PostConfigUpdateStatus.Req>, options?: object): Promise<ET<PostConfigUpdateStatus.Res>>;

  export module PostAgentBatchUpdateAutoAllocation {
    export interface Req {
      /** 坐席id列表 */
      idList: Array<number>;
      /** 自动分配，0：关闭，1：开启 */
      autoAllocation: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量修改在线坐席自动分配接口 post /agent/batchUpdateAutoAllocation */
  function postAgentBatchUpdateAutoAllocation(req: ET<PostAgentBatchUpdateAutoAllocation.Req>, options?: object): Promise<ET<PostAgentBatchUpdateAutoAllocation.Res>>;

  export module PostWorkTimeBatchUpdateSameWorkTime {
    export type WorkTimeConfig = {
      /** 生效日期起止日,格式：MM.dd */
      effectiveDateBegin?: string;
      /** 生效日期结束日,格式：MM:dd */
      effectiveDateEnd?: string;
      /** 周一到周日的上下班时间安排列表 */
      weekConfig?: Array<WeekConfig>;
    };
    export type WeekConfig = {
      /** 类型，0周日，1-6周一到周六 */
      type?: string;
      /** 是否上班，0上班，1不上班 */
      workFlag?: string;
      /** 日工作时间列表 */
      dayTime?: Array<DayTimeConfig>;
    };
    export type DayTimeConfig = {
      /** 上班开始时间,格式：HH:mm */
      beginTime?: string;
      /** 上班结束时间,格式：HH:mm */
      endTime?: string;
    };

    export interface Req {
      /** 组类型：1-电话组，2-在线组 */
      type: string;
      /** 业务组id列表 */
      groupIdList: Array<number>;
      /** 修改前的时间段 */
      workTimeBeforeUpdate: Array<WorkTimeConfig>;
      /** 修改后的时间段 */
      workTimeAfterUpdate: Array<WorkTimeConfig>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量修改相同工作时间 post /workTime/batchUpdateSameWorkTime */
  function postWorkTimeBatchUpdateSameWorkTime(req: ET<PostWorkTimeBatchUpdateSameWorkTime.Req>, options?: object): Promise<ET<PostWorkTimeBatchUpdateSameWorkTime.Res>>;

  export module GetWorkTimeQuerySameWorkTime {
    export type WorkTimeConfig = {
      /** 生效日期起止日,格式：MM.dd */
      effectiveDateBegin?: string;
      /** 生效日期结束日,格式：MM:dd */
      effectiveDateEnd?: string;
      /** 周一到周日的上下班时间安排列表 */
      weekConfig?: Array<WeekConfig>;
    };
    export type WeekConfig = {
      /** 类型，0周日，1-6周一到周六 */
      type?: string;
      /** 是否上班，0上班，1不上班 */
      workFlag?: string;
      /** 日工作时间列表 */
      dayTime?: Array<DayTimeConfig>;
    };
    export type DayTimeConfig = {
      /** 上班开始时间,格式：HH:mm */
      beginTime?: string;
      /** 上班结束时间,格式：HH:mm */
      endTime?: string;
    };

    export interface Req {
      /** 组类型，1电话组，2在线组 */
      type: string;
      /** 业务组id列表 */
      groupIdList: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<WorkTimeConfig>;
    }
  }

  /** 查询技能组相同时间段列表 get /workTime/querySameWorkTime */
  function getWorkTimeQuerySameWorkTime(req: ET<GetWorkTimeQuerySameWorkTime.Req>, options?: object): Promise<ET<GetWorkTimeQuerySameWorkTime.Res>>;

  export module GetCommonTest {
    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 根据类型选取未停用的业务组列表 get /common/test */
  function getCommonTest(req?: ET<GetCommonTest.Req>, options?: object): Promise<ET<GetCommonTest.Res>>;

  export module PostGlobalConfigSave {
    export type GroupCallCompletingRateAlarmGlobalConfigVO = {
      /** 告警开关类型：1：经营中心，2：组，3：咨询业务，4：地区 */
      alarmType: string;
      /** 告警开关是否开启：Y：是，N：否 */
      alarmSwitchEnable: string;
      /** 告警项配置列表 */
      alarmItemList?: Array<GroupCallCompletingRateAlarmItemVO>;
    };
    export type GroupCallCompletingRateAlarmItemVO = {
      /** 开关项code：告警开关类型为经营中心是经营中心code，告警开关类型为组时是null，告警开关类型为咨询业务时是咨询业务类型，告警开关类型为地区时是地区code */
      alarmItemCode?: string;
      /** 组接通率下限阈值（前端传过来是阈值百分比的值，范围1-99） */
      groupCallCompletingRateLowerThreshold?: string;
      /** 组接通率上限阈值（前端传过来是阈值百分比的值，范围1-99） */
      groupCallCompletingRateUpperThreshold?: string;
    };

    export interface Req {
      /** 组类型：1：电话组，2：在线组 */
      groupType: string;
      /** 组告警配置列表 */
      groupCallCompletingRateAlarmGlobalConfigList: Array<GroupCallCompletingRateAlarmGlobalConfigVO>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 保存组接通率全局配置 post /group/callCompletingRateAlarm/globalConfig/save */
  function postGlobalConfigSave(req: ET<PostGlobalConfigSave.Req>, options?: object): Promise<ET<PostGlobalConfigSave.Res>>;

  export module GetTT {
    export type Req = any;
    export type Res = string;
  }

  /** get /t/t */
  function getTT(req?: ET<GetTT.Req>, options?: object): Promise<ET<GetTT.Res>>;

  export module GetGroupCallCompletingRateAlarmGlobalConfigDetail {
    export type GroupCallCompletingRateAlarmGlobalConfigDetailResVO = {
      /** 组类型：1：电话组，2：在线组 */
      groupType?: string;
      /** 组告警配置列表 */
      groupCallCompletingRateAlarmGlobalConfigList?: Array<GroupCallCompletingRateAlarmGlobalConfigVO>;
    };
    export type GroupCallCompletingRateAlarmGlobalConfigVO = {
      /** 告警开关类型：1：经营中心，2：组，3：咨询业务，4：地区 */
      alarmType: string;
      /** 告警开关是否开启：Y：是，N：否 */
      alarmSwitchEnable: string;
      /** 告警项配置列表 */
      alarmItemList?: Array<GroupCallCompletingRateAlarmItemVO>;
    };
    export type GroupCallCompletingRateAlarmItemVO = {
      /** 开关项code：告警开关类型为经营中心是经营中心code，告警开关类型为组时是null，告警开关类型为咨询业务时是咨询业务类型，告警开关类型为地区时是地区code */
      alarmItemCode?: string;
      /** 组接通率下限阈值（前端传过来是阈值百分比的值，范围1-99） */
      groupCallCompletingRateLowerThreshold?: string;
      /** 组接通率上限阈值（前端传过来是阈值百分比的值，范围1-99） */
      groupCallCompletingRateUpperThreshold?: string;
    };

    export interface Req {
      groupType: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: GroupCallCompletingRateAlarmGlobalConfigDetailResVO;
    }
  }

  /** 查询组接通率全局配置详情 get /group/callCompletingRateAlarm/globalConfig/detail */
  function getGroupCallCompletingRateAlarmGlobalConfigDetail(req: ET<GetGroupCallCompletingRateAlarmGlobalConfigDetail.Req>, options?: object): Promise<ET<GetGroupCallCompletingRateAlarmGlobalConfigDetail.Res>>;

  export module PostResourcePoolDelete {
    export interface Req {
      /** 资源池id */
      idList: Array<number>;
      /** 咨询类型||online:在线;incall:来电 */
      consultType?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 删除资源池 post /resourcePool/delete */
  function postResourcePoolDelete(req: ET<PostResourcePoolDelete.Req>, options?: object): Promise<ET<PostResourcePoolDelete.Res>>;

  export module PostResourcePoolDetail {
    export type DetailResourcePoolResVO = {
      /** 资源池id */
      id?: number;
      /** 咨询类型||online:在线;incall:来电 */
      consultType?: string;
      /** 资源池名称 */
      name?: string;
      /** 备注 */
      remark?: string;
      /** 告警时间间隔 */
      alarmTimeInterval?: number;
      /** 加人时间间隔 */
      plusAgentTimeInterval?: number;
      /** 坐席列表 */
      agentInfoList?: Array<AgentInfoResVO>;
      /** 组列表 */
      groupInfoList?: Array<GroupDetailResVO>;
    };
    export type AgentInfoResVO = {
      /** 坐席trueId */
      trueId?: string;
      /** 坐席名称 */
      name?: string;
      /** 坐席账号 */
      userId?: string;
      /** 受理能力｜｜high:高；low：低 */
      acceptedCapacity?: string;
      /** 复用标识||Y:是;N:否 */
      reuseFlag?: string;
    };
    export type GroupDetailResVO = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 组自有优先级 */
      groupSelfPriority?: number;
      /** 组复用优先级 */
      groupReusePriority?: number;
      /** 加人接通率阈值 */
      plusAgentCallCompletingRateThreshold?: number;
      /** 减人接通率阈值 */
      minusAgentCallCompletingRateThreshold?: number;
      /** 单次加减人人数 */
      oncePlusOrMinusAgentCount?: number;
      /** 保底咨询次数 */
      safetyConsultCount?: number;
      /** 坐席保底人数 */
      safetyAgentCount?: number;
    };

    export interface Req {
      /** 资源池id */
      id: number;
      /** 咨询类型||online:在线;incall:来电 */
      consultType?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: DetailResourcePoolResVO;
    }
  }

  /** 查询资源池详情 get /resourcePool/detail */
  function postResourcePoolDetail(req: ET<PostResourcePoolDetail.Req>, options?: object): Promise<ET<PostResourcePoolDetail.Res>>;

  export module PostResourcePoolInsert {
    export type AgentOperateReqVO = {
      /** 坐席trueId */
      trueId: string;
      /** 受理能力｜｜high:高；low：低 */
      acceptedCapacity: string;
      /** 复用标识||Y:是;N:否 */
      reuseFlag?: string;
    };
    export type GroupOperateReqVO = {
      /** 组id */
      id: number;
      /** 组自有优先级 */
      groupSelfPriority: number;
      /** 组复用优先级 */
      groupReusePriority: number;
      /** 加人接通率阈值 */
      plusAgentCallCompletingRateThreshold?: string;
      /** 减人接通率阈值 */
      minusAgentCallCompletingRateThreshold?: string;
      /** 单次加减人人数 */
      oncePlusOrMinusAgentCount: number;
      /** 保底咨询次数 */
      safetyConsultCount: number;
      /** 坐席保底人数 */
      safetyAgentCount: number;
    };
    export type IdResponse = {
      /** 业务ID */
      id?: number;
    };

    export interface Req {
      /** 咨询类型||online:在线;incall:来电 */
      consultType: string;
      /** 资源池名称 */
      name: string;
      /** 备注 */
      remark?: string;
      /** 告警时间间隔 */
      alarmTimeInterval: number;
      /** 加人时间间隔 */
      plusAgentTimeInterval: number;
      /** 坐席列表 */
      agentInfoList: Array<AgentOperateReqVO>;
      /** 组列表 */
      groupInfoList: Array<GroupOperateReqVO>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: IdResponse;
    }
  }

  /** 新增资源池 post /resourcePool/insert */
  function postResourcePoolInsert(req: ET<PostResourcePoolInsert.Req>, options?: object): Promise<ET<PostResourcePoolInsert.Res>>;

  export module PostResourcePoolPage {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type PagePageResourcePoolResVO = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<PageResourcePoolResVO>;
    };
    export type PageResourcePoolResVO = {
      /** 资源池id */
      id?: number;
      /** 咨询类型||online:在线;inCall:来电 */
      consultType?: string;
      /** 资源池名称 */
      name?: string;
      /** 坐席名称列表 */
      agentNameList?: Array<string>;
      /** 组名称列表 */
      groupNameList?: Array<string>;
      /** 最后修改人名称 */
      modifierName?: string;
      /** 修改时间 */
      modifyTime?: string;
      /** 资源池状态||open:启用;stop:停用 */
      resourcePoolEnStatus?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 是否查询总数，true：查询总数，false：不查询 */
      queryCount?: boolean;
      /** 排序列表 */
      sortRuleList?: Array<SortRule>;
      /** 咨询类型||online:在线;incall:来电 */
      consultType?: string;
      /** 资源池名称 */
      name?: string;
      /** 组id列表 */
      groupIdList?: Array<number>;
      /** 坐席trueId列表 */
      trueIdList?: Array<string>;
      /** 资源池状态||open:启用;stop:停用 */
      resourcePoolEnStatus?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PagePageResourcePoolResVO;
    }
  }

  /** 分页查询资源池 post /resourcePool/page */
  function postResourcePoolPage(req: ET<PostResourcePoolPage.Req>, options?: object): Promise<ET<PostResourcePoolPage.Res>>;

  export module PostResourcePoolUpdate {
    export type AgentOperateReqVO = {
      /** 坐席trueId */
      trueId: string;
      /** 受理能力｜｜high:高；low：低 */
      acceptedCapacity: string;
      /** 复用标识||Y:是;N:否 */
      reuseFlag?: string;
    };
    export type GroupOperateReqVO = {
      /** 组id */
      id: number;
      /** 组自有优先级 */
      groupSelfPriority: number;
      /** 组复用优先级 */
      groupReusePriority: number;
      /** 加人接通率阈值 */
      plusAgentCallCompletingRateThreshold?: string;
      /** 减人接通率阈值 */
      minusAgentCallCompletingRateThreshold?: string;
      /** 单次加减人人数 */
      oncePlusOrMinusAgentCount: number;
      /** 保底咨询次数 */
      safetyConsultCount: number;
      /** 坐席保底人数 */
      safetyAgentCount: number;
    };
    export type IdResponse = {
      /** 业务ID */
      id?: number;
    };

    export interface Req {
      /** 咨询类型||online:在线;incall:来电 */
      consultType: string;
      id: number;
      /** 资源池名称 */
      name: string;
      /** 备注 */
      remark?: string;
      /** 告警时间间隔 */
      alarmTimeInterval: number;
      /** 加人时间间隔 */
      plusAgentTimeInterval: number;
      /** 坐席列表 */
      agentInfoList: Array<AgentOperateReqVO>;
      /** 组列表 */
      groupInfoList: Array<GroupOperateReqVO>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: IdResponse;
    }
  }

  /** 修改资源池 post /resourcePool/update */
  function postResourcePoolUpdate(req: ET<PostResourcePoolUpdate.Req>, options?: object): Promise<ET<PostResourcePoolUpdate.Res>>;

  export module GetCommonQueryGroupList {
    export type GroupResponse = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
    };

    export interface Req {
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
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<GroupResponse>;
    }
  }

  /** 根据条件查询坐席组信息列表 get /common/queryGroupList */
  function getCommonQueryGroupList(req: ET<GetCommonQueryGroupList.Req>, options?: object): Promise<ET<GetCommonQueryGroupList.Res>>;

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
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<TypeClassifyListDTO>;
    }
  }

  /** 分类树 get /classify/list */
  function getClassifyList(req: ET<GetClassifyList.Req>, options?: object): Promise<ET<GetClassifyList.Res>>;

  export module PostIsdConfigPage {
    export interface Req {
      /** id */
      id?: number;
      /** id列表 */
      idList?: Array<number>;
      /** 受理人trueId */
      acceptorTrueId?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 修改对内服务数字化配置 post /isdConfig/update */
  function postIsdConfigPage(req: ET<PostIsdConfigPage.Req>, options?: object): Promise<ET<PostIsdConfigPage.Res>>;

  export module GetSystemAndModuleQuery {
    export type ISDSystemAndModuleQueryResVO = {
      /** 代码|目前为两级，父级为产品代码，子级为模块代码| */
      code?: string;
      /** 名称 */
      name?: string;
      /** 子级列表 */
      childrenList?: Array<ISDSystemAndModuleQueryResVO>;
    };

    export interface Req {
      /** 查询参数 */
      isdSystemAndModuleQueryReqVO: any;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<ISDSystemAndModuleQueryResVO>;
    }
  }

  /** 查询对内服务数字化产品和模块配置 get /isdConfig/systemAndModule/query */
  function getSystemAndModuleQuery(req: ET<GetSystemAndModuleQuery.Req>, options?: object): Promise<ET<GetSystemAndModuleQuery.Res>>;

  export module PostIsdConfigPage_1705483209 {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type PageResultISDConfigPageResVO = {
      list?: Array<ISDConfigPageResVO>;
      success?: boolean;
      errorContext?: ErrorContext;
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
    };
    export type ISDConfigPageResVO = {
      /** id */
      id?: number;
      /** 接入类型||WechatWork:企业微信; */
      accessType?: string;
      /** 接入id.当接入类型为企业微信时，为主体id; */
      accessId?: string;
      /** 主体名称 */
      accessName?: string;
      /** 子接入id.当接入类型为企业微信时，为应用id; */
      subAccessId?: string;
      /** 应用名称 */
      subAccessName?: string;
      /** 产品代码 */
      systemCode?: string;
      /** 产品代码名称 */
      systemName?: string;
      /** 模块代码 */
      moduleCode?: string;
      /** 模块名称 */
      moduleName?: string;
      /** 地区代码列表 */
      locationCodeList?: Array<string>;
      /** 地区名称列表 */
      locationNameList?: Array<string>;
      /** 产品维度 */
      brand?: string;
      /** 产品维度名称 */
      brandName?: string;
      /** 支持的受理模式||all:机器人和服务小组均支持;robot:机器人;services_team:服务小组; */
      supportAcceptModel?: string;
      /** 支持的受理模式名称 */
      supportAcceptModelName?: string;
      /** 优先的受理模式||robot:机器人;services_team:服务小组; */
      priorityAcceptModel?: string;
      /** 优先的受理模式名称 */
      priorityAcceptModelName?: string;
      /** 受理人trueId */
      acceptorTrueId?: string;
      /** 受理人名称 */
      acceptorName?: string;
      /** 受理群名称 */
      acceptanceCrowdName?: string;
      /** 受理通知webhooks */
      acceptanceNoticeWebhookList?: Array<string>;
      /** 修改人trueId */
      modifierId?: string;
      /** 修改人名称 */
      modifierName?: string;
      /** 修改时间 */
      modifyDate?: string;
    };
    export type ErrorContext = {
      errorCode?: string;
      errorMessage?: string;
      detailMessage?: string;
      isBusinessError?: boolean;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 是否查询总数，true：查询总数，false：不查询 */
      queryCount?: boolean;
      /** 排序列表 */
      sortRuleList?: Array<SortRule>;
      /** 产品代码列表 */
      systemCodeList?: Array<string>;
      /** 模块列表 */
      moduleCodeList?: Array<string>;
      /** 地区 */
      locationCodeList?: Array<string>;
      /** 受理人trueId列表 */
      acceptorTrueIdList?: Array<string>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageResultISDConfigPageResVO;
    }
  }

  /** 分页查询对内服务数字化配置 post /isdConfig/page */
  function postIsdConfigPage_1705483209(req: ET<PostIsdConfigPage_1705483209.Req>, options?: object): Promise<ET<PostIsdConfigPage_1705483209.Res>>;

  export module GetCancelPublish {
    export interface Req {
      /** 方案ID */
      planId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 撤销发布会话分析方案 get /smart/chat/analysis/plan/cancel/publish */
  function getCancelPublish(req: ET<GetCancelPublish.Req>, options?: object): Promise<ET<GetCancelPublish.Res>>;

  export module PostPlanPage {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type PageSmartChatAnalysisPlanPageResVO = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SmartChatAnalysisPlanPageResVO>;
    };
    export type SmartChatAnalysisPlanPageResVO = {
      /** 方案ID */
      planId?: number;
      /** 方案名称 */
      smartChatAnalysisPlanName?: string;
      /** 发布状态名称 */
      publishStatusName?: string;
      /** 发布状态 unPublished:未发布；published:已发布 */
      publishStatus?: string;
      /** 方案快照ID（会话分析任务直接使用快照ID） */
      planSnapshotId?: number;
      /** 操作人 */
      modifierName?: string;
      /** 操作时间 */
      modifyDate?: string;
      /** 创建者trueId */
      creatorId?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 是否查询总数，true：查询总数，false：不查询 */
      queryCount?: boolean;
      /** 排序列表 */
      sortRuleList?: Array<SortRule>;
      /** 质检方案名称 */
      smartChatAnalysisPlanName?: string;
      /** 发布状态 unPublished:未发布；published:已发布 */
      publishStatus?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageSmartChatAnalysisPlanPageResVO;
    }
  }

  /** 分页查询会话分析方案 post /smart/chat/analysis/plan/page */
  function postPlanPage(req: ET<PostPlanPage.Req>, options?: object): Promise<ET<PostPlanPage.Res>>;

  export module GetPlanPublish {
    export interface Req {
      /** 方案ID */
      planId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 发布会话分析方案 get /smart/chat/analysis/plan/publish */
  function getPlanPublish(req: ET<GetPlanPublish.Req>, options?: object): Promise<ET<GetPlanPublish.Res>>;

  export module PostRuleSave {
    export type SmartChatAnalysisPlanCategoryReqVO = {
      /** 分类名称 */
      categoryName: string;
      /** 分类总分 */
      categoryTotalScore: number;
      /** 排序序号 */
      indexNo?: number;
      /** 规则列表 */
      analysisPlanCategoryRuleList?: Array<SmartChatAnalysisPlanCategoryRuleReqVO>;
    };
    export type SmartChatAnalysisPlanCategoryRuleReqVO = {
      /** 同步后sca自身规则配置ID */
      scaRuleConfigId: number;
      /** live800规则id = 页面上显示的规则ID */
      scaRuleId: number;
      /** 规则名称 */
      scaRuleName: string;
      /** 规则描述 */
      scaRuleDesc?: string;
      /** 规则类型 0:清零项；1:基础加分项；2:扣分项 */
      scaRuleType: string;
      /** 分数 */
      grade: number;
      /** 备注 */
      remark?: string;
    };

    export interface Req {
      /** 质检方案名称 */
      smartChatAnalysisPlanName: string;
      /** 背景说明 */
      backGroundDescription?: string;
      /** 方案ID当修改时方案ID必须要有值新增时无需传 */
      planId?: number;
      /** 规则分类 */
      analysisPlanCategoryList?: Array<SmartChatAnalysisPlanCategoryReqVO>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: number;
    }
  }

  /** 保存会话分析方案规则信息 post /smart/chat/analysis/plan/rule/save */
  function postRuleSave(req: ET<PostRuleSave.Req>, options?: object): Promise<ET<PostRuleSave.Res>>;

  export module PostTargetSave {
    export type SmartChatAnalysisPlanGoalsReqVO = {
      /** 目标说明 */
      goalsTitle?: string;
      /** 完整用户输入目标 */
      fullUserGoals?: string;
    };

    export interface Req {
      /** 方案ID */
      planId: number;
      /** 默认步骤说明 */
      defaultStepDescription?: string;
      /** 步骤说明 */
      stepDescription?: string;
      /** 方案目标 */
      planGoals?: SmartChatAnalysisPlanGoalsReqVO;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 保存会话分析方案目标信息 post /smart/chat/analysis/plan/target/save */
  function postTargetSave(req: ET<PostTargetSave.Req>, options?: object): Promise<ET<PostTargetSave.Res>>;

  export module GetPlanDetail {
    export type SmartChatAnalysisPlanDetailResVO = {
      /** 方案ID */
      planId?: number;
      /** 质检方案名称 */
      smartChatAnalysisPlanName?: string;
      /** 背景说明 */
      backGroundDescription?: string;
      /** 规则分类 */
      analysisPlanCategoryList?: Array<SmartChatAnalysisPlanCategoryResVO>;
    };
    export type SmartChatAnalysisPlanCategoryResVO = {
      /** 方案ID */
      id?: number;
      /** 分类名称 */
      categoryName?: string;
      /** 分类总分 */
      categoryTotalScore?: number;
      /** 排序序号 */
      indexNo?: number;
      /** 创建时间 */
      createDate?: string;
      /** 规则列表 */
      analysisPlanCategoryRuleList?: Array<SmartChatAnalysisPlanCategoryRuleResVO>;
    };
    export type SmartChatAnalysisPlanCategoryRuleResVO = {
      /** 主键id */
      id?: number;
      /** 同步后sca自身规则配置ID */
      scaRuleConfigId?: number;
      /** live800规则id = 页面上显示的规则ID */
      scaRuleId?: number;
      /** 规则名称 */
      scaRuleName?: string;
      /** 规则描述 */
      scaRuleDesc?: string;
      /** 规则类型 0:清零项；1:基础加分项；2:扣分项 */
      scaRuleType?: string;
      /** 分数 */
      grade?: number;
      /** 备注 */
      remark?: string;
    };

    export interface Req {
      /** 方案ID */
      planId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: SmartChatAnalysisPlanDetailResVO;
    }
  }

  /** 会话分析方案规则详情 get /smart/chat/analysis/plan/detail */
  function getPlanDetail(req: ET<GetPlanDetail.Req>, options?: object): Promise<ET<GetPlanDetail.Res>>;

  export module GetTargetDetail {
    export type SmartChatAnalysisPlanTargetResVO = {
      /** 方案ID */
      planId?: number;
      /** 默认步骤说明 */
      defaultStepDescription?: string;
      /** 步骤说明 */
      stepDescription?: string;
      /** 方案目标 */
      planGoals?: SmartChatAnalysisPlanGoalsResVO;
    };
    export type SmartChatAnalysisPlanGoalsResVO = {
      /** 目标说明 */
      goalsTitle?: string;
      /** 完整用户输入目标 */
      fullUserGoals?: string;
    };

    export interface Req {
      /** 方案ID */
      planId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: SmartChatAnalysisPlanTargetResVO;
    }
  }

  /** 会话分析方案目标详情 get /smart/chat/analysis/plan/target/detail */
  function getTargetDetail(req: ET<GetTargetDetail.Req>, options?: object): Promise<ET<GetTargetDetail.Res>>;

  export module PostPlanPreview {
    export type SmartChatAnalysisPlanGoalsReqVO = {
      /** 目标说明 */
      goalsTitle?: string;
      /** 完整用户输入目标 */
      fullUserGoals?: string;
    };

    export interface Req {
      /** 方案ID */
      planId: number;
      /** 默认步骤说明 */
      defaultStepDescription?: string;
      /** 步骤说明 */
      stepDescription?: string;
      /** 方案目标 */
      planGoals?: SmartChatAnalysisPlanGoalsReqVO;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: string;
    }
  }

  /** 会话分析方案预览 post /smart/chat/analysis/plan/preview */
  function postPlanPreview(req: ET<PostPlanPreview.Req>, options?: object): Promise<ET<PostPlanPreview.Res>>;

  export module GetPlanTest {
    export type SmartChatAnalysisPlanTestResVO = {
      /** 回答内容 */
      answerContent?: string;
      /** 大模型智库日志id */
      fmttLogId?: string;
      /** 大模型智库返回的答案是否结束<p><li>true:代表答案全部返回</li><li>false:代表答案未全部返回，需要根据fmttLogId继续获取</li></p> */
      fmttAnswerEnd?: boolean;
    };

    export interface Req {
      /** 咨询会话id */
      msgId: string;
      /** 方案ID */
      planId: number;
      /** 大模型厂商代码（英文）||qwen:通义千问;zhipu:智谱;baidu:文心一言 */
      fmttVendorEnCode: string;
      /** 大模型代码（英文）||qwen-max:通义千问的模型代码;ernie-bot:文心一言的模型代码 */
      fmttModelEnCode: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: SmartChatAnalysisPlanTestResVO;
    }
  }

  /** 会话分析方案测试接口 get /smart/chat/analysis/plan/test */
  function getPlanTest(req: ET<GetPlanTest.Req>, options?: object): Promise<ET<GetPlanTest.Res>>;

  export module GetPlanConfig {
    export type SmartChatAnalysisConfigResVO = {
      /** 最大分类数 */
      maxCategoryNum?: number;
      /** 最大规则分类数 */
      maxCategoryRuleNum?: number;
      /** 步骤说明 */
      defaultStepDescription?: string;
      /** 方案目标 */
      defaultPlanGoals?: JSONObject;
    };
    export type JSONObject = any;

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: SmartChatAnalysisConfigResVO;
    }
  }

  /** 会话分析方案配置 get /smart/chat/analysis/plan/config */
  function getPlanConfig(req?: ET<GetPlanConfig.Req>, options?: object): Promise<ET<GetPlanConfig.Res>>;

  export module PostSmartChatAnalysisTaskSave {
    export type SmartChatAnalysisTaskSaveResVO = {
      /** 任务id */
      id?: number;
    };

    export interface Req {
      /** 任务名称 */
      name: string;
      /** 方案id */
      planId: number;
      /** 方案名称 */
      planName: string;
      /** 方案快照id */
      planSnapshotId: number;
      /** 选择会话类型|任务选择的会话类型|1：按条件筛选；2：指定会话id(离线分析)；3：自定义数据源 */
      selectChatType: string;
      /** 会话类型||online:在线咨询;incall:电话咨询 */
      chatType: string;
      /** 过滤条件json字符串 */
      filterConditionJson?: string;
      /** 人工咨询ID合集 */
      consultMsgIdList?: Array<string>;
      /** 任务类型||offline:离线分析;intime:实时分析 */
      taskType: string;
      /** 任务开始时间类型（英文）||immediate:立即运行;specific:指定开启时间 */
      taskStartTimeEnType: string;
      /** 指定开始时间 */
      appointStartTime?: string;
      /** 指定结束时间 */
      appointEndTime?: string;
      /** 大模型APPID */
      fmttAppId: string;
      /** 大模型厂商代码（英文）||qwen:通义千问;zhipu:智谱;baidu:文心一言 */
      fmttVendorEnCode: string;
      /** 大模型代码（英文）||qwen-max:通义千问的模型代码;ernie-bot:文心一言的模型代码 */
      fmttModelEnCode: string;
      /** 分析消息数量 */
      analysisMsgIdNum?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: SmartChatAnalysisTaskSaveResVO;
    }
  }

  /** 保存智能会话分析任务配置 post /smartChatAnalysisTask/save */
  function postSmartChatAnalysisTaskSave(req: ET<PostSmartChatAnalysisTaskSave.Req>, options?: object): Promise<ET<PostSmartChatAnalysisTaskSave.Res>>;

  export module GetSmartChatAnalysisTaskPage {
    export type PageResultSmartChatAnalysisTaskPageResVO = {
      list?: Array<SmartChatAnalysisTaskPageResVO>;
      success?: boolean;
      errorContext?: ErrorContext;
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
    };
    export type SmartChatAnalysisTaskPageResVO = {
      /** 任务id */
      id?: number;
      /** 名称 */
      name?: string;
      /** 方案名称 */
      planName?: string;
      /** 方案快照id */
      planSnapshotId?: number;
      /** 任务执行状态（英文）<p><li>waiting_execute:待执行</li><li>executing:执行中</li><li>execute_failure:执行失败</li><li>execute_finish_part:部分完成</li><li>execute_finish:全部完成</li><li>execute_cancel:执行取消</li></p> */
      taskExecuteEnStatus?: string;
      /** 任务执行状态名称<p><li>waiting_execute:待执行</li><li>executing:执行中</li><li>execute_failure:执行失败</li><li>execute_finish_part:部分完成</li><li>execute_finish:全部完成</li><li>execute_cancel:执行取消</li></p> */
      taskExecuteEnStatusName?: string;
      /** 任务中断原因 */
      taskInterruptReason?: string;
      /** 任务类型||offline:离线分析任务;realTime:实时分析任务 */
      taskType?: string;
      /** 任务类型code对应的text中文描述 */
      taskTypeText?: string;
      /** 任务开始时间 */
      taskStartTime?: string;
      /** 任务结束时间 */
      taskEndTime?: string;
      /** 创建人ID */
      creatorId?: string;
      /** 创建人 */
      creatorName?: string;
      /** 录入日期 */
      createDate?: string;
      /** 已分析数量 */
      analysisNum?: number;
      /** 任务开始时间类型（英文）||immediate:立即运行;specific:指定开启时间 */
      taskStartTimeEnType?: string;
      /** 指定开始时间 */
      appointStartTime?: string;
      /** 指定结束时间 */
      appointEndTime?: string;
      /** 大模型APPID */
      fmttAppId?: string;
      /** 大模型APPNAME */
      fmttAppName?: string;
      /** 大模型厂商代码（英文）||qwen:通义千问;zhipu:智谱;baidu:文心一言 */
      fmttVendorEnCode?: string;
      /** 大模型代码（英文）||qwen-max:通义千问的模型代码;ernie-bot:文心一言的模型代码 */
      fmttModelEnCode?: string;
      /** 显示汇总统计信息 */
      showSummaryInfo?: boolean;
      /** 会话类型||online:在线咨询;incall:电话咨询 */
      chatType?: string;
      /** 会话类型||online:在线咨询;incall:电话咨询 */
      chatTypeName?: string;
    };
    export type ErrorContext = {
      errorCode?: string;
      errorMessage?: string;
      detailMessage?: string;
      isBusinessError?: boolean;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 是否查询总数，true：查询总数，false：不查询 */
      queryCount?: boolean;
      /** 排序列表 */
      sortRuleList?: Array<string>;
      /** 任务名称或者任务id */
      taskNameOrTaskId?: string;
      /** 方案名称（快照方案） */
      planName?: string;
      /** 任务执行状态（英文）<p><li>waiting_execute:待执行</li><li>executing:执行中</li><li>execute_failure:执行失败</li><li>execute_finish_part:部分完成</li><li>execute_finish:全部完成</li><li>execute_cancel:执行取消</li></p> */
      taskExecuteEnStatusList?: Array<string>;
      /** 会话类型||online:在线咨询;incall:电话咨询 */
      chatType?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageResultSmartChatAnalysisTaskPageResVO;
    }
  }

  /** 查询智能会话分析任务列表 get /smartChatAnalysisTask/page */
  function getSmartChatAnalysisTaskPage(req: ET<GetSmartChatAnalysisTaskPage.Req>, options?: object): Promise<ET<GetSmartChatAnalysisTaskPage.Res>>;

  export module GetTeamExport {
    export interface Req {
      /** 任务id */
      taskId: number;
      /** 咨询开始时间。例如：2024-02-01 08:32:19 */
      consultStartTime?: string;
      /** 咨询结束时间。例如：2024-02-01 08:32:19 */
      consultEndTime?: string;
    }
    export type Res = void;
  }

  /** 下载任务分析结果 get /smartChatAnalysisTask/task/export */
  function getTeamExport(req: ET<GetTeamExport.Req>, options?: object): Promise<ET<GetTeamExport.Res>>;

  export module GetCommonDimensionList {
    export type DimensionResVO = {
      /** 维度类型 */
      type?: string;
      /** 维度信息 */
      dimensionParamList?: Array<DimensionParamVO>;
    };
    export type DimensionParamVO = {
      /** 维度名称 */
      name?: string;
      /** 维度value */
      value?: string;
    };

    export interface Req {
      /** 维度类型。brand:产品维度;location:咨询地区维度 */
      typeList: Array<string>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<DimensionResVO>;
    }
  }

  /** 查询维度列表 get /common/dimensionList */
  function getCommonDimensionList(req: ET<GetCommonDimensionList.Req>, options?: object): Promise<ET<GetCommonDimensionList.Res>>;

  export module GetSystemParamsQuery {
    export type SystemParamsQueryResVO = {
      /** 系统参数类型||OL_AGENT_ASSISTANCE:在线坐席辅助 */
      paramType?: string;
      /** 系统参数key||invocationScheme:调用方案;dataRetrieval:资料检索 */
      paramKey?: string;
      /** 系统参数值|配置参数json| */
      paramValue?: Object;
      /** 系统参数描述 */
      description?: string;
    };
    export type Object = any;

    export interface Req {
      /** 系统参数类型列表||OL_AGENT_ASSISTANCE:在线坐席辅助 */
      paramTypeList?: Array<string>;
      /** 系统参数key列表||invocationScheme:调用方案;dataRetrieval:资料检索 */
      paramKeyList?: Array<string>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<SystemParamsQueryResVO>;
    }
  }

  /** 查询系统参数 get /systemParams/query */
  function getSystemParamsQuery(req: ET<GetSystemParamsQuery.Req>, options?: object): Promise<ET<GetSystemParamsQuery.Res>>;

  export module PostSystemParamsSave {
    export type SystemParamsSaveReqVO = {
      /** 系统参数类型||OL_AGENT_ASSISTANCE:在线坐席辅助 */
      paramType: string;
      /** 系统参数key||invocationScheme:调用方案;dataRetrieval:资料检索 */
      paramKey: string;
      /** 系统参数值|配置参数json| */
      paramValue: Object;
      /** 系统参数描述 */
      description?: string;
    };
    export type Object = any;

    export type Req = Array<SystemParamsSaveReqVO>;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 保存系统参数 post /systemParams/save */
  function postSystemParamsSave(req: ET<PostSystemParamsSave.Req>, options?: object): Promise<ET<PostSystemParamsSave.Res>>;

  export module GetPreviewSnapshot {
    export interface Req {
      /** 方案快照ID */
      planSnapshotId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: string;
    }
  }

  /** 会话分析方案根据快照ID预览 get /smart/chat/analysis/plan/preview/snapshot */
  function getPreviewSnapshot(req: ET<GetPreviewSnapshot.Req>, options?: object): Promise<ET<GetPreviewSnapshot.Res>>;

  export module GetConfigRule {
    export type SmartChatAnalysisRuleResVO = {
      /** live800规则id = 页面上显示的规则ID */
      scaRuleId?: number;
      /** 同步后sca自身规则配置ID */
      scaRuleConfigId?: number;
      /** 规则名称 */
      scaRuleName?: string;
      /** 规则描述 */
      scaRuleDesc?: string;
      /** 规则类型 0:清零项；1:基础加分项；2:扣分项 */
      scaRuleType?: string;
      /** 分数 */
      grade?: number;
      /** 备注 */
      remark?: string;
    };

    export interface Req {
      /** 规则名称 */
      ruleName?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<SmartChatAnalysisRuleResVO>;
    }
  }

  /** 会话分析方案规则选项列表 get /smart/chat/analysis/plan/config/rule */
  function getConfigRule(req: ET<GetConfigRule.Req>, options?: object): Promise<ET<GetConfigRule.Res>>;

  export module GetPermissionList {
    export type PermissionResVO = {
      /** 权限code */
      code?: string;
      /** 权限名称 */
      name?: string;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<PermissionResVO>;
    }
  }

  /** 获取当前登录人权限 get /permission/list */
  function getPermissionList(req?: ET<GetPermissionList.Req>, options?: object): Promise<ET<GetPermissionList.Res>>;

  export module GetPlanMessage {
    export interface Req {
      /** 会话ID */
      messageId: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 根据messageId 查询会话是否存在， get /smart/chat/analysis/plan/message */
  function getPlanMessage(req: ET<GetPlanMessage.Req>, options?: object): Promise<ET<GetPlanMessage.Res>>;

  export module GetPlanGetFmtAnswer {
    export type SmartChatAnalysisPlanTestResVO = {
      /** 回答内容 */
      answerContent?: string;
      /** 大模型智库日志id */
      fmttLogId?: string;
      /** 大模型智库返回的答案是否结束<p><li>true:代表答案全部返回</li><li>false:代表答案未全部返回，需要根据fmttLogId继续获取</li></p> */
      fmttAnswerEnd?: boolean;
    };

    export interface Req {
      /** 大模型智库日志id */
      fmttLogId: string;
      /** 会话id */
      messageId: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: SmartChatAnalysisPlanTestResVO;
    }
  }

  /** 根据fmtLogId获取大模型答案 get /smart/chat/analysis/plan/getFmtAnswer */
  function getPlanGetFmtAnswer(req: ET<GetPlanGetFmtAnswer.Req>, options?: object): Promise<ET<GetPlanGetFmtAnswer.Res>>;

  export module GetCommonTestQQt {
    export type ConsultOnlineChatRecordResultBO = {
      /** 咨询id（msg_id） */
      msgId?: string;
      /** 日志id */
      id?: string;
      /** 会话内容 */
      callcenterContent?: string;
      /** 企业税号 */
      yhdm?: string;
      /** 企业名称 */
      yhmc?: string;
      /** 个人账号 */
      personaldm?: string;
      /** 排队时长（秒） */
      lineUpTime?: string;
      /** 咨询时长（秒） */
      duringConsultTime?: string;
      /** 咨询时间 */
      callDatetime?: string;
      /** 地区维度 */
      live800locationName?: string;
      /** 地区编码 */
      live800Location?: string;
      /** 产品维度 */
      live800brandName?: string;
      /** 产品维度编码 */
      live800brand?: string;
      /** 坐席账号 */
      loginName?: string;
      /** 企业所属经营中心 */
      customerBusinessCenter?: string;
      /** 企业所属经营中心code */
      customerBusinessCenterCode?: string;
      /** 机构所属经营中心 */
      agentBusinessCenter?: string;
      /** 机构所属经营中心 */
      agentBusinessCenterCode?: string;
      /** 是否解决 */
      solution?: string;
      /** 满意程度 */
      services?: string;
      /** 转接前人工咨询id */
      beforePersonId?: string;
      /** 质检 */
      comments?: string;
      /** 服务打分 */
      opScore?: string;
    };

    export interface Req {
      typeList: Array<string>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<ConsultOnlineChatRecordResultBO>;
    }
  }

  /** 查询维度列表 get /common/testQQt */
  function getCommonTestQQt(req: ET<GetCommonTestQQt.Req>, options?: object): Promise<ET<GetCommonTestQQt.Res>>;

  export module GetCommonTest1 {
    export type GroupResponse = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<GroupResponse>;
    }
  }

  /** 根据条件查询坐席组信息列表 get /common/test1 */
  function getCommonTest1(req?: ET<GetCommonTest1.Req>, options?: object): Promise<ET<GetCommonTest1.Res>>;

  export module PostIsdConfigBatchDelete {
    export interface Req {
      /** id列表 */
      idList: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批量删除isd配置 post /isdConfig/batchDelete */
  function postIsdConfigBatchDelete(req: ET<PostIsdConfigBatchDelete.Req>, options?: object): Promise<ET<PostIsdConfigBatchDelete.Res>>;

  export module GetPermissionListByAppId {
    export type PermissionResVO = {
      /** 权限code */
      code?: string;
      /** 权限名称 */
      name?: string;
    };

    export interface Req {
      /** 应用appid */
      appId: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<PermissionResVO>;
    }
  }

  /** 获取当前登录人对应应用的权限 get /permission/listByAppId */
  function getPermissionListByAppId(req: ET<GetPermissionListByAppId.Req>, options?: object): Promise<ET<GetPermissionListByAppId.Res>>;

  export module PostCallGetSkillGroupResourceDetail {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type AggregateGroupDataBO = {
      /** 监控数据 */
      summarizedData?: SummarizedGroupData;
      /** 今日累计 */
      summarizedTodayGroupData?: SummarizedTodayGroupData;
      /** 技能组资源信息列表 */
      monitorInfoList?: Array<SingleGroupData>;
    };
    export type SummarizedGroupData = {
      /** 实时排队数 */
      queuingNum?: number;
      /** 实时振铃数 */
      ringingNum?: number;
      /** 实时通话数 */
      callingNum?: number;
      /** 实时总呼入数 */
      totalNum?: number;
    };
    export type SummarizedTodayGroupData = {
      /** 今日累计呼入总数 */
      totalNum?: number;
      /** 今日累计接通总数 */
      successNum?: number;
      /** 今日累计放弃总数 */
      failNum?: number;
      /** 今日累计接通率，带% */
      connectRatio?: string;
    };
    export type SingleGroupData = {
      /** 技能组资源监控基本信息 */
      baseInfo?: SingleGroupBaseInfo;
      /** 单个技能组资源的实时统计信息 */
      realTimeStatistics?: SingleGroupRealTimeStatisticsInfo;
      /** 单个技能组资源的今日累计信息 */
      todayStatistics?: SingleGroupTodayStatisticsInfo;
    };
    export type SingleGroupBaseInfo = {
      /** 技能组ID */
      skillGroupId?: string;
      /** 技能组名称 */
      skillGroupName?: string;
      /** 繁忙阈值 */
      busyThreshold?: number;
    };
    export type SingleGroupRealTimeStatisticsInfo = {
      /** 实时呼入总数 */
      totalNum?: number;
      /** 实时排队数 */
      queuingNum?: number;
      /** 实时振铃数 */
      ringingNum?: number;
      /** 实时通话数 */
      callingNum?: number;
      /** 实时排队资源占比，带% */
      queuingResourceRatio?: string;
      /** 实时最长等待时长 */
      maxWaitingTime?: string;
    };
    export type SingleGroupTodayStatisticsInfo = {
      /** 今日累计呼入总数 */
      totalNum?: number;
      /** 今日累计接通总数 */
      successNum?: number;
      /** 今日累计放弃总数 */
      failNum?: number;
      /** 今日累计接通率，带% */
      connectRatio?: string;
      /** 今日累计接通率 */
      connectRatioDouble?: number;
      /** 接通率情况||01:正常;02:高于最高阈值;03:低于最低阈值 */
      connectRatioType?: string;
      /** 组接通率下限阈值 */
      groupCallCompletingRateLowerThreshold?: number;
      /** 组接通率上限阈值 */
      groupCallCompletingRateUpperThreshold?: number;
    };

    export interface Req {
      /** 组名称 */
      name?: string;
      /** 经营中心代码 */
      businessCenterCodeList?: Array<string>;
      /** 所属地区id */
      areaIdList?: Array<string>;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:记账咨询;03:财税专家组;04:BC联动;05:人资实务咨询 */
      consultBusinessTypeList?: Array<string>;
      /** 会员类型||01:买断（接通率）;02:买断（人数）;03:VIP;04:非VIP */
      memberTypeList?: Array<string>;
      /** 接通率情况||01:正常;02:高于最高阈值;03:低于最低阈值 */
      connectRatioTypeList?: Array<string>;
      /** 产品大类||01:国税;02:个税;03:记账;04:代账;05:出口退税;06:财税;07:其他 */
      productCategoryList?: Array<string>;
      /** 排序列表。排序字段||默认:default;queues_num:排队数;connect_rate:接通率;排序顺序||desc:降序;asc:生序; */
      sortRuleList?: Array<SortRule>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: AggregateGroupDataBO;
    }
  }

  /** 查询组资源监控信息 post /monitor/call/getSkillGroupResourceDetail */
  function postCallGetSkillGroupResourceDetail(req: ET<PostCallGetSkillGroupResourceDetail.Req>, options?: object): Promise<ET<PostCallGetSkillGroupResourceDetail.Res>>;

  export module GetSmartChatAnalysisTaskGetSpecific {
    export type SmartChatAnalysisTaskVendorModelVO = {
      /** 目标说明 */
      vendor?: SmartChatAnalysisTaskVendorModelItemVO;
      /** 默认目标 */
      modelList?: Array<SmartChatAnalysisTaskVendorModelItemVO>;
    };
    export type SmartChatAnalysisTaskVendorModelItemVO = {
      /** 配置名称 */
      name?: string;
      /** 配置code */
      code?: string;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<SmartChatAnalysisTaskVendorModelVO>;
    }
  }

  /** 获取指定大模型配置列表 get /smartChatAnalysisTask/getSpecific */
  function getSmartChatAnalysisTaskGetSpecific(req?: ET<GetSmartChatAnalysisTaskGetSpecific.Req>, options?: object): Promise<ET<GetSmartChatAnalysisTaskGetSpecific.Res>>;

  export module PostTaskCancel {
    export interface Req {
      /** 任务id */
      taskId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 取消智能会话分析任务 post /smartChatAnalysisTask/task/cancel */
  function postTaskCancel(req: ET<PostTaskCancel.Req>, options?: object): Promise<ET<PostTaskCancel.Res>>;

  export module GetChatAnalysisFilterConfigPage {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type PageIsdChatAnalysisFilterConfigQueryResVO = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<IsdChatAnalysisFilterConfigQueryResVO>;
    };
    export type IsdChatAnalysisFilterConfigQueryResVO = {
      /** ID */
      id?: number;
      /** 会话分析任务ID */
      chatAnalysisTaskId?: number;
      /** 过滤配置列表 */
      filterConfigList?: Array<IsdChatAnalysisFilterConfigCommonVO>;
      /** 不展示配置列表 */
      notDisplayConfigList?: Array<IsdChatAnalysisFilterConfigCommonVO>;
      /** 总结字段|大模型对会话的总结存放字段| */
      summaryField?: string;
      /** 状态||in_process:进行中;suspended:暂停 */
      status?: string;
      /** 状态名称 */
      statusName?: string;
      /** 对话数量 */
      chatSessionCount?: number;
      /** 创建日期 */
      createDate?: string;
      /** 修改日期 */
      modifyDate?: string;
      /** 创建人 */
      creatorId?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 修改人 */
      modifierId?: string;
      /** 修改人名称 */
      modifierName?: string;
    };
    export type IsdChatAnalysisFilterConfigCommonVO = {
      /** 字段名称 */
      field?: string;
      /** 字段值 */
      value?: string;
      /** 展示名称 */
      displayName?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 是否查询总数，true：查询总数，false：不查询 */
      queryCount?: boolean;
      /** 排序列表 */
      sortRuleList?: Array<SortRule>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageIsdChatAnalysisFilterConfigQueryResVO;
    }
  }

  /** 分页查询ISD会话分析过滤配置 post /isd/chatAnalysisFilterConfig/page */
  function getChatAnalysisFilterConfigPage(req: ET<GetChatAnalysisFilterConfigPage.Req>, options?: object): Promise<ET<GetChatAnalysisFilterConfigPage.Res>>;

  export module GetChatAnalysisFilterConfigDetail {
    export type IsdChatAnalysisFilterConfigQueryResVO = {
      /** ID */
      id?: number;
      /** 会话分析任务ID */
      chatAnalysisTaskId?: number;
      /** 过滤配置列表 */
      filterConfigList?: Array<IsdChatAnalysisFilterConfigCommonVO>;
      /** 不展示配置列表 */
      notDisplayConfigList?: Array<IsdChatAnalysisFilterConfigCommonVO>;
      /** 总结字段|大模型对会话的总结存放字段| */
      summaryField?: string;
      /** 状态||in_process:进行中;suspended:暂停 */
      status?: string;
      /** 状态名称 */
      statusName?: string;
      /** 对话数量 */
      chatSessionCount?: number;
      /** 创建日期 */
      createDate?: string;
      /** 修改日期 */
      modifyDate?: string;
      /** 创建人 */
      creatorId?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 修改人 */
      modifierId?: string;
      /** 修改人名称 */
      modifierName?: string;
    };
    export type IsdChatAnalysisFilterConfigCommonVO = {
      /** 字段名称 */
      field?: string;
      /** 字段值 */
      value?: string;
      /** 展示名称 */
      displayName?: string;
    };

    export interface Req {
      id?: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: IsdChatAnalysisFilterConfigQueryResVO;
    }
  }

  /** 查询ISD会话分析过滤配置详情 get /isd/chatAnalysisFilterConfig/detail */
  function getChatAnalysisFilterConfigDetail(req: ET<GetChatAnalysisFilterConfigDetail.Req>, options?: object): Promise<ET<GetChatAnalysisFilterConfigDetail.Res>>;

  export module PostChatAnalysisFilterConfigSave {
    export type IsdChatAnalysisFilterConfigCommonVO = {
      /** 字段名称 */
      field?: string;
      /** 字段值 */
      value?: string;
      /** 展示名称 */
      displayName?: string;
    };

    export interface Req {
      /** 会话分析任务ID */
      chatAnalysisTaskId?: number;
      /** 过滤配置列表 */
      filterConfigList?: Array<IsdChatAnalysisFilterConfigCommonVO>;
      /** 不展示配置列表 */
      notDisplayConfigList?: Array<IsdChatAnalysisFilterConfigCommonVO>;
      /** 总结字段|大模型对会话的总结存放字段| */
      summaryField?: string;
      /** 状态||in_process:进行中;suspended:暂停 */
      status?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 新增ISD会话分析过滤配置 post /isd/chatAnalysisFilterConfig/save */
  function postChatAnalysisFilterConfigSave(req: ET<PostChatAnalysisFilterConfigSave.Req>, options?: object): Promise<ET<PostChatAnalysisFilterConfigSave.Res>>;

  export module PostChatAnalysisFilterConfigUpdate {
    export type IsdChatAnalysisFilterConfigCommonVO = {
      /** 字段名称 */
      field?: string;
      /** 字段值 */
      value?: string;
      /** 展示名称 */
      displayName?: string;
    };

    export interface Req {
      /** ID */
      id?: number;
      /** 会话分析任务ID */
      chatAnalysisTaskId?: number;
      /** 过滤配置列表 */
      filterConfigList?: Array<IsdChatAnalysisFilterConfigCommonVO>;
      /** 不展示配置列表 */
      notDisplayConfigList?: Array<IsdChatAnalysisFilterConfigCommonVO>;
      /** 总结字段|大模型对会话的总结存放字段| */
      summaryField?: string;
      /** 状态||in_process:进行中;suspended:暂停 */
      status?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 修改ISD会话分析过滤配置 post /isd/chatAnalysisFilterConfig/update */
  function postChatAnalysisFilterConfigUpdate(req: ET<PostChatAnalysisFilterConfigUpdate.Req>, options?: object): Promise<ET<PostChatAnalysisFilterConfigUpdate.Res>>;

  export module PostStatusUpdate {
    export interface Req {
      id?: number;
      /** 状态||in_process:进行中;suspended:暂停 */
      status?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 修改ISD会话分析过滤配置状态 post /isd/chatAnalysisFilterConfig/status/update */
  function postStatusUpdate(req: ET<PostStatusUpdate.Req>, options?: object): Promise<ET<PostStatusUpdate.Res>>;

  export module GetTaskExport {
    export interface Req {
      /** 会话分析任务ID */
      chatAnalysisTaskId?: number;
      /** 筛选配置ID */
      id?: number;
    }
    export type Res = void;
  }

  /** 下载会话分析任务结果 get /isd/chatAnalysisFilterConfig/task/export */
  function getTaskExport(req: ET<GetTaskExport.Req>, options?: object): Promise<ET<GetTaskExport.Res>>;

  export module PostOnlineGetOnlineMonitor {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type OnlineMonitorResponse = {
      /** 实时统计数据 */
      summarizedData?: OnlineSummarizedRealTimeData;
      /** 今日累计 */
      summarizedTodayGroupData?: OnlineSummarizedTodayGroupData;
      /** 技能组资源信息列表 */
      monitorInfoList?: Array<OnlineSingleGroupData>;
    };
    export type OnlineSummarizedRealTimeData = {
      /** 实时咨询数 */
      consultNum?: number;
      /** 实时接通总数 */
      connectedNum?: number;
      /** 实时排队总数 */
      queuingNum?: number;
    };
    export type OnlineSummarizedTodayGroupData = {
      /** 今日累计咨询数 */
      consultNum?: number;
      /** 今日累计接通总数 */
      connectedNum?: number;
      /** 今日累计放弃总数 */
      abandonNum?: number;
      /** 今日累计接通率，带% */
      connectRatio?: string;
    };
    export type OnlineSingleGroupData = {
      /** 技能组资源监控基本信息 */
      baseInfo?: OnlineSingleGroupBaseInfo;
      /** 单个技能组资源的实时统计信息 */
      realTimeStatistics?: OnlineSingleGroupRealTimeStatisticsInfo;
      /** 单个技能组资源的今日累计信息 */
      todayStatistics?: OnlineSingleGroupTodayStatisticsInfo;
    };
    export type OnlineSingleGroupBaseInfo = {
      /** 技能组ID */
      skillGroupId?: string;
      /** 技能组名称 */
      skillGroupName?: string;
    };
    export type OnlineSingleGroupRealTimeStatisticsInfo = {
      /** 实时排队数 */
      queuingNum?: number;
      /** 实时通话数 */
      callingNum?: number;
      /** 坐席在线数量 */
      agentOnlineNum?: number;
      /** 坐席忙碌数量 */
      agentBusyNum?: number;
      /** 坐席离开数量 */
      agentLevelNum?: number;
      /** 坐席隐身数量 */
      agentStealthNum?: number;
    };
    export type OnlineSingleGroupTodayStatisticsInfo = {
      /** 今日累计咨询数 */
      consultNum?: number;
      /** 今日累计接通总数 */
      connectedNum?: number;
      /** 今日累计放弃总数 */
      abandonNum?: number;
      /** 今日累计接通率，带% */
      connectRatio?: string;
      /** 接通率情况||01:正常;02:高于最高阈值;03:低于最低阈值 */
      connectRatioType?: string;
      /** 组接通率下限阈值 */
      groupCallCompletingRateLowerThreshold?: number;
      /** 组接通率上限阈值 */
      groupCallCompletingRateUpperThreshold?: number;
    };

    export interface Req {
      /** 组名称 */
      name?: string;
      /** 经营中心代码 */
      businessCenterCodeList?: Array<string>;
      /** 所属地区id */
      areaIdList?: Array<string>;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:记账咨询;03:财税专家组;04:BC联动;05:人资实务咨询 */
      consultBusinessTypeList?: Array<string>;
      /** 会员类型||01:买断（接通率）;02:买断（人数）;03:VIP;04:非VIP */
      memberTypeList?: Array<string>;
      /** 接通率情况||01:正常;02:高于最高阈值;03:低于最低阈值 */
      connectRatioTypeList?: Array<string>;
      /** 产品大类||01:国税;02:个税;03:记账;04:代账;05:出口退税;06:财税;07:其他 */
      productCategoryList?: Array<string>;
      /** 排序列表。排序字段||默认:default;queues_num:排队数;connect_rate:接通率;排序顺序||desc:降序;asc:生序; */
      sortRuleList?: Array<SortRule>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: OnlineMonitorResponse;
    }
  }

  /** 查询在线整体监控 post /monitor/online/getOnlineMonitor */
  function postOnlineGetOnlineMonitor(req: ET<PostOnlineGetOnlineMonitor.Req>, options?: object): Promise<ET<PostOnlineGetOnlineMonitor.Res>>;

  export module GetPreviewPlan {
    export interface Req {
      /** 方案ID */
      planId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: string;
    }
  }

  /** 会话分析方案根据方案ID预览 get /smart/chat/analysis/plan/preview/plan */
  function getPreviewPlan(req: ET<GetPreviewPlan.Req>, options?: object): Promise<ET<GetPreviewPlan.Res>>;

  export module GetBrainDict {
    export type BrainSystemDomainDictResVO = {
      /** 领域id */
      domainId?: string;
      /** 领域名称 */
      name?: string;
      /** 技术路线 */
      routes?: Array<string>;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<BrainSystemDomainDictResVO>;
    }
  }

  /** 获取决策系统领域字典 get /brain/dict */
  function getBrainDict(req?: ET<GetBrainDict.Req>, options?: object): Promise<ET<GetBrainDict.Res>>;

  export module GetOlConsultMsgGetInConsultOnlineChatRecordResult {
    export type ConsultOnlineChatRecordResultVO = {
      /** 会话结果任务类型||offline:离线分析;intime:实时分析 */
      taskType?: string;
      /** 咨询id（msg_id） */
      msgId?: string;
      /** 日志id */
      logId?: string;
      /** 会话内容 */
      msgChatContent?: string;
      /** 咨询开始时间 */
      consultStartDate?: string;
      /** 咨询结束时间 */
      consultEndDate?: string;
      /** 地区编码 */
      location?: string;
      /** 产品维度编码 */
      brand?: string;
      /** 坐席账号userId */
      agentLoginName?: string;
      /** 坐席名称 */
      agentName?: string;
      /** 技能组id */
      groupId?: string;
      /** 客户经理trueId9月迭代离线任务暂不支持返回该字段，实时任务支持 */
      customerManagerTrueId?: string;
      /** 咨询所属经营中心代码 */
      consultBusinessCenterCode?: string;
      /** 解决项代码 */
      solutionCode?: string;
      /** 满意程度代码 */
      servicesCode?: string;
      /** 转接前人工咨询id */
      beforeMsgId?: string;
      /** 转接前人工咨询内容 */
      beforeMsgChatContent?: string;
      /** 质检 */
      comments?: string;
      /** 服务打分 */
      opScore?: string;
      /** 用户名称,olhelp_consult_user_info#personalmc */
      userName?: string;
      /** 用户手机号,olhelp_consult_user_info#personaldm */
      mobile?: string;
      /** 企业云上标准id,olhelp_consult_user_info表中的customer_id */
      cloudCompanyId?: number;
      /** 机构云上标准id,olhelp_consult_user_info表中的agency_id */
      cloudAgencyId?: number;
      /** 企业名称,olhelp_consult_user_info#yhmc。实时分析可能会有，离线分析没有 */
      companyName?: string;
      /** 机构名称，olhelp_consult_user_info#agency_name 。实时分析可能会有，离线分析没有 */
      agencyName?: string;
      /** 咨询所属经营中心名称 */
      consultBusinessCenterName?: string;
      /** 产品维度名称 */
      brandName?: string;
      /** 地区名称 */
      locationName?: string;
      /** 咨询用户信息表主键ID */
      consultUserInfoId?: number;
    };

    export interface Req {
      msgIdList: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<ConsultOnlineChatRecordResultVO>;
    }
  }

  /** 获取在线会话分析专用的人工咨询信息 get /olConsultMsg/getInConsultOnlineChatRecordResult */
  function getOlConsultMsgGetInConsultOnlineChatRecordResult(req: ET<GetOlConsultMsgGetInConsultOnlineChatRecordResult.Req>, options?: object): Promise<ET<GetOlConsultMsgGetInConsultOnlineChatRecordResult.Res>>;

  export module GetOlConsultMsgGetOfflineConsultOnlineChatRecordResult {
    export type ConsultOnlineChatRecordResultVO = {
      /** 会话结果任务类型||offline:离线分析;intime:实时分析 */
      taskType?: string;
      /** 咨询id（msg_id） */
      msgId?: string;
      /** 日志id */
      logId?: string;
      /** 会话内容 */
      msgChatContent?: string;
      /** 咨询开始时间 */
      consultStartDate?: string;
      /** 咨询结束时间 */
      consultEndDate?: string;
      /** 地区编码 */
      location?: string;
      /** 产品维度编码 */
      brand?: string;
      /** 坐席账号userId */
      agentLoginName?: string;
      /** 坐席名称 */
      agentName?: string;
      /** 技能组id */
      groupId?: string;
      /** 客户经理trueId9月迭代离线任务暂不支持返回该字段，实时任务支持 */
      customerManagerTrueId?: string;
      /** 咨询所属经营中心代码 */
      consultBusinessCenterCode?: string;
      /** 解决项代码 */
      solutionCode?: string;
      /** 满意程度代码 */
      servicesCode?: string;
      /** 转接前人工咨询id */
      beforeMsgId?: string;
      /** 转接前人工咨询内容 */
      beforeMsgChatContent?: string;
      /** 质检 */
      comments?: string;
      /** 服务打分 */
      opScore?: string;
      /** 用户名称,olhelp_consult_user_info#personalmc */
      userName?: string;
      /** 用户手机号,olhelp_consult_user_info#personaldm */
      mobile?: string;
      /** 企业云上标准id,olhelp_consult_user_info表中的customer_id */
      cloudCompanyId?: number;
      /** 机构云上标准id,olhelp_consult_user_info表中的agency_id */
      cloudAgencyId?: number;
      /** 企业名称,olhelp_consult_user_info#yhmc。实时分析可能会有，离线分析没有 */
      companyName?: string;
      /** 机构名称，olhelp_consult_user_info#agency_name 。实时分析可能会有，离线分析没有 */
      agencyName?: string;
      /** 咨询所属经营中心名称 */
      consultBusinessCenterName?: string;
      /** 产品维度名称 */
      brandName?: string;
      /** 地区名称 */
      locationName?: string;
      /** 咨询用户信息表主键ID */
      consultUserInfoId?: number;
    };

    export interface Req {
      msgIdList: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<ConsultOnlineChatRecordResultVO>;
    }
  }

  /** 获取离线会话分析专用的人工咨询信息 get /olConsultMsg/getOfflineConsultOnlineChatRecordResult */
  function getOlConsultMsgGetOfflineConsultOnlineChatRecordResult(req: ET<GetOlConsultMsgGetOfflineConsultOnlineChatRecordResult.Req>, options?: object): Promise<ET<GetOlConsultMsgGetOfflineConsultOnlineChatRecordResult.Res>>;

  export module PostConsulttaskrulePageList {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type PageConsultTaskRuleVO = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ConsultTaskRuleVO>;
    };
    export type ConsultTaskRuleVO = {
      /** 条件信息列表 */
      conditionInfos?: Array<ConsultRuleDefinitionConditionVO>;
      /** id */
      id?: number;
      /** 咨询方式||robot:机器人，online:在线咨询，incall:电话咨询 */
      consultWay?: string;
      /** 咨询方式文本||robot:机器人，online:在线咨询，incall:电话咨询 */
      consultWayText?: string;
      /** 分配类型||group:组，user:人 */
      allotType?: string;
      /** 分配ID */
      allotId?: string;
      /** 分配ID对应的文本（员工姓名或组名称） */
      allotIdText?: string;
      /** 待办内容 */
      todoContent?: ConsultTaskRuleTodoRuleVO;
      /** 创建人ID */
      creatorId?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改人 */
      lastModifierName?: string;
      /** 修改时间 */
      modifyTime?: string;
      /** 规则名称 */
      ruleName?: string;
      /** 待办创建方式（英文）||new:创建新待办，parent:创建父待办 */
      todoCreateEnType?: string;
      /** 备注 */
      remark?: string;
    };
    export type ConsultRuleDefinitionConditionVO = {
      /** id */
      id?: number;
      /** 业务类型||consult_badcase_create_todo:咨询排队放弃和不满意记录自动生成代办 */
      businessType?: string;
      /** 规则唯一ID */
      ruleUnqId?: string;
      /** 条件KEY||overall_answer_rate:综合接通率;trigger_scene:触发场景;location:地区;business_center:经营中心;vip:VIP等级;business_type:业务类型;user_type:会员类型;cpdl:产品大类; */
      conditionKey?: string;
      /** 条件KEY||overall_answer_rate:综合接通率;trigger_scene:触发场景;location:地区;business_center:经营中心;vip:VIP等级;business_type:业务类型;user_type:会员类型;cpdl:产品大类; */
      conditionKeyText?: string;
      /** 条件配置 */
      conditionConfiguration?: string;
      /** 条件配置text */
      conditionConfigurationText?: Array<string>;
      /** 条件值 */
      conditionValue?: string;
      /** 条件值对应的文本 */
      conditionValueText?: string;
      /** 操作符 */
      operator?: string;
      /** 操作符对应的文本 */
      operatorText?: string;
      /** 排序 */
      sort?: number;
      /** 创建人ID */
      creatorId?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改人名称 */
      lastModifierName?: string;
      /** 修改时间 */
      modifyTime?: string;
    };
    export type ConsultTaskRuleTodoRuleVO = {
      /** 代办名称 */
      title?: string;
      /** 格式化待办名称 */
      formatTitle?: string;
      /** 代办类型 */
      todoType?: string;
      /** 代办类型文本 */
      todoTypeText?: string;
      /** 完成时间类型||minutes:分钟，day：天 */
      finishType?: string;
      /** 完成时间值 */
      finishValue?: string;
      /** 格式化完成时间值 */
      formatFinishValue?: string;
      /** 归属公司 */
      allowCompany?: string;
      /** 归属公司文本 */
      allowCompanyText?: string;
      /** 待办创建方式（英文）||new:创建新待办，parent:创建父待办 */
      todoCreateEnType?: string;
      /** 角色兜底处理人 */
      undercoverPerson?: string;
      /** 角色兜底处理人名称 */
      undercoverPersonName?: string;
      /** 角色业务类型 */
      roleBusinessType?: string;
      /** 角色所属fzgsdm */
      roleFzgsdm?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 是否查询总数，true：查询总数，false：不查询 */
      queryCount?: boolean;
      /** 排序列表 */
      sortRuleList?: Array<SortRule>;
      /** id */
      id?: number;
      /** 咨询方式||robot:机器人，online:在线咨询，incall:电话咨询 */
      consultWay?: Array<string>;
      /** 触发场景 */
      triggerScene?: Array<string>;
      /** 经营中心 */
      businessCenter?: Array<string>;
      /** 地区 */
      location?: Array<string>;
      /** 业务类型 */
      businessType?: Array<string>;
      /** 会员类型 */
      userType?: Array<string>;
      /** 产品大类 */
      cpdl?: Array<string>;
      /** VIP等级 */
      vip?: string;
      /** 待办执行组 */
      allotGroup?: Array<string>;
      /** 规则名称 */
      ruleName?: string;
      /** 执行方 */
      executePartyList?: Array<string>;
      /** 待办类型 */
      todoTypeList?: Array<string>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageConsultTaskRuleVO;
    }
  }

  /** post /consulttaskrule/pageList */
  function postConsulttaskrulePageList(req: ET<PostConsulttaskrulePageList.Req>, options?: object): Promise<ET<PostConsulttaskrulePageList.Res>>;

  export module GetConsulttaskruleDetail {
    export type ConsultTaskRuleVO = {
      /** 条件信息列表 */
      conditionInfos?: Array<ConsultRuleDefinitionConditionVO>;
      /** id */
      id?: number;
      /** 咨询方式||robot:机器人，online:在线咨询，incall:电话咨询 */
      consultWay?: string;
      /** 咨询方式文本||robot:机器人，online:在线咨询，incall:电话咨询 */
      consultWayText?: string;
      /** 分配类型||group:组，user:人 */
      allotType?: string;
      /** 分配ID */
      allotId?: string;
      /** 分配ID对应的文本（员工姓名或组名称） */
      allotIdText?: string;
      /** 待办内容 */
      todoContent?: ConsultTaskRuleTodoRuleVO;
      /** 创建人ID */
      creatorId?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改人 */
      lastModifierName?: string;
      /** 修改时间 */
      modifyTime?: string;
      /** 规则名称 */
      ruleName?: string;
      /** 待办创建方式（英文）||new:创建新待办，parent:创建父待办 */
      todoCreateEnType?: string;
      /** 备注 */
      remark?: string;
    };
    export type ConsultRuleDefinitionConditionVO = {
      /** id */
      id?: number;
      /** 业务类型||consult_badcase_create_todo:咨询排队放弃和不满意记录自动生成代办 */
      businessType?: string;
      /** 规则唯一ID */
      ruleUnqId?: string;
      /** 条件KEY||overall_answer_rate:综合接通率;trigger_scene:触发场景;location:地区;business_center:经营中心;vip:VIP等级;business_type:业务类型;user_type:会员类型;cpdl:产品大类; */
      conditionKey?: string;
      /** 条件KEY||overall_answer_rate:综合接通率;trigger_scene:触发场景;location:地区;business_center:经营中心;vip:VIP等级;business_type:业务类型;user_type:会员类型;cpdl:产品大类; */
      conditionKeyText?: string;
      /** 条件配置 */
      conditionConfiguration?: string;
      /** 条件配置text */
      conditionConfigurationText?: Array<string>;
      /** 条件值 */
      conditionValue?: string;
      /** 条件值对应的文本 */
      conditionValueText?: string;
      /** 操作符 */
      operator?: string;
      /** 操作符对应的文本 */
      operatorText?: string;
      /** 排序 */
      sort?: number;
      /** 创建人ID */
      creatorId?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人 */
      lastModifier?: string;
      /** 最后修改人名称 */
      lastModifierName?: string;
      /** 修改时间 */
      modifyTime?: string;
    };
    export type ConsultTaskRuleTodoRuleVO = {
      /** 代办名称 */
      title?: string;
      /** 格式化待办名称 */
      formatTitle?: string;
      /** 代办类型 */
      todoType?: string;
      /** 代办类型文本 */
      todoTypeText?: string;
      /** 完成时间类型||minutes:分钟，day：天 */
      finishType?: string;
      /** 完成时间值 */
      finishValue?: string;
      /** 格式化完成时间值 */
      formatFinishValue?: string;
      /** 归属公司 */
      allowCompany?: string;
      /** 归属公司文本 */
      allowCompanyText?: string;
      /** 待办创建方式（英文）||new:创建新待办，parent:创建父待办 */
      todoCreateEnType?: string;
      /** 角色兜底处理人 */
      undercoverPerson?: string;
      /** 角色兜底处理人名称 */
      undercoverPersonName?: string;
      /** 角色业务类型 */
      roleBusinessType?: string;
      /** 角色所属fzgsdm */
      roleFzgsdm?: string;
    };

    export interface Req {
      /** 主键 */
      id: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: ConsultTaskRuleVO;
    }
  }

  /** 根据主键获取详细信息。 get /consulttaskrule/detail */
  function getConsulttaskruleDetail(req: ET<GetConsulttaskruleDetail.Req>, options?: object): Promise<ET<GetConsulttaskruleDetail.Res>>;

  export module PostConsulttaskruleModify {
    export type ConsultRuleDefinitionConditionSaveVO = {
      /** 条件KEY||overall_answer_rate:综合接通率;trigger_scene:触发场景;location:地区;business_center:经营中心;vip:VIP等级;business_type:业务类型;user_type:会员类型;cpdl:产品大类; */
      conditionKey: string;
      /** 条件配置 */
      conditionConfiguration?: string;
      /** 条件值 */
      conditionValue: string;
      /** 操作符 */
      operator: string;
      /** 排序 */
      sort?: number;
    };
    export type ConsultTaskRuleTodoRuleVO = {
      /** 代办名称 */
      title?: string;
      /** 格式化待办名称 */
      formatTitle?: string;
      /** 代办类型 */
      todoType?: string;
      /** 代办类型文本 */
      todoTypeText?: string;
      /** 完成时间类型||minutes:分钟，day：天 */
      finishType?: string;
      /** 完成时间值 */
      finishValue?: string;
      /** 格式化完成时间值 */
      formatFinishValue?: string;
      /** 归属公司 */
      allowCompany?: string;
      /** 归属公司文本 */
      allowCompanyText?: string;
      /** 待办创建方式（英文）||new:创建新待办，parent:创建父待办 */
      todoCreateEnType?: string;
      /** 角色兜底处理人 */
      undercoverPerson?: string;
      /** 角色兜底处理人名称 */
      undercoverPersonName?: string;
      /** 角色业务类型 */
      roleBusinessType?: string;
      /** 角色所属fzgsdm */
      roleFzgsdm?: string;
    };

    export interface Req {
      /** 条件信息列表 */
      conditionInfos?: Array<ConsultRuleDefinitionConditionSaveVO>;
      /** id */
      id?: number;
      /** 咨询方式||robot:机器人，online:在线咨询，incall:电话咨询 */
      consultWay: string;
      /** 分配类型||group:组，user:人 */
      allotType: string;
      /** 分配ID */
      allotId: string;
      /** 待办内容 */
      todoContent?: ConsultTaskRuleTodoRuleVO;
      /** 规则名称 */
      ruleName?: string;
      /** 备注 */
      remark?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** post /consulttaskrule/modify */
  function postConsulttaskruleModify(req: ET<PostConsulttaskruleModify.Req>, options?: object): Promise<ET<PostConsulttaskruleModify.Res>>;

  export module PostConsulttaskruleSave {
    export type ConsultRuleDefinitionConditionSaveVO = {
      /** 条件KEY||overall_answer_rate:综合接通率;trigger_scene:触发场景;location:地区;business_center:经营中心;vip:VIP等级;business_type:业务类型;user_type:会员类型;cpdl:产品大类; */
      conditionKey: string;
      /** 条件配置 */
      conditionConfiguration?: string;
      /** 条件值 */
      conditionValue: string;
      /** 操作符 */
      operator: string;
      /** 排序 */
      sort?: number;
    };
    export type ConsultTaskRuleTodoRuleVO = {
      /** 代办名称 */
      title?: string;
      /** 格式化待办名称 */
      formatTitle?: string;
      /** 代办类型 */
      todoType?: string;
      /** 代办类型文本 */
      todoTypeText?: string;
      /** 完成时间类型||minutes:分钟，day：天 */
      finishType?: string;
      /** 完成时间值 */
      finishValue?: string;
      /** 格式化完成时间值 */
      formatFinishValue?: string;
      /** 归属公司 */
      allowCompany?: string;
      /** 归属公司文本 */
      allowCompanyText?: string;
      /** 待办创建方式（英文）||new:创建新待办，parent:创建父待办 */
      todoCreateEnType?: string;
      /** 角色兜底处理人 */
      undercoverPerson?: string;
      /** 角色兜底处理人名称 */
      undercoverPersonName?: string;
      /** 角色业务类型 */
      roleBusinessType?: string;
      /** 角色所属fzgsdm */
      roleFzgsdm?: string;
    };

    export interface Req {
      /** 条件信息列表 */
      conditionInfos?: Array<ConsultRuleDefinitionConditionSaveVO>;
      /** id */
      id?: number;
      /** 咨询方式||robot:机器人，online:在线咨询，incall:电话咨询 */
      consultWay: string;
      /** 分配类型||group:组，user:人 */
      allotType: string;
      /** 分配ID */
      allotId: string;
      /** 待办内容 */
      todoContent?: ConsultTaskRuleTodoRuleVO;
      /** 规则名称 */
      ruleName?: string;
      /** 备注 */
      remark?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: number;
    }
  }

  /** post /consulttaskrule/save */
  function postConsulttaskruleSave(req: ET<PostConsulttaskruleSave.Req>, options?: object): Promise<ET<PostConsulttaskruleSave.Res>>;

  export module PostConsulttaskruleDeleteTaskRule {
    export interface Req {
      /** 规则ID */
      id: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** post /consulttaskrule/deleteTaskRule */
  function postConsulttaskruleDeleteTaskRule(req: ET<PostConsulttaskruleDeleteTaskRule.Req>, options?: object): Promise<ET<PostConsulttaskruleDeleteTaskRule.Res>>;

  export module PostExecInTimeTask {
    export type Req = any;
    export type Res = any;
  }

  /** post /external/smartChatAnalysis/exec/inTimeTask */
  function postExecInTimeTask(req?: ET<PostExecInTimeTask.Req>, options?: object): Promise<ET<PostExecInTimeTask.Res>>;

  export module PostSmartChatAnalysisExecInTimeTask {
    export interface Req {
      /** 应用分配appId */
      fmttAppId: string;
      /** 实时任务ID */
      taskId: number;
      /** 咨询msgId合集 */
      msgIdList: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 执行实时任务 post /external/smartChatAnalysis/execInTimeTask */
  function postSmartChatAnalysisExecInTimeTask(req: ET<PostSmartChatAnalysisExecInTimeTask.Req>, options?: object): Promise<ET<PostSmartChatAnalysisExecInTimeTask.Res>>;

  export module PostAllSystemAndModuleUpdate {
    export type SystemAndModuleConfigReqVO = {
      /** systemCode */
      systemCode?: string;
      /** name */
      name?: string;
      /** 对应的客群编码 */
      adminCompanyCodes?: Array<string>;
      /** 地区代码 */
      locationCodeList?: Array<string>;
      /** 排序。数字越小排序越靠前 */
      order?: number;
      /** moduleConfig */
      moduleConfig?: Array<ModuleConfigDTO>;
    };
    export type ModuleConfigDTO = {
      /** module */
      module?: string;
      /** name */
      name?: string;
      /** 禅道模块代码 */
      zentaoModule?: string;
      /** 禅道产品代码 */
      zentaoSystemCode?: string;
      /** 地区代码 */
      locationCodeList?: Array<string>;
    };

    export type Req = Array<SystemAndModuleConfigReqVO>;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 更新systemParam表里的所有快问配置 post /isdConfig/allSystemAndModule/update */
  function postAllSystemAndModuleUpdate(req: ET<PostAllSystemAndModuleUpdate.Req>, options?: object): Promise<ET<PostAllSystemAndModuleUpdate.Res>>;

  export module GetAllSystemAndModuleQuery {
    export type SystemAndModuleConfigResVO = {
      /** systemCode */
      systemCode?: string;
      /** name */
      name?: string;
      /** 对应的客群编码 */
      adminCompanyCodes?: Array<string>;
      /** 地区代码 */
      locationCodeList?: Array<string>;
      /** 排序。数字越小排序越靠前 */
      order?: number;
      /** moduleConfig */
      moduleConfig?: Array<ModuleConfigDTO>;
    };
    export type ModuleConfigDTO = {
      /** module */
      module?: string;
      /** name */
      name?: string;
      /** 禅道模块代码 */
      zentaoModule?: string;
      /** 禅道产品代码 */
      zentaoSystemCode?: string;
      /** 地区代码 */
      locationCodeList?: Array<string>;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<SystemAndModuleConfigResVO>;
    }
  }

  /** 查询systemParam表里的所有快问配置 get /isdConfig/allSystemAndModule/query */
  function getAllSystemAndModuleQuery(req?: ET<GetAllSystemAndModuleQuery.Req>, options?: object): Promise<ET<GetAllSystemAndModuleQuery.Res>>;

  export module PostConsulttaskruleMatch {
    export interface Req {
      /** 呼叫ID */
      globalcallLeg?: string;
      /** 呼叫明细ID */
      callLeg?: string;
      /** 受理的咨询技能组id，非skillId,没有则为空 */
      groupId?: number;
      /** 坐席工号 */
      workId?: string;
      /** 动作场景，必传。000:进入live800;101:进入机器人模式;102:机器人评价;201:进入人工模式;202:人工评价;203:人工接通;301:进人工排队;302:放弃人工排队;401:客户主动路由转接;402:被转接;999:咨询结束; */
      scene?: string;
      /** 触发动作场景的时间，必传。精确到毫秒，格式yyyy-MM-dd HH:mm:ss SSS */
      time?: string;
      /** 咨询唯一id，必传 */
      logId?: string;
      /** 800的msgId，没有则为空 */
      msgId?: string;
      /** 800的sessionId，没有则为空 */
      sessionId?: string;
      /** 来源组Id */
      sourceGroupId?: number;
      /** 来源组状态||on_line:在线；off_line:离线 */
      sourceGroupState?: string;
      /** 受理的咨询坐席id，没有则为空 */
      agentId?: number;
      /** 渠道/打开方式。PC:电脑;TOOL:工具 */
      openMode?: string;
      /** 咨询状态;robot_consult:机器人咨询;manual_consult;人工咨询未开智能助理;interact_manual:人工咨询开启智能助理 */
      consultState?: string;
      /** 客户信息id。取咨询链接中memo字段中consultUserInfoId字段 */
      consultUserInfoId?: number;
      /** 扩展字段 */
      extend?: string;
      /** 客户ip */
      ip?: string;
    }
    export type Res = string;
  }

  /** post /consulttaskrule/match */
  function postConsulttaskruleMatch(req: ET<PostConsulttaskruleMatch.Req>, options?: object): Promise<ET<PostConsulttaskruleMatch.Res>>;

  export module PostSaveCheck {
    export type SmartChatAnalysisTaskSaveCheckResVO = {
      /** 是否校验成功。True:校验成功；false：校验失败 */
      isCheckSuccess?: boolean;
      /** 分析会话数量 */
      analysisMsgIdNum?: number;
      /** 业务校验ID,下载错误文件使用 */
      checkId?: string;
    };

    export interface Req {
      /** 任务名称 */
      name: string;
      /** 方案id */
      planId: number;
      /** 方案名称 */
      planName: string;
      /** 方案快照id */
      planSnapshotId: number;
      /** 选择会话类型|任务选择的会话类型|1：按条件筛选；2：指定会话id(离线分析)；3：自定义数据源 */
      selectChatType: string;
      /** 会话类型||online:在线咨询;incall:电话咨询 */
      chatType: string;
      /** 过滤条件json字符串 */
      filterConditionJson?: string;
      /** 人工咨询ID合集 */
      consultMsgIdList?: Array<string>;
      /** 任务类型||offline:离线分析;intime:实时分析 */
      taskType: string;
      /** 任务开始时间类型（英文）||immediate:立即运行;specific:指定开启时间 */
      taskStartTimeEnType: string;
      /** 指定开始时间 */
      appointStartTime?: string;
      /** 指定结束时间 */
      appointEndTime?: string;
      /** 大模型APPID */
      fmttAppId: string;
      /** 大模型厂商代码（英文）||qwen:通义千问;zhipu:智谱;baidu:文心一言 */
      fmttVendorEnCode: string;
      /** 大模型代码（英文）||qwen-max:通义千问的模型代码;ernie-bot:文心一言的模型代码 */
      fmttModelEnCode: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: SmartChatAnalysisTaskSaveCheckResVO;
    }
  }

  /** 检查智能会话分析任务配置保存参数 post /smartChatAnalysisTask/save/check */
  function postSaveCheck(req: ET<PostSaveCheck.Req>, options?: object): Promise<ET<PostSaveCheck.Res>>;

  export module GetErrorExport {
    export interface Req {
      /** 业务校验ID */
      checkId: string;
    }
    export type Res = void;
  }

  /** 下载任务保存错误信息 get /smartChatAnalysisTask/task/error/export */
  function getErrorExport(req: ET<GetErrorExport.Req>, options?: object): Promise<ET<GetErrorExport.Res>>;

  export module GetSmartChatAnalysisTaskTestTask {
    export type SmartChatAnalysisTaskVendorModelVO = {
      /** 目标说明 */
      vendor?: SmartChatAnalysisTaskVendorModelItemVO;
      /** 默认目标 */
      modelList?: Array<SmartChatAnalysisTaskVendorModelItemVO>;
    };
    export type SmartChatAnalysisTaskVendorModelItemVO = {
      /** 配置名称 */
      name?: string;
      /** 配置code */
      code?: string;
    };

    export interface Req {
      taskId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<SmartChatAnalysisTaskVendorModelVO>;
    }
  }

  /** 任务测试 get /smartChatAnalysisTask/testTask */
  function getSmartChatAnalysisTaskTestTask(req: ET<GetSmartChatAnalysisTaskTestTask.Req>, options?: object): Promise<ET<GetSmartChatAnalysisTaskTestTask.Res>>;

  export module GetSmartChatAnalysisTaskGetSummaryConfigFields {
    export type SmartChatAnalysisTaskSummaryConfigFieldsVO = {
      /** 分析项 */
      conditionKey?: string;
      /** 操作符 */
      operator?: string;
      /** 分析值 */
      conditionValue?: string;
      /** 是否标红 */
      redFlag?: string;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<SmartChatAnalysisTaskSummaryConfigFieldsVO>;
    }
  }

  /** 获取汇总字段配置 get /smartChatAnalysisTask/getSummaryConfigFields */
  function getSmartChatAnalysisTaskGetSummaryConfigFields(req?: ET<GetSmartChatAnalysisTaskGetSummaryConfigFields.Req>, options?: object): Promise<ET<GetSmartChatAnalysisTaskGetSummaryConfigFields.Res>>;

  export module GetSummaryMsgId {
    export type SmartChatAnalysisTaskSummaryMsgStatusVO = {
      /** 分析的所有会话 */
      allNums?: number;
      /** 分析成功的会话 */
      successNums?: number;
    };

    export interface Req {
      taskId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: SmartChatAnalysisTaskSummaryMsgStatusVO;
    }
  }

  /** 智能会话分析汇总统计会话状态 get /smartChatAnalysisTask/summary/msgId */
  function getSummaryMsgId(req: ET<GetSummaryMsgId.Req>, options?: object): Promise<ET<GetSummaryMsgId.Res>>;

  export module GetAnalysisItem {
    export type SmartChatAnalysisTaskSummaryItemVO = {
      /** 分析的项 */
      analysisItemSite?: string;
      /** 条件比较符 */
      operator?: string;
      /** 分析值 */
      analysisItemValue?: string;
      /** 会话数 */
      msgNums?: number;
      /** 会话数占比 */
      percent?: number;
      /** 是否标红 */
      redFlag?: string;
    };

    export interface Req {
      taskId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<SmartChatAnalysisTaskSummaryItemVO>;
    }
  }

  /** 智能会话分析汇总统计分析项 get /smartChatAnalysisTask/summary/analysis/item */
  function getAnalysisItem(req: ET<GetAnalysisItem.Req>, options?: object): Promise<ET<GetAnalysisItem.Res>>;

  export module GetAnalysisAgent {
    export type SmartChatAnalysisTaskSummaryAgentVO = {
      /** 坐席id */
      agentId?: string;
      /** 坐席 */
      agentName?: string;
      /** 自定义统计项 */
      diyItemNums?: number;
      /** 条件比较符 */
      operator?: string;
      /** 会话数 */
      msgNums?: number;
      /** 会话数占比 */
      percent?: number;
    };

    export interface Req {
      taskId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<SmartChatAnalysisTaskSummaryAgentVO>;
    }
  }

  /** 智能会话分析汇总统计坐席 get /smartChatAnalysisTask/summary/analysis/agent */
  function getAnalysisAgent(req: ET<GetAnalysisAgent.Req>, options?: object): Promise<ET<GetAnalysisAgent.Res>>;

  export module GetAgentItem {
    export type SmartChatAnalysisTaskSummaryItemVO = {
      /** 分析的项 */
      analysisItemSite?: string;
      /** 条件比较符 */
      operator?: string;
      /** 分析值 */
      analysisItemValue?: string;
      /** 会话数 */
      msgNums?: number;
      /** 会话数占比 */
      percent?: number;
      /** 是否标红 */
      redFlag?: string;
    };

    export interface Req {
      taskId: number;
      agentId: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<SmartChatAnalysisTaskSummaryItemVO>;
    }
  }

  /** 智能会话分析汇总统计坐席分析项 get /smartChatAnalysisTask/summary/analysis/agent/item */
  function getAgentItem(req: ET<GetAgentItem.Req>, options?: object): Promise<ET<GetAgentItem.Res>>;

  export module PostResourcePoolUpdateStatus {
    export interface Req {
      id: number;
      /** 资源池状态||open:启用;stop:停用 */
      resourcePoolEnStatus?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 修改资源池状态 post /resourcePool/updateStatus */
  function postResourcePoolUpdateStatus(req: ET<PostResourcePoolUpdateStatus.Req>, options?: object): Promise<ET<PostResourcePoolUpdateStatus.Res>>;

  export module GetCommonGetDepartmentAgentList {
    export type GetDepartmentAgentListResVO = {
      /** 节点ID */
      id?: string;
      /** 节点名称 */
      name?: string;
      /** 节点类型||department:部门；employee:员工) */
      type?: string;
      /** 用户id */
      userId?: string;
      /** 子节点列表 */
      children?: Array<GetDepartmentAgentListResVO>;
    };

    export interface Req {
      /** 大区组织ID */
      regionDepartId: number;
      /** 咨询类型||online:在线;incall:来电 */
      agentConsultType: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<GetDepartmentAgentListResVO>;
    }
  }

  /** 根据分子公司代码查询部门坐席列表 get /common/getDepartmentAgentList */
  function getCommonGetDepartmentAgentList(req: ET<GetCommonGetDepartmentAgentList.Req>, options?: object): Promise<ET<GetCommonGetDepartmentAgentList.Res>>;

  export module GetListExport {
    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 排序条件 */
      sort?: any;
      /** 排序列表 */
      sortRuleList?: Array<string>;
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 队列满时处理策略 */
      fullQueueStrategy?: string;
      /** 成员分配策略 */
      allocationStrategy?: string;
      /** 组状态 */
      status?: string;
      /** 所属地区id */
      areaId?: string;
      /** 受理机构id */
      companyId?: string;
      /** 受理机构代码列表 */
      bigRegionCodeList?: Array<string>;
      /** 经营中心代码 */
      businessCenterCode?: string;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询 */
      consultBusinessType?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: string;
    }
  }

  /** 查询电话组列表接口导出 get /group/incall/list/export */
  function getListExport(req: ET<GetListExport.Req>, options?: object): Promise<ET<GetListExport.Res>>;

  export module GetExcelImport {
    export type ImportTaskResultVO = {
      /** 任务ID */
      id?: number;
      /** 错误文件地址 */
      failDownloadUrl?: string;
      /** 总条数 */
      totalNum?: number;
      /** 成功条数 */
      successNum?: number;
      /** 失败条数 */
      failNum?: number;
    };

    export interface Req {
      /** 文件 */
      file: any;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: ImportTaskResultVO;
    }
  }

  /** 导入电话组 post /group/incall/excel/import */
  function getExcelImport(req: ET<GetExcelImport.Req>, options?: object): Promise<ET<GetExcelImport.Res>>;

  export module GetGroupOnlineListExport {
    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 排序条件 */
      sort?: any;
      /** 排序列表 */
      sortRuleList?: Array<string>;
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 组状态 */
      status?: string;
      /** 所属地区id */
      areaId?: string;
      /** 受理机构id */
      companyId?: string;
      /** 受理机构代码列表 */
      bigRegionCodeList?: Array<string>;
      /** 经营中心代码 */
      businessCenterCode?: string;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:财税专家咨询;03:记账咨询;04:BC联动;05:人资实务咨询 */
      consultBusinessType?: string;
      /** 产品大类||01:国税;02:个税;03:记账;04:代账;05:出口退税;06:财税;07:其他 */
      productCategory?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: string;
    }
  }

  /** 查询在线组列表接口导出 get /group/online/list/export */
  function getGroupOnlineListExport(req: ET<GetGroupOnlineListExport.Req>, options?: object): Promise<ET<GetGroupOnlineListExport.Res>>;

  export module GetGroupOnlineExcelImport {
    export type ImportTaskResultVO = {
      /** 任务ID */
      id?: number;
      /** 错误文件地址 */
      failDownloadUrl?: string;
      /** 总条数 */
      totalNum?: number;
      /** 成功条数 */
      successNum?: number;
      /** 失败条数 */
      failNum?: number;
    };

    export interface Req {
      /** 文件 */
      file: any;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: ImportTaskResultVO;
    }
  }

  /** 导入在线组 post /group/online/excel/import */
  function getGroupOnlineExcelImport(req: ET<GetGroupOnlineExcelImport.Req>, options?: object): Promise<ET<GetGroupOnlineExcelImport.Res>>;

  export module PostBatchDelete {
    export interface Req {
      /** 组id集合 */
      idList?: Array<number>;
      /** 组类型 */
      type?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 组管理批量停用接口 post /group/batch/delete */
  function postBatchDelete(req: ET<PostBatchDelete.Req>, options?: object): Promise<ET<PostBatchDelete.Res>>;

  export module GetImportTemplate {
    export interface Req {
      type: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: string;
    }
  }

  /** 获取导入模板 get /group/excel/import/template */
  function getImportTemplate(req: ET<GetImportTemplate.Req>, options?: object): Promise<ET<GetImportTemplate.Res>>;

  export module PostDeleteCheck {
    export type GroupDeleteCheckResVO = {
      /** 能否删除 */
      canDeleted?: boolean;
      /** 提示信息 */
      tips?: string;
      /** 组集合 */
      groupList?: Array<GroupResponse>;
    };
    export type GroupResponse = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
    };

    export interface Req {
      /** 组id集合 */
      idList?: Array<number>;
      /** 组类型 */
      type?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<GroupDeleteCheckResVO>;
    }
  }

  /** 组管理批量停用校验接口 post /group/batch/delete/check */
  function postDeleteCheck(req: ET<PostDeleteCheck.Req>, options?: object): Promise<ET<PostDeleteCheck.Res>>;

  export module GetTodoGetTodoType {
    export type TodoTypeVO = {
      /** 待办类型名称 */
      name?: string;
      /** 待办类型code */
      code?: string;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<TodoTypeVO>;
    }
  }

  /** get /todo/getTodoType */
  function getTodoGetTodoType(req?: ET<GetTodoGetTodoType.Req>, options?: object): Promise<ET<GetTodoGetTodoType.Res>>;

  export module GetTodoGetTodoRole {
    export type SynergyTypeVO = {
      /** 协同类型 */
      synergyType?: string;
      /** 协同类型名称 */
      synergyTypeName?: string;
    };

    export interface Req {
      businessCenterCode: string;
      regionCodeList: Array<string>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<SynergyTypeVO>;
    }
  }

  /** get /todo/getTodoRole */
  function getTodoGetTodoRole(req: ET<GetTodoGetTodoRole.Req>, options?: object): Promise<ET<GetTodoGetTodoRole.Res>>;

  export module GetPlanGetAnalysisResult {
    export type Req = any;
    export type Res = any;
  }

  /** get /smart/chat/analysis/plan/getAnalysisResult */
  function getPlanGetAnalysisResult(req?: ET<GetPlanGetAnalysisResult.Req>, options?: object): Promise<ET<GetPlanGetAnalysisResult.Res>>;

  export module PostPlanGetAnalysisResult {
    export type GetAnalysisResultResVO = {
      /** 解析结果|| success:成功;fail:失败; */
      analysisResult?: string;
      /** 解析数据列表 */
      analysistDataList?: Array<SmartChatAnalysisTaskModelAnalysisDataVO>;
    };
    export type SmartChatAnalysisTaskModelAnalysisDataVO = {
      /** 模型解析的问题 */
      question?: string;
      /** 模型解析的问题答案 */
      answer?: string;
      /** 模型解析的问题是否存在 */
      isQuestionExist?: boolean;
    };

    export interface Req {
      /** 方案id */
      planId: number;
      /** 回答内容 */
      answerContent: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: GetAnalysisResultResVO;
    }
  }

  /** 根据当前最新版本的目标获取解析结果 post /smart/chat/analysis/plan/getAnalysisResult */
  function postPlanGetAnalysisResult(req: ET<PostPlanGetAnalysisResult.Req>, options?: object): Promise<ET<PostPlanGetAnalysisResult.Res>>;

  export module PostTaskAdd {
    export interface Req {
      /** 任务名称 */
      taskName?: string;
      /** 业务分类代码 */
      calendarCode?: string;
      /** 维度代码 */
      dimensionCode?: string;
      /** 受训人ID列表 */
      traineeIdList?: Array<string>;
      /** 描述信息 */
      description?: string;
      /** 文件URL */
      fileUrl?: string;
      /** 文件名称 */
      fileName?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: number;
    }
  }

  /** 新增对练任务 post /ipt/task/add */
  function postTaskAdd(req: ET<PostTaskAdd.Req>, options?: object): Promise<ET<PostTaskAdd.Res>>;

  export module PostSimpleList {
    export type IntelligentPracticeTraineeTaskListVO = {
      /** ID */
      id?: number;
      /** 任务名称 */
      taskName?: string;
    };

    export interface Req {
      keyword: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<IntelligentPracticeTraineeTaskListVO>;
    }
  }

  /** 任务简单列表 post /ipt/task/simple/list */
  function postSimpleList(req: ET<PostSimpleList.Req>, options?: object): Promise<ET<PostSimpleList.Res>>;

  export module GetTaskTemplate {
    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: string;
    }
  }

  /** 获取案例下载模版地址 get /ipt/task/template */
  function getTaskTemplate(req?: ET<GetTaskTemplate.Req>, options?: object): Promise<ET<GetTaskTemplate.Res>>;

  export module PostChatMessage {
    export type Req = any;
    export type Res = any;
  }

  /** post /ipt/trainee/task/case/chat/message */
  function postChatMessage(req?: ET<PostChatMessage.Req>, options?: object): Promise<ET<PostChatMessage.Res>>;

  export module PostCaseDialogue {
    export type Req = any;
    export type Res = any;
  }

  /** post /ipt/trainee/task/case/dialogue */
  function postCaseDialogue(req?: ET<PostCaseDialogue.Req>, options?: object): Promise<ET<PostCaseDialogue.Res>>;

  export module GetCaseEvaluation {
    export type Req = any;
    export type Res = any;
  }

  /** get /ipt/trainee/task/case/evaluation */
  function getCaseEvaluation(req?: ET<GetCaseEvaluation.Req>, options?: object): Promise<ET<GetCaseEvaluation.Res>>;

  export module GetCaseStart {
    export type Req = any;
    export type Res = any;
  }

  /** get /ipt/trainee/task/case/start */
  function getCaseStart(req?: ET<GetCaseStart.Req>, options?: object): Promise<ET<GetCaseStart.Res>>;

  export module GetTaskContinued {
    export type Req = any;
    export type Res = any;
  }

  /** get /ipt/trainee/task/continued */
  function getTaskContinued(req?: ET<GetTaskContinued.Req>, options?: object): Promise<ET<GetTaskContinued.Res>>;

  export module GetTaskDelete {
    export type Req = any;
    export type Res = any;
  }

  /** get /ipt/trainee/task/delete */
  function getTaskDelete(req?: ET<GetTaskDelete.Req>, options?: object): Promise<ET<GetTaskDelete.Res>>;

  export module PostTaskList {
    export type PageResponseIntelligentPracticeTraineeTaskVO = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<IntelligentPracticeTraineeTaskVO>;
    };
    export type IntelligentPracticeTraineeTaskVO = {
      /** ID */
      id?: number;
      /** 任务名称 */
      taskName?: string;
      /** 业务分类代码 */
      calendarCode?: string;
      /** 业务分类名称 */
      calendarCodeName?: string;
      /** 维度代码 */
      dimensionCode?: string;
      /** 维度名称 */
      dimensionCodeName?: string;
      /** 案例数量 */
      caseNum?: number;
      /** 描述信息 */
      description?: string;
      /** 任务状态|-1:未开始;0:进行中;1:已完成 */
      taskStatus?: string;
      /** 任务状态|-1:未开始;0:进行中;1:已完成 */
      taskStatusName?: string;
      /** 受训人ID */
      traineeId?: string;
      /** 受训人名称 */
      traineeName?: string;
      /** 任务创建人 */
      creatorId?: string;
      /** 任务创建人姓名 */
      creatorName?: string;
      /** 创建时间 */
      createDate?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      /** 任务名称 */
      taskIdList?: Array<number>;
      /** 业务分类代码 */
      calendarCodeList?: Array<string>;
      /** 任务创建人 */
      creatorIdList?: Array<string>;
      /** 受训人ID */
      traineeIdList?: Array<string>;
      /** 任务状态|-1:未开始;0:进行中;1:已完成 */
      taskStatus?: string;
      /** keyword|可模糊搜索任务名称和id */
      keyword?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageResponseIntelligentPracticeTraineeTaskVO;
    }
  }

  /** 查询受训人对练任务列表 post /ipt/trainee/task/list */
  function postTaskList(req: ET<PostTaskList.Req>, options?: object): Promise<ET<PostTaskList.Res>>;

  export module GetTaskStart {
    export interface Req {
      /** 对练任务ID */
      id: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 开始受训人对练任务 get /ipt/trainee/task/start */
  function getTaskStart(req: ET<GetTaskStart.Req>, options?: object): Promise<ET<GetTaskStart.Res>>;

  export module GetTaskStop {
    export interface Req {
      /** 对练任务ID */
      id: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 退出受训人对练任务 get /ipt/trainee/task/stop */
  function getTaskStop(req: ET<GetTaskStop.Req>, options?: object): Promise<ET<GetTaskStop.Res>>;

  export module GetTaskView {
    export type IntelligentPracticeTraineeTaskViewVO = {
      /** 任务信息 */
      simpleTask?: IntelligentPracticeTraineeTaskSimpleVO;
      /** 案例列表 */
      traineeTaskCaseList?: Array<IntelligentPracticeTraineeTaskCaseVO>;
    };
    export type IntelligentPracticeTraineeTaskSimpleVO = {
      /** ID */
      id?: number;
      /** 任务名称 */
      taskName?: string;
      /** 案例数量 */
      caseNum?: number;
      /** 描述信息 */
      description?: string;
      /** 完成案例下标 */
      caseFinishIndex?: number;
      /** 任务创建人 */
      creatorId?: string;
      /** 任务创建人姓名 */
      creatorName?: string;
      /** 状态|-1:未开始;0:进行中;1:已完成 */
      status?: string;
      /** 状态|-1:未开始;0:进行中;1:已完成 */
      statusName?: string;
    };
    export type IntelligentPracticeTraineeTaskCaseVO = {
      /** 对练任务案例ID */
      id?: number;
      /** 耗时/秒 */
      timeConsuming?: number;
      /** 案例ID */
      caseId?: number;
      /** 任务案例对话ID */
      taskChatId?: number;
      /** 状态|-1:未开始;0:进行中;1:已完成 */
      status?: string;
      /** 状态|-1:未开始;0:进行中;1:已完成 */
      statusName?: string;
      /** 案例批注状态|1:已批注;0:无需批注; */
      commentsStatus?: string;
      /** 案例批注状态|1:已批注;0:无需批注; */
      commentsStatusName?: string;
      /** 批注 */
      comments?: string;
      /** 排序 */
      orderNum?: number;
      /** 简介 */
      overview?: string;
      /** 案例原文 */
      content?: string;
    };

    export interface Req {
      /** 对练任务ID */
      id: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: IntelligentPracticeTraineeTaskViewVO;
    }
  }

  /** 查看受训人对练任务 get /ipt/trainee/task/view */
  function getTaskView(req: ET<GetTaskView.Req>, options?: object): Promise<ET<GetTaskView.Res>>;

  export module GetTaskWelcome {
    export type IntelligentPracticeTraineeTaskWelcomeVO = {
      /** 欢迎语 */
      welcome?: string;
      /** 结束语 */
      conclusion?: string;
      /** 开始对练固定内容 */
      startFixedContent?: string;
      /** 评价案例固定内容 */
      evaluationFixedContent?: string;
    };

    export interface Req {
      /** 对练任务ID */
      id: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: IntelligentPracticeTraineeTaskWelcomeVO;
    }
  }

  /** 受训人对练任务欢迎语 get /ipt/trainee/task/welcome */
  function getTaskWelcome(req: ET<GetTaskWelcome.Req>, options?: object): Promise<ET<GetTaskWelcome.Res>>;

  export module GetResultDownload {
    export interface Req {
      /** 对练任务ID */
      id: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: string;
    }
  }

  /** 下载对练任务结果列表 get /ipt/trainee/task/result/download */
  function getResultDownload(req: ET<GetResultDownload.Req>, options?: object): Promise<ET<GetResultDownload.Res>>;

  export module PostResultList {
    export type IntelligentPracticeTraineeTaskStatisticsResultVO = {
      /** 统计数据 */
      statisticsResponse?: IntelligentPracticeTraineeTaskStatisticsResult;
      /** 分页数据 */
      pageResponse?: PageResponseIntelligentPracticeTraineeTaskResultVO;
    };
    export type IntelligentPracticeTraineeTaskStatisticsResult = {
      avgScore?: number;
      /** 任务数 */
      taskNum?: number;
      /** 案例数 */
      caseNum?: number;
      /** 任务平均耗时 */
      taskAvgTime?: number;
      /** 案例平均耗时 */
      caseAvgTime?: number;
    };
    export type PageResponseIntelligentPracticeTraineeTaskResultVO = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<IntelligentPracticeTraineeTaskResultVO>;
    };
    export type IntelligentPracticeTraineeTaskResultVO = {
      /** ID */
      id?: number;
      /** 任务名称 */
      taskName?: string;
      /** 业务分类代码 */
      calendarCode?: string;
      /** 业务分类名称 */
      calendarCodeName?: string;
      /** 维度代码 */
      dimensionCode?: string;
      /** 维度名称 */
      dimensionCodeName?: string;
      /** 案例数量 */
      caseNum?: number;
      /** 描述信息 */
      description?: string;
      /** 任务状态|-1:未开始;0:进行中;1:已完成 */
      taskStatus?: string;
      /** 任务状态|-1:未开始;0:进行中;1:已完成 */
      taskStatusName?: string;
      /** 受训人ID */
      traineeId?: string;
      /** 受训人名称 */
      traineeName?: string;
      /** 任务创建人 */
      creatorId?: string;
      /** 任务创建人姓名 */
      creatorName?: string;
      /** 创建时间 */
      createDate?: string;
      /** 任务耗时 */
      timeConsuming?: number;
      /** 完成案例数量 */
      finishCaseNum?: number;
      /** 平均得分 */
      avgScore?: number;
      /** 任务批注状态|-1:未开始;0:进行中;1:已完成 */
      taskCommentsStatus?: string;
      /** 任务批注状态|-1:未开始;0:进行中;1:已完成 */
      taskCommentsStatusName?: string;
      /** 案例列表 */
      caseList?: Array<IntelligentPracticeTraineeTaskCaseResultVO>;
    };
    export type IntelligentPracticeTraineeTaskCaseResultVO = {
      /** 对练任务案例ID */
      id?: number;
      /** 耗时/秒 */
      timeConsuming?: number;
      /** 案例ID */
      caseId?: number;
      /** 任务案例对话ID */
      taskChatId?: number;
      /** 状态|-1:未开始;0:进行中;1:已完成 */
      status?: string;
      /** 案例批注状态|1:已批注;0:无需批注; */
      commentsStatus?: string;
      /** 案例批注状态|1:已批注;0:无需批注; */
      commentsStatusName?: string;
      /** 排序 */
      orderNum?: number;
      /** 简介 */
      overview?: string;
      /** 平均得分 */
      score?: number;
      /** 任务创建人姓名 */
      creatorName?: string;
      /** 受训人名称 */
      traineeName?: string;
      /** 受训人ID */
      traineeId?: string;
      /** 任务创建人 */
      creatorId?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      /** 任务名称 */
      taskIdList?: Array<number>;
      /** 业务分类代码 */
      calendarCodeList?: Array<string>;
      /** 任务创建人 */
      creatorIdList?: Array<string>;
      /** 受训人ID */
      traineeIdList?: Array<string>;
      /** 任务状态|-1:未开始;0:进行中;1:已完成 */
      taskStatus?: string;
      /** keyword|可模糊搜索任务名称和id */
      keyword?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: IntelligentPracticeTraineeTaskStatisticsResultVO;
    }
  }

  /** 查询对练任务结果列表 post /ipt/trainee/task/result/list */
  function postResultList(req: ET<PostResultList.Req>, options?: object): Promise<ET<PostResultList.Res>>;

  export module PostTaskDelete {
    export interface Req {
      idList?: Array<number>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 删除受训人对练任务 post /ipt/trainee/task/delete */
  function postTaskDelete(req: ET<PostTaskDelete.Req>, options?: object): Promise<ET<PostTaskDelete.Res>>;

  export module GetCaseDialogue {
    export interface Req {
      /** 案例ID */
      traineeTaskCaseId?: number;
      /** 对话内容 */
      content?: string;
      /** 对话事件 start:开始对练 dialogue：正常对话 ，evaluation：评价案例 */
      dialogueEvent?: string;
    }
    export type Res = void;
  }

  /** 对话 get /ipt/trainee/task/case/dialogue */
  function getCaseDialogue(req: ET<GetCaseDialogue.Req>, options?: object): Promise<ET<GetCaseDialogue.Res>>;

  export module GetChatMessage {
    export type IntelligentPracticeTaskMessageVO = {
      /** msgId */
      msgId?: string;
      /** 消息类型|text:纯文本 */
      msgEnType?: string;
      /** 消息方向代码（英文）|user_to_assistant:用户发给助手;assistant_to_user:助手发给用户 */
      msgDirectionEnCode?: string;
      /** 内容 */
      msgContent?: string;
      /** 发送时间 */
      msgSendTime?: string;
    };

    export interface Req {
      /** 案例ID */
      traineeTaskCaseId: number;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<IntelligentPracticeTaskMessageVO>;
    }
  }

  /** 根据案例ID 获取聊天记录 get /ipt/trainee/task/case/chat/message */
  function getChatMessage(req: ET<GetChatMessage.Req>, options?: object): Promise<ET<GetChatMessage.Res>>;

  export module PostCaseComments {
    export interface Req {
      /** 案例ID */
      traineeTaskCaseId?: number;
      /** 案例批注状态|1:已批注;0:无需批注; */
      commentsStatus?: string;
      /** 批注内容 */
      comments?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: boolean;
    }
  }

  /** 批注 post /ipt/trainee/task/case/comments */
  function postCaseComments(req: ET<PostCaseComments.Req>, options?: object): Promise<ET<PostCaseComments.Res>>;

  export module GetOrgFindChildrenByParentId {
    export type Req = any;
    export type Res = any;
  }

  /** get /region/org/findChildrenByParentId */
  function getOrgFindChildrenByParentId(req?: ET<GetOrgFindChildrenByParentId.Req>, options?: object): Promise<ET<GetOrgFindChildrenByParentId.Res>>;

  export module GetOrgGetAllRegionTree {
    export type BigRegionOrgTreeResVO = {
      /** 组织代码 */
      code?: string;
      /** 全名 */
      fullName?: string;
      /** 简称 */
      shortName?: string;
      /** 子组织 */
      childList?: Array<BigRegionOrgTreeResVO>;
    };

    export type Req = any;
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: BigRegionOrgTreeResVO;
    }
  }

  /** 查询完整大区组织树 get /region/org/getAllRegionTree */
  function getOrgGetAllRegionTree(req?: ET<GetOrgGetAllRegionTree.Req>, options?: object): Promise<ET<GetOrgGetAllRegionTree.Res>>;

  export module GetOrgGetRegionTreeByCode {
    export type BigRegionOrgTreeResVO = {
      /** 组织代码 */
      code?: string;
      /** 全名 */
      fullName?: string;
      /** 简称 */
      shortName?: string;
      /** 子组织 */
      childList?: Array<BigRegionOrgTreeResVO>;
    };

    export interface Req {
      code: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<BigRegionOrgTreeResVO>;
    }
  }

  /** 查询大区组织树（经营中心+大区）（不含三级部门）, code为空会查询全部的经营中心和经营中心下的大区 get /region/org/getRegionTreeByCode */
  function getOrgGetRegionTreeByCode(req: ET<GetOrgGetRegionTreeByCode.Req>, options?: object): Promise<ET<GetOrgGetRegionTreeByCode.Res>>;

  export module PostOnlineGetOnlineMonitorNoneUser {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type OnlineMonitorResponse = {
      /** 实时统计数据 */
      summarizedData?: OnlineSummarizedRealTimeData;
      /** 今日累计 */
      summarizedTodayGroupData?: OnlineSummarizedTodayGroupData;
      /** 技能组资源信息列表 */
      monitorInfoList?: Array<OnlineSingleGroupData>;
    };
    export type OnlineSummarizedRealTimeData = {
      /** 实时咨询数 */
      consultNum?: number;
      /** 实时接通总数 */
      connectedNum?: number;
      /** 实时排队总数 */
      queuingNum?: number;
    };
    export type OnlineSummarizedTodayGroupData = {
      /** 今日累计咨询数 */
      consultNum?: number;
      /** 今日累计接通总数 */
      connectedNum?: number;
      /** 今日累计放弃总数 */
      abandonNum?: number;
      /** 今日累计接通率，带% */
      connectRatio?: string;
    };
    export type OnlineSingleGroupData = {
      /** 技能组资源监控基本信息 */
      baseInfo?: OnlineSingleGroupBaseInfo;
      /** 单个技能组资源的实时统计信息 */
      realTimeStatistics?: OnlineSingleGroupRealTimeStatisticsInfo;
      /** 单个技能组资源的今日累计信息 */
      todayStatistics?: OnlineSingleGroupTodayStatisticsInfo;
    };
    export type OnlineSingleGroupBaseInfo = {
      /** 技能组ID */
      skillGroupId?: string;
      /** 技能组名称 */
      skillGroupName?: string;
    };
    export type OnlineSingleGroupRealTimeStatisticsInfo = {
      /** 实时排队数 */
      queuingNum?: number;
      /** 实时通话数 */
      callingNum?: number;
      /** 坐席在线数量 */
      agentOnlineNum?: number;
      /** 坐席忙碌数量 */
      agentBusyNum?: number;
      /** 坐席离开数量 */
      agentLevelNum?: number;
      /** 坐席隐身数量 */
      agentStealthNum?: number;
    };
    export type OnlineSingleGroupTodayStatisticsInfo = {
      /** 今日累计咨询数 */
      consultNum?: number;
      /** 今日累计接通总数 */
      connectedNum?: number;
      /** 今日累计放弃总数 */
      abandonNum?: number;
      /** 今日累计接通率，带% */
      connectRatio?: string;
      /** 接通率情况||01:正常;02:高于最高阈值;03:低于最低阈值 */
      connectRatioType?: string;
      /** 组接通率下限阈值 */
      groupCallCompletingRateLowerThreshold?: number;
      /** 组接通率上限阈值 */
      groupCallCompletingRateUpperThreshold?: number;
    };

    export interface Req {
      /** 组名称 */
      name?: string;
      /** 经营中心代码 */
      businessCenterCodeList?: Array<string>;
      /** 所属地区id */
      areaIdList?: Array<string>;
      /** 咨询业务类型||00:办税咨询;01:财税实务咨询;02:记账咨询;03:财税专家组;04:BC联动;05:人资实务咨询 */
      consultBusinessTypeList?: Array<string>;
      /** 会员类型||01:买断（接通率）;02:买断（人数）;03:VIP;04:非VIP */
      memberTypeList?: Array<string>;
      /** 接通率情况||01:正常;02:高于最高阈值;03:低于最低阈值 */
      connectRatioTypeList?: Array<string>;
      /** 产品大类||01:国税;02:个税;03:记账;04:代账;05:出口退税;06:财税;07:其他 */
      productCategoryList?: Array<string>;
      /** 排序列表。排序字段||默认:default;queues_num:排队数;connect_rate:接通率;排序顺序||desc:降序;asc:生序; */
      sortRuleList?: Array<SortRule>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: OnlineMonitorResponse;
    }
  }

  /** 查询在线整体监控 post /monitor/online/getOnlineMonitorNoneUser */
  function postOnlineGetOnlineMonitorNoneUser(req: ET<PostOnlineGetOnlineMonitorNoneUser.Req>, options?: object): Promise<ET<PostOnlineGetOnlineMonitorNoneUser.Res>>;

  export module PostCommonGetDepartmentAgentList {
    export type GetDepartmentAgentListResVO = {
      /** 节点ID */
      id?: string;
      /** 节点名称 */
      name?: string;
      /** 节点类型||department:部门；employee:员工) */
      type?: string;
      /** 用户id */
      userId?: string;
      /** 子节点列表 */
      children?: Array<GetDepartmentAgentListResVO>;
    };

    export interface Req {
      /** 大区组织Code */
      bigRegionCode: string;
      /** 咨询类型||online:在线;incall:来电 */
      agentConsultType: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: Array<GetDepartmentAgentListResVO>;
    }
  }

  /** 根据分子公司代码查询部门坐席列表 post /common/getDepartmentAgentList */
  function postCommonGetDepartmentAgentList(req: ET<PostCommonGetDepartmentAgentList.Req>, options?: object): Promise<ET<PostCommonGetDepartmentAgentList.Res>>;

  export module PostCallGetOperatorCallDetail {
    export type AggregateOperatorDataBO = {
      /** 坐席通话监控汇总数据 */
      summarizedData?: SummarizedOperatorData;
      /** 坐席通话监控信息列表 */
      monitorInfoList?: Array<SingleOperatorData>;
    };
    export type SummarizedOperatorData = {
      /** 登录数 */
      onlineNum?: number;
      /** 实时振铃数 */
      offlineNum?: number;
      /** 实时通话数 */
      unCallNum?: number;
      /** 实时总呼入数 */
      onCallNum?: number;
      /** 示忙数 */
      busyNum?: number;
      /** 话后处理数 */
      afterCallNum?: number;
      /** 外呼数 */
      outCallNum?: number;
      /** 就绪数 */
      freeNum?: number;
      /** 考试数 */
      examingNum?: number;
      /** 培训数 */
      trainingNum?: number;
      /** 休息数 */
      leaveNum?: number;
      /** 通话中受理数 */
      inSpeakingNum?: number;
      /** 通话中呼出数 */
      outSpeakingNum?: number;
    };
    export type SingleOperatorData = {
      /** 单个坐席通话监控基本信息 */
      baseInfo?: SingleOperatorBaseInfo;
      /** 单个坐席通话监控的今日累计信息 */
      todayStatistics?: SingleOperatorTodayStatisticsInfo;
    };
    export type SingleOperatorBaseInfo = {
      /** 工号 */
      jobNumber?: string;
      /** 姓名 */
      username?: string;
      /** 工作组 */
      workGroup?: string;
      /** 部门名称 */
      departmentName?: string;
      /** cti状态 */
      ctiStatus?: string;
      /** 技能组 */
      skillGroup?: string;
    };
    export type SingleOperatorTodayStatisticsInfo = {
      /** 在岗时长 */
      dutyTime?: string;
      /** 话后处理累计时长 */
      afterCallTotalTime?: string;
      /** 话后处理平均时长 */
      afterCallAverageTime?: string;
      /** 呼入受理累计时长 */
      inCallTime?: string;
      /** 呼入受理次数 */
      inCallNum?: number;
      /** 外呼情况累计时长 */
      outCallTime?: string;
      /** 外呼情况次数 */
      outCallNum?: number;
      /** 休息时长 */
      leaveTime?: string;
    };

    export interface Req {
      /** 表示是否需要下方的坐席列表数据 */
      showFlag?: boolean;
      /** 大区组织代码 */
      bigRegionCodeList?: Array<string>;
      /** 技能组 */
      skillGroup?: Array<number>;
      /** 工号或姓名 */
      keyword?: string;
      /** 登陆状态 */
      loginState?: string;
      /** 呼叫状态 */
      callState?: string;
      /** cti状态 */
      ctiState?: string;
      /** 是否通话中 */
      onCallState?: boolean;
      /** 权限ID */
      trueId?: string;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: AggregateOperatorDataBO;
    }
  }

  /** 查询坐席电话监控信息 post /monitor/call/getOperatorCallDetail */
  function postCallGetOperatorCallDetail(req: ET<PostCallGetOperatorCallDetail.Req>, options?: object): Promise<ET<PostCallGetOperatorCallDetail.Res>>;

  export module PostSpecialDayList {
    export type Sort = {
      fieldNameList?: Array<string>;
      desc?: boolean;
    };
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type PageResponseSpecialDayListResponse = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SpecialDayListResponse>;
    };
    export type SpecialDayListResponse = {
      /** id */
      id?: number;
      /** 业务组id */
      groupId?: number;
      /** 业务组名称 */
      groupName?: string;
      /** 业务组类型,1-电话组,2-在线组 */
      type?: string;
      /** 特殊日 */
      specialDay?: string;
      /** 是否上班，0上班，1不上班 */
      workFlag?: string;
      /** 上班时间 */
      workTime?: Array<WorkTimeResponse>;
    };
    export type WorkTimeResponse = {
      /** 上班开始时间,格式：HH:mm */
      beginTime?: string;
      /** 上班结束时间,格式：HH:mm */
      endTime?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 排序条件 */
      sort?: Sort;
      /** 排序列表 */
      sortRuleList?: Array<SortRule>;
      /** 组类型，1电话组，2在线组 */
      type?: string;
      /** 业务组id列表 */
      groupIdList?: Array<number>;
      /** 最后修改人是我，1是，0不是 */
      lastModifierFlag?: string;
      /** 大区组织代码 */
      bigRegionCodeList?: Array<string>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageResponseSpecialDayListResponse;
    }
  }

  /** 查询特殊日列表 post /specialDay/list */
  function postSpecialDayList(req: ET<PostSpecialDayList.Req>, options?: object): Promise<ET<PostSpecialDayList.Res>>;

  export module PostWorkTimeList {
    export type Sort = {
      fieldNameList?: Array<string>;
      desc?: boolean;
    };
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type PageResponseWorkdayResponse = {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<WorkdayResponse>;
    };
    export type WorkdayResponse = {
      /** 组id */
      groupId?: number;
      /** 组名称 */
      name?: string;
      /** 组类型，1电话组，2在线组 */
      type?: string;
      /** 工作日期 */
      workTime?: Array<WorkTimeConfig>;
    };
    export type WorkTimeConfig = {
      /** 生效日期起止日,格式：MM.dd */
      effectiveDateBegin?: string;
      /** 生效日期结束日,格式：MM:dd */
      effectiveDateEnd?: string;
      /** 周一到周日的上下班时间安排列表 */
      weekConfig?: Array<WeekConfig>;
    };
    export type WeekConfig = {
      /** 类型，0周日，1-6周一到周六 */
      type?: string;
      /** 是否上班，0上班，1不上班 */
      workFlag?: string;
      /** 日工作时间列表 */
      dayTime?: Array<DayTimeConfig>;
    };
    export type DayTimeConfig = {
      /** 上班开始时间,格式：HH:mm */
      beginTime?: string;
      /** 上班结束时间,格式：HH:mm */
      endTime?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 排序条件 */
      sort?: Sort;
      /** 排序列表 */
      sortRuleList?: Array<SortRule>;
      /** 组类型，1电话组，2在线组 */
      type?: string;
      /** 业务组id列表 */
      groupIdList?: Array<number>;
      /** 最后修改人是我，1是，0不是 */
      lastModifierFlag?: string;
      /** 大区组织代码 */
      bigRegionCodeList?: Array<string>;
    }
    export interface Res {
      success?: boolean;
      messageCode?: string;
      message?: string;
      data?: PageResponseWorkdayResponse;
    }
  }

  /** 查询工作时间列表 post /workTime/list */
  function postWorkTimeList(req: ET<PostWorkTimeList.Req>, options?: object): Promise<ET<PostWorkTimeList.Res>>;
}
export default API;
