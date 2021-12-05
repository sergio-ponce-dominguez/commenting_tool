import { Action } from 'redux';
import { Message } from '../../types/message.types';

export type CommentActions =
  | (Action<'comment/add'> & {
      payload: Pick<Message, 'parentId' | 'text' | 'userId'>;
    })
  | (Action<'comment/update'> & {
      payload: { messageId: string; text: string };
    })
  | (Action<'comment/upVote'> & {
      payload: { messageId: string };
    })
  | (Action<'comment/downVote'> & {
      payload: { messageId: string };
    });
