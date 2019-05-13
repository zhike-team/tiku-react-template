import { cloneDeep } from 'lodash';
import { createHandleAction } from 'utils/action';
import { getPractice, realGetPractice } from 'actions/practice';
import { setStepList, realSetStepList } from 'actions/step';
import { realSetRecord, realSetTimer, realGetExerciseList, getExerciseList } from 'actions/record';
import { getReport, realGetReport } from 'actions/report';
import initialState from './initial_state';

export default {

  // 练习
  practice: createHandleAction(
    getPractice,
    realGetPractice,
    initialState.practice,
  ),

  // 记录
  record: (state = initialState.record, action) => {
    if (action.type === realSetRecord.toString()) {
      const { keys, value } = action.payload;
      const newState = cloneDeep(state) || {};

      let cntNode = newState;
      keys.forEach((key, index) => {
        if (index !== keys.length - 1) {
          cntNode[key] = cntNode[key] || {};
          cntNode = cntNode[key];
        } else {
          cntNode[key] = value;
        }
      });

      return newState;
    }

    return state;
  },

  // 计时
  timer: (state = initialState.timer, action) => {
    if (action.type === realSetTimer.toString()) {
      const { value } = action.payload;
      return value;
    }

    return state;
  },

  // 设置做题步骤
  stepList: createHandleAction(
    setStepList,
    realSetStepList,
    initialState.stepList,
  ),

  // 练习
  report: createHandleAction(
    getReport,
    realGetReport,
    initialState.report,
  ),

  // 入口页 获取练习列表
  entrance: createHandleAction(
    getExerciseList,
    realGetExerciseList,
    initialState.entrance,
  ),


};
