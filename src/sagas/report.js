import { take, fork } from 'redux-saga/effects';
import { request } from 'utils/action';
import * as apis from 'common/apis';
import * as actions from 'actions/report';

// 获取练习
export const watchGetReport = function* watchGetReport() {
  for (;;) {
    const { payload } = yield take(actions.getReport);
    const newApis = apis.getReport.map((item, index) => {
      if (index === 1) {
        return item.replace(/@mode/, 'base');
      }
      return item;
    });
    yield fork(
      request,
      actions.realGetReport,
      newApis,
      payload,
    );
  }
};
