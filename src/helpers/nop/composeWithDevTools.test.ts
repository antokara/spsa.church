import { compose } from 'redux';
import { composeWithDevTools } from './composeWithDevTools';

describe('composeWithDevTools function', () => {
  let result: typeof compose | undefined;

  beforeEach(() => {
    result = composeWithDevTools({});
  });

  it('returns undefined', () => {
    expect(result).toBeUndefined();
  });
});
