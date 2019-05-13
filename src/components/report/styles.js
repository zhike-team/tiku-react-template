import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    overflowY: 'auto',
  },
  text: {
    display: 'inline-block',
    width: '350px',
    textAlign: 'left',
    fontSize: '14px',
    fontFamily: 'PingFangSC-Regular',
    fontWeight: 400,
    color: 'rgba(50,54,58,1)',
    lineHeight: '20px',
    flexDirection: 'row',
    marginBottom: '20px',
  },
  tip: {
    color: '#3399FF',
    marginBottom: '20px',
  },
  containerNew: {
    alignItems: 'center',
    margin: '0 auto',
  },
});
