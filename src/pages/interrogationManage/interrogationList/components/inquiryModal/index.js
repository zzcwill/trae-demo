import React, { useRef, useEffect, useState } from "react";
import {
  Modal,
  Form,
  Popover,
  Alert,
  Row,
  Col,
  Icon,
  Select,
  Radio,
  Input,
  Checkbox,
  message,
} from "dpl-react";

import sessionStorageHelp from "@/utils/sessionStorage";
import debounce from "lodash/debounce";

import classnames from "classnames";
import moment from "moment";
import Api from "@/request/api-olhelpmanage.js";
import { get, post } from "@/request/request";
import "./index.scss";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const rowFormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const rowBigFormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const inquiryTypeList = [{
  label: '是',
  value: '2',
},{
  label: '否',
  value: '1',
}]
const defaultList = ["一", "二", "三"];
const example =
  "我司为商业服务管理有限公司，经营范围包括餐饮管理、企业管理服务及对应的人力资源外包。主要想咨询发票涉税风险问题：最近承接了一家员工餐服务、对方提供场地、我公司派人每天购买食材、制作工餐，关于承包员工餐服务，每天到菜市场买菜问题，月末汇总能否到税务局开具农产品发票？流程如何？ 是否存在风险？";
const tips =
  "您当前身份暂无专家问诊权益，如想预约，可点击“我想预约”留下联系方式";
