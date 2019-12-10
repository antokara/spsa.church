import * as React from 'react';
import { pageTypes } from 'src/constants/layout/pageTypes';
import { TMenuPage } from 'src/gql/preload/TData';
import { Generic } from 'src/helpers/preloader/pageTypes/Generic';
import { Home } from 'src/helpers/preloader/pageTypes/Home';
import { InstallApp } from 'src/helpers/preloader/pageTypes/InstallApp';

type TProps = {
  page: TMenuPage;
};

/**
 *  preloads the contents/assets of page provided
 * TODO: fix hooks error on stale
 */
const PreloadPage: (props: TProps) => JSX.Element | null = ({
  page
}: TProps): JSX.Element | null => {
  const id: string = page._id;
  switch (page._contentTypeName) {
    case pageTypes.homePage:
      return <Home id={id} />;

    case pageTypes.genericPage:
      return <Generic id={id} />;

    case pageTypes.installAppPage:
      return <InstallApp id={id} />;

    default:
      return null;
  }
};

export { PreloadPage };
