import React, { useEffect, useState } from "react";
import {
  Button,
  InputNumber,
  Form,
  Row,
  Input,
  Radio,
  message,
} from "dpl-react";
import "./index.scss";
import { parameterSettingMap, modelType, iconContentMap } from "@/const/index";
import PopoverIcon from "@/components/common/popoverIcon";
import { get, post } from "@/request/request";
import Api from '@/request/api-callcentermanage'
import API from "@/request/api-olhelpmanage";
import OnlineGroupSelect from "../onlineGroupSelect";
import { acceptanceChannelCode, callcenterCode } from "@/const/config";

/**
 * 情绪模型配置
 */
const emotionConfig = [
  {
    name: "关闭情绪模型",
    value: "N",
  },
  {
    name: "启用情绪模型",
    value: "Y",
  },
];
/**
 * 满意度模型配置
 */
const satisfiedConfig = [
  {
    name: "启用规则判断",
    value: "N",
  },
  {
    name: "启用满意度模型",
    value: "Y",
  },
];

const globalSettingManage = React.forwardRef((props, ref) => {
  const { form } = props;
  const { getFieldDecorator, setFieldsValue } = form;

  const [settingParams, setSettingParams] = useState({
    similarity: 0, // 智能助理自动解答的阈值
    robotModelEmotion: "", // 机器人受理模式下调用的情绪模型
    personModelEmotion: "", // 人工受理模式下调用的情绪模式
    emotionModel: 0, // 情绪模型的阈值
    noAnswer: 0, // 机器人受理模式下连续匹配不到答案转人工阈值
    personModelSatisfaction: "", // 人工受理模式下调用的满意度模式
    satisfactionModel: 0, // 满意度模型的阈值
    emotionToPerson: "", // 机器人受理模式下用户情绪消极或质疑机器人转人工的提示语
    satisfactionToPerson: "", // 机器人受理模式下机器人回答可能会不满意转人工的提示语
    complicatedToPerson: "", // 机器人受理模式下复杂问题转人工的提示语
    toPerson: "", // 机器人受理模式下问题直接转人工的提示语
    robotNoQuery: "", // 机器人受理模式下机器人连续查询不到问题超过阈值转人工的提示语
    robotToPersonPoint: "", // 机器人受理模式下机器人服务异常转人工的提示语
    onlineGroup: [], // 智库推荐开启范围
  });
  const [settingList, setSettingList] = useState([]); // 原始列表
  const [isSubmit, setIsSubmit] = useState(false); // 是否不可点击
  const [groupMap, setGroupMap] = useState({}); // 组map
  const [companyList, setCompanyList] = useState([]); // 受理机构
  const [orgList, setOrgList] = useState([]); // 受理部门
  const [onlineGroup, setOnlineGroup] = useState([]); // 电话组

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

  // 获取业务组信息
  const getWorkGroupList = async (type) => {
    try {
        const res = await get({
            url: Api.getWorkGroupList,
            params: {
                type,
            },
        });
        if (res.success) {
            const data = res.data;
            let dataMap = {};
            data.forEach((item) => {
                dataMap[item.id] = Object.assign({}, item);
            });
            setOnlineGroup(data);
            setGroupMap((state) => {
                return Object.assign({}, state, dataMap);
            });
        } else {
            message.error(res.message);
        }
    } catch (e) {
        console.error(e);
    }
};
  /**
   * 查询参数配置
   */
  const querySetting = async (type) => {
    setIsSubmit(true);
    const res = await get({
      url: API.querySetting,
    });
    if (res.success) {
      const data = res.data;
      setSettingList(data);
      let obj = {};
      let modelList = [];
      data.forEach((item) => {
        switch (item.key) {
          case parameterSettingMap.robotModel:
            modelList = item.value.split(",");
            obj["robotModelSatisfaction"] =
              modelList.indexOf(modelType.satisfaction) > -1 ? "Y" : "N";
            obj["robotModelEmotion"] =
              modelList.indexOf(modelType.emotion) > -1 ? "Y" : "N";
            break;
          case parameterSettingMap.personModel:
            modelList = item.value.split(",");
            obj["personModelEmotion"] =
              modelList.indexOf(modelType.emotion) > -1 ? "Y" : "N";
            break;
          case parameterSettingMap.robotNoQuery:
            obj["robotNoQuery"] = item.value;
            break;
          case parameterSettingMap.onlineGroup:
            let val = [];
            try {
              val = JSON.parse(item.value || '[]');
            } catch(e) {
              console.log(e, 'e');
            }
            console.log(item.value, 'item.value');
            obj["onlineGroup"] = val.map(item => ({
              id: item.groupId,
              name: item.groupName
            }));
            console.log(obj, 'obj');
            break;
          default:
            obj[findKey(parameterSettingMap, item.key)] = item.value;
            break;
        }
      });
      setSettingParams(obj);
      if (type) {
        setFieldsValue(obj);
      }
    } else {
      message.error(res.message);
    }
    setIsSubmit(false);
  };

  /**
   * 提交按钮
   */
  const submit = async () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setIsSubmit(true);
        let list = [];
        settingList.forEach((item) => {
          let obj = {};
          let modelList = [];
          let isAddToList = true;
          switch (item.key) {
            case parameterSettingMap.robotModel:
              modelList = [];
              if (values.robotModelSatisfaction === "Y") {
                modelList.push(modelType.satisfaction);
              }
              if (values.robotModelEmotion === "Y") {
                modelList.push(modelType.emotion);
              }
              obj = {
                key: item.key,
                group: item.group,
                value: modelList.join(","),
              };
              break;
            case parameterSettingMap.personModel:
              modelList = [];
              if (values.personModelEmotion === "Y") {
                modelList.push(modelType.emotion);
              }
              obj = {
                key: item.key,
                group: item.group,
                value: modelList.join(","),
              };
              break;
            case parameterSettingMap.onlineGroup:
              obj = {
                key: item.key,
                group: item.group,
                value: (values.onlineGroup || [])?.map(val => val.id)?.join(',')
              }
              break;
            default:
              // 寻找页面数据对应的key值，不存在返回undefined
              const key = findKey(parameterSettingMap, item.key);
              // 不存在则不加到更新数据中
              if (!key) {
                isAddToList = false;
              }
              const paramVal = values[key];
              obj = {
                key: item.key,
                group: item.group,
                value: paramVal ? paramVal.toString().trim() : item.value, // values中没有这个数据，则返回原先的数据内容，避免误操作清空数据
              };
          }
          if (isAddToList) {
            list.push(obj);
          }
        });
        update(list);
      }
    });
  };

  /**
   * 获取key值
   * @param {Object} obj
   * @param {String} value
   */
  const findKey = (obj, value) => {
    return Object.keys(obj).find((k) => {
      return obj[k] === value;
    });
  };

  /**
   * 更新接口
   * @param {Object} data
   */
  const update = async (data) => {
    const res = await post({
      url: API.updateSetting,
      data,
    });
    if (res.success) {
      message.success("保存成功！");
    } else {
      message.error(res.message);
    }
    setIsSubmit(false);
    querySetting("update");
  };

  useEffect(() => {
    querySetting();
    getWorkGroupList(acceptanceChannelCode.online);
    getCompanyList();
    getOrgList();
  }, []);

  console.log(isSubmit);

  return (
    <div className="parameter">
      <Form>
        <Row>
          <div className="parameter-title">智能助理：</div>
          <Row className="parameter-line">
            <PopoverIcon content={iconContentMap.similarity}></PopoverIcon>
            <span>智能助理自动解答阈值：&nbsp;&nbsp;</span>
            <Form.Item className="inline-box">
              {getFieldDecorator("similarity", {
                rules: [
                  { required: true, message: "请输入智能助理自动解答阈值" },
                ],
                initialValue: Number(settingParams.similarity),
              })(
                <InputNumber
                  min={0}
                  max={1}
                  precision={3}
                  inputWidth={100}
                  step={0.001}
                />
              )}
            </Form.Item>
          </Row>
          <Row className="parameter-line">
            <div className="inline-box align-top">
              <span>智能助理模型：&nbsp;&nbsp;</span>
            </div>
            <Row className="inline-box">
              <Row>
                <Form.Item className="inline-box">
                  {getFieldDecorator("personModelEmotion", {
                    initialValue: settingParams.personModelEmotion,
                  })(
                    <Radio.Group>
                      {emotionConfig.map((item) => {
                        return (
                          <Radio.Button value={item.value} key={item.value}>
                            {item.name}
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>
                  )}
                </Form.Item>
              </Row>
            </Row>
          </Row>
        </Row>
        <div className="line"></div>
        <Row>
          <div className="parameter-title">机器人自动转人工：</div>
          <Row className="parameter-line">
            <Row>
              <div className="inline-box align-top">
                <PopoverIcon
                  content={iconContentMap.satisfactionModel}
                ></PopoverIcon>
                <span>满意度模型：&nbsp;&nbsp;</span>
              </div>
              <Row className="inline-box">
                <Row>
                  <Form.Item className="inline-box">
                    {getFieldDecorator("robotModelSatisfaction", {
                      initialValue: settingParams.robotModelSatisfaction,
                    })(
                      <Radio.Group>
                        {satisfiedConfig.map((item) => {
                          return (
                            <Radio.Button value={item.value} key={item.value}>
                              {item.name}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Row>
                <Row>
                  <span>满意度模型阈值：&nbsp;&nbsp;</span>
                  <Form.Item className="inline-box">
                    {getFieldDecorator("satisfactionModel", {
                      rules: [
                        { required: true, message: "请选择输入满意度模型阈值" },
                      ],
                      initialValue: Number(settingParams.satisfactionModel),
                    })(
                      <InputNumber
                        min={0}
                        max={1}
                        precision={3}
                        inputWidth={100}
                        step={0.001}
                      />
                    )}
                  </Form.Item>
                </Row>
                <Row>
                  <span>低于阈值转人工提示：&nbsp;&nbsp;</span>
                  <Form.Item className="inline-box">
                    {getFieldDecorator("satisfactionToPerson", {
                      initialValue: settingParams.satisfactionToPerson,
                    })(
                      <Input
                        placeholder="请输入满意度低于阈值转人工提示"
                        style={{ width: 400 }}
                      />
                    )}
                  </Form.Item>
                </Row>
              </Row>
            </Row>

            <Row>
              <div className="inline-box align-top">
                <PopoverIcon
                  content={iconContentMap.emotionModel}
                ></PopoverIcon>
                <span>情绪模型：&nbsp;&nbsp;</span>
              </div>
              <Row className="inline-box">
                <Row>
                  <Form.Item className="inline-box">
                    {getFieldDecorator("robotModelEmotion", {
                      initialValue: settingParams.robotModelEmotion,
                    })(
                      <Radio.Group>
                        {emotionConfig.map((item) => {
                          return (
                            <Radio.Button value={item.value} key={item.value}>
                              {item.name}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Row>
                <Row>
                  <span>情绪模型阈值：&nbsp;&nbsp;</span>
                  <Form.Item className="inline-box">
                    {getFieldDecorator("emotionModel", {
                      rules: [
                        { required: true, message: "请输入情绪模型阈值" },
                      ],
                      initialValue: Number(settingParams.emotionModel),
                    })(
                      <InputNumber
                        min={0}
                        max={1}
                        precision={3}
                        inputWidth={80}
                        step={0.001}
                      />
                    )}
                  </Form.Item>
                </Row>
                <Row>
                  <Row>
                    <span>负面情绪转人工提示：&nbsp;&nbsp;</span>
                    <Form.Item className="inline-box">
                      {getFieldDecorator("emotionToPerson", {
                        initialValue: settingParams.emotionToPerson,
                      })(
                        <Input
                          placeholder="请输入负面情绪转人工提示"
                          style={{ width: 400 }}
                        />
                      )}
                    </Form.Item>
                  </Row>
                </Row>
              </Row>
            </Row>

            <Row>
              <div className="inline-box align-top">
                <PopoverIcon content={iconContentMap.noAnswer}></PopoverIcon>
                <span>无法查到答案：</span>
              </div>
              <Row className="inline-box">
                <Row>
                  <span>连续&nbsp;&nbsp;</span>
                  <Form.Item className="inline-box">
                    {getFieldDecorator("noAnswer", {
                      rules: [
                        {
                          required: true,
                          message: "请输入无答案转人工提示个数",
                        },
                      ],
                      initialValue: parseInt(settingParams.noAnswer),
                    })(
                      <InputNumber
                        min={0}
                        max={99}
                        precision={0}
                        inputWidth={120}
                      />
                    )}
                  </Form.Item>
                  <span>个问题无答案转人工</span>
                </Row>
                <Row>
                  <span>无答案转人工提示：&nbsp;&nbsp;</span>
                  <Form.Item className="inline-box">
                    {getFieldDecorator("robotNoQuery", {
                      initialValue: settingParams.robotNoQuery,
                    })(
                      <Input
                        placeholder="请输入无答案转人工提示"
                        style={{ width: 400 }}
                      />
                    )}
                  </Form.Item>
                </Row>
              </Row>
            </Row>

            <Row>
              <PopoverIcon
                content={iconContentMap.complicatedToPerson}
              ></PopoverIcon>
              <span>复杂问题指令转人工提示：&nbsp;&nbsp;</span>
              <Form.Item className="inline-box">
                {getFieldDecorator("complicatedToPerson", {
                  initialValue: settingParams.complicatedToPerson,
                })(
                  <Input
                    placeholder="请输入复杂问题指令转人工提示"
                    style={{ width: "400px" }}
                  />
                )}
              </Form.Item>
            </Row>
            <Row>
              <PopoverIcon content={iconContentMap.toPerson}></PopoverIcon>
              <span>转人工指令转人工提示：&nbsp;&nbsp;</span>
              <Form.Item className="inline-box">
                {getFieldDecorator("toPerson", {
                  initialValue: settingParams.toPerson,
                })(
                  <Input
                    placeholder="请输入转人工指令转人工提示"
                    style={{ width: "400px" }}
                  />
                )}
              </Form.Item>
            </Row>
            <Row>
              <PopoverIcon
                content={iconContentMap.robotToPersonPoint}
              ></PopoverIcon>
              <span>机器人调用失败转人工提示：&nbsp;&nbsp;</span>
              <Form.Item className="inline-box">
                {getFieldDecorator("robotToPersonPoint", {
                  initialValue: settingParams.robotToPersonPoint,
                })(
                  <Input
                    placeholder="请输入机器人调用失败转人工提示"
                    style={{ width: "400px" }}
                  />
                )}
              </Form.Item>
            </Row>
          </Row>
        </Row>
        <div className="line"></div>
        {/* <Row>
          <div className="parameter-title">智库推荐：</div>
          <Row className="parameter-line">
            <Form.Item className="inline-box">
              {getFieldDecorator("onlineGroup", {
                // rules: [
                //   { required: true, message: "请选择在线组" },
                // ],
                initialValue: settingParams.onlineGroup,
              })(
                <OnlineGroupSelect 
                  groupMap={groupMap}
                  callGroupList={onlineGroup}
                  companyList={companyList}
                  orgList={orgList}
                />
              )}
            </Form.Item>
          </Row>
        </Row> */}
        <Row>
          <div className="center">
            <Button
              type="primary"
              onClick={submit}
              className="submit"
              disabled={isSubmit}
            >
              提交
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
});

export default Form.create()(globalSettingManage);
