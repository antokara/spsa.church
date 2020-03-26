import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import * as React from 'react';
import { NoInternet } from 'src/components/pages/noInternet/NoInternet';
import { PageLoading } from 'src/components/shared/pageLoading/PageLoading';
import { RichText } from 'src/components/shared/richText/RichText';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getGeneric from 'src/gql/generic/getGeneric.gql';
import { TData } from 'src/gql/generic/TData';
import { QueryResult } from 'react-apollo';

type TProps = {
  id: string;
};

/**
 * Generic page component.
 *
 * Renders a generic page with its content
 */
const Generic: (props: TProps) => JSX.Element | null = ({
  id,
}: TProps): JSX.Element | null => {
  // get the generic page data
  const { loading, data, error }: QueryResult = useQuery<TData>(getGeneric, {
    variables: { id, images: imageSizes },
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
    <PageLoading key="loading" visible={firstLoading} position="relative" />,
  ];

  // show only when we have data but ignore the loading...
  if (data) {
    contents.push(
      <RichText key="main" html={data.getGenericPage.contentHtml} />
    );
  }

  return <Box px={2}>{contents}</Box>;
};

export { Generic };
