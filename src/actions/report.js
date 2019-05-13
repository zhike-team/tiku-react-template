import { createAction } from 'redux-actions';
import { createRequestAction } from 'utils/action';

// 获取报告
export const getReport = createAction('GET_REPORT');
export const realGetReport = createRequestAction('REAL_GET_REPORT');
