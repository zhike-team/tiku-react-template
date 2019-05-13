import React, { Component } from 'react';
import { connect } from 'react-redux';
import Exercise from 'components/exercise';
import { setRecord, getUploadSignature, postAnswer, postMachinePigai } from 'actions/record';

// 做题
class ExerciseContainer extends Component {
  render() {
    // 神策打点
    if (this.pathName !== global.location.pathname) {
      typeof sa !== 'undefined' && sa.quick('autoTrackSinglePage'); // eslint-disable-line
      this.pathName = global.location.pathname;
    }
    return (
      <Exercise {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  practice: state.practice,
  stepList: state.stepList,
  record: state.record || {},
});

export default connect(mapStateToProps, {
  setRecord,
  getUploadSignature,
  postMachinePigai,
  postAnswer,
})(ExerciseContainer);
