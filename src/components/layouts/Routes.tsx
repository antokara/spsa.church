import { useQuery } from '@apollo/react-hooks';
import { Location } from 'history';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Generic } from 'src/components/pages/generic/Generic';
import { Home } from 'src/components/pages/home/Home';
import { InstallApp } from 'src/components/pages/installApp/InstallApp';
import { NotFound } from 'src/components/pages/notFound/NotFound';
import { pageTypes } from 'src/constants/layout/pageTypes';
import * as getTheme from 'src/gql/theme/getTheme.gql';
import { TData, TMenuEntry, TMenuPage } from 'src/gql/theme/TData';
import { findActiveMenuEntries } from 'src/helpers/routes/findActiveMenuEntries';

const Routes: () => JSX.Element | null = (): JSX.Element | null => {
  // get the theme data
  const { loading, data } = useQuery<TData>(getTheme);

  // get router location
  const location: Location = useLocation();

  // in case the gql is loading or there is no data, do not show the menu
  if (loading || !data) {
    return null;
  }

  // find which menu entry/entries are active so we can style them and
  // also show the correct page type
  const activeMenus: TMenuEntry[] = findActiveMenuEntries(
    location,
    data.theme.headerMenu.menuEntries
  );

  // make sure we found an active menu/page
  if (activeMenus.length && activeMenus[activeMenus.length - 1]?.page) {
    const page: TMenuPage = activeMenus[activeMenus.length - 1].page;
    const id: string = page._id;
    switch (page._contentTypeName) {
      case pageTypes.homePage:
        return <Home id={id} />;
      case pageTypes.genericPage:
        return <Generic id={id} />;
      case pageTypes.installAppPage:
        return <InstallApp id={id} />;
      default:
    }
  }

  // if no match...
  return <NotFound />;
};

export { Routes };
