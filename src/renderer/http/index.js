import axios from 'axios';
import router from '@/router';
import { _typeof } from '@/utils/util';
import { BASE_URL } from '@/utils/constant';

const toLogin = (router) => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};

const errorHandler = (response, router) => {
  switch (response.status) {
    // 未登录
    case 401:
      break;
    // 登录过期
    case 403:
      break;
    // 请求不存在
    case 404:
      setTimeout(() => {
        toLogin(router);
      }, 1000);
      break;
    // 服务器错误
    case 500:
      break;
    // 网关超时
    case 504:
      break;
    default:
  }
};

const createAxios = (options, router) => {
  axios.defaults.withCredentials = true;

  const instance = axios.create(options);
  if (options.defaults) {
    Object.keys(options.defaults).forEach((type) => {
      const value = options.defaults[type];
      if (_typeof(value) === 'object') {
        for (const [k, v] of Object.entries(value)) {
          instance.defaults.headers[type][k] = v;
        }
      } else {
        instance.defaults[type] = value;
      }
    });
  }

  instance.interceptors.request.use(config => config, error => Promise.reject(error.response));

  instance.interceptors.response.use(
    (response) => {
      if (response.status !== 200) return Promise.reject(response);
      return Promise.resolve(response);
    },
    (error) => {
      const { response } = error;
      if (response) {
        errorHandler(response, router);
      }

      return Promise.reject(error.response);
    },
  );

  return instance;
};

const instance = createAxios(
  {
    baseURL: BASE_URL
  },
  router,
);

const highOrderRequest = methodName => (url, params, config) =>
  new Promise((resolve, reject) => {
    const data = methodName === 'get' ? { params } : params;

    instance[methodName](url, data, config)
      .then(res => resolve(res.data))
      .catch(err => reject(err.data));
  });

export const fetch = highOrderRequest('get');
export const post = highOrderRequest('post');
export const put = highOrderRequest('put');
export const remove = highOrderRequest('delete');

export default instance;
