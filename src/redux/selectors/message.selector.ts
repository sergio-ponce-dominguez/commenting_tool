import { createSelector } from 'reselect';
import { RootReducerType } from '../reducers/root.reducer';

const getDataReducer = (state: RootReducerType) => state.data;

export const getMessageCount = createSelector(
  getDataReducer,
  ({ messages }) => Object.keys(messages).length - 1,
);

export const getMessages = createSelector(getDataReducer, ({ messages }) => messages);
