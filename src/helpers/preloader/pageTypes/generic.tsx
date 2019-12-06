import { useQuery } from '@apollo/react-hooks';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getGeneric from 'src/gql/generic/getGeneric.gql';
import { TData } from 'src/gql/generic/TData';
import { parseHtml } from 'src/helpers/preloader/parseHtml';

const generic: (id: string) => null = (id: string): null => {
  // get the data
  const { loading, data, error } = useQuery<TData>(getGeneric, {
    variables: { id, images: imageSizes }
  });

  if (!loading && !error && data) {
    // parse the html and preload assets (images, etc.)
    parseHtml(data.getGenericPage.contentHtml);
  }

  return null;
};

export { generic };
