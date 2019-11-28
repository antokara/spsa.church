import { useQuery } from '@apollo/react-hooks';
import { Box, Grid } from '@material-ui/core';
import * as React from 'react';
import { Markdown } from 'src/components/shared/Markdown';
import { Separator } from 'src/components/shared/Separator';
import { maxWidth } from 'src/constants/layout/maxWidth';
import * as getGeneric from 'src/gql/generic/getGeneric.gql';
import { TData } from 'src/gql/generic/TData';

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

  return (
    <Box p={2}>
      <Markdown
        source={data.getGenericPageList.items[0].content}
        escapeHtml={false}
      />
    </Box>
  );
};

export { Generic };
