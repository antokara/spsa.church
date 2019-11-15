import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import { TAction } from 'src/actions/layout/menuOpen';
import { MENU_OPEN } from 'src/constants/actionTypes/layout/MENU_OPEN';
import { defaultState, TDefaultState } from 'src/reducers/layout/defaultState';

const layout: Reducer = handleActions(
  {
    [MENU_OPEN]: (state: TDefaultState, action: TAction): TDefaultState => ({
      // TODO change with immutable
      ...state,
      menuOpen: action.payload
    })
  },
  defaultState
);

export { layout };
