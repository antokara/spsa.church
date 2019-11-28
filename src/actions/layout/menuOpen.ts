import { Action, ActionFunction1, createAction } from 'redux-actions';
import { actionTypes } from 'src/constants/layout/actionTypes';

type TAction = Action<boolean>;
type TActionCreator = ActionFunction1<boolean, TAction>;

/**
 * sets if the menu is open or not with the flag passed
 */
const menuOpen: TActionCreator = createAction<boolean>(actionTypes.menuOpen);

export { menuOpen, TAction, TActionCreator };
