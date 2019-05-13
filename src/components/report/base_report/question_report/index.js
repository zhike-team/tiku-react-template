import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { View, Image } from '@zhike/ti-ui';
import { handleAnswer } from 'utils';
import { css } from 'aphrodite';
import RenderIndex from 'components/report/common/render_index';
import ChooseManyQuestion from 'components/questions/blank/choose_many';
import ChooseOneQuestion from 'components/questions/blank/choose_one';
// import BlankQuestion from 'components/questions/blank';
import { cdnUrl } from 'common/config';
import { Article, Audio } from '@zhike/ti-component';
import imgAnswerAnalysis from './assets/answerAnalysis.png';
import styles from './styles';

// 阅读题目
export default class QuestionsReport extends Component {
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
      isReport: true,
    };
  }

  generateSelectAnswer(answer, isCorrect) {
    const html = [];
    let key = 0;
    for (let i = 0; i < answer.length; i += 1) {
      let correct;
      if (isCorrect) {
        correct = isCorrect[i] === true ? styles.color49cf51 : styles.colorfd5454;
      }
      html.push(<View key={key} className={[styles.answerText, correct]}>{answer[i]}</View>);
      key += 1
      if (i < (answer.length - 1)) {
        html.push(<View key={key} className={styles.answerText}> | </View>);
        key += 1
      }
    }
    return html;
  }

  // 渲染
  render() {
    const { question, questions, match } = this.props;
    const { isReport } = this.state;
    const { answer, userAnswer, isCorrect } = handleAnswer(question.materials, question.type);
    const correctAnswer = get(question, 'materials.0.answer');
    // 对填空题，存在多个正确答案的情况，| 两侧添加了空格
    const newCorrectAnswer = (question.type === 'Blank' || question.type === 'SubjectBlank') && correctAnswer.map(item => {
      if (item.indexOf('|') !== -1) {
        const arr = item.split('|');
        const newAnswer = arr.join(' | ');
        return newAnswer;
      }
      return item;
    });
    let correct;
    if (question.type !== 'Blank' && question.type !== 'SubjectBlank') { correct = isCorrect === true ? styles.color49cf51 : styles.colorfd5454; }
    const analysis = question && get(question, 'materials[0].analysis');
    // 生成组件信息
    let RenderComponent;
    switch (question.type) {
      case 'ChooseOne':
        RenderComponent = ChooseOneQuestion;
        break;
      case 'ChooseMany':
        RenderComponent = ChooseManyQuestion;
        break;
      // case 'Blank':
      // case 'SubjectBlank':
      //   RenderComponent = BlankQuestion;
      //   break;
      default:
        break;
    }
    const renderProps = {
      handleAnswer: () => {},
      question,
      isReport: true,
      params: match.params,
      correctAnswer: Array.isArray(newCorrectAnswer) ? newCorrectAnswer : [newCorrectAnswer],
    };
    return (
      <View className={styles.container}>
        <View className={styles.left}>
          <View className={styles.result}>
            <RenderIndex
              questions={questions}
              question={question}
              match={match}
            />
            {
              question && question.materials && question.materials[0] &&
              question.materials[0].audioReference && question.materials[0].audioReference.src &&
              <Audio src={question.materials[0].audioReference.src} cdnUrl={cdnUrl} />
            }
            <View className={styles.content}>
              {/* 左侧渲染对应题型  单选 多选 填空 */}
              {
                question && RenderComponent &&
                <RenderComponent
                  question={question}
                  {...renderProps}
                />
              }
              {
                question &&
                  <View className={styles.answerResult}>
                    <View className={styles.answerBox}>
                      <View className={styles.answer}>我的答案</View>
                      {
                        !Array.isArray(userAnswer) &&
                        <View className={[styles.answerDefault, correct]}>{userAnswer}</View>
                      }
                      {
                        Array.isArray(userAnswer) &&
                        (question.type === 'PointSelect' || question.type === 'SortPointSelect') &&
                        <View className={[styles.userAnswer, styles.block]}>
                            {this.generateSelectAnswer(userAnswer, isCorrect)}
                        </View>
                      }
                      {
                        Array.isArray(userAnswer) &&
                        userAnswer.length !== 0 &&
                        question.type !== 'PointSelect' &&
                        question.type !== 'SortPointSelect' &&
                          <View className={styles.userAnswer}>
                            {
                              userAnswer.map((item, index) => {
                                const correct = question.type !== 'SubjectBlank' ? (isCorrect[index]
                                  === true ? styles.color49cf51 : styles.colorfd5454) : styles.color000;
                                  return (
                                    <pre
                                      className={css([styles.answerDefault, correct])}
                                      key={index}
                                      style={{ wordBreak: 'break-word' }}
                                      dangerouslySetInnerHTML={{ __html: item }}
                                    />);
                              },
                            )}
                          </View>
                      }
                      {
                        (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) &&
                        <View className={[styles.answerDefault, question.type !== 'SubjectBlank' ? styles.colorfd5454 : styles.color000]}> - </View>
                      }
                    </View>
                    <View className={styles.answerBox}>
                      <View className={styles.answer}>正确答案</View>
                      <View className={[styles.correctAnswer, (question.type === 'PointSelect' || question.type === 'SortPointSelect') && styles.block]} >
                        {
                          (question.type === 'PointSelect' || question.type === 'SortPointSelect') && answer &&
                          this.generateSelectAnswer(answer)
                        }
                        {
                          (question.type === 'Blank' || question.type === 'SubjectBlank') && newCorrectAnswer &&
                          newCorrectAnswer.map((item, index) => (
                            <pre
                              key={index}
                              className={css(styles.correctAnswerText)}
                            >
                              {item}
                            </pre>
                          ),
                        )}
                        {
                          (['Blank', 'SubjectBlank', 'PointSelect', 'SortPointSelect'].indexOf(question.type) === -1) && answer &&
                            <View className={styles.correctAnswerText}>
                              {answer}
                            </View>
                        }
                      </View>
                    </View>
                  </View>
                }
            </View>
          </View>
        </View>
        <View className={styles.rigth}>
          {/* 报道页右侧 答案解析 */}
          <View className={styles.analysis}>
            <View className={styles.title1}>
              <View className={styles.icon} />
              <View className={styles.answerAnalysis}>答案解析</View>
            </View>
            <View className={styles.textRigth}>
              {
                analysis &&
                  <Article
                    material={analysis}
                    isReport={isReport}
                  />
              }
              {
                (!analysis ||
                !analysis.paragraphs ||
                (Array.isArray(analysis.paragraphs) && analysis.paragraphs.length === 0)) &&
                  <View className={[styles.text1, styles.textContent]}>
                    <Image src={imgAnswerAnalysis} className={styles.image} />
                    <View>暂无答案解析哦~</View>
                  </View>
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
}
