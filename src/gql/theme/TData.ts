import { TAsset } from 'src/gql/shared/TAsset';
import { TIconLink } from 'src/gql/shared/TIconLink';

type TMenuEntry = {
  _id: string;
  label: string;
  url: string;
};

/**
 * data structure for the "theme" graphql.
 * should be used like so useQuery<TData>(getTheme)
 */
type TData = {
  theme: {
    headerMenu: {
      label: string;
      menuEntries: TMenuEntry[];
    };
    photoPortrait: TAsset;
    photoLandscape: TAsset;
    overlay: string;
    footerIconLinks: TIconLink[];
    footerInfo: string;
  };
};

export { TData, TMenuEntry, TAsset };
