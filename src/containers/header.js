import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/header';
import {
  setTimer, getUploadSignature,
  postCorrectionImage, postCorrection, postDuration, exerciseBelong,
} from 'actions/record';

// 头部
class HeaderContainer extends Component {
  render() {
    return (
      <Header
        ref={header => { Header.instance = header; }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  timer: state.timer || {},
});

export default connect(mapStateToProps, {
  setTimer,
  getUploadSignature,
  postCorrectionImage,
  postCorrection,
  postDuration,
  exerciseBelong,
})(HeaderContainer);
