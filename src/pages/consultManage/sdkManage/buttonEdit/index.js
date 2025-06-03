import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import {
  editTypeMap,
  jumpTypeList,
  pageOpenTypeList,
  consultOpenTypeList,
  landingTypeList,
} from "./config";
import qs from "qs";
import history from "@/history";
import classnames from "classnames";
import { olhelpEnumOptionType, serviceConfigCardTypeEnum } from "@/const/config";
import { Input, Button, message, InputNumber } from "dpl-react";
import { uForm } from "dora";
import LocationName from "./components/locationName";
import IconSelect from "./components/iconSelect";
import LandingSelect from "./components/landingSelect";
import TextArea from "@/components/common/textArea";

function InputNumberComponent(props) {
  return <InputNumber {...props} />;
}
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
  FormSlot,
  FormEffectHooks,
} = uForm;
const groupNamesList = [olhelpEnumOptionType.IconStyle];
const actions = createFormActions();
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};
const rightsServiceNoChooseId = "noChoose";

function ButtonEdit(props) {
  const { onFieldValueChange$ } = FormEffectHooks;
  const [locationList, setLocationList] = useState([]); // 地区列表
  const [rightsServiceList, setRightsServiceList] = useState([]); // 咨询产品类型
  const [locationMap, setLocationMap] = useState({}); // 地区map
  const [iconList, setIconList] = useState([]); // icon列表
  const [locationInfo, setLocationInfo] = useState({}); // 地区配置信息
  const [queryParams, setQueryParams] = useState({}); // 按钮表单参数
  const [editType, setEditType] = useState(""); // 编辑类型
  const [loading, setLoading] = useState(false); // loading
  const [landingPageList, setLandingPageList] = useState([]); // 落地页列表
  const [buttonDetail, setButtonDetail] = useState({}); // 按钮详情
  const [exclusiveList, setExclusiveList] = useState([]); // 专属列表
  const [normalList, setNormalList] = useState([]); // 通用列表
  const moduleIdRef = useRef(null);
  const urlParamsRef = useRef(null);

  /**
   * 获取落地页列表
   */
  const getLandingPageList = async () => {
    const res = await get({
      url: Api.getLandingPageList,
      params: {},
    });
    if (res.success) {
      const data = res.data;
      let result = [];
      let exclusiveNewList = [];
      let normalNewList = [];
      if (Array.isArray(data)) {
        data.forEach((item) => {
          let itemData = {
            label: item.name,
            value: item.id,
            type: item.type,
          };
          if (item.type === landingTypeList[0].value) {
            normalNewList.push(itemData);
          } else {
            exclusiveNewList.push(itemData);
          }
          result.push(itemData);
        });
      }
      setExclusiveList(exclusiveNewList);
      setNormalList(normalNewList);
      setLandingPageList(result);
    } else {
      message.error(res.message);
    }
  };
  /**
   * 获取地区信息
   */
  const getLocationInfo = async (id) => {
    try {
      const res = await get({ url: Api.getLocationDetail, params: { id } });
      if (res.success) {
        const data = res.data;
        setLocationInfo({
          ...data,
        });
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 获取按钮详情
   */
  const getButtonDetail = async (id) => {
    try {
      const res = await get({ url: Api.getButtonDetail, params: { id } });
      if (res.success) {
        const data = res.data;
        setButtonDetail({
          ...data,
        });
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 获取枚举（icon列表）
   */
  const getEnumOptions = async () => {
    const map = {
      [olhelpEnumOptionType.IconStyle]: (list, map) => {
        setIconList(list);
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
   * 查询咨询产品配置列表
   */
  const getConsultProductTypeList = async () => {
    const res = await get({
      url: Api.getServiceConfigQueryServiceConfigList,
      params: {
        cardTypes: [serviceConfigCardTypeEnum.expert, serviceConfigCardTypeEnum.offcial].join(","), // 专家卡片和官方卡片
      },
    });
    if (res.success && Array.isArray(res.data)) {
      const noChoose = [{
        consultService: rightsServiceNoChooseId,
        consultServiceName: '无'
      }]
      setRightsServiceList(noChoose.concat(res.data));
    } else {
      message.error(res.message);
    }
  };

  /**
   * 保存点击
   */
  const confirmHandler = () => {
    actions.submit().then(async (res) => {
      const { values } = res;
      let sendData = {
        buttonCode: values.buttonCode && values.buttonCode.trim(),
        buttonName: values.buttonName && values.buttonName.trim(),
        icon: values.icon,
        orderNum: values.orderNum,
        pageType: values.pageType,
        pageOpenType: values.pageOpenType,
        consultOpenType: values.consultOpenType || null,
        landingPageId: values.landingPageId,
        pageWindowWidth: values.pageWindowWidth,
        pageWindowHeight: values.pageWindowHeight,
        consultWindowWidth: values.consultWindowWidth,
        consultWindowHeight: values.consultWindowHeight,
        externalUrl: values.externalUrl && values.externalUrl.trim(),
        description: values.description && values.description.trim(),
        intentionConsultService: values.intentionConsultService === rightsServiceNoChooseId ? "" : values.intentionConsultService, //未选择就用""
      };
      if (
        editType === editTypeMap.add.type ||
        editType === editTypeMap.copy.type
      ) {
        sendData.locationId = locationInfo.id;
        add(sendData);
      }

      if (editType === editTypeMap.edit.type) {
        sendData.id = urlParamsRef.current && urlParamsRef.current.id;
        update(sendData);
      }
    });
  };

  /**
   * 新增
   */
  const add = async (data) => {
    try {
      setLoading(true);
      const res = await post({
        url: Api.postSaveButton,
        data,
      });
      if (res.success) {
        message.success("新增成功！");
        cancelHandler();
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
   * 修改
   */
  const update = async (data) => {
    try {
      setLoading(true);
      const res = await post({
        url: Api.postUpdateButton,
        data,
      });
      if (res.success) {
        message.success("修改成功！");
        cancelHandler();
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
   * 取消
   */
  const cancelHandler = (id) => {
    if (!moduleIdRef.current && !id) {
      return;
    }
    const buttonManageString = {
      id: moduleIdRef.current,
      locationId: locationInfo.id,
    };
    const url = `/consultManage/sdkManage/buttonManage?${qs.stringify(
      buttonManageString
    )}`;
    history.replace(url);
  };

  /**
   * 联动
   */
  const effectsFunc = () => {
    const { setFieldState, setFieldValue } = createFormActions();
    onFieldValueChange$("pageType").subscribe(({ value }) => {
      let urlVisibleFlag = true;
      let otherVisibleFlag = false;
      if (value === jumpTypeList[0].value) {
        urlVisibleFlag = false;
        otherVisibleFlag = true;
      }
      // setFieldState("*(consultOpenType,landingPageId)", (state) => {
      //   state.visible = otherVisibleFlag;
      // });
      setFieldState("landingPageId", (state) => {
        state.visible = otherVisibleFlag;
      });
      setFieldState("externalUrl", (state) => {
        state.visible = urlVisibleFlag;
      });
    });
    onFieldValueChange$("pageOpenType").subscribe(({ value }) => {
      setFieldState("*(pageWindowHeight,pageWindowWidth)", (state) => {
        state.visible = value === pageOpenTypeList[0].value;
      });
    });
    onFieldValueChange$("consultOpenType").subscribe(({ value }) => {
      setFieldState("*(consultWindowHeight,consultWindowWidth)", (state) => {
        state.visible = value === consultOpenTypeList[0].value;
      });
    });
  };

  /**
   * 初始化方法
   */
  const initFunc = () => {
    getAreaList();
    getEnumOptions();
    getLandingPageList();
    getConsultProductTypeList();
  };

  // 初始化
  useEffect(() => {
    initFunc();
    const queryString = qs.parse(window.location.href.split("?")[1]);
    // 没有地区配置的无法添加按钮配置信息
    if (queryString.moduleId) {
      moduleIdRef.current = queryString.moduleId;
    }
    if (queryString.locationId) {
      urlParamsRef.current = queryString;
      // 查询地区配置信息
      getLocationInfo(queryString.locationId);
      // 如果按钮配置id存在，则查询按钮详情
      if (queryString.id) {
        getButtonDetail(queryString.id);
      }
      let type = queryString.type || editTypeMap.add.type;
      setEditType(type);
    } else {
      message.error("请确定地区配置是否正确");
      // TODO 确定一下是否需要记录原来的地址
      history.back();
    }
  }, []);

  useEffect(() => {
    let sendData = {};
    if (locationInfo.id || locationInfo.id == 0) {
      landingPageList;

      sendData = Object.assign(sendData, {
        ...buttonDetail,
        location: locationInfo.location,
        locationId: locationInfo.id,
      });
      if (buttonDetail.id && !sendData.intentionConsultService) {
        sendData.intentionConsultService = rightsServiceNoChooseId; // 假如是编辑且咨询产品类型无值默认选择无
      }
      if (
        (buttonDetail.landingPageId || buttonDetail.landingPageId == 0) &&
        Array.isArray(landingPageList) &&
        landingPageList.length > 0
      ) {
        let isExist = false;
        for (let i = 0, len = landingPageList.length; i < len; i++) {
          if (buttonDetail.landingPageId === landingPageList[i].value) {
            isExist = true;
            break;
          }
        }
        if (!isExist) {
          sendData.landingPageId = null;
        }
      }
      setQueryParams(sendData);
    }
  }, [locationInfo, buttonDetail, landingPageList]);

  return (
    <div className="button-edit-box">
      <div className="content">
        <div className="header-box">
          <span className="title">
            {(editTypeMap[editType] && editTypeMap[editType].name) || ""}
          </span>
        </div>
        <div className="form-box">
          {(queryParams.locationId || queryParams.locationId == 0) && (
            <SchemaForm
              className="button-edit-form"
              components={{
                LocationName,
                IconSelect,
                TextArea,
                InputNumber: InputNumberComponent,
                LandingSelect,
              }}
              effects={effectsFunc}
              initialValues={queryParams}
              actions={actions}
            >
              <Field
                type="string"
                name="location"
                x-component="LocationName"
                title="适用地区"
                {...formItemLayout}
                x-component-props={{ locationMap }}
              />
              <Field
                type="string"
                name="intentionConsultService"
                x-component="Select"
                title="咨询产品类型"
                x-rules={[{ message: "请选择咨询产品类型", required: true }]}
                {...formItemLayout}
                x-component-props={{
                  placeholder: "请选择咨询产品类型",
                  dataSource: rightsServiceList,
                  optionFormat: {
                    label: "consultServiceName",
                    value: "consultService",
                  },
                  showSearch: true,
                  optionFilterProp: "children",
                  disabled: loading,
                  getPopupContainer: (triggerNode) => triggerNode.parentNode,
                }}
              />
              <Field
                type="string"
                name="buttonCode"
                x-component="Input"
                title="按钮代码"
                x-rules={[
                  {
                    message: "请输入按钮名称",
                    required: true,
                    whitespace: true,
                  },
                ]}
                {...formItemLayout}
                x-component-props={{
                  placeholder: "请输入按钮代码，如yqdz-cszx（最多20字）",
                  maxLength: "20",
                  autoComplete: "off",
                  disabled: loading,
                }}
              />
              <Field
                type="string"
                name="buttonName"
                x-component="Input"
                title="按钮文案"
                x-rules={[
                  {
                    message: "请输入按钮文案",
                    required: true,
                    whitespace: true,
                  },
                ]}
                {...formItemLayout}
                x-component-props={{
                  placeholder: "请输入按钮名称，如财税咨询（最多20字）",
                  maxLength: "20",
                  autoComplete: "off",
                  disabled: loading,
                }}
              />
              <Field
                type="string"
                name="icon"
                x-component="IconSelect"
                title="按钮icon"
                x-rules={[{ message: "请选择按钮icon", required: true }]}
                {...formItemLayout}
                x-component-props={{
                  iconList,
                  fileSize: 1,
                  disabled: loading,
                }}
              />
              <Field
                type="number"
                name="orderNum "
                x-component="InputNumber"
                title="按钮顺序"
                x-rules={[{ message: "请输入按钮顺序", required: true }]}
                {...formItemLayout}
                x-component-props={{
                  max: 50,
                  min: 1,
                  disabled: loading,
                }}
              />
              <Field
                type="string"
                name="pageOpenType"
                x-component="Select"
                title="页面打开方式"
                x-rules={[{ message: "请选择页面打开方式", required: true }]}
                {...formItemLayout}
                x-component-props={{
                  placeholder: "请选择页面打开方式",
                  dataSource: pageOpenTypeList,
                  showSearch: true,
                  optionFilterProp: "children",
                  disabled: loading,
                  getPopupContainer: (triggerNode) => {
                    return triggerNode.parentNode;
                  },
                }}
              />
              <Field
                type="string"
                name="pageWindowWidth"
                x-component="InputNumber"
                title="页面弹窗宽度"
                x-rules={[
                  {
                    message: "请输入弹窗宽度",
                    required: false,
                    whitespace: true,
                  },
                ]}
                visible={false}
                {...formItemLayout}
                x-component-props={{
                  max: 9999,
                  min: 1,
                  disabled: loading,
                }}
              />
              <Field
                type="string"
                name="pageWindowHeight"
                x-component="InputNumber"
                title="页面弹窗高度"
                x-rules={[
                  {
                    message: "请输入弹窗高度",
                    required: false,
                    whitespace: true,
                  },
                ]}
                visible={false}
                {...formItemLayout}
                x-component-props={{
                  max: 9999,
                  min: 1,
                  disabled: loading,
                }}
              />
              <Field
                type="string"
                name="pageType"
                x-component="Select"
                title="跳转页面类型"
                x-rules={[{ message: "请选择跳转页面类型", required: true }]}
                {...formItemLayout}
                x-component-props={{
                  placeholder: "请选择跳转页面类型",
                  dataSource: jumpTypeList,
                  showSearch: true,
                  optionFilterProp: "children",
                  disabled: loading,
                  getPopupContainer: (triggerNode) => {
                    return triggerNode.parentNode;
                  },
                }}
              />

              <Field
                type="string"
                name="consultOpenType"
                x-component="Select"
                title="咨询窗口打开方式"
                visible={true}
                x-rules={[
                  { message: "请选择咨询窗口打开方式", required: true },
                ]}
                {...formItemLayout}
                x-component-props={{
                  placeholder: "请选择咨询窗口打开方式",
                  dataSource: consultOpenTypeList,
                  showSearch: true,
                  optionFilterProp: "children",
                  disabled: loading,
                  getPopupContainer: (triggerNode) => {
                    return triggerNode.parentNode;
                  },
                }}
              />
              <Field
                type="string"
                name="consultWindowWidth "
                x-component="InputNumber"
                title="咨询窗口弹窗宽度"
                x-rules={[
                  {
                    message: "请输入弹窗宽度",
                    required: false,
                    whitespace: true,
                  },
                ]}
                visible={false}
                {...formItemLayout}
                x-component-props={{
                  max: 9999,
                  min: 1,
                  disabled: loading,
                }}
              />
              <Field
                type="string"
                name="consultWindowHeight"
                x-component="InputNumber"
                title="咨询窗口弹窗高度"
                x-rules={[
                  {
                    message: "请输入弹窗高度",
                    required: false,
                    whitespace: true,
                  },
                ]}
                visible={false}
                {...formItemLayout}
                x-component-props={{
                  max: 9999,
                  min: 1,
                  disabled: loading,
                }}
              />
              <Field
                type="string"
                name="landingPageId"
                x-component="LandingSelect"
                title="落地页名称"
                visible={false}
                x-rules={[{ message: "请选择落地页", required: true }]}
                {...formItemLayout}
                x-component-props={{
                  exclusiveList,
                  normalList,
                  landingPageList,
                  disabled: loading,
                }}
              />
              <Field
                type="string"
                name="externalUrl"
                x-component="Input"
                title="链接地址"
                visible={false}
                x-rules={[
                  {
                    message: "请输入链接地址",
                    required: true,
                    whitespace: true,
                  },
                ]}
                {...formItemLayout}
                x-component-props={{
                  placeholder: "请输入链接地址（最多2000字）",
                  maxLength: "2000",
                  autoComplete: "off",
                  disabled: loading,
                  allowClear: true,
                }}
              />
              <Field
                type="string"
                name="description"
                x-component="TextArea"
                title="备注"
                {...formItemLayout}
                x-component-props={{
                  placeholder: "请输入备注（最多200字）",
                  maxLength: "200",
                  autoComplete: "off",
                  disabled: loading,
                  allowClear: true,
                }}
              />
            </SchemaForm>
          )}
        </div>
        <div className="option-box">
          <Button
            type="primary"
            className="button-item"
            loading={loading}
            onClick={() => {
              confirmHandler();
            }}
          >
            保存
          </Button>
          <div className="line-box"></div>
          <Button
            className="button-item"
            disabled={loading}
            onClick={() => {
              cancelHandler();
            }}
          >
            取消
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ButtonEdit;
