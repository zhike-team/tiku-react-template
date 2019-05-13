import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  divider: {
    marginLeft: 10,
    marginRight: 10,
  },

  left: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: 80,
  },
  rigth: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#F6F8F9',
    paddingBottom: 80,
  },
  result: {
    display: 'flex',
    width: '510px',
    height: '100%',
    marginTop: 40,
    marginRight: 40,
    overflowY: 'hidden',
    paddingBottom: 80,
  },
  analysis: {
    position: 'relative',
    boxSizing: 'border-box',
    height: '100%',
    marginTop: 40,
    marginLeft: 40,
  },
  icon: {
    width: 4,
    height: 18,
    background: 'rgba(51,153,255,1)',
    borderRadius: '100px',
    marginRight: 5,
  },
  textRigth: {
    display: 'inline-block',
    height: '100%',
    width: 510,
    fontSize: 16,
    color: '#32363A',
    lineHeight: '22px',
    marginTop: 38,
    paddingBottom: 120,
    fontFamily: 'PingFangSC-Regular',
    overflowY: 'auto',
  },
  title1: {
    flexDirection: 'row',
    position: 'fixed',
    backgroundColor: '#F6F8F9',
    width: 510,
  },
  text1: {
    fontSize: 16,
    color: '#32363A',
    lineHeight: '24px',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    fontSize: 16,
    color: '#32363A',
    lineHeight: '24px',
    marginBottom: 31,
  },
  answerAnalysis: {
    fontSize: 14,
    lineHeight: '20px',
  },
  content: {
    marginTop: 20,
    height: '100%',
    paddingBottom: 86,
    paddingRight: 5,
    overflowY: 'auto',
  },
  answerResult: {
    justifyContent: 'space-around',
    color: '#878F98',
    background: 'rgba(246,248,249,1)',
    lineHeight: '20px',
    paddingLeft: 10,
    marginTop: 33,
  },
  answerBox: {
    flexDirection: 'row',
    lineHeight: '40px',
    wordSpacing: '5px',
  },
  answer: {
    color: '#878f98',
    paddingRight: 10,
  },
  answerDefault: {
    display: 'inline-block',
    paddingRight: 10,
    fontWeight: 600,
    color: '#32363a',
    wordWrap: 'keep-all',
    fontFamily: 'PingFangSC-Semibold',
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
  correctAnswer: {
    paddingRight: 10,
    fontWeight: 600,
    color: '#32363a',
    width: '420px',
    wordWrap: 'keep-all',
  },
  correctAnswerText: {
    width: '410px',
    fontFamily: 'PingFangSC-Semibold',
    margin: 0,
    wordWrap: 'keep-all',
    whiteSpace: 'pre-wrap',
  },
  userAnswer: {
    flexWrap: 'warp',
    paddingRight: 5,
    fontWeight: 600,
    color: '#32363a',
    width: '420px',
    wordWrap: 'keep-all',
  },

  answerText: {
    display: 'inline',
    wordBreak: 'break-word',
  },

  block: {
    display: 'block',
  },

  color49cf51: {
    color: '#49cf51',
  },

  colorfd5454: {
    color: '#fd5454',
  },
  color000: {
    color: '#000',
  },
  image: {
    width: '100px',
    height: '100px',
    margin: '20px auto 10px auto',
  },
});
