/**
 * 通用函数
 */

/**
 * @description: 防抖函数
 * @param {number,string} delay
 * @param {*} callback
 */
export function debounce(delay, callback) {
  let task;
  // const test = async () => {};
  return function () {
    clearTimeout(task);
    task = setTimeout(() => {
      callback.apply(this, arguments);
    }, delay);
  };
}
