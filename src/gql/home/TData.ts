import { TAsset } from 'src/gql/shared/TAsset';

/**
 * data structure for the "home" graphql.
 * should be used like so useQuery<TData>(getHome)
 */
type TData = {
  home: {
    photo: TAsset;
    content: string;
    overlay: string;
  };
};

export { TData, TAsset };
