import React, { Component } from 'react';
import { connect } from 'react-redux';
import Initial from 'components/initial';
import { getPractice, postExercise } from 'actions/practice';
import { getRecord, setRecord, setTimer } from 'actions/record';
import { setStepList } from 'actions/step';

// 初始化
class InitalContainer extends Component {
  render() {
    // 神策打点
    if (this.pathName !== global.location.pathname) {
      typeof sa !== 'undefined' && sa.quick('autoTrackSinglePage'); // eslint-disable-line
      this.pathName = global.location.pathname;
    }
    return (
      <Initial {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  record: state.record || {},
  stepList: state.stepList || {},
});

export default connect(mapStateToProps, {
  getPractice,
  getRecord,
  setStepList,
  postExercise,
  setRecord,
  setTimer,
})(InitalContainer);
