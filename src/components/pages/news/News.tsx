import { useQuery } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import * as React from 'react';
import { NoInternet } from 'src/components/pages/noInternet/NoInternet';
import { PageLoading } from 'src/components/shared/pageLoading/PageLoading';
import { RichText } from 'src/components/shared/richText/RichText';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getNewsArticles from 'src/gql/newsArticles/getNewsArticles.gql';
import {
  TData as TNewsArticles,
  TNewsArticle
} from 'src/gql/newsArticles/TData';
import * as getNewsPage from 'src/gql/newsPage/getNewsPage.gql';
import { TData } from 'src/gql/newsPage/TData';
import { NewsArticle } from './newsArticle/NewsArticle';

type TProps = {
  id: string;
};

/**
 * News page component.
 *
 * Renders the news page with its content
 */
const News: (props: TProps) => JSX.Element | null = ({
  id
}: TProps): JSX.Element | null => {
  // get the news page data
  const { loading, data, error } = useQuery<TData>(getNewsPage, {
    variables: { id, images: imageSizes }
  });

  // get the news articles
  const { data: newsArticlesData, error: newsArticlesError } = useQuery<
    TNewsArticles
  >(getNewsArticles, {
    variables: { id, images: imageSizes }
  });

  // TODO: refactor other components that use the same logic to remove repeatitive code
  // loading is also true when while we are fetching to refresh the cache
  // so to know when the first load is taking place, we need to check the data as well
  const firstLoading: boolean = loading && !data;

  // in case there is no internet and we don't have the data cached, show the relative page
  if (error?.networkError && !data) {
    return <NoInternet />;
  }

  // always show the loading so that it can fade away...
  const contents: JSX.Element[] = [
    <PageLoading key="loading" visible={firstLoading} position="relative" />
  ];

  // show only when we have data but ignore the loading...
  if (data) {
    contents.push(<RichText key="main" html={data.getNewsPage.contentHtml} />);
  }

  // if we have the news articles, show them
  if (newsArticlesData) {
    newsArticlesData.getNewsArticleList.items.forEach(
      (newsArticle: TNewsArticle): void => {
        contents.push(
          <NewsArticle key={newsArticle._id} newsArticle={newsArticle} />
        );
      }
    );
  } else if (newsArticlesError?.networkError) {
    contents.push(<NoInternet />);
  }

  return <Box px={2}>{contents}</Box>;
};

export { News };
