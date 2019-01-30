/**
 * 检测数据类型
 * @param {*} obj
 */
export const _typeof = obj =>
  Object.prototype.toString
    .call(obj)
    .replace(/(\S+)\s(\S+)]/, '$2')
    .toLocaleLowerCase();
