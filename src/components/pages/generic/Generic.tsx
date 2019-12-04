import { useQuery } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import * as React from 'react';
import { NoInternet } from 'src/components/pages/noInternet/NoInternet';
import { PageLoading } from 'src/components/shared/pageLoading/PageLoading';
import { RichText } from 'src/components/shared/richText/RichText';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getGeneric from 'src/gql/generic/getGeneric.gql';
import { TData } from 'src/gql/generic/TData';

type TProps = {
  id: string;
};

/**
 * Generic page component.
 *
 * Renders a generic page with its content
 */
const Generic: (props: TProps) => JSX.Element | null = ({
  id
}: TProps): JSX.Element | null => {
  // get the generic page data
  const { loading, data, error } = useQuery<TData>(getGeneric, {
    variables: { id, images: imageSizes }
  });

  // TODO: refactor other components that use the same logic to remove repeatitive code
  // in case there is no internet, show the relative page
  if (error?.networkError) {
    return <NoInternet />;
  }

  // always show the loading so that it can fade away...
  const contents: JSX.Element[] = [
    <PageLoading key="loading" visible={loading} position="relative" />
  ];

  // in case the gql is loading or there is no data, do not show the page contents
  if (!loading && data) {
    contents.push(
      <RichText key="main" html={data.getGenericPage.contentHtml} />
    );
  }

  return <Box px={2}>{contents}</Box>;
};

export { Generic };
