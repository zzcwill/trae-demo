import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Button, message } from "dpl-react";
import history from "@/history";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import qs from "qs";
import RuleConfig from "../../components/ruleConfig";
import { paramCodeType } from "../../config";

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
  FormEffectHooks,
  FormSpy,
} = uForm;
const actions = createFormActions();
const { onFieldValueChange$ } = FormEffectHooks;
const filterParamCodeList = [paramCodeType.brand];
export default function AddRule(props) {
  const [id, setId] = useState(() => {
    const obj = qs.parse(window.location.href.split("?")[1]);
    return obj.id;
  });
  const [policyId, setPolicyId] = useState(() => {
    const obj = qs.parse(window.location.href.split("?")[1]);
    return obj.policyId;
  });
  const [detail, setDetail] = useState({});
  const [groupList, setGroupList] = useState([]); //在线组
  const [acceptanceMode, setAcceptanceMode] = useState([]); // 受理模式
  const [currentAcceptanceMode, setCurrentAcceptanceMode] = useState(-1);
  const [brand, setBrand] = useState([]); // 产品维度
  const [brandMap, setBrandMap] = useState({}); // 产品维度map
  const isFirst = useRef(true);

  const getWdList = async () => {
    const data = await get({ url: Api.getWdList });
    if (data.success) {
      let brandList = [];
      let brandMap = {};
      brandList = data.data.brand.map((item) => {
        brandMap[item.id] = item;
        return { label: item.name, value: item.id };
      });
      setBrand(brandList);
      setBrandMap(brandMap);
    }
  };

  const getDetail = async (id) => {
    const data = await get({ url: Api.routeRuleDetail, params: { id } });
    if (data.success) {
      setDetail(data.data);
      setCurrentAcceptanceMode(data.data.acceptanceMode);
    }
  };
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
  const getOptions = async () => {
    const data = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: "route_rule_acceptance_mode",
      },
    });
    let map = {
      route_rule_acceptance_mode: setAcceptanceMode,
    };
    if (Array.isArray(data.data)) {
      data.data.forEach((item) => {
        map[item.groupName] &&
          map[item.groupName](
            item.options.map((item) => {
              return { label: item.name, value: item.id };
            })
          );
      });
    }
  };
  const confirmHandler = () => {
    actions.submit().then(async (value) => {
      if (value.values.acceptanceMode != "4") {
        delete value.values.tip;
      }
      let data = null;
      if (id) {
        data = await post({
          url: Api.routeRuleUpdate,
          data: { ...value.values, id, policyId },
        });
      } else {
        data = await post({
          url: Api.routeRuleSave,
          data: { ...value.values, policyId },
        });
      }
      if (!data) return;
      if (data.success) {
        message.success(id ? "修改成功" : "新增成功");
        history.push("/routerManage/routerRule");
      } else {
        message.error(data.message);
      }
    });
  };
  const cancelHandler = () => {
    history.push("/routerManage/routerRule");
  };
  const linkValidate = () => {
    //联动校验
    const { setFieldState, getFieldState } = createFormActions();
    onFieldValueChange$("*(groupId,acceptanceMode)").subscribe((fieldState) => {
      const groupState = getFieldState("groupId");
      const acceptanceModeState = getFieldState("acceptanceMode");
      actions.setFieldState("groupId", (state) => {
        state.errors = [];
      });
      if (
        acceptanceModeState.value != "0" &&
        acceptanceModeState.value != "4"
      ) {
        if (!groupState.value) {
          actions.setFieldState("groupId", (state) => {
            state.errors = ["请选择分配给组"];
          });
        }
      }
    });
  };

  useEffect(() => {
    if (!isFirst.current) {
      return;
    }
    const len = Object.keys(brandMap);
    if (
      Array.isArray(len) &&
      len.length > 0 &&
      Array.isArray(detail.conditionList) &&
      detail.conditionList.length > 0
    ) {
      let newData = Object.assign({}, detail);
      const conditionList = [].concat(detail.conditionList);
      if (Array.isArray(conditionList)) {
        const dataMap = {
          [paramCodeType.brand]: brandMap,
        };
        conditionList.forEach((item, index) => {
          if (filterParamCodeList.indexOf(item.paramCode) > -1) {
            let newValue = [];
            try {
              item.targetValue &&
                item.targetValue.split(",").forEach((code) => {
                  if (
                    dataMap[item.paramCode][code] &&
                    newValue.indexOf(code) < 0
                  ) {
                    newValue.push(code);
                  }
                });
            } catch (e) {
              console.error(e);
            }
            console.log(newValue);
            item.targetValue = newValue.join(",");
          }
        });
      }
      newData.conditionList = conditionList;
      isFirst.current = false;
      setDetail(newData);
    }
  }, [brandMap, detail]);

  useEffect(() => {
    if (id) {
      getDetail(id);
    } else {
      setDetail({
        conditionList: [{ paramCode: "", operatorType: "", targetValue: "" }],
      });
    }
  }, [id]);
  useEffect(() => {
    getGroupList();
    getOptions();
    getWdList();
  }, []);
  return (
    <div className="add-rule">
      <div className="title">{id ? "修改" : "新增"}规则</div>
      <SchemaForm
        actions={actions}
        initialValues={detail}
        components={{ RuleConfig }}
        effects={() => {
          linkValidate();
        }}
      >
        <Field
          {...formItemLayout}
          type="string"
          title="规则名称"
          name="name"
          x-component="Input"
          x-component-props={{ placeholder: "请输入规则名称", maxLength: 20 }}
          x-rules={[{ required: true, message: "请输入规则名称" }]}
        />
        <Field
          {...formItemLayout}
          type="string"
          title="备注"
          name="remark"
          x-component="Input"
          x-component-props={{ placeholder: "请输入备注", maxLength: 100 }}
        />
        <Field
          {...formItemLayout}
          type="array"
          title="规则配置"
          name="conditionList"
          x-component="RuleConfig"
          x-component-props={{ placeholder: "请输入", brand }}
          x-rules={[
            { required: true, message: "请配置规则" },
            (value) => {
              let indexArr = [];
              Array.isArray(value) &&
                value.forEach((item, index) => {
                  if (
                    !item.operatorType ||
                    !item.paramCode ||
                    !item.targetValue
                  ) {
                    indexArr.push(index + 1);
                  }
                });
              if (indexArr.length > 0) {
                return {
                  type: "error",
                  message: "第" + indexArr.join(",") + "条规则有未填项，请检查",
                };
              }
            },
          ]}
        />
        <Field
          {...formItemLayout}
          type="string"
          title="分配给组"
          name="groupId"
          x-component="Select"
          x-component-props={{
            placeholder: "请选择在线组",
            dataSource: groupList,
            showSearch: true,
            allowClear: true,
            filterOption: function (input, option) {
              return (
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              );
            },
          }}
        />
        <Field
          {...formItemLayout}
          type="string"
          title="受理模式"
          name="acceptanceMode"
          x-component="Select"
          x-component-props={{
            placeholder: "请选择在线组",
            dataSource: acceptanceMode,
            showSearch: true,
            onChange(e) {
              setCurrentAcceptanceMode(e);
            },
            allowClear: true,
          }}
          x-rules={[{ required: true, message: "请选择受理模式" }]}
        />
        {/*{currentAcceptanceMode == '4' && <Field*/}
        {/*    {...formItemLayout}*/}
        {/*    type='string'*/}
        {/*    title='机器人与人工都不启用，提示'*/}
        {/*    name='tip'*/}
        {/*    x-component='Input'*/}
        {/*    x-component-props={{placeholder: '请输入提示', maxLength: 100}}*/}
        {/*    x-rules={[{required: true, message: "请输入提示"}]}*/}
        {/*/>}*/}
        {currentAcceptanceMode == "4" && (
          <FormSpy>
            <div className="tips">
              注：机器人与人工都不启用时，请到对话提示中设置无服务提示语。
            </div>
          </FormSpy>
        )}
      </SchemaForm>
      <div className="btn-group">
        <Button type="primary" onClick={confirmHandler}>
          保存
        </Button>
        <Button onClick={cancelHandler} style={{ marginLeft: 10 }}>
          取消
        </Button>
      </div>
    </div>
  );
}
