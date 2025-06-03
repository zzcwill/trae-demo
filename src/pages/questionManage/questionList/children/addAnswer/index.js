import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import {
  Form,
  Button,
  Input,
  TreeSelect,
  Row,
  Col,
  Select,
  message,
  Alert,
  Switch,
} from "dpl-react";
import { getRequiredRule, getRangeRule } from "@/utils/rules";
import sessionStorageHelper from "@/utils/sessionStorage";
import { formatImage } from "@/utils/index";
import UEditor from "@/components/consultManage/ueditor";
import PreviewImg from "@/components/common/previewImg";
import UploadImage from "@/components/common/uploadImage";
import CommentModal from "@/components/common/commentModal";
import AskListModal from "../../components/askListModal/index";
import RightsListModal from "../../components/rightsModal/index";
import AskAnswerModal from "../../components/askAnswerModal/index";
import history from "@/history";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import qs from "qs";
import QuestionPreview from "@/components/questionManage/questionPreview";

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 15 },
};

/**
 * 格式化树节点，利用treeNode自行渲染，要拼接父标签名称
 * @param {props} tree
 * @param {props} formatObj
 */
function formatTree(tree, parentLabel) {
  return tree.map((item) => {
    let label = parentLabel
      ? `${parentLabel}-${item.labelName}`
      : item.labelName;
    return (
      <TreeSelect.TreeNode
        key={item.labelId}
        value={item.labelId}
        title={label}
      >
        {formatTree(item.children || [], item.labelName)}
      </TreeSelect.TreeNode>
    );
  });
}

