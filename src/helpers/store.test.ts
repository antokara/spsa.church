import { Store, StoreCreator } from 'redux';

describe('store object', () => {
  let oldEnv: string | undefined;
  let store: Store;
  type TComposeEnhancer = (next: StoreCreator) => StoreCreator;
  let composeEnhancers: TComposeEnhancer;
  let composeWithDevTools: () => TComposeEnhancer;

  beforeAll(() => {
    oldEnv = process.env.NODE_ENV;
  });
  beforeEach(() => {
    jest.resetModules();
    // mock the index reducer, so that our tests stay the same
    // in the future, as we modify the reducers/store
    jest.mock('src/reducers/index', () => ({
      index: jest.fn().mockReturnValue({
        testReducer: true
      })
    }));
    // mock the storeMiddlewares, since we want an isolated test here
    // of just the store with its StoreEnhancer
    jest.mock('src/helpers/storeMiddlewares', () => ({
      storeMiddlewares: []
    }));
  });
  afterAll(() => {
    process.env.NODE_ENV = oldEnv;
  });

  describe('with process.env.NODE_ENV:"development"', () => {
    describe('with "composeEnhancers" returning a function', () => {
      beforeEach(() => {
        // mock the redux-devtools-extension, so that we can test
        // if it gets used or not, without caring of what it does
        composeEnhancers = jest
          .fn()
          .mockImplementation((next: StoreCreator): StoreCreator => next);
        composeWithDevTools = jest
          .fn()
          .mockImplementation((): TComposeEnhancer => composeEnhancers);
        jest.mock('redux-devtools-extension', () => ({
          composeWithDevTools
        }));
      });

      beforeEach(async () => {
        process.env.NODE_ENV = 'development';
        ({ store } = await import('./store'));
      });

      it('is an object', () => {
        expect(store).toBeInstanceOf(Object);
      });

      it('invokes the "composeWithDevTools" function once', () => {
        expect(composeWithDevTools).toHaveBeenCalledTimes(1);
      });

      it('invokes the "composeWithDevTools" function with an empty object', () => {
        expect(composeWithDevTools).toHaveBeenCalledWith({});
      });

      it('invokes the "composeEnhancers" function once', () => {
        expect(composeEnhancers).toHaveBeenCalledTimes(1);
      });

      it('invokes the "composeEnhancers" function with the store enhancer function', () => {
        expect(composeEnhancers).toHaveBeenCalledWith(expect.any(Function));
      });

      describe('"getState" method', () => {
        it('exists', () => {
          expect(store.getState).toBeInstanceOf(Function);
        });

        it('returns the state object', () => {
          expect(store.getState()).toStrictEqual({
            testReducer: true
          });
        });
      });

      describe('"dispatch" method', () => {
        it('exists', () => {
          expect(store.dispatch).toBeInstanceOf(Function);
        });

        it('returns the action passed, when called', () => {
          expect(store.dispatch({ type: 'TEST_ACTION_TYPE' })).toStrictEqual({
            type: 'TEST_ACTION_TYPE'
          });
        });
      });

      it('is has the "subscribe" method', () => {
        expect(store.subscribe).toBeInstanceOf(Function);
      });

      it('is has the "replaceReducer" method', () => {
        expect(store.replaceReducer).toBeInstanceOf(Function);
      });
    });

    describe('with "composeWithDevTools" returning undefined', () => {
      beforeEach(() => {
        // mock the redux-devtools-extension, so that we can test
        // if it gets used or not, without caring of what it does
        composeEnhancers = jest.fn().mockReturnValue(undefined);
        composeWithDevTools = jest.fn().mockReturnValue(undefined);
        jest.mock('redux-devtools-extension', () => ({
          composeWithDevTools
        }));
      });

      beforeEach(async () => {
        process.env.NODE_ENV = 'development';
        ({ store } = await import('./store'));
      });

      it('is an object', () => {
        expect(store).toBeInstanceOf(Object);
      });

      it('invokes the "composeWithDevTools" function once', () => {
        expect(composeWithDevTools).toHaveBeenCalledTimes(1);
      });

      it('invokes the "composeWithDevTools" function with an empty object', () => {
        expect(composeWithDevTools).toHaveBeenCalledWith({});
      });

      it('does not invoke the "composeEnhancers" function', () => {
        expect(composeEnhancers).not.toHaveBeenCalled();
      });

      describe('"getState" method', () => {
        it('exists', () => {
          expect(store.getState).toBeInstanceOf(Function);
        });

        it('returns the state object', () => {
          expect(store.getState()).toStrictEqual({
            testReducer: true
          });
        });
      });

      describe('"dispatch" method', () => {
        it('exists', () => {
          expect(store.dispatch).toBeInstanceOf(Function);
        });

        it('returns the action passed, when called', () => {
          expect(store.dispatch({ type: 'TEST_ACTION_TYPE' })).toStrictEqual({
            type: 'TEST_ACTION_TYPE'
          });
        });
      });

      it('is has the "subscribe" method', () => {
        expect(store.subscribe).toBeInstanceOf(Function);
      });

      it('is has the "replaceReducer" method', () => {
        expect(store.replaceReducer).toBeInstanceOf(Function);
      });
    });
  });

  describe('with process.env.NODE_ENV:"production"', () => {
    describe('with "composeEnhancers" returning a function', () => {
      beforeEach(() => {
        // mock the redux-devtools-extension, so that we can test
        // if it gets used or not, without caring of what it does
        composeEnhancers = jest
          .fn()
          .mockImplementation((next: StoreCreator): StoreCreator => next);
        composeWithDevTools = jest
          .fn()
          .mockImplementation((): TComposeEnhancer => composeEnhancers);
        jest.mock('redux-devtools-extension', () => ({
          composeWithDevTools
        }));
      });

      beforeEach(async () => {
        process.env.NODE_ENV = 'production';
        ({ store } = await import('./store'));
      });

      it('is an object', () => {
        expect(store).toBeInstanceOf(Object);
      });

      it('does not invoke the "composeWithDevTools" function', () => {
        expect(composeWithDevTools).not.toHaveBeenCalled();
      });

      it('does not invoke the "composeWicomposeEnhancersthDevTools" function', () => {
        expect(composeEnhancers).not.toHaveBeenCalled();
      });

      describe('"getState" method', () => {
        it('exists', () => {
          expect(store.getState).toBeInstanceOf(Function);
        });

        it('returns the state object', () => {
          expect(store.getState()).toStrictEqual({
            testReducer: true
          });
        });
      });

      describe('"dispatch" method', () => {
        it('exists', () => {
          expect(store.dispatch).toBeInstanceOf(Function);
        });

        it('returns the action passed, when called', () => {
          expect(store.dispatch({ type: 'TEST_ACTION_TYPE' })).toStrictEqual({
            type: 'TEST_ACTION_TYPE'
          });
        });
      });

      it('is has the "subscribe" method', () => {
        expect(store.subscribe).toBeInstanceOf(Function);
      });

      it('is has the "replaceReducer" method', () => {
        expect(store.replaceReducer).toBeInstanceOf(Function);
      });
    });
  });
});
