import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import {
  Button,
  message,
  Input,
  TreeSelect,
  Form,
  Select,
  InputNumber,
} from "dpl-react";
import qs from "qs";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage.js";
import {
  olhelpEnumOptionType,
  classifyTypeEnum,
  sceneOfficialList,
} from "@/const/config";
import history from "@/history";
import UploadImgAndLink from "../../components/uploadImgAndLink";
const TextArea = Input.TextArea;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
/**
 * 格式化树节点，利用treeNode自行渲染
 * @param {props} tree
 * @param {props} formatObj
 */
function formatTree(tree) {
  return tree.map((item) => {
    return (
      <TreeSelect.TreeNode key={item.id} value={item.id} title={item.name}>
        {formatTree(item.children || [])}
      </TreeSelect.TreeNode>
    );
  });
}

function getTreeMap(tree, obj) {
  if (Array.isArray(tree) && tree.length > 0) {
    tree.forEach((item) => {
      obj[item.id] = item;
      if (Array.isArray(item.children)) {
        getTreeMap(item.children, obj);
      }
    });
  }
  return obj;
}
function Edit(props) {
  const { form } = props;
  const { getFieldDecorator, validateFields } = form;
  const [id, setId] = useState(() => {
    const urlParams = qs.parse(window.location.href.split("?")[1]);
    return urlParams.id;
  }); // 专项咨询Id
  const [detail, setDetail] = useState(null); // 详情
  const [gjTypeList, setGjTypeList] = useState([]); // 构建列表
  const [gjTypeMap, setGjTypeMap] = useState({}); // 构建map
  const [classifyList, setClassify] = useState([]); // 咨询范围
  const [loading, setLoading] = useState(false); // loading
  const [consultServiceList, setConsultServiceList] = useState([]);
  const classifyMapRef = useRef({});
  /**
   * 查询咨询产品配置列表
   */
  const getConsultProductTypeList = async () => {
    const res = await get({
      url: Api.getServiceConfigQueryServiceConfigList,
      params: {
          categoryList: '0002'
      },
    });
    if (res.success && Array.isArray(res.data)) {
        setConsultServiceList(
            res.data.filter(Boolean).map((item) => {
            return {
                value: item.consultService,
                label: item.consultServiceName,
            };
        })
    );
    } else {
        message.error(res.message);
    }
  };
  /**
   * 获取咨询范围列表
   */
  const getClassifyList = async () => {
    try {
      const res = await get({
        url: Api.getClassifyList,
        params: {
          types: classifyTypeEnum.classify,
        },
      });
      if (res.success) {
        const data = res.data;
        if (Array.isArray(data)) {
          let obj = {};
          let classify = [];
          data.forEach((item) => {
            if (item.type === classifyTypeEnum.classify) {
              classify = [].concat(item.list);
            }
          });
          obj = getTreeMap(classify, obj);
          setClassify(classify);
          classifyMapRef.current = obj;
        }
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 获取构建信息
   */
  const getGjTypeList = async () => {
    try {
      const res = await get({
        url: Api.getEnumOptions,
        params: {
          groupNames: olhelpEnumOptionType.GjType,
        },
      });
      if (res.success) {
        const data = res.data;
        data.forEach((item) => {
          if (item.groupName === olhelpEnumOptionType.GjType) {
            let obj = {};
            item.options &&
              item.options.forEach((item) => {
                obj[item.id] = item.name;
              });
            setGjTypeList([].concat(item.options));
            setGjTypeMap(obj);
          }
        });
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 获取专项咨询详情
   * @param {String} id
   */
  const getSpecialConsultDetail = async (id) => {
    try {
      const res = await get({
        url: Api.getSpecialConsultDetail,
        params: {
          id,
        },
      });
      if (res.success) {
        let data = res.data;
        let consultScopeList = [];
        // 判断构建是否存在在可选择项中
        if (data.componentId || data.componentId == 0) {
          const len = gjTypeList.length;
          let isExist = false;
          for (let i = 0; i < len; i++) {
            if (gjTypeList[i].id === data.componentId) {
              isExist = true;
              break;
            }
          }
          if (!isExist) {
            data.componentId = undefined;
          }
        }
        if (Array.isArray(data.consultScopeList)) {
          data.consultScopeList.forEach((item) => {
            if (classifyMapRef.current[item]) {
              consultScopeList.push(item);
            }
          });
        }
        if (data.coverImageUrl) {
          data.coverImage = {
            imageUrl: data.coverImageUrl,
          };
        }
        if (data.descriptionImageUrl) {
          data.descriptionImage = {
            imageUrl: data.descriptionImageUrl,
          };
        }
        if (data.adImageList && data.adImageList.length > 0) {
          data.adImage = {
            imageUrl: data.adImageList[0].imageUrl,
            jumpUrl: data.adImageList[0].jumpUrl,
          };
        }
        setDetail({
          ...data,
          consultScopeList,
        });
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 跳转到列表页面
   */
  const goListPage = () => {
    history.push("/consultManage/webManage/specialConsultManage");
  };

  /**
   * 更新
   */
  const updateFunc = async (data) => {
    try {
      setLoading(true);
      const res = await post({
        url: Api.postSpecialConsultUpdate,
        data,
      });
      if (res.success) {
        message.success("专项咨询更新成功！");
        goListPage();
      } else {
        message.error(res.message);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  /**
   * 新增
   */
  const saveFunc = async (data) => {
    try {
      setLoading(true);
      const res = await post({
        url: Api.postSpecialConsultSave,
        data,
      });
      if (res.success) {
        message.success("专项咨询新增成功！");
        goListPage();
      } else {
        message.error(res.message);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  /**
   * 提交表单
   */
  const submit = () => {
    validateFields(async (err, values) => {
      if (!err) {
        let data = {
          name: values.name && values.name.trim(),
          scene: values.scene,
          consultService: values.consultService,
          order: values.order,
          coverImageUrl: values.coverImage && values.coverImage.imageUrl,
          descriptionImageUrl:
            values.descriptionImage && values.descriptionImage.imageUrl,
          description: values.description,
          adImageList: values.adImage && [values.adImage],
          consultScopeList: values.consultScopeList,
        };
        if (id || id == 0) {
          data.id = id;
          updateFunc(data);
        } else {
          saveFunc(data);
        }
      }
    });
  };

  const uploadImgAndLinkValidator = (rule, value, callback, message) => {
    if (value) {
      if (!value.imageUrl) {
        callback(message);
      } else {
        callback();
      }
    } else {
      callback(message);
    }
  };

  useEffect(() => {
    if ((id || id == 0) && gjTypeList.length > 0 && classifyList.length > 0) {
      getSpecialConsultDetail(id);
    }
  }, [id, gjTypeList, classifyList]);

  useEffect(() => {
    getGjTypeList();
    getClassifyList();
    getConsultProductTypeList();
  }, []);
  return (
    <div className="special-consult-edit">
      <div className="title">
        <span>{id || id == 0 ? "修改专项" : "新增专项"}</span>
      </div>
      <div className="form">
        <Form>
          <FormItem {...formItemLayout} label="专项名称">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入专项名称!",
                  whitespace: true,
                },
              ],
              initialValue: (detail && detail.name) || undefined,
            })(
              <Input
                autoComplete="off"
                maxLength="15"
                placeholder="请输入专项名称"
                disabled={loading}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="专项展示顺序">
            {getFieldDecorator("order", {
              rules: [
                {
                  required: true,
                  message: "请输入专项展示顺序!",
                },
              ],
              initialValue: (detail && detail.order) || undefined,
            })(
              <InputNumber
                max={100}
                min={1}
                className="special-consult-input-number"
                placeholder="请输入专项展示顺序"
                disabled={loading}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="咨询产品类型">
            {getFieldDecorator("consultService", {
              rules: [
                {
                  required: true,
                  message: "请选择咨询产品类型!",
                },
              ],
              initialValue: (detail && detail.consultService) || undefined,
            })(
              <Select
                placeholder="请选择你想要添加的咨询产品类型"
                disabled={loading}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {Array.isArray(consultServiceList) &&
                  consultServiceList.map((item) => {
                    return (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    );
                  })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="卡片类型">
            {getFieldDecorator("scene", {
              rules: [
                {
                  required: true,
                  message: "请选择卡片类型!",
                },
              ],
              initialValue: (detail && detail.scene) || sceneOfficialList[0].id,
            })(
              <Select
                placeholder="请选择卡片类型"
                disabled={id || id == 0 || loading}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {Array.isArray(sceneOfficialList) &&
                  sceneOfficialList.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="专项封面图">
            {getFieldDecorator("coverImage", {
              rules: [
                {
                  required: true,
                  message: [],
                },
                {
                  validator: (rule, value, callback) => {
                    uploadImgAndLinkValidator(
                      rule,
                      value,
                      callback,
                      "请选择专项封面图!"
                    );
                  },
                },
              ],
              initialValue: (detail && detail.coverImage) || undefined,
            })(<UploadImgAndLink key="imgUrl" disabled={loading} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="专项简介图">
            {getFieldDecorator("descriptionImage", {
              rules: [
                {
                  required: true,
                  message: [],
                },
                {
                  validator: (rule, value, callback) => {
                    uploadImgAndLinkValidator(
                      rule,
                      value,
                      callback,
                      "请选择专项简介图!"
                    );
                  },
                },
              ],
              initialValue: (detail && detail.descriptionImage) || undefined,
            })(<UploadImgAndLink key="imgUrl" disabled={loading} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="专项宣传图">
            {getFieldDecorator("adImage", {
              rules: [
                {
                  required: true,
                  message: [],
                },
                {
                  validator: (rule, value, callback) => {
                    uploadImgAndLinkValidator(
                      rule,
                      value,
                      callback,
                      "请选择专项宣传图!"
                    );
                  },
                },
              ],
              initialValue: (detail && detail.adImage) || undefined,
            })(<UploadImgAndLink disabled={loading} isShowOption={true} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="可选专家来源">
            {getFieldDecorator("consultScopeList", {
              rules: [
                {
                  required: true,
                  message: "请选择可选专家来源!",
                },
              ],
              initialValue: (detail && detail.consultScopeList) || undefined,
            })(
              <TreeSelect
                placeholder="请选择专家来源"
                mode="multiple"
                allowClear
                treeCheckable
                showCheckedStrategy={TreeSelect.SHOW_PARENT}
                disabled={loading}
                treeNodeFilterProp="title"
                getPopupContainer={(triggerNode) => {
                  return triggerNode.parentNode;
                }}
              >
                {formatTree(classifyList)}
              </TreeSelect>
            )}
          </FormItem>
        </Form>
      </div>

      <div className="btn-group">
        <Button type="primary" onClick={submit} loading={loading}>
          提交
        </Button>
        <div className="line"></div>
        <Button onClick={goListPage} loading={loading}>
          取消
        </Button>
      </div>
    </div>
  );
}

export default Form.create()(React.forwardRef(Edit));
