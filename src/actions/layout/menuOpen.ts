import { Action, ActionFunction1, createAction } from 'redux-actions';
import { MENU_OPEN } from 'src/constants/actionTypes/layout/MENU_OPEN';

type TAction = Action<boolean>;
type TActionCreator = ActionFunction1<boolean, TAction>;

const menuOpen: TActionCreator = createAction<boolean>(MENU_OPEN);

export { menuOpen, TAction, TActionCreator };
