import { RouterState } from 'connected-react-router';
import { IDummyReducer } from './IDummyReducer';

interface IDummyStore {
  router: RouterState;
  dummy: IDummyReducer;
}

export { IDummyStore };
