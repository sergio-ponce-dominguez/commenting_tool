import { Action } from 'redux';
import { Message } from '../../types/message.types';

export type CommentActions = Action<'comment/add'> & {
  payload: Pick<Message, 'parentId' | 'text' | 'userId'>;
};
