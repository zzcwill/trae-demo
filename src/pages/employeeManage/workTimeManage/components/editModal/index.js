import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { uForm } from "dora";
import { message, Button, Modal, Checkbox } from "dpl-react";
import Api from "@/request/api-callcentermanage";
import { get, post } from "@/request/request";
import {
  editTypeMap,
  mergeTypeListConfig,
  weekCodeTYpe,
  workFlagType,
} from "../../config";
import {
  acceptanceChannelCode,
  workTypeList,
  workTimeSaveKeyMap,
} from "@/const/config";
import ModalSelect from "@/components/common/modalSelect";
import EffectiveDate from "../effectiveDate";
import moment from "moment";
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
  FormEffectHooks,
  createAsyncFormActions,
  FormPath,
} = uForm;
const actions = createFormActions();
// 枚举
const typeList = [
  {
    value: acceptanceChannelCode.call,
    label: "电话组",
  },
  {
    value: acceptanceChannelCode.online,
    label: "在线组",
  },
];

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
// 日期比较的基础年份（2020是闰年）
const basicYear = "2020";
const compareType = {
  day: "day", // 日期
  time: "time", // 时间
};
function isDateIntersection(start1, end1, start2, end2, format, isTime) {
  const startDate1 = moment(start1, format).valueOf();
  const endDate1 = moment(end1, format).valueOf();
  const startDate2 = moment(start2, format).valueOf();
  const endDate2 = moment(end2, format).valueOf();
  // 第一个的开始时间在第二个时间段中
  const firstStartInSecond = startDate1 >= startDate2 && startDate1 <= endDate2;
  // 第一个开始时间在第二个时间段中（左开右闭）
  const firstStartInSecondByTime = startDate1 >= startDate2 && startDate1 < endDate2;
  // 第一个的结束时间在第二个时间段中，(日期)
  const firstEndInSecondByDate = endDate1 >= startDate2 && endDate1 <= endDate2;
  // 第一个的结束时间在第二个时间段中，(时间)
  const firstEndInSecondByTime = endDate1 > startDate2 && endDate1 <= endDate2;
  // 第二个的时间在第一个时间段中，
  const secondInFirst = startDate1 <= startDate2 && endDate1 >= endDate2;
  if (
    !isTime &&
    (firstStartInSecond || firstEndInSecondByDate || secondInFirst)
  ) {
    return true;
  }
  if (
    isTime &&
    (firstStartInSecondByTime || firstEndInSecondByTime || secondInFirst)
  ) {
    return true;
  }
  return false;
}

