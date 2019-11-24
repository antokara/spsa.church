import { TAction } from 'src/actions/layout/menuOpen';
import { actionTypes } from 'src/constants/layout/actionTypes';
import { defaultState, TState } from './defaultState';
import { layout } from './layout';

describe('layout reducer', () => {
  let state: TState;

  beforeEach(() => {
    state = layout(defaultState, { type: 'test' });
  });

  it('returns the store object', () => {
    expect(state).toStrictEqual(defaultState);
  });

  describe('with MENU_OPEN action', () => {
    let action: TAction;
    beforeEach(() => {
      action = { type: actionTypes.MENU_OPEN, payload: false };
    });

    describe('and payload:true', () => {
      beforeEach(() => {
        action.payload = true;
        state = layout(defaultState, action);
      });

      it('sets menuOpen:true', () => {
        expect(state.menuOpen).toBeTruthy();
      });
    });

    describe('and payload:false', () => {
      beforeEach(() => {
        action.payload = false;
        state = layout(defaultState, action);
      });

      it('sets menuOpen:false', () => {
        expect(state.menuOpen).toBeFalsy();
      });
    });
  });
});
