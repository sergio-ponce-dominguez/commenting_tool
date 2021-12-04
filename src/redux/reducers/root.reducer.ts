import { combineReducers } from 'redux';

import dataReducer from './data.reducer';
import uiReducer from './ui.reducer';

/* -------------------------------------------------------------------------------------------------- */

const rootReducer = combineReducers({
  data: dataReducer,
  ui: uiReducer,
});

/* -------------------------------------------------------------------------------------------------- */

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
