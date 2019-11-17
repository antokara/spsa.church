import { RouterState } from 'connected-react-router';
import {
  defaultState as layoutDefaultState,
  TState as TLayoutState
} from 'src/reducers/layout/defaultState';

type TState = {
  router: RouterState;
  layout: TLayoutState;
};

const routerDefaultState: RouterState = {
  action: 'POP',
  location: {
    hash: '',
    pathname: '/',
    search: '',
    state: undefined
  }
};

const defaultState: TState = {
  router: routerDefaultState,
  layout: layoutDefaultState
};

export { defaultState, TState };