function AuditStatusView(props) {
  const { reply } = props;
  return (
    <div className="margin-top15">
      {reply && reply.replyAuditStatus === "AUDIT_UN_PASS" && (
        <Alert
          message="审核不通过"
          description={reply.auditUnPassReason}
          type="error"
          showIcon
        />
      )}
      {reply && reply.replyAuditStatus === "AUDIT_PASS" && (
        <Alert message="审核通过" type="success" showIcon />
      )}
    </div>
  );
}
function AddAnswer(props, refs) {
  const { form } = props;
  const {
    getFieldDecorator,
    validateFields,
    getFieldInstance,
    setFieldsValue,
    resetFields,
  } = form;

  const query = qs.parse(window.location.href.split("?")[1]);

  const [questionId, setQuestionId] = useState(() => {
    return query.questionId;
  });
  const [replyId, setReplyId] = useState(() => {
    //编辑才有回复id
    return query.replyId;
  });
  const [type, setType] = useState(() => {
    //新增、编辑、审核
    return query.type;
  });
  const [labels, setLabels] = useState([]);
  const [locationList, setLocation] = useState([]); //地区
  const [detail, setDetail] = useState({});
  const [reply, setReply] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const detailIframeRef = useRef(null);
  const [loading, seyLoading] = useState(false);
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [rightsModalOpen, setRightsModalOpen] = useState(false);
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  console.log("detail", detail);
  const formatDetail = (detail) => {
    if (detail.imageUrlList) {
      detail.formatUrl = detail.imageUrlList.map((url) => {
        return { imageUrl: url };
      });
    }
    return detail;
  };
  const getDetail = async () => {
    if (replyId) {
      //修改有回答
      const data = await get({ url: Api.getReplyDetail, params: { replyId } });
      if (data.success) {
        const detail = data.data;
        setDetail(formatDetail(detail));
        if (detail.reply) {
          if (
            type === "audit" ||
            detail.reply.replyAuditStatus === "AUDIT_PASS"
          ) {
            // 审核试编辑模式,或者审核通过 把href属性去掉
            detail.reply.reply = detail.reply.reply.replace(/ href /g, " ");
          }
          setReply(detail.reply);
        }
      }
    } else {
      //新增
      const data = await get({
        url: Api.getQuestionDetail,
        params: { questionId },
      });
      if (data.success) {
        setDetail(formatDetail(data.data));
      }
    }
  };

  const getLocationList = async () => {
    const data = await get({
      url: Api.commonGetLocationList,
      params: { type: 0 },
    });
    setLocation(data.data);
  };
  const getLabels = async () => {
    const data = await get({ url: Api.getCommonLabels });
    if (data.success) {
      setLabels(data.data);
    }
  };

  const formatData = (values) => {
    values.questionId = questionId; //问题id
    values.replyId = replyId;
    // 问题标签可能要处理一下
    if (values.imageUrl && values.imageUrl.length > 0) {
      values.replyHeaderUrl = values.imageUrl[0].imageUrl;
      delete values.imageUrl;
    }
    return values;
  };

  // SAVE-保存回答，AUDIT-审核状态
  const confirmHandler = (type) => {
    form.validateFields(async (err, values) => {
      if (err) return;
      seyLoading(true);
      values.replyOperatorEnum = type;
      const params = formatData(values);

      let data = null;
      if (replyId) {
        data = await post({ url: Api.postUpdateReply, data: { ...params } });
      } else {
        data = await post({ url: Api.postSaveReply, data: { ...params } });
      }
      if (!data) return;
      if (data.success) {
        if (type !== "SAVE") {
          closePage();
        }
        if (type === "SAVE" && !replyId) {
          setReplyId(data.data);
        }
        message.success("操作成功");
      } else {
        message.error(data.message);
      }
      seyLoading(false);
    });
  };

  const previewAnswer = () => {
    // 先存一下数据
    form.validateFields(async (err, values) => {
      if (err) return;

      setPreviewOpen(true);

      // sessionStorageHelper.setItem('__questionAnswer', newDetail)
      // history.push('/questionManage/questionList/questionPreview')
    });
  };
  const getPreviewDetail = () => {
    const values = form.getFieldsValue();
    values.replyOperatorEnum = "AUDIT";
    const params = formatData(values);
    params.replyId = replyId;

    // 添加默认署名以及头像
    params.replyName = params.replyName || "财税小管家";
    params.replyHeaderUrl =
      params.replyHeaderUrl ||
      "http://servu-consult.oss-cn-hangzhou.aliyuncs.com/yypt-olhelp-manage/picture/group/2021/07/1625648696126.svg";
    params.locationList = locationList.filter(
      (item) => params.locationList.indexOf(item.id) > -1
    );
    const newDetail = { ...detail};
    newDetail.answer = params;
    console.log("getPreviewDetail", newDetail);
    return newDetail;
  };

  // AUDIT_PASS-审核通过，AUDIT_UN_PASS-审核未通过
  const auditHandler = async (type, text) => {
    const params = {
      replyId,
      replyAuditStatus: type,
      auditUnPassReason: text,
    };

    let data = await post({ url: Api.postSaveAudit, data: { ...params } });
    if (!data) return;
    if (data.success) {
      closePage();
      message.success("操作成功");
    } else {
      message.error(data.message);
    }
  };
  const recommendChange = async (e) => {
    const newStatus = e ? "Y" : "N";
    setDetail({ ...detail, recommendStatus: newStatus});
    let data = await post({
      url: Api.postUpdateQuestionRecommend,
      data: { questionId: questionId, recommendStatus: newStatus },
    });
    if (!data) return;
    if (data.success) {
      message.success("操作成功");
    } else {
      message.error(data.message);
    }
  };

  const closePage = () => {
    // history.goBack()
    if (type === "audit") {
      history.push("/questionManage/answerList");
    } else {
      history.push("/questionManage/questionList");
    }
  };

  /**
   * 选择全部
   */
  const selectAll = () => {
    let result = locationList.map((item) => item.id);
    console.log("result", result);
    setFieldsValue({
      locationList: result,
    });
  };

  /**
   * 删除全部
   */
  const deleteAll = () => {
    setFieldsValue({
      locationList: [],
    });
  };

  const initImage = (detail, type) => {
    if (detail && detail.replyHeaderUrl) {
      return [
        {
          imageUrl: detail.replyHeaderUrl,
          name: detail.replyName,
        },
      ];
    }
    return undefined;
  };
  // 格式化
  const formatResult = (imgObj) => {
    return { ...imgObj, imageUrl: imgObj.domain + imgObj.imageUrl,};
  };

  const disabled = () => {
    if (type === "audit") {
      return true;
    } 
      //新增或者编辑 只要审核通过才禁止编辑
      if (reply && reply.replyAuditStatus === "AUDIT_PASS") {
        return true;
      }
      return false;
    
  };

  const uploadFilePlugin = (ueditor) => {
    return {
      menuText: "图片上传",
      cssRules: "background-position: -726px -77px;",
      render: (visible, closeModal) => {
        const handleSelectImage = (url) => {
          ueditor.focus();
          ueditor.execCommand("inserthtml", `<img src="${url}" />`);
          closeModal();
        };
        return <Modal visible={visible} onSelectImage={handleSelectImage} />;
      },
    };
  };

  const customizeEditConfig = {
    customizeToolbars: [
      "strikethrough", //删除线
      "forecolor", //字体颜色
      "inserttable", //插入表格
      "attachment", // 附件
      "customskip", //自定义跳转
      "fontsize", //字号
      "paragraph", //段落格式
      "removeformat", //清除格式
      "backcolor", //背景色
      "formatmatch", //格式刷
    ],
    uploadFileConfig: {
      imgSize: 100,
      fileSize: 100,
      fileNameLength: 200,
      totalSize: 1000,
      multiple: false,
    },
  };

  useEffect(() => {
    if (questionId || replyId) {
      getDetail();
    }
  }, [questionId, replyId]);
  useEffect(() => {
    getLabels();
    getLocationList();
  }, []);

  const user = sessionStorageHelper.getItem("__userInfo"); // 用户信息

  return (
    <div className="answer-detail" ref={refs}>
      <div className="add-answer">
        <Form>
          <div className="question-view">
            <h2>答案编辑</h2>
            {type === "audit" && detail.openStatus === "Y" && (
              <div className="recommend-view">
                <span className="label">是否推荐</span>
                <Switch
                  checked={detail.recommendStatus === "Y"}
                  onChange={recommendChange}
                />
              </div>
            )}
            <FormItem label="用户问题" {...formItemLayout}>
              {detail.question}
            </FormItem>
            <FormItem
              label="补充描述"
              {...formItemLayout}
              style={{ marginBottom: "12px" }}
            >
              <span className="question-description">
                {detail.description || "无"}
              </span>
            </FormItem>
            {detail.formatUrl && detail.formatUrl.length > 0 && (
              <Row style={{ marginBottom: "12px" }}>
                <Col offset={3} span={21}>
                  <PreviewImg src={detail.formatUrl} />
                </Col>
              </Row>
            )}
            <FormItem {...formItemLayout} label="问题标签">
              {getFieldDecorator("labelIdList", {
                initialValue: detail.labelIdList || undefined,
                rules: [getRequiredRule("请选择问题标签", "array")],
              })(
                <TreeSelect
                  disabled={disabled()}
                  placeholder="请选择问题标签"
                  // mode="multiple"
                  multiple={false}
                  allowClear
                  treeCheckable
                  showCheckedStrategy={TreeSelect.SHOW_CHILD}
                  treeNodeFilterProp="title"
                  getPopupContainer={(triggerNode) => {
                    return triggerNode.parentNode;
                  }}
                >
                  {formatTree(labels)}
                </TreeSelect>
              )}
            </FormItem>
            <FormItem
              label="用户手机号码"
              className="normal-text"
              {...formItemLayout}
            >
              <span>
                {detail.mobile}(
                <span
                  className="click-text"
                  onClick={() => setAskModalOpen(true)}
                >
                  提问过{detail.askTimes || 0}次
                </span>
                )
              </span>{" "}
              &nbsp; 用户权益：
              {detail.rightFlag == true ? (
                <span
                  className="click-text"
                  onClick={() => setRightsModalOpen(true)}
                >
                  付费用户
                </span>
              ) : (
                "非付费用户"
              )}{" "}
              &nbsp; 用户提问时间：{detail.askTime} &nbsp; 问题性质：
              {detail.openStatus === "Y" ? "公开" : "私密"}
              {detail.sourceReplyId != undefined && (
                <span>
                  /
                  <span
                    className="click-text"
                    onClick={() => setAnswerModalOpen(true)}
                  >
                    追问
                  </span>
                </span>
              )}
            </FormItem>
          </div>
          {type === "edit" && <AuditStatusView reply={reply} />}
          <div className="answer-view">
            {disabled() === true && (
              <FormItem label="回答" {...formItemLayout}>
                {getFieldDecorator(
                  "reply",
                  {}
                )(
                  <div
                    className="detail-item-content"
                    dangerouslySetInnerHTML={{
                      __html: formatImage(reply.reply),
                    }}
                  ></div>
                )}
              </FormItem>
            )}
            {disabled() === false && (
              <FormItem label="回答" {...formItemLayout}>
                {getFieldDecorator("reply", {
                  initialValue: reply.reply || undefined,
                  rules: [getRequiredRule("请输入回答")],
                })(
                  <UEditor
                    disabled={disabled()}
                    customizeConfig={customizeEditConfig}
                  />
                )}
              </FormItem>
            )}
            <FormItem label="适用地区" {...formItemLayout}>
              {getFieldDecorator("locationList", {
                initialValue: reply.locationList
                  ? reply.locationList.map((item) => item.code)
                  : undefined,
                rules: [getRequiredRule("请选择适用地区", "array")],
              })(
                <Select
                  disabled={disabled()}
                  mode="multiple"
                  showSearch
                  optionFilterProp="children"
                >
                  {locationList &&
                    locationList.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              )}
            </FormItem>
            {type !== "audit" && (
              <Row style={{ marginBottom: "24px" }}>
                <Col offset={3}>
                  <Button type="primary" size="small" onClick={selectAll}>
                    一键全选
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    style={{ marginLeft: 10 }}
                    onClick={deleteAll}
                  >
                    一键删除
                  </Button>
                </Col>
              </Row>
            )}
            <FormItem label="回答人署名" {...formItemLayout}>
              {getFieldDecorator("replyName", {
                initialValue: reply.replyName || user.name,
                rules: [getRangeRule(0, 20, "字数限制20")],
              })(
                <Input placeholder="请输入回答人署名" disabled={disabled()} />
              )}
            </FormItem>
            {type !== "audit" && (
              <FormItem label="回答人头像" {...formItemLayout}>
                {getFieldDecorator("imageUrl", {
                  initialValue: initImage(reply),
                })(
                  <UploadImage
                    disabled={disabled()}
                    maxSize={1}
                    imgProp="imageUrl"
                    isShowDelete={true}
                    formatResult={formatResult}
                  />
                )}
              </FormItem>
            )}
            {type === "audit" && (
              <FormItem label="回答时间" {...formItemLayout}>
                {reply.replyTime}
              </FormItem>
            )}
          </div>
        </Form>
        {type === "audit" && <AuditStatusView reply={reply} />}
        <div
          className="app-buttons app-buttons-center"
          style={{ marginTop: "15px" }}
        >
          <Button className="app-button" onClick={closePage}>
            取消
          </Button>
          {type !== "audit" &&
            reply &&
            reply.replyAuditStatus !== "AUDIT_PASS" && (
              <div className="app-button">
                <Button
                  className="app-button"
                  type="primary"
                  onClick={() => confirmHandler("SAVE")}
                >
                  保存回答
                </Button>
                <Button
                  className="app-button"
                  type="primary"
                  onClick={previewAnswer}
                >
                  预览回答
                </Button>
                <Button
                  className="app-button"
                  type="primary"
                  onClick={() => confirmHandler("AUDIT")}
                >
                  提交审核
                </Button>
              </div>
            )}
          {type === "audit" &&
            reply &&
            reply.replyAuditStatus === "UN_AUDIT" && (
              <div className="app-button">
                <Button
                  className="app-button"
                  type="primary"
                  onClick={() => auditHandler("AUDIT_PASS")}
                >
                  审核通过
                </Button>
                <Button
                  className="app-button"
                  type="primary"
                  onClick={() => setShowModal(true)}
                >
                  审核不通过
                </Button>
              </div>
            )}
        </div>
        <CommentModal
          open={showModal}
          maxLength={500} //最大字符长度
          title="未通过补充说明" //模态框名称
          label="审核不通过理由" //项目名称
          prop="remark" //参数名称
          handleClose={() => setShowModal(false)}
          handleClick={(remark) => auditHandler("AUDIT_UN_PASS", remark)}
        />
        <AskListModal
          open={askModalOpen}
          model={detail}
          onCancel={() => setAskModalOpen(false)}
        />
        <RightsListModal
          open={rightsModalOpen}
          detail={detail}
          onCancel={() => setRightsModalOpen(false)}
        />
        <AskAnswerModal
          open={answerModalOpen}
          model={detail}
          onCancel={() => setAnswerModalOpen(false)}
        />
      </div>
      {previewOpen === true && (
        <div className="answer-preview">
          <div className="answer-preview-scroll">
            <h2>回答预览</h2>
            <div className="preview-box">
              <QuestionPreview data={getPreviewDetail()} />
            </div>
            <div
              className="app-buttons app-buttons-center"
              style={{ marginTop: "15px" }}
            >
              <Button
                className="app-button"
                onClick={() => setPreviewOpen(false)}
              >
                返回编辑
              </Button>
              <Button
                className="app-button"
                type="primary"
                onClick={() => confirmHandler("AUDIT")}
                loading={loading}
              >
                提交审核
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form.create()(React.forwardRef(AddAnswer));