// 比较时间
const compareTime = (list = [], beginKey, endKey, format) => {
  const len = list.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (
        isDateIntersection(
          list[i][beginKey],
          list[i][endKey],
          list[j][beginKey],
          list[j][endKey],
          format,
          true
        )
      ) {
        return {
          success: false,
          errorMessage: `第${i + 1}个和第${j + 1}个工作时间存在重叠！`,
        };
      }
    }
  }
  return {
    success: true,
  };
};
function EditModal(props, ref) {
  const {
    detail,
    type,
    companyList = [],
    orgList = [],
    callGroupList = [],
    onlineGroupList = [],
    onCancel,
    groupMap = {},
  } = props;
  const [loading, setLoading] = useState(false); // loading
  const [workType, setWorkType] = useState(() => {
    return detail.type || null;
  }); // 工作组类型
  const groupIdTemp = useRef({
    "1": [], //电话
    "2": [], //在线
  });

  const { onFieldValueChange$ } = FormEffectHooks;

  const warningNotification = (errorMessage) => {
    Modal.confirm({
      title: "提示：",
      content: errorMessage,
    });
  };

  const formatValues = (data) => {
    let result = {
      type: data.type || detail.type,
      groupIdList: data.groupIdList,
      workTime: [],
    };
    data.workTimeConfig.forEach((weekTime) => {
      let obj = {
        effectiveDateBegin: weekTime.effectiveDateBegin,
        effectiveDateEnd: weekTime.effectiveDateEnd,
      };
      let weekConfigList = [];
      weekTime.weekConfig.forEach((week) => {
        if (week.code === weekCodeTYpe.workDat) {
          weekConfigList = weekConfigList.concat(
            mergeTypeListConfig.map((day) => {
              let obj = {
                type: day,
                workFlag: week.workFlag,
              };
              if (obj.workFlag === workTypeList[0].id) {
                obj.dayTime = week.dayTime;
              }
              return obj;
            })
          );
        } else {
          let obj = {
            type: week.code,
            workFlag: week.workFlag,
          };
          if (obj.workFlag === workTypeList[0].id) {
            obj.dayTime = week.dayTime;
          }
          weekConfigList = weekConfigList.concat(obj);
        }
      });
      obj.weekConfig = weekConfigList;
      result.workTime.push(obj);
    });
    return result;
  };

  const checkData = (data) => {
    for (let i = 0, workTimeLen = data.length; i < workTimeLen; i++) {
      if (!data[i].effectiveDateBegin || !data[i].effectiveDateEnd) {
        return {
          type: "error",
          message: `第${i + 1}个配置的生效日期不能为空！`,
        };
      }
      for (let j = i + 1; j < workTimeLen; j++) {
        if (
          isDateIntersection(
            `${basicYear}-${data[i].effectiveDateBegin}`,
            `${basicYear}-${data[i].effectiveDateEnd}`,
            `${basicYear}-${data[j].effectiveDateBegin}`,
            `${basicYear}-${data[j].effectiveDateEnd}`,
            "YYYY-MM-DD"
          )
        ) {
          return {
            type: "error",
            message: `第${i + 1}个和第${j + 1}个生效日期存在重叠！`,
          };
        }
      }
      const workTimeItem = data[i];
      for (
        let k = 0, weekConfigLen = workTimeItem.weekConfig.length;
        k < weekConfigLen;
        k++
      ) {
        const weekConfigItem = workTimeItem.weekConfig[k];
        if (weekConfigItem.workFlag != workFlagType.work.code) {
          break;
        }
        const result = compareTime(
          weekConfigItem.dayTime,
          workTimeSaveKeyMap.beginTime,
          workTimeSaveKeyMap.endTime,
          "HH:mm"
        );
        if (!result.success) {
          return {
            type: "error",
            message: `第${i + 1}个配置的${weekConfigItem.name}的${
              result.errorMessage
            }`,
          };
        }
      }
    }
    return {
      type: "success",
    };
  };
  const confirmHandler = () => {
    actions.submit().then(async (value) => {
      const res = checkData(value.values.workTimeConfig);
      if (res.type === "error") {
        warningNotification(res.message);
        return;
      }
      let data = null;
      setLoading(true);
      const result = formatValues(value.values);
      if (!result) {
        setLoading(false);
        return;
      }
      if (type == editTypeMap.add.code) {
        data = await post({
          url: Api.postSaveWorkTime,
          data: result,
        });
      } else {
        data = await post({
          url: Api.postBatchUpdateWorkTime,
          data: result,
        });
      }
      setLoading(false);
      if (!data) return;
      if (data.success) {
        message.success(type == editTypeMap.add.code ? "新增成功" : "修改成功");
        onCancel(true);
      } else {
        message.error(data.message);
      }
    });
  };
  const cancelHandler = () => {
    onCancel && onCancel();
  };

  const effects = () => {
    const { setFieldState, setFieldValue } = createFormActions();
    onFieldValueChange$("type").subscribe((res) => {
      setWorkType(res.value);
      setFieldState(
        "groupIdList",
        (state) => {
          state.value = groupIdTemp.current[res.value];
        },
        true
      );
    });
  };

  return (
    <div className="work-time-edit-box">
      <SchemaForm
        actions={actions}
        initialValues={detail}
        effects={effects}
        components={{
          ModalSelect,
          EffectiveDate,
        }}
      >
        <Field
          {...formItemLayout}
          type="string"
          title="类型"
          name="type"
          visible={type == editTypeMap.add.code}
          x-component="RadioGroup"
          x-component-props={{ options: typeList, disabled: loading }}
          x-rules={[{ required: true, message: "类型不能为空！" }]}
        />
        <Field
          {...formItemLayout}
          type="string"
          title="业务组"
          name="groupIdList"
          x-component="ModalSelect"
          x-component-props={{
            list:
              workType == acceptanceChannelCode.call
                ? callGroupList
                : onlineGroupList,
            listMap: groupMap,
            showType: "box",
            companyList,
            orgList,
            groupType: workType,
            showCompanyDepartFilter: true,
            showButton: type == editTypeMap.add.code,
            disabled: type == editTypeMap.edit.code || loading,
            isShowModalClear: true,
            isNeedStringToNumber:true,
            onChange(value) {
              groupIdTemp.current = Object.assign({}, groupIdTemp.current, {
                [workType]: value,
              });
            },
          }}
          x-rules={[{ required: true, message: "业务组不能为空！" }]}
        />
        <Field
          type="array"
          name="workTimeConfig"
          x-component="EffectiveDate"
          x-component-props={{
            disabled: loading,
            className: "work-time-edit-config",
          }}
        />
      </SchemaForm>
      <div className="button-box">
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
  );
}
export default React.forwardRef(EditModal);
