type TLocalStorageKeys = {
  installed: string;
  prompt: string;
};

/**
 * the local storage key to use to get/set
 */
const localStorageKeys: TLocalStorageKeys = {
  installed: 'pwa.maybeInstalled',
  prompt: 'pwa.installPrompt',
};

export { localStorageKeys };
