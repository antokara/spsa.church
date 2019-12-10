import { pageTypes } from 'src/constants/layout/pageTypes';
import { TMenuPage } from 'src/gql/preload/TData';
import { generic } from 'src/helpers/preloader/pageTypes/generic';
import { home } from 'src/helpers/preloader/pageTypes/home';
import { installApp } from 'src/helpers/preloader/pageTypes/installApp';

/**
 *  preloads the contents/assets of page provided
 * TODO: fix hooks error on stale
 */
const preloadPage: (page: TMenuPage) => void = (page: TMenuPage): void => {
  const id: string = page._id;
  switch (page._contentTypeName) {
    case pageTypes.homePage:
      home(id);
      break;
    case pageTypes.genericPage:
      generic(id);
      break;
    case pageTypes.installAppPage:
      installApp(id);
      break;
    default:
  }
};

export { preloadPage };
