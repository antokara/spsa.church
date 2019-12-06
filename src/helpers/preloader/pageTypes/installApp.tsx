import { useQuery } from '@apollo/react-hooks';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getInstallApp from 'src/gql/installApp/getInstallApp.gql';
import { TData } from 'src/gql/installApp/TData';
import { parseHtml } from 'src/helpers/preloader/parseHtml';

const installApp: (id: string) => null = (id: string): null => {
  // get the data
  const { loading, data, error } = useQuery<TData>(getInstallApp, {
    variables: { id, images: imageSizes }
  });

  if (!loading && !error && data) {
    // parse the html and preload assets (images, etc.)
    parseHtml(data.getInstallAppPage.contentHtml);
  }

  return null;
};

export { installApp };
