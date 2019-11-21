import { EActionTypes } from 'src/constants/layout/EActionTypes';
import { menuOpen } from './menuOpen';

describe('menuOpen action', () => {
  it('is a function', () => {
    expect(menuOpen).toBeInstanceOf(Function);
  });

  it('returns an action when called', () => {
    expect(menuOpen(true)).toStrictEqual({
      type: EActionTypes.MENU_OPEN,
      payload: true
    });
  });
});
