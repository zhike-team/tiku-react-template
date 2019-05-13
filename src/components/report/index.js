import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from '@zhike/ti-ui';
import { createPromise } from 'utils/action';
import { Error } from '@zhike/ti-component';
import Loading from 'components/loading';
import BaseReport from './base_report';
import styles from './styles';

// 报告
export default class Report extends Component {
  // 参数
  static propTypes = {
    getReport: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    getUploadSignature: PropTypes.func.isRequired,
    postCorrectionImage: PropTypes.func.isRequired,
    postCorrection: PropTypes.func.isRequired,
    postMachinePigai: PropTypes.func.isRequired,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      isCompatible: true,
      isLoad: false,
      report: {},
    };
  }

  // 加载
  async componentDidMount() {
    // 检测兼容性
    if (
      global.navigator.userAgent.match(/msie/i) ||
      global.ActiveXObject ||
      ('ActiveXObject') in global
    ) {
      this.setState({
        isCompatible: false,
      });
    }
    const { getReport, match } = this.props;
    const { exerciseId, questionId } = match.params;
    let { mode } = match.params;
    // mode 为 question
    if (mode === 'question') { mode = 'base'; }
    const report = await createPromise(getReport,
      {
        exerciseId,
        questionId,
        mode,
      });
    this.setState({
      isLoad: true,
      report,
    });
  }

  // 渲染
  render() {
    const { isCompatible, isLoad, report } = this.state;
    const { match, getReport, getUploadSignature,
      postCorrectionImage, postCorrection, postMachinePigai } = this.props;
    const { mode } = match.params;
    const renderProps = {
      match,
      getReport,
      getUploadSignature,
      postCorrectionImage,
      postCorrection,
      report,
      postMachinePigai,
    };
    return (
      <View className={styles.container} >
        {
          !isCompatible &&
          <Error match={{ params: { type: 'compatible' } }} />
        }
        {
          !isLoad && isCompatible &&
          <Loading text="正在加载数据，请稍候..." />
        }
        {
          isLoad && isCompatible && (mode === 'practice' || mode === 'question') && JSON.stringify(renderProps.report) !== '{}' &&
          <BaseReport {...renderProps} />
        }
      </View>
    );
  }
}

