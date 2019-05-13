import axios from 'axios';
import cookie from 'cookie';
import { createAction, handleActions } from 'redux-actions';
import { put } from 'redux-saga/effects';
import FormData from 'form-data';
import { loginUrl } from 'common/config';
import Exception from 'common/exception';

// 创建请求动作
export const createRequestAction = base => ({
  request: createAction(`${base}_REQUEST`),
  success: createAction(`${base}_SUCCESS`),
  failure: createAction(`${base}_FAILURE`),
});

// 跳转到登录页面
export const redirectToLoginPage = () => {
  global.location.href = `${loginUrl}${encodeURIComponent(global.location.href)}`;
};

// 获取 token
export const getToken = () => {
  const search = global.location.search; // eslint-disable-line
  const tokenUrl = decodeURIComponent(search.match(new RegExp('[?#&]token=([^?#&]+)', 'i')) ? RegExp.$1 : '');
  const ssUser = cookie.parse(global.document.cookie).ss_user;
  const token = tokenUrl || ssUser ? JSON.parse(ssUser).token : '';
  return token;
}

/**
 * 创建响应动作
 *
 * @param {Action} action 普通动作
 * @param {RequestAction} requestAction 请求动作 若值为null，则为普通动作，默认为success状态
 * @param {Object} initialState 初始状态
 * @param {Object} options 其它参数（可选）
 * @param {Boolean} options.isOverride 是否在发起请求时覆盖之前的数据，默认为：true
 * @param {Boolean} options.isArray 更新的数据是否为一个数据列表：默认为：false
 * @param {String} options:arrayKey 若更新的数据为数据列表，此次更新的键值，默认值：id
 * @param {Function} options.handleData 自定义函数处理返回结果，默认值：undefined
 *
 * @return {HandleAction}
 */
export const createHandleAction = (
  action,
  requestAction,
  initialState,
  originOptions = {},
) => {
  const options = {};
  options.isOverride = originOptions.isOverride === undefined ? true : originOptions.isOverride;
  options.isArray = originOptions.isArray === undefined ? false : originOptions.isArray;
  options.arrayKey = originOptions.arrayKey === undefined ? 'id' : originOptions.arrayKey;
  options.handleData =
    originOptions.handleData === undefined ? undefined : originOptions.handleData;

  const actions = {};
  if (requestAction) {
    actions[action] = (state, { payload }) => {
      const realState = options.isArray ? (state[payload[options.arrayKey]] || {}) : state;
      const ret = options.isOverride || !realState.status ? {
        status: 'LOADING',
        expiredTime: state.expiredTime,
        data: realState.data,
      } : realState;

      if (options.isArray) {
        return Object.assign({}, state, {
          [payload[options.arrayKey]]: ret,
        });
      }

      return ret;
    };

    actions[requestAction.failure] = (state, { payload }) => {
      const ret = {
        status: 'FAILURE',
        expiredTime: state.expiredTime,
        data: state.data,
      };

      if (options.isArray) {
        return Object.assign({}, state, {
          [payload.requestPayload[options.arrayKey]]: ret,
        });
      }

      return ret;
    };
  }

  actions[requestAction ? requestAction.success : action] = (state, { payload }) => {
    let { data } = payload;

    if (options.handleData) {
      data = options.handleData(state, data, payload.requestPayload);
    }

    const ret = {
      status: 'SUCCESS',
      expiredTime: payload.expiredTime,
      data,
    };

    if (options.isArray) {
      return Object.assign({}, state, {
        [payload.requestPayload[options.arrayKey]]: ret,
      });
    }

    return ret;
  };

  return handleActions(actions, initialState);
};

// 请求函数
export const request = function* request(action, api, payload = {}, options = {}) {
  yield put(action.request());

  // 处理promise
  const isPromise =
    typeof payload.resolve === 'function' &&
    typeof payload.reject === 'function';
  const { resolve, reject } = payload;

  // 处理payload
  const tempPayload = isPromise ? payload.payload : payload;
  const pathname = global.location.pathname; // eslint-disable-line
  const isTest = pathname.indexOf('/test/') !== -1;
  // 处理token
  const search = global.location.search; // eslint-disable-line
  const urlToken = decodeURIComponent(search.match(new RegExp('[?#&]token=([^?#&]+)', 'i')) ? RegExp.$1 : '');
  const ssUser = cookie.parse(global.document.cookie).ss_user;
  const token = payload.payload && payload.payload.token
    || urlToken
    || ssUser ? JSON.parse(ssUser).token : '';
  if (!token && !isTest) {
    redirectToLoginPage();
    return;
  }
  let realPayload;
  if (options.multipart) {
    realPayload = new FormData();

    Object.keys(tempPayload).forEach(key => {
      if (key === 'file') return;
      realPayload.append(key, tempPayload[key]);
    });

    realPayload.append('file', tempPayload.file);
    realPayload.append('token', token);
  } else {
    realPayload = Object.assign({}, tempPayload, { token });
  }

  // 发出请求
  try {
    const res = yield axios({
      url: api[1],
      method: api[0],
      headers: {
        'Content-Type':
          options.multipart ? 'multipart/form-data' : 'application/json',
      },
      params: api[0] === 'get' ? realPayload : undefined,
      data: api[0] !== 'get' ? realPayload : undefined,
      timeout: 30000,
    });

    if (res.data.code !== 0) {
      throw new Exception(res.data.code, res.data.msg);
    }

    yield put(action.success({
      data: res.data.data,
      requestPayload: realPayload,
      expiredTime: options.expiredTime
        ? new Date(new Date().getTime() + (options.expiredTime * 1000 || 0))
        : undefined,
    }));

    if (isPromise) {
      resolve({
        data: res.data.data,
        requestPayload: realPayload,
        expiredTime: options.expiredTime
          ? new Date(new Date().getTime() + (options.expiredTime * 1000 || 0))
          : undefined,
      });
    }
  } catch (err) {
    if (err.code === 'BadGateway') {
      redirectToLoginPage();
      return;
    }

    yield put(action.failure());

    if (isPromise) {
      reject(
        err instanceof Exception
          ? err
          : new Exception('UNKNOWN', '未知错误'),
      );
    }

    if (err instanceof Exception) {
      // console.log(`ERROR_${err.code}：${err.message}`);
    } else {
      // console.log(err);
    }
  }
};

// 数据是否准备就绪
export const isDataReady = data => (
  data && data.status === 'SUCCESS' && (
    data.expiredTime === undefined ||
    new Date(data.expiredTime) >= new Date()
  )
);

// 数据是否过期
export const isDataExpired = data => (
  process.env.NODE_ENV === 'development' ||
  !data || (
    data.expiredTime &&
    new Date(data.expiredTime) < new Date()
  )
);

// 创建Promise
export const createPromise = (action, payload) => (
  new Promise((resolve, reject) => {
    action({ payload, resolve, reject });
  })
);

