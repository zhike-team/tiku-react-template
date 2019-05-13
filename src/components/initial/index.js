import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history } from 'routers';
import { get, filter } from 'lodash';
import { getStepListForPractice, getServerAnswer } from 'utils/step';
import { View, Image } from '@zhike/ti-ui';
import { createPromise } from 'utils/action';
import styles from './styles';

// 初始化
export default class Initial extends Component {
  // 参数
  static propTypes = {
    record: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    stepList: PropTypes.object.isRequired,
    getPractice: PropTypes.func.isRequired,
    setStepList: PropTypes.func.isRequired,
    setRecord: PropTypes.func.isRequired,
    setTimer: PropTypes.func.isRequired,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      progressType: 'init',
      progressStep: 0,
      progressStepCount: 0,
    };
  }

  // 模块加载
  async componentDidMount() {
    const {
      getPractice,
      setStepList,
      setRecord,
    } = this.props;
    const { mode, operation } = this.props.match.params;
    let exerciseId = this.props.match.params.exerciseId; // eslint-disable-line
    let timeCost = 0;
    // 检测兼容性
    if (
      global.navigator.userAgent.match(/msie/i) ||
      global.ActiveXObject ||
      ('ActiveXObject') in global
    ) {
      history.push('/error/compatible');
      return;
    }

    // 获取做题关键信息
    try {
      // 获取套题
      let stepList;
      let practice;
      if (mode === 'practice' || mode === 'question') {
        this.setState({
          progressType: 'getPractice',
        });
        practice = await createPromise(getPractice, { mode, exerciseId });
        stepList = getStepListForPractice(practice.data);
      }
      timeCost = get(practice, 'data.duration');
      // 获取答案
      // TODO 需要接入新的接口，而不是循环获取数据
      if (operation !== 'new') {
        this.setState({
          progressType: 'getAnswer',
          progressStepCount: stepList.length - 1,
        });
        // 获取服务器端答案
        const answers = getServerAnswer(get(practice, 'data.questionBackup.questions'), exerciseId);
        for (let i = 0; i < answers.length; i += 1) {
          const step = filter(stepList, { questionId: answers[i].questionId })[0];
          let realAnswer;
          switch (step.questionType) {
            case 'Writing':
              realAnswer = get(answers[i].userAnswers, '0.answer.text', '');
              break;
            default:
              realAnswer = (get(answers[i].userAnswers, '0.answer', []) || []).map(
                item => (item === null ? undefined : item),
              );
              break;
          }
          await setRecord({
            mode,
            id: exerciseId,
            keys: ['step', step.id, 'answer'],
            value: realAnswer,
          });

          this.setState({
            progressStep: this.state.progressStep + 1,
          });
        }
      }

      // 设置做题步骤
      this.setState({
        progressType: 'setStepList',
      });

      await setStepList(stepList);
    } catch (e) {
      console.log(e);
      history.push('/error/loading');
      return true;
    }

    await this.handleStepAnswer(timeCost);
  }

  handleStepAnswer = async timeCost => {
    const { record, stepList, setTimer } = this.props;
    const stepListData = stepList.data;
    const { mode, practiceId } = this.props.match.params;
    let exerciseId = this.props.match.params.exerciseId; // eslint-disable-line
    const search = global.location.search; // eslint-disable-line
    let lastStepId = 1;
    // 获取上次做题进度
    if (record && record.step) {
      Object.keys(record.step).forEach(key => {
        if (record.step[key].isVisited && parseInt(key, 10) !== stepListData.length) {
          lastStepId = Math.max(lastStepId, key);
        } else {
          lastStepId = key;
        }
      });
      const step = stepListData[lastStepId - 1];
      const lastRecord = record.step[lastStepId];
      if (step.questionIndex !== 1 || lastRecord.answer) {
        await setTimer({
          mode,
          id: exerciseId,
          value: {
            subject: 'Gre',
            sectionId: step.sectionId,
            isCountDown: false,
            time: timeCost * 1000,
            isEnd: false,
          },
        });
      }
    }
    // 跳转
    history.push(`/${mode}/${practiceId}/${exerciseId}/${lastStepId}${search}`);
  }

  // 渲染
  render() {
    const { progressType, progressStep, progressStepCount } = this.state;
    let progressText = '';
    switch (progressType) {
      case 'init':
        progressText = '初始化';
        break;
      case 'getPractice':
      case 'getAnswer':
        progressText = '获取题目';
        break;
      case 'setStepList':
        progressText = '生成做题步骤';
        break;
      default:
        break;
    }

    return (
      <View className={styles.container}>
        <Image
          className={styles.loading}
          src={require('components/assets/loading.gif')}
        />

        <View className={styles.text}>正在{progressText}，请稍候...</View>

        {
          !!progressStepCount &&
          <View className={styles.progressWrapper}>
            <View
              className={styles.progress}
              style={{ width: `${progressStepCount !== 0 ? progressStep / progressStepCount * 100 : 0}%` }}
            />
          </View>
        }
      </View>
    );
  }
}
