import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { history } from 'routers';
import { View, Image } from '@zhike/ti-ui';
import styles from './styles';


// 生成题目索引 组件
export default class RenderIndex extends Component {
// 参数
  static propTypes = {
    questions: PropTypes.array.isRequired,
    question: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      isShowArrows: false, // 是否显示左右箭头
      questionArray: [], // 将题目分组存放
      currentPage: 1, // 当前页面索引
      countPages: 1, // 所有页面数
    };
  }

  componentWillMount() {
    // 每次刷新， 需要重新保存一下当前页面
    const { questions } = this.props;
    let { questionId } = this.props.match.params;
    if (questions && !questionId) {
      questionId = questions[0].id;
    }
    const question = questions && questions.filter(item => item.id === parseInt(questionId, 10))[0];
    const currentPage = question && Math.ceil(question.rank / 12);
    const count = questions.length;
    const questionArray = [];
    // 当 题目数量超过14个时，两侧按钮显示，
    if (count > 14) {
      // 将题目进行分组，分多页显示
      const countPages = Math.ceil(count / 12);
      for (let i = 1; i <= countPages; ++i) {  // eslint-disable-line
        const item = questions.slice((i - 1) * 12, i * 12);
        questionArray.push(item);
      }
      this.setState({ questionArray, countPages, currentPage });
      const isShowArrows = true;
      this.setState({ isShowArrows });
      return false;
    }
    questionArray.push(questions);
    const isShowArrows = false;
    this.setState({ isShowArrows, questionArray });
  }

  // 生成题目索引 的函数
  renderIndex = page => {
    const { question, match } = this.props;
    const { questionArray } = this.state;
    const questionId = question.id;
    const { exerciseId, mode } = match.params;
    const search = global.location.search; // eslint-disable-line
    return questionArray && questionArray[page].map((item, index) => {
      const className = [styles.num];
      if (['Blank', 'ChooseMany', 'ChooseOne', 'SortPointSelect', 'PointSelect', 'Sort'].indexOf(item.type) !== -1) {
        const isCorrect =
          item.materials[0].userAnswer ? item.materials[0].userAnswer.correct : null;
        if (parseInt(questionId, 10) === item.id && !isCorrect) {
          className.push(styles.numRedActive);
        } else if (parseInt(questionId, 10) === item.id && isCorrect) {
          className.push(styles.numGreenActive);
        } else if (parseInt(questionId, 10) !== item.id && !isCorrect) {
          className.push(styles.numRed);
        } else if (parseInt(questionId, 10) !== item.id && isCorrect) {
          className.push(styles.numGreen);
        }
      } else if (item.type === 'FollowUp') {
        const score = get(question, 'materials.0.userAnswer.machinePigaiResults.sentence') || 0
        const color = score >= 90
          ? 'Green'
          : score >= 60
            ? 'Black'
            : 'Red'
        if (parseInt(questionId, 10) === item.id) {
          className.push(styles[`num${color}Active`]);
        } else {
          className.push(styles[`num${color}`]);
        }
      } else if (parseInt(questionId, 10) === item.id) {
      // 判断主观题 item.type === 'SubjectBlank'
        className.push(styles.numBlackActive);
      } else {
        className.push(styles.numBlack);
      }
      return (
        <View
          key={index}
          className={className}
          onClick={() => history.push(`/report/${mode}/${exerciseId}/${item.id}${search}`)}
        >
          {parseInt(questionId, 10) === item.id && <View className={styles.triangle} />}
          {item.rank}
        </View>);
    });
  }
  render() {
    const { isShowArrows, currentPage, countPages } = this.state;
    const { questions, match } = this.props;
    const { exerciseId, mode } = match.params;
    const search = global.location.search; // eslint-disable-line
    return (
      <View>
        <View className={styles.indexBox}>
          <View className={styles.left}>
            {
              isShowArrows &&
              <View
                className={[styles.num, currentPage === 1 ? styles.disabled : styles.button]}
                onClick={() => {
                  if (currentPage === 1) { return false; }
                  let currentPage1 = currentPage - 1; // eslint-disable-line
                  this.setState({ currentPage: currentPage1 });
                  // 当前页面的第一题
                  const index = (currentPage1 - 1) * 12;
                  const item = questions[index];
                  history.push(`/report/${mode}/${exerciseId}/${item.id}${search}`);
                }}
              >
                <Image src={require('./assets/arrows_left@2x.png')} className={styles.image} />
              </View>
            }
            {this.renderIndex(currentPage - 1)}
          </View>
          {
            isShowArrows &&
              <View
                className={[styles.num, styles.right, currentPage === countPages ? styles.disabled : styles.button]}
                onClick={() => {
                  if (currentPage === countPages) { return false; }
                  let currentPage2 = currentPage + 1; // eslint-disable-line
                  this.setState({ currentPage: currentPage2 });
                  // 当前页面的第一题
                  const index = (currentPage2 - 1) * 12;
                  const item = questions[index];
                  history.push(`/report/${mode}/${exerciseId}/${item.id}${search}`);
                }}
              >
                <Image src={require('./assets/arrows_right@2x.png')} className={styles.image} />
              </View>
          }
        </View>
      </View>
    );
  }
}
