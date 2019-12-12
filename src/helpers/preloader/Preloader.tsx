import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import * as getTheme from 'src/gql/preload/getTheme.gql';
import { TData } from 'src/gql/preload/TData';
import { preloadFromMenuEntries } from 'src/helpers/preloader/preloadFromMenuEntries';

/**
 * functional component that preloads the contents/assets
 */
const Preloader: () => JSX.Element | null = (): JSX.Element | null => {
  // get the theme data
  const { loading, data } = useQuery<TData>(getTheme);

  // once loaded and we have data
  if (!loading && data?.theme.headerMenu.menuEntries.length) {
    return <>{preloadFromMenuEntries(data?.theme.headerMenu.menuEntries)}</>;
  }

  return null;
};

export { Preloader };
