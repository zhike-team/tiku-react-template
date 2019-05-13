import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from '@zhike/ti-ui';
import { get } from 'lodash';
import Header from 'components/header';
import { css } from 'aphrodite';
import styles from './styles';

const search = global.location.search; // eslint-disable-line

// 结束
export default class Review extends Component {
  // 参数
  static propTypes = {
    params: PropTypes.object.isRequired,
    stepList: PropTypes.array.isRequired,
    record: PropTypes.object.isRequired,
  };
  // 构造函数
  constructor(props) {
    super(props);
    this.state = Object.assign({
      currentIndex: 0,
    });
    this.saveDurationTime = 0;
    this.setIntervalTime = null;
  }

  // 模块即将加载
  async componentWillMount() {
    Header.config({
      showButtons: ['review', 'return'],
      unavailableButtons: ['review'],
      isShowTime: true,
      inherit: true,
    });
  }
  currentQuestion(index) {
    if (index === this.state.currentIndex) return false;
    this.setState({ currentIndex: index });
    if (index) {
      Header.config({
        showButtons: ['review', 'return'],
        currentIndex: index,
        unavailableButtons: [],
        isShowTime: true,
        inherit: true,
      });
    }
  }

  // 渲染
  render() {
    const { record, stepList: stepList1 } = this.props;
    const { currentIndex } = this.state;
    const stepList = stepList1.slice(0, stepList1.length - 1);
    return (
      <View className={styles.container}>
        <View className={styles.text}>
          Following is the list of questions in this section.
          The question you were on last is highlighted when you enter Review.
          The Status column shows if a question is Answered, Not Answered, Incomplete, or Not Encountered.
          A question shows as Incomplete if it requires you to select a specified number of answer choices and you have selected more or fewer than that number.
          Questions you have marked are indicated with a.
          <Image src={require('../assets/right.png')} className={styles.image} />
        </View>
        <View className={styles.text}>
          To review a specific question from the list, select the question to highlight it, then select
          <span className={css(styles.buttonTip)}> Go to Question </span>
          at the top of the screen.
        </View>
        <View className={styles.text} >
          To leave <span className={css(styles.buttonTip)}> Review </span> and return to where you were in the test, select <span className={css(styles.buttonTip)}> Return </span>
        </View>
        <View className={styles.review} >
          <View className={styles.tableContanier} >
            <table className={css(styles.table)} border="1">
              <thead>
                <tr>
                  <th className={css(styles.th)} >Number</th>
                  <th className={css(styles.th)} >States</th>
                  <th className={css(styles.th)} >Marked</th>
                </tr>
              </thead>
              <tbody>
                {
                  stepList && stepList.length >= 1 &&
                  stepList.slice(0, Math.ceil(stepList.length / 2)) &&
                  stepList.slice(0, Math.ceil(stepList.length / 2)).map(step => (
                    <tr
                      key={step.questionIndex}
                      className={get(record, `step.${step.questionIndex}.answer`) ? css(styles.answer) : css(styles.noAnswer)}
                      onClick={() => this.currentQuestion(step.questionIndex)}
                      style={currentIndex === step.questionIndex ? { backgroundColor: 'rgba(51,153,255,0.1)' } : {}}
                    >
                      <td className={css(styles.th)} >{step.questionIndex}</td>
                      <td className={css(styles.th)} >{get(record, `step.${step.questionIndex}.answer`) ? 'Answered' : 'Not Answered'}</td>
                      <td
                        className={css(styles.th)}
                      >
                        { get(record, `step.${step.questionIndex}.marked`) && <Image src={require('../assets/right.png')} className={styles.image} /> }
                      </td>
                    </tr>
                    ))
                }
              </tbody>
            </table>
          </View>
          {
            stepList && stepList.length >= 1 &&
            stepList.slice(Math.ceil(stepList.length / 2)) &&
            stepList.slice(Math.ceil(stepList.length / 2)).length >= 1 &&
            <View className={styles.tableContanier} >
              <table className={css(styles.table)} border="1">
                <thead>
                  <tr>
                    <th className={css(styles.th)} >Number</th>
                    <th className={css(styles.th)} >States</th>
                    <th className={css(styles.th)} >Marked</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    stepList.slice(Math.ceil(stepList.length / 2)).map(step => (
                      <tr
                        key={step.questionIndex}
                        className={get(record, `step.${step.questionIndex}.answer`) ? css(styles.answer) : css(styles.noAnswer)}
                        onClick={() => this.currentQuestion(step.questionIndex)}
                        style={currentIndex === step.questionIndex ? { backgroundColor: 'rgba(51,153,255,0.1)' } : {}}
                      >
                        <td className={css(styles.th)} >{step.questionIndex}</td>
                        <td className={css(styles.th)} >{get(record, `step.${step.questionIndex}.answer`) ? 'Answered' : 'Not Answered'}</td>
                        <td
                          className={css(styles.th)}
                        >
                          { get(record, `step.${step.questionIndex}.marked`) && <Image src={require('../assets/right.png')} className={styles.image} /> }
                        </td>
                      </tr>
                        ))
                  }
                </tbody>
              </table>
            </View>
          }
        </View>
      </View>
    );
  }
}
