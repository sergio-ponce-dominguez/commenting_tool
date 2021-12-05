import { createSelector } from 'reselect';
import { fromByIdToList } from '../../utils/mapper';
import { RootReducerType } from '../reducers/root.reducer';

const getDataReducer = (state: RootReducerType) => state.data;

export const getCurrentUser = createSelector(
  getDataReducer,
  ({ currentUserId, users }) => users[currentUserId],
);

export const getCurrentUserId = createSelector(
  getDataReducer,
  ({ currentUserId }) => currentUserId,
);

export const getUsers = createSelector(getDataReducer, ({ users }) => users);

export const getAllUserList = createSelector(getDataReducer, ({ users }) => fromByIdToList(users));
