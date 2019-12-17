import * as React from 'react';
import {
  EInstalled,
  EPlatform,
  IContext
} from 'src/helpers/installApp/IContext';
import { localStorageKeys } from 'src/helpers/installApp/localStorageKeys';

/**
 * handles the detection of the standalone mode or maybeInstalled
 *
 * it can detect if:
 *  - this is running in standalone mode (hence already installed as well)
 *  - not standalone but maybe installed
 *  - not standalone, not maybe installed
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
    // mark as standalone but also as already installed and PWA install supported
    setContext({
      ...context,
      standalone: true,
      installed: EInstalled.alreadyInstalled,
      platform: EPlatform.supported
    });
  } else if (localStorage.getItem(localStorageKeys.installed)) {
    // mark as not standalone but maybe installed and PWA install supported
    setContext({
      ...context,
      standalone: false,
      installed: EInstalled.maybeInstalled,
      platform: EPlatform.supported
    });
  } else {
    // mark as not standalone
    setContext({
      ...context,
      standalone: false,
      installed: EInstalled.no
    });
  }
};

export { checkStandaloneInstalled };
