
// 获取页面宽度/高度
export const getBodyWidth = () => global.document.body.offsetWidth;
export const getBodyHeight = () => global.document.body.offsetHeight;

// 生成随机字符串
export const getRandomString = (length = 32, seed = '') => {
  const dict = seed || 'abcdefghikmnpqrstwxyzABCDEFGHKLMNPQRSTUVWXYZ123456789';
  let res = '';
  for (let i = 0; i < length; i += 1) {
    res += dict[parseInt(Math.random() * dict.length, 10)];
  }

  return res;
};

// 格式化时间段
export const formatDuration = (milliseconds, hasHours = false) => {
  if (hasHours) {
    const hours = parseInt(milliseconds / 3600 / 1000, 10);
    const minutes = parseInt(milliseconds / 60 / 1000 - hours * 60, 10);
    const seconds = parseInt(milliseconds / 1000 - hours * 3600 - minutes * 60, 10);

    return `${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
  }

  const minutes = parseInt(milliseconds / 60 / 1000, 10);
  const seconds = parseInt(milliseconds / 1000 - minutes * 60, 10);

  return `${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
};

// 计算单词个数
export const countWords = (text = '') => {
  let count = 0;
  const words = text.trim().split(/\s/);
  words.forEach(word => {
    if (word.trim()) {
      count += 1;
    }
  });

  return count;
};

// 获取光标位置
/* eslint-disable */
export const getCursorPosition = (textarea) => {
  var rangeData = {text: "", start: 0, end: 0 };
      textarea.focus();
  if (textarea.setSelectionRange) { // W3C
      rangeData.start= textarea.selectionStart;
      rangeData.end = textarea.selectionEnd;
      rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): "";
  } else if (document.selection) { // IE
      var i,
          oS = document.selection.createRange(),
          oR = document.body.createTextRange();
      oR.moveToElementText(textarea);
    
      rangeData.text = oS.text;
      rangeData.bookmark = oS.getBookmark();
      
      for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i ++) {
          if (textarea.value.charAt(i) == '\n') {
              i ++;
          }
      }
      rangeData.start = i;
      rangeData.end = rangeData.text.length + rangeData.start;
  }
      
  return rangeData;
};
/* eslint-enable */

// 是否为undefined或者null
export const isUndefinedOrNull = value => {
  if (value === undefined || value === null) {
    return true;
  }

  return false;
};

// 把答案数字转成字母
  // 数字0，1 转成 ABCD
const handleNumToWord = answer => {
  const list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let newAnswer = '';
  if (answer === null) {
    return '';
  }
  answer.forEach(item => {
    if (item === null || item === undefined) return false;
    newAnswer += list[item];
  });
  return newAnswer;
};

// 处理答案
export const handleAnswer = (materials, type) => {
  let answer = '';
  let userAnswer = '';
  let isCorrect;
  if (type === 'Blank' || type === 'SubjectBlank') {
    isCorrect = [];
    const correctAnswer = materials[0] && materials[0].answer;
    let userAnswer = materials[0] && materials[0].userAnswer && materials[0].userAnswer.answer; // eslint-disable-line
    userAnswer && userAnswer.forEach((item, index) => {
      const pattern = new RegExp('^(' + correctAnswer[index] + ')$'); // eslint-disable-line
      const correct = pattern.test(userAnswer[index]);
      isCorrect.push(correct);
    });
    const answer = correctAnswer && correctAnswer.join(',');
    return { answer, userAnswer, isCorrect };
  }
  if (type === 'PointSelect' || type === 'SortPointSelect') {
    isCorrect = [];
    let newUserAnswer = [];
    const newAnswer = [];
    const errorUserAnswer = [];
    const correctAnswer = materials[0] && materials[0].answer;
    const choices = materials[0] && materials[0].choices;
    let userAnswer = materials[0] && materials[0].userAnswer && materials[0].userAnswer.answer; // eslint-disable-line
    userAnswer && userAnswer.forEach((item, index) => {
      if (type === 'SortPointSelect') {
        newUserAnswer.push(item === null ? '-' : (choices[item] && choices[item].text || '-'));
        newAnswer.push(choices[correctAnswer[index]].text);
        isCorrect.push(correctAnswer[index] === item);
      }
      if (type === 'PointSelect') {
        if (correctAnswer.indexOf(item) !== -1) {
          newUserAnswer.push(choices[item].text);
          newAnswer.push(choices[item].text);
          isCorrect.push(true);
        } else {
          errorUserAnswer.push(item === null ? '-' : (choices[item] && choices[item].text || '-'));
        }
      }
    });
    if (type === 'PointSelect') {
      for (let i = 0; i < correctAnswer.length; i += 1) {
        if (userAnswer.indexOf(correctAnswer[i]) === -1) {
          newAnswer.push(choices[correctAnswer[i]].text);
          isCorrect.push(false);
        }
      }
      newUserAnswer = newUserAnswer.concat(errorUserAnswer);
    }
    return { answer: newAnswer, userAnswer: newUserAnswer.length === 0 ? ['-'] : newUserAnswer, isCorrect: isCorrect.length === 0 ? [false] : isCorrect }
  }
  materials.forEach(item => {
    if (answer) answer += ' | ';
    answer += handleNumToWord(item.answer);
    if (item.userAnswer) {
      if (userAnswer && userAnswer !== '-') userAnswer += ' | ';
      userAnswer += handleNumToWord(item.userAnswer.answer);
      if (!userAnswer) userAnswer = '-';
      if (isCorrect === undefined) {
        isCorrect = item.userAnswer.correct;
      } else {
        isCorrect = isCorrect && item.userAnswer.correct;
      }
    } else {
      isCorrect = false;
      userAnswer = '-';
    }
  });
  return { answer, userAnswer, isCorrect };
};


// 首字母大写
export const firstUpperCase = str => {
  if (!str) return ' ';
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
};

// 格式化报告页时间
export const formatReportDuration = duration => {
  const hours = parseInt(duration / 3600, 10);
  const minutes = parseInt(duration / 60 - hours * 60, 10);
  const seconds = parseInt(duration - hours * 3600 - minutes * 60, 10);
  const time = hours !== 0 ? `${hours}h${minutes}min${seconds}s` : (minutes !== 0 ? `${minutes}min${seconds}s` : `${seconds}s`);
  return time;
};

