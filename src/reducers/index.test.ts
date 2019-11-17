import { RouterState } from 'connected-react-router';
import { defaultState as layoutDefaultState } from 'src/reducers/layout/defaultState';
import { index, TState } from './index';

describe('index reducer', () => {
  let state: TState;
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
    state = index({}, { type: 'test' });
  });

  it('returns the state object', () => {
    expect(state).toStrictEqual({
      router: routerDefaultState,
      layout: layoutDefaultState
    });
  });
});
