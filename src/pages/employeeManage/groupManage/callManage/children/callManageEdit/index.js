import React, { useEffect, useState } from "react";
import "./index.scss";
import qs from "qs";
import {
  Form,
  message,
  Input,
  Row,
  Col,
  Select,
  Radio,
  InputNumber,
  Button,
  Loading,
  TreeSelect,
  Modal,
} from "dpl-react";
import Api from "@/request/api-callcentermanage";
import { get, post } from "@/request/request";
import { callcenterCode ,
  callcenterEnumOptionType,
  complaintGroupList,
  importanceList,
  defaultCallManageEditConfig,
  spectialCallManageEditConfig,
  busyThresholdList,
  dictTypeEnum,
} from "@/const/config";
import HelpQueue from "./components/helpQueue";
import BusyThreshold from "./components/busyThreshold";
import FullQueue from "./components/fullQueue";
import WarnningRatioSingle from "@/components/warnningRatioSingle";
import CommonOrgTree from '@/components/common/commonOrgTree';
import sessionStorageHelper from "@/utils/sessionStorage";

const FormItem = Form.Item;
// 单独表单项的布局
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
// 并列表单项的布局
const twoFormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
// 受理部门树结构对应取值字段
const defaultFormatObj = {
  key: "code",
  value: "code",
  title: "name",
  children: "children",
};
// 校验判断
const helpQueuevValidatorList = [
  {
    key: "helpQueueStartNum",
    content: "请输入代客排队的启用值",
  },
  {
    key: "helpQueueMaxNum",
    content: "请输入代客排队的最大值",
  },
  {
    key: "helpQueueNotifyNum",
    content: "请输入代客排队的通知值",
  },
];
function CallManageEdit(props) {
  const { form } = props;
  const {
    getFieldDecorator,
    validateFieldsAndScroll,
    setFieldsValue,
    getFieldsValue,
  } = form;
  const [companyList, setCompanyList] = useState([]); // 受理机构
  const [orgList, setOrgList] = useState([]); // 受理部门
  const [areaList, setAreaList] = useState([]); // 地区
  const [memberDistributeState, setMemberDistributeState] = useState([]); // 成员分配策略
  const [groupTypes, setGroupTypes] = useState([]); // 组类型
  const [waitFullState, setWaitFullState] = useState([]); // 排队满时处理状态
  const [workList, setWorkList] = useState([]); // 备用业务组列表
  const [businessCenterList, setBusinessCenterList] = useState([]); // 经营中心列表
  const [memberTypeList, setMemberTypeList] = useState([]); // 会员类型
  const [productCategoryList, setProductCategoryList] = useState([]); // 产品大类
  const [businessTypeList, setBusinessTypeList] = useState([]); // 咨询业务类型
  const [sceneList, setSceneList] = useState([]); // 场景  
  const [title, setTitle] = useState(() => {
    const param = qs.parse(window.location.href.split("?")[1]);
    return param.id ? "修改电话业务组" : "新增电话业务组";
  });
  const [loading, setLoading] = useState(false); // 不加载
  const [isDisabled, setIsDisabled] = useState(true); // 受理部门是否可以选中
  const [formData, setFormData] = useState({
    type: "1", // 组类型
    name: "", // 组名称
    companyId: undefined, // 受理机构id
    departId: undefined, // 受理部门id
    areaId: undefined, // 所属地区id
    alertSwitch: defaultCallManageEditConfig.alertSwitch, // 是否告警开关
    incallConfig: {
      complaintGroupFlag: defaultCallManageEditConfig.complaintGroupFlag, // 是否投诉组
      importance: undefined, // 重要性
      maxQueueSize: undefined, // 允许排队长度
      allocationStrategy: undefined, // 成员分配策略
      groupType: undefined, // 成员分配策略
      fullQueueObj: {
        fullQueueStrategy: defaultCallManageEditConfig.fullQueueStrategy, // 排队满时处理策略
        assistGroupIdList: [], // 排队满时转接组id列表
      }, // 排队满时处理策略
      busyThresholdObj: {
        busyThresholdSwitch: defaultCallManageEditConfig.busyThresholdSwitch, // 是否启用繁忙阈值
        busyThreshold: undefined, // 繁忙阈值
      }, // 繁忙阈值
      helpQueueObj: {
        helpQueueSwitch: defaultCallManageEditConfig.helpQueueSwitch, // 	是否启用代客排队
        helpQueueStartNum: undefined, // 	代客排队启用值
        helpQueueMaxNum: undefined, // 	代客排队最大值
        helpQueueNotifyNum: undefined, // 	代客排队通知值
      }, // 是否启用代客排队
    }, // 来电配置信息
    alarmItem: {}, // 告警条件列表，查询的时候需要格式化
  }); // 新增表单对象
  const userInfo = sessionStorageHelper.getItem('__userInfo')
  const treeDefaultExpandedKeys = userInfo && userInfo.regionCompanyCode ? [userInfo.regionCompanyCode] : [];  

  /**
   * 格式化树节点，利用treeNode自行渲染
   * @param {props} tree
   * @param {props} formatObj
   */
  function formatTree(tree, formatObj) {
    return tree.map((item) => {
      return (
        <TreeSelect.TreeNode
          key={item[formatObj["key"]]}
          value={item[formatObj["value"]]}
          title={item[formatObj["title"]]}
        >
          {formatTree(item[formatObj["children"]] || [], formatObj)}
        </TreeSelect.TreeNode>
      );
    });
  }

  /**
   * 获取地区
   */
  const getAreaList = async () => {
    const res = await get({
      url: Api.getAreaList,
    });
    if (res.success) {
      const data = res.data;
      setAreaList(
        [].concat(
          {
            id: "000000",
            name: "全国",
          },
          data
        )
      );
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取枚举（排队满时处理策略、成员分配策略、组状态）
   */
  const getEnumOptions = async () => {
    const array = [
      callcenterEnumOptionType.AllocationStartegy,
      callcenterEnumOptionType.FullQueueStartegy, 
      callcenterEnumOptionType.IncallGroupType,
      callcenterEnumOptionType.GBusinessCenterType,
      callcenterEnumOptionType.BAdminCompanyType,
      dictTypeEnum.consultBusinessType,
      dictTypeEnum.memberType,
      dictTypeEnum.productCategory,
      dictTypeEnum.consult_group_scene,
    ]
    const res = await get({
      url: Api.getEnumOption,
      params: {
        groupNames: array.join(","), 
      },
    });
    if (res.success) {
      let centerList = []
      const data = res.data;
      data.forEach((item) => {
        switch (item.groupName) {
          // 排队满时处理策略
          case callcenterEnumOptionType.FullQueueStartegy:
            setWaitFullState(item.options);
            break;
          //成员分配策略
          case callcenterEnumOptionType.AllocationStartegy:
            setMemberDistributeState(item.options);
            break;
          case callcenterEnumOptionType.IncallGroupType:
            setGroupTypes(item.options);
            break;
          case callcenterEnumOptionType.GBusinessCenterType:
            centerList = centerList.concat(item.options)
            break;
          case callcenterEnumOptionType.BAdminCompanyType:
            centerList = centerList.concat(item.options) // 拼接两个经营中心列表
            break;  
          case  dictTypeEnum.consultBusinessType:
            setBusinessTypeList(item.options);
            break;   
          case dictTypeEnum.memberType:  
            setMemberTypeList(item.options);
            break;   
          case dictTypeEnum.productCategory:  
            setProductCategoryList(item.options);
            break;
          case dictTypeEnum.consult_group_scene:
            setSceneList(item.options);  
            break;
          default:
            break;
        }
      });
      setBusinessCenterList(centerList)
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取受理机构
   */
  const getCompanyList = async () => {
    const res = await get({
      url: Api.getCompanyList,
      params: {
        needRemoteCenter: true,
      },
    });
    if (res.success) {
      const data = res.data;
      setCompanyList(data);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取受理部门
   */
  const getOrgList = async () => {
    const res = await get({
      url: Api.getDepartmentList,
      params: {
        companyId: callcenterCode,
      },
    });
    if (res.success) {
      const data = res.data;
      setOrgList(data);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取备用组
   */
  const getWorkList = async () => {
    const res = await get({
      url: Api.getWorkGroupList,
      params: {
        type: "1", // 1-电话组，2-在线组
      },
    });
    if (res.success) {
      const data = res.data;
      setWorkList(data);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 初始化查询方法
   */
  const initFunc = () => {
    getAreaList();
    getEnumOptions();
    getCompanyList();
    getOrgList();
    getWorkList();
  };

  /**
   * 取消
   */
  const channel = () => {
    window.close();
  };

  /**
   * 保存
   */
  const save = () => {
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 如果修改的时候名称最后没有[电话]标识的时候，手动添加
        const param = qs.parse(window.location.href.split("?")[1]);
        let sendData = Object.assign({}, values, {
          type: "1", // 1-电话组，2-在线组
          name: values.name && values.name.trim(),
          alertSwitch: values.alertSwitch,
          incallConfig: {
            complaintGroupFlag: values.incallConfig.complaintGroupFlag,
            importance: values.incallConfig.importance,
            maxQueueSize: values.incallConfig.maxQueueSize,
            allocationStrategy: values.incallConfig.allocationStrategy,
            groupType: values.incallConfig.groupType,
            ...values.incallConfig.fullQueueObj,
            ...values.incallConfig.busyThresholdObj,
            ...values.incallConfig.helpQueueObj,
          },
          ...values.alarmItem,
        });
        delete sendData.alarmItem;
        if (param.id) {
          updateGroup(
            Object.assign(sendData, {
              id: param.id,
            })
          );
        } else {
          saveGroup(sendData);
        }
      }
    });
  };

  /**
   * 更新组信息接口
   */
  const updateGroup = async (sendData) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postUpdateGroup,
        data: sendData,
      });
      if (res.success) {
        message.success("更新电话业务组信息成功!");
        let url =
          window.location.href.split("#")[0] +
          "#/employeeManage/groupManage/callManage";
        window.location.href = url;
      } else {
        message.error(res.message);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      message.error("系统出错请咨询管理员！");
      setLoading(false);
    }
  };

  /**
   * 保存组信息接口
   */
  const saveGroup = async (sendData) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postSaveGroup,
        data: sendData,
      });
      if (res.success) {
        message.success("新增电话业务组信息成功!");
        let url =
          window.location.href.split("#")[0] +
          "#/employeeManage/groupManage/callManage";
        window.location.href = url;
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
      message.error("系统出错请咨询管理员！");
    }
    setLoading(false);
  };

  /**
   * 受理机构改变
   */
  const companyChange = (value) => {
    const data = value !== callcenterCode;
    setIsDisabled(data);
    const param = getFieldsValue();
    setFieldsValue(
      Object.assign({}, param, {
        departId: undefined,
      })
    );
  };

  /**
   * 排队满时处理校验方法
   */
  const fullQueueValidator = (rule, value, callback) => {
    console.log(rule);
    if (
      spectialCallManageEditConfig.fullQueueStrategy.indexOf(
        value.fullQueueStrategy
      ) < 0
    ) {
      callback();
    } else {
      if (value.assistGroupIdList.length < 1) {
        callback("请选择转接备用组");
        return;
      }
      callback();
    }
  };

  /**
   * 繁忙阈值校验方法
   */
  const busyThresholdValidator = (rule, value, callback) => {
    if (
      value.busyThresholdSwitch !==
      spectialCallManageEditConfig.busyThresholdSwitch
    ) {
      callback();
    } else {
      if (value.busyThreshold === undefined || value.busyThreshold === null) {
        callback("请输入繁忙阈值");
        return;
      }
      callback();
    }
  };

  /**
   * 代客排队校验方法
   */
  const helpQueuevValidator = (rule, value, callback) => {
    if (
      value.helpQueueSwitch !== spectialCallManageEditConfig.helpQueueSwitch
    ) {
      callback();
    } else {
      const len = helpQueuevValidatorList.length;
      for (let i = 0; i < len; i++) {
        if (
          value[helpQueuevValidatorList[i].key] === undefined ||
          value[helpQueuevValidatorList[i].key] === null
        ) {
          callback(helpQueuevValidatorList[i].content);
          return;
        }
      }
      callback();
    }
  };

  /**
   * 获取组管理详情
   */
  const getGroupDetail = async (id) => {
    const res = await get({
      url: Api.getGroupDetail,
      params: {
        id,
      },
    });
    if (res.success) {
      const data = res.data;
      // 获取排队满时转接组id列表
      function getAssistGroupIdList(list) {
        let idList = [];
        list.forEach((item) => {
          idList.push(item.id);
        });
        return idList;
      }
      if (data.companyId === callcenterCode) {
        setIsDisabled(false);
      }
      setFormData({
        ...data,
        alertSwitch: data.alertSwitch ||  defaultCallManageEditConfig.alertSwitch, // 是否启用告警开关
        incallConfig: {
          complaintGroupFlag:
            data.complaintGroupFlag ||
            defaultCallManageEditConfig.complaintGroupFlag, // 是否投诉组
          importance: data.importance || undefined, // 重要性
          maxQueueSize: data.maxQueueSize || undefined, // 允许排队长度
          allocationStrategy: data.allocationStrategy || undefined, // 成员分配策略
          groupType: data.groupType || undefined, // 组类型
          fullQueueObj: {
            fullQueueStrategy:
              data.fullQueueStrategy ||
              defaultCallManageEditConfig.fullQueueStrategy, // 排队满时处理策略
            assistGroupIdList: getAssistGroupIdList(data.assistGroupList), // 排队满时转接组id列表
          }, // 排队满时处理策略
          busyThresholdObj: {
            busyThresholdSwitch:
              data.busyThresholdSwitch ||
              defaultCallManageEditConfig.busyThresholdSwitch, // 是否启用繁忙阈值
            busyThreshold: data.busyThreshold || undefined, // 繁忙阈值
          }, // 繁忙阈值
          helpQueueObj: {
            helpQueueSwitch:
              data.helpQueueSwitch ||
              defaultCallManageEditConfig.helpQueueSwitch, // 	是否启用代客排队
            helpQueueStartNum: data.helpQueueStartNum || undefined, // 	代客排队启用值
            helpQueueMaxNum: data.helpQueueMaxNum || undefined, // 	代客排队最大值
            helpQueueNotifyNum: data.helpQueueNotifyNum || undefined, // 	代客排队通知值
          }, // 是否启用代客排队
        }, // 来电配置信息
        alarmItem:{
          groupCallCompletingRateLowerThreshold: data.groupCallCompletingRateLowerThreshold,
          groupCallCompletingRateUpperThreshold: data.groupCallCompletingRateUpperThreshold,
        },
      });
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    initFunc();
    const param = qs.parse(window.location.href.split("?")[1]);
    param.id && getGroupDetail(param.id);
  }, []);

  return (
    <div className="callmanage-edit-box">
      <div className="edit-box">
        <div className="edit-title">{title}</div>
        <div className="form-box">
          <Form>
            <Row>
              <Col span={24}>
                <FormItem label="业务组名称" {...formItemLayout}>
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "请输入业务组名称",
                      },
                    ],
                    initialValue: formData.name,
                  })(
                    <Input
                      placeholder="请输入业务组名称"
                      maxLength={"50"}
                      autoComplete="off"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              {/* <Col span={12}>
                <FormItem label="受理机构" {...twoFormItemLayout}>
                  {getFieldDecorator("companyId", {
                    rules: [
                      {
                        required: true,
                        message: "请选择受理机构",
                      },
                    ],
                    initialValue: formData.companyId,
                  })(
                    <Select
                      allowClear
                      placeholder="请选择受理机构"
                      onChange={companyChange}
                    >
                      {companyList.length > 0 &&
                        companyList.map((item) => {
                          return (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="受理部门" {...twoFormItemLayout}>
                  {getFieldDecorator("departId", {
                    rules: !isDisabled ? [
                      {
                        required: true,
                        message: "请选择受理部门",
                      },
                    ] : [{
                      required: false
                    }],
                    initialValue: formData.departId,
                  })(
                    <Select
                      allowClear
                      placeholder="请选择受理部门"
                      disabled={isDisabled}
                      onChange={(value) => {
                        setFieldsValue(
                          Object.assign({
                            departId: value,
                          })
                        );
                      }}
                    >
                      {orgList.length > 0 &&
                        orgList.map((item) => {
                          return (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col> */}
              <Col span={12}>
                <FormItem label="受理机构" {...twoFormItemLayout}>
                  {getFieldDecorator("companyId", {
                    rules: [
                      {
                        required: true,
                        message: "请选择受理机构",
                      },
                    ],
                    initialValue: formData.companyId,
                  })(
                    <CommonOrgTree
                      allowClear
                      placeholder="请选择"
                      showSearch={true}
                      treeDefaultExpandedKeys={treeDefaultExpandedKeys}      
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label="地区" {...twoFormItemLayout}>
                  {getFieldDecorator("areaId", {
                    rules: [
                      {
                        required: true,
                        message: "请选择地区",
                      },
                    ],
                    initialValue: formData.areaId,
                  })(
                    <Select allowClear placeholder="请选择地区">
                      {areaList.length > 0 &&
                        areaList.map((item) => {
                          return (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="经营中心" {...twoFormItemLayout}>
                  {getFieldDecorator("businessCenterCode", {
                    rules: [
                      {
                        required: true,
                        message: "请选择经营中心",
                      },
                    ],
                    initialValue: formData.businessCenterCode,
                  })(
                    <Select allowClear placeholder="请选择经营中心">
                      {businessCenterList.length > 0 &&
                        businessCenterList.map((item) => {
                          return (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            {/* 场景 */}
            <Row>
              <Col span={12}>
              <FormItem label="场景" {...twoFormItemLayout}>
                  {getFieldDecorator("scene", {
                    rules: [
                      {
                        required: true,
                        message: "请选择场景",
                      },
                    ],
                    initialValue: formData.scene,
                  })(
                    <Select
                      allowClear
                      placeholder="请选择场景"
                      mode="multiple"
                    >
                      {sceneList.length > 0 &&
                        sceneList.map((item) => {
                          return (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              {/* 备注 */}
              <Col span={24}>
                <FormItem label="备注" {...formItemLayout}>
                  {getFieldDecorator("remark", {
                    initialValue: formData.remark,
                  })(
                    <Input.TextArea
                      placeholder="请输入备注"
                      maxLength={1000}
                      rows={4}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <div className="form-line"></div>
            <Row>
              <Col span={12}>
                <FormItem label="是否投诉组" {...twoFormItemLayout}>
                  {getFieldDecorator("incallConfig.complaintGroupFlag", {
                    rules: [
                      {
                        required: true,
                        message: "请选择是否投诉组",
                      },
                    ],
                    initialValue: formData.incallConfig.complaintGroupFlag,
                  })(
                    <Radio.Group>
                      {complaintGroupList.map((item) => {
                        return (
                          <Radio key={item.id} value={item.id}>
                            {item.name}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="重要性" {...twoFormItemLayout}>
                  {getFieldDecorator("incallConfig.importance", {
                    rules: [
                      {
                        required: true,
                        message: "请选择重要性",
                      },
                    ],
                    initialValue: formData.incallConfig.importance,
                  })(
                    <Radio.Group>
                      {importanceList.map((item) => {
                        return (
                          <Radio key={item.id} value={item.id}>
                            {item.name}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label="允许排队长度" {...twoFormItemLayout}>
                  {getFieldDecorator("incallConfig.maxQueueSize", {
                    rules: [
                      {
                        required: true,
                        message: "请输入允许排队长度",
                      },
                    ],
                    initialValue: formData.incallConfig.maxQueueSize,
                  })(
                    <InputNumber
                      min={0}
                      max={9999}
                      step={1}
                      precision={0}
                      inputWidth={245}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="成员分配策略" {...twoFormItemLayout}>
                  {getFieldDecorator("incallConfig.allocationStrategy", {
                    rules: [
                      {
                        required: true,
                        message: "请选择成员分配策略",
                      },
                    ],
                    initialValue: formData.incallConfig.allocationStrategy,
                  })(
                    <Select allowClear placeholder="请选择成员分配策略">
                      {memberDistributeState.length > 0 &&
                        memberDistributeState.map((item) => {
                          return (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="排队满时处理" {...formItemLayout}>
                  {getFieldDecorator("incallConfig.fullQueueObj", {
                    rules: [
                      {
                        required: true,
                        validator: fullQueueValidator,
                      },
                    ],
                    initialValue: formData.incallConfig.fullQueueObj,
                  })(
                    <FullQueue
                      waitFullStateList={waitFullState}
                      workList={workList}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="繁忙阈值" {...formItemLayout}>
                  {getFieldDecorator("incallConfig.busyThresholdObj", {
                    rules: [
                      {
                        required: true,
                        validator: busyThresholdValidator,
                      },
                    ],
                    initialValue: formData.incallConfig.busyThresholdObj,
                  })(<BusyThreshold />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="代客排队" {...formItemLayout}>
                  {getFieldDecorator("incallConfig.helpQueueObj", {
                    rules: [
                      {
                        required: true,
                        validator: helpQueuevValidator,
                      },
                    ],
                    initialValue: formData.incallConfig.helpQueueObj,
                  })(<HelpQueue />)}
                </FormItem>
              </Col>
            </Row>
            {/* <Row>
              <Col>
              <FormItem label="组类型" {...formItemLayout}>
                  {getFieldDecorator("incallConfig.groupType", {
                    rules: [
                      {
                        required: true,
                        message: "请选择组",
                      },
                    ],
                    initialValue: formData.incallConfig.groupType,
                  })(
                    <Select allowClear placeholder="请选择组">
                      {groupTypes.length > 0 &&
                        groupTypes.map((item) => {
                          return (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row> */}
            <Row>
              <Col span={12}>
              <FormItem label="咨询业务" {...twoFormItemLayout}>
                  {getFieldDecorator("consultBusinessType", {
                    rules: [
                      {
                        required: true,
                        message: "请选择咨询业务",
                      },
                    ],
                    initialValue: formData.consultBusinessType,
                  })(
                    <Select allowClear placeholder="请选择咨询业务">
                      {businessTypeList.length > 0 &&
                        businessTypeList.map((item) => {
                          return (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
              <FormItem label="会员类型" {...twoFormItemLayout}>
                  {getFieldDecorator("memberType", {
                    rules: [
                      {
                        required: true,
                        message: "请选择会员类型",
                      },
                    ],
                    initialValue: formData.memberType,
                  })(
                    <Select allowClear placeholder="请选择会员类型">
                      {memberTypeList.length > 0 &&
                        memberTypeList.map((item) => {
                          return (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label="产品大类" {...twoFormItemLayout}>
                  {getFieldDecorator("productCategory", {
                    rules: [
                      {
                        required: true,
                        message: "请选择产品大类",
                      },
                    ],
                    initialValue: formData.productCategory,
                  })(
                    <Select allowClear placeholder="请选择产品大类">
                      {productCategoryList.length > 0 &&
                        productCategoryList.map((item) => {
                          return (
                            <Select.Option key={item.id} value={item.id}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label="坐席在线情况告警" {...twoFormItemLayout}>
                  {getFieldDecorator("alertSwitch", {
                    rules: [
                      {
                        required: true,
                        message: "请选择坐席在线情况告警",
                      },
                    ],
                    initialValue: formData.alertSwitch,
                  })(
                    <Radio.Group>
                      {busyThresholdList.map((item) => {
                        return (
                          <Radio key={item.id} value={item.id}>
                            {item.name}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label="接通率阈值" {...formItemLayout}>
                  {getFieldDecorator("alarmItem", {
                    rules: [
                      {
                        validator: (rule, value, callback) => {
                          if (value.groupCallCompletingRateLowerThreshold &&  value.groupCallCompletingRateUpperThreshold) {
                            if (value.groupCallCompletingRateLowerThreshold >= value.groupCallCompletingRateUpperThreshold) {
                              return callback("低于的阈值不能大于等于高于的阈值");
                            }
                          }
                          callback()
                        },
                      },
                    ],
                    initialValue: formData.alarmItem,
                  })(
                    <WarnningRatioSingle />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div className="button-box">
            <Button
              type="primary"
              className="search-button"
              loading={loading}
              onClick={() => {
                save();
              }}
            >
              确定
            </Button>
            <div className="button-line-box"></div>
            <Button
              className="search-button"
              disabled={loading}
              onClick={() => {
                channel();
              }}
            >
              取消
            </Button>
          </div>
        </div>
      </div>
      <Loading text="处理中" visible={loading} />
    </div>
  );
}
export default Form.create()(CallManageEdit);
