import { connectRouter } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';
import { history } from 'src/helpers/history';
import { layout } from 'src/reducers/layout/layout';

const index: Reducer = combineReducers({
  router: connectRouter(history),
  layout
});

export { index };
