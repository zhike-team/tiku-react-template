import { createAction } from 'redux-actions';
import { createRequestAction } from 'utils/action';

// 获取练习
export const getPractice = createAction('GET_PRACTICE');
export const realGetPractice = createRequestAction('REAL_GET_PRACTICE');

// 创建练习
export const postExercise = createAction('POST_EXERCISE');
export const realPostExercise = createRequestAction('REAL_POST_EXERCISE');
