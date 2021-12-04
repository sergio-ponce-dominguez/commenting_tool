import { Message } from '../../types/message.types';
import { User } from '../../types/user.types';
import { ById } from '../../utils/mapper';
import { getNextId } from '../../utils/utils';
import Action from '../actions';
import { makeReducer, ReduceMap } from '../types/common';

type State = {
  users: ById<User>;
  currentUserId: string;

  messages: ById<Message>;
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

  messages: {
    '': {
      date: new Date(),
      id: '',
      parentId: '',
      replies: {},
      text: '',
      userId: '',
      vote: 0,
      edited: false,
    },
  },
};

const map: ReduceMap<State, Action> = {
  'comment/add': (state, action) => {
    const { parentId, text, userId } = action.payload;
    const parent = state.messages[parentId];
    if (!parent) {
      return state;
    }
    const newMessage: Message = {
      parentId,
      text,
      userId,
      date: new Date(),
      vote: 0,
      replies: {},
      id: getNextId(),
      edited: false,
    };
    const replies = { ...parent.replies, [newMessage.id]: null };
    const modifiedParent: Message = { ...parent, replies };
    const messages: ById<Message> = {
      ...state.messages,
      [newMessage.id]: newMessage,
      [parentId]: modifiedParent,
    };
    return { ...state, messages };
  },
  'user/select': (state, action) => {
    const { userId } = action.payload;
    return { ...state, currentUserId: userId };
  },
};

export const dataReducer = makeReducer(map, initialState);

export default dataReducer;
