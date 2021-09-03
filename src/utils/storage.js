/*
 * @Author: ouhaiping
 * @Date: 2021-08-21 20:07:40
 * @LastEditors: ouhaiping
 * @LastEditTime: 2021-09-01 10:45:51
 * @Description:
 */

import config from '@/config/index.js';

export default {
  setItem(key, val) {
    let storage = this.getStorage();
    storage[key] = val;
    window.localStorage.setItem(config.namespace, JSON.stringify(storage));
  },
  getItem(key) {
    let storage = this.getStorage();
    return storage[key];
  },
  getStorage() {
    return JSON.parse(window.localStorage.getItem(config.namespace) || '{}');
  },
  clearItem(key) {
    let storage = this.getStorage();
    delete storage[key];
    window.localStorage.setItem(config.namespace, JSON.stringify(storage));
  },
  clearAll() {
    window.localStorage.removeItem(config.namespace);
  },
};
