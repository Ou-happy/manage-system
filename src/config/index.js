/*
 * @Author: ouhaiping
 * @Date: 2021-08-21 15:29:50
 * @LastEditors: ouhaiping
 * @LastEditTime: 2021-08-21 20:35:39
 * @Description: 环境变量配置
 */

const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi:
      'https://www.fastmock.site/mock/6d7521bfb652e6dcef8b9269b38dd200/api',
  },
  test: {
    baseApi: '/teat/api',
    mockApi:
      'https://www.fastmock.site/mock/6d7521bfb652e6dcef8b9269b38dd200/api',
  },
  prod: {
    baseApi: '/prod/api',
    mockApi:
      'https://www.fastmock.site/mock/6d7521bfb652e6dcef8b9269b38dd200/api',
  },
};
export default {
  env,
  mock: true,
  namespace: 'manageSystem',
  ...EnvConfig[env],
};
