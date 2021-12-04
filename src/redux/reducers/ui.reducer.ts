import { SortOrder } from '../../types/ui.types';
import Action from '../actions';
import { makeReducer, ReduceMap } from '../types/common';

type State = {
  sortOrder: SortOrder;
};

const initialState: State = {
  sortOrder: 'date_up',
};

const map: ReduceMap<State, Action> = {
  'sort/select': (state, action) => {
    const { sortOrder } = action.payload;
    return { ...state, sortOrder };
  },
};

export const uiReducer = makeReducer(map, initialState);

export default uiReducer;
