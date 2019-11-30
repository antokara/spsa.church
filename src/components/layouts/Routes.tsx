import { useQuery } from '@apollo/react-hooks';
import { Location } from 'history';
import * as React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { Generic } from 'src/components/pages/generic/Generic';
import { Home } from 'src/components/pages/home/Home';
import { NotFound } from 'src/components/pages/notFound/NotFound';
import { routes } from 'src/constants/routes';
import * as getTheme from 'src/gql/theme/getTheme.gql';
import { TData, TMenuEntry } from 'src/gql/theme/TData';
import { getMenuUrl } from 'src/helpers/getMenuUrl';

/**
 * finds the active menu entry and returns it by comparing the current URL
 * with the URL of each menu entry / sub menu entry / page
 */
const findActiveMenuEntry: (
  location: Location,
  menuEntries: TMenuEntry[]
) => TMenuEntry | undefined = (
  location: Location,
  menuEntries: TMenuEntry[]
): TMenuEntry | undefined =>
  menuEntries.find((menuEntry: TMenuEntry) => {
    if (
      matchPath(location.pathname, { path: getMenuUrl(menuEntry), exact: true })
    ) {
      return true;
    }
    if (menuEntry.subMenuEntries) {
      return findActiveMenuEntry(location, menuEntry.subMenuEntries);
    }

    return false;
  });

const Routes: () => JSX.Element | null = (): JSX.Element | null => {
  // get the theme data
  const { loading, data } = useQuery<TData>(getTheme);

  // get router location
  const location: Location = useLocation();

  // in case the gql is loading or there is no data, do not show the menu
  if (loading || !data) {
    return null;
  }

  const activeMenu: TMenuEntry | undefined = findActiveMenuEntry(
    location,
    data.theme.headerMenu.menuEntries
  );

  switch (activeMenu?.page._contentTypeName) {
    case 'homePage':
      return <Home id={activeMenu?.page._id} />;
    case 'genericPage':
      return <Generic />;
    default:
      return <NotFound />;
  }

  // <Switch>
  //   <Route exact={true} path={routes.home.path} component={Home} />
  //   <Route exact={true} path={routes.donate.path} component={Generic} />
  //   <Route component={NotFound} />
  // </Switch>
};

export { Routes };
