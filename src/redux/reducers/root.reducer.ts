import { combineReducers } from 'redux';

import dataReducer from './data.reducer';

/* -------------------------------------------------------------------------------------------------- */

const rootReducer = combineReducers({
  data: dataReducer,
});

/* -------------------------------------------------------------------------------------------------- */

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
