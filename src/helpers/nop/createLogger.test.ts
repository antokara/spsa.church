import { AnyAction, Dispatch, Middleware } from 'redux';
import { createLogger } from './createLogger';

describe('createLogger function', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: Middleware<{}, any, Dispatch<AnyAction>> | undefined;

  beforeEach(() => {
    result = createLogger();
  });

  it('returns undefined', () => {
    expect(result).toBeUndefined();
  });
});
