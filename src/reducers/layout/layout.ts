import { produce } from 'immer';
import { Reducer } from 'redux';
import { TAction } from 'src/actions/layout/menuOpen';
import { actionTypes } from 'src/constants/layout/actionTypes';
import { defaultState, TState } from 'src/reducers/layout/defaultState';

const layout: Reducer = produce((draft: TState, action: TAction) => {
  switch (action.type) {
    case actionTypes.menuOpen:
      draft.menuOpen = action.payload;
      break;
    default:
  }
}, defaultState);

export { layout };
