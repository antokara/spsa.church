import { TAsset } from 'src/gql/shared/TAsset';
import { TIconLink } from 'src/gql/shared/TIconLink';

type TMenuPage = {
  _id: string;
  _contentTypeName: string;
  url?: string;
};

type TMenuEntry = {
  _id: string;
  label: string;
  url?: string;
  page: TMenuPage;
  subMenuEntries?: TMenuEntry[];
};

/**
 * data structure for the "theme" graphql.
 * should be used like so useQuery<TData>(getTheme)
 */
type TData = {
  getTheme: {
    headerMenu: {
      label: string;
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
