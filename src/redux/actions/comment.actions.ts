import { Action } from 'redux';

export type CommentActions = Action<'comment/add'> & { payload: any };
