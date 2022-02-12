import { createStore, compose } from 'redux';
import { loadState, saveState } from './loadState';
import reducers from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(reducers, persistedState, composeEnhancers());
store.subscribe(() => {
  saveState(store.getState());
});
export default store;
