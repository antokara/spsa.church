import { Action, Dispatch, Store } from 'redux';

type THandleAndReturnAction = (action: Action) => Action;
type TDispatchAndReturnAction = (next: Dispatch) => THandleAndReturnAction;
type TMockMiddleware = (store: Store) => TDispatchAndReturnAction;
type TMockMiddlewareMockedFn = jest.MockedFunction<(action: Action) => void>;

/**
 * a mock middleware which allows us to know if it gets invoked
 * when an action gets dispatched on the store
 *
 * @param mockFn the mock function which will get invoked when the action gets dispatched
 */
const mockMiddleware: (mockFn: TMockMiddlewareMockedFn) => TMockMiddleware = (
  mockFn: TMockMiddlewareMockedFn
): TMockMiddleware => (): TDispatchAndReturnAction => (
  next: Dispatch
): THandleAndReturnAction => (action: Action): Action => {
  // invoke the mock fn
  mockFn(action);

  return next(action);
};

export {
  mockMiddleware,
  THandleAndReturnAction,
  TDispatchAndReturnAction,
  TMockMiddleware,
  TMockMiddlewareMockedFn,
};
