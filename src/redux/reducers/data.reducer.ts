import { User } from '../../types/user.types';
import { ById } from '../../utils/mapper';
import Action from '../actions';
import { makeReducer, ReduceMap } from '../types/common';

type State = {
  users: ById<User>;
  currentUserId: string;
};

const initialState: State = {
  currentUserId: '1',
  users: {
    '1': { id: '1', name: 'Ricardo' },
    '2': { id: '2', name: 'Maria' },
    '3': { id: '3', name: 'Alfonso' },
    '4': { id: '4', name: 'John' },
    '5': { id: '5', name: 'Jessica' },
    '6': { id: '6', name: 'Sergio' },
    '7': { id: '7', name: 'Karla' },
  },
};

const map: ReduceMap<State, Action> = {
  'comment/add': (state, action) => {
    return { ...state, ...action.payload };
  },
  'user/select': (state, action) => {
    const { userId } = action.payload;
    return { ...state, currentUserId: userId };
  },
};

export const dataReducer = makeReducer(map, initialState);

export default dataReducer;
