import React, { useState, useEffect } from "react";
import "./index.scss";
import {
  Input,
  Button,
  message,
  Form,
  Col,
  Row,
  Select,
  Modal,
  Icon,
} from "dpl-react";
import Api from "@/request/api-olhelpmanage.js";
import { get, post } from "@/request/request";
import FunctionList from "../functionList";
import SelectAll from "../selectAll";
import QuestionList from "../questionList";
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const oneFormItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const defaultFormObj = {
  systemId: undefined,
  location: [],
  brand: [],
  usertype: [],
};
const typeList = ["location", "brand", "usertype"];

const isMultiple = (type) => {
  if (type === "add") {
    return {
      mode: "multiple",
      maxTagCount: 1,
      maxTagTextLength: 10,
      optionFilterProp: "children",
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    };
  } else {
    return {
      showSearch: true,
      optionFilterProp: "children",
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    };
  }
};
function EditModal(props) {
  const {
    className = "",
    form,
    systemList = [],
    locationList,
    brandList,
    usertypeList,
    formData = {},
    config,
    onCancel,
  } = props;
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  const [loading, setLoading] = useState(false);
  const [formObj, setFormObj] = useState(() => {
    if (config.type === "edit") {
      return {
        systemId: formData.systemId,
        location: formData.location,
        brand: formData.brand,
        usertype: formData.usertype,
      };
    }
    return defaultFormObj;
  }); // 系统ID
  const [questionDetail, setQuestionDetail] = useState({}); // 问答详情
  const [functionMap, setFunctionMap] = useState({}); // 功能的map
  const [functionNameList, setFunctionNameList] = useState([]); // 名字列表
  const [functionList, setFunctionList] = useState([]); // 功能
  const [showBigImage, setShowBigImage] = useState(false);
  const [currentImage, setCurrentImage] = useState(""); // 放大图片链接

  const valueChange = (key, value) => {
    if (key === "systemId") {
      getFunctionList(value);
      setFunctionNameList([]);
      setFieldsValue({ functonIdList: [] });
    }
    const sendData = Object.assign({}, formObj, {
      [key]: value,
    });
    if (typeList.indexOf(key) > -1 && value.length > 1) {
      setQuestionDetail({});
    }
    setFormObj(sendData);
  };

  const onQuestionSearch = (item) => {
    let sendData = {};
    if (config.type === "add") {
      if (
        formObj.location.length > 1 ||
        formObj.brand.length > 1 ||
        formObj.usertype.length > 1
      ) {
        setQuestionDetail({});
        return false;
      }
      sendData = {
        systemId: formObj.systemId || undefined,
        location:
          formObj.location[0] === "all" ? undefined : formObj.location[0],
        brand: formObj.brand[0] === "all" ? undefined : formObj.brand[0],
        usertype:
          formObj.usertype[0] === "all" ? undefined : formObj.usertype[0],
        question: item,
      };
    } else {
      sendData = Object.assign({}, formObj, {
        question: item,
      });
    }
    getQuestionDetail(sendData);
  };

  const getQuestionDetail = async (data) => {
    const res = await get({
      url: Api.getRobotQuestionDetail,
      params: {
        ...data,
      },
    });
    if (res.success) {
      const data = res.data;
      setQuestionDetail(data);
    } else {
      message.error(res.message);
    }
  };

  // 获取功能列表
  const getFunctionList = async (systemId) => {
    if (systemId) {
      const res = await get({
        url: Api.getFunctionList,
        params: {
          systemId,
        },
      });
      if (res.success) {
        const data = res.data;
        let functionObj = {};
        data.forEach((item) => {
          functionObj[item.id] = item.name;
          if (config.type === "edit" && item.id === formData.functionId) {
            setFunctionNameList([].concat(item.name));
          }
        });
        setFunctionMap(functionObj);
        setFunctionList(data);
      } else {
        message.error(res.message);
      }
    }
  };

  const functionNameChange = (data) => {
    setFunctionNameList(data);
  };

  // 点击选择按钮前的判断条件
  const beforeClick = () => {
    if (!formObj.systemId) {
      Modal.warning({
        content: "未选择系统，请先选择系统。",
        okText: "确定",
      });
      return false;
    }
    return true;
  };

  // 保存
  const save = () => {
    form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        if (config.type === "edit") {
          const sendData = {
            questionId: formData.id,
            location: values.locationList === "all" ? "" : values.locationList,
            brand: values.brandList === "all" ? "" : values.brandList,
            usertype: values.usertypeList === "all" ? "" : values.usertypeList,
            question: values.question,
          };
          updateQuestionConfig(sendData);
        } else {
          const sendData = {
            systemId: values.systemId,
            functionIdList: values.functonIdList,
            locationList:
              values.locationList[0] === "all" ? [] : values.locationList,
            brandList: values.brandList[0] === "all" ? [] : values.brandList,
            usertypeList:
              values.usertypeList[0] === "all" ? [] : values.usertypeList,
            question: values.question,
          };
          addQuestionConfig(sendData);
        }
      }
    });
  };

  // 新增
  const addQuestionConfig = async (data) => {
    try {
      const res = await post({
        url: Api.postSaveQuestion,
        data,
      });
      if (res.success) {
        message.success("新增成功！");
        onCancel(true);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const updateQuestionConfig = async (data) => {
    try {
      const res = await post({
        url: Api.postUpdateQuestion,
        data,
      });
      if (res.success) {
        message.success("修改成功！");
        onCancel(true);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const questionContentImgListen = (el, imgUrl) => {
    const parentClassName = "question-content-img";
    let img = imgUrl;
    if (el.tagName == "IMG") {
      img = el.src;
    }
    if (el.className && el.className.indexOf(parentClassName) > -1 && img) {
      setCurrentImage(img);
      setShowBigImage(true);
    } else {
      if (el.parentNode) {
        questionContentImgListen(el.parentNode, img);
      }
    }
  };

  useEffect(() => {
    if (config.type === "edit") {
      getFunctionList(formData.systemId);
    }
    function listenClick(e) {
      questionContentImgListen(e.target);
    }
    window.addEventListener("click", listenClick);
    return () => {
      window.removeEventListener("click", listenClick);
    };
  }, [config]);

  return (
    <div className="related-question-modal-box">
      <Form>
        <Row>
          <Col span={12}>
            <FormItem label="系统" {...formItemLayout}>
              {getFieldDecorator("systemId", {
                rules: [{ required: true, message: "请选择系统类型" }],
                initialValue: formData.systemId,
              })(
                <Select
                  placeholder="请选择系统类型"
                  onChange={(value) => {
                    valueChange("systemId", value);
                  }}
                  disabled={config.type === "edit"}
                >
                  {systemList.map((item, index) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="功能" {...formItemLayout}>
              {getFieldDecorator("functonIdList", {
                rules: [{ required: true, message: "请选择功能" }],
                initialValue:
                  config.type === "edit" ? [].concat(formData.functionId) : [],
              })(
                <FunctionList
                  disabled={config.type === "edit"}
                  inputList={functionNameList}
                  functionList={functionList}
                  beforeClick={beforeClick}
                  functionMap={functionMap}
                  functionNameChange={functionNameChange}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="地区维度" {...formItemLayout}>
              {getFieldDecorator("locationList", {
                initialValue:
                  config.type === "edit" ? formData.location || "all" : ["all"],
              })(
                <SelectAll
                  options={locationList}
                  onChange={(value) => {
                    valueChange("location", value);
                  }}
                  other={isMultiple(config.type)}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="产品维度" {...formItemLayout}>
              {getFieldDecorator("brandList", {
                initialValue:
                  config.type === "edit" ? formData.brand || "all" : ["all"],
              })(
                <SelectAll
                  options={brandList}
                  onChange={(value) => {
                    valueChange("brand", value);
                  }}
                  other={isMultiple(config.type)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="会员等级" {...formItemLayout}>
              {getFieldDecorator("usertypeList", {
                initialValue:
                  config.type === "edit" ? formData.usertype || "all" : ["all"],
              })(
                <SelectAll
                  options={usertypeList}
                  onChange={(value) => {
                    valueChange("usertype", value);
                  }}
                  other={isMultiple(config.type)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="标准问" {...oneFormItemLayout}>
            {getFieldDecorator("question", {
              rules: [{ required: true, message: "标准问不能为空" }],
              initialValue: formData.question,
            })(
              <QuestionList
                searchData={formObj}
                onQuestionSearch={onQuestionSearch}
                type={config.type}
              />
            )}
          </FormItem>
        </Row>
        <Row>
          <FormItem label="答案" {...oneFormItemLayout}>
            <div className="answer">
              <div
                className="content question-content-img"
                dangerouslySetInnerHTML={{ __html: questionDetail.content }}
              ></div>
              {questionDetail.p4Content && (
                <div className="content">{questionDetail.p4Content}</div>
              )}
            </div>
          </FormItem>
        </Row>
      </Form>
      {showBigImage && (
        <div className="look-image">
          <img
            className="img"
            src={currentImage}
            onClick={() => {
              setShowBigImage(false);
            }}
          />
          <Icon
            type="close"
            className={"close-icon"}
            onClick={() => {
              setShowBigImage(false);
            }}
          />
        </div>
      )}
      <div className="button-box">
        <Button
          type="primary"
          className="button-item"
          loading={loading}
          onClick={() => {
            save();
          }}
        >
          保存
        </Button>
        <div className="line-box"></div>
        <Button
          className="button-item"
          disabled={loading}
          onClick={() => {
            onCancel();
          }}
        >
          取消
        </Button>
      </div>
    </div>
  );
}
export default Form.create()(React.forwardRef(EditModal));
