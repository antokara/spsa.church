import { connectRouter } from 'connected-react-router';
import { RouterProps } from 'react-router';
import { combineReducers, createStore, Store } from 'redux';
import { history } from 'src/helpers/history';

interface IDummyReducer {
  dummyStorePropA: string;
  dummyStorePropB: number;
}

interface IDummyStore extends Store {
  router: RouterProps;
  dummy: IDummyReducer;
}

const dummyStore: Store = createStore(
  combineReducers({
    router: connectRouter(history),
    dummy: (): IDummyReducer => ({
      // hard-coded reducer because we only care to test that the Provider works
      dummyStorePropA: 'test-a',
      dummyStorePropB: 10
    })
  })
);

export { dummyStore, IDummyStore };
