import {
  applyMiddleware,
  compose,
  createStore,
  Store,
  StoreEnhancer
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { storeMiddlewares } from 'src/helpers/storeMiddlewares';
import { index } from 'src/reducers/index';

// apply middlewares to our enhancer
let storeEnhancer: StoreEnhancer = applyMiddleware(...storeMiddlewares);

// add the redux devtools enhancer but only when not in production or test
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  const composeEnhancers: typeof compose | undefined = composeWithDevTools({});
  if (composeEnhancers) {
    storeEnhancer = composeEnhancers(storeEnhancer);
  }
}

// create the store with our reducer and enhancer
export const store: Store = createStore(index, storeEnhancer);
