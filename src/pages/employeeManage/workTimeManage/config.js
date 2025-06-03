import { workTimeWeekMap } from "@/const/config";
import moment from "moment";
export const valueChangeTypeMap = {
  type: "type", // 组类型，1电话组，2在线组
  lastModifierFlag: "lastModifierFlag", // 最后修改人是我，1是，0不是
  groupIdList: "groupIdList", // 业务组id列表
};

export const workFlagType = {
  work: {
    code: "0",
    name: "上班",
  },
  noWork: {
    code: "1",
    name: "不上班",
  }, //
};

// 弹唱类型
export const editTypeMap = {
  add: {
    code: "add",
    name: "新增",
  },
  edit: {
    code: "edit",
    name: "修改",
  },
};

export const mergeTypeListConfig = [
  workTimeWeekMap.Mon.type,
  workTimeWeekMap.Tues.type,
  workTimeWeekMap.Wed.type,
  workTimeWeekMap.Thur.type,
  workTimeWeekMap.Fri.type,
];

export const weekCodeTYpe = {
  Sun: "0",
  Sat: "6",
  workDat: "15",
};
// 工作时间map
export const workTimeMergeMap = {
  workDat: {
    name: "周一至周五",
    code: weekCodeTYpe.workDat,
  },
  [workTimeWeekMap.Sat.type]: {
    name: "周六",
    code: weekCodeTYpe.Sat,
  },
  [workTimeWeekMap.Sun.type]: {
    name: "周日",
    code: weekCodeTYpe.Sun,
  },
};
export const workTimeMergeList = [
  {
    name: "周一至周五",
    code: weekCodeTYpe.workDat,
  },
  {
    name: "周六",
    code: weekCodeTYpe.Sat,
  },
  {
    name: "周日",
    code: weekCodeTYpe.Sun,
  },
];

export const defaultEffectiveDate = () => {
  let list = [];
  workTimeMergeList.forEach((item) => {
    list.push({
      ...item,
      workFlag:
        item.code === weekCodeTYpe.workDat
          ? workFlagType.work.code
          : workFlagType.noWork.code,
      dayTime: [
        {
          beginTime: "08:30",
          endTime: "17:30",
        },
      ],
    });
  });
  return {
    effectiveDateBegin: moment().startOf("month").format("MM-DD"),
    effectiveDateEnd: moment().format("MM-DD"),
    weekConfig: list,
  };
};
