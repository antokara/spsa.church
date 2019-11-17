import { defaultState, TState } from './defaultState';
import { index } from './index';

describe('index reducer', () => {
  let state: TState;

  beforeEach(() => {
    state = index({}, { type: 'test' });
  });

  it('returns the state object', () => {
    expect(state).toStrictEqual(defaultState);
  });
});
