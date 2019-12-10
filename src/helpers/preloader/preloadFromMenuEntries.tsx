import * as React from 'react';
import { TMenuEntry } from 'src/gql/preload/TData';
import { PreloadPage } from 'src/helpers/preloader/PreloadPage';

/**
 * preloads the contents/assets from the Menu Entries provided
 * by returning
 */
const preloadFromMenuEntries: (menuEntries: TMenuEntry[]) => JSX.Element[] = (
  menuEntries: TMenuEntry[]
): JSX.Element[] => {
  const pages: JSX.Element[] = [];

  menuEntries.forEach((menuEntry: TMenuEntry) => {
    if (menuEntry.page) {
      pages.push(<PreloadPage key={menuEntry._id} page={menuEntry.page} />);
    }

    // traverse to sub entries and add potential entries
    if (menuEntry.subMenuEntries) {
      pages.concat(preloadFromMenuEntries(menuEntry.subMenuEntries));
    }
  });

  return pages;
};

export { preloadFromMenuEntries };
