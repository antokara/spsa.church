import { useQuery } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import * as React from 'react';
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
  const { loading, data } = useQuery<TData>(getGeneric, {
    variables: { id, images: imageSizes }
  });

  // in case the gql is loading or there is no data, do not show the page
  // TODO: add loader
  if (loading || !data) {
    return null;
  }

  return (
    <Box p={2}>
      <RichText html={data.getGenericPage.contentHtml} />
    </Box>
  );
};

export { Generic };
