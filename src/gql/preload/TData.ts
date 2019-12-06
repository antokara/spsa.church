import { TAsset } from 'src/gql/shared/TAsset';
import { TIconLink } from 'src/gql/shared/TIconLink';

type TMenuPage = {
  _id: string;
  _contentTypeName: string;
};

type TMenuEntry = {
  page: TMenuPage;
  subMenuEntries?: TMenuEntry[];
};

/**
 * modified data structure for the "theme" graphql,
 * specifically for preloading pages and their contents
 * should be used like so useQuery<TData>(getTheme)
 */
type TData = {
  theme: {
    headerMenu: {
      menuEntries: TMenuEntry[];
    };
    photoPortrait: TAsset;
    photoLandscape: TAsset;
    overlay: string;
    footerIconLinks: TIconLink[];
    footerInfoHtml: string;
  };
};

export { TData, TMenuEntry, TAsset, TMenuPage };
