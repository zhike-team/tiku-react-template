import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    height: 86,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#36424D',
    alignItems: 'center',
  },

  containerTest: {
    backgroundColor: '#385DAE',
  },

  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleLogo: {
    height: 28,
  },

  titleSplit: {
    width: 1,
    height: 28,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  titleText: {
    display: 'block',
    width: 500,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  question: {
    position: 'absolute',
    fontSize: 18,
    bottom: 12,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 300,
    color: '#fff',
    marginTop: 38,
    whiteSpace: 'nowrap',
    textAlign: 'center',
    fontFamily: 'PingFangSC-Semibold',
    fontWeight: 600,
    lineheight: 18,
  },

  line: {
    position: 'absolute',
    top: 10,
    left: 40,
    width: 240,
    height: 1,
    background: 'rgba(255,255,255,0.2)',
    zIndex: 1,
  },

  normalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  button: {
    marginLeft: 10,
  },
  buttonReview: {
    width: 100,
  },

  buttonTime: {
    color: '#fff',
    alignItems: 'center',
  },

  timeButtons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  modalAlert: {
    alignItems: 'center',
  },

  modalAlertImage: {
    width: 90,
    height: 90,
    marginTop: 20,
  },

});
