/**
 * 格式化问答列表数据
 * @param {Array} arr 列表数据
 */
export const formatList = (arr = []) => {
    const newList = [];
    arr.forEach((element, index) => {
        const questionData = JSON.parse(JSON.stringify(element));
        questionData.questionId = `${questionData.id}`;
        questionData.tag = index + 1;
        newList.push(questionData);
    });
    return newList;
};
