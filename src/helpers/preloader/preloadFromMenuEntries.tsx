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
  let pages: JSX.Element[] = [];

  menuEntries.forEach((menuEntry: TMenuEntry) => {
    // in case this menu entry has a page, add it to the list of pages
    if (menuEntry.page) {
      const page: JSX.Element | null = (
        <PreloadPage key={menuEntry._id} page={menuEntry.page} />
      );
      if (page) {
        pages.push(page);
      }
    }

    // traverse to sub entries and add potential entries
    if (menuEntry.subMenuEntries) {
      pages = pages.concat(preloadFromMenuEntries(menuEntry.subMenuEntries));
    }
  });

  // return any pages we have so far for this set of menu entries
  // keep in mind, this could a traversed set of entries
  return pages;
};

export { preloadFromMenuEntries };
