import { connectRouter } from 'connected-react-router';
import { setAutoFreeze } from 'immer';
import { combineReducers, Reducer } from 'redux';
import { history } from 'src/helpers/history';
import { layout } from 'src/reducers/layout/layout';

/**
 * even though it is supposed to automatically turn on-off on dev/prod,
 * still, we should explicitly enable it for anything other than prod, (ie. dev/test/etc.)
 *
 * @see https://immerjs.github.io/immer/docs/freezing
 */
setAutoFreeze(process.env.NODE_ENV !== 'production');

const index: Reducer = combineReducers({
  router: connectRouter(history),
  layout
});

export { index };
