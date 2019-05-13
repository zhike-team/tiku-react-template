import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  children: {
    flex: 1,
    overflow: 'auto',
  },
  modalAlert: {
    alignItems: 'center',
  },

  modalAlertImage: {
    width: 90,
    height: 90,
    marginTop: 20,
    alignSelf: 'center',
  },

  modalAlertText: {
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '10px',
  },
});
