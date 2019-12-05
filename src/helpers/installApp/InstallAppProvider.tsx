import * as React from 'react';
import { UAParser } from 'ua-parser-js';
import { Context } from './Context';
import {
  defaultState,
  EInstalled,
  EOutcome,
  EPlatform,
  IContext
} from './IContext';
import { localStorageKey } from './localStorageKey';

// initialize once, the user agent cannot really change...
const upParser: UAParser = new UAParser();

type TProps = React.PropsWithChildren<{}>;
// @see https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
let beforeInstallPromptEventListener:
  | EventListenerOrEventListenerObject
  | undefined;
// @see https://developer.mozilla.org/en-US/docs/Web/API/Window/appinstalled_event
let appInstalledEventListener: EventListenerOrEventListenerObject | undefined;

/**
 * handles the cleanup of the useEffect
 */
const cleanUp: (
  setContext: React.Dispatch<React.SetStateAction<IContext>>
) => () => void = (
  setContext: React.Dispatch<React.SetStateAction<IContext>>
): (() => void) => (): void => {
  // cleanup the event listeners
  if (beforeInstallPromptEventListener) {
    window.removeEventListener(
      'beforeinstallprompt',
      beforeInstallPromptEventListener
    );
    beforeInstallPromptEventListener = undefined;
  }
  if (appInstalledEventListener) {
    window.removeEventListener('appinstalled', appInstalledEventListener);
    appInstalledEventListener = undefined;
  }

  // reset
  setContext(
    (oldContext: IContext): IContext => ({
      ...oldContext,
      deferredPrompt: undefined
    })
  );
};

/**
 * handles the detection of the standalone mode or maybeInstalled
 */
const checkStandaloneInstalled: (
  context: IContext,
  setContext: React.Dispatch<React.SetStateAction<IContext>>
) => void = (
  context: IContext,
  setContext: React.Dispatch<React.SetStateAction<IContext>>
): void => {
  // do not proceed if we already have set it
  if (context.standalone !== undefined) {
    return;
  }

  // detect if this app is running in standalone mode
  if (
    window.matchMedia('(display-mode: standalone)').matches ||
    window?.navigator.standalone === true
  ) {
    // mark as standalone but also as already installed...
    setContext({
      ...context,
      standalone: true,
      installed: EInstalled.alreadyInstalled,
      platform: EPlatform.supported
    });
  } else if (localStorage.getItem(localStorageKey)) {
    setContext({
      ...context,
      standalone: false,
      installed: EInstalled.maybeInstalled,
      platform: EPlatform.supported
    });
  } else {
    setContext({
      ...context,
      standalone: false
    });
  }
};

/**
 * handles the detection of the platform iOS/chrome
 */
const checkPlatform: (
  context: IContext,
  setContext: React.Dispatch<React.SetStateAction<IContext>>
) => void = (
  context: IContext,
  setContext: React.Dispatch<React.SetStateAction<IContext>>
): void => {
  // do not proceed if we already have set it
  if (context.platform !== undefined) {
    return;
  }

  if (window.onbeforeinstallprompt !== undefined) {
    // if this event exists, it is probably supported...
    setContext({
      ...context,
      platform: EPlatform.supported
    });
  } else if (
    upParser.getDevice().type === UAParser.DEVICE.MOBILE &&
    upParser.getOS().name === 'iOS' &&
    upParser.getBrowser().name === 'Safari'
  ) {
    // in case of Safari on iOS and mobile...
    setContext({
      ...context,
      platform: EPlatform.iOS
    });
  }
};

/**
 * a Provider which must be used once per application,
 * to provide the Install App context
 */
const InstallAppProvider: (props: TProps) => JSX.Element = ({
  children
}: TProps): JSX.Element => {
  const [context, setContext] = React.useState(defaultState);

  // check if we're running in standalone and/or installed
  checkStandaloneInstalled(context, setContext);

  // check the platform support
  checkPlatform(context, setContext);

  /**
   * run only once on mount and once on unmount
   * @see https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
   *
   * Note: in this closure we MUST use the functional update form of setState
   * @see https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
   */
  React.useEffect(() => {
    // only if the listener is not already set
    if (!beforeInstallPromptEventListener) {
      // handle the prompt to install event
      // @see https://developers.google.com/web/fundamentals/app-install-banners#preventing_the_mini-infobar_from_appearing
      beforeInstallPromptEventListener = (
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
            deferredPrompt: e,
            installed: EInstalled.no,
            platform: EPlatform.supported
          })
        );
        localStorage.removeItem(localStorageKey);

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
                deferredPrompt: undefined
              })
            );
          }
        );
      };

      // handle the application installed event
      appInstalledEventListener = (): void => {
        // store the maybe installed
        localStorage.setItem(localStorageKey, '1');
        // update context
        setContext(
          (oldContext: IContext): IContext => ({
            ...oldContext,
            installed: EInstalled.justInstalled
          })
        );
      };

      // add the event listeners
      window.addEventListener(
        'beforeinstallprompt',
        beforeInstallPromptEventListener
      );
      window.addEventListener('appinstalled', appInstalledEventListener);
    }

    return cleanUp(setContext);
  }, []);

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export { InstallAppProvider };