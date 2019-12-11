import { useQuery } from '@apollo/react-hooks';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getHome from 'src/gql/home/getHome.gql';
import { TData } from 'src/gql/home/TData';
import { parseHtml } from 'src/helpers/preloader/parseHtml';
import { TPage, TProps } from './TPage';

const Home: TPage = ({ id }: TProps): null => {
  // get the home data
  const { data } = useQuery<TData>(getHome, {
    variables: { id, images: imageSizes }
  });

  if (data) {
    // parse the html and preload assets (images, etc.)
    parseHtml(data.getHomePage.contentHtml);
  }

  return null;
};

export { Home };
