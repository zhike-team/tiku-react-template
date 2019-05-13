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

  mockButton: {
    backgroundColor: '#fff',
    ':hover': {
      backgroundColor: '#fff',
      opacity: 0.8,
    },
  },

  mockText: {
    color: '#32363A',
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
    backgroundColor: '#878F98',
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

  duration: {
    marginRight: 20,
    color: '#fff',
    fontSize: 14,
    lineHeight: '28px',
  },

  normalButtons: {
    flexDirection: 'row',
  },

  button: {
    marginLeft: 10,
  },

  correctBtn: {
    backgroundColor: '#FF8E04',
    ':hover': {
      backgroundColor: '#FF8E04',
      opacity: 0.8,
    },
  },

  modalAlert: {
    alignItems: 'center',
  },

  modalAlertImage: {
    width: 90,
    height: 90,
    marginTop: 20,
  },

  modalAlertText: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 40,
  },

  close: {
    marginRight: 30,
    fontSize: 14,
    width: 120,
    height: 40,
    lineHeight: '40px',
    borderRadius: '3px',
    border: 'solid 1px #878f98',
    textAlign: 'center',
    cursor: 'pointer',
  },

  pay: {
    width: 120,
    height: 40,
    fontSize: 14,
    lineHeight: '40px',
    borderRadius: '3px',
    backgroundColor: '#3399ff',
    textAlign: 'center',
    color: '#fff',
    cursor: 'pointer',
  },
});
