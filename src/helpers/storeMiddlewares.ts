import { routerMiddleware } from 'connected-react-router';
import { Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { history } from 'src/helpers/history';
// import { createLogger } from 'ReduxLogger';

const storeMiddlewares: Middleware[] = [];

// add the logger middleware but only when not in production or test
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  storeMiddlewares.push(createLogger());
}

// add the middleware for intercepting and dispatching navigation actions
storeMiddlewares.push(routerMiddleware(history));

export { storeMiddlewares };
