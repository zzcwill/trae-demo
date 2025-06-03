import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import {
  Form,
  Input,
  DatePicker,
  message,
  Button,
  Modal,
  Select,
} from "dpl-react";
import AddBox from "@/components/consultManage/addBox";
import ModuleTable from "@/components/consultManage/moduleTable";
import qs from "qs";
import { modalType } from "./config";
import LocationEditModal from "./components/locationEditModal";
import history from "@/history";
import classnames from "classnames";
import { olhelpEnumOptionType } from "@/const/config";
import { editTypeMap } from "../buttonEdit/config";
import sdkBreadCrumb from "@/components/consultManage/breadcrumb/sdkBreadCrumb";
import { addAllOption } from "@/utils";
const { Breadcrumb, push } = sdkBreadCrumb;
const FormItem = Form.Item;
const groupNamesList = [olhelpEnumOptionType.ButtonStyle];
function ButtonManage(props) {
  const { form } = props;
  const {
    getFieldDecorator,
    validateFields,
    setFieldsValue,
    getFieldsValue,
  } = form;
  const [moduleId, setModuleId] = useState(() => {
    const data = qs.parse(window.location.href.split("?")[1]);
    return data.id;
  });
  const [queryParams, setQueryParams] = useState({}); // 查询条件
  const [loading, setLoading] = useState(false); // loading
  const [moduleList, setModuleList] = useState([]); // 模块列表
  const [locationList, setLocationList] = useState([]); // 地区列表
  const [locationMap, setLocationMap] = useState({}); // 地区map
  const [locationModalInfo, setLocationModalInfo] = useState({
    type: modalType.add.type,
    title: modalType.add.name,
    data: {},
    visible: false,
  }); // 地区弹窗
  const [styleList, setStyleList] = useState([]); // 样式列表

  const [buttonGroupShowFlag, setButtonGroupShowFlag] = useState([]);
  const [buttonGroupList, setButtonGroupList] = useState([]); // 地区列表对应的按钮列表

  /**
   * 获取地区列表接口
   */

  const getAreaList = async () => {
    const res = await get({
      url: Api.getWdList,
      params: {},
    });
    if (res.success) {
      const data = res.data;
      if (data.location) {
        let map = {};
        data.location.forEach((item) => {
          map[item.id] = item;
        });
        setLocationMap(map);
        setLocationList([].concat(data.location));
      }
    } else {
      message.error(res.message);
    }
  };
  /**
   * 获取枚举（渠道列表）
   */
  const getEnumOptions = async () => {
    const map = {
      [olhelpEnumOptionType.ButtonStyle]: (list, map) => {
        setStyleList(list);
      },
    };
    const res = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: groupNamesList.join(","),
      },
    });
    if (res.success) {
      const data = res.data;
      Array.isArray(data) &&
        data.forEach((item) => {
          const func = map[item.groupName];
          if (func) {
            let obj = {};
            let optionsList = [];
            item.options &&
              item.options.forEach((item) => {
                obj[item.id] = item.name;
                optionsList.push({
                  label: item.name,
                  value: item.id,
                });
              });
            func(optionsList, obj);
          }
        });
    } else {
      message.error(res.message);
    }
  };

  /**
   * title点击
   */
  const titleClick = async (data) => {
    const { index } = data;
    if (!buttonGroupShowFlag[index]) {
      const sendData = {
        locationId: data.id,
      };
      await getButtonList(sendData, index);
    }
    const newList = [].concat(buttonGroupShowFlag);
    newList[index] = !newList[index];
    let list = [].concat(newList);
    setButtonGroupShowFlag(list);
  };

  /**
   * 获取按钮列表
   */
  const getButtonList = async (params, index) => {
    try {
      const res = await get({
        url: Api.getButtonList,
        params,
      });
      if (res.success) {
        const data = res.data;
        const newButtonList = [].concat(buttonGroupList);
        newButtonList[index] = [].concat(data);
        setButtonGroupList(newButtonList);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const columnsClass = (flag) => {
    return classnames({
      "header-icon-base": true,
      "header-icon-plus": !flag,
      "header-icon-cut": flag,
    });
  };

  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      width: 60,
      center: true,
    },
    {
      title: "适用地区",
      dataIndex: "location",
      titleRender(title, data) {
        const { index } = data;
        return (
          <div className="header-title">
            <span
              className={columnsClass(buttonGroupShowFlag[index])}
              onClick={() => {
                titleClick(data);
              }}
            ></span>
            <span className="title-context">{title}</span>
          </div>
        );
      },
      render(text) {
        let result = [];
        if (text) {
          text.split(",").forEach((item) => {
            const locationItem = locationMap[item];
            if (locationItem) {
              result.push(locationItem.name);
            }
          });
        }
        return (
          <span className="left-padding">{result.join(",") || "全部地区"}</span>
        );
      },
    },
    {
      title: "配置时间",
      dataIndex: "modifyDate",
      width: 180,
    },
  ];

  const buttonColumns = [
    {
      title: "",
      dataIndex: "other",
      width: 260,
    },
    {
      title: "按钮顺序",
      dataIndex: "orderNum",
      width: 100,
      center: true,
    },
    {
      title: "buttonId",
      dataIndex: "id",
      width: 100,
      center: true,
    },
    {
      title: "buttonCode",
      dataIndex: "buttonCode",
      width: 100,
      center: true,
    },
    {
      title: "按钮名称",
      dataIndex: "buttonName",
      width: 140,
    },
  ];

  // 操作内容
  const locationOptionComponent = (data) => {
    return (
      <div className="module-table-option-box">
        <Button
          type="primary-bordered"
          onClick={() => {
            deleteLocationHandler(data[0]);
          }}
        >
          删除
        </Button>
        <div className="line-box"></div>
        <Button
          type="primary-bordered"
          onClick={() => {
            cloneLocation(data[0]);
          }}
        >
          复制
        </Button>
        <div className="line-box"></div>

        <Button
          type="primary-bordered"
          onClick={() => {
            editLocationModule(data[0]);
          }}
        >
          编辑
        </Button>
        <div className="line-box"></div>
        <Button
          type="primary-bordered"
          onClick={() => {
            addButton(data[0]);
          }}
        >
          新增按钮
        </Button>
      </div>
    );
  };

  /**
   * 按钮
   */
  const buttonOptionComponent = (data, locationInfo) => {
    return (
      <div className="module-table-option-box button-option-box">
        <Button
          type="primary-bordered"
          onClick={() => {
            deleteButtonHandler(data[0], locationInfo);
          }}
        >
          删除
        </Button>
        <div className="line-box"></div>
        <Button
          type="primary-bordered"
          onClick={() => {
            cloneButton(data[0], locationInfo);
          }}
        >
          复制
        </Button>
        <div className="line-box"></div>

        <Button
          type="primary-bordered"
          onClick={() => {
            editButtonModule(data[0], locationInfo);
          }}
        >
          编辑
        </Button>
      </div>
    );
  };

  /**
   * 获取模块列表
   */
  const getLocationList = async (params = {}, locationId) => {
    try {
      setLoading(true);
      const res = await get({
        url: Api.getLocationList,
        params,
      });
      if (res.success) {
        const data = res.data;
        const length = data.length;
        let flagList = new Array(length);
        flagList.fill(false);
        if (locationId || locationId === 0) {
          for (let i = 0; i < length; i++) {
            const item = data[i];
            if (item.id === locationId) {
              flagList[i] = true;
              getButtonList(
                {
                  locationId: item.id,
                },
                i
              );
              break;
            }
          }
        }
        setButtonGroupShowFlag(flagList);
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
      moduleId,
      location: formValue.location,
      startDate: modifierDate[0] && modifierDate[0].format("YYYY-MM-DD"),
      endDate: modifierDate[1] && modifierDate[1].format("YYYY-MM-DD"),
    };
    setQueryParams(params);
    getLocationList(params);
  };

  /**
   * 清空
   */
  const reset = () => {
    setFieldsValue({
      location: undefined,
      modifierDateInfo: undefined,
    });
    // 如果没有值，就不用再次查询了
    if (
      !queryParams.location &&
      !queryParams.startDate &&
      !queryParams.endDate
    ) {
      return;
    }
    const sendData = {
      moduleId,
    };
    setQueryParams(sendData);
    getLocationList(sendData);
  };

  /**
   * 新增配置
   */
  const addLocation = () => {
    setLocationModalInfo({
      type: modalType.add.type,
      title: modalType.add.name,
      data: {
        moduleId,
      },
      visible: true,
    });
  };

  /**
   * 删除地区信息
   */
  const deleteLocation = async (id) => {
    try {
      const res = await post({ url: Api.postDeleteLocation, data: { id } });
      if (res.success) {
        getLocationList(queryParams);
        message.success("地区配置删除成功");
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 删除点击
   */
  const deleteLocationHandler = (data) => {
    Modal.confirm({
      title: "提示",
      content: "是否确定删除该地区配置",
      onOk: () => {
        deleteLocation(data.id);
      },
    });
  };

  /**
   * 复制地区配置
   */
  const cloneLocation = async (item) => {
    const { id } = item;
    if (!id && id != 0) {
      return;
    }
    const detailData = await getLocationDetail(id);
    if (!detailData) {
      return;
    }
    setLocationModalInfo({
      type: modalType.copy.type,
      title: modalType.copy.name,
      data: {
        ...detailData,
        oldId: detailData.id,
      },
      visible: true,
    });
  };

  /**
   * 获取地区配置详情
   */
  const getLocationDetail = async (id) => {
    let result = null;
    try {
      const res = await get({ url: Api.getLocationDetail, params: { id } });
      if (res.success) {
        const data = res.data;
        result = Object.assign({}, data);
      }
    } catch (e) {
      console.error(e);
    }
    return result;
  };

  /**
   * 编辑地区信息
   */
  const editLocationModule = async (item) => {
    const { id } = item;
    if (!id && id != 0) {
      return;
    }
    const detailData = await getLocationDetail(id);
    if (!detailData) {
      return;
    }
    setLocationModalInfo({
      type: modalType.edit.type,
      title: modalType.edit.name,
      data: {
        ...detailData,
      },
      visible: true,
    });
  };

  /**
   * 删除地区信息
   */
  const deleteButton = async (id, locationInfo) => {
    try {
      const res = await post({ url: Api.postDeleteButton, data: { id } });
      if (res.success) {
        const { index } = locationInfo;
        const sendData = {
          locationId: locationInfo.id,
        };
        await getButtonList(sendData, index);
        message.success("按钮配置删除成功");
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 跳转到按钮编辑页面
   * @param {Object} data
   */
  const gotoButtonEditPage = (data) => {
    const queryString = qs.stringify(data);
    history.push(`/consultManage/sdkManage/buttonEdit?${queryString}`);
  };

  /**
   * 跳转到按钮管理列表
   */
  const addButton = (data) => {
    if (data.id || data.id == 0) {
      const sendData = {
        moduleId,
        locationId: data.id,
        type: editTypeMap.add.type,
      };
      gotoButtonEditPage(sendData);
    } else {
      console.error("按钮配置id不能为空");
    }
  };

  /**
   * 删除按钮配置
   */
  const deleteButtonHandler = async (data, locationInfo) => {
    Modal.confirm({
      title: "提示",
      content: "是否确定删除该按钮配置",
      onOk: () => {
        deleteButton(data.id, locationInfo);
      },
    });
  };

  /**
   * 复制按钮
   */
  const cloneButton = (data, locationInfo) => {
    if (data.id || data.id == 0) {
      const sendData = {
        id: data.id,
        locationId: locationInfo.id,
        moduleId,
        type: editTypeMap.copy.type,
      };
      gotoButtonEditPage(sendData);
    } else {
      console.error("按钮配置id不能为空");
    }
  };

  /**
   * 编辑按钮详情
   */
  const editButtonModule = (data, locationInfo) => {
    if (data.id || data.id == 0) {
      const sendData = {
        id: data.id,
        moduleId,
        locationId: locationInfo.id,
        type: editTypeMap.edit.type,
      };
      gotoButtonEditPage(sendData);
    } else {
      console.error("按钮配置id不能为空");
    }
  };

  /**
   * Modal 关闭的时候
   */
  const modalOnCancel = (isRefresh) => {
    setLocationModalInfo(
      Object.assign({}, locationModalInfo, {
        visible: false,
      })
    );
    if (isRefresh) {
      getLocationList(queryParams);
    }
  };

  useEffect(() => {
    if (moduleId) {
      const data = qs.parse(window.location.href.split("?")[1]);
      const sendData = {
        moduleId,
      };
      setQueryParams(sendData);
      getLocationList(sendData, data.locationId && parseInt(data.locationId));
    }
  }, [moduleId]);

  const init = () => {
    getAreaList();
    getEnumOptions();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="button-manage">
      <Breadcrumb style={{ marginBottom: 20 }} />
      <div className="content">
        <div className="search-box">
          <Form layout="inline">
            <FormItem label="适用地区">
              {getFieldDecorator("location")(
                <Select
                  allowClear
                  placeholder="请选择适用地区"
                  showSearch
                  optionFilterProp="children"
                  disabled={loading}
                  className="search-select-location"
                >
                  {Array.isArray(locationList) &&
                    locationList.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                </Select>
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
        <AddBox context="添加配置" onClick={addLocation} />
        <div className="table-box">
          {Array.isArray(moduleList) &&
            moduleList.map((item, index) => {
              return (
                <ModuleTable
                  key={item.id}
                  columns={columns}
                  dataSource={[item]}
                  optionComponent={locationOptionComponent}
                  extraData={{
                    ...item,
                    index,
                  }}
                  extraRowRender={() => {
                    return (
                      buttonGroupShowFlag[index] && (
                        <div>
                          {Array.isArray(buttonGroupList[index]) &&
                            buttonGroupList[index].map((button) => {
                              return (
                                <ModuleTable
                                  key={button.id}
                                  columns={buttonColumns}
                                  dataSource={[button]}
                                  optionComponent={(data) => {
                                    return buttonOptionComponent(data, {
                                      ...item,
                                      index,
                                    });
                                  }}
                                />
                              );
                            })}
                        </div>
                      )
                    );
                  }}
                />
              );
            })}
        </div>
        <Modal
          footer={null}
          title={locationModalInfo.title}
          visible={locationModalInfo.visible}
          onCancel={() => {
            modalOnCancel();
          }}
          destroyOnClose={true}
          width={750}
          className="module-edit-modal"
        >
          <LocationEditModal
            type={locationModalInfo.type}
            data={locationModalInfo.data}
            onCancel={modalOnCancel}
            locationList={addAllOption(locationList)}
            styleList={styleList}
          />
        </Modal>
      </div>
    </div>
  );
}
export default Form.create()(React.forwardRef(ButtonManage));
