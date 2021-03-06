import { useQuery } from '@apollo/react-hooks';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getGeneric from 'src/gql/generic/getGeneric.gql';
import { TData } from 'src/gql/generic/TData';
import { parseHtml } from 'src/helpers/preloader/parseHtml';
import { QueryResult } from 'react-apollo';
import { TPage, TProps } from './TPage';

const Generic: TPage = ({ id, htmlTags = [] }: TProps): null => {
  // get the data
  const { data }: QueryResult = useQuery<TData>(getGeneric, {
    variables: { id, images: imageSizes },
    context: {
      debounceKey: `preloadGeneric-${id}`,
    },
  });

  if (data) {
    // parse the html and preload assets (images, etc.)
    parseHtml(data.getGenericPage.contentHtml, htmlTags);
  }

  return null;
};

export { Generic };
