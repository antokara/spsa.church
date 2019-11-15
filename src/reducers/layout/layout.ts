import { produce } from 'immer';
import { Reducer } from 'redux';
import { TAction } from 'src/actions/layout/menuOpen';
import { MENU_OPEN } from 'src/constants/actionTypes/layout/MENU_OPEN';
import { defaultState, TState } from 'src/reducers/layout/defaultState';

const layout: Reducer = produce((draft: TState, action: TAction) => {
  switch (action.type) {
    case MENU_OPEN:
      draft.menuOpen = action.payload;

    default:
      return draft ?? defaultState;
  }
});

export { layout };
