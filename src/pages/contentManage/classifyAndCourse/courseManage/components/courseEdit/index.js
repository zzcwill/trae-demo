import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { message, Button, Form, Row, Input, Icon } from "dpl-react";
import { get, post } from "@/request/request";
import API from "@/request/api";
import QusetionDetail from "../questionDetail";
import UploadImage from "../uploadImage";
import noAuth_img from "./images/noAuth.png";
import CourseDetail from "../courseDetail";

const defaultLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const CourseEdit = React.forwardRef((props, ref) => {
  const {
    questionId,
    detail = {},
    onCancel,
    type = "add",
    modalTitleChange,
    form
  } = props;
  const { getFieldDecorator, setFieldsValue, getFieldsValue } = form;
  const [questionInfo, setQuestionInfo] = useState({}); // 问答详情
  const [isQuestionExist, setIsQuestionExist] = useState(true); // 默认认为问答数据存在
  const [loading, setLoading] = useState(false); // loading

  /**
   * 格式化数据
   */
  const initParam = data => {
    return {
      name: data.name, // 课程名称
      imageUrl: (data.imageList && data.imageList[0].imageUrl) || "", // 图片链接
      courseUrl: data.courseUrl || "", // 课程链接
      teacherName: data.teacherName || "", // 讲师名称
      guideSpeech: data.guideSpeech || "" // 引导话术
    };
  };

  /**
   * 发布课程
   */
  const publishCourse = () => {
    form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        console.log(value);
        const formData = initParam(value);
        let params = {};
        if (type === "add") {
          // 新增
          params = Object.assign({}, formData, {
            questionId
          });
          addCourse(params);
        } else {
          //编辑
          params = Object.assign({}, formData, {
            id: detail.id
          });
          updateCourse(params);
        }
      }
    });
  };

  /**
   * 新增课程
   */
  const addCourse = async data => {
    setLoading(true);
    const res = await post({
      url: API.postAddCourse,
      data
    });
    if (res.success) {
      message.success("新增课程成功！");
      onCancel(true);
    } else {
      message.error(res.message);
    }
    setLoading(false);
  };

  /**
   * 更新课程信息
   */
  const updateCourse = async data => {
    setLoading(true);
    const res = await post({
      url: API.updateCourse,
      data
    });
    if (res.success) {
      message.success("编辑课程成功！");
      onCancel(true);
    } else {
      message.error(res.message);
    }
    setLoading(false);
  };

  /**
   * 取消发布
   */
  const channelPublish = () => {
    onCancel();
  };

  /**
   * 编辑发布
   */
  const editCourse = () => {
    modalTitleChange({
      title: "编辑课程",
      type: "edit"
    });
  };

  /**
   * 课程图片背景
   */
  const imageBackground = () => {
    return (
      <div className="image-background">
        <Icon type="plus" className="suggestion-icon" />
        <div className="suggestion">建议尺寸为218*115</div>
      </div>
    );
  };

  /**
   * 查询问题详情
   */
  const getQuestionDetail = async id => {
    const res = await get({
      url: API.getQuestionReply,
      params: {
        id
      }
    });
    if (res.success) {
      const data = res.data;
      setQuestionInfo(data);
    } else {
      message.error(res.message);
      if (res.messageCode == "api.question.not_exist") {
        setIsQuestionExist(false);
      }
    }
  };

  useEffect(() => {
    getQuestionDetail(questionId);
  }, []);

  return (
    <div className="edit-box">
      <div className="left-edit-box">
        {isQuestionExist && <QusetionDetail detail={questionInfo} />}
        {!isQuestionExist && (
          <div className="error-box">
            <img src={noAuth_img} className="error-imgage" />
            <div className="center">问题不存在,请重新查询后再试！</div>
          </div>
        )}
      </div>
      <div className='edit-line'></div>
      <div className="rigth-edit-box">
        {type !== "detail" && (
          <Form className='edit-form-box'>
            <Row>
              <Form.Item label="课程名称：" {...defaultLayout} colon={false}>
                {getFieldDecorator("name", {
                  initialValue: detail.name || "",
                  rules: [{ required: true, message: "请输入课程名称！" }]
                })(
                  <Input
                    maxLength={30}
                    placeholder="请输入课程名称，不超过30个字"
                    AUTOCOMPLETE="off"
                  />
                )}
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="讲师姓名：" {...defaultLayout} colon={false}>
                {getFieldDecorator("teacherName", {
                  initialValue: detail.teacherName || "",
                  rules: [{ required: true, message: "请输入讲师姓名！" }]
                })(
                  <Input
                    maxLength={10}
                    placeholder="请输入课程名称，不超过10个字"
                    AUTOCOMPLETE="off"
                  />
                )}
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="课程图片：" {...defaultLayout} colon={false}>
                {getFieldDecorator("imageList", {
                  initialValue: detail.imageUrl
                    ? [].concat({
                        imageUrl: detail.imageUrl,
                        name: "课程图片"
                      })
                    : [],
                  rules: [{ required: true, message: "请添加课程图片！" }]
                })(
                  <UploadImage
                    maxLength={1}
                    background={imageBackground}
                    nameLength={100}
                    fileSize={1}
                    iconStyle={{
                      fontSize: "24px",
                      margin: "0 20px"
                    }}
                    size={{
                      width: "218px",
                      height: "115px"
                    }}
                  />
                )}
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="课程链接：" {...defaultLayout} colon={false}>
                {getFieldDecorator("courseUrl", {
                  initialValue: detail.courseUrl || "",
                  rules: [{ required: true, message: "请输入课程链接！" }]
                })(
                  <Input
                    maxLength={100}
                    placeholder="链接需要包含http://或https://且不能超过100个字"
                    AUTOCOMPLETE="off"
                  />
                )}
              </Form.Item>
            </Row>
            <Row>
              <Form.Item label="引导话术：" {...defaultLayout} colon={false}>
                {getFieldDecorator("guideSpeech", {
                  initialValue: detail.guideSpeech || ""
                })(
                  <Input
                    maxLength={100}
                    placeholder="请输入课程内容前的引导话术，不超过100个字"
                    AUTOCOMPLETE="off"
                  />
                )}
              </Form.Item>
            </Row>
          </Form>
        )}
        {type !== "detail" && (
          <Row className="center">
            <Button
              type="primary"
              className="search-button"
              loading={loading}
              onClick={() => {
                publishCourse();
              }}
              disabled={!isQuestionExist}
            >
              发布课程
            </Button>
            <div className="line-box"></div>
            <Button
              className="search-button"
              disabled={loading}
              onClick={() => {
                channelPublish();
              }}
            >
              取消发布
            </Button>
          </Row>
        )}
        {type === "detail" && <CourseDetail detail={detail} />}
        {type === "detail" && (
          <Row className="center">
            <Button
              type="primary"
              className="search-button"
              loading={loading}
              onClick={() => {
                editCourse();
              }}
            >
              编辑课程
            </Button>
            <div className="line-box"></div>
            <Button
              className="search-button"
              disabled={loading}
              style={{ width: "90px" }}
              onClick={() => {
                channelPublish();
              }}
            >
              关&nbsp;&nbsp;闭
            </Button>
          </Row>
        )}
      </div>
    </div>
  );
});

export default Form.create()(CourseEdit);
