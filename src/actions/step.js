import { createAction } from 'redux-actions';
import { createRequestAction } from 'utils/action';

// 设置做题步骤
export const setStepList = createAction('SET_STEP_LIST');
export const realSetStepList = createRequestAction('REAL_SET_STEP_LIST');
