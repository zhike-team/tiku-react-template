import { take, fork, put } from 'redux-saga/effects';
import { request } from 'utils/action';
import * as apis from 'common/apis';
import * as actions from 'actions/record';

// 获取练习列表
export const watchGetExerciseList = function* watchGetExerciseList() {
  for (;;) {
    const { payload } = yield take(actions.getExerciseList);
    yield fork(
      request,
      actions.realGetExerciseList,
      apis.getExerciseList,
      payload,
    );
  }
};

// 获取练习记录
export const watchGetRecord = function* watchGetRecord() {
  for (;;) {
    const { payload } = yield take(actions.getRecord);
    yield fork(
      request,
      actions.realGetRecord,
      apis.getRecord,
      payload,
    );
  }
};

// 设置做题记录
export const watchSetRecord = function* watchSetRecord() {
  for (;;) {
    const { payload } = yield take(actions.setRecord);

    yield put(actions.realSetRecord({
      keys: payload.keys,
      value: payload.value,
      requestPayload: {
        mode: payload.mode,
        id: payload.id,
      },
    }));
  }
};

// 设置做题时间
export const watchSetTimer = function* watchSetTimer() {
  for (;;) {
    const { payload } = yield take(actions.setTimer);
    yield put(actions.realSetTimer({
      key: payload.key,
      value: payload.value,
      requestPayload: {
        mode: payload.mode,
        id: payload.id,
      },
    }));
  }
};

// 上传答案
export const watchPostAnswer = function* watchPostAnswer() {
  for (;;) {
    const { payload } = yield take(actions.postAnswer);

    yield fork(
      request,
      actions.realPostAnswer,
      apis.postAnswer,
      payload,
    );
  }
};

// 获取上传签名
export const watchGetUploadSignature = function* watchGetUploadSignature() {
  for (;;) {
    const { payload } = yield take(actions.getUploadSignature);

    yield fork(
      request,
      actions.realGetUploadSignature,
      apis.getUploadSignature,
      payload,
    );
  }
};

// 上传纠错图片
export const watchPostCorrectionImage = function* watchPostCorrectionImage() {
  for (;;) {
    const { payload } = yield take(actions.postCorrectionImage);

    yield fork(
      request,
      actions.realPostCorrectionImage,
      apis.postCorrectionImage,
      payload,
      {
        multipart: true,
      },
    );
  }
};

// 上传纠错
export const watchPostCorrection = function* watchPostCorrection() {
  for (;;) {
    const { payload } = yield take(actions.postCorrection);

    yield fork(
      request,
      actions.realPostCorrection,
      apis.postCorrection,
      payload,
    );
  }
};

// 机器批改
export const watchPostMachinePigai = function* watchPostMachinePigai() {
  for (;;) {
    const { payload } = yield take(actions.postMachinePigai);

    yield fork(
      request,
      actions.realPostMachinePigai,
      apis.postMachinePigai.map(item =>
        item.replace(/@subject/, payload.payload.subject)),
      payload,
    );
  }
};

// 保存时间
export const watchPostDuration = function* watchPostDuration() {
  for (;;) {
    const { payload } = yield take(actions.postDuration);

    yield fork(
      request,
      actions.realPostDuration,
      apis.postDuration,
      payload,
    );
  }
};
