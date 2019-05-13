import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({

  container: {
    flex: 1,
    height: '100%',
    overflowY: 'hidden',
  },

  loadingBox: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loading: {
    height: 100,
    width: 100,
    margin: '0 auto',
  },

  text: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },

  box: {
    width: '100%',
    height: '100%',
  },

});
