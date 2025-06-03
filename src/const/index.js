export * from './seatAssistVersion'

export const baseUrl = "/askonemanage/";

export const enumOption = {
  deal: "CORRECT_HANDLE_STATUS", // 纠错处理状态
  accept: "CORRECT_ACCEPT_STATUS", // 纠错采纳状态
};
export const permissionCode = {
  audit_reply: "audit_reply", //申核權限
  askone_import: "askone_import", //批量导入
  batch_delete_question: "batch_delete_question", //问答批量删除
  smartChatAnalysisTaskSave: "smartChatAnalysisTaskSave", //会话分析任务新增
  smartChatAnalysisTaskCancel: "smartChatAnalysisTaskCancel", //会话分析任务取消
};
export const roleCode = {
  expert: "expert", //二线专家
};

export const enumOptionType = {
  CORRECT_REASON: "CORRECT_REASON",
  InternalData: "INTERNAL_DATA_TYPE", // 内部资料类型
  EmailType: "EMAIL_TYPE", // 邮件类型
};

// 参数配置管理字段映射
export const parameterSettingMap = {
  // questionDelete: 'QUESTION_DELETE_THRESHOLD', // 标准问批量删除的数量阈值
  // esQuery: 'ES_QUERY_THRESHOLD', // 新机器人查询问题匹配的阈值
  similarity: "QUESTION_SIMILARITY_THRESHOLD", // 智能助理自动解答的阈值
  robotModel: "MODEL_ENABLED_IN_ORIGIN_1", // 机器人受理模式下调用的模式
  personModel: "MODEL_ENABLED_IN_ORIGIN_2", // 人工受理模式下调用的模式
  satisfactionModel: "SATISFACTION_MODEL_THRESHOLD", // 满意度模型的阈值
  emotionModel: "EMOTION_MODEL_THRESHOLD", // 情绪模型的阈值
  noAnswer: "NO_ANSWER_COUNT_THRESHOLD", // 机器人受理模式下连续匹配不到答案转人工阈值
  emotionToPerson: "REASON_1", // 机器人受理模式下用户情绪消极或质疑机器人转人工的提示语
  satisfactionToPerson: "REASON_2", // 机器人受理模式下机器人回答可能会不满意转人工的提示语
  complicatedToPerson: "REASON_11", // 机器人受理模式下复杂问题转人工的提示语
  toPerson: "REASON_12", // 机器人受理模式下问题直接转人工的提示语
  robotNoQuery: "REASON_13", // 机器人受理模式下机器人连续查询不到问题超过阈值转人工的提示语
  robotToPersonPoint: "REASON_17", // 机器人受理模式下机器人服务异常转人工的提示语
  onlineGroup: "LARGE_MODEL_RECOMMEND_GROUP", // 获取智库推荐开启范围、在线组
};
// 模型类型
export const modelType = {
  satisfaction: "1", // 满意度模型
  emotion: "0", // 情绪模型
};

// 参数配置对应的名词解释
export const iconContentMap = {
  // questionDelete: '在机器人管理端中一次性批量删除问题超过配置的问题个数时，企业微信提醒相关人员确认是否正常，及时干预', // 知识批量删除告警
  // newRobot: '新机器人中用户问匹配标准问的相似度阈值。相似度该与该阈值的才会匹配到标准问。', // 新机器人匹配阈值
  similarity:
    "智能助理中判断是否可机器人自动解答的阈值。匹配相似度高于自动解答阈值，智能助理会自动将答案发送给用户。智能助理解答阈值建议高于机器人匹配阈值。", // 智能助理自动解答阈值
  satisfactionModel:
    "满意度模型预测用户问题由机器人解答会满意的概率。满意度预测值高于配置的阈值时将由机器人解答，满意度预测值低于阈值时将转人工服务。如果配置了低于阈值转人工提示将在转人工同时显示提示语；若未配置提示语则不显示。", // 满意度模型
  emotionModel:
    "情绪模型判断用户问题中是否有负面情绪。无负面情绪时将由机器人解答，有负面情绪时将转人工服务。如果配置了负面情绪转人工提示将在转人工同时显示提示语；若未配置提示语则不显示。", // 情绪模型
  noAnswer:
    "用户问题连续多次未查到答案时转人工服务的阈值。用户问题连续未查到答案次数小于阈值时将由机器人解答，用户问题连续未查到答案次数大于阈值时将转人工服务。如果配置了无法查到无答案转人工提示将在转人工同时显示提示语；若未配置提示语则不显示。", // 无法查到答案
  complicatedToPerson:
    "用户问题查到答案中有复杂问题指令时将转人工服务。如果配置了复杂问题转人工提示将在转人工同时显示提示语；若未配置提示语则不显示。", // 复杂问题指令转人工提示
  toPerson:
    "用户问题查到答案中有转人工指令时将转人工服务。如果配置了转人工指令转人工提示将在转人工同时显示提示语；若未配置提示语则不显示。", // 转人工指令转人工提示
  robotToPersonPoint:
    "当机器人服务故障无法调用时，将转人工服务。如果配置了机器人调用失败转人工提示将在转人工时显示提示语，若未配置提示语则不显示。", // 机器人受理模式下机器人服务异常转人工的提示语
};
// 满意度异常实时日志查看 满意度评价
export const servicesMap = [
  {
    name: "非常满意",
    id: "1",
  },
  {
    name: "满意",
    id: "2",
  },
  {
    name: "不满意",
    id: "4",
  },
];

