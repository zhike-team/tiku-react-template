import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep, get } from 'lodash';
import { history } from 'routers';
import { View } from '@zhike/ti-ui';
import { createPromise } from 'utils/action';
import HeaderContainer from 'containers/header';
import Header from 'components/header';
import Review from 'components/review';
import End from 'components/end';
import { data } from '../initial/data';
import styles from './styles';


// 做题
export default class Exercise extends Component {
  // 参数
  static propTypes = {
    practice: PropTypes.object.isRequired,
    stepList: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    setRecord: PropTypes.func.isRequired,
    getUploadSignature: PropTypes.func.isRequired,
    postMachinePigai: PropTypes.func.isRequired,
    postAnswer: PropTypes.func.isRequired,
  };

  // 即将加载
  componentWillMount() {
    const { practice, stepList, match } = this.props;
    const { mode, practiceId } = match.params;
    // TODO 需要复原完整的访问路径
    if (
      get(practice, 'status') !== 'SUCCESS' ||
      get(stepList, 'status') !== 'SUCCESS'
    ) {
      global.location.href = `/init/${mode}/${practiceId}`;
    }
  }

  // 加载
  componentDidMount() {
    this.updateVisitedMark();
  }

  // 更新
  componentWillUpdate() {
    this.updateVisitedMark();
  }


  // 获取答案
  getAnswer(step, value) {
    const { record } = this.props;
    const answers = [];
    const { id, type, subjectId, materials } = step.question;
    const { marked } = record.step[step.id];
    /**
     * 这里对填空题的单选题
     * 做一个特殊处理
     */
    materials.map((material, index) => {
      const answer = {
        questionId: id,
        answerType: type,
      };
      if (marked) {
        answer.isMarked = '1';
      } else {
        answer.isMarked = '2';
      }
      const questionMaterialId = material.id || null;
      answer.userAnswers = [{
        questionMaterialId,
        userAnswer: subjectId === 19 && type === 'ChooseOne' ? [value[index]] : value,
      }];
      answers.push(answer);
      return false;
    })
    return answers;
  }

  // 设置做题记录
  async setRecord(keys, value) {
    const { setRecord } = this.props;
    const { mode, exerciseId } = this.props.match.params;

    await setRecord({
      mode,
      id: exerciseId,
      keys,
      value,
    });
  }

  // 设置当前步骤的做题记录
  async setStepRecord(step, key, value) {
    try {
      await this.setRecord(['step', step.id, key], value);
      if (key === 'answer' || key === 'marked') {
        const { postAnswer } = this.props;
        const { exerciseId } = this.props.match.params;
        const data = {
          exerciseId: parseInt(exerciseId, 10),
          practiceId: step.practice.id,
          duration: parseInt(Header.getTime() / 1000, 10),
          subjectId: step.practice.subjectId,
          answers: this.getAnswer(step, value),
          time: new Date().getTime(),
        };
        const answer = await createPromise(postAnswer, data);
        return answer;
      }
    } catch (e) {
      console.log(e);
      setTimeout(() => {
        history.push(`/error/save/${encodeURIComponent(global.location.href)}`);
      }, 100);
    }
  }

  // 更新访问标记
  updateVisitedMark() {
    const { record } = this.props;
    const { stepId } = this.props.match.params;
    const stepRecord = record.step && record.step[stepId] ? record.step[stepId] : {};

    if (!stepRecord.isVisited) {
      this.setRecord(['step', stepId, 'isVisited'], true);
    }

    // 滚动到顶部
    if (this.pathName !== global.location.pathname) {
      if (this.anchor) {
        setTimeout(() => {
          this.anchor && this.anchor.scrollIntoView({
            behavior: 'smooth',
          });
        }, 50);
        this.pathName = global.location.pathname;
      }
    }
  }

  // 渲染
  render() {
    const { stepList, record, getUploadSignature, postMachinePigai } = this.props;
    const practice = data;
    const { stepId, operation } = this.props.match.params;
    const step = cloneDeep(stepList.data[stepId - 1]);
    const { questions } = practice.data.questionBackup;
    step.practice = practice.data.questionBackup;
    step.question = questions[step.id - 1];
    // 生成参数信息
    const renderProps = {
      params: this.props.match.params,
      stepList: stepList.data,
      step,
      record,
      stepRecord: record.step && record.step[step.id] ? record.step[step.id] : {},
      setRecord: async (keys, value) => { await this.setRecord(keys, value); },
      setStepRecord: async (key, value) => await this.setStepRecord(step, key, value), // eslint-disable-line
      getUploadSignature,
      postMachinePigai,
      question: step.question,
    };
    // 生成组件信息
    let RenderComponent;
    switch (step.questionType) {
      case 'End':
        RenderComponent = End;
        break;
      default:
        break;
    }
    // 渲染
    return (
      <View className={styles.container}>
        <HeaderContainer {...renderProps} />
        <View className={styles.children}>
          <div ref={anchor => { this.anchor = anchor; }} />
          {
            !operation && RenderComponent &&
            <RenderComponent {...renderProps} />
          }
          {
            operation === 'Review' &&
            <Review {...renderProps} operation="Review" />
          }
        </View>
      </View>
    );
  }
}
