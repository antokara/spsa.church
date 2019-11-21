import { Box, Card, CardContent, Grid, WithTheme } from '@material-ui/core';
import { PaperProps } from '@material-ui/core/Paper';
import { Warning } from '@material-ui/icons';
import * as React from 'react';
import { default as styled } from 'styled-components';

/**
 * a styled card component that is need to create and pass the className prop
 */
const ClassedCard: React.ComponentType<PaperProps> = styled(Card)`
  background: ${(p: PaperProps & WithTheme): string =>
    p.theme.palette.error.dark};
`;

/**
 * the error card which uses the className provided by the "ClassedCard" styled component
 */
const ErrorCard: React.ComponentType<PaperProps> = ({
  children,
  className
}: React.PropsWithChildren<PaperProps>): JSX.Element => (
  <ClassedCard classes={{ root: className }}>{children}</ClassedCard>
);

/**
 * @prop error the error to show
 */
type TProps = {
  error: Error;
};

/**
 * a page error indicator, that covers the whole page
 * with absolute left/top positioning
 */
const PageError: (props: TProps) => JSX.Element = ({
  error
}: TProps): JSX.Element => (
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
    <ErrorCard>
      <CardContent>
        <Grid container={true} spacing={1}>
          <Grid item={true} xs={1}>
            <Warning />
          </Grid>
          <Grid item={true} xs={11}>
            {error.message}
          </Grid>
        </Grid>
      </CardContent>
    </ErrorCard>
  </Box>
);

export { PageError };
