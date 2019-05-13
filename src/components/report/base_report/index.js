import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatReportDuration } from 'utils';
import { View } from '@zhike/ti-ui';
import { get } from 'lodash';
import Header from 'components/report/common/header';
import QuestionsReport from 'components/report/base_report/question_report';
import styles from './styles';

// 报告
export default class BaseReport extends Component {
  // 参数
  static propTypes = {
    getReport: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    getUploadSignature: PropTypes.func.isRequired,
    postCorrectionImage: PropTypes.func.isRequired,
    postCorrection: PropTypes.func.isRequired,
    report: PropTypes.object.isRequired,
  };

  // 渲染
  render() {
    const { getUploadSignature, postCorrectionImage,
      postCorrection, match, report } = this.props;
    let { questionId } = match.params;
    const questions = report && get(report, 'data.questions');
    const practice = report && get(report, 'data');
    const title = report && get(report, 'data.name');
    const unavailableButtons = [];
    if (questions && !questionId) {
      questionId = questions[0].id;
    }
    const duration = report.data && formatReportDuration(report.data.duration);
    const question = questions && questions.filter(item => item.id === parseInt(questionId, 10))[0];
    const step = { question };
    // 生成组件信息
    let RenderComponent;
    switch (question && question.type) {
      case 'ChooseOne':
      case 'ChooseMany':
      case 'Blank':
      case 'SubjectBlank':
      case 'PointSelect':
        RenderComponent = QuestionsReport;
        break;
      default:
        break;
    }
    const renderProps = {
      match,
      report,
      step,
      practice,
      questions,
      question,
      getUploadSignature,
      postCorrectionImage,
      postCorrection,
      name: practice && practice.name,
      title,
      subjectId: 3,
      showButtons: ['correct'],
      unavailableButtons,
      duration,
    };
    return (
      <View className={styles.container} >
        {
          <Header {...renderProps} />
        }
        {
          question && RenderComponent && practice && practice.questions[0] &&
          <RenderComponent {...renderProps} />
        }
      </View>
    );
  }
}

