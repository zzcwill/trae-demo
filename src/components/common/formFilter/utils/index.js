/**
 * 将rules格式化成对象
 * @param {Object} validateRules
 */
export default function getValidateTriggers(validateRules) {
  return validateRules.reduce((current, next) => Object.assign(current, next), {});
}
