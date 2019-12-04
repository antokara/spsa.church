/**
 * until iOS supports the PWA Install Prompt (BeforeInstallPromptEvent)
 * we have to treat iOS differently.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
 * @see https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installable_PWAs
 * @see https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
 */
enum EPlatform {
  iOS = 'iOS',
  chrome = 'chrome'
}

enum EOutcome {
  accepted = 'accepted',
  dismissed = 'dismissed'
}

/**
 * Provider's Context Interface
 */
interface IContext {
  /**
   * where supported. holds the deferred prompt event object
   * @see https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
   */
  deferredPrompt: BeforeInstallPromptEvent | undefined;
  /**
   * true, if we know that it is already installed, so we do not prompt for no reason
   * false, if we know it is not installed and undefined if we are not sure yet.
   */
  alreadyInstalled: boolean | undefined;
  /**
   * where supported. Describes the outcome of the Install Prompt.
   * So that if it just got installed, we can hide or change our content (ie. show thank you)
   */
  outcome: EOutcome | undefined;
  /**
   * the current platform. So we can show either the install button or
   * just show installation instructions (ie. iOS)
   */
  platform: EPlatform | undefined;
  /**
   * where supported. If true, the application is running in standalone mode (not through the browser)
   * False, it is running through the browser and undefined if we are not sure yet.
   * @see https://developers.google.com/web/fundamentals/app-install-banners#detect-mode
   */
  standalone: boolean | undefined;
}

const defaultState: IContext = {
  deferredPrompt: undefined,
  alreadyInstalled: undefined,
  outcome: undefined,
  platform: undefined,
  standalone: undefined
};

export { IContext, defaultState, EOutcome, EPlatform };
