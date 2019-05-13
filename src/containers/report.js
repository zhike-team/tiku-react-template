import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getReport } from 'actions/report';
import {
  getUploadSignature,
  postCorrectionImage, postCorrection, postMachinePigai,
} from 'actions/record';
import Report from 'components/report';

// 做题
class ReportContainer extends Component {
  render() {
    // 神策打点
    if (this.pathName !== global.location.pathname) {
      typeof sa !== 'undefined' && sa.quick('autoTrackSinglePage'); // eslint-disable-line
      this.pathName = global.location.pathname;
    }
    return (
      <Report {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  report: state.report,
  practice: state.practice.practice,
  stepList: state.stepList,
});

export default connect(mapStateToProps, {
  getReport,
  getUploadSignature,
  postCorrectionImage,
  postCorrection,
  postMachinePigai,
})(ReportContainer);
