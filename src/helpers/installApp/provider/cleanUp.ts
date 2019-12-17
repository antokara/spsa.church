import * as React from 'react';
import { IContext } from 'src/helpers/installApp/IContext';
import { TSetState, TState } from './TState';

/**
 * handles the cleanup of the useEffect of the "InstallAppProvider"
 *
 * - removes any attached event listeners and clears its state handlers
 * - resets "nativePromptToInstall" event to undefined, in case it was not used yet
 *
 */
const cleanUp: (
  setContext: React.Dispatch<React.SetStateAction<IContext>>,
  state: TState,
  setState: TSetState
) => () => void = (
  setContext: React.Dispatch<React.SetStateAction<IContext>>,
  state: TState,
  setState: TSetState
): (() => void) => (): void => {
  // cleanup the event listeners
  if (state.beforeInstallPromptEventListener) {
    window.removeEventListener(
      'beforeinstallprompt',
      state.beforeInstallPromptEventListener
    );
  }
  if (state.appInstalledEventListener) {
    window.removeEventListener('appinstalled', state.appInstalledEventListener);
  }
  setState(
    (oldState: TState): TState => ({
      ...oldState,
      beforeInstallPromptEventListener: undefined,
      appInstalledEventListener: undefined
    })
  );

  // reset
  setContext(
    (oldContext: IContext): IContext => ({
      ...oldContext,
      nativePromptToInstall: undefined
    })
  );
};

export { cleanUp };
