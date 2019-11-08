import { AnyAction, Dispatch, Middleware } from 'redux';
import { createLogger } from './createLogger';

describe('createLogger function', () => {
  // tslint:disable-next-line:no-any
  let result: Middleware<{}, any, Dispatch<AnyAction>> | undefined;

  beforeEach(() => {
    result = createLogger();
  });

  it('returns undefined', () => {
    expect(result).toBeUndefined();
  });
});
