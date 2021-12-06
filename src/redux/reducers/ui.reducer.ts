import { SortOrder } from '../../types/ui.types';
import Action from '../actions';
import { makeReducer, ReduceMap } from '../types/common';

type State = {
  sortOrder: SortOrder;
  currentMessageThread: string ;
};

const initialState: State = {
  sortOrder: 'vote_down',
  currentMessageThread: '',
};

const map: ReduceMap<State, Action> = {
  'sort/select': (state, action) => {
    const { sortOrder } = action.payload;
    return { ...state, sortOrder };
  },
  'currentMessageThread/set': (state, action) => {
    const { currentMessageThread } = action.payload;
    return { ...state, currentMessageThread };
  },
};

export const uiReducer = makeReducer(map, initialState);

export default uiReducer;
