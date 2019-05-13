import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import localforage from 'localforage';
import reducers from 'reducers';
import initialState from 'reducers/initial_state';
import sagas from 'sagas';

// TODO 需要同一场练习解决多标签页下，数据无法同时写的问题
export default key => {
  const combineReducers = persistCombineReducers({
    key,
    keyPrefix: 'ti:gre:',
    storage: localforage,
  }, reducers);

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(combineReducers, initialState, compose(
    applyMiddleware(sagaMiddleware),
  ));
  sagas.forEach(item => sagaMiddleware.run(item));

  return new Promise((resolve, reject) => {
    try {
      persistStore(store, null, () => {
        resolve(store);
      });
    } catch (e) {
      reject(e);
    }
  });
};
