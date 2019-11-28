import { actionTypes } from 'src/constants/layout/actionTypes';
import { menuOpen } from './menuOpen';

describe('menuOpen action', () => {
  it('is a function', () => {
    expect(menuOpen).toBeInstanceOf(Function);
  });

  it('returns an action when called', () => {
    expect(menuOpen(true)).toStrictEqual({
      type: actionTypes.menuOpen,
      payload: true
    });
  });
});
