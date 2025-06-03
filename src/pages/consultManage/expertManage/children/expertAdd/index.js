import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import {
  Button,
  Input,
  InputNumber,
  TreeSelect,
  message,
  Modal,
} from "dpl-react";
import UEditor from "@/components/consultManage/ueditor";
import Api from "@/request/api-olhelpmanage";
import { get, post, postFile } from "@/request/request";
import qs from "qs";
import { UploadImage , uForm } from "dora";
import history from "@/history";
import {
  sceneList,
  subSceneList,
  editTypeMap,
  serviceTypeList,
  serviceTypeMap,
  serviceConfigCardTypeEnum,
} from "@/const/config";
import AllSelect from "../../component/allSelect";
import OnlineChatServiceDate from "../../component/onlineChatServiceDate";
import { valueEnum } from "../../config";
import TextArea from "@/components/common/textArea";
import { isObject, removeAll } from "@/utils";
import useDictList from "@/hooks/useDictList";
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
  FormEffectHooks,
} = uForm;
const configErrorNull = {
  message: "配置不能存在空",
  type: "error",
};
const serviceWaysList = serviceTypeList.map((item) => {
  return item.id;
});

console.log(Input, typeof Input.styledComponentId);
console.log(TextArea, typeof TextArea.styledComponentId);
console.log(UploadImage, typeof UploadImage.styledComponentId);
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const actions = createFormActions();

const newSceneList = sceneList.map((item) => {
  return {
    label: item.name,
    value: item.id,
  };
});

const INQUIRY = "INQUIRY";

const formatServiceTimeList = (list) => {
  let newServiceTimeList = [];
  if (Array.isArray(list)) {
    list.forEach((service) => {
      newServiceTimeList.push({
        [valueEnum.locationList]: service[valueEnum.locationList],
        [valueEnum.serviceDateBegin]: service[valueEnum.serviceDateBegin],
        [valueEnum.serviceDateEnd]: service[valueEnum.serviceDateEnd],
        [valueEnum.serviceTimeBegin]: service[valueEnum.serviceTimeBegin],
        [valueEnum.serviceTimeEnd]: service[valueEnum.serviceTimeEnd],
      });
    });
  }

  return newServiceTimeList;
};

// 格式化服务列表
const formatServiceWayList = (list, type, data = {}) => {
  let result = list;
  let isHas = false;
  if (Array.isArray(list)) {
    list.forEach((item) => {
      if (item[valueEnum.serviceWay] === type) {
        isHas = true;
        item[valueEnum.location] = data[valueEnum.location];
        item[valueEnum.serviceTimeList] = formatServiceTimeList(
          data[valueEnum.serviceTimeList]
        );
      }
    });
    if (!isHas) {
      result.push({
        [valueEnum.serviceWay]: type,
        [valueEnum.location]: data[valueEnum.location],
        [valueEnum.serviceTimeList]: formatServiceTimeList(
          data[valueEnum.serviceTimeList]
        ),
      });
    }
  }
  return result;
};
// 剔除不在地区列表里的数据
const formatAreaList = (list, map) => {
  let result = [];
  if (Array.isArray(list) && isObject(map)) {
    list.forEach((item) => {
      if (map[item]) {
        result.push(item);
      }
    });
  }
  return result;
};

function walk(arr, obj, type) {
  arr.forEach((item) => {
    obj[item.code] = item;
    item.label = item.name;
    item.value = type == 2 || type == 6 ? item.code : item.id;
    Array.isArray(item.children) && walk(item.children, obj, type);
  });
}

const getTypeList = (type, allClassifyList) => {
  const list = allClassifyList.filter((item) => item.type === type);
  if (list && list.length > 0) {
    const item = list[0];
    let obj = {};
    Array.isArray(item.list) && walk(item.list, obj, item.type);
    return item.list;
  }
  return [];
};

