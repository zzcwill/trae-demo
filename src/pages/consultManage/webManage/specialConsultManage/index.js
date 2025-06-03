import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { Button, Form, Input, message, Modal } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage.js";
import SpecialConsultCard from "./components/specialConsultCard";
import history from "@/history";
const FormItem = Form.Item;
function SpecialConsultManage(props, refs) {
  const { form } = props;
  const { getFieldDecorator, validateFields } = form;
  const [list, setList] = useState([]); // 专项咨询列表
  const [loading, setLoading] = useState(false); // loading
  const [selectIds, setSelectIds] = useState([]); // 转中的id
  const [params, setParams] = useState({}); // 查询参数
  const search = () => {
    validateFields(async (err, values) => {
      if (!err) {
        const params = {
          name: (values.name && values.name.trim()) || undefined,
        };
        setParams(params);
      }
    });
  };

  /**
   * 查询列表方法
   * @param {Object}} params
   */
  const queryListFunc = async (params) => {
    try {
      setLoading(true);
      const res = await get({
        url: Api.getSpecialConsultList,
        params,
      });
      if (res.success) {
        const data = res.data;
        setList([].concat(data));
      } else {
        message.error(res.message);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  /**
   * 删除方法
   * @param {Object} data
   */
  const deleteFunc = async (data) => {
    try {
      const res = await post({
        url: Api.postSpecialConsultBatchDelete,
        data,
      });
      if (res.success) {
        message.success("删除成功");
        setSelectIds([]);
        queryListFunc(params);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 删除
   * @param {*} id
   */
  const deleteHandler = (id) => {
    Modal.confirm({
      title: "正在执行删除操作",
      content: "删除后的服务将无法恢复，你还要继续吗",
      onOk: async () => {
        deleteFunc({
          idList: [id],
        });
      },
    });
  };

  /**
   * 新增
   */
  const addSpecialConsult = () => {
    history.push("/consultManage/webManage/specialConsultManage/edit");
  };

  /**
   * 编辑
   */
  const editHandler = (item) => {
    history.push(
      "/consultManage/webManage/specialConsultManage/edit?id=" + item.id
    );
  };

  /**
   * 全选
   */
  const allSelectHandler = () => {
    if (selectIds.length === list.length) {
      setSelectIds([]);
    } else {
      setSelectIds(list.map((item) => item.id));
    }
  };

  /**
   * 全部删除
   */
  const allDeleteHandler = async () => {
    if (selectIds.length === 0) {
      message.error("请至少选择一条记录");
      return;
    }
    Modal.confirm({
      title: "正在执行删除操作",
      content: "删除后的服务将无法恢复，你还要继续吗",
      onOk: () => {
        const data = { idList: selectIds };
        deleteFunc(data);
      },
    });
  };

  /**
   * 选中
   */
  const checkedHandler = (id) => {
    if (selectIds.indexOf(id) < 0) {
      selectIds.push(id);
      setSelectIds([...selectIds]);
    } else {
      setSelectIds(selectIds.filter((item) => id !== item));
    }
  };

  useEffect(() => {
    queryListFunc(params);
  }, [params]);

  return (
    <div className="special-consult-manage" ref={refs}>
      <div className="form-box">
        <Form layout="inline">
          <FormItem label="专项名称">
            {getFieldDecorator("name")(
              <Input
                placeholder="请输入专项名称"
                allowClear
                style={{ width: 200 }}
              />
            )}
          </FormItem>
          <Button type="primary" loading={loading} onClick={search}>
            查询
          </Button>
        </Form>
      </div>
      <div className="data-box">
        <div className="option-box">
          <Button type="primary" loading={loading} onClick={allSelectHandler}>
            {selectIds.length === list.length ? '取消全选':'全选'}
          </Button>
          <div className="line-box"></div>
          <Button type="primary" loading={loading} onClick={addSpecialConsult}>
            新增专项
          </Button>
          <div className="line-box"></div>
          <Button type="primary" loading={loading} onClick={allDeleteHandler}>
            批量删除
          </Button>
        </div>
        <div className="table-box">
          <div className="card-box">
            {Array.isArray(list) &&
              list.map((item) => {
                return (
                  <SpecialConsultCard
                    key={item.id}
                    data={item}
                    checked={selectIds.indexOf(item.id) >= 0}
                    onDelete={() => {
                      deleteHandler(item.id);
                    }}
                    onCheck={(flag) => {
                      checkedHandler(item.id, flag);
                    }}
                    onEdit={() => {
                      editHandler(item);
                    }}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Form.create()(React.forwardRef(SpecialConsultManage));
