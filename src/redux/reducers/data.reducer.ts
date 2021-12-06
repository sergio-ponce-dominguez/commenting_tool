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
    '1': { id: '1', name: 'Ricardo', color: 'brown' },
    '2': { id: '2', name: 'Maria', color: 'aqua' },
    '3': { id: '3', name: 'Alfonso', color: 'black' },
    '4': { id: '4', name: 'John', color: 'blue' },
    '5': { id: '5', name: 'Jessica', color: 'blueviolet' },
    '6': { id: '6', name: 'Sergio', color: 'burlywood' },
    '7': { id: '7', name: 'Karla', color: 'chocolate' },
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
  'comment/update': (state, action) => {
    const { messageId, text } = action.payload;
    const message = state.messages[messageId];
    if (!message) {
      return state;
    }
    const updatedMessage: Message = { ...message, text, edited: true, date: new Date() };
    const messages: ById<Message> = {
      ...state.messages,
      [messageId]: updatedMessage,
    };
    return { ...state, messages };
  },
  'comment/upVote': (state, action) => {
    const { messageId } = action.payload;
    const message = state.messages[messageId];
    if (!message) {
      return state;
    }
    const updatedMessage: Message = { ...message, vote: message.vote + 1 };
    const messages: ById<Message> = {
      ...state.messages,
      [messageId]: updatedMessage,
    };
    return { ...state, messages };
  },
  'comment/downVote': (state, action) => {
    const { messageId } = action.payload;
    const message = state.messages[messageId];
    if (!message) {
      return state;
    }
    const updatedMessage: Message = { ...message, vote: message.vote - 1 };
    const messages: ById<Message> = {
      ...state.messages,
      [messageId]: updatedMessage,
    };
    return { ...state, messages };
  },
};

export const dataReducer = makeReducer(map, initialState);

export default dataReducer;
