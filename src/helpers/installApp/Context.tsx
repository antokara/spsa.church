import * as React from 'react';
import { defaultState, IContext } from './IContext';

/**
 * create the Provider's context
 * with default values
 */
const Context: React.Context<IContext> = React.createContext<IContext>(
  defaultState
);

export { Context };
