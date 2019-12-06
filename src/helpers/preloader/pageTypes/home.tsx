import { useQuery } from '@apollo/react-hooks';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getHome from 'src/gql/home/getHome.gql';
import { TData } from 'src/gql/home/TData';
import { parseHtml } from 'src/helpers/preloader/parseHtml';

const home: (id: string) => null = (id: string): null => {
  // get the home data
  const { loading, data, error } = useQuery<TData>(getHome, {
    variables: { id, images: imageSizes }
  });

  if (!loading && !error && data) {
    // parse the html and preload assets (images, etc.)
    parseHtml(data.getHomePage.contentHtml);
  }

  return null;
};

export { home };
