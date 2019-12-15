import { useQuery } from '@apollo/react-hooks';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getInstallApp from 'src/gql/installApp/getInstallApp.gql';
import { TData } from 'src/gql/installApp/TData';
import { parseHtml } from 'src/helpers/preloader/parseHtml';
import { TPage, TProps } from './TPage';

const InstallApp: TPage = ({ id, htmlTags = [] }: TProps): null => {
  // get the data
  const { data } = useQuery<TData>(getInstallApp, {
    variables: { id, images: imageSizes },
    context: {
      debounceKey: `preloadInstallApp-${id}`
    }
  });

  if (data) {
    // parse the html and preload assets (images, etc.)
    parseHtml(data.getInstallAppPage.contentHtml, htmlTags);
  }

  return null;
};

export { InstallApp };
