import React, { useState, useEffect } from "react";
import { Form, Input, Cascader, Button, Modal, message } from "dpl-react";
import debounce from "lodash/debounce";
import { get, post } from "@/request/request";
import Api from "@/request/api";
import "./index.scss";
import UploadImage from "../uploadImage";
import history from "@/history";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

function QuestionForm(props, ref) {
  const { form, question = {}, onSave } = props;
  const { getFieldDecorator, validateFieldsAndScroll, setFieldsValue } = form;
  const [searchQuestion, setSearchQuestion] = useState([]); // 相似问题
  const [showSearchQuestion, setShowSearchQuestion] = useState(false); // 相似问题
  const [category, setCategory] = useState([]); // 分类
  const getSearchQuestion = debounce(async (keyword) => {
    const data = await get({
      url: Api.getResumeSearch,
      params: {
        maxReturnNum: 5,
        keyword,
      },
    });
    if (data.success) {
      setSearchQuestion(data.data);
    } else {
      setSearchQuestion([]);
    }
  }, 300);
  const getCategory = async () => {
    const data = await get({ url: Api.getClassifyTree });
    if (data.success) {
      const step = (arr, parent) => {
        arr.forEach((item) => {
          item.path = parent ? parent.path + "," + item.id : item.id;
          item.value = item.id + "";
          item.label = item.name;
          if (item.children) {
            if (item.children.length === 0) {
              delete item.children;
            } else {
              item.children && step(item.children, item);
            }
          }
        });
      };
      step(data.data);
      setCategory(data.data);
    }
  };
  const deleteHandler = () => {
    Modal.confirm({
      title: "正在进行删除问题的操作",
      content: "问题下的回答也将一起删除，你还要继续吗？",
      onOk: async () => {
        const data = await post({
          url: Api.batchDeleteQuestion,
          data: { idList: [question.id] },
        });
        if (data.success) {
          message.success("删除成功");
          history.push("/contentManage/qaManage/taxLib");
        } else {
          message.error(data.message);
        }
      },
    });
  };
  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    setFieldsValue({
      ...question,
    });
  }, [question]);
  return (
    <div className="question-form">
      <Form>
        <FormItem label="目录" {...formItemLayout}>
          {getFieldDecorator("classifyId", {
            rules: [{ required: true, message: "请选择目录" }],
            initialValue: question.classifyId,
          })(
            <Cascader
              options={category}
              placeholder="请选择目录"
              changeOnSelect={true}
              style={{ width: 300 }}
              showSearch
            />
          )}
        </FormItem>
        <FormItem label="标准问" {...formItemLayout}>
          {getFieldDecorator("resume", {
            rules: [
              {
                required: true,
                message: "请用一句话介绍问题，不超过100字",
              },
            ],
            initialValue: question.resume,
          })(
            <Input
              maxLength={100}
              autoComplete="off"
              placeholder="请用一句话介绍问题，不超过100字"
              onChange={(e) => {
                getSearchQuestion(e.target.value);
              }}
              onFocus={() => {
                setShowSearchQuestion(true);
              }}
            />
          )}
          {searchQuestion.length > 0 && showSearchQuestion && (
            <div className="search-question-wrap">
              <div className="search-question-wrap-title">
                已经存在的相关问题
              </div>
              <ul>
                {searchQuestion.map((item) => {
                  return (
                    <li
                      key={item.id}
                      onClick={() => {
                        let url =
                          window.location.href.split("#")[0] +
                          "#/contentManage/qaManage/taxLib/qaDetail?id=" +
                          item.id;
                        window.open(url);
                      }}
                    >
                      {item.resume}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {searchQuestion.length > 0 && showSearchQuestion && (
            <div
              className="search-question-bg"
              onClick={() => {
                setShowSearchQuestion(false);
              }}
            ></div>
          )}
        </FormItem>
        <FormItem label="用户问" {...formItemLayout}>
          {getFieldDecorator("description", {
            initialValue: question.description,
            rules: [
              {
                required: true,
                message: "请输入用户问法，多个问题之间用;隔开，不超过200字",
              },
            ],
          })(
            <Input.TextArea
              rows={3}
              maxLength={200}
              placeholder="请输入用户问法，多个问题之间用;隔开，不超过200字"
            />
          )}
        </FormItem>
        <FormItem
          label="用户问图片"
          {...formItemLayout}
          style={{ marginBottom: 10 }}
        >
          {getFieldDecorator("descImageList", {
            initialValue: question.descImageList,
          })(<UploadImage />)}
          <p className="upload-tips">
            图片最多3张；支持jpg、png等图片类型，每张图片不得大于1M；图片名称请勿添加特殊符号
          </p>
        </FormItem>
      </Form>
      <div className="btn-group">
        <Button
          type="primary-bordered"
          style={{ marginRight: 8 }}
          disabled={!!!question.id}
          onClick={() => {
            validateFieldsAndScroll((err, values) => {
              if (!err) {
                onSave(values);
              }
            });
          }}
        >
          保存问题
        </Button>
        <Button disabled={!!!question.id} onClick={deleteHandler}>
          删除问题
        </Button>
      </div>
    </div>
  );
}

export default Form.create()(React.forwardRef(QuestionForm));
