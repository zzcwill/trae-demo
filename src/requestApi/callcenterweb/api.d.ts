// 该文件自动生成，请勿修改(除非知道自己在做什么)
/* eslint-disable */
declare namespace API {
  export type ET<T> = T extends object ? (T extends infer O ? { [K in keyof O]: ET<O[K]> } : never) : T;

  export module GetServiceManageDetail {
    export type CardLinkResponse = {
      /** 名片完整展示地址(适合pc端) */
      url?: string;
      /** 小名片地址(适合悬浮) */
      minUrl?: string;
      /** 标准名片地址(适合大部分场景) */
      standardUrl?: string;
    };

    export interface Req {
      /** 客户bizId */
      bizId?: string;
      /** 个人账号 */
      personalAccount?: string;
      /** 行政区划代码 */
      regionCode?: string;
      /** 分子公司代码 */
      companyId?: string;
    }
    export interface Res {
      /** 分配绑定状态：0：未分配，1：已分配未绑定，2：已分配已绑定 */
      status?: string;
      /** 专属客户经理名称 */
      name?: string;
      /** 专属客户经理手机号码 */
      mobileNumber?: string;
      /** 服务经理名片 */
      cardLink?: CardLinkResponse;
    }
  }

  /** 获取专属服务经理 get /andes/serviceManage/detail */
  function getServiceManageDetail(req: ET<GetServiceManageDetail.Req>, options?: object): Promise<ET<GetServiceManageDetail.Res>>;

  export module GetBasecodeBxfyy {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<DmEnumResponse>;
  }

  /** 不续费原因列表 get /comm/basecode/bxfyy */
  function getBasecodeBxfyy(req?: ET<GetBasecodeBxfyy.Req>, options?: object): Promise<ET<GetBasecodeBxfyy.Res>>;

  export module GetBasecodeDhJnz {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<DmEnumResponse>;
  }

  /** 获取所有电话技能组 get /comm/basecode/dhJnz */
  function getBasecodeDhJnz(req?: ET<GetBasecodeDhJnz.Req>, options?: object): Promise<ET<GetBasecodeDhJnz.Res>>;

  export module GetBasecodeFzgs {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<DmEnumResponse>;
  }

  /** 查询所有分子公司列表 get /comm/basecode/fzgs */
  function getBasecodeFzgs(req?: ET<GetBasecodeFzgs.Req>, options?: object): Promise<ET<GetBasecodeFzgs.Res>>;

  export module GetBasecodeFzgsForWdcx {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<DmEnumResponse>;
  }

  /** 查询所有分子公司列表(网点查询) get /comm/basecode/fzgsForWdcx */
  function getBasecodeFzgsForWdcx(req?: ET<GetBasecodeFzgsForWdcx.Req>, options?: object): Promise<ET<GetBasecodeFzgsForWdcx.Res>>;

  export module GetBasecodeFzgsTree {
    export type DmEnumTreeResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
      /** 子节点集合 */
      childrens?: Array<DmEnumTreeResponse>;
    };

    export type Req = any;
    export type Res = Array<DmEnumTreeResponse>;
  }

  /** 组织机构树 只包括6位和9位 get /comm/basecode/fzgsTree */
  function getBasecodeFzgsTree(req?: ET<GetBasecodeFzgsTree.Req>, options?: object): Promise<ET<GetBasecodeFzgsTree.Res>>;

  export module GetBasecodeGetlsqy {
    export type TempCompanyResponse = {
      /** 行政区划 */
      xzqh?: string;
      /** 行政区划名称 */
      xzqhmc?: string;
      /** 客户名称 */
      khmc?: string;
      /** 企业税号 */
      qysh?: string;
    };

    export interface Req {
      /** 来电号码 */
      ldhm: string;
      /** 来电技能组id */
      ldzid: string;
    }
    export type Res = Array<TempCompanyResponse>;
  }

  /** 获取临时企业 get /comm/basecode/getlsqy */
  function getBasecodeGetlsqy(req: ET<GetBasecodeGetlsqy.Req>, options?: object): Promise<ET<GetBasecodeGetlsqy.Res>>;

  export module GetBasecodeRwlxByRwfs {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export interface Req {
      /** 任务方式 */
      rwfs?: string;
      /** 任务大类 */
      rwdl?: string;
      /** 分子公司代码 */
      fzgsdm?: string;
    }
    export type Res = Array<DmEnumResponse>;
  }

  /** 根据任务方式和分子公司代码查询任务类型 get /comm/basecode/rwlxByRwfs */
  function getBasecodeRwlxByRwfs(req: ET<GetBasecodeRwlxByRwfs.Req>, options?: object): Promise<ET<GetBasecodeRwlxByRwfs.Res>>;

  export module GetBasecodeGetSswd {
    export interface Req {
      /** 客户ID，32位客户id */
      khid: string;
      /** 客户类型 */
      khlx: string;
    }
    export type Res = string;
  }

  /** 获取用户所属网点 get /comm/basecode/getSswd */
  function getBasecodeGetSswd(req: ET<GetBasecodeGetSswd.Req>, options?: object): Promise<ET<GetBasecodeGetSswd.Res>>;

  export module GetBasecodeWd {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export interface Req {
      /** 分子公司代码 */
      fzgsdm: string;
    }
    export type Res = Array<DmEnumResponse>;
  }

  /** 查询分子公司上的网点列表 get /comm/basecode/wd */
  function getBasecodeWd(req: ET<GetBasecodeWd.Req>, options?: object): Promise<ET<GetBasecodeWd.Res>>;

  export module GetBasecodeGetWdBmByFzgsdm {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export interface Req {
      /** 分子公司代码 */
      fzgsdm: string;
    }
    export type Res = Array<DmEnumResponse>;
  }

  /** 获取分公司下的网点部门代码 get /comm/basecode/getWdBmByFzgsdm */
  function getBasecodeGetWdBmByFzgsdm(req: ET<GetBasecodeGetWdBmByFzgsdm.Req>, options?: object): Promise<ET<GetBasecodeGetWdBmByFzgsdm.Res>>;

  export module GetBasecodeWdForWdcx {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export interface Req {
      /** 分子公司代码 */
      fzgsdm: string;
    }
    export type Res = Array<DmEnumResponse>;
  }

  /** 根据分子公司获取网点的列表信息要加上机构类型是04的.(网点查询) get /comm/basecode/wdForWdcx */
  function getBasecodeWdForWdcx(req: ET<GetBasecodeWdForWdcx.Req>, options?: object): Promise<ET<GetBasecodeWdForWdcx.Res>>;

  export module GetBasecodeGetWdxxByDm {
    export type WdxxResponse = {
      /** 网点id */
      websiteId?: string;
      /** 网点名称 */
      websiteName?: string;
      /** 地址 */
      address?: string;
      /** 电话 */
      phone?: string;
      /** 负责人 */
      personInCharge?: string;
      /** 描述 */
      description?: string;
    };

    export interface Req {
      /** 分子公司或者网点代码 */
      dm: string;
      /** 页码 */
      pageId: number;
      /** 每页记录数 */
      pageLines: number;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<WdxxResponse>;
    }
  }

  /** 通过分子公司或者网点代码查询网点信息 get /comm/basecode/getWdxxByDm */
  function getBasecodeGetWdxxByDm(req: ET<GetBasecodeGetWdxxByDm.Req>, options?: object): Promise<ET<GetBasecodeGetWdxxByDm.Res>>;

  export module GetBasecodeWmqyy {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<DmEnumResponse>;
  }

  /** 未明确原因列表 get /comm/basecode/wmqyy */
  function getBasecodeWmqyy(req?: ET<GetBasecodeWmqyy.Req>, options?: object): Promise<ET<GetBasecodeWmqyy.Res>>;

  export module GetBasecodeXfyy {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<DmEnumResponse>;
  }

  /** 查询续费意愿列表 get /comm/basecode/xfyy */
  function getBasecodeXfyy(req?: ET<GetBasecodeXfyy.Req>, options?: object): Promise<ET<GetBasecodeXfyy.Res>>;

  export module GetBasecodeGetYhfkCpxl {
    export type LabelValueResponse = {
      /** 名称 */
      label?: string;
      /** 值 */
      value?: string;
    };

    export type Req = any;
    export type Res = Array<LabelValueResponse>;
  }

  /** 获取用户反馈产品系列集合 get /comm/basecode/getYhfkCpxl */
  function getBasecodeGetYhfkCpxl(req?: ET<GetBasecodeGetYhfkCpxl.Req>, options?: object): Promise<ET<GetBasecodeGetYhfkCpxl.Res>>;

  export module GetBasecodeGetYhfkStatus {
    export type LabelValueResponse = {
      /** 名称 */
      label?: string;
      /** 值 */
      value?: string;
    };

    export type Req = any;
    export type Res = Array<LabelValueResponse>;
  }

  /** 获取用户反馈状态集合 get /comm/basecode/getYhfkStatus */
  function getBasecodeGetYhfkStatus(req?: ET<GetBasecodeGetYhfkStatus.Req>, options?: object): Promise<ET<GetBasecodeGetYhfkStatus.Res>>;

  export module GetBasecodeCpdlByFzgsdm {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export interface Req {
      /** 分子公司代码 */
      fzgsdm: string;
    }
    export type Res = Array<DmEnumResponse>;
  }

  /** 根据分子公司查询产品大类列表 get /comm/basecode/cpdlByFzgsdm */
  function getBasecodeCpdlByFzgsdm(req: ET<GetBasecodeCpdlByFzgsdm.Req>, options?: object): Promise<ET<GetBasecodeCpdlByFzgsdm.Res>>;

  export module GetBasecodeQueryPzxxByJrhm {
    export interface Req {
      /** 接入号码 */
      jrhm: string;
    }
    export interface Res {
      /** 接入号码后提示 */
      remindText?: string;
      /** 是否弹屏 */
      isPopup?: string;
    }
  }

  /** 根据接入号码查询税局热点配置信息 get /comm/basecode/queryPzxxByJrhm */
  function getBasecodeQueryPzxxByJrhm(req: ET<GetBasecodeQueryPzxxByJrhm.Req>, options?: object): Promise<ET<GetBasecodeQueryPzxxByJrhm.Res>>;

  export module GetCommonAgentList {
    export type AgentResponse = {
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
      /** 受理机构Id */
      companyId?: string;
      /** 部门Id */
      departId?: string;
      /** 受理渠道，1：电话咨询，2：在线咨询 */
      acceptanceChannelList?: Array<string>;
      /** 状态，0：正常，1：注销-对应员工账户中心的注销 */
      status?: string;
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 来电配置信息 */
      incallConfig?: AgentIncallConfigBO;
      /** 在线配置信息 */
      onlineConfig?: AgentOnlineConfigBO;
      /** 坐席业务组关系列表 */
      agentGroupRelationList?: Array<AgentGroupRelationBO>;
    };
    export type AgentIncallConfigBO = {
      /** 主键id */
      id?: number;
      /** 坐席id */
      agentId?: number;
      /** 岗位，1：坐席，2：班长席 */
      postList?: Array<string>;
      /** 录音标识，0：不录音，1：录音 */
      recordSoundFlag?: string;
      /** 值班职务，见枚举表，0：非值班坐席，1：普通坐席，2：值班组长，3：值班主任 */
      onDutyPosition?: string;
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };
    export type AgentOnlineConfigBO = {
      /** 主键id */
      id?: number;
      /** 坐席id */
      agentId?: number;
      /** 头像 */
      headImageUrl?: string;
      /** 昵称 */
      nickname?: string;
      /** 岗位 1：坐席，2：班长席 */
      postList?: Array<string>;
      /** 是否启用自动分配，0：关闭，1：开启 */
      autoAllocation?: string;
      /** 接待上限 */
      maxReception?: number;
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };
    export type AgentGroupRelationBO = {
      /** 自增主键 */
      id?: number;
      /** 坐席Id */
      agentId?: number;
      /** 业务组Id */
      groupId?: number;
      /** 类型，0：坐席组，1：班长组' */
      type?: string;
      /** 受理渠道，0:电话咨询，1:在线咨询 */
      acceptanceChannel?: string;
      /** 主要业务组标识，0：非主要业务组，1：主要业务组 */
      mainGroupFlag?: string;
      /** 组优先级 */
      groupPriority?: number;
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };

    export interface Req {
      /** 受理渠道，1：电话咨询，2：在线咨询 */
      acceptanceChannel?: string;
      /** 状态 0-正常 1-停用 */
      status?: string;
    }
    export type Res = Array<AgentResponse>;
  }

  /** 查询坐席列表接口 get /common/agentList */
  function getCommonAgentList(req: ET<GetCommonAgentList.Req>, options?: object): Promise<ET<GetCommonAgentList.Res>>;

  export module GetLive800Permission {
    export type PermissionEnumResponse = {
      /** 权限code */
      code?: string;
      /** 权限名称 */
      name?: string;
    };

    export interface Req {
      id: string;
    }
    export type Res = Array<PermissionEnumResponse>;
  }

  /** get /common/live800/permission */
  function getLive800Permission(req: ET<GetLive800Permission.Req>, options?: object): Promise<ET<GetLive800Permission.Res>>;

  export module GetFileDownload {
    export interface Req {
      path: string;
    }
    export type Res = boolean;
  }

  /** get /common/file/download */
  function getFileDownload(req: ET<GetFileDownload.Req>, options?: object): Promise<ET<GetFileDownload.Res>>;

  export module GetCommonGroupList {
    export type GroupInfoResponse = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 组类型 */
      type?: string;
      /** 受理机构Id */
      companyId?: string;
      /** 所属部门代码 */
      departId?: string;
      /** 所属地区id */
      areaId?: string;
      /** 状态 */
      status?: string;
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 电话组配置信息 */
      incallConfig?: GroupIncallConfigBO;
      /** 备用组关系列表 */
      assistGroupList?: Array<AssistGroupBO>;
    };
    export type GroupIncallConfigBO = {
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
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };
    export type AssistGroupBO = {
      /** 主键id */
      id?: number;
      /** 组id */
      groupId?: number;
      /** 辅助组id */
      assistGroupId?: number;
      /** 受理渠道 */
      acceptanceChannel?: string;
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };

    export interface Req {
      /** 组类型 1：电话组，2：在线组，空值返回所有 */
      type?: string;
      /** 组状态 0-正常 1-停用 */
      status?: string;
    }
    export type Res = Array<GroupInfoResponse>;
  }

  /** 查询业务组列表接口 get /common/groupList */
  function getCommonGroupList(req: ET<GetCommonGroupList.Req>, options?: object): Promise<ET<GetCommonGroupList.Res>>;

  export module GetCommonOrgTree {
    export type OrgInfoBO = {
      /** 子级组织机构 */
      children?: Array<OrgInfoBO>;
      /** 组织机构code */
      code?: string;
      /** 组织机构名称 */
      name?: string;
      /** 组织机构状态 */
      status?: string;
    };

    export interface Req {
      /** 父级组织机构code */
      parentCode: string;
    }
    export type Res = Array<OrgInfoBO>;
  }

  /** 组织机构树列表 get /common/orgTree */
  function getCommonOrgTree(req: ET<GetCommonOrgTree.Req>, options?: object): Promise<ET<GetCommonOrgTree.Res>>;

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
    export type Res = Array<OptionResultResponse>;
  }

  /** 批量获取枚举选项信息接口 get /common/options */
  function getCommonOptions(req: ET<GetCommonOptions.Req>, options?: object): Promise<ET<GetCommonOptions.Res>>;

  export module GetCommonReloadCache {
    export interface Req {
      type: string;
    }
    export type Res = boolean;
  }

  /** get /common/reloadCache */
  function getCommonReloadCache(req: ET<GetCommonReloadCache.Req>, options?: object): Promise<ET<GetCommonReloadCache.Res>>;

  export module PostZxglZxjl {
    export interface Req {
      /** 咨询编号 */
      zxbh?: string;
      /** 被咨询者部门 */
      bm?: string;
      /** 被咨询者班组 */
      bz?: string;
      /** 坐席id */
      zxid?: string;
      /** 登陆者id */
      dlzid?: string;
      /** 分子公司代码 */
      fzgsdm?: string;
      /** 来电组id */
      ldzid?: string;
      /** 咨询方式 */
      zxfs?: string;
      /** 呼叫唯一标识 */
      hjwybs?: string;
      /** 主叫号码 */
      zjhm?: string;
      /** 接入号码 */
      jrhm?: string;
      /** 被叫号码 */
      bjhm?: string;
      /** 前转号码 */
      qzhm?: string;
      /** 咨询开始时间 */
      zxkssj?: string;
      /** 咨询时间 */
      zxsj?: string;
      /** 咨询时长 */
      zxsc?: string;
      /** 前转账号 */
      qzzh?: string;
      /** 话务来源 */
      hwly?: string;
      /** 咨询操作 */
      zxcz?: string;
      /** 咨询去向组 */
      zxqxz?: string;
      /** 咨询去向坐席id */
      zxqxzxid?: string;
      /** 录音文件地址 */
      lywjdz?: string;
      /** 话后处理开始时间 */
      hhclkssj?: string;
      /** 话后处理结束时间 */
      hhcljssj?: string;
      /** 处理情况 */
      clqk?: string;
      /** 业务大类 */
      ywdl?: string;
      /** 客户ID */
      khid?: string;
      /** 客户类型 */
      khlx?: string;
      /** 客户名称 */
      khmc?: string;
      /** 企业税号 */
      qysh?: string;
      /** 联系人姓名 */
      lxrxm?: string;
      /** 联系人id */
      lxrid?: string;
      /** 行政区划代码 */
      xzqhdm?: string;
      /** 企业分支机构 */
      qyFzjg?: string;
      /** 企业分子公司 */
      qyFzgs?: string;
      /** 所属客户经理 */
      sskhjl?: string;
      /** 用户有想法 */
      yhyxf?: string;
      /** 是否用户需求 */
      sfyhxq?: string;
      /** 用户态度 */
      yhtd?: string;
      /** 咨询事项 */
      zxsx?: string;
      /** 上门任务信息 */
      smrwxx?: string;
      /** 回电任务信息 */
      hdrwxx?: string;
      /** 远程任务信息 */
      ycrwxx?: string;
      /** 营销推荐信息 */
      yxtjxx?: string;
      /** 纠错题目集合 */
      jctms?: string;
      /** 线索ID */
      xsid?: string;
      /** 咨询内容 */
      zxnr?: string;
      /** 咨询回复 */
      zxhf?: string;
      /** 龙山税友会话ID */
      lssysessionid?: string;
      /** 联系电话 */
      lxdh?: string;
      /** 交互类型 */
      jhlx?: string;
      /** 来源类型 */
      lylx?: string;
      /** 来源ID */
      lyid?: string;
    }
    export type Res = Record<string, string>;
  }

  /** 保存咨询记录 post /zxgl/zxjl */
  function postZxglZxjl(req: ET<PostZxglZxjl.Req>, options?: object): Promise<ET<PostZxglZxjl.Res>>;

  export module GetOlhelpChatList {
    export type T = {
      /** 对话id */
      msgId?: string;
      /** 坐席名称 */
      agentName?: string;
      /** 坐席工号 */
      workId?: string;
      /** 坐席组名称 */
      groupName?: string;
      /** 处理类型 */
      handleType?: string;
      /** 联系人 */
      contacter?: string;
      /** 咨询时间 */
      consultTime?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 客户id */
      khid?: string;
      /** 手机号 */
      mobile?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<T>;
    }
  }

  /** 查询在线咨询记录列表 get /zxgl/olhelp/chatList */
  function getOlhelpChatList(req: ET<GetOlhelpChatList.Req>, options?: object): Promise<ET<GetOlhelpChatList.Res>>;

  export module GetZxglGetExternalPlatformTelList {
    export type ExternalPlatformTelResponse = {
      /** 地区名称 */
      areaName?: string;
      /** 电话号码 */
      telephone?: string;
    };

    export type Req = any;
    export type Res = Array<ExternalPlatformTelResponse>;
  }

  /** 查询配置的外部平台号码信息列表 get /zxgl/getExternalPlatformTelList */
  function getZxglGetExternalPlatformTelList(req?: ET<GetZxglGetExternalPlatformTelList.Req>, options?: object): Promise<ET<GetZxglGetExternalPlatformTelList.Res>>;

  export module GetZxglKhxxList {
    export type LastConsultCustomerInfoResponse = {
      /** 地税税号 */
      dssh?: string;
      /** 地税税务机构代码 */
      dsswjgDm?: string;
      dz?: string;
      /** 分子公司代码 */
      fzgsdm?: string;
      /** 国税税号 */
      gssh?: string;
      /** 国税税务机构代码 */
      gsswjgDm?: string;
      qyhbz?: string;
      shxydm?: string;
      /** 状态值，是否注销 */
      status?: string;
      /** 状态名称 */
      statusMc?: string;
      /** 行政区划代码 */
      xzqhDm?: string;
      /** 行政区划名称 */
      xzqhMc?: string;
      /** 用户代码 */
      yhdm?: string;
      /** bizId */
      yhid?: string;
      /** 用户简称 */
      yhjc?: string;
      /** 用户类型：0：单位用户，1：代理商或事务所，2：个人代理 */
      yhlx?: string;
      /** 用户名称 */
      yhmc?: string;
      zcbm?: string;
      /** 联系人列表（具体内容不详，拿到再补充） */
      lxrxxList?: Array<ContactInfoResponse>;
      /** 最近来电用户专用：来电时间 */
      ldsj?: string;
      /** 最近来电用户专用：联系人id */
      lxrid?: string;
      /** 最近来电用户专用：联系人名称 */
      lxrmc?: string;
    };
    export type CustomerInfoResponse = {
      /** 地税税号 */
      dssh?: string;
      /** 地税税务机构代码 */
      dsswjgDm?: string;
      dz?: string;
      /** 分子公司代码 */
      fzgsdm?: string;
      /** 国税税号 */
      gssh?: string;
      /** 国税税务机构代码 */
      gsswjgDm?: string;
      qyhbz?: string;
      shxydm?: string;
      /** 状态值，是否注销 */
      status?: string;
      /** 状态名称 */
      statusMc?: string;
      /** 行政区划代码 */
      xzqhDm?: string;
      /** 行政区划名称 */
      xzqhMc?: string;
      /** 用户代码 */
      yhdm?: string;
      /** bizId */
      yhid?: string;
      /** 用户简称 */
      yhjc?: string;
      /** 用户类型：0：单位用户，1：代理商或事务所，2：个人代理 */
      yhlx?: string;
      /** 用户名称 */
      yhmc?: string;
      zcbm?: string;
      /** 联系人列表（具体内容不详，拿到再补充） */
      lxrxxList?: Array<ContactInfoResponse>;
    };
    export type ContactInfoResponse = {
      dz?: string;
      kjid?: string;
      /** 联系人id */
      lxrid?: string;
      /** 联系人名称 */
      lxrmc?: string;
      /** QQ号码 */
      qq?: string;
      /** 性别 */
      xb?: string;
      /** 电话号码列表 */
      dhhmList?: Array<LxrdhResponse>;
      /** 联系人角色信息列表 */
      jsxxList?: Array<LxrjsResponse>;
      /** 联系人手机号码列表 */
      sjhmList?: Array<LxrsjhResponse>;
    };
    export type LxrdhResponse = {
      /** 最后修改时间，格式：yyyy-MM-dd HH:mm:ss */
      zhxgsj?: string;
      /** 分机号 */
      fjh?: string;
      /** 电话号码 */
      dhhm?: string;
      /** 区号 */
      qh?: string;
      /** 区号-电话号码-分机号 */
      qhdhhmfjh?: string;
      /** 区号-电话号码 */
      qhdhhm?: string;
      /** 联系人电话id */
      lxdhid?: string;
    };
    export type LxrjsResponse = {
      /** 联系人角色代码 */
      jsdm?: string;
      /** 联系人角色名称 */
      jsmc?: string;
      /** 联系人用户id */
      lxrYhid?: string;
      /** 最后修改时间，格式：yyyy-MM-dd HH:mm:ss */
      zhxgsj?: string;
    };
    export type LxrsjhResponse = {
      /** 操作类型 */
      czlx?: string;
      /** 联系手机号id */
      lxsjid?: string;
      /** 手机号码 */
      sjhm?: string;
      /** 最后修改时间，格式：yyyy-MM-dd HH:mm:ss */
      zhxgsj?: string;
    };

    export interface Req {
      /** 来电号码 */
      ldhm: string;
    }
    export interface Res {
      /** 最近来电用户 */
      zjldyh?: LastConsultCustomerInfoResponse;
      /** 来电号码对应的客户列表 */
      yhList?: Array<CustomerInfoResponse>;
    }
  }

  /** 根据khxxList获取客户信息 get /zxgl/khxxList */
  function getZxglKhxxList(req: ET<GetZxglKhxxList.Req>, options?: object): Promise<ET<GetZxglKhxxList.Res>>;

  export module GetZxglLdzxList {
    export type ConsultRecordWithMatterResponse = {
      /** 咨询编号 */
      zxbh?: string;
      /** 咨询方式 */
      zxlx?: string;
      /** 龙山税友sessionId */
      lssysessionid?: string;
      /** 坐席id */
      zxid?: string;
      /** 处理方式0 解决，1 派发、2 回电、3 远程、4 代办 */
      clfs?: string;
      /** 处理方式0 解决，1 派发、2 回电、3 远程、4 代办 */
      clfsmc?: string;
      /** 咨询回复 */
      hfnr?: string;
      /** 咨询时间 */
      zxsj?: string;
      /** 用户态度 */
      yhtd?: string;
      /** 用户技能 */
      yhjn?: string;
      /** 联系人 */
      lxr?: string;
      /** 主叫号码 */
      lxdh?: string;
      /** 是否指定质检Y是N否 */
      sfzdzj?: string;
      /** 指定之间提交人 */
      zdzjTjr?: string;
      /** 咨询名称 */
      zxmc?: string;
      /** 咨询事项列表 */
      zxsxList?: Array<ConsultMatterResponse>;
      /** 咨询事项字符串 */
      zxsxStr?: string;
      /** 咨询记录交互类型名称 */
      jhlxmc?: string;
    };
    export type ConsultMatterResponse = {
      /** 咨询事项id */
      zxsxid?: string;
      /** 咨询记录id */
      zxjlid?: string;
      /** 咨询事项名 */
      sxmc?: string;
      /** 是否已解决 */
      sfyjj?: string;
      /** 是否标准事项 */
      sfbzsx?: string;
      /** 创建人id */
      cjrid?: string;
      /** 创建时间 */
      cjsj?: string;
      /** 客户id */
      khid?: string;
      /** 客户类型 */
      khlx?: string;
      /** 客户名称 */
      khmc?: string;
      /** 事项描述 */
      sxms?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 客户id */
      khid?: string;
      /** 客户代码 */
      khdm?: string;
      /** 客户类型，0：单位客户，1：代理商或中介机构，2：个人代理 */
      khlx?: string;
      /** 联系人id */
      lxrid?: string;
      /** 是否是刷新，Y:刷新，刷新要加载之前的所有页内容 */
      isReflesh?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ConsultRecordWithMatterResponse>;
    }
  }

  /** 查询来电咨询列表 get /zxgl/ldzxList */
  function getZxglLdzxList(req: ET<GetZxglLdzxList.Req>, options?: object): Promise<ET<GetZxglLdzxList.Res>>;

  export module GetTsxxGetOneYearTscs {
    export interface Req {
      /** 客户ID */
      khid: string;
      /** 客户代码 */
      khdm: string;
      /** 客户类型 */
      khlx: string;
    }
    export type Res = number;
  }

  /** 投诉次数统计 get /zxgl/tsxx/getOneYearTscs */
  function getTsxxGetOneYearTscs(req: ET<GetTsxxGetOneYearTscs.Req>, options?: object): Promise<ET<GetTsxxGetOneYearTscs.Res>>;

  export module GetZxglGetZxcs {
    export interface Req {
      /** 客户ID */
      khid: string;
      /** 客户代码 */
      khdm: string;
      /** 客户类型 */
      khlx: string;
      /** 联系人id */
      lxrid: string;
    }
    export type Res = string;
  }

  /** 来电咨询次数统计 get /zxgl/getZxcs */
  function getZxglGetZxcs(req: ET<GetZxglGetZxcs.Req>, options?: object): Promise<ET<GetZxglGetZxcs.Res>>;

  export module GetTsxxTsxxCx {
    export type ComplaintResponse = {
      /** 诉求时间 */
      sqsj?: string;
      /** 登记人名称 */
      djrmc?: string;
      /** 诉求内容 */
      sqnr?: string;
      /** 回复内容 */
      hfnr?: string;
      /** 诉求状态 */
      sqzt?: string;
      /** 诉求状态名称 */
      sqztmc?: string;
      /** 诉求类型 */
      sqlx?: string;
      /** 诉求类型名称 */
      sqlxmc?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 客户id */
      khid?: string;
      /** 客户代码 */
      khdm?: string;
      /** 客户类型，0：单位客户，1：代理商和中介机构，2：个人代理 */
      khlx?: string;
      /** 联系人id */
      lxrid?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ComplaintResponse>;
    }
  }

  /** 一户式查询投诉信息 get /zxgl/tsxx/tsxxCx */
  function getTsxxTsxxCx(req: ET<GetTsxxTsxxCx.Req>, options?: object): Promise<ET<GetTsxxTsxxCx.Res>>;

  export module GetZxglQueryAreaidByZid {
    export interface Req {
      zid: string;
    }
    export type Res = string;
  }

  /** 根据技能组id获取所属地id get /zxgl/queryAreaidByZid */
  function getZxglQueryAreaidByZid(req: ET<GetZxglQueryAreaidByZid.Req>, options?: object): Promise<ET<GetZxglQueryAreaidByZid.Res>>;

  export module GetZxglQueryAreaList {
    export type XzqhFzgsResponse = {
      /** 行政区划代码 */
      id?: string;
      /** 行政区划名称 */
      name?: string;
      /** 分子公司代码 */
      fzgsdm?: string;
    };

    export type Req = any;
    export type Res = Array<XzqhFzgsResponse>;
  }

  /** 返回地区列表 get /zxgl/queryAreaList */
  function getZxglQueryAreaList(req?: ET<GetZxglQueryAreaList.Req>, options?: object): Promise<ET<GetZxglQueryAreaList.Res>>;

  export module GetZxglQueryZxjlByLdhm {
    export type ConsultHistoryResponse = {
      /** 受理人名称 */
      slrmc?: string;
      /** 咨询事项 */
      zxsx?: string;
      /** 处理情况 */
      clqk?: string;
      /** 咨询时间 */
      zxsj?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 来电号码 */
      ldhm?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ConsultHistoryResponse>;
    }
  }

  /** 根据来电号码查询咨询历史 get /zxgl/queryZxjlByLdhm */
  function getZxglQueryZxjlByLdhm(req: ET<GetZxglQueryZxjlByLdhm.Req>, options?: object): Promise<ET<GetZxglQueryZxjlByLdhm.Res>>;

  export module PostZxglSendHdMessage {
    export interface Req {
      /** 任务编号 */
      rwbh?: string;
      /** 企业名称 */
      qymc?: string;
      /** 企业税号 */
      qysh?: string;
    }
    export type Res = boolean;
  }

  /** 提醒回电 post /zxgl/sendHdMessage */
  function postZxglSendHdMessage(req: ET<PostZxglSendHdMessage.Req>, options?: object): Promise<ET<PostZxglSendHdMessage.Res>>;

  export module GetGroupList {
    export type ConsultMatterGroupResponse = {
      /** 事项分组ID */
      groupId?: number;
      /** 事项分组名称 */
      groupName?: string;
      /** 咨询事项配置集合 */
      consultMatterList?: Array<ConsultMatterContentBO>;
      /** 排序字段 */
      orderNum?: number;
    };
    export type ConsultMatterContentBO = {
      /** 事项内容ID */
      id?: number;
      /** 事项内容 */
      content?: string;
      /** 排序字段 */
      orderNum?: number;
    };

    export interface Req {
      /** 行政区划代码 */
      areaCode: string;
      /** 当前坐席的技能组id */
      groupId: number;
    }
    export type Res = Array<ConsultMatterGroupResponse>;
  }

  /** 咨询事项配置查询 get /consultMatter/group/list */
  function getGroupList(req: ET<GetGroupList.Req>, options?: object): Promise<ET<GetGroupList.Res>>;

  export module PostPersonalSave {
    export interface Req {
      /** 咨询事项内容 */
      content: string;
    }
    export type Res = number;
  }

  /** 保存个人咨询事项 post /consultMatter/personal/save */
  function postPersonalSave(req: ET<PostPersonalSave.Req>, options?: object): Promise<ET<PostPersonalSave.Res>>;

  export module GetLxrGetLxrxxByYh {
    export type LxrxxResponse = {
      /** 联系人id */
      lxrid?: string;
      /** 联系人名称 */
      lxrmc?: string;
      /** 性别 */
      xb?: string;
      /** 称谓 */
      cw?: string;
      /** 地区代码 */
      areaCode?: string;
      /** 行政区划代码 */
      xzqhDm?: string;
      /** QQ号码 */
      qq?: string;
      /** 地址 */
      address?: string;
      /** 通行密码 */
      zcbm?: string;
      /** 备注 */
      bz?: string;
      /** 邮箱 */
      email?: string;
      /** 状态 */
      status?: string;
      /** 状态名称 */
      statusMc?: string;
      /** 电话号码列表 */
      dhhmList?: Array<LxrdhResponse>;
      /** 联系人角色信息列表 */
      jsxxList?: Array<LxrjsResponse>;
      /** 联系人手机号码列表 */
      sjhmList?: Array<LxrsjhResponse>;
    };
    export type LxrdhResponse = {
      /** 最后修改时间，格式：yyyy-MM-dd HH:mm:ss */
      zhxgsj?: string;
      /** 分机号 */
      fjh?: string;
      /** 电话号码 */
      dhhm?: string;
      /** 区号 */
      qh?: string;
      /** 区号-电话号码-分机号 */
      qhdhhmfjh?: string;
      /** 区号-电话号码 */
      qhdhhm?: string;
      /** 联系人电话id */
      lxdhid?: string;
    };
    export type LxrjsResponse = {
      /** 联系人角色代码 */
      jsdm?: string;
      /** 联系人角色名称 */
      jsmc?: string;
      /** 联系人用户id */
      lxrYhid?: string;
      /** 最后修改时间，格式：yyyy-MM-dd HH:mm:ss */
      zhxgsj?: string;
    };
    export type LxrsjhResponse = {
      /** 操作类型 */
      czlx?: string;
      /** 联系手机号id */
      lxsjid?: string;
      /** 手机号码 */
      sjhm?: string;
      /** 最后修改时间，格式：yyyy-MM-dd HH:mm:ss */
      zhxgsj?: string;
    };

    export interface Req {
      /** 业务id */
      khid: string;
      /** 客户类型，0：单位客户，1：代理商或中介机构，2：个人代理 */
      khlx: string;
    }
    export type Res = Array<LxrxxResponse>;
  }

  /** 查询联系人列表 get /customerCenter/lxr/getLxrxxByYh */
  function getLxrGetLxrxxByYh(req: ET<GetLxrGetLxrxxByYh.Req>, options?: object): Promise<ET<GetLxrGetLxrxxByYh.Res>>;

  export module GetNsdwGetNsdwByKhid {
    export type BusinessInfoBO = {
      /** 所属客户经理代码 */
      sskhjlDm?: string;
      /** 所属客户经理名称 */
      sskhjlMc?: string;
      /** 业务大类代码 */
      ywdlDm?: string;
      /** 业务大类名称 */
      ywdlMc?: string;
      /** 所属网点代码 */
      sswdDm?: string;
      /** 所属网点名称 */
      sswdMc?: string;
    };
    export type ProxyInfoBO = {
      /** 产品大类代码 */
      cpdlDm?: string;
      /** 产品大类名称 */
      cpdlMc?: string;
      /** 用户代码 */
      yhdm?: string;
      /** 用户id */
      yhid?: string;
      /** 用户简称 */
      yhjc?: string;
      /** 用户名称 */
      yhmc?: string;
    };

    export interface Req {
      /** 业务id */
      khid: string;
    }
    export interface Res {
      /** bizid */
      yhid?: string;
      /** 用户名称 */
      yhmc?: string;
      /** 用户简称 */
      yhjc?: string;
      /** 电话号码 */
      dhhm?: string;
      /** 分子公司代码 */
      fzgsDm?: string;
      /** 分子公司名称 */
      fzgsMc?: string;
      /** 国税税务机关名称 */
      gsswjgMc?: string;
      /** 国税税务机构代码 */
      gsswjgDm?: string;
      /** 地税税务机关代码 */
      dsswjgDm?: string;
      /** 地税税务机构名称 */
      dsswjgMc?: string;
      /** 地税税号 */
      dssh?: string;
      /** 纳税人识别号 */
      nsrsbh?: string;
      /** 传真号码 */
      faxNumber?: string;
      /** 审核信用代码 */
      shxydm?: string;
      /** 通行密码 */
      zcbm?: string;
      /** 企业类型 */
      qytype?: string;
      /** 行业大类代码 */
      hydlDm?: string;
      /** 行业大类名称 */
      hydlMc?: string;
      /** 地区代码 */
      areaCode?: string;
      /** 行政区划代码 */
      xzqhDm?: string;
      /** 行政区划名称 */
      xzqhMc?: string;
      /** 行政区划简称 */
      xzqhjc?: string;
      /** 出口企业类型信息 */
      yhlbxx?: string;
      /** 经营地址 */
      jydz?: string;
      /** 备注 */
      bz?: string;
      /** 海关代码 */
      hgdm?: string;
      /** 状态 */
      status?: string;
      /** 状态名称 */
      statusMc?: string;
      /** 业务信息列表 */
      ywxxList?: Array<BusinessInfoBO>;
      /** 被代理信息列表 */
      bdlList?: Array<ProxyInfoBO>;
    }
  }

  /** 查询纳税单位信息 get /customerCenter/nsdw/getNsdwByKhid */
  function getNsdwGetNsdwByKhid(req: ET<GetNsdwGetNsdwByKhid.Req>, options?: object): Promise<ET<GetNsdwGetNsdwByKhid.Res>>;

  export module GetCustomerCenterQueryCustomerInfoFromTaxNet {
    export type KhxxResponse = {
      /** 地税税务机关代码 */
      dsswjgDm?: string;
      /** 地税税号 */
      dssh?: string;
      /** 国税税号 */
      gssh?: string;
      /** 国税税务机构代码 */
      gsswjgDm?: string;
      /** 地址 */
      dz?: string;
      /** 分子公司代码 */
      fzgsDm?: string;
      /** 签约户标志 */
      qyhbz?: string;
      /** 社会信用代码 */
      shxydm?: string;
      /** 状态 */
      status?: string;
      /** 状态名称 */
      statusMc?: string;
      /** 行政区划代码 */
      xzqhDm?: string;
      /** 行政区划名称 */
      xzqhMc?: string;
      /** 用户代码 */
      yhdm?: string;
      /** bizid */
      yhid?: string;
      /** 用户名称 */
      yhmc?: string;
      /** 用户简称 */
      yhjc?: string;
      /** 用户类型：0：单位用户，1：代理商或事务所，2：个人代理 */
      yhlx?: string;
      /** 通行密码 */
      zcbm?: string;
    };

    export interface Req {
      /** 税号 */
      taxNo?: string;
      /** 地区代码 */
      areaId?: string;
      /** 同步渠道 national：国税通道；local：地税通道；all：国地税通道 */
      channel?: string;
    }
    export type Res = Array<KhxxResponse>;
  }

  /** 从税务网关查询客户信息 get /customerCenter/queryCustomerInfoFromTaxNet */
  function getCustomerCenterQueryCustomerInfoFromTaxNet(req: ET<GetCustomerCenterQueryCustomerInfoFromTaxNet.Req>, options?: object): Promise<ET<GetCustomerCenterQueryCustomerInfoFromTaxNet.Res>>;

  export module GetTemplateList {
    export type EmailTemplateResponse = {
      /** 分子公司代码 */
      companyId?: string;
      /** 分子公司名称 */
      companyName?: string;
      /** 邮件类型id */
      emailTypeCode?: string;
      /** 邮件类型名称 */
      emailTypeName?: string;
      /** 模板名称 */
      templateName?: string;
      /** 邮件正文 */
      content?: string;
      /** 模板id */
      templateId?: number;
      /** 附件列表 */
      attachmentList?: Array<EmailAttachmentResponse>;
    };
    export type EmailAttachmentResponse = {
      /** 附件id */
      id?: number;
      /** 附件路径 */
      filePath?: string;
      /** 附件名称 */
      name?: string;
      /** 附件大小 */
      fileSize?: number;
    };

    export interface Req {
      /** 邮件类型 */
      emailTypeCode?: string;
      /** 分子公司代码 */
      companyId?: string;
    }
    export type Res = Array<EmailTemplateResponse>;
  }

  /** 获取邮件模板集合 get /email/template/list */
  function getTemplateList(req: ET<GetTemplateList.Req>, options?: object): Promise<ET<GetTemplateList.Res>>;

  export module PostEmailSend {
    export type EmailAttachmentRequest = {
      /** 附件名称 */
      name?: string;
      /** 路径 */
      filePath?: string;
    };

    export interface Req {
      /** 企业税号 */
      taxNumber?: string;
      /** 企业名称 */
      companyName?: string;
      /** 来电号码 */
      mobile?: string;
      /** 邮件类型 */
      emailTypeCode?: string;
      /** 模板id */
      templateId?: number;
      /** 邮件地址 */
      emailTo?: string;
      /** 邮件主题 */
      subject?: string;
      /** 邮件内容 */
      content?: string;
      /** 分子公司代码 */
      companyId?: string;
      /** 用户代码 */
      userCode?: string;
      /** 注册编码 */
      password?: string;
      /** 所属国税机关 */
      nationalTaxDepart?: string;
      /** 所属地税机关 */
      localTaxDepart?: string;
      /** 附件集合 */
      attachmentList?: Array<EmailAttachmentRequest>;
    }
    export type Res = boolean;
  }

  /** 发送邮件 post /email/send */
  function postEmailSend(req: ET<PostEmailSend.Req>, options?: object): Promise<ET<PostEmailSend.Res>>;

  export module PostYhfkAddYhfk {
    export interface Req {
      /** 反馈主题. */
      fkzt?: string;
      /** 反馈内容. */
      fknr?: string;
      /** 产品系列. */
      cpxl?: string;
      /** 客户ID. */
      khid?: string;
      /** 客户名称. */
      khmc?: string;
      /** 联系人名称. */
      lxrmc?: string;
      /** 联系人ID. */
      lxrid?: string;
      /** 来电号码. */
      ldhm?: string;
    }
    export type Res = boolean;
  }

  /** 新增反馈 post /yhfk/addYhfk */
  function postYhfkAddYhfk(req: ET<PostYhfkAddYhfk.Req>, options?: object): Promise<ET<PostYhfkAddYhfk.Res>>;

  export module GetYhfkCheckYhfk {
    export interface Req {
      fkbh: string;
    }
    export type Res = boolean;
  }

  /** 反馈并发校验 get /yhfk/checkYhfk */
  function getYhfkCheckYhfk(req: ET<GetYhfkCheckYhfk.Req>, options?: object): Promise<ET<GetYhfkCheckYhfk.Res>>;

  export module PostYhfkDeleteYhfk {
    export interface Req {
      /** 反馈编号 */
      fkbh?: string;
    }
    export type Res = boolean;
  }

  /** 删除反馈 post /yhfk/deleteYhfk */
  function postYhfkDeleteYhfk(req: ET<PostYhfkDeleteYhfk.Req>, options?: object): Promise<ET<PostYhfkDeleteYhfk.Res>>;

  export module GetYhfkQueryYhfkList {
    export type FeedbackResponse = {
      /** 反馈编号. */
      fkbh?: string;
      /** 反馈主题. */
      fkzt?: string;
      /** 反馈内容. */
      fknr?: string;
      /** 反馈时间. */
      fksj?: string;
      /** 产品系列. */
      cpxl?: string;
      /** 产品系列名称. */
      cpxlmc?: string;
      /** 客户ID. */
      khid?: string;
      /** 客户名称. */
      khmc?: string;
      /** 联系人名称. */
      lxrmc?: string;
      /** 联系人ID. */
      lxrid?: string;
      /** 来电号码. */
      ldhm?: string;
      /** 提交人. */
      tjr?: string;
      /** 提交人名称. */
      tjrmc?: string;
      /** 提交人工号. */
      tjrgh?: string;
      /** 提交人部门. */
      tjrbm?: string;
      /** 提交人部门名称. */
      tjrbmmc?: string;
      /** 反馈状态. */
      status?: string;
      /** 反馈状态名称. */
      statusName?: string;
      /** 理由. */
      ly?: string;
      /** 最后修改人. */
      zhxgr?: string;
      /** 最后修改人. */
      zhxgrmc?: string;
      /** 最后修改时间. */
      zhxgsj?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 反馈编号. */
      fkbh?: string;
      /** 反馈主题. */
      fkzt?: string;
      /** 反馈时间起. */
      fksjq?: string;
      /** 反馈时间止. */
      fksjz?: string;
      /** 反馈状态. */
      status?: string;
      /** 产品系列. */
      cpxl?: string;
      /** 提交人. */
      tjr?: string;
      /** 提交人部门. */
      tjrbm?: Array<string>;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<FeedbackResponse>;
    }
  }

  /** 查询用户反馈列表 get /yhfk/queryYhfkList */
  function getYhfkQueryYhfkList(req: ET<GetYhfkQueryYhfkList.Req>, options?: object): Promise<ET<GetYhfkQueryYhfkList.Res>>;

  export module PostYhfkUpdateYhfkZx {
    export interface Req {
      /** 反馈编号 */
      fkbh?: string;
      /** 反馈主题. */
      fkzt?: string;
      /** 反馈内容. */
      fknr?: string;
      /** 产品系列. */
      cpxl?: string;
      /** 客户ID. */
      khid?: string;
      /** 客户名称. */
      khmc?: string;
      /** 联系人名称. */
      lxrmc?: string;
      /** 联系人ID. */
      lxrid?: string;
      /** 来电号码. */
      ldhm?: string;
    }
    export type Res = boolean;
  }

  /** 修改反馈-坐席 post /yhfk/updateYhfkZx */
  function postYhfkUpdateYhfkZx(req: ET<PostYhfkUpdateYhfkZx.Req>, options?: object): Promise<ET<PostYhfkUpdateYhfkZx.Res>>;

  export module GetFjShareFile {
    export type AttachMentResponse = {
      /** 附件名称 */
      fjmc?: string;
      /** 附件描述 */
      fjms?: string;
      /** 附件发布（上传）人ID */
      fbrid?: string;
      /** 发布人姓名 */
      fbrName?: string;
      /** 附件大小 */
      fjdx?: string;
      /** 扩展名 */
      kzm?: string;
      /** 附件ID */
      fjid?: string;
      /** 来源ID */
      lyid?: string;
      /** 来源代码 */
      lydm?: string;
      /** 附件路径 */
      fjpath?: string;
      /** 发布时间 */
      fbsj?: Timestamp;
      /** 分子公司代码 */
      fzgsdm?: string;
      /** 公开程序 */
      gkcd?: string;
    };
    export type Timestamp = any;

    export interface Req {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 附件名称 */
      fjmc?: string;
      /** 附件描述 */
      fjms?: string;
      /** 附件发布（上传）人ID */
      fbrid?: string;
      /** 附件大小 */
      fjdx?: string;
      /** 附件唯一标识符 */
      fjguid?: string;
      /** 扩展名 */
      kzm?: string;
      /** 附件ID */
      fjid?: string;
      /** 来源ID */
      lyid?: string;
      /** 来源代码 */
      lydm?: string;
      /** 附件路径 */
      fjpath?: string;
      /** 发布时间 */
      fbsj?: string;
      /** 附件发布人姓名 */
      fbrName?: string;
      /** 分子公司代码 */
      fzgsdm?: string;
      /** 公开程序 */
      gkcd?: string;
      /** 登录者ID */
      dlzid?: string;
      /** 分子公司代码 */
      fzgs?: string;
      /** 网点代码 */
      wddm?: string;
      /** 技能组ID */
      jnzid?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<AttachMentResponse>;
    }
  }

  /** 查询共享文件列表接口 get /other/fj/shareFile */
  function getFjShareFile(req: ET<GetFjShareFile.Req>, options?: object): Promise<ET<GetFjShareFile.Res>>;

  export module GetGroupQueryGroupWorkFlag {
    export interface Req {
      /** 组id */
      groupId: number;
    }
    export interface Res {
      /** 当前时间是否上班时间，上班true,不上班false */
      workTimeFlag?: boolean;
      /** 当天是特殊日或者节假日或者工作日上班时间为true，工作日下班时间为false */
      planFlag?: boolean;
    }
  }

  /** 查询业务组是否是上班时间 get /group/queryGroupWorkFlag */
  function getGroupQueryGroupWorkFlag(req: ET<GetGroupQueryGroupWorkFlag.Req>, options?: object): Promise<ET<GetGroupQueryGroupWorkFlag.Res>>;

  export module GetHsGetBindXzsInfo {
    export type AccountBindInfoResponse = {
      /** 绑定时间 */
      bindTime?: string;
      /** 注册时间 */
      regTime?: string;
      /** 电话号码 */
      mobile?: string;
    };
    export type MacBindInfoResponse = {
      /** 绑定时间 */
      bindTime?: string;
    };

    export interface Req {
      /** 纳税人识别号 */
      nsrsbh: string;
      /** 行政区划代码 */
      xzqhdm: string;
    }
    export interface Res {
      /** 个人绑定信息列表 */
      hadRegList?: Array<AccountBindInfoResponse>;
      /** mac绑定信息 */
      hadBindInfo?: MacBindInfoResponse;
    }
  }

  /** 查询小助手绑定情况 get /hs/getBindXzsInfo */
  function getHsGetBindXzsInfo(req: ET<GetHsGetBindXzsInfo.Req>, options?: object): Promise<ET<GetHsGetBindXzsInfo.Res>>;

  export module GetSqxxGetFwsqByKhid {
    export type ServiceAuthInfoResponse = {
      /** 产品类型代码 */
      productTypeCode?: string;
      /** 产品类型名称 */
      productTypeName?: string;
      /** 服务对象id */
      serviceTargetId?: string;
      /** 服务对象名称 */
      serviceTargetName?: string;
      /** 服务对象类型 */
      serviceTargetType?: string;
      /** 服务方式 */
      serviceType?: string;
      /** 服务内容代码 */
      serviceContentCode?: string;
      /** 服务内容名称 */
      serviceContentName?: string;
      /** 服务内容类型代码 */
      serviceContentTypeCode?: string;
      /** 服务内容类型名称 */
      serviceContentTypeName?: string;
      /** 构件id */
      componentId?: string;
      /** 构件名称 */
      componentName?: string;
      /** 授权日期起 */
      authDateBegin?: string;
      /** 授权日期止 */
      authDateEnd?: string;
      /** 状态代码 */
      authStatusCode?: string;
      /** 状态名称 */
      authStatusName?: string;
    };

    export interface Req {
      /** 客户业务id */
      khid: string;
    }
    export type Res = Array<ServiceAuthInfoResponse>;
  }

  /** 查询服务授权列表 get /auth/sqxx/getFwsqByKhid */
  function getSqxxGetFwsqByKhid(req: ET<GetSqxxGetFwsqByKhid.Req>, options?: object): Promise<ET<GetSqxxGetFwsqByKhid.Res>>;

  export module GetSqxxGetRjsqByKhid {
    export type SoftwareAuthInfoResponse = {
      /** 分板代码 */
      subVersionCode?: string;
      /** 分板名称 */
      subVersionName?: string;
      /** 软件代码 */
      softwareCode?: string;
      /** 软件id */
      softwareId?: string;
      /** 软件名称 */
      softwareName?: string;
      /** 软件版本 */
      softwareVersion?: string;
      /** 授权类型 */
      authType?: string;
      /** 授权码 */
      authCode?: string;
      /** 授权日期起 */
      authDateBegin?: string;
      /** 授权日期止 */
      authDateEnd?: string;
      /** 授权状态代码 */
      authStatusCode?: string;
      /** 授权状态名称 */
      authStatusName?: string;
    };

    export interface Req {
      /** 客户业务id */
      khid: string;
    }
    export type Res = Array<SoftwareAuthInfoResponse>;
  }

  /** 查询软件授权列表 get /auth/sqxx/getRjsqByKhid */
  function getSqxxGetRjsqByKhid(req: ET<GetSqxxGetRjsqByKhid.Req>, options?: object): Promise<ET<GetSqxxGetRjsqByKhid.Res>>;

  export module GetOrderGetUserOrder {
    export type OrderInfoResponse = {
      /** 订单编号 */
      orderId?: string;
      /** 订单时间 */
      orderTime?: string;
      /** 收款时间 */
      collectionTime?: string;
      /** 应收金额 */
      receivableAmount?: string;
      /** 收款状态 */
      collectionStatus?: string;
      /** 开票时间 */
      invoicingTime?: string;
      /** 开票状态 */
      invoicingStatus?: string;
      /** 交付时间 */
      deliverTime?: string;
      /** 交付状态 */
      deliverStatus?: string;
      /** 产品包列表 */
      productList?: Array<OrderProductResponse>;
      /** 物流信息 */
      logisticsInfo?: Array<OrderLogisticsResponse>;
      /** 发票信息 */
      invoiceInfo?: OrderInvoiceResponse;
    };
    export type OrderProductResponse = {
      /** 订单产品包名称 */
      productName?: string;
      thly?: string;
    };
    export type OrderLogisticsResponse = {
      /** 交付方式 */
      logisticsType?: string;
      /** 交付方式 */
      logisticsStatus?: string;
    };
    export type OrderInvoiceResponse = {
      /** 发票修改标识 */
      invoiceModifyFlag?: boolean;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户业务id */
      khid?: string;
      /** 客户类型 */
      khlx?: string;
      /** 客户代码 */
      khdm?: string;
      /** 查询类型 */
      cxlx?: string;
    }
    export type Res = Array<OrderInfoResponse>;
  }

  /** 查询用户订单列表 get /sw/order/getUserOrder */
  function getOrderGetUserOrder(req: ET<GetOrderGetUserOrder.Req>, options?: object): Promise<ET<GetOrderGetUserOrder.Res>>;

  export module GetCustomerPortalSearchCustomer {
    export type CustomerInfoResponse = {
      /** 地税税号 */
      dssh?: string;
      /** 地税税务机构代码 */
      dsswjgDm?: string;
      dz?: string;
      /** 分子公司代码 */
      fzgsdm?: string;
      /** 国税税号 */
      gssh?: string;
      /** 国税税务机构代码 */
      gsswjgDm?: string;
      qyhbz?: string;
      shxydm?: string;
      /** 状态值，是否注销 */
      status?: string;
      /** 状态名称 */
      statusMc?: string;
      /** 行政区划代码 */
      xzqhDm?: string;
      /** 行政区划名称 */
      xzqhMc?: string;
      /** 用户代码 */
      yhdm?: string;
      /** bizId */
      yhid?: string;
      /** 用户简称 */
      yhjc?: string;
      /** 用户类型：0：单位用户，1：代理商或事务所，2：个人代理 */
      yhlx?: string;
      /** 用户名称 */
      yhmc?: string;
      zcbm?: string;
      /** 联系人列表（具体内容不详，拿到再补充） */
      lxrxxList?: Array<ContactInfoResponse>;
    };
    export type ContactInfoResponse = {
      dz?: string;
      kjid?: string;
      /** 联系人id */
      lxrid?: string;
      /** 联系人名称 */
      lxrmc?: string;
      /** QQ号码 */
      qq?: string;
      /** 性别 */
      xb?: string;
      /** 电话号码列表 */
      dhhmList?: Array<LxrdhResponse>;
      /** 联系人角色信息列表 */
      jsxxList?: Array<LxrjsResponse>;
      /** 联系人手机号码列表 */
      sjhmList?: Array<LxrsjhResponse>;
    };
    export type LxrdhResponse = {
      /** 最后修改时间，格式：yyyy-MM-dd HH:mm:ss */
      zhxgsj?: string;
      /** 分机号 */
      fjh?: string;
      /** 电话号码 */
      dhhm?: string;
      /** 区号 */
      qh?: string;
      /** 区号-电话号码-分机号 */
      qhdhhmfjh?: string;
      /** 区号-电话号码 */
      qhdhhm?: string;
      /** 联系人电话id */
      lxdhid?: string;
    };
    export type LxrjsResponse = {
      /** 联系人角色代码 */
      jsdm?: string;
      /** 联系人角色名称 */
      jsmc?: string;
      /** 联系人用户id */
      lxrYhid?: string;
      /** 最后修改时间，格式：yyyy-MM-dd HH:mm:ss */
      zhxgsj?: string;
    };
    export type LxrsjhResponse = {
      /** 操作类型 */
      czlx?: string;
      /** 联系手机号id */
      lxsjid?: string;
      /** 手机号码 */
      sjhm?: string;
      /** 最后修改时间，格式：yyyy-MM-dd HH:mm:ss */
      zhxgsj?: string;
    };

    export interface Req {
      /** 用户类型，0：单位客户，1：代理商或事务所，2：个人代理 */
      yhlx?: string;
      /** 用户代码，支持全长度的税号和6位税号，精确查询 */
      yhbm?: string;
      /** 用户名称，右模糊查询 */
      yhmc?: string;
      /** 用户id，32位的bizid */
      yhid?: string;
      /** 联系人名称 */
      lxrmc?: string;
      /** 分子公司代码 */
      fzgsdm?: string;
      /** QQ号码 */
      qq?: string;
      /** 电话号码 */
      dhhm?: string;
      /** 搜索的记录行数 */
      resultCount?: number;
      /** 税号是否大小写敏感，true或不传：敏感，false:不敏感 */
      caseSensitive?: boolean;
    }
    export interface Res {
      yhList?: Array<CustomerInfoResponse>;
    }
  }

  /** 搜索客户信息 get /customerPortal/searchCustomer */
  function getCustomerPortalSearchCustomer(req: ET<GetCustomerPortalSearchCustomer.Req>, options?: object): Promise<ET<GetCustomerPortalSearchCustomer.Res>>;

  export module GetInternalDataDetail {
    export interface Req {
      /** 内部资料id */
      id: number;
    }
    export interface Res {
      /** 资料id */
      id?: number;
      /** 资料标题 */
      title?: string;
      /** 资料内容 */
      content?: string;
    }
  }

  /** 工具箱内查询内部资料详情； get /internalData/detail */
  function getInternalDataDetail(req: ET<GetInternalDataDetail.Req>, options?: object): Promise<ET<GetInternalDataDetail.Res>>;

  export module GetInternalDataList {
    export type InternalDataListResponse = {
      /** 资料id */
      id?: string;
      /** 资料标题 */
      title?: string;
      /** 发布时间 */
      publishTime?: string;
    };

    export interface Req {
      /** 资料类型，01：价格政策及定义，02：协作规则，03：技能组信息，04：培训计划 */
      type?: string;
      /** 分子公司代码，最长12位 */
      fzgsdm?: string;
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<InternalDataListResponse>;
    }
  }

  /** 管理页面查询内部资料列表，支持根据分子公司、网点、类型分页查询；  本接口只返回已发布的问题； get /internalData/list */
  function getInternalDataList(req: ET<GetInternalDataList.Req>, options?: object): Promise<ET<GetInternalDataList.Res>>;

  export module GetYxxsGetWgbxsts {
    export interface Req {
      /** 客户ID */
      khid: string;
      khdm: string;
      khlx: string;
    }
    export type Res = number;
  }

  /** 未关闭的线索统计 get /yxgl/yxxs/getWgbxsts */
  function getYxxsGetWgbxsts(req: ET<GetYxxsGetWgbxsts.Req>, options?: object): Promise<ET<GetYxxsGetWgbxsts.Res>>;

  export module GetYxxsDoingYxxsByYh {
    export type DoingYxxsResponse = {
      /** 线索id */
      xsid?: string;
      /** 线索名称 */
      xsm?: string;
      /** 用户代码 */
      yhdm?: string;
      /** 用户名称 */
      yhmc?: string;
      /** 线索描述 */
      xsms?: string;
      /** 产品大类代码 */
      cpdl?: string;
      /** 潜在价值 */
      qzjz?: string;
      /** 进展状态 */
      jzzt?: string;
      /** 可能性 */
      knx?: string;
      /** 创建时间 */
      cjsj?: string;
      /** 是否可写1可写 */
      qx?: string;
      /** 截止时间 */
      jzsj?: string;
      /** 产品大类名称 */
      cpdlmc?: string;
    };

    export interface Req {
      /** 客户id */
      khid?: string;
      /** 联系人id */
      lxrid?: string;
      /** 登录者id */
      dlzid?: string;
    }
    export type Res = Array<DoingYxxsResponse>;
  }

  /** 查询用户正在处理的线索 get /yxgl/yxxs/doingYxxsByYh */
  function getYxxsDoingYxxsByYh(req: ET<GetYxxsDoingYxxsByYh.Req>, options?: object): Promise<ET<GetYxxsDoingYxxsByYh.Res>>;

  export module GetYxxsXsDetail {
    export type ClrResponse = {
      /** 线索id */
      xsid?: string;
      /** 权限 */
      qx?: string;
      /** 客户经理 */
      khjl?: string;
    };

    export interface Req {
      /** 线索ID */
      xsid: string;
    }
    export interface Res {
      /** 线索id */
      xsid?: string;
      /** 线索名 */
      xsm?: string;
      /** 线索描述 */
      xsms?: string;
      /** 用户代码 */
      yhdm?: string;
      /** 用户类型 */
      yhlx?: string;
      /** 用户名称 */
      yhmc?: string;
      /** 联系人id */
      lxrid?: string;
      /** 联系人 */
      lxr?: string;
      /** 联系电话 */
      lxdh?: string;
      /** 联系手机 */
      lxsj?: string;
      /** 可能性 */
      knx?: string;
      /** 潜在价值 */
      qzjz?: string;
      /** 线索来源 */
      xsly?: string;
      /** 线索来源id */
      xslyid?: string;
      /** 来源内容 */
      lynr?: string;
      /** 截止时间 */
      jzsj?: string;
      /** 创建时间 */
      cjsj?: string;
      /** 创建人id */
      cjrid?: string;
      /** 更新时间 */
      gxrsj?: string;
      /** 更新人 */
      gxr?: string;
      /** 权限 */
      qx?: string;
      /** 操作状态 */
      czzt?: string;
      /** 进展状态 */
      jzzt?: string;
      /** 产品大类 */
      cpdl?: string;
      /** 客户id */
      khid?: string;
      /** 所属网点 */
      sswd?: string;
      /** 分子公司 */
      fzgs?: string;
      /** 行政区划代码 */
      xzqhdm?: string;
      /** 分配类型 */
      fplx?: string;
      /** 线索类型 */
      xslx?: string;
      /** 订单编号 */
      ddbh?: string;
      /** 订单类型 */
      ddlx?: string;
      /** 处理人列表 */
      clrList?: Array<ClrResponse>;
    }
  }

  /** 查询线索详情 get /yxgl/yxxs/xsDetail */
  function getYxxsXsDetail(req: ET<GetYxxsXsDetail.Req>, options?: object): Promise<ET<GetYxxsXsDetail.Res>>;

  export module GetYxxsYxxsByYh {
    export type YxxsResponse = {
      /** 产品大类名称 */
      cpdlmc?: string;
      jzzt?: string;
      /** 线索id */
      xsid?: string;
      /** 线索名称 */
      xsmc?: string;
      /** 用户代码 */
      yhdm?: string;
      /** 用户名称 */
      yhmc?: string;
      /** 线索描述 */
      xsms?: string;
      /** 产品大类代码 */
      cpdldm?: string;
      qzjz?: string;
      gmknx?: string;
      /** 可能性 */
      knx?: string;
      /** 创建日期 */
      cjrq?: string;
      /** 是否可写，1可写 */
      sfkx?: string;
      /** 截止日期 */
      jzrq?: string;
      /** 创建时间 */
      cjsj?: string;
      /** 产品大类 */
      cpdl?: string;
      /** 截止时间 */
      jzsj?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 客户id */
      khid?: string;
      /** 客户代码 */
      khdm?: string;
      /** 客户类型 */
      khlx?: string;
      /** 联系人id */
      lxrid?: string;
      /** 登录者id */
      dlzid?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<YxxsResponse>;
    }
  }

  /** 查询用户所有线索 get /yxgl/yxxs/yxxsByYh */
  function getYxxsYxxsByYh(req: ET<GetYxxsYxxsByYh.Req>, options?: object): Promise<ET<GetYxxsYxxsByYh.Res>>;

  export module GetRobotAsk {
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
      /** 最大返回条数 */
      maxReturn?: number;
    }
    export interface Res {
      /** 问题 */
      question?: string;
      /** 问题详情 */
      content?: string;
      /** p4问题详情 */
      p4Content?: string;
      /** p4标题 */
      p4Title?: string;
      /** 类型 */
      type?: string;
      /** 相关问列表 */
      relatedQuestions?: Array<string>;
    }
  }

  /** 小睿问题答案查询接口 get /olhelp/robot/ask */
  function getRobotAsk(req: ET<GetRobotAsk.Req>, options?: object): Promise<ET<GetRobotAsk.Res>>;

  export module GetRobotDimension {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export interface Req {
      type: string;
    }
    export interface Res {
      /** 产品维度 */
      brand?: Array<DmEnumResponse>;
      /** 地区 */
      location?: Array<DmEnumResponse>;
      /** 会员等级 */
      usertype?: Array<DmEnumResponse>;
    }
  }

  /** 查询小睿问题维度接口 get /olhelp/robot/dimension */
  function getRobotDimension(req: ET<GetRobotDimension.Req>, options?: object): Promise<ET<GetRobotDimension.Res>>;

  export module GetChatContent {
    export type OlhelpChatContentResultResponse = {
      /** 消息内容 */
      content?: string;
      /** 消息发送人 */
      sender?: string;
      /** 消息发送时间 */
      time?: string;
      /** 消息类型大类 0-文本消息 1-系统消息 */
      category?: string;
      /** 消息类型  文本消息：0-坐席 1-智能助理 2-用户  系统消息：3-对话开始时间 4-排队标记 5-离线消息 6-对话关闭原因 7-对话关闭时间 */
      type?: string;
    };

    export interface Req {
      msgId: string;
    }
    export type Res = Array<OlhelpChatContentResultResponse>;
  }

  /** get /olhelp/chat/content */
  function getChatContent(req: ET<GetChatContent.Req>, options?: object): Promise<ET<GetChatContent.Res>>;

  export module GetRobotSuggestedQuestion {
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
      /** 最大返回条数 */
      maxReturn?: number;
    }
    export type Res = Array<string>;
  }

  /** 查询推荐问接口 get /olhelp/robot/suggestedQuestion */
  function getRobotSuggestedQuestion(req: ET<GetRobotSuggestedQuestion.Req>, options?: object): Promise<ET<GetRobotSuggestedQuestion.Res>>;

  export module GetPersonaQueryCustomerTagList {
    export interface Req {
      /** 客户ID列表 */
      khid?: string;
      /** 场景ID */
      sceneId?: string;
    }
    export type Res = Array<string>;
  }

  /** get /persona/queryCustomerTagList */
  function getPersonaQueryCustomerTagList(req: ET<GetPersonaQueryCustomerTagList.Req>, options?: object): Promise<ET<GetPersonaQueryCustomerTagList.Res>>;

  export module GetPersonaQueryPersonalTagList {
    export interface Req {
      /** 手机号 */
      mobile?: string;
      /** 场景 */
      scene?: string;
    }
    export type Res = Array<string>;
  }

  /** get /persona/queryPersonalTagList */
  function getPersonaQueryPersonalTagList(req: ET<GetPersonaQueryPersonalTagList.Req>, options?: object): Promise<ET<GetPersonaQueryPersonalTagList.Res>>;

  export module GetToolDetail {
    export type ProductToolUseResponse = {
      /** 产品名称 */
      productName?: string;
      /** 产品下所有工具的使用情况 */
      toolList?: Array<ToolUseResponse>;
    };
    export type ToolUseResponse = {
      /** 工具名称 */
      toolName?: string;
      /** 每个月的使用情况 */
      detailList?: Array<ToolMonthUseResponse>;
    };
    export type ToolMonthUseResponse = {
      /** 月份 */
      month?: string;
      /** 是否使用 */
      use?: string;
    };

    export interface Req {
      bizId: string;
    }
    export type Res = Array<ProductToolUseResponse>;
  }

  /** get /persona/tool/detail */
  function getToolDetail(req: ET<GetToolDetail.Req>, options?: object): Promise<ET<GetToolDetail.Res>>;

  export module GetCustomerJoinedList {
    export type CustomerJoinedGroupResponse = {
      /** 已入群手机号 */
      mobile?: string;
      /** 加入的QQ群 */
      qqGroupNum?: string;
      /** QQ群等级名称 */
      groupRankName?: string;
    };

    export interface Req {
      /** 客户id */
      bizId: string;
    }
    export type Res = Array<CustomerJoinedGroupResponse>;
  }

  /** 查询企业已入群信息列表 get /qq/group/customer/joinedList */
  function getCustomerJoinedList(req: ET<GetCustomerJoinedList.Req>, options?: object): Promise<ET<GetCustomerJoinedList.Res>>;

  export module GetCustomerRemainJoinList {
    export type CustomerRemainJoinGroupResponse = {
      /** 剩余入群数 */
      remainNum?: number;
      /** QQ群等级名称 */
      groupRankName?: string;
    };

    export interface Req {
      /** 客户id */
      bizId: string;
    }
    export interface Res {
      /** 待加入的群明细 */
      remainJoinGroupList?: Array<CustomerRemainJoinGroupResponse>;
      /** 可加入的总数量 */
      totalRemainNum?: number;
    }
  }

  /** 查询企业可入群信息列表 get /qq/group/customer/remainJoinList */
  function getCustomerRemainJoinList(req: ET<GetCustomerRemainJoinList.Req>, options?: object): Promise<ET<GetCustomerRemainJoinList.Res>>;

  export module GetPersonJoinedList {
    export type PersonalJoinedGroupResponse = {
      /** 企业名称 */
      qymc?: string;
      /** QQ群号 */
      qqGroupNum?: string;
      /** QQ群等级名称 */
      qqGroupRankName?: string;
    };

    export interface Req {
      /** 手机号码 */
      mobile: string;
    }
    export type Res = Array<PersonalJoinedGroupResponse>;
  }

  /** 查询个人已入群信息列表 get /qq/group/person/joinedList */
  function getPersonJoinedList(req: ET<GetPersonJoinedList.Req>, options?: object): Promise<ET<GetPersonJoinedList.Res>>;

  export module GetCustomerQuery {
    export type ConsultRightsResponse = {
      /** 权益类型：1-基础财税，2-专家财税，3-电话财税 */
      rightsType?: string;
      /** 权益名称 */
      rightsName?: string;
      /** 是否有权益，Y-有，N-没有 */
      effective?: string;
      /** 权益到期时间 */
      expireDate?: string;
      /** 咨询次数详情 */
      consultTimes?: Array<ConsulTimeResponse>;
      /** 4个月咨询次数合计 */
      consultTotal?: number;
    };
    export type ConsulTimeResponse = {
      /** 咨询月份 */
      month?: string;
      /** 咨询次数 */
      times?: string;
    };

    export interface Req {
      bizId: string;
    }
    export type Res = Array<ConsultRightsResponse>;
  }

  /** 查询咨询企业权益接口 get /rights/consult/customer/query */
  function getCustomerQuery(req: ET<GetCustomerQuery.Req>, options?: object): Promise<ET<GetCustomerQuery.Res>>;

  export module GetCustomerList {
    export type CustomerRightResponse = {
      /** 权益手机号 */
      mobile?: string;
      /** 手机号可用专享权益数 */
      zxUnusedTotal?: string;
    };

    export interface Req {
      /** 业务id */
      bizId: string;
    }
    export interface Res {
      /** 企业下可使用专享总数 */
      zxUnusedTotal?: string;
      /** 企业下可使用共享总数 */
      gxUnusedTotal?: string;
      /** 企业下已使用权益总数 */
      usedTotal?: string;
      /** 权益项列表 */
      mobileList?: Array<CustomerRightResponse>;
    }
  }

  /** 查询企业培训权益信息 get /rights/train/customer/list */
  function getCustomerList(req: ET<GetCustomerList.Req>, options?: object): Promise<ET<GetCustomerList.Res>>;

  export module GetPersonQuery {
    export type ConsultRightsResponse = {
      /** 权益类型：1-基础财税，2-专家财税，3-电话财税 */
      rightsType?: string;
      /** 权益名称 */
      rightsName?: string;
      /** 是否有权益，Y-有，N-没有 */
      effective?: string;
      /** 权益到期时间 */
      expireDate?: string;
      /** 咨询次数详情 */
      consultTimes?: Array<ConsulTimeResponse>;
      /** 4个月咨询次数合计 */
      consultTotal?: number;
    };
    export type ConsulTimeResponse = {
      /** 咨询月份 */
      month?: string;
      /** 咨询次数 */
      times?: string;
    };

    export interface Req {
      mobile: string;
    }
    export type Res = Array<ConsultRightsResponse>;
  }

  /** 查询咨询个人权益接口 get /rights/consult/person/query */
  function getPersonQuery(req: ET<GetPersonQuery.Req>, options?: object): Promise<ET<GetPersonQuery.Res>>;

  export module GetPersonList {
    export type PersonRightResponse = {
      /** 客户名称 */
      customerName?: string;
      /** long类型的客户id */
      customerId?: number;
      /** 企业下可用专享权益数 */
      zxUnusedTotal?: string;
      /** 企业下可用共享权益数 */
      gxUnusedTotal?: string;
    };

    export interface Req {
      /** 手机号码 */
      mobile: string;
    }
    export interface Res {
      /** 个人关联的企业下可使用专享总数 */
      zxUnusedTotal?: string;
      /** 个人关联的企业下可使用共享总数 */
      gxUnusedTotal?: string;
      /** 个人关联的企业下已使用权益总数 */
      usedTotal?: string;
      /** 权益项列表 */
      customerList?: Array<PersonRightResponse>;
    }
  }

  /** 查询个人培训权益信息 get /rights/train/person/list */
  function getPersonList(req: ET<GetPersonList.Req>, options?: object): Promise<ET<GetPersonList.Res>>;

  export module GetSmsDxList {
    export type SmsResponse = {
      /** 业务类型名称 */
      msgBizTypeName?: string;
      /** 手机号码 */
      sjhm?: string;
      /** 联系人名称 */
      lxr?: string;
      /** 短信内容 */
      msgContent?: string;
      /** 发送时间 */
      sendTime?: string;
      /** 短信状态(待发送0  等待回执1 已发送2  发送失败3 已拦截4  无回执7) */
      status?: string;
      /** 短信状态名称 */
      statusRemark?: string;
      /** 应用场景代码 (1 通用咨询/外呼 2 营销短信活动) */
      yycj?: string;
      /** 应用场景名称 */
      yycjName?: string;
      /** 短信ID */
      msgId?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 客户id */
      khid?: string;
      /** 客户代码 */
      khdm?: string;
      /** 客户类型，0：单位客户，1：代理商和中介机构，2：个人代理 */
      khlx?: string;
      /** 状态，短信状态(待发送0 等待回执1 已发送2 发送失败3 已拦截4 无回执7)，默认9 */
      status?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SmsResponse>;
    }
  }

  /** 查询给用户发送的过信息列表 get /sms/dxList */
  function getSmsDxList(req: ET<GetSmsDxList.Req>, options?: object): Promise<ET<GetSmsDxList.Res>>;

  export module PostSmsReSend {
    export interface Req {
      /** 短信ID */
      msgId?: string;
    }
    export type Res = boolean;
  }

  /** 重发短信 post /sms/reSend */
  function postSmsReSend(req: ET<PostSmsReSend.Req>, options?: object): Promise<ET<PostSmsReSend.Res>>;

  export module PostSmsDx {
    export type DxcsRequest = {
      /** 短信ID */
      dxid?: string;
      /** 上行流水号 */
      sxlsh?: string;
      /** 手机号码 */
      sjhm?: string;
      /** 用户ID */
      yhid?: string;
      /** 用户名称 */
      yhmc?: string;
      /** 联系人ID */
      lxrid?: string;
      /** 联系人名称 */
      lxrmc?: string;
      /** 短信内容 */
      dxnr?: string;
      /** code作为模板参数 */
      codeMbcs?: string;
      /** 参数名称作为模板参数 */
      nameMbcs?: string;
      /** 发送时间 */
      fssj?: string;
      /** 发送状态 */
      fszt?: string;
      /** 创建人名称 */
      cjrmc?: string;
      /** 发送失败原因 */
      fssbyy?: string;
    };
    export type Map = any;

    export interface Req {
      /** 短信ID */
      dxid?: string;
      /** 短信中心活动ID */
      dxzxhdid?: string;
      /** 业务类型 */
      ywlx?: string;
      /** 发送类型 */
      fslx?: string;
      /** 短信类型代码 */
      dxlxdm?: string;
      /** 分子公司代码 */
      fzgsdm?: string;
      /** 模板ID */
      mbid?: string;
      /** 模板版本 */
      mbbb?: string;
      /** 业务ID */
      ywid?: string;
      /** 活动名称 */
      ywmc?: string;
      /** 活动创建人ID */
      cjrid?: string;
      /** 活动创建人名称 */
      cjrmc?: string;
      /** 活动创建时间 */
      cjsj?: string;
      /** 活动开始日期 */
      ksrq?: string;
      /** 活动截止日期 */
      jzrq?: string;
      /** 短信参数列表 */
      dxcsVoList?: Array<DxcsRequest>;
      /** 业务来源 */
      ywly?: string;
      /** 手机号码 */
      sjhm?: string;
      /** 用户ID */
      yhid?: string;
      /** 用户名称 */
      yhmc?: string;
      /** 联系人ID */
      lxrid?: string;
      /** 联系人名称 */
      lxrmc?: string;
      /** 上行流水号 */
      sxlsh?: string;
      /** 模板参数 */
      mbcs?: Array<Map>;
    }
    export type Res = boolean;
  }

  /** 发送短信接口 post /sms/dx */
  function postSmsDx(req: ET<PostSmsDx.Req>, options?: object): Promise<ET<PostSmsDx.Res>>;

  export module GetSwFzgsSld {
    export type Object = any;

    export interface Req {
      fzgsdm: string;
      wddm: string;
    }
    export interface Res {
      list?: Array<Object>;
      relatedArray?: Object;
      componentType?: string;
    }
  }

  /** 查询分子公司受理点接口 get /sw/fzgsSld */
  function getSwFzgsSld(req: ET<GetSwFzgsSld.Req>, options?: object): Promise<ET<GetSwFzgsSld.Res>>;

  export module GetSwHkzzUrl {
    export interface Req {
      /** 分子公司代码 */
      fzgsdm: string;
      /** 客户名称 */
      khmc: string;
      /** 联系人名称 */
      lxrmc: string;
      /** 登陆人的名称 */
      czy: string;
      /** 登陆人的密码 */
      mm: string;
    }
    export interface Res {
      /** 汇款转账URL */
      url?: string;
    }
  }

  /** 获取汇款转账URL get /sw/hkzzUrl */
  function getSwHkzzUrl(req: ET<GetSwHkzzUrl.Req>, options?: object): Promise<ET<GetSwHkzzUrl.Res>>;

  export module GetSwYxtj {
    export type DqcpbResponse = {
      /** 产品包id */
      cpbid?: string;
      /** 产品包名称 */
      cpbmc?: string;
      /** 到期日期 */
      dqrq?: string;
      /** 不续费原因 */
      bxfyy?: string;
      /** 续费结果 */
      xfjg?: string;
      /** 未明确原因 */
      wmqyy?: string;
    };

    export interface Req {
      /** 分子公司代码 */
      fzgsdm: string;
      /** 用户ID */
      khid: string;
      /** 用户代码 */
      khdm: string;
    }
    export interface Res {
      /** 到期产品包 */
      dqcpbs?: Array<DqcpbResponse>;
      /** 推荐产品包 */
      tjcpbs?: Array<DqcpbResponse>;
    }
  }

  /** 营销推荐获取到期产品包和推荐产品包 get /sw/yxtj */
  function getSwYxtj(req: ET<GetSwYxtj.Req>, options?: object): Promise<ET<GetSwYxtj.Res>>;

  export module GetSywPxjh {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<DmEnumResponse>;
  }

  /** 税友网培训计划链接 get /syw/pxjh */
  function getSywPxjh(req?: ET<GetSywPxjh.Req>, options?: object): Promise<ET<GetSywPxjh.Res>>;

  export module GetDhrwCalloutList {
    export type CalloutRecordResponse = {
      /** 外呼情况记录 */
      whqkjl?: string;
      /** 呼出结果 */
      hcjg?: string;
      /** 分子公司代码 */
      fzgsdm?: string;
      /** 任务执行者ID */
      zxzid?: string;
      /** 任务执行者名称 */
      zxzName?: string;
      /** 呼出时间 */
      hwsj?: string;
      /** 呼出成功电话号码 */
      hccgdhhm?: string;
      /** 业务表单实例序号 */
      ywbdslxh?: string;
      /** 联系人 */
      lxr?: string;
      /** 任务编号 */
      rwbh?: string;
      /** 任务名称 */
      rwmc?: string;
      /** 任务方式 */
      rwfs?: string;
      /** 业务表单id */
      ywbdid?: string;
      /** 执行情况状态0:未处理1：处理中 2：处理完毕 */
      zxqkzt?: string;
      /** 用户代码 */
      yhdm?: string;
      /** 电话 */
      dh1?: string;
      /** 用户类型 */
      yhlx?: string;
      /** 提交人代码 */
      tjrdm?: string;
      /** 提交时间 */
      tjsj?: string;
      /** 创建时间 */
      cjsj?: string;
      /** 执行序号 */
      zxxh?: string;
      /** 是否指定质检 */
      sfzdzj?: string;
      /** 指定质检提交人 */
      zdzjtjr?: string;
      /** 执行情况名称，未处理、处理中、处理完毕 */
      zxqkmc?: string;
      /** 是否提醒回电 */
      sftxhd?: string;
      /** 呼出结果名称 */
      hcjgmc?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 是否是回电 */
      isCallback?: string;
      /** 客户id */
      khid?: string;
      /** 客户代码 */
      khdm?: string;
      /** 客户类型 */
      khlx?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<CalloutRecordResponse>;
    }
  }

  /** 查询外呼列表 get /rwgl/dhrw/calloutList */
  function getDhrwCalloutList(req: ET<GetDhrwCalloutList.Req>, options?: object): Promise<ET<GetDhrwCalloutList.Res>>;

  export module GetRwglSmrwList {
    export type SmrwResponse = {
      /** 表单编号 */
      bdbh?: string;
      /** 任务创建者名称 */
      rwcjz?: string;
      /** 任务描述 */
      rwms?: string;
      /** 任务状态 */
      rwzt?: string;
      /** 派发时间 */
      pfsj?: string;
      /** 任务编号 */
      rwbh?: string;
      /** 创建日期 */
      cjrq?: string;
      wjrq?: string;
      zzyy?: string;
      /** 要求完成日期 */
      yqwcrq?: string;
      /** 任务类型名称 */
      rwlxmc?: string;
      /** 联系人 */
      lxr?: string;
      /** 联系号码 */
      lxhm?: string;
      /** 执行情况记录 */
      qkjl?: string;
      /** 执行部门 */
      zxbm?: string;
      /** 任务状态名称 */
      rwztmc?: string;
      /** 交单时间 */
      jdsj?: string;
      /** 是否已预约 */
      sfyyy?: string;
      /** 执行人 */
      zxr?: string;
      /** 执行人名称 */
      zxrmc?: string;
      /** 计划上门时间 */
      jhsmsj?: string;
      /** 上门地址 */
      smdz?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 客户id */
      khid?: string;
      /** 客户代码 */
      khdm?: string;
      /** 客户类型 */
      khlx?: string;
      /** 联系人id */
      lxrid?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SmrwResponse>;
    }
  }

  /** 查询上门任务列表 get /rwgl/smrwList */
  function getRwglSmrwList(req: ET<GetRwglSmrwList.Req>, options?: object): Promise<ET<GetRwglSmrwList.Res>>;

  export module GetRwglYcrwList {
    export type YcrwResponse = {
      /** 表单编号 */
      bdbh?: string;
      /** 任务创建者名称 */
      rwcjz?: string;
      /** 任务描述 */
      rwms?: string;
      /** 任务状态 */
      rwzt?: string;
      /** 派发时间 */
      pfsj?: string;
      /** 任务编号 */
      rwbh?: string;
      /** 创建日期 */
      cjrq?: string;
      wjrq?: string;
      zzyy?: string;
      /** 要求完成日期 */
      yqwcrq?: string;
      /** 任务类型名称 */
      rwlxmc?: string;
      /** 联系人 */
      lxr?: string;
      /** 联系号码 */
      lxhm?: string;
      /** 执行情况记录 */
      qkjl?: string;
      /** QQ */
      qq?: string;
      /** 执行部门 */
      zxbm?: string;
      /** 任务状态名称 */
      rwztmc?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 客户id */
      khid?: string;
      /** 客户代码 */
      khdm?: string;
      /** 客户类型 */
      khlx?: string;
      /** 联系人id */
      lxrid?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<YcrwResponse>;
    }
  }

  /** 查询远程任务列表 get /rwgl/ycrwList */
  function getRwglYcrwList(req: ET<GetRwglYcrwList.Req>, options?: object): Promise<ET<GetRwglYcrwList.Res>>;

  export module GetRwglZdxcList {
    export type ZdxcTaskResponse = {
      /** 表单编号 */
      bdbh?: string;
      /** 任务编号 */
      rwbh?: string;
      /** 任务描述 */
      rwms?: string;
      /** 任务类型名称 */
      rwlxmc?: string;
      /** 执行人 */
      zxr?: string;
      /** 执行人名称 */
      zxrmc?: string;
      /** 创建时间 */
      cjsj?: string;
      /** 创建人 */
      cjr?: string;
      /** 创建人名称 */
      cjrmc?: string;
      /** 创建日期 */
      cjrq?: string;
      /** 任务状态 */
      rwzt?: string;
      wjrq?: string;
      zzyy?: string;
      /** 任务状态名称 */
      rwztmc?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 客户id */
      khid?: string;
      /** 客户代码 */
      khdm?: string;
      /** 客户类型 */
      khlx?: string;
      /** 联系人id */
      lxrid?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ZdxcTaskResponse>;
    }
  }

  /** 查询驻点现场任务列表 get /rwgl/zdxcList */
  function getRwglZdxcList(req: ET<GetRwglZdxcList.Req>, options?: object): Promise<ET<GetRwglZdxcList.Res>>;

  export module GetUserCurrentUser {
    export type Req = any;
    export interface Res {
      /** 员工trueId */
      id?: string;
      /** 员工账号 */
      userId?: string;
      /** 员工姓名 */
      name?: string;
      /** 员工性别，'M'男，'F'女 */
      sex?: string;
      /** 组织机构代码 */
      departCode?: string;
      /** 单点登录令牌 */
      token?: string;
    }
  }

  /** 查询当前登录用户信息 get /user/currentUser */
  function getUserCurrentUser(req?: ET<GetUserCurrentUser.Req>, options?: object): Promise<ET<GetUserCurrentUser.Res>>;

  export module GetPermissionList {
    export type PermissionResponse = {
      /** id */
      id?: number;
      /** 角色代码 */
      code?: string;
      /** 权限代码 */
      permissionCode?: string;
      /** 路径 */
      path?: string;
      /** 类型 */
      type?: string;
      /** 角色名称 */
      name?: string;
    };
    export type RoleResponse = {
      /** id */
      id?: number;
      /** 角色代码 */
      code?: string;
      /** 角色名称 */
      name?: string;
      /** 权限列表 */
      permissionList?: Array<PermissionResponse>;
    };

    export type Req = any;
    export interface Res {
      /** 权限列表 */
      permissionList?: Array<PermissionResponse>;
      /** 角色列表 */
      roleList?: Array<RoleResponse>;
    }
  }

  /** 获取当前用户角色权限列表 get /user/permission/list */
  function getPermissionList(req?: ET<GetPermissionList.Req>, options?: object): Promise<ET<GetPermissionList.Res>>;

  export module GetUserQueryByUserId {
    export interface Req {
      /** 用户id */
      userId: string;
    }
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
      fzgsdm?: string;
    }
  }

  /** 根据用户id查询用户信息 get /user/queryByUserId */
  function getUserQueryByUserId(req: ET<GetUserQueryByUserId.Req>, options?: object): Promise<ET<GetUserQueryByUserId.Res>>;

  export module PostAppealAppeal {
    export interface Req {
      /** 诉求类型 */
      appealType?: string;
      /** 被诉求者 */
      person?: string;
      /** 回复电话 */
      replyMobile?: string;
      /** 诉求内容 */
      appealContent?: string;
      /** 诉求类别 */
      appealCategory?: string;
      /** 受理机构 */
      company?: string;
    }
    export type Res = boolean;
  }

  /** post /appeal/appeal */
  function postAppealAppeal(req: ET<PostAppealAppeal.Req>, options?: object): Promise<ET<PostAppealAppeal.Res>>;

  export module GetSmsMessageList {
    export type List = {
      /** 业务类型代码 */
      msgBizTypeCode?: string;
      /** 业务类型名称 */
      msgBizTypeName?: string;
      /** 手机号 */
      mobile?: string;
      /** 联系人 */
      receiverName?: string;
      /** 短信内容 */
      msgContent?: string;
      /** 发送时间 */
      sendTime?: string;
      /** 短信状态 */
      status?: string;
      /** 短信状态名称 */
      statusName?: string;
      /** 应用场景代码 */
      sceneCode?: string;
      /** 应用场景名称 */
      sceneName?: string;
      /** 短信id */
      msgId?: string;
    };

    export interface Req {
      /** 查询参数 */
      queryMessageRequest: any;
    }
    export interface Res {
      /** 当前页号 */
      pageId?: number;
      /** 每页显示条数 */
      pageLines?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<List>;
    }
  }

  /** 查询短信内容 get /sms/messageList */
  function getSmsMessageList(req: ET<GetSmsMessageList.Req>, options?: object): Promise<ET<GetSmsMessageList.Res>>;

  export module PostSmsReSendMessage {
    export interface Req {
      /** 短信ID */
      msgId?: string;
    }
    export type Res = boolean;
  }

  /** 重发短信接口 post /sms/reSendMessage */
  function postSmsReSendMessage(req: ET<PostSmsReSendMessage.Req>, options?: object): Promise<ET<PostSmsReSendMessage.Res>>;

  export module PostSmsSendMessage {
    export type Parameter = {
      /** 短信模板key */
      msgKey?: string;
      /** 短信模块value */
      msgValue?: string;
    };

    export interface Req {
      /** 手机号码 */
      mobile?: string;
      /** 联系人id */
      personId?: string;
      /** 联系人名称 */
      name?: string;
      /** 企业id */
      bizId?: string;
      /** 企业名称 */
      companyName?: string;
      /** 客户类型 */
      customerType?: string;
      /** 客户代码 */
      servyouNumber?: string;
      /** 网点代码或者驻点代码 */
      businessId?: string;
      /** 业务类型  5-网点类型，6-驻点信息 */
      businessType?: string;
      /** 短信参数 */
      parameter?: Array<Parameter>;
    }
    export type Res = boolean;
  }

  /** 发送短信接口 post /sms/sendMessage */
  function postSmsSendMessage(req: ET<PostSmsSendMessage.Req>, options?: object): Promise<ET<PostSmsSendMessage.Res>>;

  export module GetItpcoreGetBindInfo {
    export type AccountBindInfoResponse = {
      /** 绑定时间 */
      bindTime?: string;
      /** 注册时间 */
      regTime?: string;
      /** 电话号码 */
      mobile?: string;
    };
    export type MacBindInfoResponse = {
      /** 绑定时间 */
      bindTime?: string;
    };

    export interface Req {
      /** 纳税人识别号 */
      nsrsbh?: string;
      /** 行政区划代码 */
      areaCode?: string;
    }
    export interface Res {
      /** 企业绑定的账户列表 */
      bindAccountList?: Array<AccountBindInfoResponse>;
      /** 企业下的mac绑定关系列表 */
      bindMacInfo?: MacBindInfoResponse;
    }
  }

  /** 查询小助手绑定情况 get /itpcore/getBindInfo */
  function getItpcoreGetBindInfo(req: ET<GetItpcoreGetBindInfo.Req>, options?: object): Promise<ET<GetItpcoreGetBindInfo.Res>>;

  export module GetTrainGetEnrollUrl {
    export interface Req {
      /** 渠道，在线咨询或者来电咨询 */
      channel?: string;
      /** 地区code,支持2、4、6位 */
      areacode?: string;
      /** 纳税人识别号 */
      nsrsbh?: string;
      /** 纳税人名称 */
      nsrmc?: string;
      /** 企业id,32位字符串 */
      customerId?: string;
    }
    export interface Res {
      /** 培训报名界面链接 */
      enrollUrl?: string;
    }
  }

  /** get /train/getEnrollUrl */
  function getTrainGetEnrollUrl(req: ET<GetTrainGetEnrollUrl.Req>, options?: object): Promise<ET<GetTrainGetEnrollUrl.Res>>;

  export module GetOnlineList {
    export type OnlineRecordResponse = {
      /** 对话id */
      msgId?: string;
      /** 坐席名称 */
      agentName?: string;
      /** 坐席工号 */
      workId?: string;
      /** 坐席组名称 */
      groupName?: string;
      /** 处理类型 */
      handleType?: string;
      /** 联系人姓名 */
      contactName?: string;
      /** 联系方式 */
      contactPhone?: string;
      /** 企业名称 */
      companyName?: string;
      /** 企业税号 */
      taxNo?: string;
      /** 咨询时间 */
      consultTime?: string;
      /** 主题 */
      topic?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户id */
      bizId?: string;
      /** 手机号 */
      mobile?: string;
      /** 咨询开始时间 */
      startTime?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<OnlineRecordResponse>;
    }
  }

  /** 查询在线咨询记录列表 get /consult/record/online/list */
  function getOnlineList(req: ET<GetOnlineList.Req>, options?: object): Promise<ET<GetOnlineList.Res>>;

  export module PostSuitSave {
    export interface Req {
      /** 诉求类型0：表扬，1：投诉，2：建议 */
      suitType?: string;
      /** 被诉求者 */
      suiteder?: string;
      /** 回复电话 */
      answerPhone?: string;
      /** 诉求内容 */
      suitContent?: string;
      /** 诉求类别-0-产品，1-服务，2-商务 */
      suitedType?: string;
      /** 受理机构 */
      companyType?: string;
      /** 受理机构 */
      companyId?: string;
      /** 客户类型 */
      customerType?: string;
      /** 诉求组id */
      groupId?: number;
      /** 来电号码 */
      callerNumber?: string;
      /** 呼叫唯一标识 */
      ctiId?: string;
      /** 企业税号 */
      taxNo?: string;
      /** 客户id */
      bizId?: string;
      /** 诉求者 */
      suiter?: string;
      /** 诉求者单位 */
      suitCompanyName?: string;
      /** 诉求者电话 */
      suitPhone?: string;
      /** 用户id */
      personId?: string;
    }
    export type Res = boolean;
  }

  /** 保存诉求小结接口 post /suit/save */
  function postSuitSave(req: ET<PostSuitSave.Req>, options?: object): Promise<ET<PostSuitSave.Res>>;

  export module GetIncallList {
    export type IncallRecordResponse = {
      /** 咨询编号 */
      consultId?: string;
      /** 咨询时间 */
      consultTime?: string;
      /** 坐席名称 */
      agentName?: string;
      /** 咨询事项 */
      consultInfo?: string;
      /** 咨询方式 */
      consultWay?: string;
      /** 处理结果 */
      consultResult?: string;
      /** 处理结果名称 */
      consultResultName?: string;
      /** 联系人名称 */
      contactName?: string;
      /** 主叫号码 */
      contactPhone?: string;
      /** 交互类型，1来电、2文本、3回电、4外呼、5上门、6远程、7驻点 */
      interactiveType?: string;
      /** 交互类型名称 */
      interactiveTypeName?: string;
      /** 是否指定质检Y，N */
      isAssignQA?: string;
      /** 企业名称 */
      companyName?: string;
      /** 企业税号 */
      taxNo?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户id */
      bizId?: string;
      /** 手机号 */
      mobile?: string;
      /** 客户代码 */
      servyouNumber?: string;
      /** 客户类型，0：单位客户，1：代理商或中介机构，2：个人代理 */
      customerType?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<IncallRecordResponse>;
    }
  }

  /** 查询来电咨询列表 get /consult/record/incall/list */
  function getIncallList(req: ET<GetIncallList.Req>, options?: object): Promise<ET<GetIncallList.Res>>;

  export module GetSuitList {
    export type List = {
      /** 诉求类型0：表扬，1：投诉，2：建议 */
      suitType?: string;
      /** 诉求类型名称 */
      suitTypeName?: string;
      /** 诉求内容 */
      suitContent?: string;
      /** 诉求时间 */
      suitTime?: string;
      /** 诉求状态 */
      status?: string;
      /** 诉求状态名称 */
      statusName?: string;
      /** 回复内容 */
      answerContent?: string;
      /** 登记人名称 */
      acceptorName?: string;
    };

    export interface Req {
      request: any;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<List>;
    }
  }

  /** 投诉建议记录列表 get /suit/suit/list */
  function getSuitList(req: ET<GetSuitList.Req>, options?: object): Promise<ET<GetSuitList.Res>>;

  export module GetCalloutList {
    export type CalloutResponse = {
      /** 任务编号 */
      id?: string;
      /** 任务名称 */
      name?: string;
      /** 任务方式 */
      type?: string;
      /** 创建时间 */
      createTime?: string;
      /** 业务表单id */
      formId?: string;
      /** 业务表单实例序号 */
      formInstanceNumber?: string;
      /** 分子公司代码 */
      companyId?: string;
      /** 用户代码 */
      servvyouNumber?: string;
      /** 用户类型 */
      customerType?: string;
      /** 联系人名称 */
      contactName?: string;
      /** 电话 */
      phone?: string;
      /** 外呼情况记录 */
      outCallRecord?: string;
      /** 呼出结果 */
      outCallResult?: string;
      /** 呼出结果名称 */
      outCallResultName?: string;
      /** 呼出时间 */
      outCallTime?: string;
      /** 呼出成功电话号码 */
      outCallSucessNumber?: string;
      /** 任务执行者名称 */
      executorName?: string;
      /** 执行情况状态0:未处理1：处理中 2：处理完毕 */
      executeStatus?: string;
      /** 执行情况名称，未处理、处理中、处理完毕 */
      executeStatusName?: string;
      /** 执行序号 */
      executeId?: string;
      /** 是否指定质检 */
      isAssignQA?: string;
      /** 是否提醒回电 */
      isRemindCallback?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 是否是回电 */
      isCallback?: string;
      /** 客户id */
      bizId?: string;
      /** 客户代码 */
      servyouNumber?: string;
      /** 客户类型 */
      customerType?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<CalloutResponse>;
    }
  }

  /** 查询外呼列表 get /task/callout/list */
  function getCalloutList(req: ET<GetCalloutList.Req>, options?: object): Promise<ET<GetCalloutList.Res>>;

  export module GetHomeList {
    export type HomeTaskResponse = {
      /** 任务编号 */
      id?: string;
      /** 表单编号 */
      formId?: string;
      /** 任务创建者名称 */
      creatorName?: string;
      /** 创建日期 */
      createDate?: string;
      /** 任务描述 */
      description?: string;
      /** 任务状态 */
      state?: string;
      /** 任务状态名称 */
      statusName?: string;
      /** 派发时间 */
      distributionTime?: string;
      /** 要求完成日期 */
      claimEndDate?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户id */
      bizId?: string;
      /** 客户代码 */
      servyouNumber?: string;
      /** 客户类型 */
      customerType?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<HomeTaskResponse>;
    }
  }

  /** 查询上门任务列表 get /task/home/list */
  function getHomeList(req: ET<GetHomeList.Req>, options?: object): Promise<ET<GetHomeList.Res>>;

  export module GetRemoteList {
    export type RemoteTaskResponse = {
      /** 任务编号 */
      id?: string;
      /** 表单编号 */
      formId?: string;
      /** 任务创建者名称 */
      creatorName?: string;
      /** 创建日期 */
      createDate?: string;
      /** 任务描述 */
      description?: string;
      /** 任务状态 */
      state?: string;
      /** 任务状态名称 */
      statusName?: string;
      /** 派发时间 */
      distributionTime?: string;
      /** 要求完成日期 */
      claimEndDate?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户id */
      bizId?: string;
      /** 客户代码 */
      servyouNumber?: string;
      /** 客户类型 */
      customerType?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<RemoteTaskResponse>;
    }
  }

  /** 查询远程任务列表 get /task/remote/list */
  function getRemoteList(req: ET<GetRemoteList.Req>, options?: object): Promise<ET<GetRemoteList.Res>>;

  export module GetStoreList {
    export type StationTaskResponse = {
      /** 任务编号 */
      id?: string;
      /** 表单编号 */
      formId?: string;
      /** 任务创建者名称 */
      creatorName?: string;
      /** 任务执行人名称 */
      executorName?: string;
      /** 创建日期 */
      createDate?: string;
      /** 任务描述 */
      description?: string;
      /** 任务状态 */
      state?: string;
      /** 任务状态名称 */
      statusName?: string;
      /** 任务类型名称 */
      typeName?: string;
      /** 完结日期 */
      endDate?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户id */
      bizId?: string;
      /** 客户代码 */
      servyouNumber?: string;
      /** 客户类型 */
      customerType?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<StationTaskResponse>;
    }
  }

  /** 查询驻点现场任务列表 get /task/store/list */
  function getStoreList(req: ET<GetStoreList.Req>, options?: object): Promise<ET<GetStoreList.Res>>;

  export module PostClientRelationEnd {
    export interface Req {
      /** 代理id */
      agencyId?: string;
      /** 委托单位id */
      clientId?: string;
    }
    export type Res = boolean;
  }

  /** 终止代理机构信息 post /agency/clientRelation/end */
  function postClientRelationEnd(req: ET<PostClientRelationEnd.Req>, options?: object): Promise<ET<PostClientRelationEnd.Res>>;

  export module GetAgencyDetail {
    export type BusinessInfoResponse = {
      /** 所属客户经理代码 */
      serviceManagerCode?: string;
      /** 所属客户经理名称 */
      serviceManagerName?: string;
      /** 所属网点代码 */
      storeCode?: string;
      /** 所属网点名称 */
      storeName?: string;
    };

    export interface Req {
      agencyId: string;
      servyouNumber: string;
    }
    export interface Res {
      /** 代理id */
      id?: string;
      /** 代理名称 */
      fullName?: string;
      /** 代理类型 1-中介 2-个代 */
      agencyType?: string;
      /** 税友号 */
      servyouNumber?: string;
      /** 行政区划代码 */
      bizRegionCode?: string;
      /** 分子公司代码 */
      responsibleBranchId?: string;
      /** 分子公司代码 */
      responsibleBranchName?: string;
      /** 社会信用代码 */
      socialCreditCode?: string;
      /** 经营地址 */
      businessAddress?: string;
      /** 通行密码 */
      password?: string;
      /** 状态 0-正常,1-注销 */
      status?: string;
      /** 备注 */
      remark?: string;
      /** 业务信息列表 */
      businessInfoList?: Array<BusinessInfoResponse>;
      /** 所属经营中心代码 */
      businessCenterCode?: string;
      /** 所属经营中心名称 */
      businessCenterName?: string;
      /** 大区代码 */
      bigRegionCode?: string;
      /** 大区名称 */
      bigRegionName?: string;
    }
  }

  /** 查询代理机构(中介和个代)详情 get /agency/detail */
  function getAgencyDetail(req: ET<GetAgencyDetail.Req>, options?: object): Promise<ET<GetAgencyDetail.Res>>;

  export module GetAgencyList {
    export type AgencyResponse = {
      /** 代理id */
      agencyId?: string;
      /** 代理名称 */
      fullName?: string;
      /** 代理类型 1-中介 2-个代 */
      agencyType?: string;
      /** 税友号 */
      servyouNumber?: string;
      /** 社会信用代码 */
      socialCreditCode?: string;
      /** 角色代码列表 */
      roleList?: Array<string>;
      /** 角色名称列表 */
      roleNameList?: Array<string>;
      /** 场景名称列表 */
      sceneNameList?: Array<string>;
    };

    export interface Req {
      /** 个人id */
      personId?: string;
      /** 固话号码 */
      phone?: string;
      /** 代理类型 1-中介 2-个代，不传则查询两种类型 */
      agencyType?: string;
    }
    export type Res = Array<AgencyResponse>;
  }

  /** 查询代理机构(中介和个代)列表 get /agency/list */
  function getAgencyList(req: ET<GetAgencyList.Req>, options?: object): Promise<ET<GetAgencyList.Res>>;

  export module GetAgencyQueryClient {
    export type Req = any;
    export type Res = string;
  }

  /** 查询委托单位信息 get /agency/queryClient */
  function getAgencyQueryClient(req?: ET<GetAgencyQueryClient.Req>, options?: object): Promise<ET<GetAgencyQueryClient.Res>>;

  export module PostAgencyRemarkUpdate {
    export interface Req {
      /** 代理id */
      agencyId?: string;
      /** 税友号 */
      servyouNumber?: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 修改代理机构备注 post /agency/remark/update */
  function postAgencyRemarkUpdate(req: ET<PostAgencyRemarkUpdate.Req>, options?: object): Promise<ET<PostAgencyRemarkUpdate.Res>>;

  export module GetContactList {
    export type ContactDetailResponse = {
      /** 联系人id */
      contactId?: string;
      /** 联系人名称 */
      contactName?: string;
      /** 性别 */
      gender?: string;
      /** 称谓 */
      title?: string;
      /** 地区代码 */
      areaCode?: string;
      /** 行政区划代码 */
      bizRegionCode?: string;
      /** QQ号码 */
      qq?: string;
      /** 地址 */
      address?: string;
      /** 通行密码 */
      password?: string;
      /** 备注 */
      remark?: string;
      /** 邮箱 */
      email?: string;
      /** 状态 */
      status?: string;
      /** 状态名称 */
      statusName?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 电话号码列表 */
      contactPhoneList?: Array<ContactPhoneInfoBO>;
      /** 联系人角色信息列表 */
      contactRoleList?: Array<ContactRoleInfoBO>;
      /** 联系人手机号码列表 */
      contactMobileList?: Array<ContactMobileInfoBO>;
    };
    export type ContactPhoneInfoBO = {
      /** 最后修改时间，格式：yyyy-MM-dd HH:mm:ss */
      lastModifyTime?: string;
      /** 分机号 */
      ext?: string;
      /** 电话号码 */
      phone?: string;
      /** 区号 */
      area?: string;
      /** 区号-电话号码-分机号 */
      areaPhoneExt?: string;
      /** 区号-电话号码 */
      areaPhone?: string;
      /** 联系人电话id */
      contactPhoneId?: string;
    };
    export type ContactRoleInfoBO = {
      /** 联系人角色代码 */
      roleCode?: string;
      /** 联系人角色名称 */
      roleName?: string;
      /** 联系人用户id */
      contactId?: string;
      /** 最后修改时间，格式：yyyy-MM-dd HH:mm:ss */
      lastModifyTime?: string;
    };
    export type ContactMobileInfoBO = {
      /** 操作类型 */
      operationType?: string;
      /** 联系手机号id */
      contactMobileId?: string;
      /** 手机号码 */
      mobile?: string;
      /** 最后修改时间，格式：yyyy-MM-dd HH:mm:ss */
      lastModifyTime?: string;
    };

    export interface Req {
      /** 业务id */
      bizId: string;
      /** 客户类型，0：单位客户，1：代理商或中介机构，2：个人代理 */
      customerType: string;
    }
    export type Res = Array<ContactDetailResponse>;
  }

  /** 查询联系人列表 get /company/contact/list */
  function getContactList(req: ET<GetContactList.Req>, options?: object): Promise<ET<GetContactList.Res>>;

  export module GetCompanyList {
    export type CompanyListResponse = {
      /** 企业id */
      bizId?: string;
      /** 企业名称 */
      fullName?: string;
      /** 固话在该企业下的名称 */
      shortName?: string;
      /** 社会信用代码 */
      socialCreditCode?: string;
      /** 国税税号 */
      nationalTaxNo?: string;
      /** 角色代码列表 */
      roleList?: Array<string>;
      /** 角色名称列表 */
      roleNameList?: Array<string>;
      /** 场景名称列表 */
      sceneNameList?: Array<string>;
      /** 是否签约 是-true 否-false */
      signUpFlag?: boolean;
    };

    export interface Req {
      /** 个人id */
      personId?: string;
      /** 固话号码 */
      phone?: string;
    }
    export type Res = Array<CompanyListResponse>;
  }

  /** 查询企业列表 get /company/list */
  function getCompanyList(req: ET<GetCompanyList.Req>, options?: object): Promise<ET<GetCompanyList.Res>>;

  export module GetCompanyQueryFromTaxNet {
    export type CompanyResponse = {
      /** 地税税务机关代码 */
      localTaxBureauCode?: string;
      /** 地税税号 */
      localTaxNo?: string;
      /** 国税税号 */
      nationalTaxNo?: string;
      /** 国税税务机构代码 */
      nationalTaxBureauCode?: string;
      /** 地址 */
      address?: string;
      /** 分子公司代码 */
      companyId?: string;
      /** 签约户标志 */
      contractorSign?: string;
      /** 社会信用代码 */
      socialCreditCode?: string;
      /** 状态 */
      status?: string;
      /** 状态名称 */
      statusName?: string;
      /** 行政区划代码 */
      bizRegionCode?: string;
      /** 行政区划名称 */
      bizRegionName?: string;
      /** 用户代码 */
      servyouNumber?: string;
      /** bizid */
      bizId?: string;
      /** 用户名称 */
      fullName?: string;
      /** 用户简称 */
      shortName?: string;
      /** 用户类型：0：单位用户，1：代理商或事务所，2：个人代理 */
      customerType?: string;
      /** 通行密码 */
      password?: string;
    };

    export interface Req {
      /** 税号 */
      taxNo?: string;
      /** 地区代码 */
      areaId?: string;
      /** 同步渠道 national：国税通道；local：地税通道；all：国地税通道 */
      channel?: string;
    }
    export type Res = Array<CompanyResponse>;
  }

  /** 税务网关查询企业信息查询接口 get /company/queryFromTaxNet */
  function getCompanyQueryFromTaxNet(req: ET<GetCompanyQueryFromTaxNet.Req>, options?: object): Promise<ET<GetCompanyQueryFromTaxNet.Res>>;

  export module GetCompanyInfo {
    export type BusinessInfoResponse = {
      /** 所属客户经理代码 */
      serviceManagerCode?: string;
      /** 所属客户经理名称 */
      serviceManagerName?: string;
      /** 所属网点代码 */
      storeCode?: string;
      /** 所属网点名称 */
      storeName?: string;
    };
    export type ProxyInfoResponse = {
      /** 产品大类代码 */
      productCategoryCode?: string;
      /** 产品大类名称 */
      productCategoryName?: string;
      /** 用户代码 */
      servyouNumber?: string;
      /** 用户id */
      bizId?: string;
      /** 用户简称 */
      shortName?: string;
      /** 用户名称 */
      fullName?: string;
    };

    export interface Req {
      /** 客户id */
      bizId: string;
    }
    export interface Res {
      /** bizid */
      bizId?: string;
      /** 用户名称 */
      fullName?: string;
      /** 用户简称 */
      shortName?: string;
      /** 电话号码 */
      phone?: string;
      /** 分子公司代码 */
      companyId?: string;
      /** 分子公司名称 */
      companyName?: string;
      /** 国税税务机关名称 */
      nationalTaxBureauName?: string;
      /** 国税税务机构代码 */
      nationalTaxBureauCode?: string;
      /** 地税税务机关代码 */
      localTaxBureauCode?: string;
      /** 地税税务机构名称 */
      localTaxBureauName?: string;
      /** 地税税号 */
      localTaxNo?: string;
      /** 纳税人识别号 */
      taxpayerIdentificationNumber?: string;
      /** 传真号码 */
      faxNumber?: string;
      /** 社会信用代码 */
      socialCreditCode?: string;
      /** 通行密码 */
      password?: string;
      /** 企业类型 */
      companyType?: string;
      /** 行业大类代码 */
      industryCategoryCode?: string;
      /** 行业大类名称 */
      industryCategoryName?: string;
      /** 地区代码 */
      areaCode?: string;
      /** 行政区划代码 */
      bizRegionCode?: string;
      /** 行政区划名称 */
      bizRegionName?: string;
      /** 行政区划简称 */
      bizRegionShortName?: string;
      /** 出口企业类型信息 */
      exportCompanyType?: string;
      /** 经营地址 */
      businessAddress?: string;
      /** 备注 */
      remark?: string;
      /** 海关代码 */
      customsCode?: string;
      /** 状态 */
      status?: string;
      /** 状态名称 */
      statusName?: string;
      /** 业务信息列表 */
      businessInfoList?: Array<BusinessInfoResponse>;
      /** 被代理信息列表 */
      proxyInfoList?: Array<ProxyInfoResponse>;
      /** 所属经营中心代码 */
      businessCenterCode?: string;
      /** 所属经营中心名称 */
      businessCenterName?: string;
      /** 大区代码 */
      bigRegionCode?: string;
      /** 大区名称 */
      bigRegionName?: string;
    }
  }

  /** 查询纳税单位信息 get /company/info */
  function getCompanyInfo(req: ET<GetCompanyInfo.Req>, options?: object): Promise<ET<GetCompanyInfo.Res>>;

  export module PostRemarkUpdate {
    export interface Req {
      /** 企业id */
      bizId?: string;
      /** 备注信息 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 修改企业备注 post /company/remark/update */
  function postRemarkUpdate(req: ET<PostRemarkUpdate.Req>, options?: object): Promise<ET<PostRemarkUpdate.Res>>;

  export module GetTagList {
    export interface Req {
      /** 单位客户ID */
      bizId?: string;
      /** 场景 */
      scene?: string;
    }
    export type Res = Array<string>;
  }

  /** 查询企业标签列表 get /company/tag/list */
  function getTagList(req: ET<GetTagList.Req>, options?: object): Promise<ET<GetTagList.Res>>;

  export module PostCompanyUnbindCompanyPerson {
    export interface Req {
      /** 个人id */
      personId?: string;
      /** 企业id */
      bizId?: string;
    }
    export type Res = boolean;
  }

  /** 删除人企关系 post /company/unbindCompanyPerson */
  function postCompanyUnbindCompanyPerson(req: ET<PostCompanyUnbindCompanyPerson.Req>, options?: object): Promise<ET<PostCompanyUnbindCompanyPerson.Res>>;

  export module GetOrgList {
    export type OrgResponse = {
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
    export type Res = Array<OrgResponse>;
  }

  /** 分子公司列表 get /org/list */
  function getOrgList(req: ET<GetOrgList.Req>, options?: object): Promise<ET<GetOrgList.Res>>;

  export module GetStationList {
    export type StationResponse = {
      /** 网点id */
      code?: string;
      /** 网点名称 */
      name?: string;
      /** 驻点月份信息 */
      monthList?: Array<StationMonthBO>;
      /** 说明 */
      description?: string;
    };
    export type StationMonthBO = {
      /** 受理点ID */
      code?: string;
      /** 地址 */
      address?: string;
      /** 联系电话 */
      mobile?: string;
      /** 联系人 */
      contactName?: string;
      /** 工作时间类型， 1-正常工作日 */
      workType?: string;
      /** 驻点时间 */
      stationTime?: string;
      /** 驻点日期 */
      stationDate?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 分子公司代码 */
      parentCode?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<StationResponse>;
    }
  }

  /** 查询驻点列表 get /org/station/list */
  function getStationList(req: ET<GetStationList.Req>, options?: object): Promise<ET<GetStationList.Res>>;

  export module GetOrgStoreList {
    export type StoreResponse = {
      /** 网点id */
      code?: string;
      /** 网点名称 */
      name?: string;
      /** 地址 */
      address?: string;
      /** 电话 */
      phone?: string;
      /** 负责人 */
      personInCharge?: string;
      /** 描述 */
      description?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 分子公司代码 */
      parentCode?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<StoreResponse>;
    }
  }

  /** 查询网点列表 get /org/store/list */
  function getOrgStoreList(req: ET<GetOrgStoreList.Req>, options?: object): Promise<ET<GetOrgStoreList.Res>>;

  export module GetPersonalDetail {
    export interface Req {
      /** 用户id */
      personId?: string;
      /** 手机号 */
      mobile?: string;
    }
    export interface Res {
      /** 用户id */
      id?: string;
      /** 用户姓名 */
      fullName?: string;
      /** 性别 m-男 f-女 */
      sex?: string;
      /** 行政区划代码 */
      locationCode?: string;
      /** 行政区划名称 */
      locationName?: string;
      /** 生日 */
      birthday?: string;
      /** 身份证号码 */
      identityCardNo?: string;
      /** 备注 */
      remark?: string;
      /** 手机号列表，上限5个 */
      mobileList?: Array<string>;
      /** 座机号列表，上限5个 */
      phoneList?: Array<string>;
      /** 微信号列表，上限5个 */
      wechatNumberList?: Array<string>;
      /** QQ号列表，上限5个 */
      qqNumberList?: Array<string>;
      /** 邮箱列表，上限5个 */
      emailList?: Array<string>;
      /** 地址列表，上限5个 */
      addressList?: Array<string>;
    }
  }

  /** 查询个人信息 get /personal/detail */
  function getPersonalDetail(req: ET<GetPersonalDetail.Req>, options?: object): Promise<ET<GetPersonalDetail.Res>>;

  export module GetPersonalQueryLastCallTime {
    export type Req = any;
    export type Res = string;
  }

  /** 查询最近一次来电时间 get /personal/queryLastCallTime */
  function getPersonalQueryLastCallTime(req?: ET<GetPersonalQueryLastCallTime.Req>, options?: object): Promise<ET<GetPersonalQueryLastCallTime.Res>>;

  export module PostPersonalRemarkUpdate {
    export interface Req {
      /** 个人id */
      personId?: string;
      /** 备注信息 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 修改个人备注 post /personal/remark/update */
  function postPersonalRemarkUpdate(req: ET<PostPersonalRemarkUpdate.Req>, options?: object): Promise<ET<PostPersonalRemarkUpdate.Res>>;

  export module GetPersonalTagList {
    export interface Req {
      /** 手机号 */
      mobile?: string;
      /** 场景 */
      scene?: string;
    }
    export type Res = Array<string>;
  }

  /** 查询个人标签列表 get /personal/tag/list */
  function getPersonalTagList(req: ET<GetPersonalTagList.Req>, options?: object): Promise<ET<GetPersonalTagList.Res>>;

  export module GetGroupDetail {
    export type GroupIncallConfigBO = {
      /** 主键id */
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
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };
    export type AssistGroupBO = {
      /** 主键id */
      id?: number;
      /** 组id */
      groupId?: number;
      /** 辅助组id */
      assistGroupId?: number;
      /** 受理渠道 */
      acceptanceChannel?: string;
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };

    export interface Req {
      /** 组id */
      groupId: number;
    }
    export interface Res {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 组类型 */
      type?: string;
      /** 受理机构Id */
      companyId?: string;
      /** 所属部门代码 */
      departId?: string;
      /** 所属地区id */
      areaId?: string;
      /** 状态 */
      status?: string;
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 电话组配置信息 */
      incallConfig?: GroupIncallConfigBO;
      /** 备用组关系列表 */
      assistGroupList?: Array<AssistGroupBO>;
    }
  }

  /** 查询组详情 get /group/detail */
  function getGroupDetail(req: ET<GetGroupDetail.Req>, options?: object): Promise<ET<GetGroupDetail.Res>>;

  export module GetFileDownload_1604658160 {
    export interface Req {
      /** 文件路径 */
      path: string;
      /** 文件名称 */
      fileName: string;
    }
    export type Res = string;
  }

  /** 下载文件 get /file/download */
  function getFileDownload_1604658160(req: ET<GetFileDownload_1604658160.Req>, options?: object): Promise<ET<GetFileDownload_1604658160.Res>>;

  export module PostFileUpload {
    export interface Req {
      file: any;
      description: string;
      companyId: string;
    }
    export type Res = boolean;
  }

  /** 上传文件 post /file/upload */
  function postFileUpload(req: ET<PostFileUpload.Req>, options?: object): Promise<ET<PostFileUpload.Res>>;

  export module GetClueList {
    export type ClueInfoResponse = {
      /** 线索id */
      id?: string;
      /** 描述 */
      description?: string;
      /** 线索名称 */
      name?: string;
      /** 联系人名称 */
      contactName?: string;
      /** 联系人手机号 */
      mobile?: string;
      /** 跟进状态 */
      traceStatus?: string;
      /** 跟进状态名称 */
      traceStatusName?: string;
      /** 成交状态 */
      dealStatus?: string;
      /** 成交状态名称 */
      dealStatusName?: string;
      /** 创建时间 */
      createTime?: string;
    };

    export interface Req {
      /** 企业id */
      bizId: string;
    }
    export type Res = Array<ClueInfoResponse>;
  }

  /** 查询当前线索列表接口 get /market/clue/list */
  function getClueList(req: ET<GetClueList.Req>, options?: object): Promise<ET<GetClueList.Res>>;

  export module GetClueCount {
    export interface Req {
      /** 企业id */
      bizId: string;
    }
    export type Res = number;
  }

  /** 查询企业未关闭线索 get /market/clue/count */
  function getClueCount(req: ET<GetClueCount.Req>, options?: object): Promise<ET<GetClueCount.Res>>;

  export module GetProductDue {
    export type ProductDueResponse = {
      /** 产品包id */
      productId?: string;
      /** 订单产品包名称 */
      productName?: string;
      /** 到期日期 */
      dueDate?: string;
      /** 续费意愿 */
      renewalIntention?: string;
      /** 不续费原因 */
      notRenewalReason?: string;
      /** 未明确原因 */
      notClearReason?: string;
    };

    export interface Req {
      /** 企业id */
      bizId: string;
      /** 分子公司代码 */
      companyId: string;
      /** 企业税号 */
      taxNo: string;
    }
    export type Res = Array<ProductDueResponse>;
  }

  /** 查询用户即将到期的产品列表接口 get /market/product/due */
  function getProductDue(req: ET<GetProductDue.Req>, options?: object): Promise<ET<GetProductDue.Res>>;

  export module GetProductIntention {
    export type ProductIntentionResponse = {
      /** 产品包id */
      productId?: string;
      /** 订单产品包名称+价格 */
      productName?: string;
    };

    export interface Req {
      /** 企业id */
      bizId: string;
      /** 分子公司代码 */
      companyId: string;
      /** 企业税号 */
      taxNo: string;
    }
    export type Res = Array<ProductIntentionResponse>;
  }

  /** 推荐产品列表 get /market/product/intention */
  function getProductIntention(req: ET<GetProductIntention.Req>, options?: object): Promise<ET<GetProductIntention.Res>>;

  export module PostClueSave {
    export type SaveClueRequest = {
      /** bizId */
      bizId?: string;
      /** 线索名称 */
      name?: string;
      /** 线索描述 */
      description?: string;
      /** 联系人名称 */
      contactName?: string;
      /** 手机号 */
      mobile?: string;
      /** 代理商和中介Id */
      agencyId?: string;
      /** 个人代理Id */
      personId?: string;
      /** 用户类型 */
      customerType?: string;
    };

    export interface Req {
      saveClueRequest: SaveClueRequest;
    }
    export type Res = boolean;
  }

  /** 保存线索接口 post /market/clue/save */
  function postClueSave(req: ET<PostClueSave.Req>, options?: object): Promise<ET<PostClueSave.Res>>;

  export module GetOrderList {
    export type OrderInfoResponse = {
      /** 订单编号 */
      orderId?: string;
      /** 订单时间 */
      orderTime?: string;
      /** 收款时间 */
      collectionTime?: string;
      /** 应收金额 */
      receivableAmount?: string;
      /** 收款状态 */
      collectionStatus?: string;
      /** 开票时间 */
      invoicingTime?: string;
      /** 开票状态 */
      invoicingStatus?: string;
      /** 交付时间 */
      deliverTime?: string;
      /** 交付状态 */
      deliverStatus?: string;
      /** 产品包列表 */
      productList?: Array<OrderProductResponse>;
      /** 物流信息 */
      logisticsInfo?: Array<OrderLogisticsResponse>;
      /** 发票信息 */
      invoiceInfo?: OrderInvoiceResponse;
    };
    export type OrderProductResponse = {
      /** 订单产品包名称 */
      productName?: string;
      thly?: string;
    };
    export type OrderLogisticsResponse = {
      /** 交付方式 */
      logisticsType?: string;
      /** 交付方式 */
      logisticsStatus?: string;
    };
    export type OrderInvoiceResponse = {
      /** 发票修改标识 */
      invoiceModifyFlag?: boolean;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户业务id */
      khid?: string;
      /** 客户类型 */
      khlx?: string;
      /** 客户代码 */
      khdm?: string;
      /** 查询类型 */
      cxlx?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<OrderInfoResponse>;
    }
  }

  /** 查询用户订单列表 get /order/list */
  function getOrderList(req: ET<GetOrderList.Req>, options?: object): Promise<ET<GetOrderList.Res>>;

  export module GetSendInvoiceModify {
    export interface Req {
      /** 入参 */
      modifyRequest: any;
    }
    export type Res = boolean;
  }

  /** 发送换票短信 get /sms/send/invoiceModify */
  function getSendInvoiceModify(req: ET<GetSendInvoiceModify.Req>, options?: object): Promise<ET<GetSendInvoiceModify.Res>>;

  export module GetClueList_1605681137 {
    export type ClueInfoResponse = {
      /** 线索id */
      id?: string;
      /** 描述 */
      description?: string;
      /** 线索名称 */
      name?: string;
      /** 联系人名称 */
      contactName?: string;
      /** 联系人手机号 */
      mobile?: string;
      /** 跟进状态 */
      traceStatus?: string;
      /** 跟进状态名称 */
      traceStatusName?: string;
      /** 成交状态 */
      dealStatus?: string;
      /** 成交状态名称 */
      dealStatusName?: string;
      /** 创建时间 */
      createTime?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户bizId */
      bizId?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ClueInfoResponse>;
    }
  }

  /** 查询当前线索列表接口 get /clue/list */
  function getClueList_1605681137(req: ET<GetClueList_1605681137.Req>, options?: object): Promise<ET<GetClueList_1605681137.Res>>;

  export module GetClueCount_1605681137 {
    export interface Req {
      /** 企业id */
      bizId: string;
    }
    export type Res = number;
  }

  /** 查询企业未关闭线索 get /clue/count */
  function getClueCount_1605681137(req: ET<GetClueCount_1605681137.Req>, options?: object): Promise<ET<GetClueCount_1605681137.Res>>;

  export module GetClueProductDue {
    export type AnonymousDto = {
      /** 产品包id */
      productId?: string;
      /** 订单产品包名称 */
      productName?: string;
      /** 到期日期 */
      dueDate?: string;
      /** 续费意愿 */
      renewalIntention?: string;
      /** 不续费原因 */
      notRenewalReason?: string;
      /** 未明确原因 */
      notClearReason?: string;
    };

    export interface Req {
      /** 企业id */
      bizId: string;
      /** 分子公司代码 */
      companyId: string;
      /** 企业税号 */
      taxNo: string;
    }
    export type Res = Array<AnonymousDto>;
  }

  /** 查询用户即将到期的产品列表接口 get /clue/product/due */
  function getClueProductDue(req: ET<GetClueProductDue.Req>, options?: object): Promise<ET<GetClueProductDue.Res>>;

  export module GetClueProductIntention {
    export type AnonymousDto = {
      /** 产品包id */
      productId?: string;
      /** 订单产品包名称+价格 */
      productName?: string;
    };

    export interface Req {
      /** 企业id */
      bizId: string;
      /** 分子公司代码 */
      companyId: string;
      /** 企业税号 */
      taxNo: string;
    }
    export type Res = Array<AnonymousDto>;
  }

  /** 推荐产品列表 get /clue/product/intention */
  function getClueProductIntention(req: ET<GetClueProductIntention.Req>, options?: object): Promise<ET<GetClueProductIntention.Res>>;

  export module PostClueSave_1605681137 {
    export interface Req {
      /** bizId */
      bizId: string;
      /** 线索名称 */
      name: string;
      /** 线索描述 */
      description: string;
      /** 联系人名称 */
      contactName: string;
      /** 手机号 */
      mobile: string;
      /** 代理商和中介Id */
      agencyId?: string;
      /** 个人代理Id */
      personId?: string;
      /** 用户类型 */
      customerType?: string;
      /** 来源，默认是来电弹屏 */
      source?: string;
      /** 二级来源分类 */
      sourceCate?: string;
    }
    export type Res = boolean;
  }

  /** 保存线索接口 post /clue/save */
  function postClueSave_1605681137(req: ET<PostClueSave_1605681137.Req>, options?: object): Promise<ET<PostClueSave_1605681137.Res>>;

  export module PostClueRenewIntention {
    export type RenewInfoBO = {
      /** 产品包id */
      productId?: string;
      /** 产品包名称 */
      productName?: string;
      /** 到期日期 */
      dueDate?: string;
      /** 续费意愿结果 */
      renewalIntention?: string;
      /** 不续费原因 */
      notRenewalReason?: string;
      /** 未明确原因 */
      notClearReason?: string;
      /** 咨询情况 */
      consultInfo?: string;
      /** 是否缴费 */
      isPay?: string;
    };

    export interface Req {
      /** 客户类型 */
      customerType?: string;
      /** 客户代码 */
      servyouNumber?: string;
      /** 客户id */
      bizId?: string;
      /** 企业税号 */
      taxNo?: string;
      /** 分子公司代码 */
      companyId?: string;
      /** 联系人id */
      personId?: string;
      /** 续费意愿列表 */
      renewList?: Array<RenewInfoBO>;
    }
    export type Res = boolean;
  }

  /** 保存营销意愿接口 post /clue/renewIntention */
  function postClueRenewIntention(req: ET<PostClueRenewIntention.Req>, options?: object): Promise<ET<PostClueRenewIntention.Res>>;

  export module GetSmsList {
    export type QuerySmsResponse = {
      /** 手机号 */
      mobile?: string;
      /** 联系人 */
      receiverName?: string;
      /** 短信内容 */
      content?: string;
      /** 发送时间 */
      sendTime?: string;
      /** 短信状态 */
      status?: string;
      /** 短信状态名称 */
      statusName?: string;
      /** 应用场景代码 */
      sceneCode?: string;
      /** 应用场景名称 */
      sceneName?: string;
      /** 短信id */
      msgId?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户类型 */
      customerType?: string;
      /** 客户代码 */
      servyouNumber?: string;
      /** 客户id */
      bizId?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<QuerySmsResponse>;
    }
  }

  /** 查询短信内容 get /sms/list */
  function getSmsList(req: ET<GetSmsList.Req>, options?: object): Promise<ET<GetSmsList.Res>>;

  export module PostSmsSend {
    export type SmsParameterBO = {
      /** 短信模板key */
      msgKey?: string;
      /** 短信模块value */
      msgValue?: string;
    };

    export interface Req {
      /** 手机号码 */
      mobile?: string;
      /** 个人id */
      personId?: string;
      /** 联系人名称 */
      name?: string;
      /** 企业id */
      bizId?: string;
      /** 企业名称 */
      companyName?: string;
      /** 客户类型 */
      customerType?: string;
      /** 客户代码 */
      servyouNumber?: string;
      /** 分子公司代码 */
      companyId?: string;
      /** 业务id */
      businessId?: string;
      /** 业务类型  store-网点类型，station-驻点信息 */
      businessType?: string;
      /** 短信参数 */
      parameter?: Array<SmsParameterBO>;
    }
    export type Res = boolean;
  }

  /** 发送短信接口 post /sms/send */
  function postSmsSend(req: ET<PostSmsSend.Req>, options?: object): Promise<ET<PostSmsSend.Res>>;

  export module GetRecordGetLastCallTime {
    export interface Req {
      /** 来电号码 */
      callNumber: string;
    }
    export type Res = string;
  }

  /** 查询最近一次来电时间 get /consult/record/getLastCallTime */
  function getRecordGetLastCallTime(req: ET<GetRecordGetLastCallTime.Req>, options?: object): Promise<ET<GetRecordGetLastCallTime.Res>>;

  export module PostRecordSave {
    export type ConsultMatterSaveRequest = {
      /** 客户id */
      bizId?: string;
      /** 客户类型，0：单位客户，1：代理商或事务所，2：个人代理 */
      customerType?: string;
      /** 客户名称 */
      customerName?: string;
      /** 企业税号 */
      taxNo?: string;
      /** 事项名称 */
      name?: string;
      /** 任务描述 */
      description?: string;
    };
    export type HomeTaskCreateRequest = {
      /** 产品大类 */
      productMainCategory?: string;
      /** 任务执行者 */
      executor?: string;
      /** 任务类型 */
      taskType?: string;
      /** 联系人id */
      contactId?: string;
      /** 联系人 */
      contactName?: string;
      /** 联系号码 */
      contactNumber?: string;
      /** 联系号码id */
      contactNumberId?: string;
      /** 要求完成时间 */
      requireCompleteTime?: string;
      /** 网点部门 */
      store?: string;
      /** 上门地址 */
      address?: string;
      /** 上门地区code */
      areaCode?: string;
      /** 上门地区 */
      areaName?: string;
      /** 任务描述 */
      description?: string;
    };
    export type CallBackTaskCreateRequest = {
      /** 产品大类 */
      productMainCategory?: string;
      /** 任务执行者 */
      executor?: string;
      /** 任务类型 */
      taskType?: string;
      /** 联系人id */
      contactId?: string;
      /** 联系人 */
      contactName?: string;
      /** 联系号码 */
      contactNumber?: string;
      /** 联系号码id */
      contactNumberId?: string;
      /** 回电技能组 */
      callbackGroupId?: string;
      /** 网点部门 */
      store?: string;
      /** 是否路由 */
      isRoute?: string;
    };
    export type RemoteTaskCreateRequest = {
      /** 产品大类 */
      productMainCategory?: string;
      /** 任务执行者 */
      executor?: string;
      /** 任务类型 */
      taskType?: string;
      /** 联系人id */
      contactId?: string;
      /** 联系人 */
      contactName?: string;
      /** 联系号码 */
      contactNumber?: string;
      /** 联系号码id */
      contactNumberId?: string;
      /** qq */
      qq?: string;
      /** 网点部门 */
      store?: string;
      /** 任务描述 */
      description?: string;
      /** 要求完成时间 */
      requireCompleteTime?: string;
    };

    export interface Req {
      /** 客户id */
      bizId?: string;
      /** 客户名称 */
      customerName?: string;
      /** 客户类型  0：单位客户，1：代理商或事务所，2：个人代理 */
      customerType?: string;
      /** 企业税号 */
      taxNo?: string;
      /** 行政区划代码 */
      bizRegionCode?: string;
      /** 个人id */
      personId?: string;
      /** 个人名称，人员未知时默认传“未知” */
      personName?: string;
      /** 主叫号码 */
      callerNumber?: string;
      /** 接入号码 */
      calledNumber?: string;
      /** 被叫号码 */
      calledExtNumber?: string;
      /** 前转号码 */
      forwardFromNumber?: string;
      /** 用户有想法 */
      personIdea?: string;
      /** 呼叫唯一标识ctiId */
      ctiId?: string;
      /** 话务来源 0-呼入 1-转接 */
      callSource?: string;
      /** 咨询操作 0-结束 -转接组 2转接人 */
      consultOperation?: string;
      /** 咨询开始时间 */
      consultStartTime?: string;
      /** 咨询时长 */
      consultDuration?: string;
      /** 话后处理开始时间 */
      afterCallHandleStartTime?: string;
      /** 话后处理结束时间 */
      afterCallHandleEndTime?: string;
      /** 来电组id */
      groupId?: string;
      /** 处理情况，0：正常咨询，1：派发，2：回电，3：远程，4：代办 */
      handleType?: string;
      /** 咨询事项列表 */
      consultMatterList?: Array<ConsultMatterSaveRequest>;
      /** 上门任务信息，只有handleType=1派发时需要 */
      homeTask?: HomeTaskCreateRequest;
      /** 回电任务信息，只有handleType=2回电时需要 */
      callBackTask?: CallBackTaskCreateRequest;
      /** 远程任务信息，只有handleType=3远程时需要 */
      remoteTask?: RemoteTaskCreateRequest;
      /** 咨询关联的运营动作id */
      operateActionIdList?: Array<number>;
    }
    export type Res = string;
  }

  /** 保存咨询记录 post /consult/record/save */
  function postRecordSave(req: ET<PostRecordSave.Req>, options?: object): Promise<ET<PostRecordSave.Res>>;

  export module GetProductDueWalle {
    export type ProductDueResponse = {
      /** 产品包id */
      productId?: string;
      /** 订单产品包名称 */
      productName?: string;
      /** 到期日期 */
      dueDate?: string;
      /** 续费意愿 */
      renewalIntention?: string;
      /** 不续费原因 */
      notRenewalReason?: string;
      /** 未明确原因 */
      notClearReason?: string;
    };

    export interface Req {
      /** 企业id */
      bizId?: string;
      /** 分子公司代码 */
      companyId?: string;
      /** 企业税号 */
      taxNo?: string;
    }
    export type Res = Array<ProductDueResponse>;
  }

  /** 查询用户即将到期的产品列表接口 get /product/due */
  function getProductDueWalle(req: ET<GetProductDueWalle.Req>, options?: object): Promise<ET<GetProductDueWalle.Res>>;

  export module GetProductIntentionWalle {
    export type ProductIntentionResponse = {
      /** 产品包id */
      productId?: string;
      /** 订单产品包名称+价格 */
      productName?: string;
    };

    export interface Req {
      /** 企业id */
      bizId?: string;
      /** 分子公司代码 */
      companyId?: string;
      /** 企业税号 */
      taxNo?: string;
    }
    export type Res = Array<ProductIntentionResponse>;
  }

  /** 推荐产品列表 get /product/intention */
  function getProductIntentionWalle(req: ET<GetProductIntentionWalle.Req>, options?: object): Promise<ET<GetProductIntentionWalle.Res>>;

  export module GetConsultIncall {
    export interface Req {
      /** 主叫号码 */
      caller?: string;
      /** 被叫号码（接入号码） */
      called?: string;
      /** 受理组id */
      groupId?: number;
      /** 坐席用户名 */
      username?: string;
      /** 坐席密码 */
      password?: string;
    }
    export type Res = string;
  }

  /** 电话咨询接入请求 get /consult/incall */
  function getConsultIncall(req: ET<GetConsultIncall.Req>, options?: object): Promise<ET<GetConsultIncall.Res>>;

  export module GetCreditQuery {
    export interface Req {
      /** 手机号 */
      mobile?: string;
    }
    export interface Res {
      /** 积分余额 */
      credit?: number;
      /** 今年过期积分值 */
      creditExpire?: number;
    }
  }

  /** 查询个人积分信息 get /personal/credit/query */
  function getCreditQuery(req: ET<GetCreditQuery.Req>, options?: object): Promise<ET<GetCreditQuery.Res>>;

  export module GetRightsTrainCustomerQuery {
    export type CustomerMobileTrainRightResponse = {
      /** 权益手机号 */
      mobile?: string;
      /** 手机号可用专享权益数 */
      specialUnusedTotal?: string;
    };

    export interface Req {
      /** 业务id */
      bizId: string;
    }
    export interface Res {
      /** 企业下可使用专享总数 */
      specialUnusedTotal?: string;
      /** 企业下可使用共享总数 */
      sharedUnusedTotal?: string;
      /** 企业下已使用权益总数 */
      usedTotal?: string;
      /** 权益项列表 */
      mobileList?: Array<CustomerMobileTrainRightResponse>;
    }
  }

  /** 查询企业培训权益信息 get /rights/train/customer/query */
  function getRightsTrainCustomerQuery(req: ET<GetRightsTrainCustomerQuery.Req>, options?: object): Promise<ET<GetRightsTrainCustomerQuery.Res>>;

  export module GetRightsTrainPersonQuery {
    export type PersonCustomerTrainRightResponse = {
      /** 客户名称 */
      customerName?: string;
      /** long类型的客户id */
      customerId?: number;
      /** 企业下可用专享权益数 */
      specialUnusedTotal?: string;
      /** 企业下可用共享权益数 */
      sharedUnusedTotal?: string;
    };

    export interface Req {
      /** 手机号码 */
      mobile: string;
    }
    export interface Res {
      /** 个人可使用专享总数 */
      specialUnusedTotal?: string;
      /** 个人可使用共享总数 */
      sharedUnusedTotal?: string;
      /** 个人已使用权益总数 */
      usedTotal?: string;
      /** 权益项列表 */
      customerList?: Array<PersonCustomerTrainRightResponse>;
    }
  }

  /** 查询个人培训权益信息 get /rights/train/person/query */
  function getRightsTrainPersonQuery(req: ET<GetRightsTrainPersonQuery.Req>, options?: object): Promise<ET<GetRightsTrainPersonQuery.Res>>;

  export module GetClientList {
    export type AgencyClientResponse = {
      /** 委托单位id */
      id?: string;
      /** 委托单位名称 */
      fullName?: string;
      /** 行政区划代码 */
      bizRegionCode?: string;
      /** 分子公司代码 */
      responsibleBranchId?: string;
      /** 经营地址 */
      businessAddress?: string;
      /** 社会信用代码 */
      socialCreditCode?: string;
      /** 国税税号 */
      nationalTaxNo?: string;
    };

    export interface Req {
      agencyId: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<AgencyClientResponse>;
    }
  }

  /** 查询委托单位信息 get /agency/client/list */
  function getClientList(req: ET<GetClientList.Req>, options?: object): Promise<ET<GetClientList.Res>>;

  export module GetCompanySearch {
    export type CompanySearchResponse = {
      /** 用户信息列表 */
      bizId?: string;
      /** 用户名称 */
      fullName?: string;
      /** 用户类型 */
      customerType?: string;
      /** 国税税号 */
      nationalTaxNo?: string;
      /** 地税税号 */
      localTaxNo?: string;
      /** 行政区划代码 */
      bizRegionCode?: string;
      /** 行政区划名称 */
      bizRegionName?: string;
      /** 状态 */
      status?: string;
      /** 状态名称 */
      statusName?: string;
    };

    export interface Req {
      /** 查询关键字 */
      keyword?: string;
      /** 税号是否区分大小写 */
      caseSensitive?: string;
      /** 企业类型 */
      customerType?: string;
      /** 分子公司代码 */
      companyId?: string;
    }
    export type Res = Array<CompanySearchResponse>;
  }

  /** 企业搜索接口 get /company/search */
  function getCompanySearch(req: ET<GetCompanySearch.Req>, options?: object): Promise<ET<GetCompanySearch.Res>>;

  export module GetGroupListWalle {
    export type GroupInfoResponse = {
      /** 组id */
      id?: number;
      /** 组名称 */
      name?: string;
      /** 组类型 */
      type?: string;
      /** 受理机构Id */
      companyId?: string;
      /** 所属部门代码 */
      departId?: string;
      /** 所属地区id */
      areaId?: string;
      /** 状态 */
      status?: string;
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
      /** 电话组配置信息 */
      incallConfig?: GroupIncallConfigBO;
      /** 备用组关系列表 */
      assistGroupList?: Array<AssistGroupBO>;
    };
    export type GroupIncallConfigBO = {
      /** 主键id */
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
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };
    export type AssistGroupBO = {
      /** 主键id */
      id?: number;
      /** 组id */
      groupId?: number;
      /** 辅助组id */
      assistGroupId?: number;
      /** 受理渠道 */
      acceptanceChannel?: string;
      /** 创建人trueId */
      creator?: string;
      /** 创建时间 */
      createTime?: string;
      /** 最后修改人trueId */
      lastModifier?: string;
      /** 最后修改时间 */
      lastModifyTime?: string;
    };

    export interface Req {
      /** 组类型 */
      type: string;
    }
    export type Res = Array<GroupInfoResponse>;
  }

  /** 查询业务组列表 get /group/list */
  function getGroupListWalle(req: ET<GetGroupListWalle.Req>, options?: object): Promise<ET<GetGroupListWalle.Res>>;

  export module GetV2List {
    export type InternalDataListResponse = {
      /** 资料id */
      id?: string;
      /** 资料标题 */
      title?: string;
      /** 发布时间 */
      publishTime?: string;
    };

    export interface Req {
      /** 资料类型，01：价格政策及定义，02：协作规则，03：技能组信息，04：培训计划 */
      type?: string;
      /** 分子公司代码，最长12位 */
      companyId?: string;
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
      list?: Array<InternalDataListResponse>;
    }
  }

  /** 管理页面查询内部资料列表，支持根据分子公司、网点、类型分页查询；  本接口只返回已发布的问题； get /internalData/v2/list */
  function getV2List(req: ET<GetV2List.Req>, options?: object): Promise<ET<GetV2List.Res>>;

  export module GetIncallCount {
    export interface Req {
      /** 企业id */
      bizId?: string;
      /** 客户代码 */
      servyouNumber?: string;
      /** 客户类型 */
      customerType?: string;
      /** 日期 */
      beginDate?: string;
    }
    export type Res = number;
  }

  /** 来电咨询次数统计 get /consult/incall/count */
  function getIncallCount(req: ET<GetIncallCount.Req>, options?: object): Promise<ET<GetIncallCount.Res>>;

  export module GetStoreCustomer {
    export interface Req {
      /** 客户id */
      bizId: string;
      /** 客户类型 */
      customerType: string;
    }
    export type Res = string;
  }

  /** 查询客户所属网点接口 get /org/store/customer */
  function getStoreCustomer(req: ET<GetStoreCustomer.Req>, options?: object): Promise<ET<GetStoreCustomer.Res>>;

  export module GetSuitCount {
    export interface Req {
      /** 企业id */
      bizId?: string;
      /** 客户代码 */
      servyouNumber?: string;
      /** 客户类型 */
      customerType?: string;
      /** 查询开始日期 */
      beginDate?: string;
    }
    export type Res = number;
  }

  /** 投诉次数统计 get /suit/count */
  function getSuitCount(req: ET<GetSuitCount.Req>, options?: object): Promise<ET<GetSuitCount.Res>>;

  export module GetOrgTree {
    export type DmEnumTreeResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
      /** 子节点集合 */
      childrens?: Array<DmEnumTreeResponse>;
    };

    export type Req = any;
    export type Res = Array<DmEnumTreeResponse>;
  }

  /** 查询所有分子公司列表 get /org/tree */
  function getOrgTree(req?: ET<GetOrgTree.Req>, options?: object): Promise<ET<GetOrgTree.Res>>;

  export module GetSmsTemplate {
    export interface Req {
      /** 短信类型 */
      businessType: string;
    }
    export type Res = string;
  }

  /** 查询短信模板接口 get /sms/template */
  function getSmsTemplate(req: ET<GetSmsTemplate.Req>, options?: object): Promise<ET<GetSmsTemplate.Res>>;

  export module GetClassifyList {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export interface Req {
      /** 分子公司代码 */
      companyId: string;
    }
    export type Res = Array<DmEnumResponse>;
  }

  /** 根据分子公司查询产品大类列表 get /product/classify/list */
  function getClassifyList(req: ET<GetClassifyList.Req>, options?: object): Promise<ET<GetClassifyList.Res>>;

  export module GetTaskQueryType {
    export type AnonymousDto = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export interface Req {
      /** 查询任务类型入参 */
      taskTypeRequest: any;
    }
    export type Res = Array<AnonymousDto>;
  }

  /** 根据任务方式和分子公司代码查询任务类型 get /task/queryType */
  function getTaskQueryType(req: ET<GetTaskQueryType.Req>, options?: object): Promise<ET<GetTaskQueryType.Res>>;

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
    export type Res = Array<EmployeeResponse>;
  }

  /** 渐进式查询人员信息  按条件模糊查询员工列表。查询参数content中可填入 姓名、姓名简拼、用户名、手机、邮箱 五个字段，其中只有手机为精确查询 get /user/fuzzyQuery */
  function getUserFuzzyQuery(req: ET<GetUserFuzzyQuery.Req>, options?: object): Promise<ET<GetUserFuzzyQuery.Res>>;

  export module GetMarketDivideList {
    export type AnonymousDto = {
      /** 客户bizid */
      bizId?: string;
      /** 客户类型 0-单位客户 1-中介 2-个人代理 */
      customerType?: string;
      /** 所属客户经理代码 */
      serviceManagerCode?: string;
      /** 所属客户经理名称 */
      serviceManagerName?: string;
      /** 所属网点代码 */
      storeCode?: string;
      /** 所属网点名称 */
      storeName?: string;
    };

    export interface Req {
      marketDivideListRequest: any;
    }
    export type Res = Array<AnonymousDto>;
  }

  /** 查询市场划分结果 get /customer/marketDivide/list */
  function getMarketDivideList(req: ET<GetMarketDivideList.Req>, options?: object): Promise<ET<GetMarketDivideList.Res>>;

  export module GetCompanyToolDetail {
    export type ProductToolUseResponse = {
      /** 产品名称 */
      productName?: string;
      /** 产品下所有工具的使用情况 */
      toolList?: Array<ToolUseResponse>;
    };
    export type ToolUseResponse = {
      /** 工具名称 */
      toolName?: string;
      /** 每个月的使用情况 */
      detailList?: Array<ToolMonthUseResponse>;
    };
    export type ToolMonthUseResponse = {
      /** 月份 */
      month?: string;
      /** 是否使用 */
      use?: string;
    };

    export interface Req {
      /** 企业id */
      bizId: string;
    }
    export type Res = Array<ProductToolUseResponse>;
  }

  /** 产品下所有工具每个月的使用情况 get /company/tool/detail */
  function getCompanyToolDetail(req: ET<GetCompanyToolDetail.Req>, options?: object): Promise<ET<GetCompanyToolDetail.Res>>;

  export module GetFileShareFile {
    export type ShareFileResponse = {
      /** 附件ID */
      id?: string;
      /** 附件发布（上传）人ID */
      trueId?: string;
      /** 发布人姓名 */
      userName?: string;
      /** 附件描述 */
      description?: string;
      /** 附件名称 */
      fileName?: string;
      /** 发布时间 */
      publisherTime?: Timestamp;
      /** 附件路径 */
      filePath?: string;
      /** 扩展名 */
      extensionName?: string;
    };
    export type Timestamp = any;

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 附件名称 */
      fileName?: string;
      /** 分子公司代码 */
      companyId?: string;
      /** 网点代码 */
      store?: string;
      /** 技能组id */
      groupId?: string;
      /** 附件人id */
      trueId?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ShareFileResponse>;
    }
  }

  /** 查询共享文件列表接口 get /file/shareFile */
  function getFileShareFile(req: ET<GetFileShareFile.Req>, options?: object): Promise<ET<GetFileShareFile.Res>>;

  export module GetCommonQueryAreaList {
    export type AreaResponse = {
      /** 行政区划代码 */
      id?: string;
      /** 行政区划名称 */
      name?: string;
      /** 分子公司代码 */
      companyId?: string;
    };

    export type Req = any;
    export type Res = Array<AreaResponse>;
  }

  /** 返回地区列表 get /common/queryAreaList */
  function getCommonQueryAreaList(req?: ET<GetCommonQueryAreaList.Req>, options?: object): Promise<ET<GetCommonQueryAreaList.Res>>;

  export module GetTypeList {
    export type DmEnumResponse = {
      /** 键 */
      id?: string;
      /** 值 */
      name?: string;
    };

    export interface Req {
      /** 任务方式 */
      way?: string;
      /** 任务大类 */
      classify?: string;
      /** 分子公司代码 */
      companyId?: string;
    }
    export type Res = Array<DmEnumResponse>;
  }

  /** 根据任务方式和分子公司代码查询任务类型 get /task/type/list */
  function getTypeList(req: ET<GetTypeList.Req>, options?: object): Promise<ET<GetTypeList.Res>>;

  export module PostTaskRemindCallback {
    export interface Req {
      /** 任务编号 */
      taskId?: string;
      /** 企业名称 */
      companyName?: string;
      /** 企业税号 */
      taxNo?: string;
    }
    export type Res = boolean;
  }

  /** 提醒回电 post /task/remindCallback */
  function postTaskRemindCallback(req: ET<PostTaskRemindCallback.Req>, options?: object): Promise<ET<PostTaskRemindCallback.Res>>;

  export module GetCompanyStore {
    export interface Req {
      /** 客户代码 */
      bizId?: string;
      /** 客户类型 */
      customerType?: string;
    }
    export type Res = string;
  }

  /** 查询客户所属网点接口 get /company/store */
  function getCompanyStore(req: ET<GetCompanyStore.Req>, options?: object): Promise<ET<GetCompanyStore.Res>>;

  export module GetSuitList_1606819251 {
    export type SuitResponse = {
      /** 诉求类型0：表扬，1：投诉，2：建议 */
      suitType?: string;
      /** 诉求类型名称 */
      suitTypeName?: string;
      /** 诉求内容 */
      suitContent?: string;
      /** 诉求时间 */
      suitTime?: string;
      /** 诉求状态 */
      status?: string;
      /** 诉求状态名称 */
      statusName?: string;
      /** 回复内容 */
      answerContent?: string;
      /** 登记人名称 */
      acceptorName?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户id */
      bizId?: string;
      /** 客户代码 */
      servyouNumber?: string;
      /** 客户类型 */
      customerType?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SuitResponse>;
    }
  }

  /** 投诉建议记录列表 get /suit/list */
  function getSuitList_1606819251(req: ET<GetSuitList_1606819251.Req>, options?: object): Promise<ET<GetSuitList_1606819251.Res>>;

  export module GetBankCollection {
    export type BankCollectionResponse = {
      /** 产品包id */
      productId?: string;
      /** 产品包名称 */
      productName?: string;
      /** 签单日期 */
      orderDate?: string;
      /** 受托金额 */
      amount?: string;
      /** 联系人id */
      contactId?: string;
      /** 联系人名称 */
      contactName?: string;
      /** 状态 */
      status?: string;
      /** 状态名称 */
      statusName?: string;
      /** 最后扣款日期 */
      lastDeductionDate?: string;
      /** 最后扣款状态 */
      lastDeductionStatus?: string;
      /** 协议号 */
      agreementId?: string;
      /** 托收协议id */
      collectionAgreementId?: string;
      /** 银行名称 */
      bankName?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户id */
      bizId?: string;
      /** 客户类型 */
      customerType?: string;
      /** 客户代码 */
      servyouNumber?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<BankCollectionResponse>;
    }
  }

  /** 查询银行托收接口 get /bank/collection */
  function getBankCollection(req: ET<GetBankCollection.Req>, options?: object): Promise<ET<GetBankCollection.Res>>;

  export module GetOrderLogistics {
    export type OrderLogisticsInfoResponse = {
      /** 快递单号 */
      logisticsNumber?: string;
      /** 快递公司 */
      logisticsCompany?: string;
      /** 联系人姓名 */
      contactName?: string;
      /** 联系人手机号 */
      contactPhone?: string;
      /** 联系人收货地址 */
      contactAddress?: string;
      /** 物流状态 */
      logisticsCode?: string;
      /** 物流状态信息 */
      logisticsMessage?: string;
      /** 产品包列表 */
      productList?: Array<OrderProductInfoBO>;
      /** 物流信息 */
      logisticsList?: Array<LogisticsContextBO>;
    };
    export type OrderProductInfoBO = {
      /** 数量 */
      count?: string;
      /** 物品编号 */
      number?: string;
      /** 物品名称 */
      name?: string;
    };
    export type LogisticsContextBO = {
      /** 查询结果 */
      context?: string;
      /** 时间 */
      time?: string;
    };

    export interface Req {
      orderId: string;
    }
    export type Res = Array<OrderLogisticsInfoResponse>;
  }

  /** get /order/logistics */
  function getOrderLogistics(req: ET<GetOrderLogistics.Req>, options?: object): Promise<ET<GetOrderLogistics.Res>>;

  export module PostSendInvoiceModify {
    export interface Req {
      /** 订单id */
      orderId?: string;
      /** 客户id */
      bizId?: string;
      /** 客户类型，0：单位客户，1：代理商或中介机构，2：个人代理 */
      customerType?: string;
      /** 手机号 */
      mobile?: string;
      /** trueId */
      trueId?: string;
    }
    export type Res = boolean;
  }

  /** 发送换票短信 post /sms/send/invoiceModify */
  function postSendInvoiceModify(req: ET<PostSendInvoiceModify.Req>, options?: object): Promise<ET<PostSendInvoiceModify.Res>>;

  export module GetRecordDetail {
    export type ConsultUserBO = {
      /** 企业税号 */
      CompanyTaxCode?: string;
      /** 企业名称 */
      companyName?: string;
      /** 个人手机号 */
      personCode?: string;
      /** 个人名称 */
      personName?: string;
      /** 机构代码 */
      agencyCode?: string;
      /** 机构名称 */
      agencyName?: string;
    };
    export type ConsultCirculationBO = {
      /** 文本信息 */
      text?: string;
      /** 图片列表 */
      imgList?: Array<string>;
      /** 创建人名称 */
      creatorName?: string;
      /** 分子公司名称 */
      branchName?: string;
    };

    export interface Req {
      msgId: string;
    }
    export interface Res {
      /** 对话id */
      msgId?: string;
      /** 咨询用户信息 */
      consultUser?: ConsultUserBO;
      /** 坐席名称 */
      agentName?: string;
      /** 坐席工号 */
      workId?: string;
      /** 坐席组名称 */
      groupName?: string;
      /** 咨询时间 */
      consultTime?: string;
      /** 满意度评价 */
      feedbackService?: string;
      /** 满意度评价内容 */
      feedbackComment?: string;
      /** 对话主题 */
      topic?: string;
      /** 对话评估 */
      comment?: string;
      /** 流转信息 */
      circulation?: ConsultCirculationBO;
    }
  }

  /** 查询在线咨询记录列表 get /consult/online/record/detail */
  function getRecordDetail(req: ET<GetRecordDetail.Req>, options?: object): Promise<ET<GetRecordDetail.Res>>;

  export module GetActionList {
    export type OperateActionResponse = {
      /** 运营动作code */
      actionCode?: string;
      /** 运营动作名称 */
      actionName?: string;
      /** 运营动作的事项 */
      matterList?: Array<OperateActionMatterResponse>;
    };
    export type OperateActionMatterResponse = {
      /** 事项名称 */
      name?: string;
      /** 事项code */
      code?: string;
    };

    export interface Req {
      /** 客户bizId, 客户类型为企业时必填 */
      bizId: string;
      /** 必填，渠道代码 */
      channelCode: string;
      /** 分子公司代码 */
      branchCode?: string;
      /** 必填，咨询方式：在线-ONLINE，来电-INCALL */
      consultWay: string;
      /** 当前坐席的技能组id */
      groupId?: number;
      /** 机构Id, 客户类型为机构时必填 */
      agentId: string;
      /** 个人手机号, 客户类型为个人时必填 */
      mobile: string;
      /** 必填 运营动作类型:0-企业, 1-机构, 4-个人用户 */
      customerType: string;
    }
    export type Res = Array<OperateActionResponse>;
  }

  /** 查询当前客户运营动作列表接口 get /operate/action/list */
  function getActionList(req: ET<GetActionList.Req>, options?: object): Promise<ET<GetActionList.Res>>;

  export module PostActionSave {
    export interface Req {
      /** 客户bizId, 客户类型为企业时必填 */
      bizId: string;
      /** 必填，运营动作code */
      actionCode: string;
      /** 跟进记录内容 */
      content?: string;
      /** 咨询受理ID，在线咨询运营动作保存为必填，来电咨询的运营动作保存为非必填 */
      messageId?: number;
      /** 必填，咨询方式：在线-ONLINE，来电-INCALL */
      consultWay: string;
      /** 必填，渠道代码 */
      channelCode: string;
      /** 分子公司代码 */
      branchCode?: string;
      /** 事项Code,运营动作有对应事项，该字段必填 */
      matterCodeList?: Array<string>;
      /** 当前坐席的技能组id */
      groupId?: number;
      /** 机构Id, 客户类型为机构时必填 */
      agentId: string;
      /** 个人手机号, 客户类型为个人时必填 */
      mobile: string;
      /** 必填 运营动作类型:0-企业, 1-机构, 4-个人用户 */
      customerType: string;
      /** 当前用户身份下运营动作集合JSON */
      actionCodeList: string;
    }
    export type Res = number;
  }

  /** 保存运营动作跟进记录接口 post /operate/action/save */
  function postActionSave(req: ET<PostActionSave.Req>, options?: object): Promise<ET<PostActionSave.Res>>;

  export module GetActionDetailList {
    export type OperateActionRecordResponse = {
      /** 记录id */
      id?: number;
      /** 跟进记录内容 */
      content?: string;
      /** 咨询方式：在线-ONLINE，来电-INCALL */
      consultWay?: string;
      /** 事项 */
      matterResponseList?: Array<OperateActionMatterResponse>;
      /** 记录人id */
      creatorId?: string;
      /** 记录人名称 */
      creatorName?: string;
      /** 记录时间 */
      modifyTime?: string;
      /** 客户id */
      bizId?: string;
      /** 机构Id */
      agentId?: string;
      /** 个人手机号 */
      mobile?: string;
      /** 用户类型:0-企业, 1-机构, 4-个人用户 */
      customerType?: string;
    };
    export type OperateActionMatterResponse = {
      /** 事项名称 */
      name?: string;
      /** 事项code */
      code?: string;
    };

    export interface Req {
      /** 客户bizId */
      bizId?: string;
      /** 运营动作code */
      actionCode?: string;
      /** 咨询方式：在线-ONLINE，来电-INCALL */
      consultWay?: string;
      /** 机构Id */
      agentId?: string;
      /** 个人手机号 */
      mobile?: string;
      /** 运营动作类型:0-企业, 1-机构, 4-个人用户 */
      customerType?: string;
    }
    export type Res = Array<OperateActionRecordResponse>;
  }

  /** 查询客户运营动作跟进记录详情列表 get /operate/action/detailList */
  function getActionDetailList(req: ET<GetActionDetailList.Req>, options?: object): Promise<ET<GetActionDetailList.Res>>;

  export module GetAgencyQuery {
    export type ConsultRightsDetailResponse = {
      /** 权益类型：1-基础财税，2-专家财税 */
      rightsType?: string;
      /** 权益名称 */
      rightsName?: string;
      /** 是否有权益，Y-有，N-没有 */
      effective?: string;
      /** 剩余权益总数，-1为权益不限次 */
      rightsTotal?: number;
      /** 最近权益到期时间 */
      firstExpireDate?: string;
      /** 最近到期时间的权益个数 */
      firstExpireRightsTotal?: number;
    };

    export interface Req {
      /** 云上id */
      agencyId?: number;
      /** 云下id */
      bizId?: string;
    }
    export interface Res {
      /** 基础财税 */
      rights?: Array<ConsultRightsDetailResponse>;
    }
  }

  /** 查询机构权益接口 get /rights/consult/agency/query */
  function getAgencyQuery(req: ET<GetAgencyQuery.Req>, options?: object): Promise<ET<GetAgencyQuery.Res>>;

  export module GetAgencySearch {
    export type AgencySearchResponse = {
      /** 机构id（32位） */
      id?: string;
      /** 机构名称 */
      fullName?: string;
      /** 代理类型 1-中介机构，2-个人代理 */
      groupType?: string;
      /** 机构代码 */
      agencyCode?: string;
      /** 分子公司代码 */
      branchCode?: string;
      /** 状态 1-正常，2-注销 */
      status?: string;
      /** 状态名称 */
      statusMc?: string;
      /** 机构id */
      agencyId?: number;
      /** 行政区划代码 */
      xzqhDm?: string;
      /** 行政区划名称 */
      xzqhMc?: string;
    };

    export interface Req {
      /** 查询内容。模糊查询-客户名称；精确匹配-代码，税号，手机号。若内容空则查询结果为空 */
      keyword?: string;
      /** 分子公司代码 */
      branchCode?: string;
    }
    export type Res = Array<AgencySearchResponse>;
  }

  /** 搜索机构（云上） get /agency/search */
  function getAgencySearch(req: ET<GetAgencySearch.Req>, options?: object): Promise<ET<GetAgencySearch.Res>>;

  export module GetAgencyAgentInfo {
    export interface Req {
      /** 机构ID */
      agencyId: number;
    }
    export interface Res {
      /** 代理id */
      id?: string;
      /** 代理名称 */
      fullName?: string;
      /** 代理类型 0-未知, 1-中介, 2-个代 */
      groupType?: string;
      /** 社会信用代码 */
      socialCreditCode?: string;
      /** 税友号 */
      servyouNumber?: string;
      /** 分子公司代码 */
      responsibleBranchId?: string;
      /** 简称 */
      shortName?: string;
      /** 行政区划代码 */
      locationCode?: string;
      /** 行政区划名称 */
      locationName?: string;
      /** 行政区划完整的地址 */
      locationAddress?: string;
      /** 32位机构ID -云上 */
      agentId?: string;
    }
  }

  /** 查询机构详情--客户中心 get /agency/agentInfo */
  function getAgencyAgentInfo(req: ET<GetAgencyAgentInfo.Req>, options?: object): Promise<ET<GetAgencyAgentInfo.Res>>;

  export module GetAgencyTagList {
    export interface Req {
      /** 32位机构ID */
      agentId?: string;
    }
    export type Res = Array<string>;
  }

  /** 查询机构标签列表 get /agency/tag/list */
  function getAgencyTagList(req: ET<GetAgencyTagList.Req>, options?: object): Promise<ET<GetAgencyTagList.Res>>;

  export module PostCommonFileUpload {
    export interface Req {
      /** 文件 */
      file: any;
      /** 文件类型，邮件附件-temp */
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

  /** 上传文件 post /common/file/upload */
  function postCommonFileUpload(req: ET<PostCommonFileUpload.Req>, options?: object): Promise<ET<PostCommonFileUpload.Res>>;

  export module PostServiceAccept {
    export interface Req {
      /** 专项服务记录id */
      serviceRecordId: number;
    }
    export type Res = boolean;
  }

  /** 专项受理 post /special/service/accept */
  function postServiceAccept(req: ET<PostServiceAccept.Req>, options?: object): Promise<ET<PostServiceAccept.Res>>;

  export module GetServiceList {
    export type SpecialServiceRecordListResponse = {
      /** id */
      id?: number;
      /** 客户id */
      customerId?: string;
      /** 客户名称 */
      customerName?: string;
      /** 专项名称 */
      name?: string;
      /** 专项服务类型 */
      type?: string;
      /** 专项服务类型名称 */
      typeName?: string;
      /** 当前所处流程名称 */
      processName?: string;
      /** 状态。0-待认领；1-接诊中；2-已完成；3-已结束 */
      status?: string;
      /** 状态名称 */
      statusName?: string;
      /** 申请人姓名 */
      applicantName?: string;
      /** 接诊人名称 */
      acceptorName?: string;
      /** 接诊人id */
      acceptorId?: string;
      /** 更新人 */
      modifierName?: string;
      /** 创建时间 */
      createDate?: string;
      /** 更新时间 */
      modifyDate?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户名称 */
      customerName?: string;
      /** 状态。0-待认领；1-接诊中；2-已完成；3-已结束 */
      status?: string;
      /** 专项名称 */
      specialServiceName?: string;
      /** 专项类型 */
      specialServiceType?: string;
      /** 查询的开始创建时间 */
      createStartDate?: string;
      /** 查询的结束创建时间 */
      createEndDate?: string;
      /** 接诊人id */
      acceptorId?: string;
      /** 企业id */
      customerId?: number;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SpecialServiceRecordListResponse>;
    }
  }

  /** 专项服务记录列表 get /special/service/list */
  function getServiceList(req: ET<GetServiceList.Req>, options?: object): Promise<ET<GetServiceList.Res>>;

  export module PostServiceSendMessage {
    export interface Req {
      /** 消息类型：1-提醒消息 */
      type: string;
      /** 标题 */
      title: string;
      /** 消息内容 */
      content: string;
      /** 专项服务id */
      serviceRecordId: number;
      /** 专项服务流程id */
      processRecordId: number;
    }
    export type Res = boolean;
  }

  /** 发送专项服务消息 post /special/service/sendMessage */
  function postServiceSendMessage(req: ET<PostServiceSendMessage.Req>, options?: object): Promise<ET<PostServiceSendMessage.Res>>;

  export module PostServiceClose {
    export interface Req {
      /** 专项服务id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 关闭专项服务记录 post /special/service/close */
  function postServiceClose(req: ET<PostServiceClose.Req>, options?: object): Promise<ET<PostServiceClose.Res>>;

  export module PostProcessFinish {
    export interface Req {
      /** 记录id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 结束流程 post /special/service/process/finish */
  function postProcessFinish(req: ET<PostProcessFinish.Req>, options?: object): Promise<ET<PostProcessFinish.Res>>;

  export module GetConsultList {
    export type SpecialServiceConsultResponse = {
      /** 对话id */
      msgId?: string;
      /** 坐席名称 */
      agentName?: string;
      /** 坐席工号 */
      workId?: string;
      /** 坐席组名称 */
      groupName?: string;
      /** 流程名称 */
      processName?: string;
      /** 咨询时间 */
      consultTime?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 专项服务记录id */
      specialServiceRecordId: number;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SpecialServiceConsultResponse>;
    }
  }

  /** 查询专项服务的咨询记录 get /special/service/consult/list */
  function getConsultList(req: ET<GetConsultList.Req>, options?: object): Promise<ET<GetConsultList.Res>>;

  export module PostCommunicationSave {
    export interface Req {
      /** 流程记录id */
      processRecordId: number;
      /** 沟通方式。必填。01-在线，02-电话，03-微信，04-QQ，98-其他 */
      way: string;
      /** 沟通时间。必填。yyyy-MM-dd HH:mm:ss */
      createTime: string;
      /** 沟通内容。必填。不超过1000 */
      content: string;
    }
    export type Res = number;
  }

  /** 保存沟通记录 post /special/service/communication/save */
  function postCommunicationSave(req: ET<PostCommunicationSave.Req>, options?: object): Promise<ET<PostCommunicationSave.Res>>;

  export module PostServiceUploadFile {
    export type MultipartFile = any;
    export type SpecialServiceUploadFileResponse = {
      /** id */
      id?: number;
      /** 文件路径 */
      filePath?: string;
      /** 文件名称 */
      name?: string;
      /** 文件大小 */
      fileSize?: number;
    };

    export interface Req {
      /** 上传的附件  不要改这个变量名 */
      files: Array<MultipartFile>;
      /** 附件的业务类型，专项资料-10，专项详情图片-11，协助上传-20，报告上传-21，消息附件-22 */
      type: string;
      /** 流程记录id */
      processRecordId: number;
    }
    export interface Res {
      /** 事项id */
      matterId?: number;
      /** 上传人 */
      uploadUser?: string;
      /** 上传时间 */
      uploadDate?: string;
      /** 文件信息 */
      fileList?: Array<SpecialServiceUploadFileResponse>;
    }
  }

  /** 附件上传，包含了协助上传，报告上传，消息附件上传 post /special/service/uploadFile */
  function postServiceUploadFile(req: ET<PostServiceUploadFile.Req>, options?: object): Promise<ET<PostServiceUploadFile.Res>>;

  export module GetCustomerCenterQueryCompanyInfo {
    export interface Req {
      /** 客户id */
      customerId: number;
    }
    export interface Res {
      /** 企业id */
      id?: number;
      /** 企业名称 */
      name?: string;
      /** 企业简称 */
      shortName?: string;
      /** 税号 */
      taxNo?: string;
      /** 增值税纳税人类型（1:一般纳税人、2:小规模纳税人等，0:其它，n:未设置） */
      taxType?: string;
      /** 增值税纳税人类型（1:一般纳税人、2:小规模纳税人等，0:其它，n:未设置） */
      taxTypeName?: string;
      /** 登记注册类型名称，例如非国有控股非上上公司 */
      registrationType?: string;
      /** 登记注册类型名称，例如非国有控股非上上公司 */
      registrationTypeName?: string;
      /** 税务登记日期（生产经营期限起） */
      taxRegistrationDate?: string;
      /** 注册地址 */
      registerAddress?: string;
      /** 企业创建时间 */
      createDate?: string;
      /** 行业名称 */
      industryName?: string;
      /** 行业代码 */
      industryCode?: string;
      /** 经营范围 */
      business?: string;
      /** 手机号码 */
      mobile?: string;
    }
  }

  /** 根据企业id查询企业信息 get /customerCenter/queryCompanyInfo */
  function getCustomerCenterQueryCompanyInfo(req: ET<GetCustomerCenterQueryCompanyInfo.Req>, options?: object): Promise<ET<GetCustomerCenterQueryCompanyInfo.Res>>;

  export module PostServiceDeleteAttachment {
    export interface Req {
      /** 事项id */
      matterId: number;
      /** 附件id */
      attachmentId: number;
    }
    export type Res = boolean;
  }

  /** 事项中的附件删除 post /special/service/deleteAttachment */
  function postServiceDeleteAttachment(req: ET<PostServiceDeleteAttachment.Req>, options?: object): Promise<ET<PostServiceDeleteAttachment.Res>>;

  export module PostServiceCalculateRealTaxBurdenRate {
    export type RealTaxBurdenRateCalculateFactorRequest = {
      /** 调整前金额 */
      adjustBeforeAmount?: string;
      /** 季节性因素排查额 */
      seasonFactorExcludeAmount?: string;
      /** 简易计税因素排除 */
      sampleCalculateTaxExcludeAmount?: string;
      /** 纳税检查补税排除 */
      payTaxInspectExcludeAmount?: string;
      /** 应纳税额减征因素排除，只分子使用 */
      payTaxReduceExcludeAmount?: string;
      /** 免税因素排除 只分母使用 */
      freeTaxFactorExcludeAmount?: string;
      /** 6%税率业务排除 */
      sixPercentTaxRateExcludeAmount?: string;
    };
    export type RealTaxBurdenRateCalculateFactorResponse = {
      /** 调整前金额 */
      adjustBeforeAmount?: string;
      /** 季节性因素排查额 */
      seasonFactorExcludeAmount?: string;
      /** 简易计税因素排除 */
      sampleCalculateTaxExcludeAmount?: string;
      /** 纳税检查补税排除 */
      payTaxInspectExcludeAmount?: string;
      /** 应纳税额减征因素排除，只影响分子 */
      payTaxReduceExcludeAmount?: string;
      /** 6%税率业务排除 */
      sixPercentTaxRateExcludeAmount?: string;
      /** 免税因素排除，只影响分母 */
      freeTaxFactorExcludeAmount?: string;
      /** 调整后金额 */
      adjustAfterAmount?: string;
    };

    export interface Req {
      /** 企业id */
      customerId: number;
      specialServiceRecordId: number;
      /** 起始属期 */
      startPeriod: string;
      /** 截止属期 */
      endPeriod: string;
      /** 分子 */
      numerator?: RealTaxBurdenRateCalculateFactorRequest;
      /** 分母 */
      denominator?: RealTaxBurdenRateCalculateFactorRequest;
    }
    export interface Res {
      /** 本年累计税负率 */
      taxBurdenTotalRate?: string;
      /** 真实还原税负率 */
      realTaxBurdenTotalRate?: string;
      /** 调整前相差度 */
      adjustBeforeDifferValue?: string;
      /** 调整后相差幅度 */
      adjustAfterDifferValue?: string;
      /** 分子 */
      numerator?: RealTaxBurdenRateCalculateFactorResponse;
      /** 分母 */
      denominator?: RealTaxBurdenRateCalculateFactorResponse;
    }
  }

  /** 真实税负率计算 post /special/service/calculateRealTaxBurdenRate */
  function postServiceCalculateRealTaxBurdenRate(req: ET<PostServiceCalculateRealTaxBurdenRate.Req>, options?: object): Promise<ET<PostServiceCalculateRealTaxBurdenRate.Res>>;

  export module GetTableDetail {
    export type SpecialServiceTableDetailResponse = {
      /** 名称 */
      name?: string;
      /** 值 */
      value?: string;
    };

    export interface Req {
      /** 企业id */
      customerId: number;
      /** 报表code */
      tableCode: string;
      /** 所属期，格式：yyyy-MM */
      periodDate: string;
    }
    export type Res = Array<SpecialServiceTableDetailResponse>;
  }

  /** 报表详情 get /special/service/table/detail */
  function getTableDetail(req: ET<GetTableDetail.Req>, options?: object): Promise<ET<GetTableDetail.Res>>;

  export module GetServiceDetail {
    export type SpecialServiceUploadFileResponse = {
      /** 流程id */
      id?: number;
      /** 文件路径 */
      filePath?: string;
      /** 流程名称 */
      name?: string;
      /** 文件大小 */
      fileSize?: number;
    };
    export type SpecialServiceProcessRecordResponse = {
      /** 流程id */
      id?: number;
      /** 流程状态 */
      status?: string;
      /** 流程名称 */
      name?: string;
      /** 流程顺序 */
      indexNum?: number;
      /** 流程定义id */
      processDefineId?: number;
      /** 流程事项，0-未开始；1-进行中；2-已结束 */
      matterResponseList?: Array<SpecialServiceMatterResponse>;
    };
    export type SpecialServiceMatterResponse = {
      /** 名称 */
      name?: string;
      /** 事项类型 */
      type?: string;
      /** 内容 */
      value?: string;
      /** 参数 */
      params?: string;
    };

    export interface Req {
      /** 专项服务记录id */
      id: number;
    }
    export interface Res {
      /** 专项服务名称 */
      name?: string;
      /** 渠道 */
      channel?: string;
      /** 申请人 */
      applicantName?: string;
      /** 申请人手机号 */
      mobile?: string;
      /** 客户id */
      customerId?: string;
      /** 客户名称 */
      customerName?: string;
      /** 客户类型 */
      customerType?: string;
      /** 状态，0-待认领；1-接诊中；2-已完成；3-已结束 */
      status?: string;
      /** 提交时间 */
      createDate?: string;
      /** 所属期结束时间 */
      periodStartDate?: string;
      /** 所属期开始时间 */
      periodEndDate?: string;
      /** 专项资料 */
      specialServiceData?: Array<SpecialServiceUploadFileResponse>;
      /** 流程 */
      processList?: Array<SpecialServiceProcessRecordResponse>;
    }
  }

  /** 专项服务记录详情 get /special/service/detail */
  function getServiceDetail(req: ET<GetServiceDetail.Req>, options?: object): Promise<ET<GetServiceDetail.Res>>;

  export module GetTreeMonth {
    export type SpecialServiceTableNodeResponse = {
      /** 节点code */
      code?: string;
      /** 节点名称 */
      name?: string;
      /** 子节点 */
      childrenList?: Array<SpecialServiceTableNodeResponse>;
    };

    export interface Req {
      /** 企业id */
      customerId: number;
      /** 报表名称 */
      tableName?: string;
      /** 报表类型，详见special_service_collect_table字典类型 */
      tableType?: string;
      /** 所属期月份，格式：yyyy-MM */
      periodDate: string;
      /** 更正申报，true-有更正申报，false-未更正申报,空表示全部 */
      updateFlag?: boolean;
    }
    export type Res = Array<SpecialServiceTableNodeResponse>;
  }

  /** 报表目录-月份列表 get /special/service/tree/month */
  function getTreeMonth(req: ET<GetTreeMonth.Req>, options?: object): Promise<ET<GetTreeMonth.Res>>;

  export module GetTreeTable {
    export type SpecialServiceTableNodeResponse = {
      /** 节点code */
      code?: string;
      /** 节点名称 */
      name?: string;
      /** 子节点 */
      childrenList?: Array<SpecialServiceTableNodeResponse>;
    };

    export interface Req {
      /** 企业id */
      customerId: number;
      /** 报表名称 */
      tableName?: string;
      /** 报表类型，详见special_service_collect_table字典类型 */
      tableType?: string;
      /** 所属期月份，格式：yyyy-MM */
      periodDate: string;
      /** 更正申报，true-有更正申报，false-未更正申报,空表示全部 */
      updateFlag?: boolean;
    }
    export type Res = Array<SpecialServiceTableNodeResponse>;
  }

  /** 报表目录-报表列表 get /special/service/tree/table */
  function getTreeTable(req: ET<GetTreeTable.Req>, options?: object): Promise<ET<GetTreeTable.Res>>;

  export module GetServiceDetailByLogId {
    export interface Req {
      /** 专项服务流程记录id */
      logId: number;
    }
    export interface Res {
      /** 专项服务记录id */
      recordId?: string;
      /** 专项服务名称 */
      name?: string;
      /** 当前流程名称 */
      processDefineName?: string;
      /** 客户id */
      customerId?: string;
    }
  }

  /** 根据logId查询专项咨询记录 get /special/service/detailByLogId */
  function getServiceDetailByLogId(req: ET<GetServiceDetailByLogId.Req>, options?: object): Promise<ET<GetServiceDetailByLogId.Res>>;

  export module GetServiceDetailByProcessRecordId {
    export interface Req {
      /** 专项服务流程记录id */
      processRecordId: number;
    }
    export interface Res {
      /** 专项服务记录id */
      recordId?: string;
      /** 专项服务名称 */
      name?: string;
      /** 当前流程名称 */
      processDefineName?: string;
      /** 客户id */
      customerId?: string;
    }
  }

  /** 根据logId查询专项咨询记录 get /special/service/detailByProcessRecordId */
  function getServiceDetailByProcessRecordId(req: ET<GetServiceDetailByProcessRecordId.Req>, options?: object): Promise<ET<GetServiceDetailByProcessRecordId.Res>>;

  export module GetServiceDetailByRecordId {
    export interface Req {
      /** 记录id */
      recordId: string;
    }
    export interface Res {
      /** 专项服务记录id */
      recordId?: string;
      /** 专项服务名称 */
      name?: string;
      /** 当前流程名称 */
      processDefineName?: string;
      /** 客户id */
      customerId?: string;
    }
  }

  /** 根据记录id查询专项服务记录-一户式页面使用 get /special/service/detailByRecordId */
  function getServiceDetailByRecordId(req: ET<GetServiceDetailByRecordId.Req>, options?: object): Promise<ET<GetServiceDetailByRecordId.Res>>;

  export module GetServiceDetailForEp {
    export interface Req {
      /** 接入类型。01：新架构。 默认新架构 */
      accessType?: string;
      /** 咨询类型。01：办税咨询，02:财税实务咨询，03：财税专家咨询，04:专项服务咨询。 程序逻辑固定处理成04。 */
      consultType?: string;
      /** 接入id。 */
      accessId?: string;
      /** 子接入id。 */
      subAccessId?: string;
    }
    export interface Res {
      /** 专项服务记录id */
      recordId?: number;
      /** 专项服务名称 */
      name?: string;
      /** 当前流程名称 */
      processDefineName?: string;
      /** 客户id */
      customerId?: string;
    }
  }

  /** 查询专项服务记录-一户式页面 get /special/service/detailForEp */
  function getServiceDetailForEp(req: ET<GetServiceDetailForEp.Req>, options?: object): Promise<ET<GetServiceDetailForEp.Res>>;

  export module PostServiceRealTaxBurdenRate {
    export type RealTaxBurdenRateCalculateFactorResponse = {
      /** 调整前金额 */
      adjustBeforeAmount?: string;
      /** 季节性因素排查额 */
      seasonFactorExcludeAmount?: string;
      /** 简易计税因素排除 */
      sampleCalculateTaxExcludeAmount?: string;
      /** 纳税检查补税排除 */
      payTaxInspectExcludeAmount?: string;
      /** 应纳税额减征因素排除，只影响分子 */
      payTaxReduceExcludeAmount?: string;
      /** 6%税率业务排除 */
      sixPercentTaxRateExcludeAmount?: string;
      /** 免税因素排除，只影响分母 */
      freeTaxFactorExcludeAmount?: string;
      /** 调整后金额 */
      adjustAfterAmount?: string;
    };

    export interface Req {
      /** 企业id */
      customerId: number;
      specialServiceRecordId: number;
      /** 起始属期，格式：yyyy-MM */
      startPeriod: string;
      /** 截止属期，格式：yyyy-MM */
      endPeriod: string;
    }
    export interface Res {
      /** 分子 */
      numerator?: RealTaxBurdenRateCalculateFactorResponse;
      /** 分母 */
      denominator?: RealTaxBurdenRateCalculateFactorResponse;
    }
  }

  /** 真实税负率计算因子查询 post /special/service/realTaxBurdenRate */
  function postServiceRealTaxBurdenRate(req: ET<PostServiceRealTaxBurdenRate.Req>, options?: object): Promise<ET<PostServiceRealTaxBurdenRate.Res>>;

  export module GetCustomerDetail {
    export type ConsultRightsDetailResponse = {
      /** 权益类型：1-基础财税，2-专家财税 */
      rightsType?: string;
      /** 权益名称 */
      rightsName?: string;
      /** 是否有权益，Y-有，N-没有 */
      effective?: string;
      /** 剩余权益总数，-1为权益不限次 */
      rightsTotal?: number;
      /** 最近权益到期时间 */
      firstExpireDate?: string;
      /** 最近到期时间的权益个数 */
      firstExpireRightsTotal?: number;
    };

    export interface Req {
      bizId: string;
    }
    export interface Res {
      /** 基础财税 */
      rights?: Array<ConsultRightsDetailResponse>;
    }
  }

  /** 查询咨询企业权益详情接口 get /rights/consult/customer/detail */
  function getCustomerDetail(req: ET<GetCustomerDetail.Req>, options?: object): Promise<ET<GetCustomerDetail.Res>>;

  export module GetTodoTaskUploadTodoReportData {
    export interface Req {
      /** 企业或机构的bizId */
      bizId?: string;
      /** 手机号码 */
      mobile?: string;
      /** 客户类型  0：单位客户，1：代理。4：个人 */
      customerType: string;
      /** 服务id，在线传msg_id。来电不传 */
      serviceId?: string;
    }
    export type Res = string;
  }

  /** 上传创建待办所需要数据 get /todoTask/uploadTodoReportData */
  function getTodoTaskUploadTodoReportData(req: ET<GetTodoTaskUploadTodoReportData.Req>, options?: object): Promise<ET<GetTodoTaskUploadTodoReportData.Res>>;

  export module GetTodoTaskConsultTodoQuery {
    export type ConsultTodoQueryRes = {
      /** 待办来源。在线咨询:consult_online，来电咨询:consult_incall */
      source?: string;
      /** 待办来源名称 */
      sourceName?: string;
      /** 待办类型 */
      todoType?: string;
      /** 待办名称 */
      todoName?: string;
      /** 企业/机构名称或联系人信息 */
      customerName?: string;
      /** 客户手机号码 */
      customerMobile?: string;
      /** 要求完成时间。格式：yyyy-MM-dd HH:mm */
      requiredFinishTime?: string;
      /** 状态 */
      status?: string;
      /** 备注 */
      remark?: string;
      /** 补充描述 */
      additionalDescription?: string;
      /** 创建时间。格式：yyyy-MM-dd HH:mm */
      createDate?: string;
      /** 创建人id */
      creatorId?: string;
      /** 创建人名称 */
      creatorName?: string;
      /** 处理组id */
      handlerGroupIds?: Array<number>;
      /** 处理组名称 */
      handlerGroupNames?: Array<string>;
      /** 处理人id */
      handlerId?: string;
      /** 处理人名称 */
      handlerName?: string;
      /** 实际完成时间.格式：yyyy-MM-dd HH:mm */
      finishCloseTime?: string;
      /** 优先级 */
      priorityLevel?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 待办来源。在线:consult_online，来电:consult_incall。传空查询全部 */
      sourceList?: Array<string>;
      /** 企业idList */
      companyIdList?: Array<string>;
      /** 代理idList */
      agentIdList?: Array<string>;
      /** 手机号List */
      mobileList?: Array<string>;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ConsultTodoQueryRes>;
    }
  }

  /** 查询待办记录 get /todoTask/consultTodoQuery */
  function getTodoTaskConsultTodoQuery(req: ET<GetTodoTaskConsultTodoQuery.Req>, options?: object): Promise<ET<GetTodoTaskConsultTodoQuery.Res>>;

  export module GetRelList {
    export type CompanyContactResponse = {
      /** 用户id */
      personId?: string;
      /** 代理id */
      agentId?: string;
      /** 联系人 */
      contactUser?: string;
      /** 联系人手机号 */
      mobileList?: Array<string>;
      /** 场景 */
      sceneList?: Array<string>;
      /** 岗责 */
      roleList?: Array<string>;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户云下id */
      bizId: string;
      /** 咨询人手机号 */
      mobile?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<CompanyContactResponse>;
    }
  }

  /** 人企关系列表 get /company/rel/list */
  function getRelList(req: ET<GetRelList.Req>, options?: object): Promise<ET<GetRelList.Res>>;

  export module GetQuestionnaireCompanyList {
    export type QuestionnaireListResponse = {
      /** 问卷id */
      id?: string;
      /** 问卷名称 */
      name?: string;
    };

    export interface Req {
      /** 问卷类型：1-用户填，2-员工填，问卷星这块还未定义，后面会调整的和问卷星一致 */
      type?: string;
    }
    export type Res = Array<QuestionnaireListResponse>;
  }

  /** 查询企业的问卷列表 get /questionnaire/company/list */
  function getQuestionnaireCompanyList(req: ET<GetQuestionnaireCompanyList.Req>, options?: object): Promise<ET<GetQuestionnaireCompanyList.Res>>;

  export module GetAgentPermissionSyntheticalPage_1668155970 {
    export type AgentPermissionResponse = {
      /** 权限code */
      code?: string;
      /** 权限名称 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<AgentPermissionResponse>;
  }

  /** 获取坐席一户式功页面功能权限 get /agentPermission/syntheticalPage */
  function getAgentPermissionSyntheticalPage_1668155970(req?: ET<GetAgentPermissionSyntheticalPage_1668155970.Req>, options?: object): Promise<ET<GetAgentPermissionSyntheticalPage_1668155970.Res>>;

  export module PostQuestionnaireGetUrl {
    export interface Req {
      /** 问卷id */
      id: number;
      /** 要传入问卷的参数,json格式 */
      dataJson: string;
    }
    export type Res = string;
  }

  /** 获取问卷链接 post /questionnaire/getUrl */
  function postQuestionnaireGetUrl(req: ET<PostQuestionnaireGetUrl.Req>, options?: object): Promise<ET<PostQuestionnaireGetUrl.Res>>;

  export module PostAiAnalyze {
    export type Sort = {
      fieldNameList?: Array<string>;
      desc?: boolean;
    };
    export type OnlineRecordAiAnalyzeRepVO = {
      /** 消息id */
      msgId?: string;
      /** 咨询开始时间 */
      startConsultDate?: string;
      /** 标准问 */
      standardQuestion?: string;
      /** 用户问 */
      userQuestion?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sort?: Sort;
      /** 手机号 */
      mobile?: string;
      /** 客户id */
      customerId?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<OnlineRecordAiAnalyzeRepVO>;
    }
  }

  /** 在线咨询打标 get /consult/oline/record/ai/analyze */
  function postAiAnalyze(req: ET<PostAiAnalyze.Req>, options?: object): Promise<ET<PostAiAnalyze.Res>>;

  export module GetMaterialGetMaterial {
    export type MaterialGetResVO = {
      /** 发送方式 0表示到输入框，1表示直接发送 */
      sendDirect?: number;
      /** 追加方式 0表示清除输入框，1表示追加到后边 */
      clearInput?: number;
      /** 加工后的素材内容列表 */
      materialList?: Array<string>;
    };

    export interface Req {
      /** 素材类型 01-文本;02-图片;03-文件;04-卡片;05-混合类型(图片文本混合);06-超链接 */
      materialType?: string;
      /** 日志id */
      logId?: string;
      /** msg id */
      msgId?: string;
      /** 坐席trueId */
      agentTrueId?: string;
      /** 素材列表1. */
      materialList?: Array<string>;
    }
    export interface Res {
      success?: boolean;
      message?: string;
      messageCode?: string;
      /** 请求id，用于调用链跟踪 */
      requestId?: string;
      data?: MaterialGetResVO;
    }
  }

  /** 获取素材库内容 post /material/getMaterial */
  function getMaterialGetMaterial(req: ET<GetMaterialGetMaterial.Req>, options?: object): Promise<ET<GetMaterialGetMaterial.Res>>;

  export module GetSmsQueryTemplateList {
    export type Req = any;
    export type Res = string;
  }

  /** 查询短信模板列表接口 get /sms/queryTemplateList */
  function getSmsQueryTemplateList(req?: ET<GetSmsQueryTemplateList.Req>, options?: object): Promise<ET<GetSmsQueryTemplateList.Res>>;

  export module GetSmsGetTemplateContent {
    export interface Req {
      /** 模板id */
      templateId: string;
      /** 系统代码appId */
      appId: string;
    }
    export type Res = string;
  }

  /** 根据短信模板id查询模板内容 get /sms/getTemplateContent */
  function getSmsGetTemplateContent(req: ET<GetSmsGetTemplateContent.Req>, options?: object): Promise<ET<GetSmsGetTemplateContent.Res>>;

  export module GetOrderNewList {
    export type NewOrderInfoResVO = {
      /** 订单id */
      orderItemId?: string;
      /** 应收金额 */
      receivableAmount?: string;
      /** 收款状态 */
      paymentStatus?: string;
      /** 订单录入日期（下单日期） */
      orderCreateTime?: string;
      /** 支付时间（收款日期） */
      paidTime?: string;
      /** 产品包列表 */
      productList?: Array<NewOrderProductResVO>;
    };
    export type NewOrderProductResVO = {
      /** 订单产品包名称 */
      productName?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      sortRuleList?: Array<string>;
      /** 客户业务id */
      bizId: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<NewOrderInfoResVO>;
    }
  }

  /** 新查询用户订单列表 get /order/newList */
  function getOrderNewList(req: ET<GetOrderNewList.Req>, options?: object): Promise<ET<GetOrderNewList.Res>>;

  export module GetCommonTest {
    export type PermissionEnumResponse = {
      /** 权限code */
      code?: string;
      /** 权限名称 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<PermissionEnumResponse>;
  }

  /** get /common/test */
  function getCommonTest(req?: ET<GetCommonTest.Req>, options?: object): Promise<ET<GetCommonTest.Res>>;

  export module PostWorkOrderCreate {
    export type OrderQuestionReqVO = {
      /** 问题类型 */
      questionType?: string;
      /** 问题选项 */
      questionItemCodeList?: Array<string>;
    };

    export interface Req {
      /** 标题 */
      title: string;
      /** 所属产品池 */
      product: string;
      /** 模块 */
      module: string;
      /** 工单处理人userId */
      handleUserId: string;
      /** 工单提报人userId */
      commitUserId: string;
      /** 问题列表 */
      questionList?: Array<OrderQuestionReqVO>;
      /** 工单描述 */
      orderDesc: string;
    }
    export type Res = number;
  }

  /** 创建工单 post /isd/workOrder/create */
  function postWorkOrderCreate(req: ET<PostWorkOrderCreate.Req>, options?: object): Promise<ET<PostWorkOrderCreate.Res>>;

  export module PostWorkOrderEdit {
    export type OrderQuestionReqVO = {
      /** 问题类型 */
      questionType?: string;
      /** 问题选项 */
      questionItemCodeList?: Array<string>;
    };

    export interface Req {
      /** 禅道工单id */
      zendaoOrderId?: number;
      /** 标题 */
      title: string;
      /** 所属产品池 */
      product: string;
      /** 模块 */
      module: string;
      /** 工单处理人userId */
      handleUserId: string;
      /** 工单提报人userId */
      commitUserId: string;
      /** 问题列表 */
      questionList?: Array<OrderQuestionReqVO>;
      /** 工单描述 */
      orderDesc: string;
    }
    export type Res = boolean;
  }

  /** post /isd/workOrder/edit */
  function postWorkOrderEdit(req: ET<PostWorkOrderEdit.Req>, options?: object): Promise<ET<PostWorkOrderEdit.Res>>;

  export module GetWorkOrderPageList {
    export type OrderListResVO = {
      /** 创建工单时间，格式：yyyy/MM/dd-HH:mm */
      createOrderDate?: string;
      /** 工单描述 */
      orderDesc?: string;
      /** 提报人 */
      commitUserName?: string;
      /** 处理人 */
      handleUserName?: string;
      questionLaleList?: Array<string>;
      /** 禅道工单id */
      zendaoOrderId?: number;
      /** 标题 */
      title?: string;
      /** 工单状态 */
      orderStatus?: string;
    };
    export type OrderStatusCountResVO = {
      /** 状态名称 */
      statusName?: string;
      /** 状态code */
      status?: string;
      /** 数量 */
      count?: number;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      queryCount?: boolean;
      sortRuleList?: Array<string>;
      /** 工单处理人userId */
      handleUserId?: Array<string>;
      /** 工单提报人userId */
      commitUserId?: Array<string>;
      /** 标题、正文、禅道工单id */
      keyword?: string;
      /** 所属产品池 */
      product?: string;
      /** 工单创建开始时间 */
      orderCreateStarDate?: any;
      /** 工单创建结束时间 */
      orderCreateEndDate?: any;
      /** 工单状态 */
      orderStatus?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<OrderListResVO>;
      /** 工单列表 */
      orderList?: Array<OrderListResVO>;
      /** 工单状态统计列表 */
      statusCountList?: Array<OrderStatusCountResVO>;
    }
  }

  /** get /isd/workOrder/pageList */
  function getWorkOrderPageList(req: ET<GetWorkOrderPageList.Req>, options?: object): Promise<ET<GetWorkOrderPageList.Res>>;

  export module GetPageListTeam {
    export type OrderListResVO = {
      /** 创建工单时间，格式：yyyy/MM/dd-HH:mm */
      createOrderDate?: string;
      /** 工单描述 */
      orderDesc?: string;
      /** 提报人 */
      commitUserName?: string;
      /** 处理人 */
      handleUserName?: string;
      /** 问题标签 */
      questionLaleList?: Array<string>;
      /** 禅道工单id */
      zendaoOrderId?: number;
      /** 标题 */
      title?: string;
      /** 工单状态 */
      orderStatus?: string;
    };
    export type OrderStatusCountResVO = {
      /** 状态名称 */
      statusName?: string;
      /** 状态code */
      status?: string;
      /** 数量 */
      count?: number;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      queryCount?: boolean;
      sortRuleList?: Array<string>;
      /** 工单处理人userId */
      handleUserId?: Array<string>;
      /** 工单提报人userId */
      commitUserId?: Array<string>;
      /** 标题、正文、禅道工单id */
      keyword?: string;
      /** 所属产品池 */
      product?: string;
      /** 工单创建开始时间 */
      orderCreateStarDate?: any;
      /** 工单创建结束时间 */
      orderCreateEndDate?: any;
      /** 工单状态 */
      orderStatus?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<OrderListResVO>;
      /** 工单列表 */
      orderList?: Array<OrderListResVO>;
      /** 工单状态统计列表 */
      statusCountList?: Array<OrderStatusCountResVO>;
    }
  }

  /** 工单列表（产品服务小组） get /isd/workOrder/pageList/team */
  function getPageListTeam(req: ET<GetPageListTeam.Req>, options?: object): Promise<ET<GetPageListTeam.Res>>;

  export module GetPageListManage {
    export type OrderListResVO = {
      /** 创建工单时间，格式：yyyy/MM/dd-HH:mm */
      createOrderDate?: string;
      /** 工单描述 */
      orderDesc?: string;
      /** 提报人 */
      commitUserName?: string;
      /** 处理人 */
      handleUserName?: string;
      /** 问题标签 */
      questionLaleList?: Array<string>;
      /** 禅道工单id */
      zendaoOrderId?: number;
      /** 标题 */
      title?: string;
      /** 工单状态 */
      orderStatus?: string;
    };
    export type OrderStatusCountResVO = {
      /** 状态名称 */
      statusName?: string;
      /** 状态code */
      status?: string;
      /** 数量 */
      count?: number;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      queryCount?: boolean;
      sortRuleList?: Array<string>;
      /** 工单处理人userId */
      handleUserId?: Array<string>;
      /** 工单提报人userId */
      commitUserId?: Array<string>;
      /** 标题、正文、禅道工单id */
      keyword?: string;
      /** 所属产品池 */
      product?: string;
      /** 工单创建开始时间 */
      orderCreateStarDate?: any;
      /** 工单创建结束时间 */
      orderCreateEndDate?: any;
      /** 工单状态 */
      orderStatus?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<OrderListResVO>;
      /** 工单列表 */
      orderList?: Array<OrderListResVO>;
      /** 工单状态统计列表 */
      statusCountList?: Array<OrderStatusCountResVO>;
    }
  }

  /** get /isd/workOrder/pageList/manage */
  function getPageListManage(req: ET<GetPageListManage.Req>, options?: object): Promise<ET<GetPageListManage.Res>>;

  export module GetDetailTeam {
    export type OrderQuestionResVO = {
      /** 问题类型 */
      questionType?: string;
      /** 问题选项 */
      questionItemCodeList?: Array<OrderQuestionItemResVO>;
    };
    export type Object = any;
    export type OrderQuestionItemResVO = {
      /** 问题类型 */
      questionType?: string;
      /** 名称 */
      name?: string;
      /** code */
      code?: string;
    };

    export interface Req {
      zendaoOrderId: number;
    }
    export interface Res {
      /** 禅道工单id */
      zendaoOrderId?: number;
      /** 标题 */
      title?: string;
      /** 产品 todo */
      product?: string;
      /** 模块 */
      module?: string;
      /** 工单处理人userId */
      handleUserId?: string;
      /** 工单处理人 */
      handleUserName?: string;
      /** 工单提报人userId */
      commitUserId?: string;
      /** 工单提报人 */
      commitUserName?: string;
      /** 状态code */
      status?: string;
      /** 状态名称 */
      statusName?: string;
      /** 禅道状态 */
      zendaoStatus?: string;
      /** 禅道状态名称 */
      zendaoStatusName?: string;
      /** 工单问题 */
      questionList?: Array<OrderQuestionResVO>;
      /** 工单描述 */
      orderDesc?: string;
      /** 历史记录，todo 待定 */
      handleList?: Array<Object>;
      /** 处理结果 */
      result?: string;
    }
  }

  /** 工单详情（产品服务小组） get /isd/workOrder/detail/team */
  function getDetailTeam(req: ET<GetDetailTeam.Req>, options?: object): Promise<ET<GetDetailTeam.Res>>;

  export module GetDetailMange {
    export interface Req {
      zendaoOrderId: number;
    }
    export interface Res {
      /** 禅道工单id */
      zendaoOrderId?: number;
      /** 标题 */
      title?: string;
      /** 工单处理人userId */
      handleUserId?: string;
      /** 工单处理人 */
      handleUserName?: string;
      /** 状态code */
      status?: string;
      /** 状态名称 */
      statusName?: string;
      /** 工单描述 */
      orderDesc?: string;
      /** 处理结果 */
      result?: string;
    }
  }

  /** 工单详情（客户经理） get /isd/workOrder/detail/mange */
  function getDetailMange(req: ET<GetDetailMange.Req>, options?: object): Promise<ET<GetDetailMange.Res>>;

  export module GetDetailUser {
    export interface Req {
      zendaoOrderId: number;
    }
    export interface Res {
      /** 禅道工单id */
      zendaoOrderId?: number;
      /** 标题 */
      title?: string;
      /** 工单处理人userId */
      handleUserId?: string;
      /** 工单处理人 */
      handleUserName?: string;
      /** 状态code */
      status?: string;
      /** 状态名称 */
      statusName?: string;
      /** 工单描述 */
      orderDesc?: string;
      /** 处理结果 */
      result?: string;
    }
  }

  /** 工单详情（用户，不登陆） get /isd/workOrder/detail/user */
  function getDetailUser(req: ET<GetDetailUser.Req>, options?: object): Promise<ET<GetDetailUser.Res>>;

  export module PostWorkOrderBatchCloseOrder {
    export interface Req {
      /** 禅道工单id列表 */
      zendaoOrderIdList: Array<number>;
    }
    export type Res = boolean;
  }

  /** 批量关闭工单 post /isd/workOrder/batchCloseOrder */
  function postWorkOrderBatchCloseOrder(req: ET<PostWorkOrderBatchCloseOrder.Req>, options?: object): Promise<ET<PostWorkOrderBatchCloseOrder.Res>>;

  export module PostWorkOrderHandleOrder {
    export interface Req {
      /** 禅道工单id */
      zendaoOrderId?: number;
    }
    export type Res = boolean;
  }

  /** 受理工单 post /isd/workOrder/handleOrder */
  function postWorkOrderHandleOrder(req: ET<PostWorkOrderHandleOrder.Req>, options?: object): Promise<ET<PostWorkOrderHandleOrder.Res>>;

  export module PostWorkOrderSolveOrder {
    export type OrderQuestionReqVO = {
      /** 问题类型 */
      questionType?: string;
      /** 问题选项 */
      questionItemCodeList?: Array<string>;
    };

    export interface Req {
      /** 禅道工单id */
      zendaoOrderId: number;
      /** 问题列表 */
      questionList?: Array<OrderQuestionReqVO>;
      /** 结果 */
      result: string;
    }
    export type Res = boolean;
  }

  /** 解决工单 post /isd/workOrder/solveOrder */
  function postWorkOrderSolveOrder(req: ET<PostWorkOrderSolveOrder.Req>, options?: object): Promise<ET<PostWorkOrderSolveOrder.Res>>;

  export module PostWorkOrderUpgradeStopPage {
    export interface Req {
      /** 禅道工单id */
      zendaoOrderId: number;
    }
    export type Res = boolean;
  }

  /** 升级故障 post /isd/workOrder/upgradeStopPage */
  function postWorkOrderUpgradeStopPage(req: ET<PostWorkOrderUpgradeStopPage.Req>, options?: object): Promise<ET<PostWorkOrderUpgradeStopPage.Res>>;

  export module PostWorkOrderSycStopPage {
    export interface Req {
      /** 禅道工单id */
      zendaoOrderId: number;
      /** 故障状态 */
      stopPageStatus: string;
      /** 故障标题 */
      title: string;
      /** 跟进入userId */
      handleUserId?: string;
      /** 删除原因 */
      delReason?: string;
      /** 原因详情 */
      reasonDetail?: string;
    }
    export type Res = boolean;
  }

  /** 故障同步 post /isd/workOrder/sycStopPage */
  function postWorkOrderSycStopPage(req: ET<PostWorkOrderSycStopPage.Req>, options?: object): Promise<ET<PostWorkOrderSycStopPage.Res>>;

  export module PostCommonGetJsapiSignature {
    export interface Req {
      /** 需要的签名类型company -- 企业的jsapi_ticketapplication -- 应用的jsapi_ticket */
      type?: string;
      /** 企微应用id */
      externalAppId: string;
      /** 企微主体id, 仅 isv应用需要该入参，标识授权的企业 */
      authCorpId?: string;
      /** 当前网页的URL, 不包含#及其后面部分调用JS接口页面的完整URL */
      url?: string;
    }
    export interface Res {
      /** 企微应用id */
      externalAppId?: string;
      /** 企微主体id */
      authCorpId?: string;
      /** 随机字符串 */
      nonceStr?: string;
      /** 时间戳 */
      timestamp?: number;
      /** 当前网页的URL, 不包含#及其后面部分调用JS接口页面的完整URL */
      url?: string;
      /** 签名 */
      signature?: string;
    }
  }

  /** 获取js api signature post /common/getJsapiSignature */
  function postCommonGetJsapiSignature(req: ET<PostCommonGetJsapiSignature.Req>, options?: object): Promise<ET<PostCommonGetJsapiSignature.Res>>;

  export module GetWorkOrderQuestionLabelDict {
    export type OrderQuestionResVO = {
      /** 问题类型 */
      questionType?: string;
      /** 问题选项 */
      questionItemCodeList?: Array<OrderQuestionItemResVO>;
    };
    export type OrderQuestionItemResVO = {
      /** 问题类型 */
      questionType?: string;
      /** 名称 */
      name?: string;
      /** code */
      code?: string;
    };

    export type Req = any;
    export type Res = Array<OrderQuestionResVO>;
  }

  /** 问题标签字典 get /isd/workOrder/questionLabelDict */
  function getWorkOrderQuestionLabelDict(req?: ET<GetWorkOrderQuestionLabelDict.Req>, options?: object): Promise<ET<GetWorkOrderQuestionLabelDict.Res>>;

  export module GetWorkOrderGetZentaoModule {
    export type ZentaoModuleResVO = {
      /** id */
      id?: number;
      /** 名称 */
      name?: string;
      /** 路径。如/模块1/模块2 */
      namePath?: string;
      /** 简称 */
      shortName?: string;
      /** 父节点 */
      parent?: number;
      /** 层级 */
      grade?: number;
    };

    export interface Req {
      /** 产品 */
      product: number;
      /** 父模块id */
      parent?: number;
      /** 类型,例如：BUG */
      type: string;
    }
    export type Res = Array<ZentaoModuleResVO>;
  }

  /** 获取禅道模块 get /isd/workOrder/getZentaoModule */
  function getWorkOrderGetZentaoModule(req: ET<GetWorkOrderGetZentaoModule.Req>, options?: object): Promise<ET<GetWorkOrderGetZentaoModule.Res>>;

  export module GetCommonOrderOptions {
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
    export type Res = Array<OptionResultResponse>;
  }

  /** 获取排序的枚举选项 get /common/orderOptions */
  function getCommonOrderOptions(req: ET<GetCommonOrderOptions.Req>, options?: object): Promise<ET<GetCommonOrderOptions.Res>>;

  export module GetConfigGetLatestSpecialServiceConfig {
    export type ErrorContext = {
      errorCode?: string;
      errorMessage?: string;
      detailMessage?: string;
    };
    export type SpecialServiceConfigResponse = {
      /** 自增主键 */
      id?: number;
      /** 名称 */
      name?: string;
      /** 专项类型 */
      type?: string;
      /** 简介 */
      description?: string;
      /** 详情描述 */
      remarks?: string;
      /** 是否确认所属期;0 否; 1 是 */
      dateLimit?: string;
      /** 采集表单:01-增值税主副表；02-财务报表年报；03-财务报表季报；04-企业所得税年报；05-企业所得税季报 */
      collectTableList?: Array<string>;
      /** 自动采集：Y-是；N-否 */
      autoCollect?: string;
      /** 采集范围:0 不限制; -1 去年; -2 前年; -3 大前年 */
      collectRange?: string;
      /** 计算模型：01-真实税负率计算 */
      calculateModelList?: Array<string>;
      /** 关键指标：01-当年同行税负率；02-上年同行税负率；03-原税负率 */
      indicatorList?: Array<string>;
      /** 授权的构件 */
      serviceRightList?: Array<ServiceRightResponse>;
    };
    export type ServiceRightResponse = {
      /** 授权的构件code */
      serviceCode?: string;
      /** 授权的构件类型：00-服务构件; 01-saas构件 */
      serviceType?: string;
    };

    export interface Req {
      /** 渠道||69:合规管家;70:亿企财赢;71:专家工作台 */
      channel: string;
      /** 专项类型||01:增值税税负率评估;02:售前支持;03:方案交付;对应字典类型：special_service_type */
      type: string;
    }
    export interface Res {
      success?: boolean;
      errorContext?: ErrorContext;
      entity?: SpecialServiceConfigResponse;
    }
  }

  /** 获取最新专项信息 get /special/service/config/getLatestSpecialServiceConfig */
  function getConfigGetLatestSpecialServiceConfig(req: ET<GetConfigGetLatestSpecialServiceConfig.Req>, options?: object): Promise<ET<GetConfigGetLatestSpecialServiceConfig.Res>>;

  export module PostServiceUploadWealthAndAccountAttachment {
    export type MultipartFile = any;
    export type SpecialServiceUploadFileResponse = {
      /** id */
      id?: number;
      /** 文件路径 */
      filePath?: string;
      /** 文件名称 */
      name?: string;
      /** 文件大小 */
      fileSize?: number;
    };

    export interface Req {
      /** 上传的附件不要改这个变量名 */
      files: Array<MultipartFile>;
      /** 附件的业务类型 */
      type: string;
      /** 流程记录id */
      processRecordId: number;
    }
    export interface Res {
      /** 事项id */
      matterId?: number;
      /** 上传人 */
      uploadUser?: string;
      /** 上传时间 */
      uploadDate?: string;
      /** 文件信息 */
      fileList?: Array<SpecialServiceUploadFileResponse>;
    }
  }

  /** 财赢相关附件资料上传,先上次oss,然后保存到special_service_attachment附件表 post /special/service/uploadWealthAndAccountAttachment */
  function postServiceUploadWealthAndAccountAttachment(req: ET<PostServiceUploadWealthAndAccountAttachment.Req>, options?: object): Promise<ET<PostServiceUploadWealthAndAccountAttachment.Res>>;

  export module PostServiceAddSpecialServiceRecord {
    export type ErrorContext = {
      errorCode?: string;
      errorMessage?: string;
      detailMessage?: string;
    };
    export type SpecialServiceRecordAddResponse = {
      /** 专项服务记录id */
      id?: number;
      /** 采集报表的开始时间 */
      collectStartDate?: string;
      /** 采集报表的结束时间 */
      collectEndDate?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户id */
      customerId: number;
      /** 客户名称 */
      customerName: string;
      /** 客户类型。0-企业；1-机构 */
      customerType: string;
      /** 认领专家id */
      acceptorId?: string;
      /** 所属期开始时间 */
      periodStartDate: string;
      /** 所属期结束时间 */
      periodEndDate: string;
      /** 手机号 */
      mobile: string;
      /** 申请人 */
      applicantName: string;
      /** 专项服务id */
      serviceConfigId: number;
      /** 渠道 */
      channel: string;
    }
    export interface Res {
      success?: boolean;
      errorContext?: ErrorContext;
      entity?: SpecialServiceRecordAddResponse;
    }
  }

  /** 专项受理 post /special/service/addSpecialServiceRecord */
  function postServiceAddSpecialServiceRecord(req: ET<PostServiceAddSpecialServiceRecord.Req>, options?: object): Promise<ET<PostServiceAddSpecialServiceRecord.Res>>;

  export module GetSchedulePageList {
    export type SpecialServiceScheduleListResVO = {
      /** 任务id */
      specialServiceId?: number;
      /** 专项类型{@link cn.com.servyou.consult.commons.constant.enums.specialservice.SpecialServiceTypeEnum} */
      specialServiceType?: string;
      /** 企业名称 */
      companyName?: string;
      /** 机构名称 */
      agencyName?: string;
      /** 行业名称 */
      industryName?: string;
      /** 进度code */
      scheduleCode?: string;
      /** 进度名称 */
      scheduleName?: string;
      /** 方案执行风险数量 */
      dangerCount?: number;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      queryCount?: boolean;
      sortRuleList?: Array<string>;
      /** 任务id */
      specialServiceId?: number;
      /** 企业云上id */
      companyId?: Array<number>;
      /** 机构云上id */
      agencyId?: Array<number>;
      /** 进度code */
      scheduleCode?: Array<string>;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SpecialServiceScheduleListResVO>;
    }
  }

  /** 任务进度列表 get /specialService/schedule/pageList */
  function getSchedulePageList(req: ET<GetSchedulePageList.Req>, options?: object): Promise<ET<GetSchedulePageList.Res>>;

  export module GetServiceQueryWealthAccountInfo {
    export type ErrorContext = {
      errorCode?: string;
      errorMessage?: string;
      detailMessage?: string;
    };
    export type WealthAccountInfoQueryResponse = {
      /** 客户ID,标准Id */
      customerId?: string;
      /** 客户名称 */
      customerName?: string;
      /** 联合经营机构ID */
      synergyGroupId?: string;
      /** 联合经营机构名称 */
      synergyGroupName?: string;
      /** 成单状态｜Y-已成单、N未成单 */
      orderStatus?: string;
      /** 授权联系人手机号 */
      contactMobile?: string;
      /** 授权联系人名称 */
      contactName?: string;
      /** 成单时间 */
      orderDate?: string;
      /** 交付状态｜Y-已交付、N-未交付 */
      deliverStatus?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 客户名称，模糊搜索 */
      customerName: string;
      /** 状态||Y:已成单;N:未成单 */
      orderStatus?: string;
    }
    export interface Res {
      success?: boolean;
      errorContext?: ErrorContext;
      list?: Array<WealthAccountInfoQueryResponse>;
    }
  }

  /** 查询财赢客户信息 get /special/service/queryWealthAccountInfo */
  function getServiceQueryWealthAccountInfo(req: ET<GetServiceQueryWealthAccountInfo.Req>, options?: object): Promise<ET<GetServiceQueryWealthAccountInfo.Res>>;

  export module GetScheduleTaskDetail {
    export type SpecialServiceSchemeResVO = {
      /** 问题名称 */
      questionName?: string;
      /** 问题ID */
      questionId?: string;
      /** 方案名称 */
      schemeName?: string;
      /** 方案ID */
      schemeId?: string;
      /** 子任务 */
      subTaskList?: Array<SpecialServiceSubTaskResVO>;
    };
    export type SpecialServiceSubTaskResVO = {
      /** 子任务id */
      subTaskId?: number;
      /** 子任务名称 */
      subTaskName?: string;
      /** 子任务进度（状态）{@link cn.com.servyou.consult.commons.constant.enums.specialservice.SpecialServiceScheduleSubTaskEnum} */
      subTaskStatus?: string;
      /** 事项列表 */
      matterList?: Array<SpecialServiceSubTaskMatterResVO>;
      /** 开始时间，格式：yyyy-MM-dd */
      startDate?: string;
      /** 结束时间，格式：yyyy-MM-dd */
      endDate?: string;
    };
    export type SpecialServiceSubTaskMatterResVO = {
      /** 事项id */
      id?: number;
      /** 事项内容 */
      content?: string;
      /** 事项模型id */
      matterModelId?: string;
      /** 执行方，0-企业，1-机构 */
      executor?: string;
      /** 执行反馈 */
      executeFeedbackList?: Array<SpecialServiceExecuteFeedbackResVO>;
      /** 确认情况code{@link cn.com.servyou.consult.commons.constant.enums.specialservice.SpecialServiceSubTaskMatterConfirmStatusEnum} */
      confirmStatusCode?: string;
      /** 确认情况名称 */
      confirmStatusName?: string;
      /** 风险提示 */
      dangerList?: Array<string>;
      /** 事项状态code{@link cn.com.servyou.consult.commons.constant.enums.specialservice.SpecialServiceSubTaskMatterConfirmStatusEnum} */
      matterStatusCode?: string;
      /** 事项状态名称 */
      matterStatusName?: string;
    };
    export type SpecialServiceExecuteFeedbackResVO = {
      /** 文件id */
      id?: string;
      /** 名称 */
      name?: string;
      /** url */
      url?: string;
      /** 上传时间，格式：yyyy-MM-dd */
      uploadDate?: string;
    };

    export interface Req {
      /** 任务id */
      id: number;
    }
    export type Res = Array<SpecialServiceSchemeResVO>;
  }

  /** 任务进度详情 get /specialService/schedule/taskDetail */
  function getScheduleTaskDetail(req: ET<GetScheduleTaskDetail.Req>, options?: object): Promise<ET<GetScheduleTaskDetail.Res>>;

  export module PostScheduleUpdateSubTaskStatus {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      queryCount?: boolean;
      sortRuleList?: Array<SortRule>;
      /** 子任务id */
      subTaskId?: number;
      /** 子任务状态 */
      subTaskStatus?: string;
    }
    export type Res = boolean;
  }

  /** 更新子任务状态 post /specialService/schedule/updateSubTaskStatus */
  function postScheduleUpdateSubTaskStatus(req: ET<PostScheduleUpdateSubTaskStatus.Req>, options?: object): Promise<ET<PostScheduleUpdateSubTaskStatus.Res>>;

  export module PostScheduleUpdateSubTaskMatterStatus {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      queryCount?: boolean;
      sortRuleList?: Array<SortRule>;
      /** 事项id */
      matterId?: number;
      /** 事项状态 */
      matterStatus?: string;
    }
    export type Res = boolean;
  }

  /** 更新事项状态 post /specialService/schedule/updateSubTaskMatterStatus */
  function postScheduleUpdateSubTaskMatterStatus(req: ET<PostScheduleUpdateSubTaskMatterStatus.Req>, options?: object): Promise<ET<PostScheduleUpdateSubTaskMatterStatus.Res>>;

  export module PostScheduleDelFeedbackFile {
    export interface Req {
      /** 事项id */
      matterId?: number;
      /** 文件id */
      fileId?: number;
    }
    export type Res = boolean;
  }

  /** 删除事项反馈文件 post /specialService/schedule/delFeedbackFile */
  function postScheduleDelFeedbackFile(req: ET<PostScheduleDelFeedbackFile.Req>, options?: object): Promise<ET<PostScheduleDelFeedbackFile.Res>>;

  export module PostSubTaskSave {
    export type SpecialServiceExecPlanExecItemSaveVO = {
      /** 执行事项id */
      execItemId?: number;
      /** 回执 */
      receipt?: string;
      /** 执行方||0:企业;1:机构 */
      executor?: string;
      /** 事项类型||system:系统;manual:手动添加 */
      itemType?: string;
    };

    export interface Req {
      /** 流程记录id */
      processRecordId?: number;
      /** 流程事项记录id */
      processMatterRecordId?: number;
      /** 问题id */
      issueId?: number;
      /** 方案 */
      solutionId?: number;
      /** 子任务id */
      subTaskId?: number;
      /** 任务开始日期 */
      taskStartDate?: string;
      /** 任务结束日期 */
      taskEndDate?: string;
      /** 执行事项 */
      specialServiceExecPlanExecItemSaveVOList?: Array<SpecialServiceExecPlanExecItemSaveVO>;
    }
    export type Res = boolean;
  }

  /** 新增子任务 post /special/service/execPlan/subTask/save */
  function postSubTaskSave(req: ET<PostSubTaskSave.Req>, options?: object): Promise<ET<PostSubTaskSave.Res>>;

  export module PostServiceDetection {
    export interface Req {
      /** 专项服务id */
      id: number;
      /** 专项服务流程事项id */
      processMatterId: number;
      /** 检测年份 */
      detectionYear: string;
    }
    export type Res = boolean;
  }

  /** 体检表-检测 post /special/service/detection */
  function postServiceDetection(req: ET<PostServiceDetection.Req>, options?: object): Promise<ET<PostServiceDetection.Res>>;

  export module PostServiceUpdateDetection {
    export interface Req {
      /** 专项服务id */
      id: number;
      /** 专项服务流程事项id */
      processMatterId: number;
      /** 附件id */
      attachmentId: number;
      /** 修改类型：1-体检表专家版；2-体检表PDF版 */
      updateType: string;
    }
    export type Res = boolean;
  }

  /** 体检表-更新 post /special/service/updateDetection */
  function postServiceUpdateDetection(req: ET<PostServiceUpdateDetection.Req>, options?: object): Promise<ET<PostServiceUpdateDetection.Res>>;

  export module PostServiceSelectInterrogation {
    export interface Req {
      /** 专项服务id */
      id: number;
      /** 专项服务流程事项id */
      processMatterId: number;
    }
    export type Res = boolean;
  }

  /** 问诊表-查询 post /special/service/selectInterrogation */
  function postServiceSelectInterrogation(req: ET<PostServiceSelectInterrogation.Req>, options?: object): Promise<ET<PostServiceSelectInterrogation.Res>>;

  export module PostServiceUpdateInterrogation {
    export interface Req {
      /** 专项服务id */
      id: number;
      /** 专项服务流程事项id */
      processMatterId: number;
      /** 附件id */
      attachmentId: number;
    }
    export type Res = boolean;
  }

  /** 问诊表-更新 post /special/service/updateInterrogation */
  function postServiceUpdateInterrogation(req: ET<PostServiceUpdateInterrogation.Req>, options?: object): Promise<ET<PostServiceUpdateInterrogation.Res>>;

  export module GetPlanGetRequirementList {
    export type SpecialServiceRequirementListResVO = {
      /** 需求业务ID */
      requirementBizId?: string;
      /** 需求名称 */
      requirementName?: string;
    };

    export type Req = any;
    export type Res = Array<SpecialServiceRequirementListResVO>;
  }

  /** 获取需求方案列表 get /special/service/plan/getRequirementList */
  function getPlanGetRequirementList(req?: ET<GetPlanGetRequirementList.Req>, options?: object): Promise<ET<GetPlanGetRequirementList.Res>>;

  export module GetPlanGetSolutionList {
    export type SpecialServiceSolutionListResVO = {
      /** 方案业务ID */
      solutionBizId?: string;
      /** 方案名称 */
      solutionName?: string;
      /** 方案描述 */
      solutionDesc?: string;
    };

    export interface Req {
      /** 需求ID */
      requirementBizId: string;
    }
    export type Res = Array<SpecialServiceSolutionListResVO>;
  }

  /** 根据需求id获取方案列表 get /special/service/plan/getSolutionList */
  function getPlanGetSolutionList(req: ET<GetPlanGetSolutionList.Req>, options?: object): Promise<ET<GetPlanGetSolutionList.Res>>;

  export module GetPlanGetTaskList {
    export type SpecialServiceSolutionDetailResVO = {
      /** 方案名称 */
      solutionName?: string;
      /** 方案概述/描述 */
      solutionDesc?: string;
      /** 方案适用行业 */
      solutionApplicableIndustry?: string;
      /** 方案适用条件 */
      solutionApplicableConditions?: string;
      /** 任务列表 */
      taskDetailList?: Array<SpecialServiceTaskDetailVO>;
      /** 注意事项 */
      needAttentionMatterList?: Array<string>;
      /** 政策参考 */
      policyReferenceList?: Array<string>;
    };
    export type SpecialServiceTaskDetailVO = {
      /** 任务id */
      taskId?: string;
      /** 任务名称 */
      taskName?: string;
      /** 任务详细 */
      taskDetail?: string;
    };

    export interface Req {
      /** 需求业务ID */
      requirementBizId: string;
      /** 方案业务ID */
      solutionBizId: string;
    }
    export type Res = Array<SpecialServiceSolutionDetailResVO>;
  }

  /** 根据需求id获取方案列表 get /special/service/plan/getTaskList */
  function getPlanGetTaskList(req: ET<GetPlanGetTaskList.Req>, options?: object): Promise<ET<GetPlanGetTaskList.Res>>;

  export module GetServiceGetRecordMaterialList {
    export type SpecialServiceRecordMaterialFileResponse = {
      /** 上传人 */
      uploadUser?: string;
      /** 上传时间 */
      uploadDate?: string;
      /** 文件路径 */
      filePath?: string;
      /** 文件名称 */
      name?: string;
      /** 文件大小 */
      fileSize?: number;
    };

    export interface Req {
      /** 专项服务记录id */
      serviceRecordId?: number;
      /** 流程事项id */
      processMatterRecord?: number;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SpecialServiceRecordMaterialFileResponse>;
    }
  }

  /** 获取维护任务资料列表 get /special/service/getRecordMaterialList */
  function getServiceGetRecordMaterialList(req: ET<GetServiceGetRecordMaterialList.Req>, options?: object): Promise<ET<GetServiceGetRecordMaterialList.Res>>;

  export module PostExecPlanDelete {
    export interface Req {
      /** 执行计划id */
      execPlanId?: number;
    }
    export type Res = boolean;
  }

  /** 删除执行计划 post /special/service/execPlan/delete */
  function postExecPlanDelete(req: ET<PostExecPlanDelete.Req>, options?: object): Promise<ET<PostExecPlanDelete.Res>>;

  export module PostSubTaskDelete {
    export interface Req {
      subTaskId?: number;
    }
    export type Res = boolean;
  }

  /** 删除子任务 post /special/service/execPlan/subTask/delete */
  function postSubTaskDelete(req: ET<PostSubTaskDelete.Req>, options?: object): Promise<ET<PostSubTaskDelete.Res>>;

  export module PostSubTaskUpdate {
    export type SpecialServiceExecMatterUpdateReqVO = {
      /** 执行事项 */
      execMatterId?: number;
      /** 执行事项 */
      execMatter?: string;
      /** 回执 */
      receipt?: string;
      /** 执行方||0:企业;1:机构 */
      executor?: string;
    };

    export interface Req {
      /** 子任务id */
      subTaskId?: number;
      /** 子任务名称 */
      subTaskName?: string;
      /** 任务开始日期 */
      taskStartDate?: string;
      /** 任务结束日期 */
      taskEndDate?: string;
      /** 执行事项列表 */
      specialServiceExecMatterUpdateReqVOList?: Array<SpecialServiceExecMatterUpdateReqVO>;
    }
    export type Res = boolean;
  }

  /** post /special/service/execPlan/subTask/update */
  function postSubTaskUpdate(req: ET<PostSubTaskUpdate.Req>, options?: object): Promise<ET<PostSubTaskUpdate.Res>>;

  export module PostExecMatterSave {
    export interface Req {
      /** 执行事项 */
      execMatter?: string;
      /** 回执 */
      receipt?: string;
      /** 执行方||0:企业;1:机构 */
      executor?: string;
      /** 事项类型||system:系统;manual:手动添加 */
      matterType?: string;
    }
    export type Res = boolean;
  }

  /** 新增执行事项 post /special/service/execPlan/execMatter/save */
  function postExecMatterSave(req: ET<PostExecMatterSave.Req>, options?: object): Promise<ET<PostExecMatterSave.Res>>;

  export module PostExecMatterDelete {
    export interface Req {
      execMatterId?: number;
    }
    export type Res = boolean;
  }

  /** 删除执行事项 post /special/service/execPlan/execMatter/delete */
  function postExecMatterDelete(req: ET<PostExecMatterDelete.Req>, options?: object): Promise<ET<PostExecMatterDelete.Res>>;

  export module GetDeletedRequirementAndSolutionQuery {
    export type SpecialServiceExecPlanIssueAndSolutionResVO = {
      /** 需求业务id */
      requirementBizId?: number;
      /** 需求名称 */
      requirementName?: string;
      /** 方案id */
      specialServiceExecPlanSolutionResVOList?: Array<SpecialServiceExecPlanSolutionResVO>;
    };
    export type SpecialServiceExecPlanSolutionResVO = {
      /** 方案业务id */
      solutionBizId?: number;
      /** 方案名称 */
      solutionName?: string;
    };

    export interface Req {
      /** 方案选择事项记录id */
      planSelectionMatterRecordId: number;
      /** 制定计划事项记录id */
      makingPlanMatterRecordId: number;
    }
    export type Res = Array<SpecialServiceExecPlanIssueAndSolutionResVO>;
  }

  /** 查询已删除的需求和方案 get /special/service/execPlan/deletedRequirementAndSolution/query */
  function getDeletedRequirementAndSolutionQuery(req: ET<GetDeletedRequirementAndSolutionQuery.Req>, options?: object): Promise<ET<GetDeletedRequirementAndSolutionQuery.Res>>;

  export module GetExecPlanQuery {
    export type SpecialServiceExecPlanQueryResVO = {
      /** id */
      id?: number;
      /** 服务记录id */
      serviceRecordId?: number;
      /** 流程记录id */
      processRecordId?: number;
      /** 流程事项记录id */
      processMatterRecordId?: number;
      /** 需求业务id */
      requirementBizId?: string;
      /** 需求名称 */
      requirementName?: string;
      /** 方案业务id */
      solutionBizId?: string;
      /** 方案名称 */
      solutionName?: string;
      /** 子任务列表 */
      specialServiceSubTaskResVOList?: Array<SpecialServiceSubTaskResVO>;
    };
    export type SpecialServiceSubTaskResVO = {
      /** id */
      id?: number;
      /** 子任务业务id */
      subTaskBizId?: string;
      /** 子任务名称 */
      subTaskName?: string;
      /** 子任务类型||system:系统;manual:手动添加 */
      subTaskType?: string;
      /** 子任务类型名称||system:系统;manual:手动添加 */
      subTaskTypeName?: string;
      /** 子任务状态||noneStart:未开始;executing:执行中;finished:已完成;stopped:已终止; */
      subTaskStatus?: string;
      /** 子任务状态名称 */
      subTaskStatusName?: string;
      /** 任务开始日期 */
      taskStartDate?: string;
      /** 任务结束日期 */
      taskEndDate?: string;
      /** 执行事项列表 */
      specialServiceExecMatterResVOList?: Array<SpecialServiceExecMatterResVO>;
    };
    export type SpecialServiceExecMatterResVO = {
      id?: number;
      /** 执行事项业务id */
      execMatterBizId?: number;
      /** 执行事项内容 */
      execMatter?: string;
      /** 执行事项状态||stopped:已终止 */
      execMatterStatus?: number;
      /** 执行事项状态名称||stopped:已终止 */
      execMatterStatusName?: string;
      /** 回执 */
      receipt?: string;
      /** 执行方||0:企业;1:机构 */
      executor?: string;
      /** 执行方名称||0:企业;1:机构 */
      executorName?: string;
      /** 事项类型||system:系统;manual:手动添加 */
      matterType?: string;
      /** 事项类型名称||system:系统;manual:手动添加 */
      matterTypeName?: string;
    };

    export interface Req {
      /** 方案选择事项记录id */
      planSelectionMatterRecordId?: number;
      /** 指定计划事项记录id */
      makingPlanMatterRecordId?: number;
    }
    export interface Res {
      /** 执行计划列表 */
      specialServiceExecPlanQueryResVOList?: Array<SpecialServiceExecPlanQueryResVO>;
      /** 有删除的问题和方案标识||Y:是;N:否 */
      havingDeletedIssueAndSolutionFlag?: string;
    }
  }

  /** 查询执行计划 get /special/service/execPlan/query */
  function getExecPlanQuery(req: ET<GetExecPlanQuery.Req>, options?: object): Promise<ET<GetExecPlanQuery.Res>>;

  export module PostPlanSelect {
    export type RequirementAndSolutionReqVO = {
      /** 需求id */
      requirementId?: string;
      /** 方案列表 */
      solutionIdList?: Array<string>;
    };

    export interface Req {
      /** 需求方案列表 */
      requirementAndSolutionReqVOList?: Array<RequirementAndSolutionReqVO>;
      /** 方案选择状态||0:暂存;1:确认方案 */
      status?: string;
    }
    export type Res = boolean;
  }

  /** 方案选择操作（暂存,确认发布） post /special/service/plan/select */
  function postPlanSelect(req: ET<PostPlanSelect.Req>, options?: object): Promise<ET<PostPlanSelect.Res>>;

  export module GetSchemeGenerate {
    export type CompanyInfoResVO = {
      /** 企业id */
      id?: number;
      /** 企业名称 */
      name?: string;
      /** 税号 */
      taxNo?: string;
      /** 增值税纳税人类型（1:一般纳税人、2:小规模纳税人等，0:其它，n:未设置） */
      taxType?: string;
      /** 登记注册类型 */
      registrationType?: string;
      /** 税务登记日期（生产经营期限起） */
      taxRegistrationDate?: string;
      /** 注册地址 */
      registerAddress?: string;
      /** 企业创建时间 */
      createDate?: string;
      /** 行业名称 */
      industryName?: string;
      /** 行业代码 */
      industryCode?: string;
      /** 经营范围 */
      business?: string;
      /** 手机号码 */
      mobile?: string;
    };
    export type SpecialServiceExecPlanQueryResVO = {
      /** id */
      id?: number;
      /** 服务记录id */
      serviceRecordId?: number;
      /** 流程记录id */
      processRecordId?: number;
      /** 流程事项记录id */
      processMatterRecordId?: number;
      /** 需求业务id */
      requirementBizId?: string;
      /** 需求名称 */
      requirementName?: string;
      /** 方案业务id */
      solutionBizId?: string;
      /** 方案名称 */
      solutionName?: string;
      /** 方案概述 */
      solutionDesc?: string;
      /** 子任务列表 */
      specialServiceSubTaskResVOList?: Array<SpecialServiceSubTaskResVO>;
      /** 子任务下法规依据去重 */
      distinctPolicyReference?: string;
    };
    export type SpecialServiceSubTaskResVO = {
      /** id */
      id?: number;
      /** 子任务业务id */
      subTaskBizId?: string;
      /** 子任务名称 */
      subTaskName?: string;
      /** 子任务详细内容（如果子任务是手动添加的，值取自子任务下所有执行事项内容，换行组装） */
      subTaskDetail?: string;
      /** 法规依据 */
      policyReference?: string;
      /** 子任务类型||system:系统;manual:手动添加 */
      subTaskType?: string;
      /** 子任务类型名称||system:系统;manual:手动添加 */
      subTaskTypeName?: string;
      /** 子任务状态||noneStart:未开始;executing:执行中;finished:已完成;stopped:已终止; */
      subTaskStatus?: string;
      /** 子任务状态名称 */
      subTaskStatusName?: string;
      /** 任务开始日期 */
      taskStartDate?: string;
      /** 任务结束日期 */
      taskEndDate?: string;
      /** 执行事项列表 */
      specialServiceExecMatterResVOList?: Array<SpecialServiceExecMatterResVO>;
    };
    export type SpecialServiceExecMatterResVO = {
      id?: number;
      /** 执行事项业务id */
      execMatterBizId?: number;
      /** 执行事项内容 */
      execMatter?: string;
      /** 执行事项状态||stopped:已终止 */
      execMatterStatus?: number;
      /** 执行事项状态名称||stopped:已终止 */
      execMatterStatusName?: string;
      /** 回执 */
      receipt?: string;
      /** 执行方||0:企业;1:机构 */
      executor?: string;
      /** 执行方名称||0:企业;1:机构 */
      executorName?: string;
      /** 事项类型||system:系统;manual:手动添加 */
      matterType?: string;
      /** 事项类型名称||system:系统;manual:手动添加 */
      matterTypeName?: string;
    };

    export interface Req {
      /** 方案选择事项记录id */
      planSelectionMatterRecordId: number;
      /** 执行计划事项记录id */
      makingPlanMatterRecordId: number;
    }
    export interface Res {
      /** 企业信息 */
      companyInfoResVO?: CompanyInfoResVO;
      /** 执行计划列表 */
      specialServiceExecPlanQueryResVOList?: Array<SpecialServiceExecPlanQueryResVO>;
    }
  }

  /** 生成方案 get /special/service/scheme/generate */
  function getSchemeGenerate(req: ET<GetSchemeGenerate.Req>, options?: object): Promise<ET<GetSchemeGenerate.Res>>;

  export module PostPlanUpdateMaterial {
    export type PlanMaterialVO = {
      /** 材料名称 */
      name?: string;
      /** 提供方.机构和企业 */
      provider?: string;
      /** 采集进度.未提供和已提供 */
      collectionProgress?: string;
      /** 采集反馈 */
      collectionFeedBackList?: Array<SpecialServiceUploadFileVO>;
    };
    export type SpecialServiceUploadFileVO = {
      /** id */
      id?: number;
      /** 文件名称 */
      name?: string;
    };

    export interface Req {
      /** 材料清单列表 */
      planMaterialVOList?: Array<PlanMaterialVO>;
      /** 事项id */
      matterId?: string;
    }
    export type Res = boolean;
  }

  /** 材料清单全量数据更新 post /special/service/plan/updateMaterial */
  function postPlanUpdateMaterial(req: ET<PostPlanUpdateMaterial.Req>, options?: object): Promise<ET<PostPlanUpdateMaterial.Res>>;

  export module PostExecPlanSave {
    export interface Req {
      /** 服务记录id */
      serviceRecordId: number;
      /** 流程记录id */
      processRecordId: number;
      /** 流程事项记录id */
      processMatterRecordId: number;
      /** 需求业务id */
      requirementBizId: string;
      /** 方案业务id */
      solutionBizId: string;
    }
    export type Res = number;
  }

  /** 新增执行计划 post /special/service/execPlan/save */
  function postExecPlanSave(req: ET<PostExecPlanSave.Req>, options?: object): Promise<ET<PostExecPlanSave.Res>>;

  export module PostServiceUploadFileAndUpdateBusiness {
    export type MultipartFile = any;

    export interface Req {
      /** 上传的附件 */
      files: Array<MultipartFile>;
      /** 附件的业务类型||37:执行计划excel;38:方案excel;39:方案PDF;41:跟踪管理附件 */
      businessType: string;
      /** 业务id，businessType为37、38、39时传事项表的主键id；businessType为41时传子任务事项表的主键id */
      businessId: string;
    }
    export type Res = boolean;
  }

  /** 上传文件并更新业务信息 post /special/service/uploadFileAndUpdateBusiness */
  function postServiceUploadFileAndUpdateBusiness(req: ET<PostServiceUploadFileAndUpdateBusiness.Req>, options?: object): Promise<ET<PostServiceUploadFileAndUpdateBusiness.Res>>;

  export module PostSchemePublish {
    export interface Req {
      /** 服务记录id */
      serviceRecordId: number;
      /** 状态，传4||0:待认领;1:已认领;2:已完成;3:已关闭;4:已发布 */
      status: string;
    }
    export type Res = void;
  }

  /** 发布方案 post /special/service/scheme/publish */
  function postSchemePublish(req: ET<PostSchemePublish.Req>, options?: object): Promise<ET<PostSchemePublish.Res>>;

  export module GetServiceCheckExistRecord {
    export type Files = any;

    export interface Req {
      /** 上传的附件 */
      files: Array<Files>;
      /** 附件的业务类型||37:执行计划excel;38:方案excel;39:方案PDF;41:跟踪管理附件 */
      businessType: string;
      /** 业务id，businessType为37、38、39时传事项表的主键id；businessType为41时传子任务事项表的主键id */
      businessId: string;
    }
    export type Res = boolean;
  }

  /** 上传文件并更新业务信息 get /special/service/checkExistRecord */
  function getServiceCheckExistRecord(req: ET<GetServiceCheckExistRecord.Req>, options?: object): Promise<ET<GetServiceCheckExistRecord.Res>>;

  export module PostServiceAddPreSale {
    export interface Req {
      /** 客户id */
      customerId?: number;
      /** 企业非标id */
      nsCustomerId?: number;
      /** 客户名称 */
      customerName?: string;
      /** 客户类型。0-企业；1-机构 */
      customerType: string;
      /** 机构id */
      agencyId?: number;
      /** 机构名称 */
      agencyName?: string;
      /** 渠道 */
      channel: string;
      /** 专项类型 */
      type: string;
      /** 申请人手机号 */
      mobile?: string;
      /** 申请人名称 */
      applicantName?: string;
      /** 提交人id */
      accountId?: string;
    }
    export interface Res {
      /** 专项服务记录id */
      id?: number;
    }
  }

  /** 新增售前任务 post /special/service/addPreSale */
  function postServiceAddPreSale(req: ET<PostServiceAddPreSale.Req>, options?: object): Promise<ET<PostServiceAddPreSale.Res>>;

  export module PostExecPlanExcelExport {
    export type SpecialServiceExecRequirementExportReqVO = {
      /** 需求业务id */
      requirementBizId?: string;
      /** 需求名称 */
      requirementName?: string;
      /** 需求描述 */
      requirementDesc?: string;
      /** 方案列表 */
      specialServiceSolutionList?: Array<SpecialServiceExecSolutionExportVO>;
    };
    export type SpecialServiceExecSolutionExportVO = {
      /** 方案业务id */
      solutionBizId?: string;
      /** 方案名称 */
      solutionName?: string;
      /** 方案概述 */
      solutionDesc?: string;
      /** 子任务列表 */
      specialServiceSubTaskList?: Array<SpecialServiceSubTaskReqBO>;
    };
    export type SpecialServiceSubTaskReqBO = {
      /** id */
      id?: number;
      /** 子任务业务id */
      subTaskBizId?: string;
      /** 子任务名称 */
      subTaskName?: string;
      /** 子任务详细内容（如果子任务是手动添加的，值取自子任务下所有执行事项内容，换行组装） */
      subTaskDetail?: string;
      /** 法规依据 */
      policyReference?: string;
      /** 子任务类型（英文）||system:系统;manual:手动添加 */
      subTaskEnType?: string;
      /** 子任务类型名称||system:系统;manual:手动添加 */
      subTaskTypeName?: string;
      /** 子任务状态（英文）||noneStart:未开始;executing:执行中;finished:已完成;stopped:已终止; */
      subTaskEnStatus?: string;
      /** 子任务状态名称 */
      subTaskEnStatusName?: string;
      /** 任务开始日期 */
      subTaskStartDate?: string;
      /** 任务结束日期 */
      subTaskEndDate?: string;
      /** 执行事项列表 */
      specialServiceExecMatterList?: Array<SpecialServiceExecMatterReqBO>;
    };
    export type SpecialServiceExecMatterReqBO = {
      id?: number;
      /** 执行事项业务id */
      execMatterBizId?: string;
      /** 执行事项内容 */
      execMatter?: string;
      /** 执行事项状态（英文）||stopped:已终止 */
      execMatterEnStatus?: string;
      /** 执行事项状态名称||stopped:已终止 */
      execMatterEnStatusName?: string;
      /** 事项回执|票税团队返回富文本格式 */
      execMatterReceipt?: string;
      /** 执行方代码||0:企业;1:机构 */
      executorCode?: string;
      /** 执行方名称||0:企业;1:机构 */
      executorName?: string;
      /** 执行事项类型（英文）||system:系统;manual:手动添加 */
      execMatterEnType?: string;
      /** 事项类型名称||system:系统;manual:手动添加 */
      execMatterEnTypeName?: string;
      /** 执行事项确认情况（英文）||none:空（前端页面不显示）;modelFindDanger:自动检测到风险;modelNotFindDanger:未自动检测到风险;companyConfirmFinished:企业确认已完成;agencyConfirmFinished:机构确认已完成 */
      execMatterConfirmEnFlag?: string;
      /** 执行事项确认情况名称||none:空（前端页面不显示）;modelFindDanger:自动检测到风险;modelNotFindDanger:未自动检测到风险;companyConfirmFinished:企业确认已完成;agencyConfirmFinished:机构确认已完成 */
      execMatterConfirmEnFlagName?: string;
    };

    export interface Req {
      /** 方案编制事项id */
      establishingSchemeMatterRecordId: number;
      /** 企业名称 */
      companyName: string;
      /** 发布时间 */
      publishDate?: string;
      /** 需求列表 */
      specialServiceGenerateRequirementList?: Array<SpecialServiceExecRequirementExportReqVO>;
    }
    export type Res = string;
  }

  /** 导出执行计划excel post /special/service/execPlanExcel/export */
  function postExecPlanExcelExport(req: ET<PostExecPlanExcelExport.Req>, options?: object): Promise<ET<PostExecPlanExcelExport.Res>>;

  export module PostSchemeWordExport {
    export interface Req {
      /** 方案编制事项id */
      establishingSchemeMatterRecordId: number;
      /** 企业名称 */
      companyName: string;
      /** 方案正文 */
      schemeText: string;
      /** 发布时间 */
      publishDate?: string;
    }
    export type Res = void;
  }

  /** 导出方案word post /special/service/schemeWord/export */
  function postSchemeWordExport(req: ET<PostSchemeWordExport.Req>, options?: object): Promise<ET<PostSchemeWordExport.Res>>;

  export module PostServiceUploadRecordMaterial {
    export type MultipartFile = any;
    export type SpecialServiceUploadFileResponse = {
      /** id */
      id?: number;
      /** 文件路径 */
      filePath?: string;
      /** 文件名称 */
      name?: string;
      /** 文件大小 */
      fileSize?: number;
      /** 上传时间 */
      uploadDate?: string;
      /** 上传人 */
      uploadUser?: string;
    };

    export interface Req {
      /** 上传的附件 */
      files: Array<MultipartFile>;
      /** 专项任务记录id */
      specialServiceRecordId: string;
    }
    export interface Res {
      /** 文件信息 */
      fileList?: Array<SpecialServiceUploadFileResponse>;
    }
  }

  /** 上传专项任务资料 post /special/service/uploadRecordMaterial */
  function postServiceUploadRecordMaterial(req: ET<PostServiceUploadRecordMaterial.Req>, options?: object): Promise<ET<PostServiceUploadRecordMaterial.Res>>;

  export module PostServiceDeleteRecordMaterial {
    export interface Req {
      /** id,附件表主键id */
      id: number;
      /** 专项任务记录id */
      specialServiceRecordId: number;
    }
    export type Res = boolean;
  }

  /** 删除专项任务资料 post /special/service/deleteRecordMaterial */
  function postServiceDeleteRecordMaterial(req: ET<PostServiceDeleteRecordMaterial.Req>, options?: object): Promise<ET<PostServiceDeleteRecordMaterial.Res>>;

  export module PostWorkOrderCancelOrderSolve {
    export interface Req {
      /** 禅道工单id */
      zentaoOrderId: number;
    }
    export type Res = boolean;
  }

  /** 取消工单的解决 post /isd/workOrder/cancelOrderSolve */
  function postWorkOrderCancelOrderSolve(req: ET<PostWorkOrderCancelOrderSolve.Req>, options?: object): Promise<ET<PostWorkOrderCancelOrderSolve.Res>>;

  export module PostWorkOrderCacheSolveOrderData {
    export interface Req {
      /** 缓存内容 */
      content: string;
    }
    export type Res = boolean;
  }

  /** 缓存工单解决数据 post /isd/workOrder/cacheSolveOrderData */
  function postWorkOrderCacheSolveOrderData(req: ET<PostWorkOrderCacheSolveOrderData.Req>, options?: object): Promise<ET<PostWorkOrderCacheSolveOrderData.Res>>;

  export module GetWorkOrderGetCacheSolveOrderData {
    export interface Req {
      /** 禅道工单id */
      zentaoOrderId: string;
    }
    export interface Res {
      /** 缓存内容 */
      content?: string;
    }
  }

  /** get /isd/workOrder/getCacheSolveOrderData */
  function getWorkOrderGetCacheSolveOrderData(req: ET<GetWorkOrderGetCacheSolveOrderData.Req>, options?: object): Promise<ET<GetWorkOrderGetCacheSolveOrderData.Res>>;

  export module GetDeleteCheck {
    export interface Req {
      /** 服务记录id */
      serviceRecordId: number;
      /** 执行计划id */
      execPlanId: number;
      /** 子任务id */
      subTaskId: number;
      /** 执行事项id */
      execMatterId: number;
    }
    export interface Res {
      /** 校验结果,true代表成功，false代表失败 */
      checkResult?: boolean;
      /** 失败原因类型<p>1:表示当前删除事项为子任务最后一个执行事项，不允许删除操作2:表示当前删除事项不是子任务最后一个执行事项,但是删除后，剩余执行事项均为已终止，需要提示用户是否确认删除，用户点确认则删除 */
      failureType?: number;
    }
  }

  /** 删除执行事项校验 get /special/service/execPlan/execMatter/delete/check */
  function getDeleteCheck(req: ET<GetDeleteCheck.Req>, options?: object): Promise<ET<GetDeleteCheck.Res>>;

  export module GetOlAgentAssistanceGetAnswer {
    export interface Req {
      /** 大模型智库日志id */
      fmttLogId?: string;
    }
    export interface Res {
      /** 大模型智库日志id */
      fmttLogId?: string;
      /** 结果。be_filtered:被过滤;internal_error:内部报错;success:成功; */
      result?: string;
      /** 回答 */
      answer?: string;
    }
  }

  /** 获取答案 get /olAgentAssistance/getAnswer */
  function getOlAgentAssistanceGetAnswer(req: ET<GetOlAgentAssistanceGetAnswer.Req>, options?: object): Promise<ET<GetOlAgentAssistanceGetAnswer.Res>>;

  export module GetCommonGetIrisValue {
    export interface Req {
      /** 配置key */
      key: string;
    }
    export type Res = string;
  }

  /** 配置获取接口 get /common/getIrisValue */
  function getCommonGetIrisValue(req: ET<GetCommonGetIrisValue.Req>, options?: object): Promise<ET<GetCommonGetIrisValue.Res>>;

  export module GetManageExport {
    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 是否查询总数，true：查询总数，false：不查询 */
      queryCount?: boolean;
      /** 排序列表 */
      sortRuleList?: Array<string>;
      /** 标题、正文、禅道工单id */
      keyword?: string;
      /** 工单处理人userId */
      handleUserId?: Array<string>;
      /** 工单提报人userId */
      commitUserId?: Array<string>;
      /** 所属产品池 */
      product?: string;
      /** 工单创建开始时间 */
      orderCreateStarDate?: any;
      /** 工单创建结束时间 */
      orderCreateEndDate?: any;
      /** 工单状态 */
      orderStatus?: string;
      /** 禅道模块id */
      zentaoModuleId?: number;
      /** 问题标签代码 */
      questionItemCode?: string;
    }
    export type Res = void;
  }

  /** 下载工单列表（客户经理） get /isd/workOrder/pageList/manage/export */
  function getManageExport(req: ET<GetManageExport.Req>, options?: object): Promise<ET<GetManageExport.Res>>;

  export module GetTeamExport {
    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 是否查询总数，true：查询总数，false：不查询 */
      queryCount?: boolean;
      /** 排序列表 */
      sortRuleList?: Array<string>;
      /** 工单处理人userId */
      handleUserId?: Array<string>;
      /** 工单提报人userId */
      commitUserId?: Array<string>;
      /** 标题、正文、禅道工单id */
      keyword?: string;
      /** 所属产品池 */
      product?: string;
      /** 工单创建开始时间 */
      orderCreateStarDate?: any;
      /** 工单创建结束时间 */
      orderCreateEndDate?: any;
      /** 工单状态 */
      orderStatus?: string;
      /** 禅道模块id */
      zentaoModuleId?: number;
      /** 问题标签代码 */
      questionItemCode?: string;
    }
    export type Res = void;
  }

  /** 下载工单列表（产品服务小组） get /isd/workOrder/pageList/team/export */
  function getTeamExport(req: ET<GetTeamExport.Req>, options?: object): Promise<ET<GetTeamExport.Res>>;

  export module PostServiceAccountBalance {
    export interface Req {
      /** 专项服务id */
      id: number;
      /** 属期开始时间 */
      beginPeriod: string;
      /** 属期结束时间 */
      endPeriod: string;
    }
    export type Res = boolean;
  }

  /** 科目余额表-查询 post /special/service/accountBalance */
  function postServiceAccountBalance(req: ET<PostServiceAccountBalance.Req>, options?: object): Promise<ET<PostServiceAccountBalance.Res>>;

  export module GetWorkOrderGetOperator {
    export interface Req {
      /** 地区code,6位 */
      location: string;
      /** 客群code */
      adminCompany: string;
    }
    export interface Res {
      /** 用户trueId */
      trueId?: string;
      /** 用户名称 */
      name?: string;
    }
  }

  /** get /isd/workOrder/getOperator */
  function getWorkOrderGetOperator(req: ET<GetWorkOrderGetOperator.Req>, options?: object): Promise<ET<GetWorkOrderGetOperator.Res>>;

  export module PostFeedbackSave {
    export interface Req {
      /** 禅道工单id */
      zentaoWorkOrderId?: number;
      /** 反馈结果标识||Y:解决;N:未解决 */
      feedbackEnFlag?: string;
      /** 反馈时间 */
      feedbackDate?: string;
      /** 反馈原因 */
      feedbackReason?: string;
    }
    export type Res = boolean;
  }

  /** 保存工单反馈原因 post /isd/workOrder/solution/feedback/save */
  function postFeedbackSave(req: ET<PostFeedbackSave.Req>, options?: object): Promise<ET<PostFeedbackSave.Res>>;

  export module PostFrontEndConfigSave {
    export interface Req {
      /** 配置类型（英文）|表示配置的类型|fmtt:大模型智库 */
      configEnType: string;
      /** 配置参数 */
      configParam?: string;
    }
    export type Res = boolean;
  }

  /** post /frontEndConfig/save */
  function postFrontEndConfigSave(req: ET<PostFrontEndConfigSave.Req>, options?: object): Promise<ET<PostFrontEndConfigSave.Res>>;

  export module GetFrontEndConfigQuery {
    export interface Req {
      /** 配置类型（英文）|表示配置的类型|fmtt:大模型智库 */
      configEnType: string;
      /** 配置参数 */
      configParam?: string;
    }
    export interface Res {
      /** 配置类型（英文）|表示配置的类型|fmtt:大模型智库 */
      configEnType?: string;
      /** 配置参数 */
      configParam?: string;
    }
  }

  /** get /frontEndConfig/query */
  function getFrontEndConfigQuery(req: ET<GetFrontEndConfigQuery.Req>, options?: object): Promise<ET<GetFrontEndConfigQuery.Res>>;

  export module GetModelButtonQuery {
    export type ModelButtonQueryResVO = {
      /** 模型版本 */
      modelVersion?: string;
      /** 答案框名称，例如：智库推荐、历史问答 */
      answerBoxName?: string;
      /** 按钮名称，例如：智库推荐、历史问答 */
      buttonName?: string;
    };

    export interface Req {
      /** 在线组id */
      groupId: number;
    }
    export type Res = Array<ModelButtonQueryResVO>;
  }

  /** 获取模型按钮列表 get /olAgentAssistance/modelButton/query */
  function getModelButtonQuery(req: ET<GetModelButtonQuery.Req>, options?: object): Promise<ET<GetModelButtonQuery.Res>>;

  export module GetServiceZxCompanySearch {
    export type CompanyCoreInfoGateResponse = {
      /** 企业id */
      companyId?: string;
      /** 税号 */
      taxNumber?: string;
      /** 企业名称 */
      companyName?: string;
      /** 地区 */
      locationCode?: string;
      /** 报税地区 */
      taxAreaCode?: string;
      /** 增值税纳税人类型(1:一般纳税人，2:小规模纳税人，0：无) */
      vatTaxpayerType?: string;
      /** 社会信用代码 */
      socialCreditCode?: string;
      /** 国税税号 */
      nationalTaxNo?: string;
      /** 地税税号 */
      localTaxNo?: string;
      /** 企业简称 */
      shortName?: string;
      /** 行政区划具体到区 */
      bizRegionCode?: string;
      /** 4 开头就代表个体工商户 */
      registrationType?: string;
      /** 法人id，对应老模型标准id */
      legalManId?: string;
    };

    export interface Req {
      /** 查询关键字: 企业名称或税号 */
      keyword?: string;
    }
    export type Res = Array<CompanyCoreInfoGateResponse>;
  }

  /** 中小企业搜索接口 get /special/service/zxCompanySearch */
  function getServiceZxCompanySearch(req: ET<GetServiceZxCompanySearch.Req>, options?: object): Promise<ET<GetServiceZxCompanySearch.Res>>;

  export module PostServiceSaveZXPTPreSale {
    export interface Req {
      /** 企业标准id */
      customerId?: number;
      /** 客户名称 */
      customerName?: string;
      /** 客户类型。0-企业；1-机构 */
      customerType: string;
      /** 专项服务配置id */
      serviceConfigId: number;
      /** 渠道 */
      channel: string;
    }
    export type Res = boolean;
  }

  /** 中小售前任务创建 post /special/service/saveZXPTPreSale */
  function postServiceSaveZXPTPreSale(req: ET<PostServiceSaveZXPTPreSale.Req>, options?: object): Promise<ET<PostServiceSaveZXPTPreSale.Res>>;

  export module GetUserFuzzyQueryOnJob {
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
    export type Res = Array<EmployeeResponse>;
  }

  /** 渐进式查询在职人员信息 get /user/fuzzyQueryOnJob */
  function getUserFuzzyQueryOnJob(req: ET<GetUserFuzzyQueryOnJob.Req>, options?: object): Promise<ET<GetUserFuzzyQueryOnJob.Res>>;

  export module PostWorkOrderUploadAndSendMegCard {
    export type MultipartFile = any;

    export interface Req {
      /** 上传的文件 */
      files: Array<MultipartFile>;
      /** 对内服务数字化sessionId */
      isdSessionId: string;
    }
    export type Res = boolean;
  }

  /** 上传文件并发送消息卡片 post /isd/workOrder/uploadAndSendMegCard */
  function postWorkOrderUploadAndSendMegCard(req: ET<PostWorkOrderUploadAndSendMegCard.Req>, options?: object): Promise<ET<PostWorkOrderUploadAndSendMegCard.Res>>;

  export module PostScheduleHistorySave {
    export interface Req {
      /** 专项记录id */
      serviceRecordId: number;
      /** 进度code */
      scheduleCode: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = number;
  }

  /** 进度记录保存 post /special/service/scheduleHistory/save */
  function postScheduleHistorySave(req: ET<PostScheduleHistorySave.Req>, options?: object): Promise<ET<PostScheduleHistorySave.Res>>;

  export module PostWorkOrderReassign {
    export interface Req {
      /** 禅道工单id */
      zentaoWorkOrderId?: number;
      /** 禅道产品池 */
      reassignedProduct?: string;
      /** 禅道模块 */
      reassignedModule?: number;
      /** 处理人trueId */
      handleTrueId?: string;
    }
    export type Res = boolean;
  }

  /** 重新指派 post /isd/workOrder/reassign */
  function postWorkOrderReassign(req: ET<PostWorkOrderReassign.Req>, options?: object): Promise<ET<PostWorkOrderReassign.Res>>;

  export module PostDescriptionRemind {
    export interface Req {
      /** 禅道工单id */
      zentaoWorkOrderId: number;
      /** 提醒内容 */
      remindContent: string;
    }
    export type Res = boolean;
  }

  /** 提醒用户填写信息反馈接口 post /isd/workOrder/additional/description/remind */
  function postDescriptionRemind(req: ET<PostDescriptionRemind.Req>, options?: object): Promise<ET<PostDescriptionRemind.Res>>;

  export module PostDescriptionSave {
    export interface Req {
      /** 禅道工单id */
      zentaoWorkOrderId: number;
      /** 补充信息 */
      additionalDescription: string;
    }
    export type Res = boolean;
  }

  /** 保存补充信息接口 post /isd/workOrder/additional/description/save */
  function postDescriptionSave(req: ET<PostDescriptionSave.Req>, options?: object): Promise<ET<PostDescriptionSave.Res>>;

  export module PostReportDetection {
    export interface Req {
      /** 专项服务id */
      id: number;
      /** 专项服务流程事项id */
      processMatterId: number;
      /** 检测年份 */
      detectionYear: string;
    }
    export type Res = boolean;
  }

  /** 财税报告检测 post /special/service/tax/report/detection */
  function postReportDetection(req: ET<PostReportDetection.Req>, options?: object): Promise<ET<PostReportDetection.Res>>;

  export module GetServiceGetMaterialRecordList {
    export type SpecialServiceMaterialRecordResVO = {
      /** id */
      id?: number;
      /** 服务记录id */
      serviceRecordId?: number;
      /** 物料名称 */
      materialName?: string;
      /** 描述 */
      description?: string;
      /** 是否必须标志| |Y:是; N:否 */
      isMust?: string;
      /** 获取方式类型| |expert:专家; company:企业; agency:机构; auto:自动获取; query:查询获取 */
      acquireWayType?: string;
      /** 获取方式类型名称 */
      acquireWayTypeName?: string;
      /** 日期类型| |no_date:无日期; single_date:单个日期 */
      dateType?: string;
      /** 所属期起 */
      periodStartDate?: string;
      /** 所属期止 */
      periodEndDate?: string;
      /** 物料类型| |basic_config:基础配置材料; custom:自定义材料 */
      materialType?: string;
      /** 业务编码| |01:专家版体检表;02:专家版问诊表;03:资产负债表;04:利润表;05:科目余额表;06:序时账;07:增值税纳税申报表;08:企业所得税申报表;09:个税申报表 */
      businessCode?: string;
      /** 发布状态| |0:未发布; 1:已发布 */
      publishStatus?: string;
      /** 状态| |0:待审核; 1:已通过; 2:已退回 */
      status?: string;
      /** 退回原因 */
      sendBackReason?: string;
      /** 退回时间 */
      sendBackDate?: string;
      /** 获取状态| |0:未获取; 1:获取中; 2:获取成功; 3:获取失败 */
      acquireStatus?: string;
      /** 任务ID */
      taskId?: string;
      /** 查询日期 */
      queryDate?: string;
      /** 错误信息 */
      errorMessage?: string;
      /** 附件IDS */
      attachmentIds?: string;
    };

    export interface Req {
      /** 服务记录id */
      serviceRecordId: number;
    }
    export type Res = Array<SpecialServiceMaterialRecordResVO>;
  }

  /** 材料清单列表 get /special/service/getMaterialRecordList */
  function getServiceGetMaterialRecordList(req: ET<GetServiceGetMaterialRecordList.Req>, options?: object): Promise<ET<GetServiceGetMaterialRecordList.Res>>;

  export module PostServiceOperationMaterialRecordStatus {
    export interface Req {
      /** 材料清单记录id */
      id: number;
      /** 操作类型： 1:通过; 2:退回 */
      operationType: string;
      /** 退回原因 */
      sendBackReason?: string;
    }
    export type Res = boolean;
  }

  /** 材料清单通过/退回操作 post /special/service/operationMaterialRecordStatus */
  function postServiceOperationMaterialRecordStatus(req: ET<PostServiceOperationMaterialRecordStatus.Req>, options?: object): Promise<ET<PostServiceOperationMaterialRecordStatus.Res>>;

  export module PostServiceUpdateMaterialRecord {
    export interface Req {
      /** 材料清单记录id */
      id: number;
      /** 附件id集合 */
      attachmentIds: string;
    }
    export type Res = boolean;
  }

  /** 材料清单专家上传文件--更新记录 post /special/service/updateMaterialRecord */
  function postServiceUpdateMaterialRecord(req: ET<PostServiceUpdateMaterialRecord.Req>, options?: object): Promise<ET<PostServiceUpdateMaterialRecord.Res>>;

  export module PostServiceSaveCustomMaterialRecord {
    export interface Req {
      /** 服务记录id */
      serviceRecordId: number;
      /** 物料名称 */
      materialName: string;
      /** 描述 */
      description: string;
      /** 是否必须标志| |Y:是; N:否 */
      isMust: string;
      /** 获取方式类型| |expert:专家; company:企业; agency:机构; auto:自动获取; query:查询获取 */
      acquireWayType: string;
    }
    export interface Res {
      /** id */
      id?: number;
    }
  }

  /** 自定义材料清单保存 post /special/service/saveCustomMaterialRecord */
  function postServiceSaveCustomMaterialRecord(req: ET<PostServiceSaveCustomMaterialRecord.Req>, options?: object): Promise<ET<PostServiceSaveCustomMaterialRecord.Res>>;

  export module PostServiceUpdateCustomMaterialRecord {
    export interface Req {
      /** 材料清单记录id */
      id?: number;
      /** 服务记录id */
      serviceRecordId: number;
      /** 物料名称 */
      materialName: string;
      /** 描述 */
      description: string;
      /** 是否必须标志| |Y:是; N:否 */
      isMust: string;
      /** 获取方式类型| |expert:专家; company:企业; agency:机构; auto:自动获取; query:查询获取 */
      acquireWayType: string;
    }
    export type Res = boolean;
  }

  /** 自定义材料清单修改 post /special/service/updateCustomMaterialRecord */
  function postServiceUpdateCustomMaterialRecord(req: ET<PostServiceUpdateCustomMaterialRecord.Req>, options?: object): Promise<ET<PostServiceUpdateCustomMaterialRecord.Res>>;

  export module PostServiceDeleteCustomMaterialRecord {
    export interface Req {
      /** 材料清单记录id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 自定义材料清单删除 post /special/service/deleteCustomMaterialRecord */
  function postServiceDeleteCustomMaterialRecord(req: ET<PostServiceDeleteCustomMaterialRecord.Req>, options?: object): Promise<ET<PostServiceDeleteCustomMaterialRecord.Res>>;

  export module PostServiceUpdatePublishStatus {
    export interface Req {
      /** 服务记录id */
      serviceRecordId: number;
    }
    export type Res = boolean;
  }

  /** 材料清单发布操作 post /special/service/updatePublishStatus */
  function postServiceUpdatePublishStatus(req: ET<PostServiceUpdatePublishStatus.Req>, options?: object): Promise<ET<PostServiceUpdatePublishStatus.Res>>;

  export module PostServiceCheckPreSale {
    export interface Req {
      /** 专项配置id */
      serviceConfigId: string;
      /** 企业标准id */
      customerId: string;
    }
    export interface Res {
      /** 是否存在,true则表示存在,false表示不存在 */
      isExist?: boolean;
      /** 提示信息 */
      tipMessage?: string;
    }
  }

  /** 根据企业id查询是否已创建任务--中小 post /special/service/checkPreSale */
  function postServiceCheckPreSale(req: ET<PostServiceCheckPreSale.Req>, options?: object): Promise<ET<PostServiceCheckPreSale.Res>>;

  export module PostMarkRead {
    export interface Req {
      /** 工单id */
      zentaoOrderId?: number;
      /** 最新补充消息主键id */
      workOrderSolutionFeedbackId?: number;
    }
    export type Res = boolean;
  }

  /** 标记补充信息已读接口 post /isd/workOrder/additional/description/mark/read */
  function postMarkRead(req: ET<PostMarkRead.Req>, options?: object): Promise<ET<PostMarkRead.Res>>;

  export module PostWorkOrderUploadAndSendMsgCard {
    export type FileReqVO = {
      /** 文件名称 */
      name: string;
      /** 文件url */
      url: string;
    };

    export interface Req {
      /** 文件列表 */
      fileList: Array<FileReqVO>;
      /** 对内服务数字化sessionId */
      isdSessionId: string;
      /** 接入类型||WechatWork:企业微信; */
      accessType: string;
      /** 接入id.当接入类型为企业微信时，为主体id; */
      accessId: string;
      /** 子接入id.当接入类型为企业微信时，为应用id; */
      subAccessId: string;
    }
    export type Res = boolean;
  }

  /** 上传文件并发送消息卡片 post /isd/workOrder/uploadAndSendMsgCard */
  function postWorkOrderUploadAndSendMsgCard(req: ET<PostWorkOrderUploadAndSendMsgCard.Req>, options?: object): Promise<ET<PostWorkOrderUploadAndSendMsgCard.Res>>;

  export module GetCommonHierarchicalOptions {
    export type HierarchicalOptionResVO = {
      /** 类型 */
      type?: string;
      /** 选项列表 */
      optionList?: Array<HierarchicalOptionVO>;
    };
    export type HierarchicalOptionVO = {
      /** 代码 */
      code?: string;
      /** 上级字典代码 */
      parentCode?: string;
      /** 名称 */
      name?: string;
      /** 子级选项列表 */
      subOptionList?: Array<HierarchicalOptionVO>;
    };

    export interface Req {
      /** 选项组名称，多个用英文逗号分隔 */
      groupTypes: string;
    }
    export type Res = Array<HierarchicalOptionResVO>;
  }

  /** 批量获取有层级的枚举选项信息接口 get /common/hierarchicalOptions */
  function getCommonHierarchicalOptions(req: ET<GetCommonHierarchicalOptions.Req>, options?: object): Promise<ET<GetCommonHierarchicalOptions.Res>>;

  export module PostServiceQueryTable {
    export interface Req {
      /** 材料清单记录id */
      id: number;
      /** 属期开始时间 */
      beginPeriod?: string;
      /** 属期结束时间 */
      endPeriod?: string;
    }
    export type Res = boolean;
  }

  /** 获取方式为查询获取-查询 post /special/service/queryTable */
  function postServiceQueryTable(req: ET<PostServiceQueryTable.Req>, options?: object): Promise<ET<PostServiceQueryTable.Res>>;

  export module GetFileWriteStream {
    export interface Req {
      /** 地址 */
      urlPath: string;
    }
    export type Res = void;
  }

  /** 输出流到页面 get /file/writeStream */
  function getFileWriteStream(req: ET<GetFileWriteStream.Req>, options?: object): Promise<ET<GetFileWriteStream.Res>>;

  export module GetWorkOrderConversionZenTaoUrl {
    export interface Req {
      comment: string;
    }
    export type Res = string;
  }

  /** 工单详情（客户经理） get /isd/workOrder/conversionZenTaoUrl */
  function getWorkOrderConversionZenTaoUrl(req: ET<GetWorkOrderConversionZenTaoUrl.Req>, options?: object): Promise<ET<GetWorkOrderConversionZenTaoUrl.Res>>;

  export module GetScheduleHistoryList {
    export type SpecialServiceScheduleHistoryResVO = {
      /** id */
      id?: number;
      /** 专项记录id */
      serviceRecordId?: number;
      /** 进度code */
      scheduleCode?: string;
      /** 进度名称 */
      scheduleName?: string;
      /** 备注 */
      remark?: string;
      /** `创建时间，时间格式yyyy-MM-dd HH:mm */
      createDate?: string;
      /** 创建人ID */
      creatorId?: string;
      /** 创建人名称 */
      creatorName?: string;
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
      /** 进度code */
      scheduleCode?: string;
      /** 专项记录id */
      serviceRecordId?: number;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<SpecialServiceScheduleHistoryResVO>;
    }
  }

  /** 进度记录列表查询 get /special/service/scheduleHistory/list */
  function getScheduleHistoryList(req: ET<GetScheduleHistoryList.Req>, options?: object): Promise<ET<GetScheduleHistoryList.Res>>;

  export module GetCompanyQueryCustomerId {
    export type CustomerIdQueryResponse = {
      /** 标准customerId或者非标准customerId */
      customerId?: number;
      /** 企业名称 */
      companyName?: string;
    };

    export interface Req {
      /** 客户云下id */
      bizId: string;
      /** 平台类型。 YQDZ:亿企代账 YQCS:亿企财税 YQZS:亿企助手 */
      platformType?: string;
      /** 咨询人手机号 */
      mobile?: string;
      /** 机构id */
      agencyId?: number;
    }
    export type Res = Array<CustomerIdQueryResponse>;
  }

  /** 查询(非)标准customerId get /company/queryCustomerId */
  function getCompanyQueryCustomerId(req: ET<GetCompanyQueryCustomerId.Req>, options?: object): Promise<ET<GetCompanyQueryCustomerId.Res>>;

  export module GetAccessLogQueryByLogId {
    export interface Req {
      /** 日志id */
      logId: string;
    }
    export interface Res {
      /** 主键，id服务生成 */
      id?: string;
      /** 访问ip地址 */
      ip?: string;
      /** 咨询链接 */
      consultUrl?: string;
      /** 来源渠道 */
      channel?: string;
      /** 产品代码 */
      systemCode?: string;
      /** 系列代码 */
      seriesCode?: string;
      /** 模块代码 */
      moduleCode?: string;
      /** 按钮代码 */
      buttonCode?: string;
      /** 税务类型 */
      taxType?: string;
      /** 地区代码 */
      location?: string;
      /** 会员等级 */
      usertype?: string;
      /** 产品维度 */
      brand?: string;
      /** 路由判断的地区代码 */
      routeLocation?: string;
      /** 路由判断的机构地区代码 */
      routeAgencyLocation?: string;
      /** 路由判断的vip等级 */
      routeVip?: string;
      /** 路由判断的账号 */
      routeAccount?: string;
      /** 路由参数-服务名称 */
      routeServiceName?: string;
      /** 路由参数-网点 */
      routeStore?: string;
      /** 猜你想问id */
      guessId?: number;
      /** 跳转咨询界面链接 */
      chatUrl?: string;
      /** 场景信息id */
      sceneId?: number;
      /** 咨询用户信息ID */
      consultUserInfoId?: number;
      /** 咨询前台日志id */
      frontAccessLogId?: string;
      /** 路由策略id */
      policyId?: string;
      /** 路由规则id */
      ruleId?: number;
      /** 流转id */
      circulationId?: number;
      /** 受理模式。0-仅机器人服务；1-仅人工服务；2-机器人优先可转人工；3-人工服务优先，下班时机器人服务；4-机器人和人工都不启用 */
      acceptanceMode?: string;
      /** 是否开启智能助理。Y/N */
      interact?: string;
      /** 咨询时间 */
      createDate?: string;
      /** 自增字段，mysearch同步使用 */
      innerId?: number;
    }
  }

  /** 根据logId查询咨询日志 get /accessLog/queryByLogId */
  function getAccessLogQueryByLogId(req: ET<GetAccessLogQueryByLogId.Req>, options?: object): Promise<ET<GetAccessLogQueryByLogId.Res>>;

  export module PostServiceAddEarlySpecialService {
    export type SpecialServiceUploadFileResponse = {
      /** id */
      id?: number;
      /** 文件路径 */
      filePath?: string;
      /** 文件名称 */
      name?: string;
      /** 文件大小 */
      fileSize?: number;
      /** 上传时间 */
      uploadDate?: string;
      /** 上传人 */
      uploadUser?: string;
    };

    export interface Req {
      /** 客户id查询财赢企业后前端获取的32位bizId */
      companyId: string;
      /** 客户名称 */
      companyName: string;
      /** 运营侧32位机构id */
      agencyId: string;
      /** 机构名称 */
      agencyName?: string;
      /** 认领专家trueId */
      acceptorId: string;
      /** 专项服务id */
      serviceConfigId: number;
      /** 渠道,专家工作台（channle=71） */
      channel: string;
      /** 问题描述 */
      description?: string;
      /** 资料文件列表 */
      fileList?: Array<SpecialServiceUploadFileResponse>;
    }
    export type Res = boolean;
  }

  /** 新增一层交付任务 post /special/service/addEarlySpecialService */
  function postServiceAddEarlySpecialService(req: ET<PostServiceAddEarlySpecialService.Req>, options?: object): Promise<ET<PostServiceAddEarlySpecialService.Res>>;

  export module PostDeliveryDashboard {
    export type SortRule = {
      field?: string;
      order?: string;
    };
    export type SpecialServiceDeliveryDashboardResVO = {
      /** 任务ID */
      specialServiceId?: number;
      /** 专项名称 */
      specialServiceName?: number;
      /** 提单时间 */
      orderDate?: string;
      /** 企业名称 */
      customerName?: string;
      /** 企业ID */
      customerId?: string;
      /** 所属机构 */
      agencyName?: string;
      /** 所属机构id */
      agencyId?: string;
      /** 合同金额 */
      contractAmount?: string;
      /** 专项类型【枚举待定】 */
      specialType?: string;
      /** 专项类型：一层服务/二层服务【枚举待定】 */
      specialTypeName?: string;
      /** 合同开始时间 */
      contractStartDate?: string;
      /** 合同结束时间 */
      contractEndDate?: string;
      /** 打款日期 */
      payoutDate?: string;
      /** 成交类型：goldVip:黄金会员|ptVip:铂金会员 */
      dealType?: string;
      /** 成交类型中文：goldVip:黄金会员|ptVip:铂金会员 */
      dealTypeName?: string;
      /** 专项进度 */
      specialSchedule?: string;
      /** 专项进度名称 */
      specialScheduleName?: string;
      /** 服务经理 */
      serviceManager?: string;
      /** 交付经理 */
      deliveryManager?: string;
      /** 交付专家 */
      deliverySpecialists?: string;
      /** 服务计划落地跟进人 */
      followedPerson?: string;
      /** 备注 */
      remark?: string;
    };
    export type ErrorContext = {
      errorCode?: string;
      errorMessage?: string;
      detailMessage?: string;
      isBusinessError?: boolean;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      queryCount?: boolean;
      sortRuleList?: Array<SortRule>;
      /** 企业名称 */
      customerName?: string;
      /** 所属机构 */
      agencyName?: string;
      /** 成交类型goldVip:黄金会员|ptVip:铂金会员 */
      dealType?: string;
      /** 专项类型【枚举待定】 */
      specialType?: string;
      /** 专项进度 */
      specialSchedule?: string;
      /** 打款日期起 */
      payoutStartDate?: string;
      /** 打款日期止 */
      payoutEndDate?: string;
      /** 服务经理 */
      serviceManager?: string;
      /** 交付经理 */
      deliveryManager?: string;
      /** 交付专家 */
      deliverySpecialists?: string;
      /** 服务计划落地跟进人 */
      followedPerson?: string;
    }
    export interface Res {
      list?: Array<SpecialServiceDeliveryDashboardResVO>;
      success?: boolean;
      errorContext?: ErrorContext;
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
    }
  }

  /** 交付任务进度看板 post /special/service/delivery/dashboard */
  function postDeliveryDashboard(req: ET<PostDeliveryDashboard.Req>, options?: object): Promise<ET<PostDeliveryDashboard.Res>>;

  export module PostDashboardExport {
    export type SortRule = {
      field?: string;
      order?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      queryCount?: boolean;
      sortRuleList?: Array<SortRule>;
      /** 企业名称 */
      customerName?: string;
      /** 所属机构 */
      agencyName?: string;
      /** 成交类型goldVip:黄金会员|ptVip:铂金会员 */
      dealType?: string;
      /** 专项类型【枚举待定】 */
      specialType?: string;
      /** 专项进度 */
      specialSchedule?: string;
      /** 打款日期起 */
      payoutStartDate?: string;
      /** 打款日期止 */
      payoutEndDate?: string;
      /** 服务经理 */
      serviceManager?: string;
      /** 交付经理 */
      deliveryManager?: string;
      /** 交付专家 */
      deliverySpecialists?: string;
      /** 服务计划落地跟进人 */
      followedPerson?: string;
    }
    export interface Res {
      /** 任务ID */
      taskId?: string;
      /** 任务状态||0:初始中|1:写入中|9:成功|-1:失败 */
      taskStatus?: string;
      /** 失败原因 */
      failReason?: string;
      /** 下载地址 */
      downloadUrl?: string;
    }
  }

  /** 交付任务进度看板导出 post /special/service/delivery/dashboard/export */
  function postDashboardExport(req: ET<PostDashboardExport.Req>, options?: object): Promise<ET<PostDashboardExport.Res>>;

  export module PostServicePeriodicServiceReport {
    export interface Req {
      /** 专项服务id */
      id: number;
      /** 专项服务流程事项id */
      processMatterId: number;
      /** 属期 格式：yyyymm */
      genusPeriod: string;
    }
    export type Res = boolean;
  }

  /** 周期性服务报告-查询 post /special/service/periodicServiceReport */
  function postServicePeriodicServiceReport(req: ET<PostServicePeriodicServiceReport.Req>, options?: object): Promise<ET<PostServicePeriodicServiceReport.Res>>;

  export module PostPreDetection {
    export interface Req {
      /** 专项服务id */
      id: number;
      /** 专项服务流程事项id */
      processMatterId: number;
      /** 检测年份 */
      detectionYear: string;
    }
    export type Res = boolean;
  }

  /** 体检表预检测获取流水号 post /special/service/pre/detection */
  function postPreDetection(req: ET<PostPreDetection.Req>, options?: object): Promise<ET<PostPreDetection.Res>>;

  export module PostExcelTask {
    export interface Req {
      /** 任务ID */
      taskId: string;
    }
    export interface Res {
      /** 失败原因 */
      failReason?: string;
      /** 导出是否成功 */
      exportSuccess?: boolean;
      /** 下载地址 */
      downloadUrl?: string;
    }
  }

  /** excel任务查询 post /common/excel/task */
  function postExcelTask(req: ET<PostExcelTask.Req>, options?: object): Promise<ET<PostExcelTask.Res>>;

  export module PostServiceEditRoleRecord {
    export interface Req {
      /** id */
      id?: number;
      /** 服务记录id */
      serviceRecordId?: number;
      /** 服务经理ID集合 */
      serviceManagerIds?: string;
      /** 服务专家ID集合 */
      serviceExportIds?: string;
      /** 服务助理ID集合 */
      serviceAssistantIds?: string;
      /** 服务跟进ID集合 */
      serviceFollowIds?: string;
    }
    export type Res = boolean;
  }

  /** 编辑专项服务角色分配记录 post /special/service/editRoleRecord */
  function postServiceEditRoleRecord(req: ET<PostServiceEditRoleRecord.Req>, options?: object): Promise<ET<PostServiceEditRoleRecord.Res>>;

  export module GetServiceQueryRoleRecord {
    export type SpecialServiceRoleRecordResVO = {
      /** id */
      id?: number;
      /** 服务记录id */
      serviceRecordId?: number;
      /** 服务经理ID集合 */
      serviceManagerIds?: string;
      /** 服务专家ID集合 */
      serviceExportIds?: string;
      /** 服务助理ID集合 */
      serviceAssistantIds?: string;
      /** 服务跟进ID集合 */
      serviceFollowIds?: string;
      /** 逻辑删除主键ID */
      isDelete?: number;
      /** 创建人ID */
      creatorId?: string;
      /** 修改人ID */
      modifierId?: string;
      /** 录入日期 */
      createDate?: string;
      /** 修改日期 */
      modifyDate?: string;
    };

    export interface Req {
      /** id */
      id?: number;
      /** 服务记录id */
      serviceRecordId?: number;
      /** 服务经理ID集合 */
      serviceManagerIds?: string;
      /** 服务专家ID集合 */
      serviceExportIds?: string;
      /** 服务助理ID集合 */
      serviceAssistantIds?: string;
      /** 服务跟进ID集合 */
      serviceFollowIds?: string;
    }
    export type Res = Array<SpecialServiceRoleRecordResVO>;
  }

  /** 编辑专项服务角色分配记录 get /special/service/queryRoleRecord */
  function getServiceQueryRoleRecord(req: ET<GetServiceQueryRoleRecord.Req>, options?: object): Promise<ET<GetServiceQueryRoleRecord.Res>>;

  export module PostWorkOrderGetSecuritySign {
    export interface Req {
      /** 请求json串 */
      paramJson?: string;
    }
    export interface Res {
      /** appId */
      appId?: string;
      /** sign */
      sign?: string;
      /** 时间戳 */
      timeStamp?: number;
    }
  }

  /** 获取二级验证签名 post /isd/workOrder/getSecuritySign */
  function postWorkOrderGetSecuritySign(req: ET<PostWorkOrderGetSecuritySign.Req>, options?: object): Promise<ET<PostWorkOrderGetSecuritySign.Res>>;

  export module GetOlAgentAssistanceFactorsDict {
    export type QuestionTypeAndConsultFactorsResVO = {
      /** 问题类型 */
      questionType?: string;
      /** 要素 */
      consultFactorList?: Array<ConsultFactorTypeResVO>;
    };
    export type ConsultFactorTypeResVO = {
      /** 类型 */
      type?: string;
      /** 名称 */
      name?: string;
      /** 要素项 */
      factorList?: Array<ConsultFactorResVO>;
    };
    export type ConsultFactorResVO = {
      /** code */
      code?: string;
      /** 名称 */
      name?: string;
      /** 值 */
      value?: string;
      /** 选择状态,以字典返回的时候，该字段为空 */
      selectType?: string;
    };

    export interface Req {
      /** 问题类型 */
      questionTypeList?: Array<string>;
    }
    export type Res = Array<QuestionTypeAndConsultFactorsResVO>;
  }

  /** 查询问题类型的要素字典 get /olAgentAssistance/factorsDict */
  function getOlAgentAssistanceFactorsDict(req: ET<GetOlAgentAssistanceFactorsDict.Req>, options?: object): Promise<ET<GetOlAgentAssistanceFactorsDict.Res>>;

  export module GetOlAgentAssistanceGetQuestionReply {
    export type ReplyResponseVO = {
      /** 回答ID */
      id?: string;
      /** 问题回答 */
      reply?: string;
      /** 内部提示 */
      internalTips?: string;
      /** 维度列表 */
      dimensionList?: Array<ReplyDimensionResponseVO>;
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
    export type ReplyDimensionResponseVO = {
      /** 维度类型 */
      type?: string;
      /** 维度列表 */
      list?: Array<DimensionResponseVO>;
    };
    export type DimensionResponseVO = {
      /** 维度id */
      id?: string;
      /** 维度code */
      code?: string;
      /** 维度名称 */
      name?: string;
    };

    export interface Req {
      /** 标准问id */
      standardQuestionId: string;
      /** 标准答案id */
      standardAnswerIdList?: Array<string>;
    }
    export interface Res {
      /** 问题ID */
      id?: string;
      /** 问题概要 */
      resume?: string;
      /** 问题描述 */
      description?: string;
      /** 创建人trueId */
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
      /** 回答 */
      replyList?: Array<ReplyResponseVO>;
    }
  }

  /** 获取问答详情接口 get /olAgentAssistance/getQuestionReply */
  function getOlAgentAssistanceGetQuestionReply(req: ET<GetOlAgentAssistanceGetQuestionReply.Req>, options?: object): Promise<ET<GetOlAgentAssistanceGetQuestionReply.Res>>;

  export module GetWorkOrderGetProductList {
    export type ProductCategoryResVO = {
      /** 分类 */
      type?: string;
      /** 名称 */
      name?: string;
      /** 产品列表 */
      productVOList?: Array<ProductVO>;
    };
    export type ProductVO = {
      /** 产品id */
      id?: string;
      /** 产品名称 */
      name?: string;
    };

    export type Req = any;
    export type Res = Array<ProductCategoryResVO>;
  }

  /** 获取列表页产品分组列表 get /isd/workOrder/getProductCategoryList */
  function getWorkOrderGetProductList(req?: ET<GetWorkOrderGetProductList.Req>, options?: object): Promise<ET<GetWorkOrderGetProductList.Res>>;

  export module GetLatestScheduleQuery {
    export interface Req {
      /** 交付任务id */
      serviceRecordId?: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 专项记录id */
      serviceRecordId?: number;
      /** 进度code */
      scheduleCode?: string;
      /** 进度名称 */
      scheduleName?: string;
      /** 进度主导人员工账户中心id */
      scheduleDominatorTrueId?: string;
      /** 进度主导人名称 */
      scheduleDominatorName?: string;
      /** 上一进度完成时间，格式：yyyy-MM-dd */
      previousScheduleFinishDate?: string;
      /** 备注 */
      remark?: string;
      /** `创建时间，时间格式yyyy-MM-dd HH:mm:ss */
      createDate?: string;
    }
  }

  /** 查询最新进度 get /special/service/scheduleHistory/latestSchedule/query */
  function getLatestScheduleQuery(req: ET<GetLatestScheduleQuery.Req>, options?: object): Promise<ET<GetLatestScheduleQuery.Res>>;

  export module PostMsgTest {
    export interface Req {
      /** 操作对象类型。bug */
      objectType?: string;
      /** 操作对象id */
      objectID?: number;
      /** 产品 */
      product?: string;
      /** 迭代 */
      project?: number;
      /** 操作人 */
      actor?: string;
      /** 操作。详见 action 枚举 */
      action?: string;
      /** 时间 */
      date?: string;
      /** 备注信息 */
      comment?: string;
    }
    export type Res = void;
  }

  /** 获取快答列表页产品分类列表 post /isd/workOrder/msg/test */
  function postMsgTest(req: ET<PostMsgTest.Req>, options?: object): Promise<ET<PostMsgTest.Res>>;

  export module PostCommonGetSecuritySign {
    export interface Req {
      /** 请求json串 */
      paramJson?: string;
    }
    export interface Res {
      /** appId */
      appId?: string;
      /** sign */
      sign?: string;
      /** 时间戳 */
      timeStamp?: number;
    }
  }

  /** 获取二级验证签名 post /common/getSecuritySign */
  function postCommonGetSecuritySign(req: ET<PostCommonGetSecuritySign.Req>, options?: object): Promise<ET<PostCommonGetSecuritySign.Res>>;

  export module GetTaxDeclare {
    export interface Req {
      /** 业务类型 */
      bizType: string;
      /** 业务透传参数 */
      param: string;
    }
    export type Res = any;
  }

  /** UC跳转业务透传 get /thirdService/tax/declare */
  function getTaxDeclare(req: ET<GetTaxDeclare.Req>, options?: object): Promise<ET<GetTaxDeclare.Res>>;

  export module GetOlAgentAssistanceGetFactorDict {
    export type ConsultFactorTypeDictResVO = {
      /** 类型 */
      factorType?: string;
      /** 名称 */
      factorName?: string;
      /** 选项类型，select-选择选项，input-输入选项 */
      optionType?: string;
      /** 最大选项个数，如果optionType为input，该字段为空 */
      maxSelect?: string;
      /** 要素项，如果optionType为input，该字段为空 */
      factorOptionList?: Array<ConsultFactorResVO>;
    };
    export type ConsultFactorResVO = {
      /** code */
      code?: string;
      /** 名称 */
      name?: string;
      /** 选中方式,以字典返回的时候，该字段为空，auto:自动选中；agentManual:座席手动选中；agentCancel:座席取消 */
      selectedWay?: string;
    };

    export interface Req {
      /** 问题类型 */
      questionType?: string;
    }
    export type Res = Array<ConsultFactorTypeDictResVO>;
  }

  /** 获取要素字典 get /olAgentAssistance/getFactorDict */
  function getOlAgentAssistanceGetFactorDict(req: ET<GetOlAgentAssistanceGetFactorDict.Req>, options?: object): Promise<ET<GetOlAgentAssistanceGetFactorDict.Res>>;

  export module PostExceptionSave {
    export type IsdExceptionSystemAndModuleVO = {
      /** 产品代码 */
      systemCode?: string;
      /** 产品名称 */
      systemName?: string;
      /** 模块列表 */
      moduleCodeList?: Array<IsdExceptionModuleVO>;
    };
    export type IsdExceptionModuleVO = {
      /** 模块代码 */
      moduleCode?: string;
      /** 模块名称 */
      moduleName?: string;
    };

    export interface Req {
      /** 地区代码列表 */
      locationCodeList?: Array<string>;
      /** 产品和代码列表 */
      systemAndModuleList?: Array<IsdExceptionSystemAndModuleVO>;
      /** 异常内容 */
      exceptionContent?: string;
    }
    export type Res = boolean;
  }

  /** 新增异常 post /isd/exception/save */
  function postExceptionSave(req: ET<PostExceptionSave.Req>, options?: object): Promise<ET<PostExceptionSave.Res>>;

  export module PostExceptionUpdate {
    export type IsdExceptionSystemAndModuleVO = {
      /** 产品代码 */
      systemCode?: string;
      /** 产品名称 */
      systemName?: string;
      /** 模块列表 */
      moduleCodeList?: Array<IsdExceptionModuleVO>;
    };
    export type IsdExceptionModuleVO = {
      /** 模块代码 */
      moduleCode?: string;
      /** 模块名称 */
      moduleName?: string;
    };

    export interface Req {
      /** id */
      id?: number;
      /** 地区代码列表 */
      locationCodeList?: Array<string>;
      /** 产品和代码列表 */
      systemAndModuleList?: Array<IsdExceptionSystemAndModuleVO>;
      /** 异常内容 */
      exceptionContent?: string;
    }
    export type Res = boolean;
  }

  /** 修改异常 post /isd/exception/update */
  function postExceptionUpdate(req: ET<PostExceptionUpdate.Req>, options?: object): Promise<ET<PostExceptionUpdate.Res>>;

  export module PostStatusUpdate {
    export interface Req {
      /** id */
      id?: number;
      /** 异常状态||inProgress:进行中;recovered:已恢复; */
      exceptionEnStatus?: string;
    }
    export type Res = boolean;
  }

  /** 修改异常状态 post /isd/exception/status/update */
  function postStatusUpdate(req: ET<PostStatusUpdate.Req>, options?: object): Promise<ET<PostStatusUpdate.Res>>;

  export module GetExceptionDetail {
    export type IsdExceptionSystemAndModuleVO = {
      /** 产品代码 */
      systemCode?: string;
      /** 产品名称 */
      systemName?: string;
      /** 模块列表 */
      moduleCodeList?: Array<IsdExceptionModuleVO>;
    };
    export type IsdExceptionModuleVO = {
      /** 模块代码 */
      moduleCode?: string;
      /** 模块名称 */
      moduleName?: string;
    };

    export interface Req {
      id: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 产品模块列表 */
      systemAndModuleList?: Array<IsdExceptionSystemAndModuleVO>;
      /** 地区代码列表 */
      locationCodeList?: Array<string>;
      /** 地区名称列表 */
      locationNameList?: Array<string>;
      /** 异常内容 */
      exceptionContent?: string;
    }
  }

  /** 查询异常详情 get /isd/exception/detail */
  function getExceptionDetail(req: ET<GetExceptionDetail.Req>, options?: object): Promise<ET<GetExceptionDetail.Res>>;

  export module PostExceptionDelete {
    export interface Req {
      /** id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 修改异常状态 post /isd/exception/delete */
  function postExceptionDelete(req: ET<PostExceptionDelete.Req>, options?: object): Promise<ET<PostExceptionDelete.Res>>;

  export module PostExceptionPage {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type IsdExceptionSystemAndModuleVO = {
      /** 产品代码 */
      systemCode?: string;
      /** 产品名称 */
      systemName?: string;
      /** 模块列表 */
      moduleCodeList?: Array<IsdExceptionModuleVO>;
    };
    export type IsdExceptionModuleVO = {
      /** 模块代码 */
      moduleCode?: string;
      /** 模块名称 */
      moduleName?: string;
    };
    export type IsdExceptionPageResVO = {
      /** id */
      id?: number;
      /** 产品模块列表 */
      systemAndModuleList?: Array<IsdExceptionSystemAndModuleVO>;
      /** 地区代码列表 */
      locationCodeList?: Array<string>;
      /** 地区名称列表 */
      locationNameList?: Array<string>;
      /** 异常内容 */
      exceptionContent?: string;
      /** 关注标志 */
      followFlag?: string;
      /** 异常状态||inProgress:进行中;recovered:已恢复; */
      exceptionEnStatus?: string;
      /** 异常状态名称||inProgress:进行中;recovered:已恢复; */
      exceptionEnStatusName?: string;
      /** 创建人ID */
      creatorId?: string;
      /** 创建人名称（异常跟进人） */
      creatorName?: string;
      /** 创建时间|格式：yyyy-MM-dd HH:mm:ss| */
      createDate?: string;
      /** 修改人ID */
      modifierId?: string;
      /** 修改人名称 */
      modifierName?: string;
      /** 修改时间|格式：yyyy-MM-dd HH:mm:ss| */
      modifyDate?: string;
      /** 异常开始时间|格式：yyyy-MM-dd HH:mm:ss| */
      startDate?: string;
      /** 异常结束时间|格式：yyyy-MM-dd HH:mm:ss| */
      endDate?: string;
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
      /** 创建人列表 */
      creatorIdList?: Array<string>;
      /** 产品模块列表 */
      systemAndModuleList?: Array<IsdExceptionSystemAndModuleVO>;
      /** 地区代码列表 */
      locationCodeList?: Array<string>;
      /** 搜索关键字|支持按异常id、异常内容搜索| */
      keyword?: string;
      /** 关注标志列表||Y:关注;N:未关注 */
      followFlagList?: Array<string>;
    }
    export interface Res {
      list?: Array<IsdExceptionPageResVO>;
      success?: boolean;
      errorContext?: ErrorContext;
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
    }
  }

  /** 分页查询异常 post /isd/exception/page */
  function postExceptionPage(req: ET<PostExceptionPage.Req>, options?: object): Promise<ET<PostExceptionPage.Res>>;

  export module GetServiceCheckExistSpecialServiceTable {
    export interface Req {
      /** 专项服务id */
      specialServiceId: number;
    }
    export interface Res {
      /** 是否存在记录,true则表示存在,false表示不存在 */
      existRecord?: boolean;
      /** 提示文案 */
      tip?: string;
    }
  }

  /** 校验任务表是否已存在 get /special/service/checkExistSpecialServiceTable */
  function getServiceCheckExistSpecialServiceTable(req: ET<GetServiceCheckExistSpecialServiceTable.Req>, options?: object): Promise<ET<GetServiceCheckExistSpecialServiceTable.Res>>;

  export module PostServiceUpdateSpecialServiceTable {
    export interface Req {
      /** 服务记录id */
      serviceRecordId: number;
      /** 信息传递附件ID */
      informationTransferAttachmentId: string;
      /** 材料附件IDS */
      materialAttachmentIds: string;
    }
    export type Res = boolean;
  }

  /** 更新专项服务记录 post /special/service/updateSpecialServiceTable */
  function postServiceUpdateSpecialServiceTable(req: ET<PostServiceUpdateSpecialServiceTable.Req>, options?: object): Promise<ET<PostServiceUpdateSpecialServiceTable.Res>>;

  export module GetServiceGetServiceSendBack {
    export type SpecialServiceSendBackResponse = {
      /** 服务记录id */
      serviceRecordId?: number;
      /** 业务编码| |01:专家版体检表;02:专家版问诊表;03:资产负债表;04:利润表;05:科目余额表;06:序时账;07:增值税纳税申报表;08:企业所得税申报表;09:个税申报表;10:问题检查表;11:抽证表;12:售前信息传递表;13:其他资料; */
      businessCode?: string;
      /** 退回原因 */
      sendBackReason?: string;
      /** 退回时间 */
      sendBackDate?: string;
    };

    export interface Req {
      /** 服务记录id */
      serviceRecordId: number;
    }
    export type Res = Array<SpecialServiceSendBackResponse>;
  }

  /** 查询服务记录退回原因 get /special/service/getServiceSendBack */
  function getServiceGetServiceSendBack(req: ET<GetServiceGetServiceSendBack.Req>, options?: object): Promise<ET<GetServiceGetServiceSendBack.Res>>;

  export module PostUniqueCheck {
    export type IsdExceptionSystemAndModuleVO = {
      /** 产品代码 */
      systemCode?: string;
      /** 产品名称 */
      systemName?: string;
      /** 模块列表 */
      moduleCodeList?: Array<IsdExceptionModuleVO>;
    };
    export type IsdExceptionModuleVO = {
      /** 模块代码 */
      moduleCode?: string;
      /** 模块名称 */
      moduleName?: string;
    };

    export interface Req {
      /** 地区代码列表 */
      locationCodeList: Array<string>;
      /** 产品模块列表 */
      systemAndModuleList: Array<IsdExceptionSystemAndModuleVO>;
      /** 异常状态||inProgress:进行中;recovered:已恢复; */
      exceptionEnStatus?: string;
    }
    export type Res = boolean;
  }

  /** 判断异常唯一性 post /isd/exception/unique/check */
  function postUniqueCheck(req: ET<PostUniqueCheck.Req>, options?: object): Promise<ET<PostUniqueCheck.Res>>;

  export module PostExceptionFollow {
    export interface Req {
      /** 接入类型||WechatWork:企业微信; */
      accessType?: string;
      /** 接入id.当接入类型为企业微信时，为主体id; */
      accessId?: string;
      /** 子接入id.当接入类型为企业微信时，为应用id; */
      subAccessId?: string;
      /** id */
      id?: number;
      /** 关注标志||Y:关注;N:未关注 */
      followFlag?: string;
    }
    export type Res = boolean;
  }

  /** 关注异常 post /isd/exception/follow */
  function postExceptionFollow(req: ET<PostExceptionFollow.Req>, options?: object): Promise<ET<PostExceptionFollow.Res>>;

  export module GetServiceQuestion {
    export type IsdExceptionSystemAndModuleVO = {
      /** 产品代码 */
      systemCode?: string;
      /** 产品名称 */
      systemName?: string;
      /** 模块列表 */
      moduleCodeList?: Array<IsdExceptionModuleVO>;
    };
    export type IsdExceptionModuleVO = {
      /** 模块代码 */
      moduleCode?: string;
      /** 模块名称 */
      moduleName?: string;
    };

    export interface Req {
      sessionId: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 产品模块列表 */
      systemAndModuleList?: Array<IsdExceptionSystemAndModuleVO>;
      /** 地区代码列表 */
      locationCodeList?: Array<string>;
      /** 地区名称列表 */
      locationNameList?: Array<string>;
      /** 异常内容 */
      exceptionContent?: string;
    }
  }

  /** 根据会话id查询问题单问题内容 get /isd/self/service/question */
  function getServiceQuestion(req: ET<GetServiceQuestion.Req>, options?: object): Promise<ET<GetServiceQuestion.Res>>;

  export module GetServiceGetAnswer {
    export type Answer = {
      /** 内容 */
      content?: string;
      /** 答案状态||error:流式读取过程中错误;outputing:输出中;time_out:超时;done:结束||no_answer; */
      status?: string;
      /** 模型版本||history_consult_qa_matchV1:历史咨询问答匹配;external_fmV1:外部大模型; */
      modelVersion?: string;
      inferenceProcedure?: string;
      /** 答案依据 */
      answerBasis?: string;
      /** 问题要素列表 */
      questionElementList?: Array<QuestionElement>;
      /** 第一个字返回的时间 */
      firstWordTime?: string;
      /** 完整的内容返回时间 */
      fullAnswerTime?: string;
      /** 提炼的问题，仅历史咨询问答匹配可能有值 */
      refineQuestion?: string;
      /** 推理过程 */
      reasoningProcess?: string;
      /** 要素展示标识 Y/N */
      factorShowFlag?: string;
      /** 要素 */
      factorList?: Array<ConsultFactorTypeResVO>;
      /** 标准问答列表 */
      standardQaList?: Array<StandardQaResVO>;
      /** 问题类型 */
      questionType?: string;
      /** 相似问 */
      recommendQaList?: Array<RecommendQaResVO>;
      /** 用户问 */
      userQuestion?: string;
      /** 规则类型：straightRule-强规则，softRule-弱规则,RAG-rag。详见{@link cn.com.servyou.consult.commons.constant.enums.llm.RobotLlmRuleTypeEnum} */
      ruleType?: string;
      /** 展示的更新属性 */
      displayUpdateResVO?: DisplayUpdateResVO;
    };
    export type QuestionElement = {
      /** 要素 */
      element?: string;
      /** 要素值 */
      elementValue?: string;
    };
    export type ConsultFactorTypeResVO = {
      /** 类型 */
      factorType?: string;
      /** 名称 */
      factorName?: string;
      /** 展示名称 */
      factorDisplayName?: string;
      /** 多选个数，-1表示全部可选。 */
      multipleChoicesValue?: number;
      /** 要素项 */
      factorOptionList?: Array<ConsultFactorResVO>;
    };
    export type StandardQaResVO = {
      /** 来源类型，非流式返回的兜底接口中，改字段会为空，流式rag兜底接口返回的值为亿企知道问答-standardQA，其他问答-otherQA，文档-document，政策-policy */
      source?: string;
      /** 标题id，source为standardQA和otherQA时是问题id，source为document时是文档id，source为policy时是政策id */
      titleId?: string;
      /** 标题，source为standardQA和otherQA是问题标题，source为document时是文档标题，source为policy时是政策标题 */
      title?: string;
      /** 内容id，source为standardQA和otherQA是答案id，source为document时是null，source为policy时是null */
      contentId?: string;
      /** 内容，source为otherQA是答案内容，source为document时是文档内容，source为policy时是政策内容，source为standardQA为null */
      content?: string;
      /** 问答的答案，source为standardQA时该字段才会有内容 */
      replyList?: Array<ReplyResponseVO>;
      /** 原文链接 */
      url?: string;
    };
    export type RecommendQaResVO = {
      /** 问题 */
      question?: string;
      /** 问题id */
      questionId?: string;
      /** 答案 */
      answer?: string;
    };
    export type DisplayUpdateResVO = {
      /** 模型版本 */
      modelVersion?: string;
      /** 选择的问题类型 */
      selectedQuestionType?: string;
      /** 识别出来的问题类型 */
      analyzedQuestionType?: string;
    };
    export type ConsultFactorResVO = {
      /** code */
      code?: string;
      /** 名称 */
      name?: string;
      /** 展示名称 */
      displayName?: string;
      /** 选中方式,以字典返回的时候，该字段为空，auto:自动选中；agentManual:座席手动选中；agentCancel:座席取消 */
      selectedWay?: string;
    };
    export type ReplyResponseVO = {
      /** 回答ID */
      id?: string;
      /** 问题回答 */
      reply?: string;
      /** 内部提示 */
      internalTips?: string;
      /** 维度列表 */
      dimensionList?: Array<ReplyDimensionResponseVO>;
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
    export type ReplyDimensionResponseVO = {
      /** 维度类型 */
      type?: string;
      /** 维度列表 */
      list?: Array<DimensionResponseVO>;
    };
    export type DimensionResponseVO = {
      /** 维度id */
      id?: string;
      /** 维度code */
      code?: string;
      /** 维度名称 */
      name?: string;
    };

    export interface Req {
      /** 大模型智库日志id */
      fmttLogId?: string;
      /** 当前受理组id */
      groupId?: number;
    }
    export interface Res {
      /** 大模型智库日志id */
      fmttLogId?: string;
      /** 结果。be_filtered:被过滤;internal_error:内部报错;success:成功; */
      result?: string;
      /** 答案 */
      answerList?: Array<Answer>;
    }
  }

  /** 获取答案 get /isd/self/service/getAnswer */
  function getServiceGetAnswer(req: ET<GetServiceGetAnswer.Req>, options?: object): Promise<ET<GetServiceGetAnswer.Res>>;

  export module PostServicePreGetAnswer {
    export type PreGetISDFmttAnswerResVO = {
      /** 大模型智库日志id */
      fmttLogId?: string;
      /** 结果。be_filtered:被过滤;internal_error:内部错误;success:成功，已通知大模型; */
      result?: string;
    };

    export interface Req {
      /** 快问会话id */
      sessionId?: string;
      /** 问题内容 */
      question?: string;
    }
    export interface Res {
      success?: boolean;
      message?: string;
      messageCode?: string;
      /** 请求id，用于调用链跟踪 */
      requestId?: string;
      data?: PreGetISDFmttAnswerResVO;
    }
  }

  /** 预获取答案 post /isd/self/service/preGetAnswer */
  function postServicePreGetAnswer(req: ET<PostServicePreGetAnswer.Req>, options?: object): Promise<ET<PostServicePreGetAnswer.Res>>;

  export module PostFactorClear {
    export interface Req {
      /** 大模型智库日志id */
      fmttLogId?: string;
    }
    export type Res = boolean;
  }

  /** 清空要素值 post /olAgentAssistance/factor/clear */
  function postFactorClear(req: ET<PostFactorClear.Req>, options?: object): Promise<ET<PostFactorClear.Res>>;

  export module GetServiceHasCreateWorkOrder {
    export interface Req {
      sessionId: string;
    }
    export type Res = boolean;
  }

  /** 根据会话id判断是否创建过工单id get /isd/self/service/hasCreateWorkOrder */
  function getServiceHasCreateWorkOrder(req: ET<GetServiceHasCreateWorkOrder.Req>, options?: object): Promise<ET<GetServiceHasCreateWorkOrder.Res>>;

  export module PostServiceVote {
    export interface Req {
      /** 快问会话id */
      sessionId?: string;
      /** 问题内容 */
      question: string;
      /** 来源||isd_card:快问卡片;isd_menu:快问菜单 */
      source: string;
      /** 地区维度 */
      location?: string;
      /** 产品维度 */
      brand?: string;
      /** 会员等级 */
      usertype?: string;
    }
    export interface Res {
      /** 快问自助服务预请求日志id */
      logId?: string;
      /** 结果。be_filtered:被过滤;internal_error:内部错误;success:成功，已通知大模型; */
      result?: string;
      /** 快问自助服务预请求日志id类型||qa_robot:问答机器人;robot_rag:机器人历史问答rag模型 */
      logIdType?: string;
    }
  }

  /** 预获取答案 post /isd/self/service/vote */
  function postServiceVote(req: ET<PostServiceVote.Req>, options?: object): Promise<ET<PostServiceVote.Res>>;

  export module GetServiceQueryVote {
    export interface Req {
      /** 快问会话id */
      sessionId?: string;
      /** 点赞:Y;点踩:N */
      like?: string;
    }
    export interface Res {
      /** 快问会话id */
      sessionId?: string;
      /** 点赞:Y;点踩:N */
      like?: string;
    }
  }

  /** 根据会话id查询点赞 get /isd/self/service/queryVote */
  function getServiceQueryVote(req: ET<GetServiceQueryVote.Req>, options?: object): Promise<ET<GetServiceQueryVote.Res>>;

  export module GetSystemAndModuleQuery {
    export type ISDSystemAndModuleQueryResVO = {
      /** 代码|目前为两级，父级为产品代码，子级为模块代码| */
      code?: string;
      /** 名称 */
      name?: string;
      /** 子级列表 */
      childrenList?: Array<ISDSystemAndModuleQueryResVO>;
    };

    export type Req = any;
    export type Res = Array<ISDSystemAndModuleQueryResVO>;
  }

  /** 查询自助服务产品和模块配置 get /isd/self/service/systemAndModule/query */
  function getSystemAndModuleQuery(req?: ET<GetSystemAndModuleQuery.Req>, options?: object): Promise<ET<GetSystemAndModuleQuery.Res>>;

  export module GetLocationQuery {
    export type LocationVO = {
      /** 地区编码（6位） */
      locationCode?: string;
      /** 地区名称 */
      locationName?: string;
    };

    export type Req = any;
    export type Res = Array<LocationVO>;
  }

  /** 查询自助服务搜索页面地区列表 get /isd/self/service/search/page/location/query */
  function getLocationQuery(req?: ET<GetLocationQuery.Req>, options?: object): Promise<ET<GetLocationQuery.Res>>;

  export module PostCarbonCopyUserSet {
    export interface Req {
      /** 禅道工单id */
      zentaoWorkOrderId?: number;
      /** 工单抄送人TrueId列表 */
      carbonCopyTrueIdList?: Array<string>;
    }
    export type Res = void;
  }

  /** 设置工单抄送人 post /isd/workOrder/carbonCopyUser/set */
  function postCarbonCopyUserSet(req: ET<PostCarbonCopyUserSet.Req>, options?: object): Promise<ET<PostCarbonCopyUserSet.Res>>;

  export module PostAnswerList {
    export type HistoryAnswerResVO = {
      autoAnswerList?: Array<HistoryAnswerFmttLogResVO>;
      manualAnswerList?: Array<HistoryAnswerFmttLogResVO>;
    };
    export type HistoryAnswerFmttLogResVO = {
      /** 答案fmttLogId */
      fmttLogId?: string;
      /** 答案时间戳 */
      answerTime?: number;
    };

    export interface Req {
      /** 在线咨询msgId */
      msgId: string;
    }
    export type Res = Array<HistoryAnswerResVO>;
  }

  /** 历史答案列表 post /olAgentAssistance/history/answer/list */
  function postAnswerList(req: ET<PostAnswerList.Req>, options?: object): Promise<ET<PostAnswerList.Res>>;

  export module PostAnswerSend {
    export interface Req {
      /** 在线咨询msgId */
      msgId: string;
      /** fmttLogId */
      fmttLogId?: string;
    }
    export type Res = boolean;
  }

  /** 历史答案发送 post /olAgentAssistance/history/answer/send */
  function postAnswerSend(req: ET<PostAnswerSend.Req>, options?: object): Promise<ET<PostAnswerSend.Res>>;

  export module PostAnswerType {
    export interface Req {
      /** 在线咨询msgId */
      msgId: string;
      /** fmttLogId */
      fmttLogId?: string;
    }
    export type Res = string;
  }

  /** 答案类型 post /olAgentAssistance/history/answer/type */
  function postAnswerType(req: ET<PostAnswerType.Req>, options?: object): Promise<ET<PostAnswerType.Res>>;

  export module PostViewLast {
    export interface Req {
      /** 在线咨询msgId */
      msgId: string;
    }
    export interface Res {
      /** 上次查看停留答案fmttLogId */
      lastViewFmttLogId?: string;
      /** 上次查看停留答案技术路线straightRule-强规则，softRule-弱规则，RAG-RAG */
      lastViewRuleType?: string;
      /** 上次查看停留答案类型auto自动,manual手动 */
      lastViewAnswerType?: string;
    }
  }

  /** 上次查看停留答案 post /olAgentAssistance/history/answer/view/last */
  function postViewLast(req: ET<PostViewLast.Req>, options?: object): Promise<ET<PostViewLast.Res>>;

  export module PostViewSave {
    export interface Req {
      /** 当前查看停留答案fmttLogId */
      viewFmttLogId?: string;
      /** 当前查看停留答案技术路线straightRule-强规则，softRule-弱规则，RAG-RAG */
      viewRuleType?: string;
      /** 当前查看停留答案类型auto自动,manual手动 */
      viewAnswerType?: string;
    }
    export type Res = boolean;
  }

  /** 保存当前查看停留答案信息 post /olAgentAssistance/history/answer/view/save */
  function postViewSave(req: ET<PostViewSave.Req>, options?: object): Promise<ET<PostViewSave.Res>>;

  export module GetChatAnalysisResultDetail {
    export interface Req {
      id?: number;
    }
    export interface Res {
      /** ID */
      id?: number;
      /** 会话分析任务ID */
      chatAnalysisTaskId?: number;
      /** 咨询日志ID */
      logId?: string;
      /** 机器人咨询ID */
      consultSId?: string;
      /** 云上标准企业id */
      cloudCompanyId?: number;
      /** 企业名称 */
      companyName?: string;
      /** 云上机构id */
      cloudAgencyId?: number;
      /** 机构名称 */
      agencyName?: string;
      /** 手机号码 */
      mobile?: string;
      /** 用户名 */
      userName?: string;
      /** 坐席员工账户中心ID */
      agentTrueId?: string;
      /** 机构姓名 */
      agentName?: string;
      /** 责任田负责人员工账户中心ID */
      responsibleManagerTrueId?: string;
      /** 责任田负责人名称 */
      responsibleManagerName?: string;
      /** 咨询内容 */
      consultContent?: string;
      /** 咨询结束日期|1小时以内显示“具体分钟+前”；1~24小时（左闭右开），显示“4小时前”；24~48小时（左闭右闭）显示“昨天+时间（到分）”；大于48小时，显示格式 yyyy-MM-dd HH:mm:ss| */
      consultEndDate?: string;
      /** 意图推测 */
      intentionSpeculate?: string;
      /** 意图推测总结 */
      intentionSpeculateSummary?: string;
      /** 跟进状态（英文）||followed_up:我已跟进;no_follow_up:无需跟进; */
      followEnStatus?: string;
      /** 跟进子状态（英文）||useful:有用;useless:无用; */
      followSubEnStatus?: string;
      /** 跟进时间 */
      followTime?: string;
      /** 跟进人账户中心员工ID */
      followerTrueId?: string;
      /** 创建人ID */
      creatorId?: string;
      /** 修改人ID */
      modifierId?: string;
      /** 录入日期 */
      createDate?: string;
      /** 修改日期 */
      modifyDate?: string;
    }
  }

  /** 查询ISD会话分析任务结果详情 get /isd/chatAnalysisResult/detail */
  function getChatAnalysisResultDetail(req: ET<GetChatAnalysisResultDetail.Req>, options?: object): Promise<ET<GetChatAnalysisResultDetail.Res>>;

  export module PostChatAnalysisResultPage {
    export interface Req {
      /** ID */
      id?: number;
      /** 跟进状态（英文）||followed_up:我已跟进;no_follow_up:无需跟进; */
      followEnStatus?: string;
      /** 跟进子状态（英文）||useful:有用;useless:无用; */
      followSubEnStatus?: string;
    }
    export type Res = boolean;
  }

  /** 跟进ISD会话分析任务结果 post /isd/chatAnalysisResult/follow */
  function postChatAnalysisResultPage(req: ET<PostChatAnalysisResultPage.Req>, options?: object): Promise<ET<PostChatAnalysisResultPage.Res>>;

  export module PostManageCancelDeliverySchedule {
    export interface Req {
      /** 服务专家id */
      id: number;
      /** 是否爽约 */
      isCancel: boolean;
      /** 原因 */
      remark: string;
    }
    export type Res = boolean;
  }

  /** 撤回交付排期 post /expert/schedule/manage/cancelDeliverySchedule */
  function postManageCancelDeliverySchedule(req: ET<PostManageCancelDeliverySchedule.Req>, options?: object): Promise<ET<PostManageCancelDeliverySchedule.Res>>;

  export module GetManageDeliveryScheduleDetail {
    export interface Req {
      /** 专家窗口排期id */
      expertScheduleId: number;
    }
    export interface Res {
      /** 服务排期id */
      serviceScheduleId?: number;
      /** 服务专家id */
      serviceExpertId?: number;
      /** 专家名字 */
      expertName?: string;
      /** 服务日期 */
      serviceDate?: string;
      /** 时段类型(英文)||am:上午;pm:下午 */
      periodEnType?: string;
      /** 时段类型名称 */
      periodEnTypeName?: string;
      /** 窗口状态||0:未确认;1:可预约;2:已预排;3:待确认;4:已确认;5:已完成;6:不可预约; */
      status?: string;
      /** 服务客户记录id */
      serviceCustomerId?: number;
      /** 企业ID */
      customerId?: string;
      /** 企业名称 */
      customerName?: string;
      /** 代理机构名称 */
      agencyName?: string;
      /** 企业地址 */
      customerAddress?: string;
      /** 机构地址 */
      agencyAddress?: string;
      /** 备注 */
      remark?: string;
    }
  }

  /** 交付排期详情 get /expert/schedule/manage/deliveryScheduleDetail */
  function getManageDeliveryScheduleDetail(req: ET<GetManageDeliveryScheduleDetail.Req>, options?: object): Promise<ET<GetManageDeliveryScheduleDetail.Res>>;

  export module GetManageDetail {
    export interface Req {
      /** 服务专家id */
      id: number;
    }
    export interface Res {
      /** id */
      id?: number;
      /** 专家账号 */
      expertAccount?: string;
      /** 专家名字 */
      expertName?: string;
      /** 账户中心员工ID */
      trueId?: string;
      /** 地区代码集合 */
      locationCodes?: string;
      /** 地区名称列表 */
      locationNameList?: Array<string>;
      /** 停止交付日期起 时间格式 yyyy-MM-dd */
      stopDeliveryStartDate?: string;
      /** 停止交付日期止 时间格式 yyyy-MM-dd */
      stopDeliveryEndDate?: string;
      /** 状态||0:正常交付;1:停止交付 */
      status?: number;
      /** 状态名称 */
      statusName?: string;
      /** 备注 */
      remark?: string;
      /** 更新时间 */
      modifyDate?: string;
    }
  }

  /** 服务专家详情 get /expert/schedule/manage/detail */
  function getManageDetail(req: ET<GetManageDetail.Req>, options?: object): Promise<ET<GetManageDetail.Res>>;

  export module PostManageExpertScheduleAppointment {
    export interface Req {
      /** 服务专家id */
      id: number;
      /** 操作类型： 1:可预约; 2:不可预约 */
      operationType: string;
      /** 备注原因 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 专家排期可约/不可约操作 post /expert/schedule/manage/expertScheduleAppointment */
  function postManageExpertScheduleAppointment(req: ET<PostManageExpertScheduleAppointment.Req>, options?: object): Promise<ET<PostManageExpertScheduleAppointment.Res>>;

  export module GetManageGetDeliveryScheduleList {
    export type DeliveryScheduleListResVO = {
      /** id */
      id?: number;
      /** 专家账号 */
      expertAccount?: string;
      /** 专家名字 */
      expertName?: string;
      /** 账户中心员工ID */
      trueId?: string;
      /** 地区代码集合 */
      locationCodes?: string;
      /** 地区名称列表 */
      locationNameList?: Array<string>;
      /** 停止交付日期起 时间格式 yyyy-MM-dd */
      stopDeliveryStartDate?: string;
      /** 停止交付日期止 时间格式 yyyy-MM-dd */
      stopDeliveryEndDate?: string;
      /** 状态||0:正常交付;1:停止交付 */
      status?: number;
      /** 状态名称 */
      statusName?: string;
      /** 备注 */
      remark?: string;
      /** 专家排期窗口列表 */
      serviceDateList?: Array<ExpertServiceDateVO>;
    };
    export type ExpertServiceDateVO = {
      /** 服务日期 */
      serviceDate?: string;
      /** 专家排期列表 */
      expertScheduleList?: Array<ExpertScheduleVO>;
    };
    export type ExpertScheduleVO = {
      /** 专家排期id */
      id?: number;
      /** 服务专家id */
      serviceExpertId?: number;
      /** 服务日期 */
      serviceDate?: string;
      /** 时段类型(英文)||am:上午;pm:下午 */
      periodEnType?: string;
      /** 状态||0:未确认;1:可预约;2:已预排;3:待确认;4:已确认;5:已完成;6:不可预约; */
      status?: string;
      /** 关闭原因 */
      closeReason?: string;
      /** 排期记录详情 */
      CustomerSchedule?: CustomerScheduleVO;
    };
    export type CustomerScheduleVO = {
      /** 企业预约记录id */
      id?: number;
      /** 客户名称 */
      customerName?: string;
      /** 代理机构名称 */
      agencyName?: string;
    };

    export interface Req {
      /** 服务日期开始 */
      serviceDateStart?: string;
      /** 服务日期结束 */
      serviceDateEnd?: string;
      /** 账户中心员工ID列表 */
      trueIdList?: Array<string>;
      /** 地区代码集合 */
      locationCodeList?: Array<string>;
    }
    export type Res = Array<DeliveryScheduleListResVO>;
  }

  /** 交付排期列表 post /expert/schedule/manage/queryDeliveryScheduleList */
  function getManageGetDeliveryScheduleList(req: ET<GetManageGetDeliveryScheduleList.Req>, options?: object): Promise<ET<GetManageGetDeliveryScheduleList.Res>>;

  export module PostManageOperationServiceExpert {
    export interface Req {
      /** id */
      id?: number;
      /** 专家账号 */
      expertAccount: string;
      /** 专家名字 */
      expertName: string;
      /** 账户中心员工ID */
      trueId: string;
      /** 地区代码集合 */
      locationCodes: string;
      /** 停止交付日期起 时间格式 yyyy-MM-dd */
      stopDeliveryStartDate?: string;
      /** 停止交付日期止 时间格式 yyyy-MM-dd */
      stopDeliveryEndDate?: string;
      /** 状态||0:正常交付;1:停止交付 */
      status?: number;
      /** 备注 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 维护专家信息 post /expert/schedule/manage/operationServiceExpert */
  function postManageOperationServiceExpert(req: ET<PostManageOperationServiceExpert.Req>, options?: object): Promise<ET<PostManageOperationServiceExpert.Res>>;

  export module GetCommonClassifyList {
    export type TypeClassifyListDTO = {
      /** 分类类型：0:咨询范围，1:擅长行业，2:咨询地区，3:服务方式，4:专家问诊咨询范围，5:专家问诊擅长行业，6:专家问诊咨询地区，7:专家问诊服务方式，8:岗责，9:专家问诊所属大区,10:加油包适用地区，11:专家问诊擅长领域，12:财税智能助理主题地区，13:对内服务数字化产品池，14:对内服务数字化地区 */
      type?: string;
      /** 分类列表 */
      list?: Array<ClassifyDTO>;
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
      /** 是否展示:Y是，N否 */
      showFlag?: string;
      /** parentId : ${父级目录id} */
      parentId?: number;
      /** isDel : ${是否删除} */
      isDel?: string;
      /** creator : ${创建人trueid} */
      creator?: string;
      /** createTime : ${发布时间} */
      createTime?: string;
      /** lastModifier : ${最后修改人trueId} */
      lastModifier?: string;
      /** lastModifyTime : ${最后修改时间} */
      lastModifyTime?: string;
      /** 子节点列表 */
      children?: Array<ClassifyDTO>;
    };

    export interface Req {
      /** 类型,多个逗号分隔 */
      types: string;
    }
    export type Res = Array<TypeClassifyListDTO>;
  }

  /** 分类查询 get /common/classify/list */
  function getCommonClassifyList(req: ET<GetCommonClassifyList.Req>, options?: object): Promise<ET<GetCommonClassifyList.Res>>;

  export module GetManageCustomerScheduleRecordPage {
    export type CustomerScheduleRecordResVO = {
      /** 预约记录id */
      id?: number;
      /** 服务专家id */
      serviceExpertId?: number;
      /** 专家名字 */
      expertName?: string;
      /** 服务排期id */
      serviceScheduleId?: number;
      /** 服务客户id */
      serviceCustomerId?: number;
      /** 地区代码 */
      locationCode?: string;
      /** 地区名称 */
      locationName?: string;
      /** 企业名称 */
      customerName?: string;
      /** 代理机构名称 */
      agencyName?: string;
      /** 交付日期 */
      serviceDate?: string;
      /** 项目开始日期 */
      projectStartDate?: string;
      /** 项目结束日期 */
      projectEndDate?: string;
      /** 交付状态||0:未开始;1:进行中;2:已完成 */
      status?: string;
      /** 交付状态名称 */
      statusName?: string;
      /** 窗口状态||0:未确认;1:可预约;2:已预排;3:待确认;4:已确认;5:已完成;6:不可预约; */
      expertScheduleStatus?: string;
      /** 窗口状态名称 */
      expertScheduleStatusName?: string;
      /** 合同开始日期 */
      contractStartDate?: string;
      /** 合同结束日期 */
      contractEndDate?: string;
      /** 备注 */
      remark?: string;
      /** 进度code */
      scheduleCode?: string;
      /** 进度名称 */
      scheduleName?: string;
    };

    export interface Req {
      /** 服务专家trueId */
      trueId?: string;
      /** 地区代码 */
      locationCode?: string;
      /** 企业名称 */
      customerName?: string;
      /** 代理机构名称 */
      agencyName?: string;
      /** 合同开始日期起 */
      contractStartDateStart?: string;
      /** 合同开始日期止 */
      contractStartDateEnd?: string;
      /** 交付状态||0:未开始;1:进行中;2:已完成 */
      status?: string;
      /** 交付日期开始 */
      serviceDateStart?: string;
      /** 交付日期结束 */
      serviceDateEnd?: string;
      /** 窗口状态||0:未确认;1:可预约;2:已预排;3:待确认;4:已确认;5:已完成;6:不可预约; */
      expertScheduleStatus?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<CustomerScheduleRecordResVO>;
    }
  }

  /** 已排期分页列表 get /expert/schedule/manage/customerScheduleRecordPage */
  function getManageCustomerScheduleRecordPage(req: ET<GetManageCustomerScheduleRecordPage.Req>, options?: object): Promise<ET<GetManageCustomerScheduleRecordPage.Res>>;

  export module PostManageBatchCloseProject {
    export interface Req {
      /** 企业预约记录id列表 */
      idList: Array<number>;
    }
    export type Res = boolean;
  }

  /** 批量结项 post /expert/schedule/manage/batchCloseProject */
  function postManageBatchCloseProject(req: ET<PostManageBatchCloseProject.Req>, options?: object): Promise<ET<PostManageBatchCloseProject.Res>>;

  export module PostManageBatchStartProject {
    export interface Req {
      /** 企业预约记录id列表 */
      idList: Array<number>;
      /** 所属计划 */
      plan: number;
      /** 所属迭代 */
      project: number;
    }
    export type Res = boolean;
  }

  /** 批量开项 post /expert/schedule/manage/batchStartProject */
  function postManageBatchStartProject(req: ET<PostManageBatchStartProject.Req>, options?: object): Promise<ET<PostManageBatchStartProject.Res>>;

  export module PostManageUpdateDeliverySchedule {
    export interface Req {
      /** 当前窗口排期id */
      serviceScheduleId: number;
      /** 状态||0:未确认;1:可预约;2:已预排;3:待确认;4:已确认;5:已完成;6:不可预约; */
      status?: string;
      /** 企业地址 */
      customerAddress?: string;
      /** 机构地址 */
      agencyAddress?: string;
      /** 备注 */
      remark?: string;
      /** 操作类型: 0:正常修改; 1:重置成未排期; 2:调整窗口; 3:交换窗口; */
      type: string;
      /** 新窗口排期id */
      newServiceScheduleId?: number;
    }
    export type Res = boolean;
  }

  /** 修改交付排期 post /expert/schedule/manage/updateDeliverySchedule */
  function postManageUpdateDeliverySchedule(req: ET<PostManageUpdateDeliverySchedule.Req>, options?: object): Promise<ET<PostManageUpdateDeliverySchedule.Res>>;

  export module PostManageReplaceDeliverySchedule {
    export interface Req {
      /** 当前窗口排期id */
      serviceScheduleId: number;
      /** 新窗口排期id */
      newServiceScheduleId: number;
    }
    export type Res = boolean;
  }

  /** 调整窗口 post /expert/schedule/manage/replaceDeliverySchedule */
  function postManageReplaceDeliverySchedule(req: ET<PostManageReplaceDeliverySchedule.Req>, options?: object): Promise<ET<PostManageReplaceDeliverySchedule.Res>>;

  export module PostManageSaveDeliverySchedule {
    export interface Req {
      /** 服务专家id */
      serviceExpertId: number;
      /** 服务排期id */
      serviceScheduleId: number;
      /** 服务企业id */
      serviceCustomerId: number;
      /** 企业地址 */
      customerAddress?: string;
      /** 机构地址 */
      agencyAddress?: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 保存交付排期 post /expert/schedule/manage/saveDeliverySchedule */
  function postManageSaveDeliverySchedule(req: ET<PostManageSaveDeliverySchedule.Req>, options?: object): Promise<ET<PostManageSaveDeliverySchedule.Res>>;

  export module PostRecordPage {
    export type SortRule = {
      field?: string;
      order?: string;
    };
    export type CustomerUnScheduleRecordResVO = {
      /** 未排期主键ID */
      id?: number;
      /** 企业名称 */
      customerName?: string;
      /** 企业id */
      customerId?: string;
      /** 代理机构名称 */
      agencyName?: string;
      /** 代理机构id */
      cloudAgencyId?: string;
      /** 地区代码 */
      locationCode?: string;
      /** 地区名称 */
      locationName?: string;
      /** 合同开始日期 */
      contractStartDate?: string;
      /** 合同结束日期 */
      contractEndDate?: string;
      /** 打款日期 */
      payDate?: string;
      /** 成单人 */
      orderCreater?: string;
      /** 商品定价 */
      orderAmount?: number;
      /** 二层交付老师 */
      serviceExportList?: Array<SpecialServiceRoleModelVO>;
      /** 二层交付状态 */
      scheduleCode?: string;
      /** 二层交付状态名称 */
      scheduleName?: string;
      /** 爽约次数 */
      cancelAppointmentNum?: number;
      /** 备注 */
      remark?: string;
      /** 是否包含二层 */
      serviceRecordFlag?: boolean;
      /** 二层交付角色分配ID */
      serviceRoleRecordId?: number;
      /** 二层交付进度ID */
      serviceScheduleId?: number;
      /** 二层任务ID */
      serviceRecordId?: number;
    };
    export type SpecialServiceRoleModelVO = {
      /** TrueId */
      trueId?: string;
      /** 名称 */
      userName?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      queryCount?: boolean;
      sortRuleList?: Array<SortRule>;
      /** 地区代码 */
      locationCode?: string;
      /** 企业名称 */
      customerName?: string;
      /** 代理机构名称 */
      agencyName?: string;
      /** 爽约次数最小 */
      cancelAppointmentNumMin?: number;
      /** 爽约次数最大 */
      cancelAppointmentNumMax?: number;
      /** 是否包含二层 */
      serviceRecordFlag?: boolean;
      /** 合同开始日期起 */
      contractStartDateStart?: string;
      /** 合同开始日期止 */
      contractStartDateEnd?: string;
      /** 合同结束日期起 */
      contractEndDateStart?: string;
      /** 合同结束日期止 */
      contractEndDateEnd?: string;
      /** 二层交付状态 */
      scheduleCode?: string;
      /** 打款日期开始 */
      payDateStart?: string;
      /** 打款日期结束 */
      payDateEnd?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<CustomerUnScheduleRecordResVO>;
    }
  }

  /** 未排期分页列表 post /expert/schedule/manage/un/schedule/record/page */
  function postRecordPage(req: ET<PostRecordPage.Req>, options?: object): Promise<ET<PostRecordPage.Res>>;

  export module PostEditRemark {
    export interface Req {
      /** 未排期主键ID */
      id?: number;
      /** 企业简称 */
      customerShortName?: string;
      /** 机构简称 */
      agencySimpleName?: string;
      /** 客户地址 */
      customerAddress?: string;
      /** 机构地址 */
      agencyAddress?: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 未排期记录修改备注 post /expert/schedule/manage/un/schedule/record/edit/remark */
  function postEditRemark(req: ET<PostEditRemark.Req>, options?: object): Promise<ET<PostEditRemark.Res>>;

  export module PostEditRole {
    export type SpecialServiceRoleModelVO = {
      /** TrueId */
      trueId?: string;
      /** 名称 */
      userName?: string;
    };

    export interface Req {
      /** 未排期主键ID */
      id?: number;
      /** 专项记录id */
      serviceRecordId?: number;
      /** 二层交付老师 */
      serviceExportList?: Array<SpecialServiceRoleModelVO>;
    }
    export type Res = boolean;
  }

  /** 未排期记录修改角色分配 post /expert/schedule/manage/un/schedule/record/edit/role */
  function postEditRole(req: ET<PostEditRole.Req>, options?: object): Promise<ET<PostEditRole.Res>>;

  export module PostEditSchedule {
    export interface Req {
      /** 未排期主键ID */
      id?: number;
      /** 专项记录id */
      serviceRecordId?: number;
      /** 进度code */
      scheduleCode: string;
      /** 进度主导人TrueId */
      scheduleDominatorTrueId: string;
      /** 上一进度完成时间，格式：yyyy-MM-dd */
      previousScheduleFinishDate: string;
      /** 备注 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 未排期记录修改进度状态 post /expert/schedule/manage/un/schedule/record/edit/schedule */
  function postEditSchedule(req: ET<PostEditSchedule.Req>, options?: object): Promise<ET<PostEditSchedule.Res>>;

  export module GetCustomerInfoQuery {
    export type IsdChatAnalysisCustomerInfoQueryResVO = {
      /** 云上标准企业id */
      cloudCompanyId?: number;
      /** 企业名称 */
      companyName?: string;
      /** 云上机构id */
      cloudAgencyId?: number;
      /** 机构名称 */
      agencyName?: string;
      /** 手机号码 */
      mobile?: string;
      /** 用户名 */
      userName?: string;
    };

    export interface Req {
      /** 企业名称 */
      companyName?: string;
      /** 机构名称 */
      agencyName?: string;
      /** 用户名称 */
      userName?: string;
    }
    export type Res = Array<IsdChatAnalysisCustomerInfoQueryResVO>;
  }

  /** 根据名称查询用户信息 get /isd/chatAnalysisResult/customerInfo/query */
  function getCustomerInfoQuery(req: ET<GetCustomerInfoQuery.Req>, options?: object): Promise<ET<GetCustomerInfoQuery.Res>>;

  export module PostManageExpertPageList {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type SpecialServiceExpertResVO = {
      /** id */
      id?: number;
      /** 专家账号 */
      expertAccount?: string;
      /** 专家名字 */
      expertName?: string;
      /** 账户中心员工ID */
      trueId?: string;
      /** 地区代码集合 */
      locationCodeList?: Array<string>;
      /** 地区名称列表 */
      locationNameList?: Array<string>;
      /** 停止交付日期起 时间格式 yyyy-MM-dd */
      stopDeliveryStartDate?: string;
      /** 停止交付日期止 时间格式 yyyy-MM-dd */
      stopDeliveryEndDate?: string;
      /** 状态||0:正常交付;1:停止交付 */
      status?: string;
      /** 状态名称 */
      statusName?: string;
      /** 备注 */
      remark?: string;
      /** 更新时间 */
      modifyDate?: string;
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
      /** 专家 账户中心员工ID列表 */
      trueIdList?: Array<string>;
      /** 地区代码集合 */
      locationCodeList?: Array<string>;
      /** 状态||0:正常交付;1:停止交付 */
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
      list?: Array<SpecialServiceExpertResVO>;
    }
  }

  /** 排期专家分页列表 post /expert/schedule/manage/expertPageList */
  function postManageExpertPageList(req: ET<PostManageExpertPageList.Req>, options?: object): Promise<ET<PostManageExpertPageList.Res>>;

  export module GetExpertScheduleManageGetDeliveryScheduleList {
    export type DeliveryScheduleListResVO = {
      /** id */
      id?: number;
      /** 专家账号 */
      expertAccount?: string;
      /** 专家名字 */
      expertName?: string;
      /** 账户中心员工ID */
      trueId?: string;
      /** 地区代码集合 */
      locationCodes?: string;
      /** 地区名称列表 */
      locationNameList?: Array<string>;
      /** 停止交付日期起 时间格式 yyyy-MM-dd */
      stopDeliveryStartDate?: string;
      /** 停止交付日期止 时间格式 yyyy-MM-dd */
      stopDeliveryEndDate?: string;
      /** 状态||0:正常交付;1:停止交付 */
      status?: number;
      /** 状态名称 */
      statusName?: string;
      /** 备注 */
      remark?: string;
      /** 专家排期窗口列表 */
      serviceDateList?: Array<ExpertServiceDateVO>;
    };
    export type ExpertServiceDateVO = {
      /** 服务日期 */
      serviceDate?: string;
      /** 状态||0:正常交付;1:停止交付 */
      serviceDateStatus?: number;
      /** 专家排期列表 */
      expertScheduleList?: Array<ExpertScheduleVO>;
    };
    export type ExpertScheduleVO = {
      /** 专家排期id */
      id?: number;
      /** 服务专家id */
      serviceExpertId?: number;
      /** 服务日期 */
      serviceDate?: string;
      /** 时段类型(英文)||am:上午;pm:下午 */
      periodEnType?: string;
      /** 状态||0:未确认;1:可预约;2:已预排;3:待确认;4:已确认;5:已完成;6:不可预约; */
      status?: string;
      /** 关闭原因 */
      closeReason?: string;
      /** 排期记录详情 */
      customerSchedule?: CustomerScheduleVO;
    };
    export type CustomerScheduleVO = {
      /** 企业预约记录id */
      id?: number;
      /** 客户名称 */
      customerName?: string;
      /** 代理机构名称 */
      agencyName?: string;
    };

    export interface Req {
      /** 服务日期开始 */
      serviceDateStart?: string;
      /** 服务日期结束 */
      serviceDateEnd?: string;
      /** 账户中心员工ID列表 */
      trueIdList?: Array<string>;
      /** 地区代码集合 */
      locationCodeList?: Array<string>;
    }
    export type Res = Array<DeliveryScheduleListResVO>;
  }

  /** 交付排期列表 get /expert/schedule/manage/getDeliveryScheduleList */
  function getExpertScheduleManageGetDeliveryScheduleList(req: ET<GetExpertScheduleManageGetDeliveryScheduleList.Req>, options?: object): Promise<ET<GetExpertScheduleManageGetDeliveryScheduleList.Res>>;

  export module GetManageQueryProjectSimpleInfo {
    export type ProjectSimpleInfoResVO = {
      /** 迭代id */
      id?: number;
      /** 迭代名字 */
      name?: string;
      /** 迭代代码 */
      code?: string;
    };

    export type Req = any;
    export type Res = Array<ProjectSimpleInfoResVO>;
  }

  /** 查询产品下的迭代 get /expert/schedule/manage/queryProjectSimpleInfo */
  function getManageQueryProjectSimpleInfo(req?: ET<GetManageQueryProjectSimpleInfo.Req>, options?: object): Promise<ET<GetManageQueryProjectSimpleInfo.Res>>;

  export module GetManageQueryPlanSimpleInfo {
    export type PlanSimpleInfoResVO = {
      /** 计划id */
      id?: number;
      /** 所属产品 */
      product?: number;
      /** 父计划 */
      parent?: number;
      /** 标题 */
      title?: string;
      /** 开始日期 */
      begin?: string;
      /** 结束日期 */
      end?: string;
    };

    export type Req = any;
    export type Res = Array<PlanSimpleInfoResVO>;
  }

  /** 查询产品下的计划 get /expert/schedule/manage/queryPlanSimpleInfo */
  function getManageQueryPlanSimpleInfo(req?: ET<GetManageQueryPlanSimpleInfo.Req>, options?: object): Promise<ET<GetManageQueryPlanSimpleInfo.Res>>;

  export module PostManageCustomerScheduleRecordPage {
    export type SortRule = {
      field?: string;
      order?: string;
    };
    export type CustomerScheduleRecordResVO = {
      /** 预约记录id */
      id?: number;
      /** 服务专家id */
      serviceExpertId?: number;
      /** 专家名字 */
      expertName?: string;
      /** 服务排期id */
      serviceScheduleId?: number;
      /** 服务客户id */
      serviceCustomerId?: number;
      /** 地区代码 */
      locationCode?: string;
      /** 地区名称 */
      locationName?: string;
      /** 企业名称 */
      customerName?: string;
      /** 代理机构名称 */
      agencyName?: string;
      /** 交付日期 */
      serviceDate?: string;
      /** 项目开始日期 */
      projectStartDate?: string;
      /** 项目结束日期 */
      projectEndDate?: string;
      /** 交付状态||0:未开始;1:进行中;2:已完成 */
      status?: string;
      /** 交付状态名称 */
      statusName?: string;
      /** 窗口状态||0:未确认;1:可预约;2:已预排;3:待确认;4:已确认;5:已完成;6:不可预约; */
      expertScheduleStatus?: string;
      /** 窗口状态名称 */
      expertScheduleStatusName?: string;
      /** 合同开始日期 */
      contractStartDate?: string;
      /** 合同结束日期 */
      contractEndDate?: string;
      /** 备注 */
      remark?: string;
      /** 进度code */
      scheduleCode?: string;
      /** 进度名称 */
      scheduleName?: string;
    };

    export interface Req {
      pageIndex?: number;
      pageSize?: number;
      queryCount?: boolean;
      sortRuleList?: Array<SortRule>;
      /** 服务专家trueId */
      trueIdList?: Array<string>;
      /** 地区代码集合 */
      locationCodeList?: Array<string>;
      /** 企业名称 */
      customerName?: string;
      /** 代理机构名称 */
      agencyName?: string;
      /** 合同开始日期起 */
      contractStartDateStart?: string;
      /** 合同开始日期止 */
      contractStartDateEnd?: string;
      /** 交付状态||0:未开始;1:进行中;2:已完成 */
      status?: string;
      /** 交付日期开始 */
      serviceDateStart?: string;
      /** 交付日期结束 */
      serviceDateEnd?: string;
      /** 窗口状态||0:未确认;1:可预约;2:已预排;3:待确认;4:已确认;5:已完成;6:不可预约; */
      expertScheduleStatus?: string;
    }
    export interface Res {
      pageIndex?: number;
      pageSize?: number;
      total?: number;
      list?: Array<CustomerScheduleRecordResVO>;
    }
  }

  /** 已排期分页列表 post /expert/schedule/manage/customerScheduleRecordPage */
  function postManageCustomerScheduleRecordPage(req: ET<PostManageCustomerScheduleRecordPage.Req>, options?: object): Promise<ET<PostManageCustomerScheduleRecordPage.Res>>;

  export module PostIsdChatAnalysisResultPage {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type PageResultIsdChatAnalysisResultQueryResVO = {
      list?: Array<IsdChatAnalysisResultQueryResVO>;
      success?: boolean;
      errorContext?: ErrorContext;
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
    };
    export type IsdChatAnalysisResultFollowStatusCntResVO = {
      /** 跟进状态（英文）||not_follow_up:未跟进;followed_up:我已跟进;no_need_follow_up:无需跟进; */
      followEnStatus?: string;
      /** 数量 */
      cnt?: number;
    };
    export type IsdChatAnalysisResultQueryResVO = {
      /** 云上标准企业id */
      cloudCompanyId?: number;
      /** 企业名称 */
      companyName?: string;
      /** 云上机构id */
      cloudAgencyId?: number;
      /** 机构名称 */
      agencyName?: string;
      /** 手机号码 */
      mobile?: string;
      /** 用户名 */
      userName?: string;
      /** ID */
      id?: number;
      /** 坐席员工账户中心ID */
      agentTrueId?: string;
      /** 坐席姓名 */
      agentName?: string;
      /** 责任田负责人员工账户中心ID */
      responsibleManagerTrueId?: string;
      /** 责任田负责人名称 */
      responsibleManagerName?: string;
      /** 咨询内容 */
      consultContent?: string;
      /** 咨询结束日期 */
      consultEndDate?: string;
      /** 处理后的意图列表 */
      handleIntentionList?: Array<IsdChatAnalysisResultIntentionVO>;
      /** 意图推测总结 */
      intentionSpeculateSummary?: string;
      /** 跟进状态（英文）||not_follow_up:未跟进;followed_up:我已跟进;no_need_follow_up:无需跟进; */
      followEnStatus?: string;
      /** 跟进子状态（英文）||useful:有用;useless:无用; */
      followSubEnStatus?: string;
      /** 跟进时间 */
      followTime?: string;
      /** 跟进人账户中心员工ID */
      followerTrueId?: string;
      /** 创建人ID */
      creatorId?: string;
      /** 修改人ID */
      modifierId?: string;
      /** 录入日期 */
      createDate?: string;
      /** 修改日期 */
      modifyDate?: string;
    };
    export type ErrorContext = {
      errorCode?: string;
      errorMessage?: string;
      detailMessage?: string;
      isBusinessError?: boolean;
    };
    export type IsdChatAnalysisResultIntentionVO = {
      key?: string;
      value?: string;
      /** 命中标识||Y:命中;N:未命中 */
      hitFlag?: string;
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
      /** 手机号 */
      mobileList?: Array<number>;
      /** 云上客户ID列表 */
      cloudCompanyId?: Array<number>;
      /** 云上机构ID */
      cloudAgencyId?: Array<number>;
      /** 跟进状态列表||not_follow_up:未跟进;followed_up:我已跟进;no_need_follow_up:无需跟进; */
      followEnStatusList?: Array<string>;
    }
    export interface Res {
      /** 会话分析结果列表 */
      isdChatAnalysisResultPageResult?: PageResultIsdChatAnalysisResultQueryResVO;
      /** 会话跟进状态统计结果 */
      isdChatAnalysisResultFollowStatusCntRes?: Array<IsdChatAnalysisResultFollowStatusCntResVO>;
    }
  }

  /** 分页ISD会话分析任务结果 post /isd/chatAnalysisResult/page */
  function postIsdChatAnalysisResultPage(req: ET<PostIsdChatAnalysisResultPage.Req>, options?: object): Promise<ET<PostIsdChatAnalysisResultPage.Res>>;

  export module GetScheduleMsg {
    export interface Req {
      message: string;
    }
    export type Res = boolean;
  }

  /** get /expert/schedule/manage/un/schedule/msg */
  function getScheduleMsg(req: ET<GetScheduleMsg.Req>, options?: object): Promise<ET<GetScheduleMsg.Res>>;

  export module PostServiceSave {
    export interface Req {
      /** 大模型智库日志id */
      fmttLogId?: string;
      /** 会话id */
      sessionId?: string;
      /** 问题单内容 */
      question: string;
    }
    export interface Res {
      /** 大模型智库日志id */
      fmttLogId?: string;
    }
  }

  /** 获取大模型答案 post /isd/self/service/save */
  function postServiceSave(req: ET<PostServiceSave.Req>, options?: object): Promise<ET<PostServiceSave.Res>>;

  export module GetExceptionExceptionStatistic {
    export type IsdExceptionStatisticResVO = {
      /** 异常统计数量 */
      exceptionCountNum?: number;
      /** 异常状态||inProgress:进行中;recovered:已恢复; */
      exceptionEnStatus?: string;
    };

    export interface Req {
      /** 创建人truId */
      creatorTrueId?: string;
      /** 异常状态||inProgress:进行中;recovered:已恢复; */
      exceptionEnStatusList?: Array<string>;
    }
    export type Res = Array<IsdExceptionStatisticResVO>;
  }

  /** 异常数量统计 get /isd/exception/exceptionStatistic */
  function getExceptionExceptionStatistic(req: ET<GetExceptionExceptionStatistic.Req>, options?: object): Promise<ET<GetExceptionExceptionStatistic.Res>>;

  export module PostOlAgentAssistanceAnalyzeChat {
    export interface Req {
      /** 会话id */
      msgId?: string;
    }
    export type Res = boolean;
  }

  /** 分析会话 post /olAgentAssistance/analyzeChat */
  function postOlAgentAssistanceAnalyzeChat(req: ET<PostOlAgentAssistanceAnalyzeChat.Req>, options?: object): Promise<ET<PostOlAgentAssistanceAnalyzeChat.Res>>;

  export module GetOlAgentAssistanceChatAnalyzeResultList {
    export type ChatAnalyzeResultResVO = {
      /** 会话id */
      msgId?: string;
      /** 手里座席 */
      agentList?: Array<string>;
      /** 咨询开始时间 */
      consultStartDate?: string;
      /** 咨询时长，单位：秒 */
      consultTime?: number;
      /** 会话总结分析状态，执行中-loading，成功-success，失败-failure */
      taskStatus?: string;
      /** 分析结果 */
      resultList?: Array<ChatAnalyzeResultContent>;
    };
    export type ChatAnalyzeResultContent = {
      /** 问题 */
      question?: string;
      /** 答案 */
      answer?: string;
    };

    export interface Req {
      /** 用户手机号 */
      mobile?: string;
      /** 当前会话id */
      nowMsgId?: number;
    }
    export interface Res {
      /** 转接前会话结果 */
      transferResult?: ChatAnalyzeResultResVO;
      /** 当日查询结果 */
      todayResultList?: Array<ChatAnalyzeResultResVO>;
    }
  }

  /** 会话分析结果列表，由于只查当天的数据，因此不做分页 get /olAgentAssistance/chatAnalyzeResultList */
  function getOlAgentAssistanceChatAnalyzeResultList(req: ET<GetOlAgentAssistanceChatAnalyzeResultList.Req>, options?: object): Promise<ET<GetOlAgentAssistanceChatAnalyzeResultList.Res>>;

  export module PostOlAgentAssistanceCacheAuoCoverFlag {
    export interface Req {
      /** 自动覆盖标识，true-自动覆盖；false-不自动覆盖 */
      auoCoverFlag: boolean;
    }
    export type Res = boolean;
  }

  /** 缓存自动覆盖标识 post /olAgentAssistance/cacheAuoCoverFlag */
  function postOlAgentAssistanceCacheAuoCoverFlag(req: ET<PostOlAgentAssistanceCacheAuoCoverFlag.Req>, options?: object): Promise<ET<PostOlAgentAssistanceCacheAuoCoverFlag.Res>>;

  export module PostExpertCount {
    export interface Req {
      /** 日期开始 */
      expertDateStart?: string;
      /** 日期结束 */
      expertDateEnd?: string;
    }
    export type Res = number;
  }

  /** 未排期记录修改进度状态 post /expert/schedule/manage/un/schedule/batch/expert/count */
  function postExpertCount(req: ET<PostExpertCount.Req>, options?: object): Promise<ET<PostExpertCount.Res>>;

  export module PostMarkDivide {
    export interface Req {
      /** 标记业务ID未排期列表ID 或者 排期列表ID */
      businessId?: Array<number>;
      /** 分工类型 */
      divideType?: string;
      customerScheduleType?: string;
    }
    export type Res = boolean;
  }

  /** 标记分工标记 post /expert/schedule/manage/mark/divide */
  function postMarkDivide(req: ET<PostMarkDivide.Req>, options?: object): Promise<ET<PostMarkDivide.Res>>;

  export module PostExpertScheduleManageUnScheduleBatchPreExpertSchedule {
    export type CustomerUnScheduleBatchPreExpertScheduleErrorResVO = {
      /** 未排期企业ID */
      serviceCustomerId?: number;
      /** 未排期企业详情名称  地区--机构--企业 */
      serviceCustomerDetailName?: string;
    };

    export interface Req {
      /** 日期开始 */
      expertDateStart?: string;
      /** 日期结束 */
      expertDateEnd?: string;
      /** 优先归属地区 */
      precedenceLocation?: boolean;
      /** 限制交付地区 */
      restrictedDeliveryLocation?: boolean;
      /** 优先二层老师 */
      precedenceServiceExport?: boolean;
      /** 单天可交付数量 */
      deliveryNumOfSingleDay?: number;
      /** 单老师可交付数量 */
      deliveryNum?: number;
      /** 优先企业名称 */
      precedenceCustomerName?: string;
      /** 优先机构名称 */
      precedenceAgencyName?: string;
      /** 打款日期排序 :asc desc */
      payTimeOrderSort?: string;
      /** 爽约次数排序 :asc desc */
      cancelAppointmentNumOrderSort?: string;
    }
    export interface Res {
      /** 排期成功企业数 */
      scheduleSuccessNum?: number;
      /** 排期失败企业数 */
      scheduleErrorNum?: number;
      preExpertScheduleErrorList?: Array<CustomerUnScheduleBatchPreExpertScheduleErrorResVO>;
    }
  }

  /** 未排期企业批量预排 post /expert/schedule/manage/un/schedule/batch/pre/expert/schedule */
  function postExpertScheduleManageUnScheduleBatchPreExpertSchedule(req: ET<PostExpertScheduleManageUnScheduleBatchPreExpertSchedule.Req>, options?: object): Promise<ET<PostExpertScheduleManageUnScheduleBatchPreExpertSchedule.Res>>;

  export module PostSearchCustomer {
    export type OptionResponse = {
      /** ID */
      id?: string;
      /** 名称 */
      name?: string;
    };

    export interface Req {
      /** 客户类型。0-企业；1-机构 */
      customerType: string;
      /** 关键字 */
      keyword?: string;
    }
    export type Res = Array<OptionResponse>;
  }

  /** 未排期企业批量预排企业机构查询 post /expert/schedule/manage/un/schedule/batch/expert/search/customer */
  function postSearchCustomer(req: ET<PostSearchCustomer.Req>, options?: object): Promise<ET<PostSearchCustomer.Res>>;

  export module PostManageBatchNoDelivery {
    export interface Req {
      /** 未排期ID列表 */
      idList?: Array<number>;
      /** 无需交付原因code */
      noDeliveryReasonCode: string;
      /** 无需交付原因详情 */
      noDeliveryReasonDetail?: string;
    }
    export type Res = boolean;
  }

  /** 批量无需交付 post /expert/schedule/manage/batchNoDelivery */
  function postManageBatchNoDelivery(req: ET<PostManageBatchNoDelivery.Req>, options?: object): Promise<ET<PostManageBatchNoDelivery.Res>>;

  export module PostManageCancelNoDelivery {
    export interface Req {
      /** 无需交付客户id */
      id: number;
    }
    export type Res = boolean;
  }

  /** 撤回--无需交付 post /expert/schedule/manage/cancelNoDelivery */
  function postManageCancelNoDelivery(req: ET<PostManageCancelNoDelivery.Req>, options?: object): Promise<ET<PostManageCancelNoDelivery.Res>>;

  export module PostAnswerView {
    export interface Req {
      /** 在线咨询msgId */
      msgId: string;
      /** fmttLogId */
      fmttLogId?: string;
    }
    export interface Res {
      /** 当前查看停留答案fmttLogId */
      viewFmttLogId?: string;
      /** 当前查看停留答案类型knowledge:知识检索｜answer:答案 */
      viewAnswerType?: string;
      /** 当前查看停留答案的生成时间 */
      answerTime?: number;
    }
  }

  /** 缓存自动覆盖标识 post /olAgentAssistance/knowledge/history/answer/view */
  function postAnswerView(req: ET<PostAnswerView.Req>, options?: object): Promise<ET<PostAnswerView.Res>>;

  export module PostOlAgentAssistanceKnowledgeHistoryAnswerViewSave {
    export interface Req {
      /** 在线咨询msgId */
      msgId?: string;
      /** 当前查看停留答案fmttLogId */
      viewFmttLogId?: string;
      /** 当前查看停留答案类型knowledge:知识检索｜answer:答案 */
      viewAnswerType?: string;
      /** 当前查看停留答案的生成时间 */
      answerTime?: number;
    }
    export type Res = boolean;
  }

  /** 缓存自动覆盖标识 post /olAgentAssistance/knowledge/history/answer/view/save */
  function postOlAgentAssistanceKnowledgeHistoryAnswerViewSave(req: ET<PostOlAgentAssistanceKnowledgeHistoryAnswerViewSave.Req>, options?: object): Promise<ET<PostOlAgentAssistanceKnowledgeHistoryAnswerViewSave.Res>>;

  export module GetRecordList {
    export type ConsultRecordResponse = {
      /** 记录ID */
      recordId?: string;
      /** 数据来源||online:咨询记录，incall:来电记录, expert:专家咨询记录 */
      dataSource?: string;
      /** 咨询场景 */
      consultScene?: string;
      /** 咨询方式 */
      consultWay?: string;
      /** 咨询时间 */
      consultTime?: string;
      /** 咨询人 */
      consultUserName?: string;
      /** 咨询手机号 */
      mobile?: string;
      /** 咨询的客户ID */
      customerId?: string;
      /** 解决状态名称 */
      solutionStatusName?: string;
      /** 满意状态名称 */
      satisfactionStatusName?: string;
      /** 运营动作跟进情况 */
      operationActionFollowRecord?: string;
      /** 咨询内容 */
      consultContent?: string;
    };

    export interface Req {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 调用的场景码（后端会根据场景码配置返回的要显示的字段） */
      sceneCode?: string;
      /** 客户id */
      customerId?: string;
      /** 手机号 */
      mobile?: string;
      /** 咨询开始时间 */
      startTime?: string;
      /** 咨询结束时间 */
      endTime?: string;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<ConsultRecordResponse>;
    }
  }

  /** 查询咨询记录列表（在线+来电+专家） get /consult/record/list */
  function getRecordList(req: ET<GetRecordList.Req>, options?: object): Promise<ET<GetRecordList.Res>>;

  export module GetBusinessMsg {
    export type Req = any;
    export type Res = any;
  }

  /** get /expert/schedule/manage/self/business/msg */
  function getBusinessMsg(req?: ET<GetBusinessMsg.Req>, options?: object): Promise<ET<GetBusinessMsg.Res>>;

  export module PostSearchExpert {
    export type OptionResponse = {
      /** ID */
      id?: string;
      /** 名称 */
      name?: string;
    };

    export interface Req {
      /** 关键字 */
      keyword?: string;
    }
    export type Res = Array<OptionResponse>;
  }

  /** 未排期企业批量预排老师查询 post /expert/schedule/manage/un/schedule/batch/expert/search/expert */
  function postSearchExpert(req: ET<PostSearchExpert.Req>, options?: object): Promise<ET<PostSearchExpert.Res>>;

  export module GetCommonQueryOptionsSort {
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
    export type Res = Array<OptionResultResponse>;
  }

  /** 批量获取枚举选项信息接口（排序） get /common/queryOptionsSort */
  function getCommonQueryOptionsSort(req: ET<GetCommonQueryOptionsSort.Req>, options?: object): Promise<ET<GetCommonQueryOptionsSort.Res>>;

  export module GetManageExecuteExpertScheduleStatusData {
    export type Req = any;
    export type Res = boolean;
  }

  /** get /expert/schedule/manage/executeExpertScheduleStatusData */
  function getManageExecuteExpertScheduleStatusData(req?: ET<GetManageExecuteExpertScheduleStatusData.Req>, options?: object): Promise<ET<GetManageExecuteExpertScheduleStatusData.Res>>;

  export module PostManageBatchCancelSchedule {
    export interface Req {
      /** 企业ID列表 */
      customerInfoIdList?: Array<number>;
      /** 撤回排期类型列表||draft:底稿排期;delivery:交付排期 */
      cancelScheduleEnTypeList?: Array<string>;
      /** 专家窗口ID列表 */
      expertScheduleIdList?: Array<number>;
      /** 企业排期记录ID列表 */
      customerScheduleRecordIdList?: Array<number>;
      /** 是否爽约 */
      isCancel?: boolean;
      /** 原因 */
      remark?: string;
    }
    export type Res = boolean;
  }

  /** 批量撤回排期 post /expert/schedule/manage/batchCancelSchedule */
  function postManageBatchCancelSchedule(req: ET<PostManageBatchCancelSchedule.Req>, options?: object): Promise<ET<PostManageBatchCancelSchedule.Res>>;

  export module PostDraftScheduleRecordPage {
    export type Req = any;
    export type Res = any;
  }

  /** post /expert/schedule/manage/customer/draftScheduleRecord/page */
  function postDraftScheduleRecordPage(req?: ET<PostDraftScheduleRecordPage.Req>, options?: object): Promise<ET<PostDraftScheduleRecordPage.Res>>;

  export module PostPapersScheduleRecordPage {
    export type SortRule = {
      /** 排序字段 */
      field?: string;
      /** 排序顺序：ASC-正序 DESC-降序 */
      order?: string;
    };
    export type CustomerPapersScheduleRecordPageResVO = {
      /** 预约记录id */
      id?: number;
      /** 专家名字 */
      expertNameList?: Array<string>;
      /** 地区代码 */
      locationCode?: string;
      /** 地区名称 */
      locationName?: string;
      /** 企业名称 */
      customerName?: string;
      /** 代理机构名称 */
      agencyName?: string;
      /** 企业简称 */
      customerShortName?: string;
      /** 机构简称 */
      agencySimpleName?: string;
      /** 客户地址 */
      customerAddress?: string;
      /** 机构地址 */
      agencyAddress?: string;
      /** 底稿开始日期 */
      papersStartDate?: string;
      /** 底稿结束日期 */
      papersEndDate?: string;
      /** 底稿窗口数量 */
      papersWindowNum?: number;
      /** 底稿状态||0:未开始;1:进行中;2:已完成 */
      papersStatus?: string;
      /** 底稿状态名称 */
      papersStatusName?: string;
      /** 窗口状态||0:未确认;1:可预约;2:已预排;3:待确认;4:已确认;5:已完成;6:不可预约; */
      expertScheduleStatus?: string;
      /** 窗口状态名称 */
      expertScheduleStatusName?: string;
      /** 一层任务进度code */
      scheduleCode?: string;
      /** 进度名称 */
      scheduleName?: string;
      /** 分工类型||机构交付:agencyDelivery;亿企赢交付:yqyDelivery */
      divideType?: string;
      /** 分工类型名称 */
      divideTypeName?: string;
      /** 底稿开项日期 */
      projectStartDate?: string;
      /** 底稿结项日期 */
      projectEndDate?: string;
      /** 已排交付标志 */
      deliveryScheduleFlag?: boolean;
      /** 来源类型|| joint_business:联营订单;self_business:自营订单; */
      sourceEnType?: string;
      /** 来源类型名称 */
      sourceEnTypeName?: string;
      /** 初始化状态||字典special_service_compliance_status的code */
      initializeStatus?: string;
      /** 初始化状态名称 */
      initializeStatusName?: string;
      /** 最新结账月，格式为yyyy-MM */
      newlyClosedPeriod?: string;
      /** 底稿备注 */
      papersRemark?: string;
      /** 合同开始日期，格式为yyyy-MM-dd */
      contractStartDate?: string;
      /** 合同结束日期，格式为yyyy-MM-dd */
      contractEndDate?: string;
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
      /** 服务专家trueId列表 */
      trueIdList?: Array<string>;
      /** 地区代码集合 */
      locationCodeList?: Array<string>;
      /** 企业名称 */
      customerName?: string;
      /** 代理机构名称 */
      agencyName?: string;
      /** 底稿状态||0:未开始;1:进行中;2:已完成 */
      papersStatus?: string;
      /** 底稿开始日期比较符||moreThan:大于;lessThan:小于;equal:等于 */
      papersStartDateOperator?: string;
      /** 底稿结束日期比较符||moreThan:大于;lessThan:小于;equal:等于 */
      papersEndDateOperator?: string;
      /** 底稿开始日期 */
      papersStartDate?: string;
      /** 底稿结束日期 */
      papersEndDate?: string;
      /** 窗口状态||0:未确认;1:可预约;2:已预排;3:待确认;4:已确认;5:已完成;6:不可预约; */
      expertScheduleStatus?: string;
      /** 分工类型||值为空:deliveryIsNull;机构交付:agencyDelivery;亿企赢交付:yqyDelivery */
      divideType?: string;
      /** 来源类型|| joint_business:联营订单;self_business:自营订单; */
      sourceEnType?: string;
      /** 初始化状态||字典special_service_compliance_status的code；值为空时:initializeStatusIsNull; */
      initializeStatus?: string;
      /** 最新结账月起 */
      newlyClosedPeriodStart?: string;
      /** 最新结账月止 */
      newlyClosedPeriodEnd?: string;
      /** 是否已排交付||true:已排;false:未排 */
      deliveryScheduleFlag?: boolean;
    }
    export interface Res {
      /** 当前页号 */
      pageIndex?: number;
      /** 每页显示条数 */
      pageSize?: number;
      /** 总条数 */
      total?: number;
      /** 返回结果集 */
      list?: Array<CustomerPapersScheduleRecordPageResVO>;
    }
  }

  /** 分页查询底稿企业列表 post /expert/schedule/manage/customer/papersScheduleRecord/page */
  function postPapersScheduleRecordPage(req: ET<PostPapersScheduleRecordPage.Req>, options?: object): Promise<ET<PostPapersScheduleRecordPage.Res>>;

  export module PostManageSaveExpertCustomerSchedule {
    export type CustomerInfoScheduleSaveReqVO = {
      /** 服务企业ID | 客户表主键ID */
      serviceCustomerId?: number;
      /** 企业排期业务状态: unSchedule:未排期; schedulePapers:已排底稿; scheduleDelivery:已排交付; */
      customerScheduleStatus?: string;
      /** 企业地址 */
      customerAddress?: string;
      /** 机构地址 */
      agencyAddress?: string;
      /** 企业备注 */
      remark?: string;
    };

    export interface Req {
      /** 服务窗口排期id */
      serviceScheduleId: number;
      /** 窗口排期类型||delivery:交付; papers:底稿 */
      scheduleEnType: string;
      /** 排期客户列表 */
      customerScheduleList?: Array<CustomerInfoScheduleSaveReqVO>;
    }
    export type Res = boolean;
  }

  /** 窗口新增企业 post /expert/schedule/manage/saveExpertCustomerSchedule */
  function postManageSaveExpertCustomerSchedule(req: ET<PostManageSaveExpertCustomerSchedule.Req>, options?: object): Promise<ET<PostManageSaveExpertCustomerSchedule.Res>>;

  export module GetManageCheckExistSchedule {
    export interface Req {
      /** 服务企业ID列表 | 客户表主键ID */
      serviceCustomerIdList?: Array<number>;
    }
    export type Res = boolean;
  }

  /** 撤回底稿排期校验是否有已排交付的企业 post /expert/schedule/manage/checkExistSchedule */
  function getManageCheckExistSchedule(req: ET<GetManageCheckExistSchedule.Req>, options?: object): Promise<ET<GetManageCheckExistSchedule.Res>>;

  export module GetTaxCategoryCodeQueryTaxCategoryCode {
    export type QueryTaxCategoryCodeResVO = {
      /** 商品名 */
      tradeName?: string;
      /** 商品简称 */
      tradeShortName?: string;
      /** 税收分类编码 */
      taxCategoryCode?: string;
      /** 说明 */
      descriptions?: string;
      /** 聊天记录 */
      chatContent?: string;
      /** 人工聊天记录id */
      msgId?: string;
    };

    export interface Req {
      /** 商品名 */
      tradeName?: string;
    }
    export type Res = Array<QueryTaxCategoryCodeResVO>;
  }

  /** 查询税收分类编码 get /taxCategoryCode/queryTaxCategoryCode */
  function getTaxCategoryCodeQueryTaxCategoryCode(req: ET<GetTaxCategoryCodeQueryTaxCategoryCode.Req>, options?: object): Promise<ET<GetTaxCategoryCodeQueryTaxCategoryCode.Res>>;

  export module PostConsulttaskruletodoOnlineCreateTodo {
    export interface Req {
      /** 待办类型 */
      todoType: string;
      /** 执行方 */
      executeParty: string;
      /** 客户类型 */
      customerType: string;
      /** 客户id */
      customerId: string;
      /** 咨询产品大类 */
      consultCpdl: string;
      /** 联系人 */
      contactsName?: string;
      /** 联系电话 */
      contactsPhone?: string;
      /** 任务描述 */
      taskDescription?: string;
    }
    export type Res = number;
  }

  /** 创建待办(在线咨询一户式创建待办) post /consulttaskruletodo/online/create/todo */
  function postConsulttaskruletodoOnlineCreateTodo(req: ET<PostConsulttaskruletodoOnlineCreateTodo.Req>, options?: object): Promise<ET<PostConsulttaskruletodoOnlineCreateTodo.Res>>;

  export module PostConsulttaskruletodoIncallCreateTodo {
    export interface Req {
      /** 待办类型 */
      todoType: string;
      /** 执行方 */
      executeParty: string;
      /** 客户类型 */
      customerType: string;
      /** 客户id */
      customerId: string;
      /** 咨询产品大类 */
      consultCpdl: string;
      /** 联系人 */
      contactsName?: string;
      /** 联系电话 */
      contactsPhone?: string;
      /** 任务描述 */
      taskDescription?: string;
    }
    export type Res = number;
  }

  /** 创建待办（来电弹屏创建待办） post /consulttaskruletodo/incall/create/todo */
  function postConsulttaskruletodoIncallCreateTodo(req: ET<PostConsulttaskruletodoIncallCreateTodo.Req>, options?: object): Promise<ET<PostConsulttaskruletodoIncallCreateTodo.Res>>;

  export module PostConsulttaskruletodoCallbackCreateTodo {
    export interface Req {
      /** 待办类型 */
      todoType: string;
      /** 执行方 */
      executeParty: string;
      /** 客户类型 */
      customerType: string;
      /** 客户id */
      customerId: string;
      /** 咨询产品大类 */
      consultCpdl: string;
      /** 联系人 */
      contactsName?: string;
      /** 联系电话 */
      contactsPhone?: string;
      /** 任务描述 */
      taskDescription?: string;
    }
    export type Res = number;
  }

  /** 创建待办(回电补录创建待办) post /consulttaskruletodo/callback/create/todo */
  function postConsulttaskruletodoCallbackCreateTodo(req: ET<PostConsulttaskruletodoCallbackCreateTodo.Req>, options?: object): Promise<ET<PostConsulttaskruletodoCallbackCreateTodo.Res>>;

  export module PostAutoList {
    export type KnowledgeViewHistoryAnswerResVO = {
      /** 当前查看停留答案fmttLogId */
      viewFmttLogId?: string;
      /** 当前查看停留答案类型knowledge:知识检索｜answer:答案 */
      viewAnswerType?: string;
      /** 当前查看停留答案的生成时间 */
      clientTime?: number;
    };

    export interface Req {
      /** 在线咨询msgId */
      msgId: string;
      /** fmttLogId */
      fmttLogId?: string;
    }
    export type Res = Array<KnowledgeViewHistoryAnswerResVO>;
  }

  /** 知识检索自动列表 post /olAgentAssistance/knowledge/history/answer/auto/list */
  function postAutoList(req: ET<PostAutoList.Req>, options?: object): Promise<ET<PostAutoList.Res>>;

  export module PostConsulttaskruletodoOutCreateTodo {
    export interface Req {
      /** 客户类型：4-个人，0-企业，1-机构，2-个代 */
      customerType?: string;
      /** 客户id（企业传32位云下企业id，机构和个代传long类型的云上id） */
      customerId?: string;
      /** 客户云上云下标志：true是云上，false是云下 */
      customerCloudFlag?: boolean;
      /** 客户是否标准标志：true是标准，false是非标 */
      customerStandardFlag?: boolean;
      /** 联系人 */
      contactsName?: string;
      /** 联系电话 */
      contactsPhone?: string;
      /** 任务描述 */
      taskDescription?: string;
      /** 业务方唯一id（关联使用，非必填） */
      businessId?: string;
    }
    export interface Res {
      /** 匹配结果状态||true:成功，false：失败 */
      status?: boolean;
      /** 失败原因 */
      reason?: string;
      /** 命中的规则 */
      ruleId?: number;
      /** 匹配记录日志ID */
      recordId?: number;
    }
  }

  /** 创建待办(迁帐预约创建待办) post /consulttaskruletodo/out/create/todo */
  function postConsulttaskruletodoOutCreateTodo(req: ET<PostConsulttaskruletodoOutCreateTodo.Req>, options?: object): Promise<ET<PostConsulttaskruletodoOutCreateTodo.Res>>;

  export module PostVoiceGetOlVoice2Text {
    export type GetOlVoice2TextResVO = {
      /** 结果文本 */
      resultText?: string;
      /** 语音长度-ms */
      audioDuration?: number;
    };

    export interface Req {
      /** 语音文件路径 */
      recordingAddress: string;
      /** 业务类型 */
      businessType: string;
      /** businessId */
      businessId: string;
      /** 子业务类型id */
      subBusinessId?: string;
      /** 场景 */
      scene: string;
    }
    export interface Res {
      success?: boolean;
      message?: string;
      messageCode?: string;
      /** 请求id，用于调用链跟踪 */
      requestId?: string;
      data?: GetOlVoice2TextResVO;
    }
  }

  /** 获取在线咨询语音转文本。如果已转换过，则直接返回结果。如果未转换过，则进行转换并返回结果。 post /voice/getOlVoice2Text */
  function postVoiceGetOlVoice2Text(req: ET<PostVoiceGetOlVoice2Text.Req>, options?: object): Promise<ET<PostVoiceGetOlVoice2Text.Res>>;

  export module GetAgencySearchNonCloudAgency {
    export type AgencySearchResponse = {
      /** 机构id（32位） */
      id?: string;
      /** 机构名称 */
      fullName?: string;
      /** 代理类型 1-中介机构，2-个人代理 */
      groupType?: string;
      /** 机构代码 */
      agencyCode?: string;
      /** 分子公司代码 */
      branchCode?: string;
      /** 状态 1-正常，2-注销 */
      status?: string;
      /** 状态名称 */
      statusMc?: string;
      /** 机构id */
      agencyId?: number;
      /** 行政区划代码 */
      xzqhDm?: string;
      /** 行政区划名称 */
      xzqhMc?: string;
    };

    export interface Req {
      /** 查询内容。模糊查询-客户名称；精确匹配-代码，税号，手机号。若内容空则查询结果为空 */
      keyword?: string;
      /** 分子公司代码 */
      branchCode?: string;
    }
    export type Res = Array<AgencySearchResponse>;
  }

  /** 搜索机构（云下） get /agency/searchNonCloudAgency */
  function getAgencySearchNonCloudAgency(req: ET<GetAgencySearchNonCloudAgency.Req>, options?: object): Promise<ET<GetAgencySearchNonCloudAgency.Res>>;

  export module PostCompanyCheckTemporaryCompanyConfig {
    export type Req = Array<string>;
    export type Res = boolean;
  }

  /** 查询企业税号是否在临时企业配置中 post /company/checkTemporaryCompanyConfig */
  function postCompanyCheckTemporaryCompanyConfig(req: ET<PostCompanyCheckTemporaryCompanyConfig.Req>, options?: object): Promise<ET<PostCompanyCheckTemporaryCompanyConfig.Res>>;

  export module GetCustomerCenterSearchRegionCustomerByContent {
    export type SearchCustomerResponse = {
      /** 机构id（32位） */
      id?: string;
      /** 机构名称 */
      agencyFullName?: string;
      /** 机构代码 */
      agencyCode?: string;
      /** 企业名称 */
      companyFullName?: string;
      /** 企业税号 */
      companyTaxNO?: string;
      /** 客户类型||1单位客户；2中介机构 */
      customerType?: string;
    };

    export interface Req {
      /** 省直单地区编码 */
      provinceCityAreaCodeList?: Array<string>;
      /** 客户类型||1单位客户；2中介机构 */
      customerType?: string;
      /** 搜索内容 */
      content?: string;
    }
    export type Res = Array<SearchCustomerResponse>;
  }

  /** 根据关键信息检索大区内的客户 get /customerCenter/searchRegionCustomerByContent */
  function getCustomerCenterSearchRegionCustomerByContent(req: ET<GetCustomerCenterSearchRegionCustomerByContent.Req>, options?: object): Promise<ET<GetCustomerCenterSearchRegionCustomerByContent.Res>>;

  export module GetCommonQueryLocationCode {
    export interface Req {
      /** 员工账户中心id */
      trueId: string;
    }
    export type Res = string;
  }

  /** 获取用户所属地区 get /common/queryLocationCode */
  function getCommonQueryLocationCode(req: ET<GetCommonQueryLocationCode.Req>, options?: object): Promise<ET<GetCommonQueryLocationCode.Res>>;
}
export default API;
