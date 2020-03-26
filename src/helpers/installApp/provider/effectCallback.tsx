import * as React from 'react';
import { TSetContext } from 'src/helpers/installApp/Context';
import {
  EInstalled,
  EOutcome,
  EPlatform,
  IContext,
} from 'src/helpers/installApp/IContext';
import { localStorageKeys } from 'src/helpers/installApp/localStorageKeys';
import { cleanUp } from './cleanUp';
import { TSetState, TState } from './TState';

/**
 * a Provider which must be used once per application,
 * to provide the Install App context
 */
const effectCallback: (
  state: TState,
  setState: TSetState,
  setContext: TSetContext
) => React.EffectCallback = (
  state: TState,
  setState: TSetState,
  setContext: TSetContext
): (() => void) => {
  // only if the listener is not already set
  if (!state.beforeInstallPromptEventListener) {
    // handle the prompt to install event
    // @see https://developers.google.com/web/fundamentals/app-install-banners#preventing_the_mini-infobar_from_appearing
    const tempBeforeInstallPromptEventListener: EventListenerOrEventListenerObject = (
      e: BeforeInstallPromptEvent
    ): void => {
      // Prevent Chrome 76 and later from showing the mini-infobar
      e.preventDefault();

      // Stash the event so it can be triggered later,
      // mark the app as not installed since it can't be installed if we get the install prompt and
      // set the platform as supported...
      setContext(
        (oldContext: IContext): IContext => ({
          ...oldContext,
          nativePromptToInstall: (): void => {
            e.prompt().then().catch();
          },
          installed: EInstalled.no,
          platform: EPlatform.supported,
        })
      );
      localStorage.removeItem(localStorageKeys.installed);

      // Wait for the user to respond to the prompt
      e.userChoice.then(
        (choiceResult: {
          outcome: 'accepted' | 'dismissed';
          platform: string;
        }) => {
          let outcome: EOutcome;
          if (choiceResult.outcome === EOutcome.accepted) {
            outcome = EOutcome.accepted;
          } else {
            outcome = EOutcome.dismissed;
          }

          setContext(
            (oldContext: IContext): IContext => ({
              ...oldContext,
              outcome,
              nativePromptToInstall: undefined,
            })
          );
        }
      );
    };

    // handle the application installed event
    const tmpAppInstalledEventListener: EventListenerOrEventListenerObject = (): void => {
      // store the maybe installed
      localStorage.setItem(localStorageKeys.installed, '1');
      // update context
      setContext(
        (oldContext: IContext): IContext => ({
          ...oldContext,
          installed: EInstalled.justInstalled,
          isPromptVisible: false,
        })
      );
    };

    // add the event listeners
    setState(
      (oldState: TState): TState => ({
        ...oldState,
        beforeInstallPromptEventListener: tempBeforeInstallPromptEventListener,
        appInstalledEventListener: tmpAppInstalledEventListener,
      })
    );
    window.addEventListener(
      'beforeinstallprompt',
      tempBeforeInstallPromptEventListener
    );
    window.addEventListener('appinstalled', tmpAppInstalledEventListener);
  }

  return cleanUp(setContext, state, setState);
};

export { effectCallback };
