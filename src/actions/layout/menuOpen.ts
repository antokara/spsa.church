import { Action, ActionFunction1, createAction } from 'redux-actions';
import { EActionTypes } from 'src/constants/layout/EActionTypes';

type TAction = Action<boolean>;
type TActionCreator = ActionFunction1<boolean, TAction>;

/**
 * sets if the menu is open or not with the flag passed
 */
const menuOpen: TActionCreator = createAction<boolean>(EActionTypes.MENU_OPEN);

export { menuOpen, TAction, TActionCreator };
