import { Box, CircularProgress, Fade } from '@material-ui/core';
import * as React from 'react';

type TProps = {
  visible?: boolean;
};

/**
 * a page loading spinner that covers the whole page
 * with absolute left/top positioning and fade in/out capabilities
 */
const PageLoading: (props: TProps) => JSX.Element = ({
  visible = true
}: TProps): JSX.Element => (
  <Fade in={visible} data-testid="fade">
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bgcolor="background.paper"
    >
      <CircularProgress data-testid="circular-progress" />
    </Box>
  </Fade>
);

export { PageLoading };
