import { useQuery } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import * as React from 'react';
import { Markdown } from 'src/components/shared/Markdown';
import * as getGeneric from 'src/gql/generic/getGeneric.gql';
import { TData, TGenericPage } from 'src/gql/generic/TData';

/**
 * Generic page component.
 *
 * Renders a generic page with its content
 */
const Generic: () => JSX.Element | null = (): JSX.Element | null => {
  // get the generic page data
  const { loading, data } = useQuery<TData>(getGeneric, {
    variables: { url: '/donate' }
  });

  // in case the gql is loading or there is no data, do not show the page
  // TODO: add loader
  if (loading || !data) {
    return null;
  }
  const pageData: TGenericPage = data.getGenericPageList.items[0];

  return (
    <Box p={2}>
      <Markdown source={pageData.content} escapeHtml={false} />
    </Box>
  );
};

export { Generic };
