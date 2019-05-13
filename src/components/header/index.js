import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history } from 'routers';
import { formatDuration } from 'utils';
import { createPromise } from 'utils/action';
import { View, Image, Button } from '@zhike/ti-ui';
import { Modal, AudioPlayer, Recorder } from '@zhike/ti-component';
import { get } from 'lodash';
import styles from './styles';


// 初始状态
const initialOptions = {
  exerciseId: undefined,
  stepId: undefined,
  title: '',
  showButtons: [], // 'correct', 'volume', 'back', 'next'
  unavailableButtons: [], // 'correct', 'volume', 'back', 'next', 'testNext', 'testStop'
  isShowTime: true,
  onClickNext: undefined,
  onClickContinue: undefined,
  onClickBack: undefined,
  onClickGoToQuestion: undefined,
  onClickReturn: undefined,
};
// 页面头部
export default class Header extends Component {
  static instance;

  // 设置头部
  static config(options = {}) {
    if (this.instance) {
      this.instance.setState({
        options: Object.assign(
          {},
          initialOptions,
          options.inherit ? this.instance.state.options : {},
          options,
        ),
      });

      const { step } = this.instance.props;
      global.document.title = `${step.practice.name}${options.title ? ' ' : ''}${options.title || ''} - 智课`;
    } else {
      setTimeout(() => {
        this.config(options);
      }, 100);
    }
  }

  // 上一步
  static back() {
    this.instance.back();
  }

  // 下一步
  static next() {
    this.instance.next();
  }

  // 我要纠错
  static handleCorrect() {
    this.instance.handleCorrect();
  }

  // 上传失败
  static uploadFailed() {
    this.instance.handleTimeExpried();
  }

  // 设置倒计时
  static setTimer(options) {
    this.instance.setTimer(options);
  }

  // 清空倒计时
  static cleanTimer() {
    if (this.instance) {
      this.instance.cleanTimer();
    }
  }

  // 开启计时
  static startTimer() {
    this.instance.setState({
      isPauseTimer: false,
    });
  }

  // 暂停计时
  static pauseTimer() {
    this.instance.setState({
      isPauseTimer: true,
    });
  }

  // 开启计时（弹窗）
  static startTimerForModal() {
    this.instance && this.instance.setState({
      isPauseTimerForModal: false,
    });
  }

  // 暂停计时（弹窗）
  static pauseTimerForModal() {
    this.instance && this.instance.setState({
      isPauseTimerForModal: true,
    });
  }

  // 获取计时
  static getTime() {
    return get(this.instance, 'props.timer') ? (get(this.instance, 'props.timer.time') || 0) : 0;
  }

  // 参数
  static propTypes = {
    params: PropTypes.object.isRequired,
    step: PropTypes.object.isRequired,
    stepList: PropTypes.array.isRequired,
    timer: PropTypes.object.isRequired,
    setTimer: PropTypes.func.isRequired,
    getUploadSignature: PropTypes.func.isRequired,
    postCorrectionImage: PropTypes.func.isRequired,
    postCorrection: PropTypes.func.isRequired,
    postDuration: PropTypes.func.isRequired,
    setStepRecord: PropTypes.func.isRequired,
    stepRecord: PropTypes.object.isRequired,
  };
  // 构造函数
  constructor(props) {
    super(props);
    this.state = Object.assign({
      options: initialOptions,
      isPauseTimer: false,
      isPauseTimerForModal: false,
    });
    this.saveDurationTime = 0;
    this.setIntervalTime = null;
  }

  // 模块加载
  componentDidMount() {
    const { step } = this.props;
    setTimeout(() => {
      this.resetTimer(this.props);
    }, 100);
    this.setIntervalTime = setInterval(() => this.countTime(), 1000);
    if (step.questionType === 'End') return false;
  }

  // 模块销毁
  componentWillUnmount() {
    if (this.setIntervalTime) {
      clearInterval(this.setIntervalTime);
    }
  }

