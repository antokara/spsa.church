import { IMockStore } from 'src/containers/app.test/IMockStore';

const defaultState: IMockStore = {
  router: {
    action: 'POP',
    location: {
      hash: '',
      pathname: '/',
      search: '',
      state: undefined,
    },
  },
  mock: {
    mockStorePropA: 'test-a',
    mockStorePropB: 10,
  },
};

export { defaultState };
