import { Middleware } from 'redux';

describe('storeMiddlewares array', () => {
  let oldEnv: string | undefined;
  let storeMiddlewares: Middleware[];

  beforeAll(() => {
    oldEnv = process.env.NODE_ENV;
  });
  beforeEach(() => {
    jest.resetModules();
  });
  afterAll(() => {
    process.env.NODE_ENV = oldEnv;
  });

  describe('with process.env.NODE_ENV:"development"', () => {
    beforeEach(async () => {
      process.env.NODE_ENV = 'development';
    });

    describe('with "loggerMiddleware" returning a function', () => {
      beforeEach(() => {
        // mock the redux-logger, so that we can test
        // if it gets used or not, without caring of what it does
        jest.mock('redux-logger', () => ({
          createLogger: jest.fn().mockReturnValue('redux-logger'),
        }));
      });

      beforeEach(async () => {
        storeMiddlewares = (await import('./storeMiddlewares'))
          .storeMiddlewares;
      });

      it('is an array', () => {
        expect(storeMiddlewares).toBeInstanceOf(Array);
      });

      it('has the "redux-logger" middleware', () => {
        expect(storeMiddlewares).toContain('redux-logger');
      });
    });

    describe('with "loggerMiddleware" returning undefined', () => {
      beforeEach(() => {
        // mock the redux-logger, so that we can test
        // if it gets used or not, without caring of what it does
        jest.mock('redux-logger', () => ({
          createLogger: jest.fn().mockReturnValue(undefined),
        }));
      });

      beforeEach(async () => {
        storeMiddlewares = (await import('./storeMiddlewares'))
          .storeMiddlewares;
      });

      it('is an array', () => {
        expect(storeMiddlewares).toBeInstanceOf(Array);
      });

      it('does not have the "redux-logger" middleware', () => {
        expect(storeMiddlewares).not.toContain('redux-logger');
      });
    });
  });

  describe('with process.env.NODE_ENV:"production"', () => {
    beforeEach(async () => {
      process.env.NODE_ENV = 'production';
    });

    describe('with "loggerMiddleware" returning a function', () => {
      beforeEach(() => {
        // mock the redux-logger, so that we can test
        // if it gets used or not, without caring of what it does
        jest.mock('redux-logger', () => ({
          createLogger: jest.fn().mockReturnValue('redux-logger'),
        }));
      });

      beforeEach(async () => {
        storeMiddlewares = (await import('./storeMiddlewares'))
          .storeMiddlewares;
      });

      it('is an array', () => {
        expect(storeMiddlewares).toBeInstanceOf(Array);
      });

      it('does not have the "redux-logger" middleware', () => {
        expect(storeMiddlewares).not.toContain('redux-logger');
      });
    });
  });
});
