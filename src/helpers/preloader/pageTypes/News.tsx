import { useQuery } from '@apollo/react-hooks';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getNewsPage from 'src/gql/newsPage/getNewsPage.gql';
import { TData } from 'src/gql/newsPage/TData';
import { parseHtml } from 'src/helpers/preloader/parseHtml';
import { QueryResult } from 'react-apollo';
import { TPage, TProps } from './TPage';

const News: TPage = ({ id, htmlTags = [] }: TProps): null => {
  // get the data
  const { data }: QueryResult = useQuery<TData>(getNewsPage, {
    variables: { id, images: imageSizes },
    context: {
      debounceKey: `preloadNews-${id}`,
    },
  });

  if (data) {
    // parse the html and preload assets (images, etc.)
    parseHtml(data.getNewsPage.contentHtml, htmlTags);
  }

  return null;
};

export { News };
