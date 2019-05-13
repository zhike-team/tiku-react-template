import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Error } from '@zhike/ti-component';

// 错误
class ErrorContainer extends Component {
  render() {
    // 神策打点
    if (this.pathName !== global.location.pathname) {
      typeof sa !== 'undefined' && sa.quick('autoTrackSinglePage'); // eslint-disable-line
      this.pathName = global.location.pathname;
    }
    return (
      <Error {...this.props} />
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(ErrorContainer);
