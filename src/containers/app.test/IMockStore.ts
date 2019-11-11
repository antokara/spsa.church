import { RouterState } from 'connected-react-router';
import { IMockReducer } from './IMockReducer';

interface IMockStore {
  router: RouterState;
  mock: IMockReducer;
}

export { IMockStore };
