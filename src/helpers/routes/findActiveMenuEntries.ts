import { Location } from 'history';
import { matchPath } from 'react-router-dom';
import { TMenuEntry } from 'src/gql/theme/TData';
import { getMenuUrl } from 'src/helpers/getMenuUrl';

/**
 * finds the active menu entries and returns them by comparing the current URL
 * with the URL of each menu entry / sub menu entry / page.
 *
 * the first entry is always the root menu entry and
 * the last entry is always the exact match.
 *
 * note: in case of a single entry returned, it is both the root/exact match.
 */
const findActiveMenuEntries: (
  location: Location,
  menuEntries: TMenuEntry[]
) => TMenuEntry[] = (
  location: Location,
  menuEntries: TMenuEntry[]
): TMenuEntry[] => {
  let matches: TMenuEntry[] = [];
  menuEntries.forEach((menuEntry: TMenuEntry) => {
    if (
      matchPath(location.pathname, { path: getMenuUrl(menuEntry), exact: true })
    ) {
      // in case of direct match, add it to the end of the list
      matches.push(menuEntry);
    } else if (menuEntry.subMenuEntries) {
      // in case there are sub entries, recurse but pass the current matches
      const subItemMatch: TMenuEntry[] = findActiveMenuEntries(
        location,
        menuEntry.subMenuEntries
      );
      // we found a match in the sub items
      if (subItemMatch.length) {
        // add the current (parent) item, so we have the full path
        matches.push(menuEntry);
        // and add the sub item match(es) as well
        matches = matches.concat(subItemMatch);
      }
    }
  });

  return matches;
};

export { findActiveMenuEntries };
