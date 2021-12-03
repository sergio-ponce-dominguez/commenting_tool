import Action from '../actions';
import { makeReducer, ReduceMap } from '../types/common';

type State = {};

const initialState: State = {};

const map: ReduceMap<State, Action> = {
  'comment/add': (state, action) => {
    return { ...state, ...action.payload };
  },
};

export const dataReducer = makeReducer(map, initialState);

export default dataReducer;
