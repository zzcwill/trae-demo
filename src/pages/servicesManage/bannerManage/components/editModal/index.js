import Api from "@/request/api-olhelpmanage.js";
import { post } from "@/request/request";
import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
} from "dpl-react";
import React, { useState } from "react";
import ImageInfoItem from "../imageInfoItem";
import ImageUpload from "../imageUpload";
import "./index.scss";

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const formItemLayout1 = {
    labelCol: {span: 10},
    wrapperCol: {span: 14},
};
const defaultImageInfo = {
    orderNo: 0,
    name: "",
    clickUrl: "",
    imageUrl: "",
};

function EditModal(props,) {
    const {
        className = "",
        form,
        areaList,
        formData = {},
        config,
        onCancel,
    } = props;
    
    const {getFieldDecorator, validateFields} = form;
    const [loading, setLoading] = useState(false);
    const [imageIsErrorList, setImageIsErrorList] = useState([]);
    const [imageInfoList, setImageInfoList] = useState(() => {
        let list = [];
        const imageList = formData.imageInfoList;
        let len = 0;
        if (config.type === "detail") {
            len = imageList.length;
        } else {
            len = imageList.length > 4 ? 8 : 4;
        }
        for (let i = 0; i < len; i++) {
            if (imageList[i]) {
                list.push({
                    ...imageList[i],
                });
            } else {
                list.push({
                    orderNo: i,
                    name: undefined,
                    clickUrl: undefined,
                    imageUrl: undefined,
                });
            }
        }
        return list;
    });

    const save = () => {
        form.validateFields((err, values) => {
            if (!err) {
                setLoading(true);
                let sendData = Object.assign({}, values);
                if (values.defaultImageUrl) {
                    sendData.defaultImageUrl = values.defaultImageUrl.imageUrl;
                    sendData.defaultImageName = values.defaultImageUrl.name;
                }
                // 判断是否存在图片为空，但链接不为空的情况
                let isError = false;
                imageIsErrorList.forEach((item) => {
                    if (item) {
                        isError = true;
                    }
                });
                if (isError) {
                    setLoading(false);
                    return false;
                }

                // 判断是否有图片
                let hasBannerImg = false;
                imageInfoList.forEach((item) => {
                    if (item.imageUrl) {
                        hasBannerImg = true
                    }
                });
                // 没有图片的时候弹窗提示
                if (!hasBannerImg) {
                    Modal.warning({
                        content: "轮播图组必须有图片！",
                        okText: "确定",
                    });
                    setLoading(false);

                    return false;
                }
                // 重新排序
                sendData.imageInfoList = [];
                let orderNo = 1;
                for (let i = 0, len = imageInfoList.length; i < len; i++) {
                    if (imageInfoList[i].imageUrl) {
                        sendData.imageInfoList.push(
                            Object.assign({}, imageInfoList[i], {orderNo})
                        );
                        orderNo++;
                    } else if (imageInfoList[i].clickUrl) {
                        this.message("提示", "请选择点击链接对应的图片！");
                        setLoading(false);
                        return false;
                    }
                }
                // 根据页面类型判断调用接口
                sendData.regionCode = sendData.regionCode.join(",");
                if (config.type === "add") {
                    addBannerGroup(sendData);
                } else if (config.type === "edit") {
                    updateBannerGroup(sendData);
                }
            }
        });
    };

    const addBannerGroup = async (data) => {
        try {
            const res = await post({
                url: Api.postSaveBanner,
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

    const updateBannerGroup = async (data) => {
        try {
            const res = await post({
                url: Api.postUpdateBanner,
                data: {
                    id: config.id,
                    ...data,
                },
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

    const imageInfoItemChange = (type, value, index) => {
        let imageList = [].concat(imageInfoList);
        switch (type) {
            case "value":
                imageList[index] = value;
                break;
            case "moveUp":
                imageList[index] = imageList[index - 1];
                imageList[index - 1] = value;
                break;
            case "moveDown":
                imageList[index] = imageList[index + 1];
                imageList[index + 1] = value;
                break;
        }
        setImageInfoList(imageList);
    };

    // 更多图片
    const moreImageInfo = () => {
        let imageList = [].concat(imageInfoList);
        for (let i = imageInfoList.length; i < 8; i++) {
            imageList.push({
                orderNo: i,
                name: undefined,
                clickUrl: undefined,
                imageUrl: undefined,
            });
        }
        setImageInfoList(imageList);
    };

    const imageIsErrorChange = (value, index) => {
        let errorList = [].concat(imageIsErrorList);
        errorList[index] = value;
        setImageIsErrorList(errorList);
    };

    return (
        <div className="edit-banner-box">
            <Form>
                <Row>
                    <Col span={12}>
                        <FormItem label="名称" {...formItemLayout}>
                            {getFieldDecorator("name", {
                                rules: [{required: true, message: "请输入名称"}],
                                initialValue: formData.name,
                            })(
                                <Input
                                    placeholder="请输入名称"
                                    maxLength="50"
                                    autocomplete="off"
                                    disabled={config.type === "detail"}
                                    allowClear
                                ></Input>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem label="地区" {...formItemLayout}>
                            {getFieldDecorator("regionCode", {
                                rules: [{required: true, message: "请选择地区"}],
                                initialValue: formData.regionCode,
                            })(
                                <Select
                                    placeholder="请选择地区"
                                    mode="multiple"
                                    maxTagCount={1}
                                    disabled={config.type === "detail"}
                                    maxTagTextLength={10}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {areaList.map((item, index) => {
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
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="轮播间隔时间" {...formItemLayout1}>
                            {getFieldDecorator("loopInterval", {
                                rules: [{required: true, message: "请输入轮播间隔时间"}],
                                initialValue: formData.loopInterval,
                            })(
                                <InputNumber
                                    inputWidth={100}
                                    min={1}
                                    max={99}
                                    precision={0}
                                    step={1}
                                    disabled={config.type === "detail"}
                                />
                            )}
                            <span className="unit">秒</span>
                        </FormItem>
                    </Col>
                    <Col span={14}>
                        <FormItem label="默认图片" {...formItemLayout}>
                            {getFieldDecorator("defaultImageUrl", {
                                rules: [{required: true, message: "请选择默认图片"}, (rule, value, callback) => {
                                  if (!value?.imageUrl) {
                                    callback("请选择默认图片");
                                  }
                                  callback();
                                }],
                                initialValue: {
                                    imageUrl: formData.defaultImageUrl,
                                    name: formData.defaultImageName,
                                },
                            })(
                                <ImageUpload
                                    disabled={config.type === "detail"}
                                    onChange={(value) => {
                                        console.log("ImageUpload", value);
                                    }}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div className="image-info-list-box">
                {imageInfoList.length > 0 &&
                imageInfoList.map((item, index) => {
                    return (
                        <Row className="image-info-box" key={index}>
                            <Col span={3}>
                                <div className="image-info-label">
                                    图片{index + 1}&nbsp;:&nbsp;
                                </div>
                            </Col>
                            <Col span={21}>
                                <ImageInfoItem
                                    value={item}
                                    onChange={(type, value) => {
                                        imageInfoItemChange(type, value, index);
                                    }}
                                    type={config.type}
                                    loading={loading}
                                    length={imageInfoList.length}
                                    index={index}
                                    imageIsErrorChange={imageIsErrorChange}
                                />
                            </Col>
                        </Row>
                    );
                })}
            </div>
            {config.type !== "detail" && imageInfoList.length < 8 && (
                <div
                    className="more-imageInfo"
                    onClick={() => {
                        moreImageInfo();
                    }}
                >
                    <span>更多图片</span>
                    <br/>
                    <Icon type="db-down-arrow"/>
                </div>
            )}
            {config.type !== "detail" && (
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
            )}
        </div>
    );
}

export default Form.create()(React.forwardRef(EditModal));