function InquiryModal(props) {
  const {
    className,
    form,
    locationList = [],
    customerWorkList = [],
    onCancel,
    onSuccess,
    ...rest
  } = props;
  const noAllLocaitonList = locationList.filter(
    (item) => item.value !== "0000"
  );
  const user = sessionStorageHelp.getItem("__userInfo");
  const {
    getFieldDecorator,
    setFieldsValue,
    getFieldsValue,
    validateFields,
    validateFieldsAndScroll,
  } = form;
  const [companyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stepOneFormData, setStepOneFormData] = useState({
    insteadAppointmentName: user.name,
    inquiryType: '1'
  });
  const [expertInquiryScheduleDateList, setExpertInquiryScheduleDateList] =
    useState([]);
  const [expertList, setExpertList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentRights, setCurrentRights] = useState(null);
  const [currentScheduleItem, setCurrentScheduleItem] = useState({});
  const [questionList, setQuestionList] = useState([""]);
  const [exampleShow, setExampleShow] = useState(false);
  const addQuestionHandler = (index) => {
    setQuestionList([...questionList, ""]);
  };
  const handleDelete = (question) => {
    questionList.splice(question, 1);
    const formValus = getFieldsValue();
    if (question == 1) {
      setFieldsValue({
        question1: formValus.question2,
        question2: undefined,
      });
      if (formValus.question2) {
        questionList[1] = formValus.question2;
      }
    } else {
      setFieldsValue({
        question2: undefined,
      });
    }
    setQuestionList(questionList);
  };
  const wrapperRef = useRef(null);

  const queryScheduleDateList = async (locationCode) => {
    const res = await get({
      url: Api.getScheduleByCodeList,
      params: {
        location: locationCode,
      },
    });
    if (res.success) {
      formatDate(res.data);
    }
  };

  const formatDate = (scheduleList = []) => {
    const tempList = scheduleList
      .filter((item) => item.serviceDateStatus === "0")
      .map((date) => {
        //只有可约的显示出来
        date.formatTimeList = date.scheduleTimeList
          .filter((time) => time.inquiryStatus === "0")
          .map((cur) => {
            let timeText = `${cur.startTime}~${cur.endTime}`;
            cur.disabled = cur.inquiryStatus !== "0";
            cur.value = timeText;
            cur.expertList = cur.expertList;
            cur.label = timeText;
            return cur;
          });
        return date;
      });
    setExpertInquiryScheduleDateList(tempList);
  };

  const queryCompanyList = debounce(async (name) => {
    const res = await get({
      url: Api.fuzzyQueryCompany,
      params: {
        location: currentLocation,
        name,
      },
    });
    if (res.success && Array.isArray(res.data)) {
      setCompanyList(res.data.filter((item) => item.customerId)); //把没有customerId过滤掉
    }
  }, 500);

  const companyChange = async (e) => {
    const item = companyList.filter((item) => item.customerId === e)?.[0];
    console.log("item", item, "Api.getCustomerRight", Api.getCustomerRight);
    const res = await get({
      url: Api.getCustomerRight,
      params: {
        customerId: item.customerId,
        consultService: "6",
      },
    });
    const defaultRights = {
      rightCustomerType: "0", //客户类型，0：单位客户，1：机构，4：个人用户
      rightTotal: 0, // 企业名称
    };
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      setCurrentRights({
        rightTotal: res.data[0].rightList[0].total || 0,
      });
    } else {
      setCurrentRights({
        rightCustomerType: "0", //客户类型，0：单位客户，1：机构，4：个人用户
        rightTotal: 0, // 企业名称
      });
    }
  };

  const validatorInput = (label, rule, value, callback) => {
    if (!value || !value.trim()) {
      callback(`请填写${label}`);
    }
    // if (value.match(RegExpUtil.specialRegx)) {
    //     callback(`${label}包含了表情等特殊字符，请重新输入`);
    // }
    callback();
  };

  const resetData = () => {
    setTimeList([]);
    setCompanyList([]);
    setExpertList([]);
    setCurrentRights(null);
    setCurrentScheduleItem({});
    setCurrentLocation("");
    setQuestionList([""]);
  };
  const cancelClick = () => {
    resetData();
    onCancel && onCancel();
  };
  const submitClick = async () => {
    validateFieldsAndScroll(async (error, values) => {
      if (error) return;
      if (loading) return;
      console.log("values", values);
      if (currentRights.rightTotal == 0) {
        return message.error("当前用户无权益");
      }
      const company = companyList.filter(
        (item) => item.customerId === values.customerId
      )[0];
      const questionList = [
        values.question0,
        values.question1,
        values.question2,
      ].filter((item) => !!item);
      delete values.question0;
      delete values.question1;
      delete values.question2;
      delete values.dateTime;
      const params = {
        ...values,
        expertId: currentScheduleItem.expertId,
        startTime: currentScheduleItem.startTime,
        endTime: currentScheduleItem.endTime,
        offlineAddress: currentScheduleItem.offlineAddress,
        questionList,
        customerName: company.name,
        customerType: "0",
      };
      console.log("params", params);
      setLoading(true);
      const res = await post({
        url: Api.postExpertexpertInquirySaveInquiryRecord,
        data: params,
      });
      setLoading(false);
      if (res.success) {
        message.success("保存成功");
        cancelClick();
        onSuccess && onSuccess();
      } else if (res.message) {
        message.error(res.message);
      }
    });
  };
  useEffect(() => {}, []);
  return (
    <Modal
      title={`代预约`}
      className={classnames("inquiry-modal", className)}
      width={960}
      destroyOnClose
      onOk={submitClick}
      onCancel={cancelClick}
      {...rest}
    >
      <div className="inquiry-content" ref={wrapperRef}>
        <Form colon>
          <Form.Item label="代预约人名称" {...rowFormItemLayout}>
            {getFieldDecorator("insteadAppointmentName", {
              initialValue: stepOneFormData.insteadAppointmentName,
              // rules: [
              //   { required: true, message: "请填写代预约人名称" },
              //   {
              //     validator: (rule, value, callback) => {
              //       validatorInput("代预约人名称", rule, value, callback);
              //     },
              //   },
              // ],
            })(<Input placeholder="请输入" maxLength="20" />)}
          </Form.Item>
          <Form.Item label="是否专属顾问" {...rowFormItemLayout}>
            {getFieldDecorator("inquiryType", {
              initialValue: stepOneFormData.inquiryType,
              rules: [{ required: true, message: "请选择是否专属顾问" }],
            })(
              <Select
                placeholder="请选择"
                getPopupContainer={() => wrapperRef.current}
              >
                {inquiryTypeList.map((item, index) => {
                    return (
                      <Select.Option value={item.value} key={item.value}>
                        {item.label}
                      </Select.Option>
                    );
                  })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="用户地区" {...rowFormItemLayout}>
            {getFieldDecorator("location", {
              initialValue: stepOneFormData.location,
              rules: [{ required: true, message: "请选择用户地区" }],
            })(
              <Select
                placeholder="请选择"
                showSearch
                optionFilterProp="children"
                getPopupContainer={() => wrapperRef.current}
                onChange={(e) => {
                  console.log("location", e);
                  resetData();
                  setCurrentLocation(e);
                  queryScheduleDateList(e);
                  setFieldsValue({
                    customerId: "",
                    serviceDate: "",
                    dateTime: "",
                    scheduleId: "",
                  });
                }}
              >
                {noAllLocaitonList &&
                  noAllLocaitonList.map((item, index) => {
                    return (
                      <Select.Option value={item.value} key={item.value}>
                        {item.label}
                      </Select.Option>
                    );
                  })}
              </Select>
            )}
          </Form.Item>
          {/* 企业名称 */}
          <Form.Item label={"代预约企业名称"} {...rowFormItemLayout}>
            {getFieldDecorator("customerId", {
              initialValue: stepOneFormData.customerId,
              rules: [{ required: true, message: "请选择代预约企业名称" }],
            })(
              <Select
                className="company-select"
                placeholder="请选择"
                showSearch
                optionEllipsis={false}
                optionFilterProp="children"
                size="large"
                filterOption={false}
                onSearch={(e) => {
                  if (!currentLocation) {
                    validateFields(["location"], { force: true });
                    return;
                  }
                  //文本框值变化时回调
                  console.log("onSearch", e);
                  queryCompanyList(e);
                }}
                getPopupContainer={() => wrapperRef.current}
                onChange={(e, option) => {
                  //选中 option
                  console.log("onChange", e);
                  companyChange && companyChange(e);
                }}
              >
                {companyList &&
                  companyList.map((item, index) => {
                    return (
                      <Select.Option
                        value={item.customerId}
                        title={item.name}
                        key={`${item.name}-${item.taxNo}`}
                      >
                        <div className="inquiry-company-select-item">
                          <div className="inquiry-company-name">
                            {item.name}
                          </div>
                          <div className="inquiry-company-tax">
                            {item.taxNo}
                          </div>
                        </div>
                      </Select.Option>
                    );
                  })}
              </Select>
            )}
          </Form.Item>
          {currentRights && (
            <Row>
              <Col offset={4} className="inquiry-rights">
                <span style={{ marginRight: 2 }}>专家问诊权益：</span>
                {currentRights.rightTotal == -1 ? (
                  <span className="orange">可预约</span>
                ) : (
                  <span>
                    还可预约
                    {currentRights.rightTotal > 0 ? (
                      <span className="bold">{currentRights.rightTotal}</span>
                    ) : (
                      // <Popover
                      //   control="full"
                      //   getPopupContainer={() => wrapperRef.current}
                      //   placement="bottom"
                      //   visible
                      //   content={tips}
                      // >
                      // </Popover>
                      <span className="bold">
                        {currentRights.rightTotal || 0}
                      </span>
                    )}
                    次
                  </span>
                )}
              </Col>
            </Row>
          )}
          {currentLocation && (
            <div>
              <Row style={{ marginTop: 20 }}>
                <Col span={12}>
                  <Form.Item label={`请选择日期`} {...formItemLayout}>
                    {getFieldDecorator("serviceDate", {
                      initialValue: stepOneFormData.serviceDate,
                      rules: [{ required: true, message: "请选择日期" }],
                    })(
                      <Select
                        placeholder="请选择日期"
                        getPopupContainer={() => wrapperRef.current}
                        onChange={(e) => {
                          const item =
                            expertInquiryScheduleDateList.filter(
                              (item) => item.serviceDate === e
                            ) || [];
                          setTimeList(item[0].formatTimeList);
                          setCurrentScheduleItem({});
                          setExpertList([]);
                          setFieldsValue({
                            dateTime: "",
                            scheduleId: "",
                          });
                        }}
                      >
                        {expertInquiryScheduleDateList &&
                          expertInquiryScheduleDateList.map((item, index) => {
                            return (
                              <Select.Option
                                value={item.serviceDate}
                                key={item.serviceDate}
                              >
                                {moment(item.serviceDate).format(
                                  "YYYY年MM月DD日"
                                )}
                              </Select.Option>
                            );
                          })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item {...formItemLayout} style={{ marginLeft: 8 }}>
                    {getFieldDecorator("dateTime", {
                      initialValue: stepOneFormData.dateTime,
                      rules: [{ required: true, message: "请选择" }],
                    })(
                      <Select
                        placeholder="请选择时间"
                        onChange={(e, option) => {
                          setExpertList([]);
                          setFieldsValue({
                            scheduleId: "",
                          });
                          const item =
                            timeList.filter((item) => item.label === e) || [];
                          setExpertList(item[0].expertList || []);
                        }}
                        getPopupContainer={() => wrapperRef.current}
                      >
                        {timeList.map((item, index) => {
                          return (
                            <Select.Option
                              value={item.value}
                              key={item.value}
                              disabled={item.disabled}
                            >
                              {item.label}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="专家姓名" {...rowFormItemLayout}>
                {getFieldDecorator("scheduleId", {
                  initialValue: stepOneFormData.scheduleId,
                  rules: [{ required: true, message: "请选择专家" }],
                })(
                  <Select
                    placeholder="请选择"
                    className="company-select"
                    getPopupContainer={() => wrapperRef.current}
                    size="large"
                    optionEllipsis={false}
                    onChange={(e) => {
                      const item = expertList.filter(
                        (item) => item.id === e
                      )[0];
                      setCurrentScheduleItem(item);
                      setFieldsValue({
                        serviceMode: item.serviceMode,
                        serviceLocation: item.serviceLocation?.[0],
                      });
                    }}
                  >
                    {expertList &&
                      expertList.map((item, index) => {
                        return (
                          <Select.Option value={item.id} key={item.id}>
                            <div className="inquiry-expert-select-item">
                              <div className="inquiry-expert-name">
                                {item.name}
                              </div>
                              <div className="inquiry-expert-tax">
                                擅长领域：{Array.isArray(item.classifyRealmList) && item.classifyRealmList.length > 0 ? item.classifyRealmList.join(',') : '暂无'}
                              </div>
                            </div>
                          </Select.Option>
                        );
                      })}
                  </Select>
                )}
              </Form.Item>
            </div>
          )}
          {/* 假如完全隐藏了就不会生效 */}
          <div style={{ display: currentScheduleItem.id ? "block" : "none" }}>
            <Form.Item label={"问诊方式"} {...rowFormItemLayout}>
              {getFieldDecorator("serviceMode", {
                initialValue: stepOneFormData.serviceMode,
                rules: [{ required: true, message: "请选择问诊方式" }],
              })(
                <Radio.Group
                  onChange={(e) => {
                    console.log("serviceModeChange", e);
                  }}
                >
                  <Radio value={currentScheduleItem.serviceMode}>
                    <span>
                      {currentScheduleItem.serviceMode === "inquiry_online"
                        ? "线上问诊"
                        : "线下问诊"}
                    </span>
                  </Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item label={"问诊地区"} {...formItemLayout}>
                  {getFieldDecorator("serviceLocation", {
                    initialValue: stepOneFormData.serviceLocation,
                    rules: [{ required: true, message: "请选择问诊地区" }],
                  })(
                    <Select
                      placeholder="请选择问诊地区"
                      getPopupContainer={() => wrapperRef.current}
                    >
                      {currentScheduleItem.serviceLocation &&
                        locationList
                          .filter((item) =>
                            currentScheduleItem.serviceLocation.includes(
                              item.value
                            )
                          )
                          .map((item, index) => {
                            return (
                              <Select.Option
                                value={item.value}
                                key={item.value}
                              >
                                {item.label}
                              </Select.Option>
                            );
                          })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              {currentScheduleItem.serviceMode === "inquiry_offline" && (
                <Popover
                  control="full"
                  getPopupContainer={() => wrapperRef.current}
                  placement="topLeft"
                  visible
                  content={"请确认能到现场参与问诊"}
                >
                  <span className="inquiry_offline-address">
                    {currentScheduleItem.offlineAddress}
                  </span>
                </Popover>
              )}
            </Row>
          </div>
          <Form.Item label="姓名" {...rowFormItemLayout}>
            {getFieldDecorator("name", {
              initialValue: stepOneFormData.name,
              rules: [
                { required: true, message: [] },
                {
                  validator: (rule, value, callback) => {
                    validatorInput("问诊人姓名", rule, value, callback);
                  },
                },
              ],
            })(<Input placeholder="请填写问诊人姓名" maxLength="20" />)}
          </Form.Item>
          <Form.Item label="您的岗责" {...rowFormItemLayout}>
            {getFieldDecorator("customerWorkList", {
              initialValue: stepOneFormData.customerWorkList,
            })(
              //要处理一下
              <Checkbox.Group>
                {customerWorkList.length > 0 &&
                  customerWorkList.map((item) => {
                    return (
                      <Checkbox
                        key={item.value}
                        value={item.value}
                        className="function-list-checkbox-item"
                      >
                        {item.label}
                      </Checkbox>
                    );
                  })}
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item
            label="手机号"
            {...rowFormItemLayout}
            className="custom-phone"
          >
            {getFieldDecorator("mobile", {
              initialValue: stepOneFormData.mobile,
              rules: [
                { required: true, message: `请填写问诊手机号` },
                {
                  validator(rule, value, callback) {
                    if (!value) {
                      callback();
                      return;
                    }
                    if (value.length !== 11 || value[0] !== "1") {
                      callback("请输入正确的手机号");
                      return;
                    }
                    return true;
                  },
                },
              ],
            })(
              <Input
                placeholder={`请填写问诊手机号`}
                maxLength="11"
                type="number"
              />
            )}
          </Form.Item>
          {questionList.map((item, index) => (
            <Form.Item
              label={`问诊问题${defaultList[index]}`}
              {...rowBigFormItemLayout}
              key={index}
            >
              <Row gutter={20} className="inquiry-question-item">
                <Col span={20} style={{ maxWidth: 634 }}>
                  {getFieldDecorator(`question${index}`, {
                    initialValue: questionList[index],
                    rules: [
                      { required: true, message: [] },
                      {
                        validator: (rule, value, callback) => {
                          validatorInput("问诊内容", rule, value, callback);
                        },
                      },
                    ],
                  })(
                    <Input.TextArea
                      rows={3}
                      placeholder="请填写专家问诊中想要咨询的问题，填写越详细，专家才能更高效的为您解决问题。"
                      maxLength="500"
                    />
                  )}
                </Col>
                <Col span={3} style={{ paddingLeft: 0 }}>
                  {index === 0 && questionList.length < 3 && (
                    <div
                      className="inquiry-question-right-add"
                      onClick={() => addQuestionHandler(index)}
                    >
                      <Icon
                        type="circle-plus-o"
                        style={{ color: "#2C85D9", marginRight: 4 }}
                      />
                      <span>新增</span>
                    </div>
                  )}
                  {index !== 0 && (
                    <div
                      className="inquiry-question-right-delete"
                      onClick={() => handleDelete(index)}
                    >
                      <Icon
                        type="dustbin-o"
                        style={{ color: "#FF3B30", marginRight: 4 }}
                      />
                      <span>删除</span>
                    </div>
                  )}
                </Col>
              </Row>
            </Form.Item>
          ))}
        </Form>
        <Row style={{ marginTop: 8 }}>
          <Col offset={4} span={18}>
            <div className="inquiry-fill-inro">
              注意：
              <br />
              1、每场专家问诊的服务时间为半小时，可提交3个问题进行咨询。
              <br />
              2、问诊内容请填写行业、问题背景，问题详情等。样例：
              <span
                style={{ color: "#2C85D9" }}
                onClick={() => setExampleShow(true)}
              >
                点击查看
              </span>
              {exampleShow && (
                <div className="custom-popover-out">
                  <div className="custom-popover-arrow"></div>
                  <div className="custom-popover-content">{example}</div>
                  <div
                    className="icon-out"
                    onClick={() => setExampleShow(false)}
                  >
                    <Icon type="pure-close" />
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}

export default Form.create()(InquiryModal);
