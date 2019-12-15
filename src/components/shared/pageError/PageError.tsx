import { default as Box } from '@material-ui/core/Box';
import { CardProps, default as Card } from '@material-ui/core/Card';
import { default as CardContent } from '@material-ui/core/CardContent';
import { default as Grid } from '@material-ui/core/Grid';
import { WithTheme } from '@material-ui/core/styles';
import { default as Warning } from '@material-ui/icons/Warning';
import * as React from 'react';
import { default as styled } from 'styled-components';

/**
 * a styled card component that is need to create and pass the className prop
 */
const ClassedCard: React.ComponentType<CardProps> = styled(Card)`
  background: ${(p: CardProps & WithTheme): string =>
    p.theme.palette.error.dark};
`;

/**
 * the error card which uses the className provided by the "ClassedCard" styled component
 */
const ErrorCard: React.ComponentType<CardProps> = ({
  children,
  className
}: React.PropsWithChildren<CardProps>): JSX.Element => (
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
            <Warning data-testid="warning-icon" />
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
