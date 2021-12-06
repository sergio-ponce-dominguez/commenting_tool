import { createSelector } from 'reselect';
import { RootReducerType } from '../reducers/root.reducer';

const getUiReducer = (state: RootReducerType) => state.ui;

export const getSortOrder = createSelector(getUiReducer, ({ sortOrder }) => sortOrder);

export const getIndentWidth = createSelector(getUiReducer, () => 42);
