import * as React from 'react';
import { defaultState, IContext } from './IContext';

/**
 * create the Provider's context
 * with default values
 */
const Context: React.Context<IContext> = React.createContext<IContext>(
  defaultState
);

type TSetContext = React.Dispatch<React.SetStateAction<IContext>>;

export { Context, TSetContext };
