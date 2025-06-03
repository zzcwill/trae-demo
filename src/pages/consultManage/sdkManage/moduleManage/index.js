import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { Form, Input, DatePicker, message, Button, Modal } from "dpl-react";
import AddBox from "@/components/consultManage/addBox";
import ModuleTable from "@/components/consultManage/moduleTable";
import qs from "qs";
import { modalType } from "./config";
import EditModal from "./components/editModal";
import history from "@/history";
import sdkBreadCrumb from "@/components/consultManage/breadcrumb/sdkBreadCrumb";
const { Breadcrumb, push } = sdkBreadCrumb;
const FormItem = Form.Item;
function ModuleManage(props) {
  const { form } = props;
  const {
    getFieldDecorator,
    validateFields,
    setFieldsValue,
    getFieldsValue,
  } = form;
  const [systemId, setSystemId] = useState(() => {
    const data = qs.parse(window.location.href.split("?")[1]);
    return data.id;
  });
  const [queryParams, setQueryParams] = useState({}); // 查询条件
  const [loading, setLoading] = useState(false); // loading
  const [moduleList, setModuleList] = useState([]); // 模块列表
  const [modalInfo, setModalInfo] = useState({
    type: modalType.add.type,
    title: modalType.add.name,
    data: {},
    visible: false,
  });

  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "模块名称",
      dataIndex: "moduleName",
    },
    {
      title: "模块Code",
      dataIndex: "moduleCode",
    },
    {
      title: "配置时间",
      dataIndex: "modifyDate",
      width: 150,
    },
  ];

  // 操作内容
  const optionComponent = (data) => {
    return (
      <div className="module-table-option-box">
        <Button
          type="primary-bordered"
          onClick={() => {
            deleteHandler(data[0]);
          }}
        >
          删除
        </Button>
        <div className="line-box"></div>
        <Button
          type="primary-bordered"
          onClick={() => {
            cloneModule(data[0]);
          }}
        >
          复制
        </Button>
        <div className="line-box"></div>

        <Button
          type="primary-bordered"
          onClick={() => {
            editModule(data[0]);
          }}
        >
          编辑
        </Button>
        <div className="line-box"></div>
        <Button
          type="primary-bordered"
          onClick={() => {
            jumpToButtonManage(data[0]);
          }}
        >
          进入
        </Button>
      </div>
    );
  };

  /**
   * 获取模块列表
   */
  const getModuleList = async (params = {}) => {
    try {
      setLoading(true);
      const res = await get({
        url: Api.getModuleList,
        params,
      });
      if (res.success) {
        const data = res.data;
        setModuleList([].concat(data));
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
   * 查询列表
   */
  const query = async () => {
    const formValue = getFieldsValue();
    const modifierDate =
      (Array.isArray(formValue.modifierDateInfo) &&
        formValue.modifierDateInfo) ||
      [];
    const params = {
      systemId,
      moduleName: formValue.moduleName,
      startDate: modifierDate[0] && modifierDate[0].format("YYYY-MM-DD"),
      endDate: modifierDate[1] && modifierDate[1].format("YYYY-MM-DD"),
    };
    setQueryParams(params);
    getModuleList(params);
  };

  /**
   * 清空
   */
  const reset = () => {
    setFieldsValue({
      moduleName: undefined,
      modifierDateInfo: undefined,
    });
    // 如果没有值，就不用再次查询了
    if (
      !queryParams.moduleName &&
      !queryParams.startDate &&
      !queryParams.endDate
    ) {
      return;
    }
    const sendData = {
      systemId,
    };
    setQueryParams(sendData);
    getModuleList(sendData);
  };

  /**
   * 新增配置
   */
  const addModule = () => {
    setModalInfo({
      type: modalType.add.type,
      title: modalType.add.name,
      data: {
        systemId,
      },
      visible: true,
    });
  };

  /**
   * 跳转到按钮管理列表
   */
  const jumpToButtonManage = (data) => {
    if (data.id || data.id == 0) {
      push(`/consultManage/sdkManage/buttonManage?id=${data.id}`);
    } else {
      console.error("配置id不能为空");
    }
  };

  /**
   * 删除模块
   */
  const deleteModule = async (id) => {
    try {
      const data = await post({ url: Api.postDeleteModule, data: { id } });
      if (data.success) {
        getModuleList(queryParams);
        message.success("删除成功");
      } else {
        message.error(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 删除点击
   */
  const deleteHandler = (data) => {
    Modal.confirm({
      title: "提示",
      content: "是否确定删除该记录",
      onOk: () => {
        deleteModule(data.id);
      },
    });
  };

  /**
   * 复制
   */
  const cloneModule = async (item) => {
    setModalInfo({
      type: modalType.copy.type,
      title: modalType.copy.name,
      data: {
        ...item,
      },
      visible: true,
    });
  };

  /**
   * 编辑
   */
  const editModule = (item) => {
    setModalInfo({
      type: modalType.edit.type,
      title: modalType.edit.name,
      data: {
        ...item,
      },
      visible: true,
    });
  };

  /**
   * Modal 关闭的时候
   */
  const modalOnCancel = (isRefresh) => {
    setModalInfo(
      Object.assign({}, modalInfo, {
        visible: false,
      })
    );
    if (isRefresh) {
      getModuleList(queryParams);
    }
  };

  useEffect(() => {
    if (systemId) {
      const sendData = {
        systemId,
      };
      setQueryParams(sendData);
      getModuleList(sendData);
    }
  }, [systemId]);

  return (
    <div className="module-manage">
      <Breadcrumb style={{ marginBottom: 20 }} />
      <div className="content">
        <div className="search-box">
          <Form layout="inline">
            <FormItem label="模块名称">
              {getFieldDecorator("moduleName")(
                <Input
                  allowClear
                  placeholder="请输入模块名称"
                  autoComplete='off'
                  disabled={loading}
                />
              )}
            </FormItem>

            <FormItem label="配置时间">
              {getFieldDecorator("modifierDateInfo")(
                <DatePicker.RangePicker allowClear disabled={loading} />
              )}
            </FormItem>
            <div className="search-button-box">
              <Button
                className="search-button"
                disabled={loading}
                onClick={() => {
                  reset();
                }}
              >
                清空条件
              </Button>
              <div className="line-box"></div>
              <Button
                type="primary"
                className="search-button"
                loading={loading}
                onClick={() => {
                  query();
                }}
              >
                搜索
              </Button>
            </div>
          </Form>
        </div>
        <AddBox context="添加配置" onClick={addModule} />
        <div className="table-box">
          {Array.isArray(moduleList) &&
            moduleList.map((item) => {
              return (
                <ModuleTable
                  key={item.id}
                  columns={columns}
                  dataSource={[item]}
                  optionComponent={optionComponent}
                />
              );
            })}
        </div>
        <Modal
          footer={null}
          title={modalInfo.title}
          visible={modalInfo.visible}
          onCancel={modalOnCancel}
          destroyOnClose={true}
          width={750}
          className="module-edit-modal"
        >
          <EditModal
            type={modalInfo.type}
            data={modalInfo.data}
            onCancel={modalOnCancel}
          />
        </Modal>
      </div>
    </div>
  );
}
export default Form.create()(React.forwardRef(ModuleManage));
