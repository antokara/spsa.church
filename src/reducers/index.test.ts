import { RouterState } from 'connected-react-router';
import { Reducer } from 'redux';
import { index } from './index';

describe('index reducer', () => {
  let store: Reducer;
  const routerDefaultState: RouterState = {
    action: 'POP',
    location: {
      hash: '',
      pathname: '/',
      search: '',
      state: undefined
    }
  };

  beforeEach(() => {
    store = index({}, { type: 'test' });
  });

  it('returns the store object', () => {
    expect(store).toStrictEqual({
      router: routerDefaultState
    });
  });
});
