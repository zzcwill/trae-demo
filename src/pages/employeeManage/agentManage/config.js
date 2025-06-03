//优先级最高等级
const priortyMax = 10;
// 优先级可选择列表
let priortyTypeList = [];
for (let i = 0; i <= priortyMax; i++) {
  priortyTypeList.push({
    id: i,
    name: i.toString(10),
  });
}

export { priortyTypeList };
