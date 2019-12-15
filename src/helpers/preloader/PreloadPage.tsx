import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { pageTypes } from 'src/constants/layout/pageTypes';
import * as getHtmlTagList from 'src/gql/htmlTags/getHtmlTagList.gql';
import { TData } from 'src/gql/htmlTags/TData';
import { TMenuPage } from 'src/gql/preload/TData';
import { Generic } from 'src/helpers/preloader/pageTypes/Generic';
import { Home } from 'src/helpers/preloader/pageTypes/Home';
import { InstallApp } from 'src/helpers/preloader/pageTypes/InstallApp';
import { News } from 'src/helpers/preloader/pageTypes/News';

type TProps = {
  page: TMenuPage;
};

/**
 * preloads the contents/assets of page provided
 */
const PreloadPage: (props: TProps) => JSX.Element | null = ({
  page
}: TProps): JSX.Element | null => {
  // get the html tag list
  const { data } = useQuery<TData>(getHtmlTagList, {
    context: {
      debounceKey: 'preloadHtmlTagList'
    }
  });

  const id: string = page._id;
  switch (page._contentTypeName) {
    case pageTypes.homePage:
      return <Home id={id} htmlTags={data?.getHtmlTagList.items} />;

    case pageTypes.genericPage:
      return <Generic id={id} htmlTags={data?.getHtmlTagList.items} />;

    case pageTypes.installAppPage:
      return <InstallApp id={id} htmlTags={data?.getHtmlTagList.items} />;

    case pageTypes.newsPage:
      return <News id={id} htmlTags={data?.getHtmlTagList.items} />;

    default:
      return null;
  }
};

export { PreloadPage };
