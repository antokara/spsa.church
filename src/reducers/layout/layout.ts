import { produce } from 'immer';
import { Reducer } from 'redux';
import { TAction } from 'src/actions/layout/menuOpen';
import { EActionTypes } from 'src/constants/layout/EActionTypes';
import { defaultState, TState } from 'src/reducers/layout/defaultState';

const layout: Reducer = produce((draft: TState, action: TAction) => {
  switch (action.type) {
    case EActionTypes.MENU_OPEN:
      draft.menuOpen = action.payload;
    default:
  }
}, defaultState);

export { layout };
