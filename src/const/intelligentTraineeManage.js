// 任务状态
export const taskStatusMap = {
  start: '-1', // 未开始
  training: '0', // 进行中
  result: '1', // 已完成
}

// 任务状态对应操作文本
export const taskStatusOperateTextMap = {
  [taskStatusMap.start]: '开始训练',
  [taskStatusMap.training]: '继续训练',
  [taskStatusMap.result]: '查看结果',
}

// 任务状态对应className
export const taskStatusClassMap = {
  [taskStatusMap.start]: 'dot-start',
  [taskStatusMap.training]: 'dot-training',
  [taskStatusMap.result]: 'dot-result',
}