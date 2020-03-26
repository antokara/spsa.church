import { Action, Store, StoreCreator } from 'redux';
import {
  mockMiddleware,
  TMockMiddleware,
  TMockMiddlewareMockedFn,
} from './mockMiddleware';

describe('store object', () => {
  let oldEnv: string | undefined;
  let store: Store;
  type TComposeEnhancer = (next: StoreCreator) => StoreCreator;
  let composeEnhancers: jest.MockedFunction<TComposeEnhancer>;
  let composeWithDevTools: () => jest.MockedFunction<TComposeEnhancer>;
  let dMiddlewareSpy: TMockMiddlewareMockedFn;
  let dMiddleware: TMockMiddleware;

  beforeAll(() => {
    oldEnv = process.env.NODE_ENV;
  });
  beforeEach(() => {
    jest.resetModules();

    // initialize the mock middleware and its spy
    dMiddlewareSpy = jest.fn();
    dMiddleware = mockMiddleware(dMiddlewareSpy);

    // just pass-through the store creator
    composeEnhancers = jest
      .fn()
      .mockImplementation((next: StoreCreator): StoreCreator => next);

    // mock the index reducer, so that our tests stay the same
    // in the future, as we modify the reducers/store
    jest.mock('src/reducers/index', () => ({
      index: jest.fn().mockReturnValue({
        testReducer: true,
      }),
    }));

    // mock the storeMiddlewares, since we want an isolated test here
    // of just the store with its StoreEnhancer
    jest.mock('src/helpers/storeMiddlewares', () => ({
      storeMiddlewares: [],
    }));
  });
  afterAll(() => {
    process.env.NODE_ENV = oldEnv;
  });

  describe('with process.env.NODE_ENV:"development"', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    describe('with "composeEnhancers" returning a function', () => {
      beforeEach(() => {
        //
        // mock the redux-devtools-extension, so that we can test
        // if it gets used or not, without caring of what it does
        //
        // use our mock middleware which we can spy if it gets invoked
        // when an action gets dispatched to the store
        composeWithDevTools = jest
          .fn()
          .mockImplementation((): TMockMiddleware => dMiddleware);
        jest.mock('redux-devtools-extension', () => ({
          composeWithDevTools,
        }));
      });

      beforeEach(async () => {
        store = (await import('src/helpers/store')).store;
      });

      it('is an object', () => {
        expect(store).toBeInstanceOf(Object);
      });

      describe('"getState" method', () => {
        it('exists', () => {
          expect(store).toHaveProperty('getState', expect.any(Function));
        });

        it('returns the state object', () => {
          expect(store.getState()).toStrictEqual({
            testReducer: true,
          });
        });
      });

      describe('"dispatch" method', () => {
        it('exists', () => {
          expect(store).toHaveProperty('dispatch', expect.any(Function));
        });

        describe('called', () => {
          let result: Action;
          beforeEach(() => {
            result = store.dispatch({ type: 'TEST_ACTION_TYPE' });
          });
          it('returns the action passed, when called', () => {
            expect(result).toStrictEqual({
              type: 'TEST_ACTION_TYPE',
            });
          });

          it('invokes the mockMiddlewareSpy', () => {
            expect(dMiddlewareSpy).toHaveBeenCalledTimes(1);
          });
        });
      });

      it('is has the "subscribe" method', () => {
        expect(store).toHaveProperty('subscribe', expect.any(Function));
      });

      it('is has the "replaceReducer" method', () => {
        expect(store).toHaveProperty('replaceReducer', expect.any(Function));
      });
    });

    describe('with "composeWithDevTools" returning undefined', () => {
      beforeEach(() => {
        // mock the redux-devtools-extension, so that we can test
        // if it gets used or not, without caring of what it does
        composeWithDevTools = jest.fn().mockReturnValue(undefined);
        jest.mock('redux-devtools-extension', () => ({
          composeWithDevTools,
        }));
      });

      beforeEach(async () => {
        store = (await import('src/helpers/store')).store;
      });

      it('is an object', () => {
        expect(store).toBeInstanceOf(Object);
      });

      it('does not invoke the "composeEnhancers" function', () => {
        expect(composeEnhancers).not.toHaveBeenCalled();
      });

      describe('"getState" method', () => {
        it('exists', () => {
          expect(store).toHaveProperty('getState', expect.any(Function));
        });

        it('returns the state object', () => {
          expect(store.getState()).toStrictEqual({
            testReducer: true,
          });
        });
      });

      describe('"dispatch" method', () => {
        it('exists', () => {
          expect(store).toHaveProperty('dispatch', expect.any(Function));
        });

        describe('called', () => {
          let result: Action;
          beforeEach(() => {
            result = store.dispatch({ type: 'TEST_ACTION_TYPE' });
          });
          it('returns the action passed, when called', () => {
            expect(result).toStrictEqual({
              type: 'TEST_ACTION_TYPE',
            });
          });

          it('does not invoke the mockMiddlewareSpy', () => {
            expect(dMiddlewareSpy).not.toHaveBeenCalled();
          });
        });
      });

      it('is has the "subscribe" method', () => {
        expect(store).toHaveProperty('subscribe', expect.any(Function));
      });

      it('is has the "replaceReducer" method', () => {
        expect(store).toHaveProperty('replaceReducer', expect.any(Function));
      });
    });
  });
});
