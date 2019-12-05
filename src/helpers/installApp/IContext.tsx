/**
 * until iOS supports the PWA Install Prompt (BeforeInstallPromptEvent)
 * we have to treat iOS differently.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
 * @see https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installable_PWAs
 * @see https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
 */
enum EPlatform {
  /**
   * we need to show instructions for the installation
   */
  iOS = 'iOS',
  /**
   * install prompt is supported on this platform
   */
  supported = 'supported'
}

enum EOutcome {
  accepted = 'accepted',
  dismissed = 'dismissed'
}

enum EInstalled {
  /**
   * we know that when the user gets prompted to install the app using the "BeforeInstallPromptEvent"
   * @see @see https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
   * @see https://developers.google.com/web/fundamentals/app-install-banners#preventing_the_mini-infobar_from_appearing
   */
  no = 'no',
  /**
   * we detect that using the "appinstalled" event
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/appinstalled_event
   */
  justInstalled = 'justInstalled',
  /**
   * if it was installed at least once in the past.
   *
   * we cannot guarantee that is still installed since
   * the uninstall process does not trigger an event.
   *
   * it uses local storage to keep track of the information.
   */
  maybeInstalled = 'maybeInstalled',
  /**
   * we know that when the app is running in standalone mode
   * since it must be installed for that to happen
   */
  alreadyInstalled = 'alreadyInstalled'
}

type TPromptToInstall = () => void;

/**
 * Provider's Context Interface
 */
interface IContext {
  /**
   * where supported. A function to call which will prompt the user to install the application.
   * note: it must be invoked by a user's gesture event handler (ie. onClick)
   */
  promptToInstall?: TPromptToInstall;
  /**
   * the current installation status.
   * undefined if we are not sure yet.
   */
  installed?: EInstalled;
  /**
   * where supported. Describes the outcome of the Install Prompt.
   * So that if it just got installed, we can hide or change our content (ie. show thank you)
   */
  outcome?: EOutcome;
  /**
   * the current platform. So we can show either the install button or
   * just show installation instructions (ie. iOS)
   */
  platform?: EPlatform;
  /**
   * where supported. If true, the application is running in standalone mode (not through the browser)
   * False, it is running through the browser and undefined if we are not sure yet.
   * @see https://developers.google.com/web/fundamentals/app-install-banners#detect-mode
   */
  standalone?: boolean;
}

const defaultState: IContext = {
  promptToInstall: undefined,
  installed: undefined,
  outcome: undefined,
  platform: undefined,
  standalone: undefined
};

export {
  IContext,
  defaultState,
  EOutcome,
  EPlatform,
  EInstalled,
  TPromptToInstall
};