// 满意度异常实时日志查看 服务提供者
export const robotFlagMap = [
  {
    name: "小I机器人",
    id: "0",
  },
  {
    name: "新机器人",
    id: "1",
  },
  {
    name: "小I10.0机器人",
    id: "2",
  },
];
// 满意度异常实时日志查看 产品类型
export const productType = [
  {
    name: "全部",
    id: "all",
  },
  {
    name: "国税",
    id: "1",
  },
  {
    name: "个税",
    id: "2",
  },
];

// 满意度统计字段对应中文名称
export const servicesCountMap = {
  verySatisfiedCount: "非常满意的量",
  satisfiedCount: "满意的量",
  notSatisfiedCount: "不满意的量",
  total: "总的评价量",
};
// 颜色
export const servicesColorMap = {
  verySatisfiedCount: "#5BC49F",
  satisfiedCount: "#FEB64D",
  notSatisfiedCount: "#FA806D",
  total: "#60ACFC",
};

const previewUrlMap = {
  production: "http://biz.17win.com/consult-web-pc/",
  prod: "http://biz.17win.com/consult-web-pc/",
  pre: "http://pre-biz.17win.com/consult-web-pc/",
  test: "http://test-biz.dc.servyou-it.com/consult-web-pc/",
  release: "http://beta-biz.dc.servyou-it.com/consult-web-pc/",
  dev: "http://test-biz.dc.servyou-it.com/consult-web-pc/",
  // dev: "http://127.0.0.1:3001/consult-web-pc/",
  // dev: "http://beta-biz.dc.servyou-it.com/consult-web-pc/",
};
export const previewUrl = previewUrlMap[process.env.PHOENIX_BUILD_ENV];

export const preViewPageUrl = {
  "basic-page-preview": "basicPage/preview",
  "tax-page-preview": "taxPage/preview",
  "expert-page-preview": "expertPage/preview",
  "home-page-preview": "homePage/preview",
  "home-page-ground": "homePage/ground",
  "expert-detail-preview": "expertDetail/preview",
  "basic-page-ground": "basicPage/ground",
  "tax-page-ground": "taxPage/ground",
  "expert-page-ground": "expertPage/ground",
  "expert-detail-home": "expertDetail/home",
  "expert-detail-ground": "expertDetail/ground",
};

export const DialogueEventType = {
  start: 'start',
  dialogue: 'dialogue',
  evaluation: 'evaluation'
}

export const ChatMsgDirection = {
  user_to_assistant: 'user_to_assistant',
  assistant_to_user: 'assistant_to_user',
}

export const ChatMsgType = {
  text: 'text',
}

export const ChatStatus = {
  loading: 'loading', // 加载中
  outputing: 'outputing', // 输出中
  done: 'done', // 输出完成
  error: 'error', // 输出错误
}

export const TaskStatus = {
  notStart: '-1', // 未开始
  processing: '0', // 进行中
  finish: '1', // 已完成 - 案例通过点击评价或者发送评价之后本案例完成
  unFinish: '-2', // 未完成 - 超时之后后端会自动设置成未完成
}
