import { connectRouter } from 'connected-react-router';
import { RouterProps } from 'react-router';
import { Action, combineReducers, createStore, Store } from 'redux';
import { history } from 'src/helpers/history';
type TActionSpy = jest.MockedFunction<
  (state: IDummyReducer | undefined, action: Action) => void
>;

interface IDummyReducer {
  dummyStorePropA: string;
  dummyStorePropB: number;
}

interface IDummyStore extends Store {
  router: RouterProps;
  dummy: IDummyReducer;
}

type TDummyStoreCreator = (actionSpy: TActionSpy) => Store;

/**
 * creates and returns the dummy store
 * which allows us to perform controlled tests with it
 *
 * @param actionSpy jest fn that gets invoked on every action dispatced
 */
const dummyStoreCreator: TDummyStoreCreator = (actionSpy: TActionSpy): Store =>
  createStore(
    combineReducers({
      router: connectRouter(history),
      dummy: (
        state: IDummyReducer | undefined,
        action: Action
      ): IDummyReducer => {
        // invoke the action spy so that we can test
        // the dispatch of actions (ie. to test the ConnectedRouter provider)
        actionSpy(state, action);

        // hard-coded reducer
        // because we only care to test that the Provider works
        // not that the state of this reducer
        // changes by actions dispatched
        return {
          dummyStorePropA: 'test-a',
          dummyStorePropB: 10
        };
      }
    })
  );

export { dummyStoreCreator, IDummyStore, TActionSpy };
