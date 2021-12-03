import { Action, Reducer } from 'redux';

export type ReduceMap<TState, TAction extends Action<string>> = {
  [key in TAction['type']]?: (state: TState, action: Action<key> & TAction) => TState;
};

export const makeReducer =
  <TState, TAction extends Action<string>>(
    map: ReduceMap<TState, TAction>,
    initialState: TState,
  ): Reducer<TState, TAction> =>
  (state = initialState, action) => {
    const caller = map[action.type as TAction['type']] as
      | ((state: TState, action: Action) => TState)
      | undefined;
    return caller ? caller(state, action) : state;
  };
