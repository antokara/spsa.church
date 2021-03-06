import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import * as getTheme from 'src/gql/preload/getTheme.gql';
import { TData } from 'src/gql/preload/TData';
import { preloadFromMenuEntries } from 'src/helpers/preloader/preloadFromMenuEntries';
import { QueryResult } from 'react-apollo';

/**
 * functional component that preloads the contents/assets
 */
const Preloader: () => JSX.Element | null = (): JSX.Element | null => {
  // get the theme data
  const { loading, data }: QueryResult = useQuery<TData>(getTheme, {
    context: {
      debounceKey: 'preloadTheme',
    },
  });

  // once loaded and we have data
  if (!loading && data?.getTheme.headerMenu.menuEntries.length) {
    return <>{preloadFromMenuEntries(data?.getTheme.headerMenu.menuEntries)}</>;
  }

  return null;
};

export { Preloader };
