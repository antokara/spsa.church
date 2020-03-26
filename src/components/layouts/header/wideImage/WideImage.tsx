import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import * as React from 'react';
import { Picture, TSource } from 'src/components/shared/Picture';
import { maxWidth } from 'src/constants/layout/maxWidth';
import * as getTheme from 'src/gql/theme/getTheme.gql';
import { TAsset, TData } from 'src/gql/theme/TData';
import { useCss } from 'src/helpers/useCss';
import { QueryResult } from 'react-apollo';

/**
 * Wide Image component.
 *
 * Renders the Main Photo and its Overlay text
 */
const WideImage: () => JSX.Element | null = (): JSX.Element | null => {
  // get the theme data
  const { loading, data }: QueryResult = useQuery<TData>(getTheme);

  // must be calculated every time
  const overlayFontSize: string = useCss('3vw', '2rem');

  // in case the gql is loading or there is no data, do not show the page
  // TODO: add loader
  if (loading || !data) {
    return null;
  }

  const focalPointPortrait: string = 'fp-x=0.35&fp-y=0.35&fp-z=1';
  const focalPointLandscape: string = 'fp-x=0.5&fp-y=0.5&fp-z=1';
  const assets: TAsset[] = [
    data.theme.photoPortrait,
    data.theme.photoLandscape,
  ];

  const sources: TSource[] = [
    {
      srcSet: `{url[0]}?${focalPointPortrait}&fit=crop&h=700&w=${maxWidth.value}`,
      media: '(orientation: portrait)',
    },
    {
      srcSet: `{url[1]}?${focalPointLandscape}&fit=crop&h=500&w=${maxWidth.value}`,
      media: '(orientation: landscape)',
    },
  ];

  return (
    <Box position="relative">
      <Picture assets={assets} sources={sources} />
      <Box
        position="absolute"
        fontSize={overlayFontSize}
        maxWidth="45%"
        bottom="5%"
        right={0}
        p={1}
        textAlign="right"
        color="white"
        bgcolor="rgba(0, 0, 0, 0.5)"
      >
        {data.theme.overlay}
      </Box>
    </Box>
  );
};

export { WideImage };
