import * as React from 'react';
import { Context } from 'src/helpers/installApp/Context';
import {
  defaultState,
  EInstalled,
  EPlatform,
  IContext,
} from 'src/helpers/installApp/IContext';
import { localStorageKeys } from 'src/helpers/installApp/localStorageKeys';
import { UAParser } from 'ua-parser-js';
import { checkPlatform } from './checkPlatform';
import { checkStandaloneInstalled } from './checkStandaloneInstalled';
import { effectCallback } from './effectCallback';
import { TState } from './TState';

// initialize once, the user agent cannot really change...
const uaParser: UAParser = new UAParser();

type TProps = React.PropsWithChildren<{}>;

/**
 * a Provider which must be used once per application,
 * to provide the Install App context
 */
const InstallAppProvider: (props: TProps) => JSX.Element = ({
  children,
}: TProps): JSX.Element => {
  // shared context state
  const [context, setContext]: [
    IContext,
    React.Dispatch<React.SetStateAction<IContext>>
  ] = React.useState(defaultState);

  // internal state
  const [state, setState]: [
    TState,
    React.Dispatch<React.SetStateAction<TState>>
  ] = React.useState<TState>({});

  // check if we're running in standalone and/or installed
  checkStandaloneInstalled(context, setContext);

  // check the platform support
  checkPlatform(context, setContext);

  // TODO: refactor to a hook
  if (!context.setPromptVisibility) {
    setContext({
      ...context,
      setPromptVisibility: (visible: boolean): void => {
        // persist the hide action
        if (!visible) {
          localStorage.setItem(localStorageKeys.prompt, '1');
        }
        // update context
        setContext(
          (oldContext: IContext): IContext => ({
            ...oldContext,
            isPromptVisible: visible,
          })
        );
      },
    });
  }

  // TODO: make it configurable
  // in case this is a mobile device,
  // it has not be installed or we do not know,
  // the prompt interval is not already set,
  // the prompt not been dismissed before,
  // we are not in standalone mode
  // show it with a delay
  if (
    (context.platform === EPlatform.iOS ||
      (context.platform === EPlatform.supported &&
        (!context.installed || context.installed === EInstalled.no))) &&
    !state.showPromptInterval &&
    uaParser.getDevice().type === UAParser.DEVICE.MOBILE &&
    !localStorage.getItem(localStorageKeys.prompt) &&
    context.standalone === false
  ) {
    setState(
      (oldState: TState): TState => ({
        ...oldState,
        showPromptInterval: setTimeout(() => {
          setContext(
            (oldContext: IContext): IContext => ({
              ...oldContext,
              isPromptVisible: true,
            })
          );
        }, 2000),
      })
    );
  }

  /**
   * run only once on mount and once on unmount
   * @see https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
   *
   * Note: in this closure we MUST use the functional update form of setState
   * @see https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
   */
  React.useEffect(effectCallback(state, setState, setContext), []);

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export { InstallAppProvider };