  // 设置计时器
  setTimer(value) {
    const { timer, setTimer } = this.props;
    const { mode, exerciseId } = this.props.params;
    setTimer({
      mode,
      id: exerciseId,
      value: Object.assign({}, timer, value),
    });
  }

  // 清空计时器
  cleanTimer() {
    const { setTimer } = this.props;
    const { mode, exerciseId } = this.props.params;

    setTimer({
      mode,
      id: exerciseId,
      value: {},
    });
  }

  // 重设计时器
  resetTimer(nextProps) {
    const { timer, step } = nextProps;
    // 监测是否开始阅读倒计时
    if (
      timer.subject !== 'Gre' &&
      step.type === 'Gre'
    ) {
      this.setTimer({
        subject: 'Gre',
        time: 0,
        isEnd: false,
      });
    }
  }

  // 暂停计时
  pauseTimer() {
    this.setState({
      isPauseTimer: true,
    });
  }

  // 开启计时
  startTimer() {
    this.setState({
      isPauseTimer: false,
    });
  }

  // 保存时间
  saveDuration() {
    if (this.saveDurationTime === 5) {
      const { postDuration, timer } = this.props;
      const { exerciseId } = this.props.params;
      const time = timer && timer.time || 0;
      createPromise(postDuration, { exerciseId, duration: parseInt(time / 1000, 10) });
      this.saveDurationTime = 0;
    }
    this.saveDurationTime += 1;
  }
  // 正向计时
  countTime() {
    const { isPauseTimer, isPauseTimerForModal } = this.state;
    const { timer } = this.props;
    if (isPauseTimer || isPauseTimerForModal) return false;
    let cntTime;
    if (timer.isCountDown) {
      cntTime = Math.max(0, timer.time - 1000);
    } else {
      cntTime = timer.time + 1000;
    }
    const cntIsEnd = cntTime === 0;
    this.setTimer({
      time: cntTime,
      isEnd: cntIsEnd,
    });
  }

  // 上一步
  back() {
    const { step } = this.props;
    const { mode, exerciseId, practiceId } = this.props.params;
    const search = global.location.search; // eslint-disable-line
    history.push(`/${mode}/${practiceId}/${exerciseId}/${step.id - 1}${search}`);
  }

  // 下一步
  next() {
    const { step, params } = this.props;
    const { mode, exerciseId, practiceId } = params;
    const search = global.location.search; // eslint-disable-line
    history.push(`/${mode}/${practiceId}/${exerciseId}/${step.id + 1}${search}`);
  }

  // 隐藏显示时间
  toggleTimer() {
    const { timer } = this.props;
    this.setTimer({
      isHide: !timer.isHide,
    });
  }

  // 点击下一题
  async nextStep(onClickNext) {
    if (onClickNext) {
      await onClickNext();
    } else {
      this.next();
    }
  }

  // 我要纠错
  handleCorrect = () => {
    const { getUploadSignature, postCorrectionImage, postCorrection, step } = this.props;
    const { pathname } = global.location;
    const isFollowUpOrListen = pathname.includes('repeat') || pathname.includes('listen');

    Modal.show('ModalCorrect', {
      title: '我要纠错',
      width: 700,
      getUploadSignature,
      postCorrectionImage,
      postCorrection,
      step,
      option: {
        version: '1.0.0',
        source: 'ti-gre',
      },
      type: isFollowUpOrListen ? 'followUpOrListen' : 'normal',
    }, this.onShow, this.onHide)
  }

  onShow = () => {
    AudioPlayer.pause();
    this.setState({
      isPauseTimerForModal: true,
    });
  }

  onHide = () => {
    this.setState({
      isPauseTimerForModal: false,
    });
    AudioPlayer.resume();
  }

