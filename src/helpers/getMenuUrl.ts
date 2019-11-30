import { TMenuEntry } from 'src/gql/theme/TData';

/**
 * Retrieves the URL from the menu entry provided.
 *
 * if the menu entry has a page with a URL, that one is returned, otherwise
 * the menu entry's URL is returned, if provided. Otherwise,
 * a hard-coded string is returned instead.
 */
const getMenuUrl: (menuEntry: TMenuEntry) => string = (
  menuEntry: TMenuEntry
): string => menuEntry.page?.url ?? menuEntry.url ?? '#';

export { getMenuUrl };
