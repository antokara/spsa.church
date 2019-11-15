import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';
import { history } from 'src/helpers/history';
import { TState as TLayoutState } from 'src/reducers/layout/defaultState';
import { layout } from 'src/reducers/layout/layout';

type TState = {
  router: RouterState;
  layout: TLayoutState;
};

const index: Reducer = combineReducers({
  router: connectRouter(history),
  layout
});

export { index, TState };
