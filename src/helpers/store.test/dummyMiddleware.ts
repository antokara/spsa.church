import { Action, Dispatch, Store } from 'redux';

type THandleAndReturnAction = (action: Action) => Action;
type TDispatchAndReturnAction = (next: Dispatch) => THandleAndReturnAction;
type TDummyMiddleware = (store: Store) => TDispatchAndReturnAction;
type TDummyMiddlewareMockedFn = jest.MockedFunction<(action: Action) => void>;

/**
 * a dummy middleware which allows us to know if it gets invoked
 * when an action gets dispatched on the store
 *
 * @param mockFn the mock function which will get invoked when the action gets dispatched
 */
const dummyMiddleware: (
  mockFn: TDummyMiddlewareMockedFn
) => TDummyMiddleware = (
  mockFn: TDummyMiddlewareMockedFn
): TDummyMiddleware => (): TDispatchAndReturnAction => (
  next: Dispatch
): THandleAndReturnAction => (action: Action): Action => {
  // invoke the mock fn
  mockFn(action);

  return next(action);
};

export {
  dummyMiddleware,
  THandleAndReturnAction,
  TDispatchAndReturnAction,
  TDummyMiddleware,
  TDummyMiddlewareMockedFn
};