function ExpertAdd(props, refs) {
  const [regionList, setRegionList] = useState([]);
  const [serviceList, setServiceListList] = useState([]);
  const [rightsServiceList, setRightsServiceList] = useState([]);
  const [noAllRegionList, setNoAllRegionList] = useState([]); //线上、线下去除全国 问诊
  const regionMapRef = useRef(null);
  const inquiryAreaMapRef = useRef(null); //问诊地区键值对字典
  const [consultScopeList, setConsultScopeList] = useState([]); //咨询范围
  const [industryList, setIndustryList] = useState([]); //擅长行业
  const [domainList, setDomainList] = useState([]); //擅长领域
  const [brandList, setBrandList] = useState([]); // 维度
  const [groupList, setGroupList] = useState([]); // 在线组列表
  const [editType, setEditType] = useState(null); // 编辑类型
  const [expertType, setExpertType] = useState(); // 专家类型
  const [
    expertTypeList,
  ] = useDictList([
    "expert_type"
  ], Api.getEnumOptions);

  const [id, setId] = useState(() => {
    const obj = qs.parse(window.location.href.split("?")[1]);
    return obj.id;
  });
  const detailLoadRef = useState(false); //是否使用过
  const [detail, setDetail] = useState({
    imageList: [],
  });
  const [onlineChatSelectAreaList, setOnlineChatSelectAreaList] = useState([]); // 在线咨询选择的服务地区
  const { onFieldValueChange$ } = FormEffectHooks;
  const onlineChatSelectAreaListRef = useRef(null);
  const allClassifyListRef = useRef(null);
  const regionListRef = useRef(null); //存所有的分类，在选择切换的时候根据type去取
  const isFirst = useRef(true);
  const getGroupList = async () => {
    const data = await get({
        url: Api.getCommonGroupList,
        params: { type: "2" },
    });
    if (data.success) {
        setGroupList(
            data.data.map((item) => {
                return { label: item.name, value: item.id };
            })
        );
    }
  };
  // 获取维度、地区、用户等级列表
  const getWdList = async () => {
    const res = await get({
      url: Api.getWdList,
    });
    if (res.success) {
      const data = res.data;
      setBrandList([].concat(data.brand));
    } else {
      message.error(res.message);
    }
  };
  const getTreeDate = async () => {
    const res = await get(Api.classifyExpertTaxList);
    if (res.success) {
      const data = res.data;
      allClassifyListRef.current = data;
      Array.isArray(data) &&
        data.forEach((item) => {
          if (item.type == "2") {
            //地区类型
            let obj = {};
            Array.isArray(item.list) && walk(item.list, obj, item.type);
            setRegionList(item.list);
            regionListRef.current = item.list;
            regionMapRef.current = obj;
          } else if (item.type == "6") {
            //问诊地区类型
            let obj = {};
            Array.isArray(item.list) && walk(item.list, obj, item.type);
            inquiryAreaMapRef.current = obj;
          } else if (item.type == "11") {
            //擅长领域
            let obj = {};
            Array.isArray(item.list) && walk(item.list, obj, item.type);
            setDomainList(item.list);
          }
        });
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
        cardTypes: serviceConfigCardTypeEnum.expert,
      },
    });
    if (res.success && Array.isArray(res.data)) {
      setRightsServiceList(
        res.data.map((item) => {
          return {
            id: item.consultService,
            name: item.consultServiceName,
          };
        })
      );
    } else {
      message.error(res.message);
    }
  };

  const confirmHandler = async () => {
    actions.submit().then(async (res) => {
      const { values } = res;
      values.domainIdList = values.domainIdList || [];
      let result = {
        account: values.account.trim(),
        name: values.name.trim(),
        scene: values.scene,
        consultService: values.consultService,
        brand: values.brand,
        consultNumInit: values.consultNumInit,
        praiseRateInit: Number(values.praiseRateInit / 100).toFixed(4), //96.1->0.961
        subScene: values.subScene,
        headImgUrl: values.imageList[0].imageUrl,
        headImgName: values.imageList[0].name,
        description: values.description,
        consultDetail: values.consultDetail,
        introduction: values.introduction,
        expertType: values.expertType,
        groupId: values.groupId,
        classifyIdList: [
          // ...values.regionIdList,
          ...values.consultScopeIdList,
          ...values.industryIdList,
          ...values.domainIdList,
        ],
        serviceWayList: [],
      };
      const serviceWayMap = {
        [serviceTypeMap.ONLINE_CHAT.id]: () => {
          formatServiceWayList(
            result.serviceWayList,
            serviceTypeMap.ONLINE_CHAT.id,
            {
              [valueEnum.location]: values.onlineChatAreaList,
              [valueEnum.serviceTimeList]: values.onlineChatServiceTimeList,
            }
          );
        },
        [serviceTypeMap.ONLINE_VIDEO.id]: () => {
          formatServiceWayList(
            result.serviceWayList,
            serviceTypeMap.ONLINE_VIDEO.id,
            {
              [valueEnum.location]: values.onlineVideoAreaList,
            }
          );
        },
        [serviceTypeMap.OFFLINE.id]: () => {
          formatServiceWayList(
            result.serviceWayList,
            serviceTypeMap.OFFLINE.id,
            {
              [valueEnum.location]: values.offlineAreaList,
            }
          );
        },
        [serviceTypeMap.INQUIRY_ONLINE.id]: () => {
          formatServiceWayList(
            result.serviceWayList,
            serviceTypeMap.INQUIRY_ONLINE.id,
            {
              [valueEnum.location]: values.onlineVideoAreaList,
            }
          );
        },
        [serviceTypeMap.INQUIRY_OFFLINE.id]: () => {
          formatServiceWayList(
            result.serviceWayList,
            serviceTypeMap.INQUIRY_OFFLINE.id,
            {
              [valueEnum.location]: values.offlineAreaList,
            }
          );
        },
      };
      // 处理服务方式
      if (Array.isArray(values.serviceWay)) {
        values.serviceWay.forEach((item) => {
          const func = serviceWayMap[item];
          if (func) {
            func();
          }
        });
      }

      let data = null;
      if (editType === editTypeMap.edit.code) {
        data = await post(Api.expertInstitutionUpdate, {
          data: { ...result, id },
        });
      } else {
        data = await post(Api.expertInstitutionSave, {
          data: result,
        });
      }
      if (data.success) {
        message.success(
          editType === editTypeMap.edit.code ? "修改成功" : "新增成功"
        );
        if (editType === editTypeMap.edit.code) {
          history.push("/consultManage/expertManage/expertDetail?id=" + id);
        } else {
          history.push(
            "/consultManage/expertManage/expertDetail?id=" + data.data.id
          );
        }
      } else {
        message.error(data.message);
      }
    });
  };
  const getCategory = (type, list) => {
    let result = [];
    list.forEach((item) => {
      if (item.type == type) {
        result = item.list.map((a) => a.id);
      }
    });
    return result;
  };

  // 初始化在线咨询服务时间地区 主要是为了避免列表接口或者详情接口异步情况
  const initOnlineChatSelectAreaList = () => {
    if (
      Array.isArray(onlineChatSelectAreaListRef.current) &&
      onlineChatSelectAreaListRef.current.length > 0 &&
      regionMapRef.current
    ) {
      let resultList = [];
      onlineChatSelectAreaListRef.current.forEach((item) => {
        if (regionMapRef.current[item]) {
          resultList.push(regionMapRef.current[item]);
        }
      });
      setOnlineChatSelectAreaList(resultList);
    }
  };
  const getDetail = async (id) => {
    const data = await get(Api.expertInstitutionDetail, { params: { id } });
    if (data.success) {
      detailLoadRef.current = true;
      data.data.serviceTypeList = getCategory("3", data.data.classifyList);
      if (data.data.subScene === INQUIRY) {
        data.data.consultScopeIdList = getCategory("4", data.data.classifyList);
        data.data.industryIdList = getCategory("5", data.data.classifyList);
        data.data.domainIdList = getCategory("11", data.data.classifyList);
      } else {
        data.data.consultScopeIdList = getCategory("0", data.data.classifyList);
        data.data.industryIdList = getCategory("1", data.data.classifyList);
      }
      data.data.imageList = [
        {
          imageUrl: data.data.headImgUrl,
          name: data.data.headImgName,
        },
      ];
      if (Array.isArray(data.data.serviceWayList)) {
        let resultServiceWayList = [];
        function formatOnlineChatTime(obj) {
          let resultLocationList = [].concat(obj[valueEnum.location]);
          let resultServiceTimeList = [];
          if (Array.isArray(obj[valueEnum.serviceTimeList])) {
            let onlineChatSelectAreaListResult = [];
            obj[valueEnum.serviceTimeList].forEach((service) => {
              onlineChatSelectAreaListResult =
                onlineChatSelectAreaListResult.concat(
                  service[valueEnum.locationList]
                );
              resultServiceTimeList.push({
                [valueEnum.locationList]: service[valueEnum.locationList],
                [valueEnum.serviceDateBegin]:
                  service[valueEnum.serviceDateBegin],
                [valueEnum.serviceDateEnd]: service[valueEnum.serviceDateEnd],
                [valueEnum.serviceTimeBegin]:
                  service[valueEnum.serviceTimeBegin],
                [valueEnum.serviceTimeEnd]: service[valueEnum.serviceTimeEnd],
              });
            });
            onlineChatSelectAreaListRef.current =
              onlineChatSelectAreaListResult.filter((item) => {
                return (
                  onlineChatSelectAreaListResult.indexOf(item) ===
                  onlineChatSelectAreaListResult.lastIndexOf(item)
                );
              });
          }
          data.data.onlineChatAreaList = resultLocationList;
          data.data.onlineChatServiceTimeList = resultServiceTimeList;
        }

        // const map = {
        //     [serviceTypeMap.ONLINE_CHAT.id]: (obj = {}) => {

        //     },
        //     [serviceTypeMap.ONLINE_VIDEO.id]: (obj = {}) => {
        //         let resultLocationList = [].concat(
        //             obj[valueEnum.location]
        //         );
        //         data.data.onlineVideoAreaList = resultLocationList;
        //     },
        //     [serviceTypeMap.OFFLINE.id]: (obj = {}) => {
        //         let resultLocationList = [].concat(
        //             obj[valueEnum.location]
        //         );
        //         data.data.offlineAreaList = resultLocationList;
        //     },
        //     [serviceTypeMap.INQUIRY_ONLINE.id]: (obj = {}) => {
        //         let resultLocationList = [].concat(
        //             obj[valueEnum.location]
        //         );
        //         data.data.onlineVideoAreaList = resultLocationList;
        //     },
        //     [serviceTypeMap.INQUIRY_OFFLINE.id]: (obj = {}) => {
        //         let resultLocationList = [].concat(
        //             obj[valueEnum.location]
        //         );
        //         data.data.offlineAreaList = resultLocationList;
        //     },
        // };
        data.data.serviceWayList.forEach((item) => {
          const serviceWay = item.serviceWay;
          if (serviceWay === serviceTypeMap.ONLINE_CHAT.id) {
            formatOnlineChatTime(item);
          } else if (
            serviceWay === serviceTypeMap.ONLINE_VIDEO.id ||
            serviceWay === serviceTypeMap.INQUIRY_ONLINE.id
          ) {
            data.data.onlineVideoAreaList = [...item.locationList];
          } else if (
            serviceWay === serviceTypeMap.OFFLINE.id ||
            serviceWay === serviceTypeMap.INQUIRY_OFFLINE.id
          ) {
            data.data.offlineAreaList = [...item.locationList];
          }
          resultServiceWayList.push(item.serviceWay);
        });
        data.data.serviceWay = resultServiceWayList;
      }
      if (data.data.praiseRateInit) {
        data.data.praiseRateInit = data.data.praiseRateInit * 100;
      }
      console.log("data.data", data.data);
      setDetail(data.data);
      setExpertType(data.data.expertType || 'individual');
    }
  };
  const deleteHandler = () => {
    Modal.confirm({
      title: "正在执行删除操作",
      content: "删除后的服务将无法恢复，你还要继续吗",
      onOk: async () => {
        const data = await post(Api.expertInstitutionBatchDelete, {
          data: { idList: [id] },
        });
        if (data.success) {
          message.success("删除成功");
          history.push("/consultManage/expertManage");
        } else {
          message.error(data.message);
        }
      },
    });
  };
  const uploadHandler = async (files) => {
    const data = await postFile(Api.saveImage, {
      data: { file: files[0] },
    });
    return [
      {
        imageUrl: data.data.domain + data.data.imageUrl,
        name: data.data.name,
      },
    ];
  };

  const effectsFunc = () => {
    const { setFieldState, getFieldState } = createFormActions();
    onFieldValueChange$(valueEnum.serviceWay).subscribe(({ value }) => {
      let onlineChatAreaListVisibleFlag = false;
      let onlineVideoAreaListVisibleFlag = false;
      let offlineAreaListVisibleFlag = false;
      if (Array.isArray(value)) {
        if (value.indexOf(serviceTypeMap.ONLINE_CHAT.id) > -1) {
          onlineChatAreaListVisibleFlag = true;
        }
        if (
          value.indexOf(serviceTypeMap.ONLINE_VIDEO.id) > -1 ||
          value.indexOf(serviceTypeMap.INQUIRY_ONLINE.id) > -1
        ) {
          onlineVideoAreaListVisibleFlag = true;
        }
        if (
          value.indexOf(serviceTypeMap.OFFLINE.id) > -1 ||
          value.indexOf(serviceTypeMap.INQUIRY_OFFLINE.id) > -1
        ) {
          offlineAreaListVisibleFlag = true;
        }
      }
      setFieldState(
        "*(onlineChatAreaList,onlineChatServiceTimeList)",
        (state) => {
          state.visible = onlineChatAreaListVisibleFlag;
        }
      );
      setFieldState("onlineVideoAreaList", (state) => {
        state.visible = onlineVideoAreaListVisibleFlag;
      });
      setFieldState("offlineAreaList", (state) => {
        state.visible = offlineAreaListVisibleFlag;
      });
    });
    onFieldValueChange$(valueEnum.subScene).subscribe(({ value }) => {
      if (value === INQUIRY) {
        setServiceListList(
          serviceTypeList.filter((item) => item.id.includes(INQUIRY))
        );
        setConsultScopeList(getTypeList("4", allClassifyListRef.current));
        setIndustryList(getTypeList("5", allClassifyListRef.current));
        setNoAllRegionList(getTypeList("6", allClassifyListRef.current));
        setFieldState("*(consultDetail,introduction)", (state) => {
          state.visible = false;
        });
        setFieldState("*(domainIdList)", (state) => {
          state.visible = true;
        });
      } else {
        setServiceListList(
          serviceTypeList.filter((item) => !item.id.includes(INQUIRY))
        );
        setConsultScopeList(getTypeList("0", allClassifyListRef.current));
        setIndustryList(getTypeList("1", allClassifyListRef.current));
        const result = removeAll(regionListRef.current, "value");
        setNoAllRegionList(result);
        setFieldState("*(consultDetail,introduction)", (state) => {
          state.visible = true;
        });
        setFieldState("*(domainIdList)", (state) => {
          state.visible = false;
        });
      }
      if (editType === "add" || !detailLoadRef.current) {
        setFieldState(
          "*(serviceWay,onlineVideoAreaList,offlineAreaList,industryIdList,domainIdList,consultScopeIdList,consultDetail,introduction)", //类型切换的时候清一下数据
          (state) => {
            state.value = undefined;
          }
        );
      }
      detailLoadRef.current = false;
    });
    onFieldValueChange$(valueEnum.onlineChatAreaList).subscribe(({ value }) => {
      if (Array.isArray(value) && regionMapRef.current) {
        let resultList = [];
        value.forEach((item) => {
          if (regionMapRef.current[item]) {
            resultList.push(regionMapRef.current[item]);
          }
        });
        setOnlineChatSelectAreaList(resultList);
      }
    });
  };

  useEffect(() => {
    const obj = qs.parse(window.location.href.split("?")[1]);
    if (obj.type) {
      setEditType(obj.type);
      if (obj.type === editTypeMap.add.code) {
        setExpertType('individual');
        setDetail({
          ...detail,
          expertType: 'individual'
        })
      }
    }
    getTreeDate();
    getConsultProductTypeList();
    getWdList();
    getGroupList();
  }, []);
  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (
      isFirst.current &&
      Array.isArray(regionList) &&
      regionList.length > 0 &&
      detail &&
      (detail.id || detail.id == 0)
    ) {
      isFirst.current = false;
      initOnlineChatSelectAreaList();
      detail.onlineChatAreaList = formatAreaList(
        //这个是有一期需要过滤掉没有的地区信息,保存的时候自动把不在列表的地区去掉
        detail.onlineChatAreaList,
        regionMapRef.current
      );
      if (detail.subScene === INQUIRY) {
        detail.onlineVideoAreaList = formatAreaList(
          detail.onlineVideoAreaList,
          inquiryAreaMapRef.current
        );
        detail.offlineAreaList = formatAreaList(
          detail.offlineAreaList,
          inquiryAreaMapRef.current
        );
      } else {
        detail.onlineVideoAreaList = formatAreaList(
          detail.onlineVideoAreaList,
          regionMapRef.current
        );
        detail.offlineAreaList = formatAreaList(
          detail.offlineAreaList,
          regionMapRef.current
        );
      }
      setDetail({
        ...detail,
      });
      actions.setFieldState(
        "*(onlineChatAreaList,onlineVideoAreaList,offlineAreaList)",
        (state) => {
          state.value = detail[state.name];
        }
      );
    }
  }, [regionList, detail]);

  function PraiseFormComponent(props) {
    return (
      <div>
        <InputNumber {...props} />
        <span>%</span>
      </div>
    );
  }

  console.log(detail, 'detail');

  return (
    <div className="expert-add">
      <div className="title">新增服务</div>
      <div className="form">
        <SchemaForm
          components={{
            TextArea,
            UploadImage,
            UEditor,
            AllSelect,
            OnlineChatServiceDate,
            PraiseFormComponent,
          }}
          initialValues={detail}
          actions={actions}
          effects={effectsFunc}
          onChange={(values) => {
            if (values.expertType !== expertType) {
              setExpertType(values.expertType);
            }
          }}
        >
          <Field
            type="string"
            name="account"
            x-component="Input"
            title="专家&机构账号"
            x-rules={[
              {
                message: "请输入专家&机构账号",
                required: true,
                whitespace: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "输入【员工账户中心】中为该专家&机构申请的账号",
              maxLength: "20",
              autoComplete: "off",
              disabled: editType === editTypeMap.edit.code,
            }}
          />
          <Field
            type="string"
            name="brand"
            x-component="Select"
            title="产品维度"
            x-rules={[{ message: "请选择产品维度", required: true }]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择产品维度",
              dataSource: brandList,
              showSearch: true,
              optionFilterProp: "children",
              optionFormat: {
                label: "name",
                value: "id",
              },
              // disabled: editType === editTypeMap.edit.code,
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
            }}
          />
          <Field
            type="string"
            name="scene"
            x-component="Select"
            title="卡片类型"
            x-rules={[{ message: "请选择卡片类型", required: true }]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择卡片类型",
              dataSource: sceneList,
              optionFormat: {
                label: "name",
                value: "id",
              },
              disabled: editType === editTypeMap.edit.code,
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
            }}
          />
          <Field
            type="string"
            name="expertType"
            x-component="Select"
            title="专家类型"
            x-rules={[{ message: "请选择专家类型", required: true }]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择卡片类型",
              dataSource: expertTypeList,
              // disabled: editType === editTypeMap.edit.code,
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
            }}
          />
          {expertType === 'expert_team' && <Field
            type="string"
            name="groupId"
            x-component="Select"
            title="在线业务组"
            x-rules={[{ message: "请选择在线业务组", required: true }]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择在线业务组",
              dataSource: groupList,
              showSearch: true,
              optionFilterProp: "children",
              // disabled: editType === editTypeMap.edit.code,
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
            }}
          />}
          <Field
            type="string"
            name="subScene"
            x-component="Select"
            title="可提供咨询类别"
            x-rules={[{ message: "请选择可提供咨询类别", required: true }]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择可提供咨询类别",
              dataSource: subSceneList,
              optionFormat: {
                label: "name",
                value: "id",
              },
              disabled: editType === editTypeMap.edit.code,
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
            }}
          />
          <Field
            type="string"
            name="consultService"
            x-component="Select"
            title="咨询产品类型"
            x-rules={[{ message: "请选择咨询产品类型", required: true }]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择卡片类型",
              dataSource: rightsServiceList,
              optionFormat: {
                label: "name",
                value: "id",
              },
              disabled: editType === editTypeMap.edit.code,
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
            }}
          />
          <Field
            type="string"
            name="name"
            x-component="Input"
            title="专家&机构名称"
            x-rules={[
              {
                message: "请输入专家&机构名称",
                required: true,
                whitespace: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请输入专家&机构名称",
              maxLength: "10",
              autoComplete: "off",
            }}
          />

          <Field
            type="string"
            name="imageList"
            x-component="UploadImage"
            title="服务方图片"
            x-rules={[
              {
                message: "请上传服务方图片",
                required: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              multiple: false,
              maxLength: 1,
              acceptTypes: ["png", "jpg", "jpeg"],
              mapKey: "imageUrl",
              onUpload: uploadHandler,
              maxSize: 1024 * 1024,
              onSizeCheckError: (err) => {
                message.error("仅支持小于1MB的图片");
              },
            }}
          />
          <Field
            type="string"
            name="description"
            x-component="TextArea"
            title="专家&机构资质"
            x-rules={[
              {
                message: "请输入专家&机构资质",
                required: true,
                whitespace: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "输入专家&机构的资质介绍，不同类型直接请换行",
              maxLength: 32,
              rows: 6,
              autoComplete: "off",
            }}
          />
          <Field
            type="number"
            name="consultNumInit"
            x-component="InputNumber"
            title="咨询量初始值"
            x-rules={[{ message: "请输入咨询量初始值", required: true }]}
            {...formItemLayout}
            x-component-props={{
              max: 1000000,
              min: 0,
              precision: 0,
              inputWidth: 100,
              disabled: editType === editTypeMap.edit.code, //只有新增、复制的时候可以修改，以前旧的专家都不可以修改
            }}
          />

          <Field
            type="number"
            name="praiseRateInit"
            x-component="praiseFormComponent"
            title="好评率初始值"
            x-rules={[{ message: "请输入好评率初始值", required: true }]}
            {...formItemLayout}
            x-component-props={{
              max: 100,
              min: 0,
              precision: 2,
              inputWidth: 100,
              disabled: editType === editTypeMap.edit.code, //只有新增、复制的时候可以修改，以前旧的专家都不可以修改
            }}
          />
          <Field
            type="string"
            name="consultScopeIdList"
            x-component="TreeSelect"
            title="咨询范围"
            x-rules={[
              {
                message: "请选择咨询范围",
                required: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择咨询范围",
              changeOnSelect: true,
              multiple: true,
              treeData: consultScopeList,
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
              showCheckedStrategy: TreeSelect.SHOW_PARENT,
            }}
          />
          <Field
            type="string"
            name="industryIdList"
            x-component="TreeSelect"
            title="擅长行业"
            x-rules={[
              {
                message: "请选择擅长行业",
                required: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择擅长行业",
              changeOnSelect: true,
              multiple: true,
              treeData: industryList,
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
              showCheckedStrategy: TreeSelect.SHOW_PARENT,
            }}
          />
          <Field
            type="string"
            name="domainIdList"
            x-component="TreeSelect"
            title="擅长领域"
            x-rules={[
              {
                message: "请选择擅长领域",
                required: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择擅长领域",
              changeOnSelect: true,
              multiple: true,
              treeData: domainList,
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
              showCheckedStrategy: TreeSelect.SHOW_PARENT,
            }}
          />
          <Field
            type="string"
            name="consultDetail"
            x-component="UEditor"
            title="咨询详情"
            x-rules={[
              {
                message: "请输入咨询详情",
                required: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              defaultValue: detail.consultDetail,
            }}
          />
          <Field
            type="string"
            name="introduction"
            x-component="TextArea"
            title="专家&机构自述"
            x-rules={[
              {
                message: "请输入专家自述",
                required: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "详细介绍专家机构的能力和案例，不超过300字;",
              maxLength: 600,
              rows: 6,
            }}
          />
          <Field
            type="string"
            name="serviceWay"
            x-component="Select"
            title="服务类型"
            x-rules={[
              {
                message: "请选择服务类型",
                required: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择服务类型",
              multiple: true,
              optionFilterProp: "children",
              dataSource: serviceList,
              optionFormat: {
                label: "name",
                value: "id",
              },
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
              showSearch: true,
            }}
          />
          <Field
            type="string"
            name="onlineVideoAreaList"
            x-component="AllSelect"
            title="线上服务地区"
            visible={false}
            x-rules={[
              {
                message: "请选择线上服务地区",
                required: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择线上服务地区",
              multiple: true,
              optionFilterProp: "children",
              dataSource: noAllRegionList,
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
              showSearch: true,
              isShowAllOption: true,
            }}
          />
          <Field
            type="string"
            name="offlineAreaList"
            x-component="AllSelect"
            title="线下服务地区"
            visible={false}
            x-rules={[
              {
                message: "请选择线下服务地区",
                required: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择线下服务地区",
              multiple: true,
              optionFilterProp: "children",
              dataSource: noAllRegionList,
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
              showSearch: true,
              isShowAllOption: true,
            }}
          />
          <Field
            type="string"
            name="onlineChatAreaList"
            x-component="AllSelect"
            title="在线咨询服务地区"
            visible={false}
            x-rules={[
              {
                message: "请选择在线咨询服务地区",
                required: true,
              },
            ]}
            {...formItemLayout}
            x-component-props={{
              placeholder: "请选择在线咨询服务地区",
              multiple: true,
              optionFilterProp: "children",
              dataSource: regionList,
              getPopupContainer: (triggerNode) => triggerNode.parentNode,
              showSearch: true,
              isShowAllOption: true,
            }}
          />
          <Field
            type="string"
            title="专家在线时间"
            name="onlineChatServiceTimeList"
            {...formItemLayout}
            x-component="OnlineChatServiceDate"
            visible={false}
            x-rules={(value) => {
              if (!value) {
                return false;
              }
              if (Array.isArray(value)) {
                if (!value.length) {
                  return false;
                }
                for (let i = 0, len = value.length; i < len; i++) {
                  const item = value[i];
                  if (
                    !item[valueEnum.serviceDateBegin] ||
                    !item[valueEnum.serviceDateEnd] ||
                    !item[valueEnum.serviceTimeBegin] ||
                    !item[valueEnum.serviceTimeEnd] ||
                    !Array.isArray(item[valueEnum.locationList]) ||
                    !item[valueEnum.locationList].length
                  ) {
                    return configErrorNull;
                  }
                }
              }
            }}
            x-component-props={{
              areaList: onlineChatSelectAreaList,
            }}
          />
        </SchemaForm>
        <div className="btn-group">
          <Button
            type="primary"
            onClick={confirmHandler}
            style={{ marginRight: 10 }}
          >
            保存并预览
          </Button>
          <Button
            onClick={() => {
              history.push("/consultManage/expertManage");
            }}
          >
            取消
          </Button>
          {/*    {id && <Button onClick={deleteHandler}>删除</Button>}*/}
        </div>
      </div>
    </div>
  );
}

export default ExpertAdd;
