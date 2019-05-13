import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loading: {
    height: 100,
  },

  text: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },

  progressWrapper: {
    width: 400,
    height: 20,
    marginTop: 40,
    borderRadius: 100,
    backgroundColor: '#EAEFF2',
    overflow: 'hidden',
  },

  progress: {
    height: 20,
    background: 'linear-gradient(right, #3399FF, #62C9FF)',
  },
});
