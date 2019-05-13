import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    width: '800px',
    margin: '20px auto 0px',
    flexWarp: 'warp',
    fontSize: '16px',
    fontFamily: 'PingFangSC-Regular',
    fontWeight: 400,
    color: 'rgba(50,54,58,1)',
    lineHeight: '30px',
  },
  image: {
    display: 'inline-block',
    width: 12,
    height: 12,
    marginLeft: '5px',
  },
  text: {
    marginTop: 20,
    display: 'inline-block',
  },
  buttonTip: {
    display: 'inline-block',
    fontWeight: 600,
    color: '#32363A',
  },
  review: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tableContanier: {
    marginTop: '40px',
    ':first-child': {
      marginRight: '40px',
    },
  },
  table: {
    color: 'rgba(50,54,58,1)',
    lineHeight: '22px',
    borderCollapse: 'collapse',
    border: '1px solid rgba(195,204,209,1)',
  },
  th: {
    width: '126px',
    height: '40px',
    textAlign: 'center',
  },
  noAnswer: {
    backgroundColor: '#F6F8F9',
  },
  answer: {
    ':hover': {
      backgroundColor: 'rgba(51,153,255,0.1)',
    },
  },
});
