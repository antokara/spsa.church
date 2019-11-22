import { defaultState, TState } from 'src/reducers/defaultState';

/**
 * creates a deep copy of the default state,
 * if there is intent to mutate it.
 *
 * primarily intended for use in tests.
 *
 * in any other case, "immer/produce" must be used instead
 */
const defaultStateCreator: () => TState = (): TState =>
  JSON.parse(JSON.stringify(defaultState));

export { defaultStateCreator, TState };
