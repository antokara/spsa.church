import { routerMiddleware } from 'connected-react-router';
import { AnyAction, Dispatch, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { history } from 'src/helpers/history';

const storeMiddlewares: Middleware[] = [];

// add the logger middleware but only when not in production or test
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  const loggerMiddleware: // tslint:disable-next-line:no-any
  Middleware<{}, any, Dispatch<AnyAction>> | undefined = createLogger();
  if (loggerMiddleware) {
    storeMiddlewares.push(loggerMiddleware);
  }
}

// add the middleware for intercepting and dispatching navigation actions
storeMiddlewares.push(routerMiddleware(history));

export { storeMiddlewares };
