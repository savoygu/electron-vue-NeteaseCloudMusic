/**
 * 检测数据类型
 * @param {*} obj
 */
export const _typeof = obj =>
  Object.prototype.toString
    .call(obj)
    .replace(/(\S+)\s(\S+)]/, '$2')
    .toLocaleLowerCase();

export const padZero = input => (input < 10 ? `0${input}` : input);

export const toHHMMSS = (secs, separator = ':') =>
  [Math.floor(secs / 3600), Math.floor((secs % 3600) / 60), Math.floor(secs % 60)]
    .map(padZero)
    .filter((v, i) => v !== '00' || i > 0)
    .join(separator);
