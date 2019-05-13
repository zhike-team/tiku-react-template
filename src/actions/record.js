import { createAction } from 'redux-actions';
import { createRequestAction } from 'utils/action';

// 获取练习列表

export const getExerciseList = createAction('GET_EXERCISE_LIST');
export const realGetExerciseList = createRequestAction('REAL_GET_EXERCISE_LIST');

// 获取做题记录
export const getRecord = createAction('GET_RECORD');
export const realGetRecord = createRequestAction('REAL_GET_RECORD');

// 设置做题记录
export const setRecord = createAction('SET_RECORD');
export const realSetRecord = createAction('REAL_SET_RECORD');

// 设置做题时间
export const setTimer = createAction('SET_TIMER');
export const realSetTimer = createAction('REAL_SET_TIMER');

// 上传答案
export const postAnswer = createAction('POST_ANSWER');
export const realPostAnswer = createRequestAction('REAL_POST_ANSWER');

// 获取上传签名
export const getUploadSignature = createAction('GET_UPLOAD_SIGNATURE');
export const realGetUploadSignature = createRequestAction('REAL_GET_UPLOAD_SIGNATURE');

// 上传纠错图片
export const postCorrectionImage = createAction('POST_CORRECTION_IMAGE');
export const realPostCorrectionImage = createRequestAction('REAL_POST_CORRECTION_IMAGE');

// 上传纠错
export const postCorrection = createAction('POST_CORRECTION');
export const realPostCorrection = createRequestAction('REAL_POST_CORRECTION');

// 机器批改
export const postMachinePigai = createAction('POST_MACHINE_PIGAI');
export const realPostMachinePigai = createRequestAction('REAL_POST_MACHINE_PIGAI');

// 保存时间
export const postDuration = createAction('POST_DURATION');
export const realPostDuration = createRequestAction('REAL_POST_DURATION');
