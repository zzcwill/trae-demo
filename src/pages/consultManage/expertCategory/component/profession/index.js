import React, { useEffect, useState } from "react";
import "./index.scss";
import { Table, Form, Button, Modal, message, Input, Select } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { isShowCategoryEnum, showFlagMap } from "../../config";

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const FormItem = Form.Item;

const professionType = "1"; // 擅长行业type类型值

function Profession(props, refs) {
  const [isLevelOne, setIsLevelOne] = useState(true);
  const [categoryData, setCategoryData] = useState(null); // 分类数据
  const [currentList, setCurrentList] = useState([]); //当前列表
  const [currentParent, setCurrentParent] = useState(null); // 当前父级，在二级分类时才有
  const [currentItem, setCurrentItem] = useState(null); //当前操作的分类
  const [showModal, setShowModal] = useState(false);
  const { form } = props;
  const { getFieldDecorator, validateFieldsAndScroll } = form;
  const getTreeDate = async () => {
    let walk = (arr) => {
      arr.forEach((item) => {
        item._children = item.children;
        delete item.children;
        Array.isArray(item._children) && walk(item._children);
      });
    };
    let find = (arr, currentParentId) => {
      let result = null;
      arr.forEach((item) => {
        if (item.id === currentParentId) {
          result = item;
        }
      });
      return result;
    };
    const data = await get({
      url: Api.classifyExpertTaxList,
      params: {
        type: professionType,
      },
    });
    let temp;
    data.data.forEach((item) => {
      if (item.type == professionType) {
        walk(item.list);
        temp = item.list;
        setCategoryData(item.list);
      }
    });
    if (isLevelOne) {
      setCurrentList(temp);
    } else {
      let obj = find(temp, currentParent.id);
      setCurrentList(obj._children);
    }
  };
  const deleteHandler = (id) => {
    Modal.confirm({
      title: "删除提示",
      content: "确认删除该分类吗",
      onOk() {
        return new Promise((resolve, reject) => {
          post(Api.classifyExpertDelete, { data: { id } }).then((data) => {
            if (data.success) {
              message.success("删除成功");
              getTreeDate();
              resolve();
            } else {
              message.error(data.message);
              reject();
            }
          });
        });
      },
    });
  };
  const oneColumns = [
    {
      title: "一级分类",
      dataIndex: "name",
      ellipsis: true,
      render(text, item) {
        return (
          <div
            className="category-item"
            onClick={() => {
              setIsLevelOne(false);
              setCurrentList(item._children);
              setCurrentParent(item);
            }}
          >
            {text}
          </div>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "id",
      ellipsis: true,
      render(text, item) {
        return (
          <div className="operation">
            <span
              onClick={() => {
                setCurrentItem(item);
                setShowModal(true);
              }}
            >
              编辑
            </span>
            <span
              className="red"
              onClick={() => {
                deleteHandler(item.id);
              }}
            >
              删除
            </span>
          </div>
        );
      },
    },
  ];
  const twoColumns = [
    {
      title: "一级分类",
      dataIndex: "id",
      ellipsis: true,
      render() {
        return <span>{currentParent && currentParent.name}</span>;
      },
    },
    {
      title: "二级分类",
      dataIndex: "name",
      ellipsis: true,
    },
    {
      title: "展示",
      dataIndex: "showFlag",
      ellipsis: true,
      align: "center",
      render(text, item) {
        return (
          <span>{(showFlagMap[text] && showFlagMap[text].name) || "--"}</span>
        );
      },
    },
    {
      title: "排序",
      dataIndex: "orderNum",
      ellipsis: true,
    },
    {
      title: "操作",
      // dataIndex: "name",
      ellipsis: true,
      render(text, item) {
        return (
          <div className="operation">
            <span
              onClick={() => {
                setCurrentItem(item);
                setShowModal(true);
              }}
            >
              编辑
            </span>
            <span
              className="red"
              onClick={() => {
                deleteHandler(item.id);
              }}
            >
              删除
            </span>
          </div>
        );
      },
    },
  ];
  const getModalTitle = () => {
    if (isLevelOne) {
      if (currentItem) {
        return "修改擅长行业【一级分类】";
      } else {
        return "新增擅长行业【一级分类】";
      }
    } else {
      if (currentItem) {
        return "修改擅长行业【二级分类】";
      } else {
        return "新增擅长行业【二级分类】";
      }
    }
  };
  const okHandler = () => {
    validateFieldsAndScroll(async (err, value) => {
      if (!err) {
        let data = {};
        if (currentItem) {
          data = await post(Api.classifyExpertUpdate, {
            data: { id: currentItem.id, ...value },
          });
        } else {
          data = await post(Api.classifyExpertSave, {
            data: {
              ...value,
              type: professionType,
              parentId: isLevelOne ? undefined : currentParent.id,
            },
          });
        }
        if (data.success) {
          message.success(currentItem ? "修改成功" : "新增成功");
          setCurrentItem(null);
          setShowModal(false);
          getTreeDate();
        } else {
          message.error(data.message);
        }
      }
    });
  };
  useEffect(() => {
    getTreeDate();
  }, []);
  return (
    <div className="profession-box">
      <div className="breadCrumb">
        <div
          className="item"
          onClick={() => {
            setCurrentList(categoryData);
            setIsLevelOne(true);
            setCurrentParent(null);
          }}
        >
          擅长行业
        </div>
        {!isLevelOne && currentParent && (
          <>
            <span>\</span>
            <div className="item">{currentParent.name}</div>
          </>
        )}
      </div>
      <Button
        type={"primary"}
        onClick={() => {
          setShowModal(true);
        }}
      >
        新增分类
      </Button>
      <Table
        dataSource={currentList}
        columns={isLevelOne ? oneColumns : twoColumns}
        pagination={false}
        className="profession-table"
      />
      <Modal
        title={getModalTitle()}
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
          setCurrentItem(null);
        }}
        onOk={okHandler}
      >
        {showModal && (
          <Form>
            <FormItem label="分类名称" {...formItemLayout}>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入分类名称" }],
                initialValue: currentItem ? currentItem.name : "",
              })(<Input placeholder="不超过10个字" maxLength={10} />)}
            </FormItem>
            {!isLevelOne && (
              <FormItem label="是否展示" {...formItemLayout}>
                {getFieldDecorator("showFlag", {
                  rules: [{ required: true, message: "是否在筛选栏展示" }],
                  initialValue: currentItem
                    ? currentItem.showFlag
                    : isShowCategoryEnum[1].id,
                })(
                  <Select placeholder="是否在筛选栏展示" style={{ width: 160 }}>
                    {isShowCategoryEnum.length > 0 &&
                      isShowCategoryEnum.map((item) => {
                        return (
                          <Select.Option
                            value={item.id}
                            key={`show-item-${item.id}`}
                          >
                            {item.name}
                          </Select.Option>
                        );
                      })}
                  </Select>
                )}
              </FormItem>
            )}
            {!isLevelOne && (
              <FormItem label="排序" {...formItemLayout}>
                {getFieldDecorator("orderNum", {
                  rules: [
                    { required: true, message: "请输入排序" },
                    {
                      validator(rule, value, callback) {
                        if (!value) {
                          callback();
                        } else {
                          let temp = parseFloat(value);
                          if (temp > 0 && temp % 1 === 0) {
                            if (temp <= 99) {
                              callback();
                            } else {
                              callback("请输入小于99的正整数");
                            }
                          } else {
                            callback("请输入小于99的正整数");
                          }
                        }
                      },
                    },
                  ],
                  initialValue: currentItem ? currentItem.orderNum : "",
                })(<Input placeholder="请输入排序" type="number" />)}
              </FormItem>
            )}
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default Form.create()(Profession);
