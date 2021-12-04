import { Action } from 'redux';
import { SortOrder } from '../../types/ui.types';

export type UiActions = Action<'sort/select'> & { payload: { sortOrder: SortOrder } };
