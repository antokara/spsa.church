import { TMenuEntry } from 'src/gql/preload/TData';
import { preloadPage } from 'src/helpers/preloader/preloadPage';

/**
 *  preloads the contents/assets from the Menu Entries provided
 */
const preloadFromMenuEntries: (menuEntries: TMenuEntry[]) => void = (
  menuEntries: TMenuEntry[]
): void => {
  menuEntries.forEach((menuEntry: TMenuEntry) => {
    if (menuEntry.page) {
      preloadPage(menuEntry.page);
    }

    // traverse to sub entries
    if (menuEntry.subMenuEntries) {
      preloadFromMenuEntries(menuEntry.subMenuEntries);
    }
  });
};

export { preloadFromMenuEntries };
