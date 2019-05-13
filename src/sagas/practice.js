import { take, fork } from 'redux-saga/effects';
import { request } from 'utils/action';
import * as apis from 'common/apis';
import * as actions from 'actions/practice';

// 获取练习
export const watchGetPractice = function* watchGetPractice() {
  for (;;) {
    const { payload } = yield take(actions.getPractice);
    const newApis = apis.getPractice;
    yield fork(
      request,
      actions.realGetPractice,
      newApis,
      payload,
    );
  }
};

// 创建练习
export const watchPostExercise = function* watchPostExercise() {
  for (;;) {
    const { payload } = yield take(actions.postExercise);
    yield fork(
      request,
      actions.realPostExercise,
      apis.postExercise,
      payload,
    );
  }
};

