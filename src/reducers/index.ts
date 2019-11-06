import { connectRouter } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';
import { history } from 'src/helpers/history';

const index: Reducer = combineReducers({
  router: connectRouter(history)
});

export { index };
