import { take, put } from 'redux-saga/effects';
import * as actions from 'actions/step';

// 设置做题步骤
export const watchSetStepList = function* watchSetStepList() {
  for (;;) {
    const { payload } = yield take(actions.setStepList);
    yield put(actions.realSetStepList.success({
      data: payload,
    }));
  }
};
