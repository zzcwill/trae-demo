import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Select, Button, message } from "dpl-react";
import { getQueryString, isDef } from "@/utils/index";
import UploadImage from "./component/uploadImage";
import Api from "@/request/api-olhelpmanage";
import { get, post } from "@/request/request";
import "./index.scss";
import history from "@/history";
import localStorageHelper from "@/utils/localStorage";
import qs from "qs";

const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const formItemLayout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

function ExpertDetail(props, ref) {
  const [id, setId] = useState(() => {
    return getQueryString().id;
  });
  const [detail, setDetail] = useState({});
  const [labelList, setLabelList] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const { form } = props;
  const { getFieldDecorator } = form;
  const getDetail = async () => {
    const data = await get({ url: Api.getExpertDetail, params: { id: id } });
    if (data.success) {
      const result = data.data;
      result.img = [
        {
          imageUrl: result.headPicUrl,
          domain: result.domain,
          name: result.headPicName,
        },
      ];
      result.speciality = result.speciality.replace(/<br\/>/g, "\n");
      result.workTime = result.workTime.replace(/<br\/>/g, "\n");
      result.indexNum = result.indexNum + "";
      setDetail(result);
    }
  };
  const getLabel = async () => {
    const data = await get({
      url: Api.getEnumOptions,
      params: { groupNames: "PROFESSION_TAG,consult_channel" },
    });
    if (data.success) {
      data.data.forEach((item) => {
        if (item.groupName === "PROFESSION_TAG") {
          setLabelList(item.options || []);
        }
        if (item.groupName === "consult_channel") {
          setChannelList(item.options || []);
        }
      });
    }
  };
  const getLocationList = async () => {
    const data = await get({ url: Api.queryAreaList });
    if (data.success) {
      setLocationList(data.data || []);
    }
  };
  const goExpertManage = (shouldFirstRender = true) => {
    let params = localStorageHelper.getItem("_listPage_query") || {};
    params.firstRender = shouldFirstRender;
    history.push("/employeeManage/expertManage?" + qs.stringify(params));
  };
  const confirmHandler = async () => {
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const enterReg = /[\n|\r]/g;
        const trimFn = (str) => {
          if (typeof str !== "string") return "";
          return str.trim();
        };
        const img = Array.isArray(values.img) ? values.img[0] : {};
        values.name = trimFn(values.name);
        values.appellation = trimFn(values.appellation);
        values.professionalTitle = trimFn(values.professionalTitle);
        values.workTime = trimFn(values.workTime.replace(enterReg, "<br/>"));
        values.speciality = trimFn(
          values.speciality.replace(enterReg, "<br/>")
        );
        values.headPicUrl = img.imageUrl;
        values.headPicName = img.name;
        values.id = id;
        let url = isDef(id) ? Api.editExpert : Api.saveExpert;
        const data = await post({ url, data: values });
        if (data.success) {
          message.success(isDef(id) ? "修改成功" : "新建成功");
          goExpertManage();
        } else {
          message.error(data.message);
        }
      }
    });
  };
  const cancelHandler = async () => {
    goExpertManage(false);
  };
  const indexNumValidate = (rule, value, callback) => {
    try {
      const hasValue = !!value;
      const isNum = value.indexOf(".") < 0;
      const isRang = value >= 1 && value <= 9999;
      if (hasValue && isNum && isRang) {
        callback();
      }
    } catch (e) {
      callback("请输入正整数，且范围为1-9999");
    }
    callback("请输入正整数，且范围为1-9999");
  };
  const filterOption = (value, option) => {
    if (option.props.children && option.props.children.indexOf(value) >= 0) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (id) {
      getDetail();
    }
    getLabel();
    getLocationList();
  }, []);
  return (
    <div className="expert-detail">
      <Form>
        <Form.Item
          label="专家头像"
          {...formItemLayout}
          style={{ display: "flex", alignItems: "center" }}
        >
          {getFieldDecorator("img", {
            rules: [{ required: true, message: "请上传专家头像" }],
            initialValue: detail.img,
          })(<UploadImage />)}
          <div>图片尺寸建议64*64，大小不能超过1M</div>
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item label="专家名称" {...formItemLayout1}>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入专家名称" }],
                initialValue: detail.name,
              })(<Input maxLength={5} />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="专家头衔" {...formItemLayout1}>
              {getFieldDecorator("appellation", {
                rules: [{ required: true, message: "请输入专家头衔" }],
                initialValue: detail.appellation,
              })(<Input maxLength={6} />)}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="职称"
          {...formItemLayout}
          style={{ display: "flex", alignItems: "center" }}
        >
          {getFieldDecorator("professionalTitle", {
            rules: [{ required: true, message: "请输入职称" }],
            initialValue: detail.professionalTitle,
          })(<Input maxLength={15} />)}
        </Form.Item>
        <Form.Item
          label="擅长"
          {...formItemLayout}
          style={{ display: "flex", alignItems: "center" }}
        >
          {getFieldDecorator("speciality", {
            rules: [{ required: true, message: "请输入擅长" }],
            initialValue: detail.speciality,
          })(<Input.TextArea rows={3} maxLength={30} />)}
        </Form.Item>
        <Form.Item
          label="上班时间"
          {...formItemLayout}
          style={{ display: "flex", alignItems: "center" }}
        >
          {getFieldDecorator("workTime", {
            rules: [{ required: true, message: "请输入上班时间" }],
            initialValue: detail.workTime,
          })(<Input.TextArea rows={3} maxLength={30} />)}
        </Form.Item>
        <Form.Item
          label="标签"
          {...formItemLayout}
          style={{ display: "flex", alignItems: "center" }}
        >
          {getFieldDecorator("labelList", {
            initialValue: detail.labelList,
          })(
            <Select mode="multiple">
              {labelList.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="账号"
          {...formItemLayout}
          style={{ display: "flex", alignItems: "center" }}
        >
          {getFieldDecorator("account", {
            rules: [{ required: true, message: "请输入账号" }],
            initialValue: detail.account,
          })(<Input maxLength={30} />)}
        </Form.Item>
        <Form.Item
          label="顺序"
          {...formItemLayout}
          style={{ display: "flex", alignItems: "center" }}
        >
          {getFieldDecorator("indexNum", {
            rules: [{ validator: indexNumValidate }],
            initialValue: detail.indexNum || "1",
          })(<Input type="number" />)}
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item label="适用地区" {...formItemLayout1}>
              {getFieldDecorator("locationList", {
                rules: [{ required: true, message: "请选择适用地区" }],
                initialValue: detail.locationList,
              })(
                <Select mode="multiple" filterOption={filterOption}>
                  {locationList.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="适用渠道" {...formItemLayout1}>
              {getFieldDecorator("channelList", {
                rules: [{ required: true, message: "请选择适用渠道" }],
                initialValue: detail.channelList,
              })(
                <Select mode="multiple" filterOption={filterOption}>
                  {channelList.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="btn-group">
        <Button
          type="primary"
          style={{ marginRight: 12 }}
          loading={btnLoading}
          onClick={confirmHandler}
        >
          保存
        </Button>
        <Button onClick={cancelHandler}>取消</Button>
      </div>
    </div>
  );
}

export default Form.create()(React.forwardRef(ExpertDetail));
