import rootReducer from './reducers/root.reducer';
import { createStore, compose } from 'redux';

// This for Redux dev tools
let composeEnhancers: typeof compose;

composeEnhancers =
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

const store = createStore(rootReducer, composeEnhancers());

export default store;
