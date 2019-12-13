import { TAsset } from 'src/gql/shared/TAsset';

type TNewsArticle = {
  _id: string;
  contentHtml: string;
  date?: string;
  title?: string;
  photo: TAsset;
};

/**
 * data structure for the "getNewsArticleList" graphql.
 * should be used like so useQuery<TData>(getNewsArticleList)
 */
type TData = {
  getNewsArticleList: {
    items: TNewsArticle[];
  };
};

export { TData, TAsset, TNewsArticle };
