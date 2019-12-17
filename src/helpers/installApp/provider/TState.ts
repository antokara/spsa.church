import * as React from 'react';

type TState = {
  // @see https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
  beforeInstallPromptEventListener?: EventListenerOrEventListenerObject;
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Window/appinstalled_event
  appInstalledEventListener?: EventListenerOrEventListenerObject;
  // timeout handler
  showPromptInterval?: NodeJS.Timeout;
};

type TSetState = React.Dispatch<React.SetStateAction<TState>>;

export { TState, TSetState };
