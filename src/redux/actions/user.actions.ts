import { Action } from 'redux';

export type UserActions = Action<'user/select'> & { payload: { userId: string } };
