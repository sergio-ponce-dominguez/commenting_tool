import { Action } from 'redux';

export type UserActions = Action<'comment/add'> & { payload: any };
