import { Box, CircularProgress, Fade } from '@material-ui/core';
import * as React from 'react';

type TProps = {
  visible?: boolean;
  position?: string;
};

/**
 * a page loading spinner that covers the whole page
 * with absolute left/top positioning and fade in/out capabilities
 */
const PageLoading: (props: TProps) => JSX.Element = ({
  visible = true,
  position = 'absolute'
}: TProps): JSX.Element => (
  <Fade in={visible} data-testid="fade" unmountOnExit={true}>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position={position}
      top={0}
      left={0}
      width="100%"
      height="100%"
      minHeight="6rem"
      bgcolor="background.paper"
    >
      <CircularProgress data-testid="circular-progress" />
    </Box>
  </Fade>
);

export { PageLoading };
