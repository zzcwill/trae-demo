/**
 * @description schema的结构解析工具
 */

/**
 * @description 将structure 解析为适合页面渲染的序列结构
 */
export const sortedStructure = (layouts) => {
  const { root, structure = {} } = layouts;
  // 目前的需求不需要做布局递归，只需要扁平化的展示根节点的children即可。
  const elementLayoutList = structure[root]; // 获取所有元素
  return elementLayoutList || [];
}
