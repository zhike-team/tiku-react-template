import { get, pick, remove } from 'lodash';

// 获取练习的做题步骤
export const getStepListForPractice = practice => {
  console.log('practice:', practice);
  const { questionBackup } = practice;
  const { questions } = questionBackup;
  const stepList = [];
  questions.forEach((question, index) => {
    stepList.push({
      type: 'Gre',
      questionType: question.type,
      questionId: question.id,
      id: index + 1,
      questionIndex: index + 1,
      questionCount: questions.length,
    });
  });

  stepList.push({
    type: 'Gre',
    id: questions.length + 1,
    questionType: 'End',
  });

  return stepList;
};


// 获取服务端的answer
export const getServerAnswer = (questions, exerciseId) => {
  const answers = questions.map(question => {
    const answer = {
      questionType: question.type,
      exerciseId,
      questionId: question.id,
      userAnswers: [],
    };
    question.materials && question.materials.map(material => {
      if (get(material, 'userAnswer.answer') && JSON.stringify(get(material, 'userAnswer.answer')) !== '[]') {
        const userAnswer = pick(material.userAnswer,
          ['correct', 'answerId', 'questionMaterialId', 'answer']);
        answer.userAnswers.push(userAnswer);
      }
      return false;
    });
    if (JSON.stringify(answer.userAnswers) === '[]') return false;
    return answer;
  });
  remove(answers, answer => answer === false)

  return answers;
}

