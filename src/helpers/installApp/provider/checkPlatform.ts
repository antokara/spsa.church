import * as React from 'react';
import { EPlatform, IContext } from 'src/helpers/installApp/IContext';
import { UAParser } from 'ua-parser-js';

// initialize once, the user agent cannot really change...
const uaParser: UAParser = new UAParser();

/**
 * handles the detection of the platform iOS/PWA install supported
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
    uaParser.getOS().name === 'iOS' &&
    uaParser.getBrowser().name === 'Mobile Safari'
  ) {
    // in case of Safari on iOS and mobile...
    setContext({
      ...context,
      platform: EPlatform.iOS
    });
  }
};

export { checkPlatform };