  // 渲染
  render() {
    const { timer, step, setStepRecord, stepRecord, params } = this.props;
    const { mode, exerciseId, practiceId, operation } = params;
    const {
      showButtons, isShowTime, unavailableButtons, onClickBack, onClickNext, currentIndex,
    } = this.state.options;
    const { questionIndex, questionCount } = step;
    const search = global.location.search; // eslint-disable-line
    return (
      <View className={styles.container}>
        <View className={styles.title}>
          <Image
            className={styles.titleLogo}
            src={require('../assets/logo.png')}
          />
          <View className={styles.titleSplit} />
          <View className={styles.titleText}>
            {`${step.practice.name}`}
          </View>
        </View>
        <View className={styles.question}>
          {
            questionIndex && questionCount &&
            <View>Question {questionIndex} of {questionCount}</View>
          }
        </View>
        <View>
          <View className={styles.normalButtons}>
            {
              showButtons.indexOf('mark') !== -1 &&
              <Button
                className={styles.button}
                leftIcon={!stepRecord.marked ? require('./assets/mark.png') : require('./assets/mark_down.png')}
                isAvailable={unavailableButtons.indexOf('mark') === -1}
                text="Mark"
                onClick={async () => {
                  await setStepRecord('marked', !stepRecord.marked)
                }}
              />
            }
            {
              showButtons.indexOf('return') !== -1 &&
              <Button
                className={styles.button}
                isAvailable={unavailableButtons.indexOf('return') === -1}
                text="Return"
                onClick={() => {
                  history.push(`/${mode}/${practiceId}/${exerciseId}/${step.id}${search}`);
                }}
              />
            }
            {
              showButtons.indexOf('review') !== -1 &&
              <Button
                className={[styles.button, operation === 'Review' && styles.buttonReview]}
                isAvailable={unavailableButtons.indexOf('review') === -1}
                text={operation === 'Review' ? 'Go To Question' : 'Review'}
                onClick={() => {
                  if (operation === 'Review') {
                    history.push(`/${mode}/${practiceId}/${exerciseId}/${currentIndex}${search}`);
                  } else {
                    history.push(`/${mode}/${practiceId}/${exerciseId}/${step.id}/Review${search}`);
                  }
                }}
              />
            }
            {
              showButtons.indexOf('back') !== -1 &&
              <Button
                className={styles.button}
                leftIcon={require('./assets/back.png')}
                isAvailable={unavailableButtons.indexOf('back') === -1}
                text="上一题"
                onClick={async () => {
                  if (onClickBack) {
                    await onClickBack();
                  } else {
                    this.back();
                  }
                }}
              />
            }
            {
              showButtons.indexOf('next') !== -1 &&
              <Button
                className={styles.button}
                isAvailable={unavailableButtons.indexOf('next') === -1}
                text={step.questionIndex !== step.questionCount ? 'Next' : 'Submit'}
                onClick={() => this.nextStep(onClickNext)}
              />
            }
          </View>
          {
            isShowTime &&
            <View className={styles.timeButtons}>
              {
                !timer.isHide &&
                <View className={styles.buttonTime}>
                  {formatDuration(timer.time || 0, true)}
                </View>
              }
              <Button
                className={styles.button}
                theme="darken"
                text={!timer.isHide ? 'Hide Time' : 'Show Time'}
                onClick={() => this.toggleTimer()}
              />
              {
                showButtons.indexOf('correct') !== -1 &&
                <Button
                  className={styles.button}
                  theme="darken"
                  leftIcon={require('./assets/correct.png')}
                  isAvailable={unavailableButtons.indexOf('correct') === -1}
                  text="我要纠错"
                  onClick={() => this.handleCorrect()}
                />
              }
            </View>
          }
        </View>

        <Modal ref={modal => { Modal.instance = modal; }} />
        <AudioPlayer ref={audioPlayer => { AudioPlayer.instance = audioPlayer; }} />
        <Recorder ref={recorder => { Recorder.instance = recorder; }} />
      </View>
    );
  }
}
